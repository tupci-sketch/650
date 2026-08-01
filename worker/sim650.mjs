/* =============================================================================
   650 — sim650 Cloudflare Worker  (shared backend on spectrum-sweeps-db)
   -----------------------------------------------------------------------------
   A tiny, dependency-free Worker that gives 650 a durable, cross-player stats
   layer. It lives ALONGSIDE the Spectrum Sweeps app on the same Cloudflare
   account and the same D1 database, but every object it touches is namespaced
   `sim650_*`, so the two never collide. No secrets in this file — the D1 handle
   arrives as the `DB` binding, configured at deploy time.

   Endpoints (all under /sim650):
     GET  /sim650/health                       — liveness
     POST /sim650/run     {run summary}         — record an anonymous run
     GET  /sim650/stats?scenario=&difficulty=&seats=
                                                — population aggregates + your
                                                  percentile for that scenario
   Anonymous, unauthenticated, no PII — just seat totals and forecast summaries.
   ============================================================================= */

const ALLOW = new Set([
  "https://650-0.co.uk", "https://www.650-0.co.uk",
  "https://tupci-sketch.github.io",
  "http://localhost:8080", "http://localhost:3000", "null"
]);
const DEFAULT_ORIGIN = "https://650-0.co.uk";

function cors(origin) {
  const o = origin && ALLOW.has(origin) ? origin : DEFAULT_ORIGIN;
  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}
function json(data, origin, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", ...cors(origin) }
  });
}

async function ensureSchema(DB) {
  await DB.prepare(
    "CREATE TABLE IF NOT EXISTS sim650_runs (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER, scenario TEXT, country TEXT, " +
    "mode TEXT, difficulty TEXT, cab_sig TEXT, per_seat REAL, seats INTEGER, total INTEGER, " +
    "p_majority REAL, p5 INTEGER, p50 INTEGER, p95 INTEGER, model TEXT)"
  ).run();
  await DB.prepare(
    "CREATE INDEX IF NOT EXISTS sim650_runs_scen ON sim650_runs(scenario, difficulty)"
  ).run();
}

/* light input hygiene so the shared DB never gets junk */
const s = (v, max) => (v == null ? "" : String(v)).slice(0, max || 40);
const clampInt = (v, lo, hi) => { v = parseInt(v, 10); if (!isFinite(v)) v = 0; return Math.max(lo, Math.min(hi, v)); };
const clampNum = (v, lo, hi) => { v = parseFloat(v); if (!isFinite(v)) v = 0; return Math.max(lo, Math.min(hi, v)); };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const path = url.pathname.replace(/\/+$/, "");

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (!env.DB) return json({ ok: false, error: "no-db-binding" }, origin, 500);

    try {
      if (path === "/sim650/health") return json({ ok: true, service: "sim650", ts: Date.now() }, origin);

      if (path === "/sim650/run" && request.method === "POST") {
        const b = await request.json().catch(() => ({}));
        const total = clampInt(b.total, 1, 5000);
        await ensureSchema(env.DB);
        await env.DB.prepare(
          "INSERT INTO sim650_runs (ts,scenario,country,mode,difficulty,cab_sig,per_seat,seats,total,p_majority,p5,p50,p95,model) " +
          "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        ).bind(
          Date.now(), s(b.scenario, 40) || "freshstart", s(b.country, 4), s(b.mode, 12),
          s(b.difficulty, 10), s(b.cabSig, 200), clampNum(b.perSeat, 0, 100),
          clampInt(b.seats, 0, total), total, clampNum(b.pMajority, 0, 1),
          clampInt(b.p5, 0, total), clampInt(b.p50, 0, total), clampInt(b.p95, 0, total), s(b.model, 12)
        ).run();
        return json({ ok: true }, origin);
      }

      if (path === "/sim650/stats" && request.method === "GET") {
        await ensureSchema(env.DB);
        const scenario = s(url.searchParams.get("scenario"), 40) || "freshstart";
        const difficulty = s(url.searchParams.get("difficulty"), 10) || "normal";
        const seats = url.searchParams.get("seats");
        const agg = await env.DB.prepare(
          "SELECT COUNT(*) n, AVG(seats) avg_seats, MIN(seats) min_seats, MAX(seats) max_seats, " +
          "AVG(per_seat) avg_ps, AVG(p_majority) avg_pmaj FROM sim650_runs WHERE scenario=? AND difficulty=?"
        ).bind(scenario, difficulty).first();
        let percentile = null;
        if (seats != null && agg && agg.n > 0) {
          const r = await env.DB.prepare(
            "SELECT COUNT(*) le FROM sim650_runs WHERE scenario=? AND difficulty=? AND seats<=?"
          ).bind(scenario, difficulty, clampInt(seats, 0, 5000)).first();
          percentile = r ? r.le / agg.n : null;
        }
        return json({
          ok: true, scenario, difficulty,
          n: (agg && agg.n) || 0,
          avgSeats: agg && agg.avg_seats != null ? Math.round(agg.avg_seats) : null,
          minSeats: agg ? agg.min_seats : null,
          maxSeats: agg ? agg.max_seats : null,
          avgPerSeat: agg && agg.avg_ps != null ? Math.round(agg.avg_ps) : null,
          avgPMajority: agg && agg.avg_pmaj != null ? agg.avg_pmaj : null,
          percentile
        }, origin);
      }

      return json({ ok: false, error: "not-found" }, origin, 404);
    } catch (e) {
      return json({ ok: false, error: "server", detail: String(e && e.message || e).slice(0, 200) }, origin, 500);
    }
  }
};
