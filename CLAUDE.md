# Coretime State Dashboard

## What This Is
A static web app that visualizes Polkadot coretime allocation. It queries the Polkadot relay chain, Coretime parachain, and People parachain to show per-core assignments, broker status, and capacity analysis in a dark-themed dashboard UI.

## Tech Stack
- **Vite + React + TypeScript**
- **bun** as package manager (no npm/node)
- **polkadot-api** for chain queries
- **PAPI descriptors** in `.papi/` (copied from `../papi-playground`, trimmed to dot, dotCoretime, dotPeople only)
- **GitHub Pages** deployment via GitHub Actions

## Project Status

### COMPLETED
- Project scaffold: package.json, tsconfig.json, vite.config.ts, index.html, .gitignore
- Dependencies installed (`bun install` done, lockfile exists)
- `.papi/` directory copied from `../papi-playground` and polkadot-api.json trimmed to 3 chains
- `src/types.ts` — shared data types (CoreInfo, ParachainInfo, BrokerInfo, Stats, CoretimeData)
- `src/api/fetchCoretimeData.ts` — data fetching logic ported from `../papi-playground/src/coretime.ts`
- `src/components/App.tsx` — main app with loading/error/dashboard states
- `src/components/Dashboard.tsx` — top-level layout
- `src/components/StatsCards.tsx` — summary stat cards
- `src/components/CoreGrid.tsx` — visual grid of all cores (color-coded with hover tooltips)
- `src/components/ParachainTable.tsx` — sortable parachain table
- `src/components/BrokerPanel.tsx` — broker perspective card
- `src/components/CapacityAnalysis.tsx` — capacity analysis + multi-core parachain list
- `src/index.css` — dark theme, monospace feel
- `src/main.tsx` — React entry point
- `src/vite-env.d.ts` — Vite type reference
- `.github/workflows/deploy.yml` — GitHub Pages deployment
- **Build verified**: `bun run build` succeeds, outputs to `dist/`

### TODO
- `git init -b main` and initial commit
- Test with `bun run dev` against live chains to verify data loads and renders correctly
- Any visual tweaks after seeing it live

## Commands
```bash
bun run dev      # Dev server
bun run build    # Production build to dist/
bun run preview  # Preview production build
```

## Architecture
```
src/
├── api/
│   └── fetchCoretimeData.ts   # Connects to 3 chains, returns CoretimeData
├── components/
│   ├── App.tsx                # Loading → Error → Dashboard state machine
│   ├── Dashboard.tsx          # Layout: stats → grid → table + panels
│   ├── StatsCards.tsx         # 5 stat cards at top
│   ├── CoreGrid.tsx           # Color-coded core grid with hover tooltips
│   ├── ParachainTable.tsx     # Sortable table (paraId, name, manager, cores)
│   ├── BrokerPanel.tsx        # Broker stats (reserved, leased, sold, etc.)
│   └── CapacityAnalysis.tsx   # Utilization + multi-core parachains
├── types.ts                   # Shared types (no PAPI types leak into UI)
├── main.tsx                   # React entry
├── index.css                  # Dark theme styles
└── vite-env.d.ts
```

## Color Coding (Core Grid)
- **Green** = Task (active parachain)
- **Blue** = Pool (on-demand)
- **Purple** = Mixed assignment
- **Orange** = Idle
- **Dark gray** = No work assigned

## Original CLI Reference
The data fetching logic is ported from `../papi-playground/src/coretime.ts`. If you need to understand the chain queries or data model, that file is the source of truth.
