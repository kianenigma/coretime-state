export type CoreAssignment = "Task" | "Pool" | "Idle" | "NoWork" | "Mixed";

export interface CoreInfo {
	index: number;
	assignment: CoreAssignment;
	paraIds: number[];
	/** Maps paraId -> ratio (out of 57600) for task assignments */
	parts: Record<number, number>;
	/** Claim queue entries: paraId or -1 for Pool */
	claimQueue: number[];
}

export interface ParachainInfo {
	paraId: number;
	name: string | null;
	manager: string;
	coreCount: number;
	coreIndices: number[];
}

export interface BrokerInfo {
	coreCount: number;
	reserved: number;
	leased: number;
	coresOffered: number;
	coresSold: number;
}

/**
 * How a bulk core of the current region relates to the region being sold.
 * - Renewed: the current workload was renewed onto `nextCore`.
 * - RenewalPending: the renewal right still exists and has not been used yet.
 * - NotRenewed: no renewal right and no matching next-region core.
 * - Purchased: a next-region core bought fresh in the current sale.
 */
export type SaleRowKind = "Renewed" | "RenewalPending" | "NotRenewed" | "Purchased";

export interface SaleRow {
	kind: SaleRowKind;
	paraIds: number[];
	/** Identity names aligned with `paraIds`. */
	names: (string | null)[];
	/** Core index in the currently running region (null for fresh purchases). */
	currentCore: number | null;
	/** Core index in the region being sold (null if not secured). */
	nextCore: number | null;
	/**
	 * Price in plancks. Meaning depends on `kind`:
	 * Purchased = price paid; RenewalPending = price to renew;
	 * Renewed = price to renew again next sale (the price paid is not kept in state).
	 */
	price: bigint | null;
}

export type SalePhase = "Interlude" | "Leadin" | "FixedPrice";

export interface SaleInfo {
	regionBegin: number;
	regionEnd: number;
	/** Broker.Status.last_timeslice — the broker's notion of "now". */
	currentTimeslice: number;
	phase: SalePhase;
	/** Sale price right now (estimated from the lead-in curve). */
	currentPrice: bigint;
	endPrice: bigint;
	/** Price of the last core sold up to ideal_cores_sold, if any. */
	selloutPrice: bigint | null;
	coresOffered: number;
	coresSold: number;
	rows: SaleRow[];
}

export interface Stats {
	/** Cores managed by the coretime/broker pallet (ParaScheduler.CoreDescriptors length). */
	totalCores: number;
	/** All cores on the relay chain (ParachainHost.availability_cores length). */
	relayCores: number;
	/** Relay cores currently doing nothing (availability_cores entries of type Free). */
	relayFreeCores: number;
	/** Relay cores currently occupied by a candidate (availability_cores type Occupied). */
	relayOccupiedCores: number;
	/** Relay cores with a scheduled-but-not-yet-occupied candidate (availability_cores type Scheduled). */
	relayScheduledCores: number;
	taskCores: number;
	poolCores: number;
	idleCores: number;
	noWorkCores: number;
	mixedCores: number;
	uniqueParachains: number;
}

export interface CoretimeData {
	cores: CoreInfo[];
	parachains: ParachainInfo[];
	broker: BrokerInfo;
	sale: SaleInfo | null;
	stats: Stats;
}
