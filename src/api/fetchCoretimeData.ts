import { createClient } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider";
import type { CoretimeData, CoreInfo, ParachainInfo, BrokerInfo, Stats } from "../types";
import type { NetworkConfig } from "../networks";

function decodeIdentityData(data: { type: string; value?: unknown }): string | null {
	if (data.type === "None" || data.type === "Raw0") return null;
	if (data.type.startsWith("Raw")) {
		const val = data.value;
		if (val && typeof val === "object" && "asText" in val && typeof val.asText === "function")
			return val.asText();
		if (typeof val === "number") return String.fromCharCode(val);
		if (typeof val === "string") return val;
		return null;
	}
	return null;
}

async function resolveParaNames(
	managerAccounts: Map<number, string>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	peopleApi: any,
): Promise<Map<number, string>> {
	const names = new Map<number, string>();
	const uniqueManagers = new Set(managerAccounts.values());

	const identityResults = await Promise.all(
		[...uniqueManagers].map(async (manager) => {
			const superOf = await peopleApi.query.Identity.SuperOf.getValue(manager);
			if (superOf) {
				const [parentAccount, subData] = superOf;
				const parentIdentity = await peopleApi.query.Identity.IdentityOf.getValue(parentAccount);
				const parentName = parentIdentity ? decodeIdentityData(parentIdentity.info.display) : null;
				const subName = decodeIdentityData(subData);
				const fullName = [parentName, subName].filter(Boolean).join("/");
				return [manager, fullName || null] as const;
			}
			const identity = await peopleApi.query.Identity.IdentityOf.getValue(manager);
			if (!identity) return [manager, null] as const;
			const display = decodeIdentityData(identity.info.display);
			return [manager, display] as const;
		}),
	);

	const managerToName = new Map(identityResults);
	for (const [paraId, manager] of managerAccounts) {
		const name = managerToName.get(manager);
		if (name) names.set(paraId, name);
	}
	return names;
}

