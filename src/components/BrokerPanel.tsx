import type { BrokerInfo } from "../types";

interface Props {
	broker: BrokerInfo;
}

export function BrokerPanel({ broker }: Props) {
	const unsold = broker.coresOffered - broker.coresSold;

	return (
		<div className="panel">
			<h2>Broker Perspective</h2>
			<div className="capacity-items">
				<div className="broker-item">
					<span className="b-label">Core Count</span>
					<span className="b-value">{broker.coreCount}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">Reserved</span>
					<span className="b-value">{broker.reserved}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">Leased</span>
					<span className="b-value">{broker.leased}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">Offered for Sale</span>
					<span className="b-value">{broker.coresOffered}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">Sold</span>
					<span className="b-value">{broker.coresSold}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">Unsold (to Pool)</span>
					<span className="b-value">{unsold}</span>
				</div>
			</div>
		</div>
	);
}
