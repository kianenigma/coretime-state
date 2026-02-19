import { useState, useEffect, useCallback } from "react";
import { fetchCoretimeData } from "../api/fetchCoretimeData";
import { Dashboard } from "./Dashboard";
import type { CoretimeData } from "../types";

export function App() {
	const [data, setData] = useState<CoretimeData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [progress, setProgress] = useState("Initializing...");

	const load = useCallback(async () => {
		setData(null);
		setError(null);
		setProgress("Initializing...");
		try {
			const result = await fetchCoretimeData(setProgress);
			setData(result);
		} catch (e) {
			setError(e instanceof Error ? e.message : String(e));
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	if (error) {
		return (
			<div className="error-screen">
				<h1>Failed to load coretime data</h1>
				<p className="error-msg">{error}</p>
				<button onClick={load}>Retry</button>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="loading-screen">
				<div className="spinner" />
				<h1>Polkadot Coretime State</h1>
				<p className="progress-msg">{progress}</p>
			</div>
		);
	}

	return <Dashboard data={data} onRefresh={load} />;
}
