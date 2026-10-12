import { dot, dotCoretime, dotPeople, ksm, ksmCoretime, ksmPeople } from "@polkadot-api/descriptors";

export type NetworkId = "polkadot" | "kusama";

export interface NetworkConfig {
	id: NetworkId;
	label: string;
	// Endpoints are tried in order; the provider rotates to the next one on failure.
	relayRpc: string[];
	coretimeRpc: string[];
	peopleRpc: string[];
	token: { symbol: string; decimals: number };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	relayDescriptor: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	coretimeDescriptor: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	peopleDescriptor: any;
}

export const NETWORKS: Record<NetworkId, NetworkConfig> = {
	polkadot: {
		id: "polkadot",
		label: "Polkadot",
		relayRpc: ["wss://rpc.polkadot.io", "wss://polkadot-rpc.n.dwellir.com", "wss://rpc.ibp.network/polkadot"],
		coretimeRpc: ["wss://polkadot-coretime-rpc.polkadot.io", "wss://sys.ibp.network/coretime-polkadot"],
		peopleRpc: ["wss://polkadot-people-rpc.polkadot.io", "wss://sys.ibp.network/people-polkadot"],
		relayDescriptor: dot,
		coretimeDescriptor: dotCoretime,
		peopleDescriptor: dotPeople,
		token: { symbol: "DOT", decimals: 10 },
	},
	kusama: {
		id: "kusama",
		label: "Kusama",
		relayRpc: ["wss://kusama-rpc.polkadot.io", "wss://kusama-rpc.n.dwellir.com", "wss://rpc.ibp.network/kusama"],
		coretimeRpc: ["wss://kusama-coretime-rpc.polkadot.io", "wss://sys.ibp.network/coretime-kusama"],
		peopleRpc: ["wss://kusama-people-rpc.polkadot.io", "wss://sys.ibp.network/people-kusama"],
		relayDescriptor: ksm,
		coretimeDescriptor: ksmCoretime,
		peopleDescriptor: ksmPeople,
		token: { symbol: "KSM", decimals: 12 },
	},
};

export const DEFAULT_NETWORK: NetworkId = "polkadot";
