import { useState } from "react";
import type { ParachainInfo } from "../types";

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
			<h2>Parachains ({parachains.length})</h2>
			<table className="para-table">
				<thead>
					<tr>
						<th onClick={() => handleSort("paraId")}>
							ParaId<span className="sort-arrow">{arrow("paraId")}</span>
						</th>
						<th onClick={() => handleSort("name")}>
							Name<span className="sort-arrow">{arrow("name")}</span>
						</th>
						<th>Manager</th>
						<th onClick={() => handleSort("coreCount")}>
							Cores<span className="sort-arrow">{arrow("coreCount")}</span>
						</th>
						<th>Core Indices</th>
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
