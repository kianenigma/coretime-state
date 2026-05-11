import type { BrokerInfo } from "../types";
import { InfoTip } from "./InfoTip";

interface Props {
	broker: BrokerInfo;
}

export function BrokerPanel({ broker }: Props) {
	const unsold = broker.coresOffered - broker.coresSold;

	return (
		<div className="panel">
			<h2>
				Broker Perspective
				<InfoTip text="Snapshot of the coretime broker pallet on the Coretime parachain. These numbers describe how the broker views and allocates cores it has been given by the relay." />
			</h2>
			<div className="capacity-items">
				<div className="broker-item">
					<span className="b-label">
						Core Count
						<InfoTip text="Cores under broker management. Source: Broker.Status.core_count on the Coretime chain." />
					</span>
					<span className="b-value">{broker.coreCount}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						Reserved
						<InfoTip text="Long-term governance-reserved cores (e.g. system chains). Source: Broker.Reservations.length." />
					</span>
					<span className="b-value">{broker.reserved}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						Leased
						<InfoTip text="Cores currently leased to parachains (legacy slot leases migrated into coretime). Source: Broker.Leases.length." />
					</span>
					<span className="b-value">{broker.leased}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						Offered for Sale
						<InfoTip text="Cores being offered in the current bulk sale. Source: Broker.SaleInfo.cores_offered." />
					</span>
					<span className="b-value">{broker.coresOffered}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						Sold
						<InfoTip text="Cores already sold in the current bulk sale. Source: Broker.SaleInfo.cores_sold." />
					</span>
					<span className="b-value">{broker.coresSold}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						Unsold (to Pool)
						<InfoTip text="Cores offered but not yet sold; the broker routes these to the on-demand pool. Computed: cores_offered − cores_sold." />
					</span>
					<span className="b-value">{unsold}</span>
				</div>
			</div>
		</div>
	);
}
