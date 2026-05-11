import type { Stats, ParachainInfo } from "../types";
import { InfoTip } from "./InfoTip";

interface Props {
	stats: Stats;
	parachains: ParachainInfo[];
}

export function CapacityAnalysis({ stats, parachains }: Props) {
	const multiCore = parachains.filter((p) => p.coreCount > 1);
	const usedCores = stats.taskCores + stats.mixedCores;
	const unmanagedRelayCores = stats.relayCores - stats.totalCores;

	return (
		<div className="panel">
			<h2>
				Capacity Analysis
				<InfoTip text="Per-category breakdown of how cores are being used, including how the broker-managed set compares to the full relay-chain core set." />
			</h2>
			<div className="capacity-items">
				<div className="capacity-item">
					<span className="c-label">
						Cores with task assignments
						<InfoTip text="Broker cores serving specific parachains (Task or Mixed). Computed: taskCores + mixedCores." />
					</span>
					<span className="c-value">{usedCores}</span>
				</div>
				<div className="capacity-item">
					<span className="c-label">
						On-demand pool cores
						<InfoTip text="Broker cores feeding the on-demand pool. Source: stats.poolCores from CoreDescriptors classification." />
					</span>
					<span className="c-value">{stats.poolCores}</span>
				</div>
				<div className="capacity-item">
					<span className="c-label">
						Idle / No-work cores (broker)
						<InfoTip text="Broker cores with no productive schedule. Computed: idleCores + noWorkCores." />
					</span>
					<span className="c-value">{stats.idleCores + stats.noWorkCores}</span>
				</div>
				<div className="capacity-item">
					<span className="c-label">
						Relay cores not given to broker
						<InfoTip text="Cores that exist on the relay but the coretime broker has not been allocated. Computed: relayCores − brokerCores (ParachainHost.availability_cores length − ParaScheduler.CoreDescriptors length)." />
					</span>
					<span className="c-value">{unmanagedRelayCores}</span>
				</div>
				<div className="capacity-item">
					<span className="c-label">
						Unique bulk parachains
						<InfoTip text="Distinct parachains receiving Task assignments via the broker. Source: stats.uniqueParachains." />
					</span>
					<span className="c-value">{stats.uniqueParachains}</span>
				</div>
			</div>

			{multiCore.length > 0 && (
				<div className="multi-core-list">
					<h3>
						Multi-core Parachains (Elastic Scaling)
						<InfoTip text="Parachains assigned more than one broker core in the current schedule. Source: parachains where coreIndices.length > 1." />
					</h3>
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
