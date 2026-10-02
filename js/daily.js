/* =============================================================================
   650 — THE DAILY CHALLENGE
   -----------------------------------------------------------------------------
   One shared challenge per (UTC) day: the same nation, mode and difficulty for
   everyone, the same deals for the same picks (a seeded deal), and the same
   election-night luck (a forced seed) — so the only difference between two
   players is the cabinet they built. One attempt: leave mid-draft and your
   picks are replayed exactly when you come back. Streaks, a Wordle-style
   share card and a daily leaderboard (D1) round it off.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var D = G.Daily = {};
  var KEY = "650.daily";
  D.EPOCH = Date.UTC(2026, 0, 1);

  function load() { try { return JSON.parse(window.localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } }
  function save(o) { try { window.localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  D.store = function () { var s = load(); s.history = s.history || {}; return s; };

  D.dayKey = function (t) {
    var d = new Date(t == null ? Date.now() : t);
    return d.getUTCFullYear() + "-" + ("0" + (d.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + d.getUTCDate()).slice(-2);
  };
  D.dayNum = function (key) {
    var p = String(key || D.dayKey()).split("-");
    return Math.floor((Date.UTC(+p[0], +p[1] - 1, +p[2]) - D.EPOCH) / 86400000) + 1;
  };
  D.msToNext = function () { var n = new Date(); return Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() + 1) - n.getTime(); };

  /* the nations in the rotation — the UK comes round most often */
  D.ROTATION = [
    { country: "uk", scenario: "freshstart", flag: "🇬🇧", name: "United Kingdom", w: 4 },
    { country: "us", scenario: "usa_house_2024", flag: "🇺🇸", name: "US House", w: 1 },
    { country: "us", scenario: "usa_ec_2024", flag: "🇺🇸", name: "US Presidency", w: 1 },
    { country: "de", scenario: "bundestag_2021", flag: "🇩🇪", name: "Germany", w: 1 },
    { country: "fr", scenario: "france_2022", flag: "🇫🇷", name: "France", w: 1 },
    { country: "au", scenario: "australia_2022", flag: "🇦🇺", name: "Australia", w: 1 },
    { country: "ca", scenario: "canada_2021", flag: "🇨🇦", name: "Canada", w: 1 },
    { country: "jp", scenario: "japan_2021", flag: "🇯🇵", name: "Japan", w: 1 },
    { country: "in", scenario: "india_2024", flag: "🇮🇳", name: "India", w: 1 }
  ];
  D.MODES = { unity: "Greatest Cabinet", wildcard: "Global Wildcard", dynasty: "Dynasty" };

  /* the day's challenge — a pure function of the date */
  D.spec = function (key) {
    key = key || D.dayKey();
    var rnd = G.makeRng(G.hash32("650daily|" + key));
    var rot = D.ROTATION.filter(function (r) { return (G.SCENARIOS || []).some(function (s) { return s.key === r.scenario; }); });
    var tot = 0; rot.forEach(function (r) { tot += r.w; });
    var x = rnd() * tot, pick = rot[0];
    for (var i = 0; i < rot.length; i++) { x -= rot[i].w; if (x <= 0) { pick = rot[i]; break; } }
    var mode = ["unity", "wildcard", "dynasty"][Math.floor(rnd() * 3)];
    var eras = G.erasForMode ? G.erasForMode(mode === "dynasty" ? "dynasty" : mode) : null;
    var lineage = null;
    if (mode === "dynasty" && G.eligibleDynastyLineages) {
      var lins = G.eligibleDynastyLineages(eras, null, pick.country).sort();
      /* only the nation's big traditions make a fair daily: the three with
         the deepest benches (a fringe dynasty can't contest a majority) */
      var size = {};
      lins = lins.filter(function (l) { return l !== "Fringe" && l !== "Independent"; });
      (G.POLITICIANS || []).forEach(function (p) { var l = G.lineageOf(p.party); if (lins.indexOf(l) !== -1) size[l] = (size[l] || 0) + 1; });
      lins = lins.slice().sort(function (a, b) { return (size[b] || 0) - (size[a] || 0) || (a < b ? -1 : 1); }).slice(0, 3).sort();
      if (lins.length) lineage = lins[Math.floor(rnd() * lins.length)];
      else mode = "unity";
    }
    var diff = rnd() < 0.7 ? "hard" : "normal";
    return { key: key, num: D.dayNum(key), country: pick.country, scenario: pick.scenario, flag: pick.flag, nation: pick.name,
             mode: mode, lineage: lineage, difficulty: diff, cabinetSize: "standard", redos: 1,
             dealSeed: "650daily-deal|" + key, electionSeed: G.hash32("650daily-election|" + key) };
  };
  D.label = function (sp) {
    sp = sp || D.spec();
    var lin = sp.lineage ? ((G.LINEAGE_PARTY && G.LINEAGE_PARTY[sp.lineage]) || sp.lineage) : "";
    return sp.flag + " " + sp.nation + " · " + (sp.mode === "dynasty" ? "Dynasty: " + lin : D.MODES[sp.mode]) + " · " + sp.difficulty.charAt(0).toUpperCase() + sp.difficulty.slice(1);
  };

  D.today = function () { var s = D.store(); return s.history[D.dayKey()] || null; };
  D.active = function () { return !!(G.state && G.state._daily); };

  /* ---- starting (and resuming) the day's run ----------------------------- */
  D.begin = function () {
    var sp = D.spec();
    var s = D.store();
    if (s.history[sp.key] && s.history[sp.key].done) return { error: "played", spec: sp };
    G.career = null;
    G.newGame({ mode: sp.mode, lineage: sp.lineage, difficulty: sp.difficulty, cabinetSize: sp.cabinetSize,
                redos: sp.redos, govern: false, watch: true, policyOn: false, campaignOn: false,
                eras: G.erasForMode ? G.erasForMode(sp.mode) : null, country: sp.country,
                casts: { insider: true, novelty: false } });
    if (G.applyScenario) G.applyScenario(sp.scenario);
    G.state.scenarioKey = sp.scenario;
    G.state.govern = false; G.state.watch = true;
    G.state._daily = { key: sp.key, num: sp.num };
    G.state._dealSeed = sp.dealSeed;
    G.state._forcedSeed = sp.electionSeed;
    /* replay any picks already made today (one attempt — no fishing for deals) */
    var log = (s.history[sp.key] && s.history[sp.key].actions) || [];
    D._replaying = true;
    log.forEach(function (a) {
      if (a[0] === "deal") G.deal();
      else if (a[0] === "redraw") G.redraw();
      else if (a[0] === "choose") G.chooseFromDeal(a[1]);
      else if (a[0] === "assign") G.assignTo(a[1]);
    });
    D._replaying = false;
    s.history[sp.key] = s.history[sp.key] || { num: sp.num, actions: log, started: Date.now() };
    save(s);
    return { spec: sp, resumed: log.length > 0 };
  };

  /* record every draft action while the daily is live */
  function rec(a) {
    if (D._replaying || !D.active()) return;
    var s = D.store(), h = s.history[G.state._daily.key];
    if (!h || h.done) return;
    h.actions = h.actions || []; h.actions.push(a); save(s);
  }
  function wrap(name, tag, argFn) {
    var orig = G[name]; if (!orig) return;
    G[name] = function () {
      var out = orig.apply(this, arguments);
      if (out) rec(argFn ? [tag, argFn.apply(null, arguments)] : [tag]);
      return out;
    };
  }
  D.install = function () {
    wrap("deal", "deal");
    wrap("redraw", "redraw");
    wrap("chooseFromDeal", "choose", function (n) { return n; });
    wrap("assignTo", "assign", function (k) { return k; });
  };

  /* ---- finishing -------------------------------------------------------- */
  /* the Wordle-style grid: one square per post, by how well it fits */
  D.grid = function (cab) {
    cab = cab || (G.state && (G.state._playerCabinet || G.state.cabinet)) || {};
    var sq = (G.PORTFOLIOS || []).map(function (port) {
      var p = cab[port.key]; if (!p) return "⬛";
      if (G.isDespot && G.isDespot(p)) return "💀";
      var f = G.fitClass ? G.fitClass(p, port.key) : "okay";
      return f === "good" ? "🟩" : f === "okay" ? "🟨" : "🟥";
    });
    var rows = [];
    for (var i = 0; i < sq.length; i += 6) rows.push(sq.slice(i, i + 6).join(""));
    return rows.join("\n");
  };
  D.finish = function (res) {
    if (!res || !G.state || !G.state._daily) return null;
    var key = G.state._daily.key, s = D.store(), h = s.history[key] || (s.history[key] = {});
    if (h.done) return h;     // the first completed election is the one that counts
    var total = res.totalSeats || (G.activeTotalSeats ? G.activeTotalSeats() : 650);
    var maj = G.activeMajority ? G.activeMajority() : 326;
    h.done = true; h.ts = Date.now(); h.num = G.state._daily.num;
    h.seats = res.seats; h.total = total; h.majority = maj; h.tier = res.tier && res.tier.label;
    h.grid = D.grid(); h.runCode = res._runCode || ""; h.label = D.label(D.spec(key));
    h.pm = res.pmName;
    delete h.actions;
    save(s);
    /* cloud copy of the daily history (signed in) */
    if (G.NET && G.NET.me && G.NET.save) {
      var pr = G.NET.prefs || {}; pr.daily = pr.daily || {};
      pr.daily[key] = { seats: h.seats, total: h.total, num: h.num, tier: h.tier };
      var keys = Object.keys(pr.daily).sort(); while (keys.length > 120) delete pr.daily[keys.shift()];
      G.NET.save(pr);
    }
    return h;
  };

  /* consecutive days played, ending today (or yesterday if today isn't done yet) */
  D.streak = function () {
    var s = D.store(), hist = s.history, n = 0;
    var cloud = (G.NET && G.NET.prefs && G.NET.prefs.daily) || {};
    var t = Date.now();
    if (!(hist[D.dayKey(t)] && hist[D.dayKey(t)].done) && !cloud[D.dayKey(t)]) t -= 86400000;
    while (true) {
      var k = D.dayKey(t);
      if ((hist[k] && hist[k].done) || cloud[k]) { n++; t -= 86400000; } else break;
    }
    return n;
  };
  D.best = function () {
    var s = D.store(), best = 0, played = 0;
    Object.keys(s.history).forEach(function (k) { var h = s.history[k]; if (h.done) { played++; best = Math.max(best, h.seats || 0); } });
    return { played: played, best: best };
  };

  D.shareText = function (h) {
    h = h || D.today(); if (!h) return "";
    var maj = h.majority || 326, diff = h.seats - maj;
    return "650 Daily #" + h.num + " " + (h.label || "") + "\n" + (h.grid || "") + "\n" +
      "🏛 " + h.seats + "/" + h.total + (diff >= 0 ? " · majority " + diff : " · " + (-diff) + " short") +
      (D.streak() > 1 ? " · 🔥" + D.streak() : "") + "\n650-0.co.uk";
  };

  /* ---- the server board ------------------------------------------------- */
  D.submit = function (h) {
    if (!G.NET || !G.NET.me || !h) return Promise.resolve({ ok: false, error: "login" });
    return G.NET._auth("daily_submit", { day: D.dayKey(h.ts), seats: h.seats, total: h.total, grid: h.grid, runCode: h.runCode, pm: h.pm || "" });
  };
  D.board = function (key) { return G.NET ? G.NET._auth("daily_board", { day: key || D.dayKey() }) : Promise.resolve({ ok: false }); };

  D.install();
})();
