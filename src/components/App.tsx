import { useState, useEffect, useCallback, useRef } from "react";
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
	// Tagged with the network it was loaded for, so a network switch never renders stale data.
	const [loaded, setLoaded] = useState<{ id: NetworkId; data: CoretimeData } | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [progress, setProgress] = useState("Initializing...");
	// Only the most recent load may update state; earlier in-flight loads are ignored.
	const latestLoad = useRef(0);

	const load = useCallback(async (id: NetworkId) => {
		const loadId = ++latestLoad.current;
		const isLatest = () => loadId === latestLoad.current;
		setLoaded(null);
		setError(null);
		setProgress("Initializing...");
		try {
			const result = await fetchCoretimeData(NETWORKS[id], (msg) => isLatest() && setProgress(msg));
			if (isLatest()) setLoaded({ id, data: result });
		} catch (e) {
			if (isLatest()) setError(e instanceof Error ? e.message : String(e));
		}
	}, []);

	useEffect(() => {
		load(networkId);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(NETWORK_STORAGE_KEY, networkId);
		}
	}, [load, networkId]);

	const network = NETWORKS[networkId];
	const data = loaded?.id === networkId ? loaded.data : null;

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
