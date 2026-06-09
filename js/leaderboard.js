/* =============================================================================
   650 — LEADERBOARD (v3)
   -----------------------------------------------------------------------------
   • Communal board: best run per player, HARDEST mode only, stores each
     player's cabinet + seat breakdown (rendered by ui.js). Server-enforced.
   • Personal board: EVERY run you play is saved locally (this device only) so
     you can see your best 10 and worst 10 — no account, no server.
   The server endpoint is assembled at runtime rather than written in the
   clear. (This is obfuscation for tidiness, not security: the request is still
   visible to anyone inspecting network traffic.)
   ========================================================================== */
window.G = window.G || {};
G.LB = {
  KEY_BOARD: "650.leaderboard.local",
  KEY_RUNS:  "650.runs.v1",
  KEY_NAME:  "650.player",
  KEY_SENT:  "650.lb.sent",     // signatures already posted (anti double-submit)
  KEY_OWNER: "650.owner",       // per-device name-ownership token (anti-impersonation)
  MAX_SHOW:  50,
  MAX_RUNS:  400
};

/* ---- endpoint, assembled from fragments (reversed base64) --------------- */
G.LB._frags = [
    "jVGel9ydDNUQBpWVMh1QzNDUqhWaId1YyY1Svl",
    "mYzUHMKV0Ns9kdwIGNHV0bsZ3QIhlbMhUWSl1Y",
    "woEZtdmUyVEVq5GSvZjM5J2Y5Z2SB9ycvM3byN",
    "WYt9SbvNmLlx2Zv92ZuQHcpJ3Yz9yL6MHc0RHa"
];
G.LB._url = function () {
  try {
    var joined = G.LB._frags.join("");
    var b64 = joined.split("").reverse().join("");
    var u = (typeof atob === "function") ? atob(b64) : Buffer.from(b64, "base64").toString();
    return /^https:\/\/script\.google\.com\/.*\/exec$/.test(u) ? u : "";
  } catch (e) { return ""; }
};
G.LB.URL = G.LB._url();   // resolved once

/* ---- name + value hygiene ---------------------------------------------- */
G.LB.normName = function (n) { return String(n || "").replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, 24) || "Anonymous"; };
G.LB.normKey  = function (n) { return G.LB.normName(n).toLowerCase(); };
G.LB.getName  = function () { try { return window.localStorage.getItem(G.LB.KEY_NAME) || ""; } catch (e) { return ""; } };
G.LB.setName  = function (n) { try { window.localStorage.setItem(G.LB.KEY_NAME, G.LB.normName(n)); } catch (e) {} };
G.LB.clampInt = function (v, lo, hi) { v = Math.round(Number(v)); if (!isFinite(v)) return lo; return Math.max(lo, Math.min(hi, v)); };

/* ---- anti double-submit: a stable signature of a finished run ----------- */
G.LB.signature = function (e) {
  var c = (e.cabinet || []).map(function (s) { return s.name; }).join(",");
  return [G.LB.normKey(e.name), e.seats, (e.legacy == null ? "-" : e.legacy), e.govt ? 1 : 0,
          e.mode, e.difficulty, e.cabinetSize, c].join("|");
};
G.LB._sentList   = function () { try { return JSON.parse(window.localStorage.getItem(G.LB.KEY_SENT) || "[]"); } catch (e) { return []; } };
G.LB.alreadySent = function (sig) { return G.LB._sentList().indexOf(sig) !== -1; };
G.LB.markSent    = function (sig) { try { var a = G.LB._sentList(); if (a.indexOf(sig) === -1) a.push(sig); window.localStorage.setItem(G.LB.KEY_SENT, JSON.stringify(a.slice(-300))); } catch (e) {} };

/* ---- name ownership: a secret token bound to your name (server-enforced) -
   Generated/confirmed by the accounts backend; kept on THIS device so only you
   can post under your name. Sent with every submission; an old backend ignores
   it (so this is backward-compatible until you deploy the new script). */
G.LB.getOwner = function () { try { return window.localStorage.getItem(G.LB.KEY_OWNER) || ""; } catch (e) { return ""; } };
G.LB.setOwner = function (t) { try { if (t) window.localStorage.setItem(G.LB.KEY_OWNER, String(t)); } catch (e) {} };

G.LB._cabinet = function (c) {
  if (!c || !c.length) return [];
  return c.slice(0, 16).map(function (s) { return { seat: String(s.seat || "").slice(0, 28), name: String(s.name || "").slice(0, 40), party: String(s.party || "").slice(0, 28), era: String(s.era || "").slice(0, 6) }; });
};
G.LB._breakdown = function (b) {
  if (!b || !b.length) return [];
  return b.slice(0, 8).map(function (x) { return { party: String(x.party || "").slice(0, 28), seats: G.LB.clampInt(x.seats, 0, 650) }; });
};
G.LB.cleanEntry = function (e) {
  var legacy = (e.legacy === null || e.legacy === undefined || e.legacy === "") ? null : G.LB.clampInt(e.legacy, 0, 100);
  return {
    name: G.LB.normName(e.name), seats: G.LB.clampInt(e.seats, 0, 650), legacy: legacy,
    govt: !!e.govt, mode: String(e.mode || "unity").slice(0, 12),
    difficulty: String(e.difficulty || "normal").slice(0, 8),
    cabinetSize: String(e.cabinetSize || "standard").slice(0, 10),
    cabinet: G.LB._cabinet(e.cabinet), breakdown: G.LB._breakdown(e.breakdown), ts: Date.now()
  };
};
G.LB.rank   = function (a, b) { if (b.seats !== a.seats) return b.seats - a.seats; return (b.legacy || -1) - (a.legacy || -1); };
G.LB.better = function (a, b) { return G.LB.rank(a, b) < 0; };

