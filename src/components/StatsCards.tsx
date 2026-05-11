import type { Stats } from "../types";
import { InfoTip } from "./InfoTip";

interface Props {
	stats: Stats;
}

export function StatsCards({ stats }: Props) {
	return (
		<>
			<div className="stats-section">
				<div className="stats-section-label">
					Relay-Chain View
					<InfoTip text="Cores as seen by the relay chain itself, via the ParachainHost runtime API. Includes cores that the coretime broker has not (yet) been given to manage." />
				</div>
				<div className="stats-row">
					<div className="stat-card">
						<div className="label">
							Relay Cores
							<InfoTip text="Total cores on the relay chain. Source: ParachainHost.availability_cores() runtime API → array length." />
						</div>
						<div className="value">{stats.relayCores}</div>
					</div>
					<div className="stat-card">
						<div className="label">
							Occupied
							<InfoTip text="Relay cores currently processing a parachain candidate. Source: count of availability_cores entries with type='Occupied'." />
						</div>
						<div className="value green">{stats.relayOccupiedCores}</div>
					</div>
					<div className="stat-card">
						<div className="label">
							Scheduled
							<InfoTip text="Relay cores with a candidate assigned but not yet backed. Source: count of availability_cores entries with type='Scheduled'." />
						</div>
						<div className="value blue">{stats.relayScheduledCores}</div>
					</div>
					<div className="stat-card">
						<div className="label">
							Free
							<InfoTip text="Relay cores doing nothing this block. Source: count of availability_cores entries with type='Free'. Includes both broker-managed cores between blocks AND cores not managed by the broker at all (relayCores − brokerCores)." />
						</div>
						<div className="value orange">{stats.relayFreeCores}</div>
					</div>
				</div>
			</div>

			<div className="stats-section">
				<div className="stats-section-label">
					Broker-Managed View
					<InfoTip text="Cores allocated to the coretime broker. Always ≤ relay cores. The broker decides what each managed core does over time via the schedule in ParaScheduler.CoreDescriptors." />
				</div>
				<div className="stats-row">
					<div className="stat-card">
						<div className="label">
							Broker Cores
							<InfoTip text="Cores under coretime broker management. Source: ParaScheduler.CoreDescriptors length (also matches Broker.Status.core_count on the coretime chain)." />
						</div>
						<div className="value">{stats.totalCores}</div>
					</div>
					<div className="stat-card">
						<div className="label">
							Task-Assigned
							<InfoTip text="Broker cores whose current schedule contains only Task assignments (specific parachains). Source: count of CoreDescriptors where current_work.assignments has Task entries and no Pool/Idle." />
						</div>
						<div className="value green">{stats.taskCores}</div>
					</div>
					<div className="stat-card">
						<div className="label">
							Pool (On-Demand)
							<InfoTip text="Broker cores serving the on-demand pool. Source: count of CoreDescriptors whose current_work.assignments contains a Pool entry and no Task entry." />
						</div>
						<div className="value blue">{stats.poolCores}</div>
					</div>
					<div className="stat-card">
						<div className="label">
							Mixed
							<InfoTip text="Broker cores with a current schedule mixing Task with Pool/Idle. Source: count of CoreDescriptors with both Task and (Pool or Idle) entries in current_work.assignments." />
						</div>
						<div className="value purple">{stats.mixedCores}</div>
					</div>
					<div className="stat-card">
						<div className="label">
							Idle / No Work
							<InfoTip text="Broker cores with no productive schedule. 'Idle' = current_work.assignments contains only Idle; 'NoWork' = CoreDescriptor.current_work is null/undefined." />
						</div>
						<div className="value orange">{stats.idleCores + stats.noWorkCores}</div>
					</div>
					<div className="stat-card">
						<div className="label">
							Unique Parachains
							<InfoTip text="Distinct paraIds appearing in any Task assignment across all broker cores. Source: union of CoreDescriptors[*].current_work.assignments[*].(Task).value." />
						</div>
						<div className="value pink">{stats.uniqueParachains}</div>
					</div>
				</div>
			</div>
		</>
	);
}
