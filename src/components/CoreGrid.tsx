import { useState } from "react";
import type { CoreInfo, ParachainInfo } from "../types";

interface Props {
	cores: CoreInfo[];
	parachains: ParachainInfo[];
}

const LEGEND: { cls: string; label: string; color: string }[] = [
	{ cls: "task", label: "Task (Parachain)", color: "var(--accent-green)" },
	{ cls: "pool", label: "Pool (On-Demand)", color: "var(--accent-blue)" },
	{ cls: "mixed", label: "Mixed", color: "var(--accent-purple)" },
	{ cls: "idle", label: "Idle", color: "var(--accent-orange)" },
	{ cls: "nowork", label: "No Work", color: "var(--bg-tertiary)" },
];

export function CoreGrid({ cores, parachains }: Props) {
	const [hoveredCore, setHoveredCore] = useState<number | null>(null);

	const paraMap = new Map(parachains.map((p) => [p.paraId, p]));

	function coreClass(core: CoreInfo): string {
		switch (core.assignment) {
			case "Task": return "task";
			case "Pool": return "pool";
			case "Mixed": return "mixed";
			case "Idle": return "idle";
			case "NoWork": return "nowork";
		}
	}

	function tooltipContent(core: CoreInfo) {
		const lines: string[] = [`Core ${core.index}`];
		if (core.assignment === "Task" || core.assignment === "Mixed") {
			for (const pid of core.paraIds) {
				const pct = ((core.parts[pid] / 57600) * 100).toFixed(1);
				const para = paraMap.get(pid);
				const name = para?.name ? ` (${para.name})` : "";
				lines.push(`${pid}${name} @ ${pct}%`);
			}
		} else {
			lines.push(core.assignment);
		}
		return lines;
	}

	return (
		<div className="panel">
			<h2>Core Assignments</h2>
			<div className="legend">
				{LEGEND.map((l) => (
					<div key={l.cls} className="legend-item">
						<div className="legend-swatch" style={{ background: l.color }} />
						{l.label}
					</div>
				))}
			</div>
			<div className="core-grid">
				{cores.map((core) => (
					<div
						key={core.index}
						className={`core-cell ${coreClass(core)}`}
						onMouseEnter={() => setHoveredCore(core.index)}
						onMouseLeave={() => setHoveredCore(null)}
					>
						{core.index}
						{hoveredCore === core.index && (
							<div className="core-tooltip">
								{tooltipContent(core).map((line, i) => (
									<div key={i} className={i === 0 ? "tt-core" : "tt-detail"}>
										{line}
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