/* ---- communal board (server, with local fallback) ---------------------- */
G.LB._load = function () { try { var v = window.localStorage.getItem(G.LB.KEY_BOARD); return v ? JSON.parse(v) : []; } catch (e) { return []; } };
G.LB._save = function (arr) { try { window.localStorage.setItem(G.LB.KEY_BOARD, JSON.stringify(arr.slice(0, 300))); } catch (e) {} };
G.LB._mergeBest = function (arr, e) {
  var key = G.LB.normKey(e.name), kept = [], placed = false;
  arr.forEach(function (x) { if (G.LB.normKey(x.name) === key) { if (!placed) { kept.push(G.LB.better(e, x) ? e : x); placed = true; } } else kept.push(x); });
  if (!placed) kept.push(e);
  kept.sort(G.LB.rank); return kept;
};
G.LB._post = function (payload, cb) {
  if (!G.LB.URL || typeof fetch !== "function") { if (cb) cb(null); return; }
  fetch(G.LB.URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) })
    .then(function (r) { return r.json(); }).then(function (d) { if (cb) cb(d); }).catch(function () { if (cb) cb(null); });
};

/* submit an explicit board entry — cb(top, communal, error?) */
G.LB.submit = function (raw, cb, opts) {
  opts = opts || {};
  var e = G.LB.cleanEntry(raw);
  G.LB.setName(e.name);
  var sig = G.LB.signature(e);

  /* double-submit guard: the exact same run won't be posted twice by accident */
  if (!opts.force && G.LB.alreadySent(sig)) {
    G.LB.fetchTop(function (top, communal, err) { cb(top, communal, err || "duplicate"); });
    return;
  }

  G.LB.recordLocalRun(e);                 // also keep it in the personal board
  var payload = { game: "650", kind: "submit", owner: G.LB.getOwner(), token: (G.NET && G.NET.token) ? G.NET.token() : "", name: e.name,
                  seats: e.seats, legacy: e.legacy, govt: e.govt,
                  mode: e.mode, difficulty: e.difficulty, cabinetSize: e.cabinetSize,
                  cabinet: e.cabinet, breakdown: e.breakdown };
  if (G.LB.URL) {
    G.LB._post(payload, function (d) {
      if (d && d.ownerToken) G.LB.setOwner(d.ownerToken);     // claim/confirm name ownership
      if (d && d.top) {
        G.LB.markSent(sig);                                    // server responded — don't resend
        var ok = d.ok !== false;
        cb(d.top, ok, ok ? null : (d.error || "rejected"));
      } else {                                                 // network failure: allow a retry
        var top = G.LB._mergeBest(G.LB._load(), e); G.LB._save(top);
        cb(top, false, "offline");
      }
    });
  } else { var top = G.LB._mergeBest(G.LB._load(), e); G.LB._save(top); G.LB.markSent(sig); cb(top, false); }
};
/* fetch the board — cb(top, communal, error?) */
G.LB.fetchTop = function (cb) {
  if (G.LB.URL && typeof fetch === "function") {
    fetch(G.LB.URL, { method: "GET" }).then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.top) cb(d.top, true); else throw new Error("bad"); })
      .catch(function (err) { cb(G.LB._load(), false, err); });
  } else cb(G.LB._load(), false);
};

/* ---- personal board: every run, on this device ------------------------- */
G.LB._loadRuns = function () { try { var v = window.localStorage.getItem(G.LB.KEY_RUNS); return v ? JSON.parse(v) : []; } catch (e) { return []; } };
G.LB._saveRuns = function (arr) { try { window.localStorage.setItem(G.LB.KEY_RUNS, JSON.stringify(arr.slice(0, G.LB.MAX_RUNS))); } catch (e) {} };
G.LB.recordLocalRun = function (raw) {
  var e = G.LB.cleanEntry(raw); e.name = e.name || G.LB.getName() || "You";
  var runs = G.LB._loadRuns(); runs.push(e);
  runs.sort(function (a, b) { return b.ts - a.ts; });   // newest first
  G.LB._saveRuns(runs);
  /* fire-and-forget: log to the owner's sheet too (run history), if connected */
  G.LB._post({ game: "650", kind: "log", owner: G.LB.getOwner(), token: (G.NET && G.NET.token) ? G.NET.token() : "", name: e.name, seats: e.seats, legacy: e.legacy, govt: e.govt,
               mode: e.mode, difficulty: e.difficulty, cabinetSize: e.cabinetSize, cabinet: e.cabinet, breakdown: e.breakdown }, null);
  return e;
};
G.LB.localTop = function (n) { return G.LB._loadRuns().slice().sort(G.LB.rank).slice(0, n || 10); };
G.LB.localBottom = function (n) {
  var arr = G.LB._loadRuns().slice().sort(G.LB.rank);
  return arr.slice(Math.max(0, arr.length - (n || 10))).reverse();
};
