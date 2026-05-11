import type { CoretimeData } from "../types";
import { StatsCards } from "./StatsCards";
import { CoreGrid } from "./CoreGrid";
import { ParachainTable } from "./ParachainTable";
import { BrokerPanel } from "./BrokerPanel";
import { CapacityAnalysis } from "./CapacityAnalysis";
import { InfoTip } from "./InfoTip";

interface Props {
	data: CoretimeData;
	onRefresh: () => void;
}

export function Dashboard({ data, onRefresh }: Props) {
	return (
		<>
			<div className="header">
				<h1>Polkadot Coretime State</h1>
				<span className="subtitle">
					Live on-chain snapshot
					<InfoTip text="Data is fetched live from three chains: the Polkadot relay (ParaScheduler + ParachainHost runtime API + Registrar), the Coretime parachain (Broker pallet), and the People chain (Identity pallet). Hover the ⓘ on any stat for the exact storage entry or formula used." />
				</span>
				<button
					onClick={onRefresh}
					style={{
						marginLeft: "auto",
						background: "var(--bg-tertiary)",
						color: "var(--text-primary)",
						border: "1px solid var(--border)",
						borderRadius: "6px",
						padding: "0.375rem 0.75rem",
						fontFamily: "inherit",
						fontSize: "0.75rem",
						cursor: "pointer",
					}}
				>
					Refresh
				</button>
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
