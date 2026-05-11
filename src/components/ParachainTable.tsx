import { useState } from "react";
import type { ParachainInfo } from "../types";
import { InfoTip } from "./InfoTip";

interface Props {
	parachains: ParachainInfo[];
}

type SortKey = "paraId" | "name" | "coreCount";

export function ParachainTable({ parachains }: Props) {
	const [sortKey, setSortKey] = useState<SortKey>("paraId");
	const [sortAsc, setSortAsc] = useState(true);

	function handleSort(key: SortKey) {
		if (sortKey === key) {
			setSortAsc(!sortAsc);
		} else {
			setSortKey(key);
			setSortAsc(true);
		}
	}

	const sorted = [...parachains].sort((a, b) => {
		const dir = sortAsc ? 1 : -1;
		switch (sortKey) {
			case "paraId":
				return (a.paraId - b.paraId) * dir;
			case "name":
				return (a.name ?? "").localeCompare(b.name ?? "") * dir;
			case "coreCount":
				return (a.coreCount - b.coreCount) * dir;
		}
	});

	function arrow(key: SortKey) {
		if (sortKey !== key) return "";
		return sortAsc ? " \u25B2" : " \u25BC";
	}

	function truncateAddr(addr: string): string {
		if (addr.length <= 16) return addr;
		return addr.slice(0, 8) + ".." + addr.slice(-6);
	}

	return (
		<div className="panel">
			<h2>
				Parachains ({parachains.length})
				<InfoTip text="One row per parachain that appears in any Task assignment across broker cores. Source: union of CoreDescriptors[*].current_work.assignments[*].(Task).value, joined with Registrar.Paras (for manager) and the People-chain Identity pallet (for display name)." />
			</h2>
			<table className="para-table">
				<thead>
					<tr>
						<th onClick={() => handleSort("paraId")}>
							ParaId<span className="sort-arrow">{arrow("paraId")}</span>
							<InfoTip text="Parachain ID. Source: Task assignment value in CoreDescriptors." />
						</th>
						<th onClick={() => handleSort("name")}>
							Name<span className="sort-arrow">{arrow("name")}</span>
							<InfoTip text="Display name resolved via the manager's identity on the People chain (Identity.IdentityOf, falling back through Identity.SuperOf for sub-identities)." />
						</th>
						<th>
							Manager
							<InfoTip text="Manager account. Source: Registrar.Paras(paraId).manager on the relay chain." />
						</th>
						<th onClick={() => handleSort("coreCount")}>
							Cores<span className="sort-arrow">{arrow("coreCount")}</span>
							<InfoTip text="Number of broker cores this parachain appears on. Computed by counting CoreDescriptors whose current_work contains a Task assignment for this paraId." />
						</th>
						<th>
							Core Indices
							<InfoTip text="The specific core indices (0…brokerCores−1) where this parachain has Task assignments." />
						</th>
					</tr>
				</thead>
				<tbody>
					{sorted.map((p) => (
						<tr key={p.paraId}>
							<td>{p.paraId}</td>
							<td>{p.name ?? <span style={{ color: "var(--text-muted)" }}>-</span>}</td>
							<td>
								<span className="manager">{truncateAddr(p.manager)}</span>
							</td>
							<td className={p.coreCount > 1 ? "multi-core" : ""}>
								{p.coreCount}
							</td>
							<td>
								{p.coreIndices.map((idx) => (
									<span key={idx} className="core-badge">
										{idx}
									</span>
								))}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
