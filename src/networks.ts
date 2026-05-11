import { dot, dotCoretime, dotPeople, ksm, ksmCoretime, ksmPeople } from "@polkadot-api/descriptors";

export type NetworkId = "polkadot" | "kusama";

export interface NetworkConfig {
	id: NetworkId;
	label: string;
	relayRpc: string;
	coretimeRpc: string;
	peopleRpc: string;
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
		relayRpc: "wss://rpc.ibp.network/polkadot",
		coretimeRpc: "wss://polkadot-coretime-rpc.polkadot.io",
		peopleRpc: "wss://polkadot-people-rpc.polkadot.io",
		relayDescriptor: dot,
		coretimeDescriptor: dotCoretime,
		peopleDescriptor: dotPeople,
	},
	kusama: {
		id: "kusama",
		label: "Kusama",
		relayRpc: "wss://rpc.ibp.network/kusama",
		coretimeRpc: "wss://sys.ibp.network/coretime-kusama",
		peopleRpc: "wss://sys.ibp.network/people-kusama",
		relayDescriptor: ksm,
		coretimeDescriptor: ksmCoretime,
		peopleDescriptor: ksmPeople,
	},
};

export const DEFAULT_NETWORK: NetworkId = "polkadot";
