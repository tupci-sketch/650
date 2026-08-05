/* =============================================================================
   650 — sim650 client  (optional Cloudflare stats backend)
   -----------------------------------------------------------------------------
   Talks to the sim650 Worker (a durable, D1-backed stats layer that lives on the
   same Cloudflare account as Spectrum Sweeps, with sim650_* tables). It records
   an anonymous summary of each finished election and shows how your result
   compares to everyone else who has played the same scenario. Entirely
   fail-soft: no network, a slow endpoint, or an offline device just hides the
   comparison — the game never waits on it and never breaks. No secrets here; it
   only calls the Worker's public URL.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var S = G.SIM650 = G.SIM650 || {};

  S.URL = "https://sim650.relics62statues.workers.dev";
  S.enabled = true;
  S._sent = {};                 // dedupe identical re-runs within a session

  function timeout(ms) { return new Promise(function (_, rej) { setTimeout(function () { rej(new Error("t")); }, ms); }); }
  function race(p, ms) { return Promise.race([p, timeout(ms)]); }
  function post(path, body) {
    return race(fetch(S.URL + path, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body) }).then(function (r) { return r.json(); }), 6000).catch(function () { return { ok: false }; });
  }
  function get(path) {
    return race(fetch(S.URL + path).then(function (r) { return r.json(); }), 6000).catch(function () { return { ok: false }; });
  }

  S.summarize = function (res, meta) {
    meta = meta || {};
    var fc = res.forecast || {}, pct = fc.pct || {};
    var total = (fc.thresholds && fc.thresholds.total) || (G.activeTotalSeats ? G.activeTotalSeats() : 650);
    return {
      scenario: meta.scenario || "freshstart", country: meta.country || "uk",
      mode: meta.mode || "unity", difficulty: meta.difficulty || "normal",
      cabSig: String(meta.cabSig || res.seed || ""),
      perSeat: res.rating ? res.rating.perSeat : 0,
      seats: res.seats, total: total,
      pMajority: (res.odds && res.odds.majority) || 0,
      p5: pct.p5 != null ? pct.p5 : res.seats, p50: pct.p50 != null ? pct.p50 : res.seats, p95: pct.p95 != null ? pct.p95 : res.seats,
      model: (G.SimCore && G.SimCore.MODEL_VERSION) || "mc1"
    };
  };

  /* record this run and then show the population comparison */
  S.report = function (res, meta) {
    if (!S.enabled || !res || typeof fetch !== "function") return;
    var sum = S.summarize(res, meta);
    var key = sum.scenario + "|" + sum.difficulty + "|" + sum.cabSig + "|" + sum.seats;
    var el = document.getElementById("sim650Compare");
    if (el) el.style.display = "none";
    var pipe = S._sent[key]
      ? get(statsPath(sum))                                   // already recorded this exact run — just refresh stats
      : post("/sim650/run", sum).then(function () { S._sent[key] = 1; return get(statsPath(sum)); });
    pipe.then(function (st) { S.render(st, sum); }).catch(function () {});
  };
  function statsPath(sum) {
    return "/sim650/stats?scenario=" + encodeURIComponent(sum.scenario) +
           "&difficulty=" + encodeURIComponent(sum.difficulty) + "&seats=" + sum.seats;
  }

  S.render = function (st, sum) {
    var el = document.getElementById("sim650Compare"); if (!el) return;
    if (!st || !st.ok || !st.n) { el.style.display = "none"; return; }
    var esc = (G.UI && G.UI._esc) ? G.UI._esc : function (x) { return x; };
    var parts = ["Across <b>" + Number(st.n).toLocaleString() + "</b> recorded game" + (st.n === 1 ? "" : "s") +
                 " of this scenario on <b>" + esc(sum.difficulty) + "</b>"];
    if (st.avgSeats != null) parts.push("players average <b>" + st.avgSeats + "</b> seats");
    if (st.percentile != null && st.n > 1) {
      var beat = Math.round(st.percentile * 100);
      parts.push("your <b>" + sum.seats + "</b> beats <b>" + beat + "%</b> of them");
    }
    el.innerHTML = '<span class="board-note">How you compare</span> ' + parts.join(" · ") + ".";
    el.style.display = "";
  };
})();
