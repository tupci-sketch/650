# sim650 — 650's stats/sim Cloudflare Worker

A tiny, dependency-free Worker that gives 650 a durable, cross-player stats
layer. It runs on the **same Cloudflare account and D1 database as Spectrum
Sweeps**, but every object it touches is namespaced `sim650_*` (tables) and
`/sim650/*` (routes), so the two apps can never collide.

- **Live URL:** `https://sim650.relics62statues.workers.dev`
- **Binding:** `DB` → D1 `spectrum-sweeps-db`
- **Tables:** `sim650_runs` (+ index `sim650_runs_scen`)

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/sim650/health` | liveness |
| POST | `/sim650/run` | record an anonymous run summary |
| GET | `/sim650/stats?scenario=&difficulty=&seats=` | population aggregates + your percentile |

All anonymous, unauthenticated, no PII — just seat totals and forecast summaries.
CORS is limited to the 650 site origins (`650-0.co.uk`, the GitHub Pages host,
localhost for dev). The game client (`js/sim650.js`) is entirely fail-soft: if
the Worker is unreachable it simply hides the comparison.

## Deploy

CI (`.github/workflows/deploy-sim650.yml`) runs `wrangler deploy` on any change
under `worker/`. It needs two repo **Actions secrets** — never committed:

- `CLOUDFLARE_ACCOUNT_ID` = `19af458c5c0a6fb9cefeba6b9785f0b1`
- `CLOUDFLARE_API_TOKEN` = a token scoped to *Workers Scripts: Edit* + *D1:
  Edit/Read*

Manual deploy (from this dir, with those two env vars set):

```sh
npx wrangler@3 deploy
```

The `sim650_*` tables are created idempotently (`CREATE TABLE IF NOT EXISTS`) on
first request, so no migration step touches the shared database's schema
tracking.