export async function fetchCoretimeData(
	network: NetworkConfig,
	onProgress?: (msg: string) => void,
): Promise<CoretimeData> {
	const log = onProgress ?? (() => {});

	log(`Connecting to ${network.label} relay chain...`);
	const relayClient = createClient(getWsProvider(network.relayRpc));
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const relayApi = relayClient.getTypedApi(network.relayDescriptor) as any;

	log("Connecting to Coretime chain...");
	const coretimeClient = createClient(getWsProvider(network.coretimeRpc));
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const coretimeApi = coretimeClient.getTypedApi(network.coretimeDescriptor) as any;

	log("Connecting to People chain...");
	const peopleClient = createClient(getWsProvider(network.peopleRpc));
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const peopleApi = peopleClient.getTypedApi(network.peopleDescriptor) as any;

	try {
		log("Fetching coretime data...");
		const [claimQueue, availabilityCores, brokerReservations, brokerLeases, brokerSaleInfo, brokerStatus, coreDescriptorEntries] =
			await Promise.all([
				relayApi.apis.ParachainHost.claim_queue(),
				relayApi.apis.ParachainHost.availability_cores(),
				coretimeApi.query.Broker.Reservations.getValue(),
				coretimeApi.query.Broker.Leases.getValue(),
				coretimeApi.query.Broker.SaleInfo.getValue(),
				coretimeApi.query.Broker.Status.getValue(),
				relayApi.query.ParaScheduler.CoreDescriptors.getValue(),
			]);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const coreDescriptors = new Map<number, any>(coreDescriptorEntries as Iterable<[number, any]>);
		const totalCores = coreDescriptors.size;

		// Collect all unique paraIds
		const allParaIds = new Set<number>();
		for (const desc of coreDescriptors.values()) {
			if (desc.current_work) {
				for (const [assignment] of desc.current_work.assignments) {
					if (assignment.type === "Task") allParaIds.add(assignment.value!);
				}
			}
		}

		// Fetch registrar info
		log(`Resolving ${allParaIds.size} parachain identities...`);
		const registrarEntries = await Promise.all(
			[...allParaIds].map(async (paraId) => {
				const info = await relayApi.query.Registrar.Paras.getValue(paraId);
				return [paraId, info] as const;
			}),
		);
		const registrarMap = new Map(registrarEntries);

		const managerAccounts = new Map<number, string>();
		for (const [paraId, info] of registrarMap) {
			if (info) managerAccounts.set(paraId, info.manager);
		}

		log("Resolving names from People chain...");
		const paraNames = await resolveParaNames(managerAccounts, peopleApi);

		// Build claim queue map
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const claimQueueMap = new Map<number, number[]>();
		for (const [coreIdx, assignments] of claimQueue) {
			claimQueueMap.set(
				coreIdx,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				assignments.map((a: any) => {
					if (a.type === "Pool") return -1;
					if (a.type === "Bulk") return a.value;
					return 0;
				}),
			);
		}

		// Categorize cores
		const cores: CoreInfo[] = [];
		const paraIdToCores = new Map<number, number[]>();

		for (let i = 0; i < totalCores; i++) {
			const desc = coreDescriptors.get(i);
			const cqEntries = claimQueueMap.get(i) ?? [];

			if (!desc || !desc.current_work) {
				cores.push({
					index: i,
					assignment: "NoWork",
					paraIds: [],
					parts: {},
					claimQueue: cqEntries,
				});
				continue;
			}

			const assignments = desc.current_work.assignments;
			let hasTask = false;
			let hasPool = false;
			let hasIdle = false;
			const taskParaIds = new Set<number>();
			const taskParts: Record<number, number> = {};

			for (const [assignment, state] of assignments) {
				if (assignment.type === "Task") {
					hasTask = true;
					taskParaIds.add(assignment.value!);
					taskParts[assignment.value!] = (taskParts[assignment.value!] ?? 0) + state.ratio;
				}
				if (assignment.type === "Pool") hasPool = true;
				if (assignment.type === "Idle") hasIdle = true;
			}

			let coreAssignment: CoreInfo["assignment"];
			if (hasTask && !hasPool && !hasIdle) {
				coreAssignment = "Task";
			} else if (hasPool && !hasTask && !hasIdle) {
				coreAssignment = "Pool";
			} else if (hasIdle && !hasTask && !hasPool) {
				coreAssignment = "Idle";
			} else if (hasPool && !hasTask) {
				coreAssignment = "Pool";
			} else if (hasTask) {
				coreAssignment = "Mixed";
			} else {
				coreAssignment = "Idle";
			}

			const pids = [...taskParaIds];
			cores.push({
				index: i,
				assignment: coreAssignment,
				paraIds: pids,
				parts: taskParts,
				claimQueue: cqEntries,
			});

			for (const pid of pids) {
				const existing = paraIdToCores.get(pid) ?? [];
				existing.push(i);
				paraIdToCores.set(pid, existing);
			}
		}

		// Build parachain list
		const parachains: ParachainInfo[] = [...paraIdToCores.entries()]
			.sort((a, b) => a[0] - b[0])
			.map(([paraId, coreIndices]) => ({
				paraId,
				name: paraNames.get(paraId) ?? null,
				manager: managerAccounts.get(paraId) ?? "unknown",
				coreCount: coreIndices.length,
				coreIndices,
			}));

		const broker: BrokerInfo = {
			coreCount: (brokerStatus as any)?.core_count ?? 0,
			reserved: brokerReservations.length,
			leased: brokerLeases.length,
			coresOffered: (brokerSaleInfo as any)?.cores_offered ?? 0,
			coresSold: (brokerSaleInfo as any)?.cores_sold ?? 0,
		};

		const taskCores = cores.filter((c) => c.assignment === "Task").length;
		const poolCores = cores.filter((c) => c.assignment === "Pool").length;
		const idleCores = cores.filter((c) => c.assignment === "Idle").length;
		const noWorkCores = cores.filter((c) => c.assignment === "NoWork").length;
		const mixedCores = cores.filter((c) => c.assignment === "Mixed").length;

		let relayFreeCores = 0;
		let relayOccupiedCores = 0;
		let relayScheduledCores = 0;
		for (const ac of availabilityCores) {
			if (ac.type === "Free") relayFreeCores++;
			else if (ac.type === "Occupied") relayOccupiedCores++;
			else if (ac.type === "Scheduled") relayScheduledCores++;
		}

		const stats: Stats = {
			totalCores,
			relayCores: availabilityCores.length,
			relayFreeCores,
			relayOccupiedCores,
			relayScheduledCores,
			taskCores,
			poolCores,
			idleCores,
			noWorkCores,
			mixedCores,
			uniqueParachains: paraIdToCores.size,
		};

		log("Done!");
		return { cores, parachains, broker, stats };
	} finally {
		relayClient.destroy();
		coretimeClient.destroy();
		peopleClient.destroy();
	}
}
