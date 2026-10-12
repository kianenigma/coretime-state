import type { SaleInfo, SaleRow, SaleRowKind } from "../types";
import type { NetworkConfig } from "../networks";
import { formatBalance, formatTimeslices } from "../format";
import { InfoTip } from "./InfoTip";

interface Props {
	sale: SaleInfo;
	token: NetworkConfig["token"];
}

const KIND_LABEL: Record<SaleRowKind, string> = {
	Renewed: "Renewed",
	RenewalPending: "Renewal pending",
	NotRenewed: "Not renewed",
	Purchased: "Bought",
};

const PRICE_NOTE: Record<SaleRowKind, string> = {
	Renewed: "next renewal",
	RenewalPending: "to renew",
	NotRenewed: "",
	Purchased: "paid",
};

const PHASE_LABEL: Record<SaleInfo["phase"], string> = {
	Interlude: "Interlude (renewals only)",
	Leadin: "Lead-in (price falling)",
	FixedPrice: "Fixed price",
};

// Rows that need attention first, then by core.
const KIND_ORDER: SaleRowKind[] = ["RenewalPending", "NotRenewed", "Purchased", "Renewed"];

function paraLabel(row: SaleRow) {
	if (row.paraIds.length === 0) return <span className="muted">unassigned</span>;
	return row.paraIds.map((pid, i) => (
		<div key={pid}>
			{pid}
			{row.names[i] && <span className="muted"> {row.names[i]}</span>}
		</div>
	));
}

export function SalePanel({ sale, token }: Props) {
	const fmt = (p: bigint) => formatBalance(p, token);
	const startsIn = sale.regionBegin - sale.currentTimeslice;

	// A para that skipped its renewal may have bought a fresh core instead.
	const purchasedBy = new Map<number, number>();
	for (const r of sale.rows) {
		if (r.kind === "Purchased" && r.nextCore !== null) for (const pid of r.paraIds) purchasedBy.set(pid, r.nextCore);
	}

	const rows = [...sale.rows].sort(
		(a, b) =>
			KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) ||
			(a.currentCore ?? a.nextCore ?? 0) - (b.currentCore ?? b.nextCore ?? 0),
	);

	return (
		<div className="panel">
			<h2>
				Bulk Sale & Renewals
				<InfoTip text="The broker sells the NEXT region while the current one runs. 'Now' cores come from Broker.Workload; 'next' cores from Broker.Workplan at sale.region_begin. Status: Renewal pending = Broker.PotentialRenewals{core, when: region_begin} still exists (do_renew deletes it). Renewed = no pending right and a next-region core with the same workload plus a renewal record. Bought = a sold next-region core that no current core renewed into. Reserved/leased cores are excluded." />
			</h2>
			<div className="sale-summary">
				<div className="broker-item">
					<span className="b-label">
						Phase
						<InfoTip text="Interlude: before SaleInfo.sale_start, only renewals allowed. Lead-in: price falls toward end_price over leadin_length blocks. Fixed price: after lead-in, price = end_price. Compared against the relay finalized block number." />
					</span>
					<span className="b-value">{PHASE_LABEL[sale.phase]}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						Current price
						<InfoTip text="Price to buy a core right now. Computed as end_price × lead-in factor (CenterTargetPrice: 100× → 10× over the first half of the lead-in, 10× → 1× over the second). Equals end_price once the lead-in is over." />
					</span>
					<span className="b-value">{sale.phase === "Interlude" ? "—" : fmt(sale.currentPrice)}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						End price
						<InfoTip text="Floor price of this sale. Source: Broker.SaleInfo.end_price." />
					</span>
					<span className="b-value">{fmt(sale.endPrice)}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						Sellout price
						<InfoTip text="Price of the last core sold up to the ideal number of cores; drives the next sale's prices. Source: Broker.SaleInfo.sellout_price." />
					</span>
					<span className="b-value">{sale.selloutPrice === null ? "—" : fmt(sale.selloutPrice)}</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						Sold / offered
						<InfoTip text="Includes renewals: both purchases and renewals take a core from the sale. Source: Broker.SaleInfo.cores_sold / cores_offered." />
					</span>
					<span className="b-value">
						{sale.coresSold} / {sale.coresOffered}
					</span>
				</div>
				<div className="broker-item">
					<span className="b-label">
						Region for sale
						<InfoTip text="Timeslices [region_begin, region_end) from Broker.SaleInfo; 1 timeslice = 80 relay blocks ≈ 8 min. Countdown is measured from Broker.Status.last_timeslice." />
					</span>
					<span className="b-value">
						{startsIn > 0 ? `starts in ${formatTimeslices(startsIn)}` : "started"}
					</span>
				</div>
			</div>

			<div className="sale-table-wrap">
			<table className="para-table sale-table">
				<thead>
					<tr>
						<th>Status</th>
						<th>
							Parachain
							<InfoTip text="Task(s) in the core's workload. Names resolved via the manager's identity on the People chain." />
						</th>
						<th>
							Core now → next
							<InfoTip text="Core index in the running region → core index in the region being sold. Renewals usually land on a different core index." />
						</th>
						<th>
							Price
							<InfoTip text="Bought: the exact price paid (renewal record written by do_assign uses price = paid). Renewal pending: the exact price to renew. Renewed: the price to renew AGAIN in the next sale — the price actually paid for this renewal is not kept in on-chain state (only in the Renewed event)." />
						</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((r, i) => {
						const boughtInstead = r.kind === "RenewalPending" ? r.paraIds.map((pid) => purchasedBy.get(pid)).find((c) => c !== undefined) : undefined;
						return (
							<tr key={i}>
								<td>
									<span className={`sale-badge ${r.kind}`}>{KIND_LABEL[r.kind]}</span>
									{boughtInstead !== undefined && <div className="muted small">bought core {boughtInstead} instead</div>}
								</td>
								<td>{paraLabel(r)}</td>
								<td>
									{r.currentCore ?? <span className="muted">—</span>} → {r.nextCore ?? <span className="muted">—</span>}
								</td>
								<td>
									{r.price === null ? (
										<span className="muted">—</span>
									) : (
										<>
											{fmt(r.price)} <span className="muted small">{PRICE_NOTE[r.kind]}</span>
										</>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			</div>
		</div>
	);
}
