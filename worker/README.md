# 650 — Cloudflare Worker (backend + forecast stats)

The 650 backend, moved off Google Apps Script onto Cloudflare. Runs on the same
account + D1 database as Spectrum Sweeps, with everything namespaced so the apps
never collide:

- **Live URL:** `https://sim650.relics62statues.workers.dev`
- **Binding:** `DB` → D1 `spectrum-sweeps-db`
- **Secret:** `PEPPER` (password/token hashing) — an encrypted Worker secret,
  never in the repo.
- **Tables:** `b650_*` (backend: accounts, owners, board, runs, chat, config,
  pols) and `sim650_*` (forecast stats). Isolated from the tournament tables.

## Protocol

Speaks the exact same `{ game:"650", kind }` POST protocol the Apps Script did,
and returns the same JSON shapes — so the only client change was the endpoint
URL (`js/leaderboard.js`). Kinds: `submit, log, board, overall, overall_pct,
register, login, session, logout, save, config, roster, chat_fetch, chat_post,
chat_delete, admin_users, admin_setlevel, admin_ban, admin_unban, admin_banner,
admin_streams, admin_addpol, admin_delpol, player_runs`. `GET /` returns the
board/overall/config snapshot. `/sim650/*` serves the forecast-stats layer.

Passwords + session/owner tokens are salted + PEPPERED and SHA-256 hashed
(`value|salt|PEPPER`) via Web Crypto — identical to the old backend, so migrated
hashes verify with the same pepper. The first account to register is admin (9).

## Deploy

CI (`.github/workflows/deploy-sim650.yml`) runs `wrangler deploy` on changes
under `worker/`. Two repo **Actions secrets** (never committed):

- `CLOUDFLARE_ACCOUNT_ID` = `19af458c5c0a6fb9cefeba6b9785f0b1`
- `CLOUDFLARE_API_TOKEN` = token scoped to *Workers Scripts: Edit* + *D1:
  Edit/Read*

The `PEPPER` secret is set once and preserved across deploys. If the Worker is
ever recreated from scratch, set it again:

```sh
cd worker && npx wrangler secret put PEPPER   # paste the pepper when prompted
```

Manual deploy (from `worker/`, with the two CF env vars set): `npx wrangler deploy`.
