import type { SaleInfo, SalePhase, SaleRow } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Schedule = any[];

/** Stable string form of a broker Schedule, used to match a workload across regions. */
function scheduleSig(schedule: Schedule): string {
	return schedule
		.map((i) => `${i.mask.asHex()}:${i.assignment.type}:${i.assignment.value ?? ""}`)
		.sort()
		.join("|");
}

function scheduleParaIds(schedule: Schedule): number[] {
	return [
		...new Set<number>(
			schedule.filter((i) => i.assignment.type === "Task").map((i) => i.assignment.value as number),
		),
	];
}

/**
 * Lead-in price factor used by Polkadot and Kusama (`pallet_broker::CenterTargetPrice`, wrapped by
 * `MinimumEndPrice`): falls from 100x to 10x the end price over the first half of the lead-in,
 * then from 10x to 1x over the second half.
 */
function leadinFactor(through: number): number {
	return through <= 0.5 ? 100 - 180 * through : 19 - 18 * through;
}

/**
 * Derives per-core renewal/purchase status for the sale currently running on the broker.
 *
 * The "current region" is what cores run now (Broker.Workload). The sale is for the next region
 * [sale.region_begin, sale.region_end), whose secured cores sit in Broker.Workplan at region_begin.
 */
export async function fetchSaleData(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	coretimeApi: any,
	relayBlock: number,
	reservedCores: number,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	saleInfo: any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	status: any,
): Promise<SaleInfo | null> {
	if (!saleInfo || !status) return null;
	const regionBegin: number = saleInfo.region_begin;
	const regionEnd: number = saleInfo.region_end;

	const [renewalEntries, workloadEntries, workplanEntries, regionEntries] = await Promise.all([
		coretimeApi.query.Broker.PotentialRenewals.getEntries(),
		coretimeApi.query.Broker.Workload.getEntries(),
		coretimeApi.query.Broker.Workplan.getEntries(),
		coretimeApi.query.Broker.Regions.getEntries(),
	]);

	// Renewal rights into the region being sold, keyed by current core. `do_renew` deletes these,
	// so whatever is left has not been renewed (yet).
	const pendingRenewals = new Map<number, bigint>();
	// Renewal rights out of the region being sold, keyed by next core. Written by `do_renew` (with
	// the bumped price for the following sale) and by `do_assign` after a purchase (price = paid).
	const nextRenewals = new Map<number, bigint>();
	for (const { keyArgs, value } of renewalEntries) {
		const { core, when } = keyArgs[0];
		if (value.completion.type !== "Complete") continue;
		if (when === regionBegin) pendingRenewals.set(core, value.price);
		if (when === regionEnd) nextRenewals.set(core, value.price);
	}

	// Bought regions not yet permanently assigned still carry the price paid.
	const unassignedPaid = new Map<number, bigint>();
	for (const { keyArgs, value } of regionEntries) {
		const { begin, core } = keyArgs[0];
		if (begin === regionBegin && value.paid != null && !unassignedPaid.has(core)) {
			unassignedPaid.set(core, value.paid);
		}
	}

	const nextWorkplan = new Map<number, Schedule>();
	for (const { keyArgs, value } of workplanEntries) {
		const [timeslice, core] = keyArgs[0];
		if (timeslice === regionBegin) nextWorkplan.set(core, value);
	}

	const firstCore: number = saleInfo.first_core;
	const soldCores: number[] = [];
	for (let c = firstCore; c < firstCore + saleInfo.cores_sold; c++) soldCores.push(c);

	// Next-region cores that can be the target of a renewal, grouped by workload.
	const renewTargets = new Map<string, number[]>();
	for (const c of soldCores) {
		const plan = nextWorkplan.get(c);
		if (!plan || !nextRenewals.has(c)) continue;
		const sig = scheduleSig(plan);
		renewTargets.set(sig, [...(renewTargets.get(sig) ?? []), c]);
	}

	const rows: SaleRow[] = [];
	const claimedNext = new Set<number>();
	const currentBulk = workloadEntries
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.map((e: any) => ({ core: e.keyArgs[0] as number, schedule: e.value as Schedule }))
		.filter(({ core, schedule }: { core: number; schedule: Schedule }) => core >= reservedCores && scheduleParaIds(schedule).length > 0)
		.sort((a: { core: number }, b: { core: number }) => a.core - b.core);

	for (const { core, schedule } of currentBulk) {
		const paraIds = scheduleParaIds(schedule);
		const pending = pendingRenewals.get(core);
		if (pending !== undefined) {
			rows.push({ kind: "RenewalPending", paraIds, names: [], currentCore: core, nextCore: null, price: pending });
			continue;
		}
		const target = renewTargets.get(scheduleSig(schedule))?.shift();
		if (target !== undefined) {
			claimedNext.add(target);
			rows.push({ kind: "Renewed", paraIds, names: [], currentCore: core, nextCore: target, price: nextRenewals.get(target)! });
		} else {
			rows.push({ kind: "NotRenewed", paraIds, names: [], currentCore: core, nextCore: null, price: null });
		}
	}

	for (const c of soldCores) {
		if (claimedNext.has(c)) continue;
		const plan = nextWorkplan.get(c);
		rows.push({
			kind: "Purchased",
			paraIds: plan ? scheduleParaIds(plan) : [],
			names: [],
			currentCore: null,
			nextCore: c,
			price: nextRenewals.get(c) ?? unassignedPaid.get(c) ?? null,
		});
	}

	const endPrice: bigint = saleInfo.end_price;
	const saleStart: number = saleInfo.sale_start;
	const leadinLength: number = saleInfo.leadin_length;
	let phase: SalePhase;
	if (relayBlock < saleStart) phase = "Interlude";
	else if (relayBlock < saleStart + leadinLength) phase = "Leadin";
	else phase = "FixedPrice";
	const through = Math.min(Math.max(relayBlock - saleStart, 0), leadinLength) / leadinLength;
	// Scale by 1000 to keep three decimals of the factor in integer math.
	const currentPrice = (endPrice * BigInt(Math.round(leadinFactor(through) * 1000))) / 1000n;

	return {
		regionBegin,
		regionEnd,
		currentTimeslice: status.last_timeslice,
		phase,
		currentPrice,
		endPrice,
		selloutPrice: saleInfo.sellout_price ?? null,
		coresOffered: saleInfo.cores_offered,
		coresSold: saleInfo.cores_sold,
		rows,
	};
}
