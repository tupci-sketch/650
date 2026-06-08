/* =============================================================================
   650 — COMMUNAL LEADERBOARD  (one best entry per player)
   -----------------------------------------------------------------------------
   The board is communal when G.LB.URL points at a deployed Google Apps Script
   web app (/exec URL). Paste yours below and everyone who plays shares one
   board. Leave it "" and the board is kept locally on this device instead, so
   the game still works out of the box.

   Integrity (one row per player = their best, bounded values, sanitised names)
   is enforced AGAIN on the server, which is the only place it actually counts —
   a static page can't stop someone editing their own browser.
   ========================================================================== */
window.G = window.G || {};
G.LB = {
  URL: "",                                   // <-- paste your Apps Script /exec URL here to go communal
  KEY_BOARD: "650.leaderboard.local",
  KEY_NAME:  "650.player",
  MAX_SHOW:  50
};

G.LB.normName = function (n) {
  return String(n || "").replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, 24) || "Anonymous";
};
G.LB.normKey  = function (n) { return G.LB.normName(n).toLowerCase(); };
G.LB.getName  = function () { try { return window.localStorage.getItem(G.LB.KEY_NAME) || ""; } catch (e) { return ""; } };
G.LB.setName  = function (n) { try { window.localStorage.setItem(G.LB.KEY_NAME, G.LB.normName(n)); } catch (e) {} };

G.LB.clampInt = function (v, lo, hi) { v = Math.round(Number(v)); if (!isFinite(v)) return lo; return Math.max(lo, Math.min(hi, v)); };
G.LB.cleanEntry = function (e) {
  var legacy = (e.legacy === null || e.legacy === undefined || e.legacy === "") ? null : G.LB.clampInt(e.legacy, 0, 100);
  return { name: G.LB.normName(e.name), seats: G.LB.clampInt(e.seats, 0, 650), legacy: legacy,
           govt: !!e.govt, mode: String(e.mode || "unity").slice(0, 12),
           difficulty: String(e.difficulty || "normal").slice(0, 8), ts: Date.now() };
};
G.LB.rank   = function (a, b) {              // higher seats first, then higher legacy
  if (b.seats !== a.seats) return b.seats - a.seats;
  return (b.legacy || -1) - (a.legacy || -1);
};
G.LB.better = function (a, b) { return G.LB.rank(a, b) < 0; };

/* local store */
G.LB._load = function () { try { var v = window.localStorage.getItem(G.LB.KEY_BOARD); return v ? JSON.parse(v) : []; } catch (e) { return []; } };
G.LB._save = function (arr) { try { window.localStorage.setItem(G.LB.KEY_BOARD, JSON.stringify(arr.slice(0, 300))); } catch (e) {} };
G.LB._mergeBest = function (arr, e) {        // one row per player; keep their best
  var key = G.LB.normKey(e.name), kept = [], placed = false;
  arr.forEach(function (x) {
    if (G.LB.normKey(x.name) === key) { if (!placed) { kept.push(G.LB.better(e, x) ? e : x); placed = true; } }
    else kept.push(x);
  });
  if (!placed) kept.push(e);
  kept.sort(G.LB.rank);
  return kept;
};

/* submit an entry — cb(top, communal, error?) */
G.LB.submit = function (raw, cb) {
  var e = G.LB.cleanEntry(raw);
  G.LB.setName(e.name);
  if (G.LB.URL) {
    var payload = { game: "650", name: e.name, seats: e.seats, legacy: e.legacy, govt: e.govt, mode: e.mode, difficulty: e.difficulty };
    fetch(G.LB.URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.top) cb(d.top, true); else throw new Error("bad response"); })
      .catch(function (err) { var top = G.LB._mergeBest(G.LB._load(), e); G.LB._save(top); cb(top, false, err); });
  } else {
    var top = G.LB._mergeBest(G.LB._load(), e); G.LB._save(top); cb(top, false);
  }
};
/* fetch the board — cb(top, communal, error?) */
G.LB.fetchTop = function (cb) {
  if (G.LB.URL) {
    fetch(G.LB.URL, { method: "GET" })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.top) cb(d.top, true); else throw new Error("bad response"); })
      .catch(function (err) { cb(G.LB._load(), false, err); });
  } else { cb(G.LB._load(), false); }
};
