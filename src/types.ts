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

export interface Stats {
	totalCores: number;
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
	stats: Stats;
}
