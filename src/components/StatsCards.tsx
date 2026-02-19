import type { Stats } from "../types";

interface Props {
	stats: Stats;
}

export function StatsCards({ stats }: Props) {
	return (
		<div className="stats-row">
			<div className="stat-card">
				<div className="label">Total Cores</div>
				<div className="value">{stats.totalCores}</div>
			</div>
			<div className="stat-card">
				<div className="label">Task-Assigned</div>
				<div className="value green">{stats.taskCores}</div>
			</div>
			<div className="stat-card">
				<div className="label">Pool (On-Demand)</div>
				<div className="value blue">{stats.poolCores}</div>
			</div>
			<div className="stat-card">
				<div className="label">Idle / No Work</div>
				<div className="value orange">{stats.idleCores + stats.noWorkCores}</div>
			</div>
			<div className="stat-card">
				<div className="label">Unique Parachains</div>
				<div className="value purple">{stats.uniqueParachains}</div>
			</div>
		</div>
	);
}
