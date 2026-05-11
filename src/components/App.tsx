import { useState, useEffect, useCallback } from "react";
import { fetchCoretimeData } from "../api/fetchCoretimeData";
import { Dashboard } from "./Dashboard";
import type { CoretimeData } from "../types";
import { NETWORKS, DEFAULT_NETWORK, type NetworkId } from "../networks";

const NETWORK_STORAGE_KEY = "coretime-state.network";

function readStoredNetwork(): NetworkId {
	if (typeof window === "undefined") return DEFAULT_NETWORK;
	const v = window.localStorage.getItem(NETWORK_STORAGE_KEY);
	if (v === "polkadot" || v === "kusama") return v;
	return DEFAULT_NETWORK;
}

export function App() {
	const [networkId, setNetworkId] = useState<NetworkId>(readStoredNetwork);
	const [data, setData] = useState<CoretimeData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [progress, setProgress] = useState("Initializing...");

	const load = useCallback(async (id: NetworkId) => {
		setData(null);
		setError(null);
		setProgress("Initializing...");
		try {
			const result = await fetchCoretimeData(NETWORKS[id], setProgress);
			setData(result);
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e));
		}
	}, []);

	useEffect(() => {
		load(networkId);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(NETWORK_STORAGE_KEY, networkId);
		}
	}, [load, networkId]);

	const network = NETWORKS[networkId];

	if (error) {
		return (
			<div className="error-screen">
				<h1>Failed to load coretime data</h1>
				<p className="error-msg">{error}</p>
				<button onClick={() => load(networkId)}>Retry</button>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="loading-screen">
				<div className="spinner" />
				<h1>{network.label} Coretime State</h1>
				<p className="progress-msg">{progress}</p>
			</div>
		);
	}

	return (
		<Dashboard
			data={data}
			network={network}
			onRefresh={() => load(networkId)}
			onNetworkChange={setNetworkId}
		/>
	);
}
