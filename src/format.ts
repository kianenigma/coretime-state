import type { NetworkConfig } from "./networks";

/** Formats a planck amount as e.g. "1.159 KSM", keeping at most `maxDecimals` decimals. */
export function formatBalance(plancks: bigint, token: NetworkConfig["token"], maxDecimals = 3): string {
	const base = 10n ** BigInt(token.decimals);
	const whole = plancks / base;
	const frac = (plancks % base).toString().padStart(token.decimals, "0").slice(0, maxDecimals).replace(/0+$/, "");
	return `${whole.toLocaleString("en-US")}${frac ? `.${frac}` : ""} ${token.symbol}`;
}

const RELAY_BLOCKS_PER_TIMESLICE = 80;
const RELAY_BLOCK_SECONDS = 6;

/** Rough human duration for a number of broker timeslices, e.g. "~3.2 days". */
export function formatTimeslices(timeslices: number): string {
	const days = (timeslices * RELAY_BLOCKS_PER_TIMESLICE * RELAY_BLOCK_SECONDS) / 86400;
	return days >= 1 ? `~${days.toFixed(1)} days` : `~${Math.round(days * 24)} hours`;
}
