import type { CoretimeData } from "../types";
import { StatsCards } from "./StatsCards";
import { CoreGrid } from "./CoreGrid";
import { ParachainTable } from "./ParachainTable";
import { BrokerPanel } from "./BrokerPanel";
import { CapacityAnalysis } from "./CapacityAnalysis";
import { InfoTip } from "./InfoTip";
import { NETWORKS, type NetworkConfig, type NetworkId } from "../networks";

interface Props {
	data: CoretimeData;
	network: NetworkConfig;
	onRefresh: () => void;
	onNetworkChange: (id: NetworkId) => void;
}

export function Dashboard({ data, network, onRefresh, onNetworkChange }: Props) {
	return (
		<>
			<div className="header">
				<h1>{network.label} Coretime State</h1>
				<span className="subtitle">
					Live on-chain snapshot
					<InfoTip text="Data is fetched live from three chains: the relay (ParaScheduler + ParachainHost runtime API + Registrar), the Coretime parachain (Broker pallet), and the People chain (Identity pallet). Hover the ⓘ on any stat for the exact storage entry or formula used." />
				</span>
				<div className="header-controls">
					<div className="network-switch" role="tablist" aria-label="Network">
						{(Object.values(NETWORKS) as NetworkConfig[]).map((n) => (
							<button
								key={n.id}
								role="tab"
								aria-selected={n.id === network.id}
								className={`network-switch-btn ${n.id === network.id ? "active" : ""}`}
								onClick={() => onNetworkChange(n.id)}
							>
								{n.label}
							</button>
						))}
					</div>
					<button className="refresh-btn" onClick={onRefresh}>
						Refresh
					</button>
				</div>
			</div>

			<StatsCards stats={data.stats} />
			<CoreGrid cores={data.cores} parachains={data.parachains} />

			<div className="bottom-row">
				<ParachainTable parachains={data.parachains} />
				<div>
					<BrokerPanel broker={data.broker} />
					<CapacityAnalysis stats={data.stats} parachains={data.parachains} />
				</div>
			</div>
		</>
	);
}
