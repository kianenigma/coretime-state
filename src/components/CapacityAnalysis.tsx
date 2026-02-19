import type { Stats, ParachainInfo } from "../types";

interface Props {
	stats: Stats;
	parachains: ParachainInfo[];
}

export function CapacityAnalysis({ stats, parachains }: Props) {
	const multiCore = parachains.filter((p) => p.coreCount > 1);
	const usedCores = stats.taskCores + stats.mixedCores;

	return (
		<div className="panel">
			<h2>Capacity Analysis</h2>
			<div className="capacity-items">
				<div className="capacity-item">
					<span className="c-label">Cores with task assignments</span>
					<span className="c-value">{usedCores}</span>
				</div>
				<div className="capacity-item">
					<span className="c-label">On-demand pool cores</span>
					<span className="c-value">{stats.poolCores}</span>
				</div>
				<div className="capacity-item">
					<span className="c-label">Idle / No-work cores</span>
					<span className="c-value">{stats.idleCores + stats.noWorkCores}</span>
				</div>
				<div className="capacity-item">
					<span className="c-label">Unique bulk parachains</span>
					<span className="c-value">{stats.uniqueParachains}</span>
				</div>
			</div>

			{multiCore.length > 0 && (
				<div className="multi-core-list">
					<h3>Multi-core Parachains (Elastic Scaling)</h3>
					{multiCore.map((p) => (
						<div key={p.paraId} className="multi-core-entry">
							<span>
								{p.paraId}
								{p.name ? ` (${p.name})` : ""}
							</span>
							<span>{p.coreCount} cores</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
