/* =============================================================================
   650 — platform client (G.NET)
   One thin wrapper over the single Apps Script endpoint (reuses G.LB.URL and the
   same text/plain transport, so everything rides the one /exec link). Handles the
   session token, the signed-in profile, live config (banner + streams), the
   editable roster, chat and the admin actions. All calls return Promises and fail
   soft (offline -> { ok:false, error:"offline" }) so the game never hangs.
   ========================================================================== */
(function () {
  var G = window.G = window.G || {};
  var NET = G.NET = G.NET || {};

  NET.KEY_TOKEN = "650.session";
  NET.me = null;                                   // { name, level } when signed in
  NET.prefs = {};                                  // cloud-saved progress/preferences
  NET.config = { banner: { text: "", active: false }, streams: [], rosterVersion: "0" };
  NET.onAuth = null;                               // UI hook: function (me|null) {}

  function merge(a, b) { a = a || {}; for (var k in b) if (Object.prototype.hasOwnProperty.call(b, k)) a[k] = b[k]; return a; }

  NET.token = function () { try { return window.localStorage.getItem(NET.KEY_TOKEN) || ""; } catch (e) { return ""; } };
  NET._set  = function (t) { try { if (t) window.localStorage.setItem(NET.KEY_TOKEN, t); } catch (e) {} };
  NET._clr  = function () { try { window.localStorage.removeItem(NET.KEY_TOKEN); } catch (e) {} };
  NET.isAdmin = function () { return !!(NET.me && NET.me.level >= 9); };
  NET.isMod   = function () { return !!(NET.me && NET.me.level >= 5); };

  NET._call = function (kind, payload) {
    var url = (G.LB && G.LB.URL) || "";
    if (!url) return Promise.resolve({ ok: false, error: "offline" });
    var body = merge({ game: "650", kind: kind }, payload || {});
    return fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body) })
      .then(function (r) { return r.json(); })
      .catch(function () { return { ok: false, error: "offline" }; });
  };
  NET._auth = function (kind, payload) { payload = payload || {}; payload.token = NET.token(); return NET._call(kind, payload); };

  NET._adopt = function (d) {
    if (d && d.ok && d.token) { NET._set(d.token); NET.me = d.profile || null; NET.prefs = d.prefs || {}; if (NET.onAuth) NET.onAuth(NET.me); }
    return d;
  };
  NET.register = function (u, p) { return NET._call("register", { username: u, password: p }).then(NET._adopt); };
  NET.login    = function (u, p) { return NET._call("login",    { username: u, password: p }).then(NET._adopt); };
  NET.logout   = function () { return NET._auth("logout").then(function (d) { NET._clr(); NET.me = null; NET.prefs = {}; if (NET.onAuth) NET.onAuth(null); return d; }); };
  NET.resume   = function () {
    if (!NET.token()) { if (NET.onAuth) NET.onAuth(null); return Promise.resolve(null); }
    return NET._auth("session").then(function (d) {
      if (d && d.ok) { NET.me = d.profile; NET.prefs = d.prefs || {}; } else { NET._clr(); NET.me = null; }
      if (NET.onAuth) NET.onAuth(NET.me); return NET.me;
    });
  };
  NET.save = function (prefs) { NET.prefs = prefs || NET.prefs; return NET._auth("save", { prefs: NET.prefs }); };

  NET.loadConfig = function () { return NET._call("config").then(function (d) { if (d && d.config) NET.config = d.config; return NET.config; }); };
  NET.loadRoster = function () { return NET._call("roster").then(function (d) { if (d && d.politicians && d.politicians.length && G.mergeRoster) G.mergeRoster(d.politicians); return d; }); };

  NET.board   = function (s) { return NET._call("board", s || {}); };
  NET.overall = function () { return NET._call("overall"); };

  NET.chatFetch  = function (since) { return NET._call("chat_fetch", { since: since || "" }); };
  NET.chatPost   = function (text) { return NET._auth("chat_post", { text: text }); };
  NET.chatDelete = function (id)   { return NET._auth("chat_delete", { id: id }); };

  NET.adminUsers    = function () { return NET._auth("admin_users"); };
  NET.adminSetLevel = function (t, l) { return NET._auth("admin_setlevel", { target: t, level: l }); };
  NET.adminBan      = function (t) { return NET._auth("admin_ban", { target: t }); };
  NET.adminUnban    = function (t) { return NET._auth("admin_unban", { target: t }); };
  NET.adminBanner   = function (text, active) { return NET._auth("admin_banner", { text: text, active: active }).then(function (d) { if (d && d.config) NET.config = d.config; return d; }); };
  NET.adminStreams  = function (streams) { return NET._auth("admin_streams", { streams: streams }).then(function (d) { if (d && d.config) NET.config = d.config; return d; }); };
  NET.adminAddPol   = function (pol) { return NET._auth("admin_addpol", { pol: pol }); };
})();
