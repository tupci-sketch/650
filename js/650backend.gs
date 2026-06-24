/**
 * 650 — UNIFIED BACKEND  (single Google Apps Script web app).  FREE.
 * =============================================================================
 * ONE /exec URL does everything the site needs: leaderboards (per-mode + an
 * overall board), name ownership, accounts (register / login, hashed passwords),
 * cloud-saved progress, a moderated chatroom, the Housekeeping panel, the
 * EDITABLE & OVERRIDABLE politicians roster, a live-events banner and a
 * configurable Live-TV tab.
 *
 * ── DEPLOY (keeps your existing /exec URL, keeps your scores) ────────────────
 *   1. Open your existing Apps Script project (the one already wired into 650).
 *   2. Replace ALL of its code with this file. Save.
 *   3. Deploy ▸ Manage deployments ▸ (edit the live web app) ▸
 *        Version: New version ▸ Deploy.   Execute as: Me.   Access: Anyone.
 *   The website already posts to this URL — nothing on the site changes.
 *
 * ── KEEP YOUR EXISTING DATA ──────────────────────────────────────────────────
 *   This script keeps all data in ONE Google Sheet. To reuse the sheet you
 *   already have (so existing scores/accounts carry over), open it, copy the ID
 *   from its URL (the long string between /d/ and /edit) and, in the Apps Script
 *   editor, set:  Project Settings ▸ Script properties ▸ add  SHEET_ID = <id>.
 *   If you skip this, a fresh "650 Data" sheet is created on first run.
 *   v5 adds three columns to the board and runs tabs (runId, party, align).
 *   v6 adds three more columns: scenarioKey, electoralSystem, totalSeats.
 *   They are APPENDED — old rows keep working; new rows simply carry more.
 *
 * ── WHAT v6 CHANGES ──────────────────────────────────────────────────────────
 *   • International scenarios: seats from systems other than UK FPTP are stored
 *     with their correct totalSeats (e.g. 736 for Bundestag, 538 for EC).
 *     The 0-650 seat clamp is raised to 0-3000 to cover all systems.
 *   • Per-scenario and per-system leaderboards: board key routes to
 *     "scenario:<key>" or "system:<electoralSystem>" for international runs;
 *     UK runs still use the existing mode|difficulty|cabinetSize key.
 *   • All Results % board: a new endpoint 'overall_pct' returns every player's
 *     single best run across ALL boards ranked by seats/totalSeats percentage,
 *     so a 95% Bundestag result is directly comparable to a 95% UK sweep.
 *   • doGet returns overallPct alongside top so the leaderboard screen can show
 *     both boards without a second round-trip.
 *
 * ── WHAT v5 CHANGED ──────────────────────────────────────────────────────────
 *   • Every TURN is unique: each election carries a runId minted on the site.
 *   • The communal board is for REGISTERED players only.
 *   • The Overall board shows two HONEST numbers per player.
 *   • A banned-word screen runs server-side.
 *   • Housekeeping: moderators (level 5+) can add/amend roster records.
 *
 * ── SECURITY (honest) ────────────────────────────────────────────────────────
 *   Passwords and session/owner tokens are SALTED + PEPPERED and hashed ONE-WAY
 *   (SHA-256); never stored or returned in the clear. The pepper lives only in
 *   Script Properties. The FIRST account to register becomes admin (level 9).
 * ========================================================================== */

var HARDEST = { mode: "wildcard", difficulty: "hard", cabinetSize: "expanded" };
var SESSION_DAYS = 45;
var CHAT_MAX = 400, CHAT_FETCH = 80, CHAT_MIN_GAP_MS = 2500;
var MAX_RETURN = 50, MAX_BOARD = 4000, MAX_RUNS = 8000;
var MAX_SEATS = 3000;   /* raised from 650 to cover all electoral systems */

/* board / runs tab schema — v6 adds cols 14,15,16 to both tabs */
var TABS = {
  board:    ["name", "seats", "legacy", "govt", "mode", "difficulty", "cabinetSize",
             "cabinet", "breakdown", "ts", "userKey", "runId", "party", "align",
             "scenarioKey", "electoralSystem", "totalSeats"],
  runs:     ["ts_iso", "name", "seats", "legacy", "govt", "mode", "difficulty",
             "cabinetSize", "kind", "cabinet", "breakdown", "runId", "party", "align",
             "scenarioKey", "electoralSystem", "totalSeats"],
  owners:   ["nameKey", "display", "tokenHash", "salt", "userKey", "createdISO", "lastISO"],
  accounts: ["userKey", "display", "level", "banned", "pwHash", "pwSalt", "sessHash", "sessExp", "createdISO", "lastISO", "prefs"],
  chat:     ["id", "ts_iso", "userKey", "display", "level", "text", "deleted"],
  config:   ["key", "value"],
  pols:     ["name", "party", "era", "scope", "appeal", "experience", "oratory", "statecraft", "partyMgmt", "fits", "note", "despot", "mode", "cast", "flag", "wiki", "img"]
};

/* ============================ entry points ================================ */
function doGet(e) {
  return _json({ ok: true, hardest: HARDEST,
                 top: _topBoard(null),
                 overall: _overall(),
                 overallPct: _overallPct(),
                 config: _publicConfig() });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(15000); } catch (ig) {}
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (d.game !== "650") return _json({ ok: false, error: "bad game" });
    switch (String(d.kind || "")) {
      case "submit":         return _doScore(d, "submit");
      case "log":            return _doScore(d, "log");
      case "board":          return _json({ ok: true, top: _topBoard(_boardKey(d)) });
      case "overall":        return _json({ ok: true, top: _overall() });
      case "overall_pct":    return _json({ ok: true, top: _overallPct() });
      case "register":       return _register(d);
      case "login":          return _login(d);
      case "session":        return _sessionInfo(d);
      case "logout":         return _logout(d);
      case "save":           return _saverefs(d);
      case "config":         return _json({ ok: true, config: _publicConfig() });
      case "roster":         return _json({ ok: true, politicians: _roster() });
      case "chat_fetch":     return _chatFetch(d);
      case "chat_post":      return _chatPost(d);
      case "chat_delete":    return _chatDelete(d);
      case "admin_users":    return _adminUsers(d);
      case "admin_setlevel": return _adminSetLevel(d);
      case "admin_ban":      return _adminBan(d, true);
      case "admin_unban":    return _adminBan(d, false);
      case "admin_banner":   return _adminBanner(d);
      case "admin_streams":  return _adminStreams(d);
      case "admin_addpol":   return _adminAddPol(d);
      case "admin_delpol":   return _adminDelPol(d);
      default:               return _json({ ok: false, error: "unknown kind" });
    }
  } catch (err) {
    return _json({ ok: false, error: String(err && err.message || err) });
  } finally {
    try { lock.releaseLock(); } catch (ig2) {}
  }
}

/* ============================ sheet plumbing ============================== */
function _ss() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SHEET_ID");
  if (id) { try { return SpreadsheetApp.openById(id); } catch (e) {} }
  var ss = SpreadsheetApp.create("650 Data");
  props.setProperty("SHEET_ID", ss.getId());
  return ss;
}
function _tab(name) {
  var ss = _ss(), sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(TABS[name]);
    var first = ss.getSheetByName("Sheet1");
    if (first && first.getSheetName() !== name && first.getLastRow() === 0) { try { ss.deleteSheet(first); } catch (e) {} }
  } else if (sh.getLastRow() === 0) {
    sh.appendRow(TABS[name]);
  }
  return sh;
}
function _rows(name) {
  var sh = _tab(name), n = sh.getLastRow();
  if (n < 2) return [];
  return sh.getRange(2, 1, n - 1, TABS[name].length).getValues();
}

/* ============================ crypto helpers ============================== */
function _pepper() {
  var props = PropertiesService.getScriptProperties(), p = props.getProperty("PEPPER");
  if (!p) { p = Utilities.getUuid() + Utilities.getUuid(); props.setProperty("PEPPER", p); }
  return p;
}
function _hash(s, salt) {
  var raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s) + "|" + String(salt) + "|" + _pepper());
  return raw.map(function (b) { return ((b & 0xff) + 0x100).toString(16).slice(1); }).join("");
}
function _newToken() { return Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, ""); }
function _newSalt() { return Utilities.getUuid().replace(/-/g, ""); }

/* ============================ tiny utils ================================== */
function _json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function _name(n) { return (String(n == null ? "" : n).replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, 24)) || "Anonymous"; }
function _key(n) { return _name(n).toLowerCase(); }
function _str(s, n) { return String(s == null ? "" : s).slice(0, n || 40); }
function _clamp(v, lo, hi) { v = Math.round(Number(v)); if (!isFinite(v)) return lo; return Math.max(lo, Math.min(hi, v)); }
function _rank(a, b) { if (b.seats !== a.seats) return b.seats - a.seats; return (b.legacy == null ? -1 : b.legacy) - (a.legacy == null ? -1 : a.legacy); }
function _rankPct(a, b) {
  /* rank by seats/totalSeats percentage; tiebreak on legacy then raw seats */
  var pa = a.pct != null ? a.pct : (a.totalSeats > 0 ? a.seats / a.totalSeats * 100 : 0);
  var pb = b.pct != null ? b.pct : (b.totalSeats > 0 ? b.seats / b.totalSeats * 100 : 0);
  if (Math.abs(pb - pa) > 0.0001) return pb - pa;
  return (b.legacy == null ? -1 : b.legacy) - (a.legacy == null ? -1 : a.legacy);
}
function _nowISO() { return new Date().toISOString(); }
function _totalOf(r) { return Number(r[16]) > 0 ? Number(r[16]) : 650; }   /* col 16 = totalSeats, default 650 for old rows */

/* ============================ banned words ================================ */
var _F_LEET = { "0":"o","1":"i","3":"e","4":"a","5":"s","6":"g","7":"t","8":"b","9":"g","@":"a","$":"s","!":"i","+":"t","|":"i" };
var _F_STRONG = ["beaner","beastial","bestial","bollock","childporn","chink","clusterfuck","cocksuck","coochi","cunnilingus","darkie","fagging","faggot","fagot","fuck","golliwog","gook","jailbait","jigaboo","jiggaboo","kafir","kiddieporn","kike","loli","molest","motherfuck","necrophil","nigg","niglet","nigr","octopussy","paedophil","paki","pedophil","porchmonkey","raghead","raping","rapist","shemale","shit","spic","towelhead","tranny","twat","wank","wetback","wop","zoophil"];
var _F_MILD = ["acrotomophilia","alabamahotpocket","alaskanpipeline","anal","anilingus","anus","arsehole","ass","asshole","assmunch","autoerotic","babeland","babybatter","babyjuice","ballgag","ballgravy","ballicking","ballkicking","ballsack","ballsucking","bangbros","bangbus","bareback","barelylegal","barenaked","bastard","bastardo","bastinado","bbw","bdsm","beavercleaver","beaverlips","bigblack","bigbreasts","bigknockers","bigtits","bimbos","birdlock","bitch","bitches","blackcock","blondeaction","blondeonblondeaction","blowjob","blowyourload","bluewaffle","blumpkin","bondage","boner","boob","boobs","bootycall","brownshowers","brunetteaction","bukkake","bulldyke","bulletvibe","bunghole","busty","butt","buttcheeks","butthole","cameltoe","camgirl","camslut","camwhore","carpetmuncher","chocolaterosebuds","cialis","circlejerk","clevelandsteamer","clit","clitoris","cloverclamps","cock","cocks","coon","coons","coprolagnia","coprophilia","cornhole","creampie","cum","cumming","cumshot","cumshots","cunt","daterape","deepthroat","dendrophilia","dick","dildo","dingleberries","dingleberry","dirtypillows","dirtysanchez","doggiestyle","doggystyle","dogstyle","dolcett","domination","dominatrix","dommes","donkeypunch","doubledong","doublepenetration","dpaction","dryhump","dvda","eatmyass","ecchi","ejaculation","erotic","erotism","escort","eunuch","fag","fecal","felch","fellatio","feltch","femalesquirting","femdom","figging","fingerbang","fingering","fisting","footfetish","footjob","frotting","fudgepacker","futanari","gangbang","gaysex","genitals","giantcock","gic","girlon","girlontop","girlsgonewild","girlsicup","goatcx","goatse","goddamn","gokkun","goldenshower","goodpoop","googirl","goregasm","grope","groupsex","gspot","guro","handjob","hardcore","hentai","homoerotic","honkey","hooker","horny","hotcarl","hotchick","howtokill","howtomurder","hugefat","humping","incest","intercourse","jackoff","jellydonut","jerkoff","jiggerboo","jizz","juggs","kinbaku","kinkster","kinky","knobbing","leatherrestraint","leatherstraightjacket","lemonparty","livesex","lovemaking","makemecome","malesquirting","masturbate","masturbating","masturbation","menageatrois","milf","missionaryposition","mong","moundofvenus","mrhands","muffdiver","muffdiving","nambla","nawashi","negro","neonazi","nignog","nimphomania","nipple","nipples","nsfw","nsfwimages","nude","nudity","nutten","nympho","nymphomania","omorashi","onecuptwogirls","oneguyonejar","orgasm","orgy","panties","panty","pedobear","pegging","penis","phonesex","pikey","pissing","pisspig","playboy","pleasurechest","polesmoker","ponyplay","poof","poon","poontang","poopchute","porn","porno","pornography","princealbertpiercing","pthc","pubes","punany","pussy","queaf","queef","quim","ragingboner","rape","rectum","reversecowgirl","rimjob","rimming","rosypalm","rosypalmandherssisters","rustytrombone","sadism","santorum","scat","schlong","scissoring","semen","sex","sexcam","sexo","sexual","sexuality","sexually","sexy","shavedbeaver","shavedpussy","shibari","shota","shrimping","skeet","slanteye","slut","smut","snatch","snowballing","sodomize","sodomy","spastic","splooge","sploogemoose","spooge","spreadlegs","spunk","strapon","strappado","stripclub","styledoggy","suck","sucks","suicidegirls","sultrywomen","swastika","swinger","taintedlove","tastemy","teabagging","threesome","throating","thumbzilla","tiedup","tightwhite","tit","tits","titties","titty","tongueina","topless","tosser","tribadism","tubgirl","tushy","twink","twinkie","twogirlsonecup","undressing","upskirt","urethraplay","urophilia","vagina","venusmound","viagra","vibrator","violetwand","vorarephilia","voyeur","voyeurweb","voyuer","vulva","wetdream","whitepower","whore","worldsex","wrappingmen","wrinkledstarfish","yaoi","yellowshowers","yiffy"];
var _F_MILD_SET = null;
function _fFold(s) {
  s = String(s == null ? "" : s).toLowerCase().split("").map(function (c) { return _F_LEET[c] || c; }).join("");
  return s.replace(/[^a-z]/g, "").replace(/(.)\1{2,}/g, "$1$1");
}
function _fTokens(s) {
  return String(s == null ? "" : s).toLowerCase().split(/[^a-z0-9@$!+|]+/i).map(_fFold).filter(function (t) { return !!t; });
}
function _isClean(text) {
  if (!_F_MILD_SET) { _F_MILD_SET = {}; _F_MILD.forEach(function (w) { _F_MILD_SET[w] = 1; }); }
  var sq = _fFold(text);
  if (!sq) return true;
  for (var i = 0; i < _F_STRONG.length; i++) if (sq.indexOf(_F_STRONG[i]) !== -1) return false;
  if (_F_MILD_SET[sq]) return false;
  var tk = _fTokens(text);
  for (var j = 0; j < tk.length; j++) if (_F_MILD_SET[tk[j]]) return false;
  return true;
}
function _cleanMsg(what) { return "That " + what + " isn't allowed here — please choose different wording."; }

/* ============================ board key routing ===========================
   UK FPTP (no scenario / freshstart) → "mode|difficulty|cabinetSize"
   UK scenario (thatcher1983 etc)     → "scenario:<key>"
   International scenario             → "scenario:<key>"
   International system (no scenario) → "system:<electoralSystem>"
   Old rows without the new cols always fall through to mode|diff|size.     */
function _boardKey(d) {
  var sc = _str(d.scenarioKey || "", 40).replace(/[^a-z0-9_\-]/gi, "");
  if (sc && sc !== "freshstart") return "scenario:" + sc;
  var es = _str(d.electoralSystem || "", 40).replace(/[^a-z0-9_\-]/gi, "");
  if (es && es !== "fptp_uk") return "system:" + es;
  return _str(d.mode || "unity", 12) + "|" + _str(d.difficulty || "normal", 8) + "|" + _str(d.cabinetSize || "standard", 10);
}
function _keyOf(r) {
  /* derive board key from a row in the board tab */
  var sc = _str(r[14] == null ? "" : r[14], 40).replace(/[^a-z0-9_\-]/gi, "");
  if (sc && sc !== "freshstart") return "scenario:" + sc;
  var es = _str(r[15] == null ? "" : r[15], 40).replace(/[^a-z0-9_\-]/gi, "");
  if (es && es !== "fptp_uk") return "system:" + es;
  return _str(r[4], 12) + "|" + _str(r[5], 8) + "|" + _str(r[6], 10);
}
function _hardKey() { return HARDEST.mode + "|" + HARDEST.difficulty + "|" + HARDEST.cabinetSize; }

/* ============================ leaderboard ================================= */
function _parse(s) { try { return JSON.parse(s); } catch (e) { return []; } }
function _entryFromRow(r) {
  var totalSeats = _totalOf(r);
  var seats = _clamp(r[1], 0, MAX_SEATS);
  return {
    name:          _name(r[0]),
    seats:         seats,
    legacy:        (r[2] === "" || r[2] == null) ? null : _clamp(r[2], 0, 100),
    govt:          r[3] === true || r[3] === "true",
    mode:          _str(r[4], 12),
    difficulty:    _str(r[5], 8),
    cabinetSize:   _str(r[6], 10),
    cabinet:       _parse(r[7]),
    breakdown:     _parse(r[8]),
    ts:            Number(r[9]) || 0,
    runId:         _str(r[11] == null ? "" : r[11], 32),
    partyName:     _str(r[12] == null ? "" : r[12], 28),
    partyAlign:    _str(r[13] == null ? "" : r[13], 14),
    scenarioKey:   _str(r[14] == null ? "" : r[14], 40),
    electoralSystem: _str(r[15] == null ? "" : r[15], 40),
    totalSeats:    totalSeats,
    pct:           totalSeats > 0 ? seats / totalSeats * 100 : 0
  };
}
function _levelByName() {
  var rows = _rows("accounts"), m = {};
  rows.forEach(function (r) { m[_key(r[0])] = Number(r[2]) || 1; });
  return m;
}

/* Top entries for a specific board (identified by key string) */
function _topBoard(key) {
  if (!key) key = _hardKey();
  var rows = _rows("board"), best = {}, lv = _levelByName();
  rows.forEach(function (r) {
    if (_keyOf(r) !== key) return;
    var e = _entryFromRow(r), k = _key(e.name);
    if (!best[k] || _rank(e, best[k]) < 0) best[k] = e;
  });
  return Object.keys(best).map(function (k) { var e = best[k]; e.level = lv[k] || 1; return e; }).sort(_rank).slice(0, MAX_RETURN);
}

/* Overall board: best seats + best legacy across ALL boards per player */
function _overall() {
  var rows = _rows("board"), byPlayer = {}, lv = _levelByName();
  rows.forEach(function (r) {
    var e = _entryFromRow(r), pk = _key(e.name);
    var p = byPlayer[pk] = byPlayer[pk] || { name: e.name, bestSeats: 0, bestLegacy: null, govt: false, rep: null };
    if (e.seats > p.bestSeats) p.bestSeats = e.seats;
    if (e.legacy != null && (p.bestLegacy == null || e.legacy > p.bestLegacy)) p.bestLegacy = e.legacy;
    p.govt = p.govt || e.govt;
    if (!p.rep || _rank(e, p.rep) < 0) p.rep = e;
  });
  var out = Object.keys(byPlayer).map(function (pk) {
    var p = byPlayer[pk], rep = p.rep || {}, lv2 = lv[pk] || 1;
    return { name: p.name, seats: p.bestSeats, legacy: p.bestLegacy, govt: p.govt,
             mode: rep.mode || "", difficulty: rep.difficulty || "", cabinetSize: rep.cabinetSize || "",
             runId: rep.runId || "", partyName: rep.partyName || "", partyAlign: rep.partyAlign || "",
             cabinet: rep.cabinet || [], breakdown: rep.breakdown || [], level: lv2,
             scenarioKey: rep.scenarioKey || "", electoralSystem: rep.electoralSystem || "",
             totalSeats: rep.totalSeats || 650 };
  });
  out.sort(function (a, b) {
    var la = (a.legacy == null ? -1 : a.legacy), lb2 = (b.legacy == null ? -1 : b.legacy);
    if (lb2 !== la) return lb2 - la;
    return b.seats - a.seats;
  });
  return out.slice(0, MAX_RETURN);
}

/* All Results % board: best seats/totalSeats percentage across ALL boards per player.
   A 600/650 UK sweep (92.3%) ranks below a 700/736 Bundestag result (95.1%).
   Guided democracy runs (North Korea, Cuba, etc.) are EXCLUDED — 99.9% is not
   comparable to a genuinely contested election. */
function _overallPct() {
  var rows = _rows("board"), byPlayer = {}, lv = _levelByName();
  rows.forEach(function (r) {
    var es = _str(r[15] == null ? "" : r[15], 40);
    /* exclude guided democracy (despot) systems */
    if (es && es.indexOf("guided_") === 0) return;
    var e = _entryFromRow(r);
    var pk = _key(e.name);
    var p = byPlayer[pk];
    if (!p || _rankPct(e, p) < 0 || (Math.abs(e.pct - p.pct) < 0.0001 && (e.legacy || 0) > (p.legacy || 0))) {
      byPlayer[pk] = e;
    }
  });
  var out = Object.keys(byPlayer).map(function (pk) { var e = byPlayer[pk]; e.level = lv[pk] || 1; return e; });
  out.sort(_rankPct);
  return out.slice(0, MAX_RETURN);
}

function _ownerOk(nameKey, d, account) {
  var rows = _rows("owners"), sh = _tab("owners");
  for (var i = 0; i < rows.length; i++) {
    if (_key(rows[i][0]) === nameKey) {
      var rec = rows[i];
      if (account && rec[4] && String(rec[4]) === account.userKey) { sh.getRange(i + 2, 7).setValue(_nowISO()); return { ok: true }; }
      if (d.owner && _hash(d.owner, rec[3]) === String(rec[2])) { sh.getRange(i + 2, 7).setValue(_nowISO()); return { ok: true }; }
      return { ok: false };
    }
  }
  var token = _newToken(), salt = _newSalt();
  _tab("owners").appendRow([nameKey, _name(d.name), _hash(token, salt), salt, (account ? account.userKey : ""), _nowISO(), _nowISO()]);
  return { ok: true, token: token };
}

/* one run's row for the RUNS history tab */
function _runsRow(name, d, kind, partyName) {
  return [
    _nowISO(), name, _clamp(d.seats, 0, MAX_SEATS),
    (d.legacy === null || d.legacy === undefined || d.legacy === "") ? "" : _clamp(d.legacy, 0, 100),
    !!d.govt,
    _str(d.mode, 12), _str(d.difficulty, 8), _str(d.cabinetSize, 10), kind,
    JSON.stringify(d.cabinet || []), JSON.stringify(d.breakdown || []),
    _str(d.runId, 32), partyName, _str(d.partyAlign, 14),
    _str(d.scenarioKey || "", 40),           /* col 14 */
    _str(d.electoralSystem || "", 40),       /* col 15 */
    Number(d.totalSeats) > 0 ? Number(d.totalSeats) : 650  /* col 16 */
  ];
}

/* UPSERT one row per (player, runId, kind) in runs history */
function _upsertRun(sh, rows, name, d, kind, partyName) {
  var row = _runsRow(name, d, kind, partyName);
  var rid = _str(d.runId, 32);
  if (rid) {
    for (var i = rows.length - 1; i >= 0; i--) {
      if (_str(rows[i][11], 32) === rid && String(rows[i][8]) === kind && _key(rows[i][1]) === _key(name)) {
        var hadLegacy = !(rows[i][3] === "" || rows[i][3] == null);
        var sameSeats = _clamp(rows[i][2], 0, MAX_SEATS) === row[2];
        if (row[3] === "" && hadLegacy && sameSeats) row[3] = _clamp(rows[i][3], 0, 100);
        sh.getRange(i + 2, 1, 1, TABS.runs.length).setValues([row]);
        return;
      }
    }
  }
  sh.appendRow(row);
  _trim(sh, MAX_RUNS);
}

function _doScore(d, kind) {
  var account = _auth(d);

  var partyName = _str(d.partyName, 28).replace(/[<>&"']/g, "").replace(/\s+/g, " ");
  if (partyName && !_isClean(partyName)) partyName = "";

  if (kind === "log") {
    if (!account) return _json({ ok: true });
    _upsertRun(_tab("runs"), _rows("runs"), account.display, d, "log", partyName);
    return _json({ ok: true });
  }

  if (!account) return _json({ ok: false, error: "login", top: _topBoard(null) });
  var name = account.display, nameKey = account.userKey;

  var entry = [
    name, _clamp(d.seats, 0, MAX_SEATS),
    (d.legacy === null || d.legacy === undefined || d.legacy === "") ? "" : _clamp(d.legacy, 0, 100),
    !!d.govt,
    _str(d.mode, 12), _str(d.difficulty, 8), _str(d.cabinetSize, 10),
    JSON.stringify(d.cabinet || []), JSON.stringify(d.breakdown || []),
    Date.now(), account.userKey,
    _str(d.runId, 32), partyName, _str(d.partyAlign, 14),
    _str(d.scenarioKey || "", 40),           /* col 14 */
    _str(d.electoralSystem || "", 40),       /* col 15 */
    Number(d.totalSeats) > 0 ? Number(d.totalSeats) : 650  /* col 16 */
  ];

  var key = _boardKey(d), sh = _tab("board"), rows = _rows("board"), wrote = false;
  var e = _entryFromRow(entry);
  for (var i = 0; i < rows.length; i++) {
    if (_keyOf(rows[i]) === key && _key(rows[i][0]) === nameKey) {
      if (_rank(e, _entryFromRow(rows[i])) < 0) sh.getRange(i + 2, 1, 1, TABS.board.length).setValues([entry]);
      wrote = true; break;
    }
  }
  if (!wrote) { sh.appendRow(entry); _trim(sh, MAX_BOARD); }
  _upsertRun(_tab("runs"), _rows("runs"), name, d, "submit", partyName);

  return _json({ ok: true, top: _topBoard(key), overallPct: _overallPct() });
}
function _trim(sh, max) {
  var n = sh.getLastRow() - 1;
  if (n > max) sh.deleteRows(2, n - max);
}

/* ============================ accounts =================================== */
function _accIndex() {
  var rows = _rows("accounts"), byKey = {};
  rows.forEach(function (r, i) { byKey[_key(r[0])] = { row: i + 2, rec: r }; });
  return { rows: rows, byKey: byKey };
}
function _profile(rec) { return { name: _name(rec[1]), level: Number(rec[2]) || 1 }; }

function _register(d) {
  var u = _name(d.username), pw = String(d.password || ""), key = _key(u);
  if (u === "Anonymous" || key.length < 3) return _json({ ok: false, error: "bad username" });
  if (!_isClean(u)) return _json({ ok: false, error: _cleanMsg("username") });
  if (pw.length < 6) return _json({ ok: false, error: "password too short" });
  var idx = _accIndex();
  if (idx.byKey[key]) return _json({ ok: false, error: "name taken" });
  var level = idx.rows.length === 0 ? 9 : 1;
  var salt = _newSalt(), token = _newToken(), exp = Date.now() + SESSION_DAYS * 864e5;
  _tab("accounts").appendRow([key, u, level, false, _hash(pw, salt), salt, _hash(token, salt), exp, _nowISO(), _nowISO(), "{}"]);
  var oSalt = _newSalt(), oTok = _newToken();
  _tab("owners").appendRow([key, u, _hash(oTok, oSalt), oSalt, key, _nowISO(), _nowISO()]);
  return _json({ ok: true, token: token, profile: { name: u, level: level }, prefs: {}, ownerToken: oTok });
}

function _login(d) {
  var key = _key(d.username), pw = String(d.password || ""), idx = _accIndex(), a = idx.byKey[key];
  if (!a) return _json({ ok: false, error: "no such user" });
  if (a.rec[3] === true || a.rec[3] === "true") return _json({ ok: false, error: "banned" });
  if (_hash(pw, a.rec[5]) !== String(a.rec[4])) return _json({ ok: false, error: "wrong password" });
  var token = _newToken(), exp = Date.now() + SESSION_DAYS * 864e5, sh = _tab("accounts");
  sh.getRange(a.row, 7).setValue(_hash(token, a.rec[5]));
  sh.getRange(a.row, 8).setValue(exp);
  sh.getRange(a.row, 10).setValue(_nowISO());
  var prefs = _parse(a.rec[10]) || {};
  return _json({ ok: true, token: token, profile: _profile(a.rec), prefs: prefs });
}

function _auth(d) {
  var token = String(d.token || ""); if (!token) return null;
  var idx = _accIndex(), now = Date.now();
  for (var k in idx.byKey) {
    var a = idx.byKey[k], r = a.rec;
    if (r[3] === true || r[3] === "true") continue;
    if (Number(r[7]) < now) continue;
    if (_hash(token, r[5]) === String(r[6])) return { userKey: _key(r[0]), display: _name(r[1]), level: Number(r[2]) || 1, row: a.row, rec: r };
  }
  return null;
}
function _sessionInfo(d) {
  var a = _auth(d); if (!a) return _json({ ok: false });
  return _json({ ok: true, profile: { name: a.display, level: a.level }, prefs: _parse(a.rec[10]) || {} });
}
function _logout(d) {
  var a = _auth(d); if (a) _tab("accounts").getRange(a.row, 7).setValue("");
  return _json({ ok: true });
}
function _saverefs(d) {
  var a = _auth(d); if (!a) return _json({ ok: false, error: "login" });
  _tab("accounts").getRange(a.row, 11).setValue(JSON.stringify(d.prefs || {}));
  return _json({ ok: true });
}

/* ============================ chat ======================================= */
function _chatFetch(d) {
  var rows = _rows("chat"), out = [];
  for (var i = Math.max(0, rows.length - CHAT_FETCH); i < rows.length; i++) {
    var r = rows[i];
    if (r[6] === true || r[6] === "true") continue;
    out.push({ id: String(r[0]), display: _name(r[3]), level: Number(r[4]) || 1, text: String(r[5]), ts: Date.parse(r[1]) || 0 });
  }
  return _json({ ok: true, messages: out });
}
function _chatPost(d) {
  var a = _auth(d); if (!a) return _json({ ok: false, error: "login" });
  var text = String(d.text || "").replace(/\s+$/, "").slice(0, 280); if (!text) return _json({ ok: false, error: "empty" });
  if (!_isClean(text)) return _json({ ok: false, error: _cleanMsg("message") });
  var rows = _rows("chat");
  for (var i = rows.length - 1; i >= 0 && i >= rows.length - 12; i--) {
    if (_key(rows[i][2]) === a.userKey) {
      if (Date.now() - (Date.parse(rows[i][1]) || 0) < CHAT_MIN_GAP_MS) return _json({ ok: false, error: "slow down" });
      break;
    }
  }
  var sh = _tab("chat");
  sh.appendRow([Utilities.getUuid(), _nowISO(), a.userKey, a.display, a.level, text, false]);
  _trim(sh, CHAT_MAX);
  return _json({ ok: true });
}
function _chatDelete(d) {
  var a = _auth(d); if (!a || a.level < 5) return _json({ ok: false, error: "forbidden" });
  var rows = _rows("chat"), sh = _tab("chat");
  for (var i = 0; i < rows.length; i++) if (String(rows[i][0]) === String(d.id)) { sh.getRange(i + 2, 7).setValue(true); return _json({ ok: true }); }
  return _json({ ok: false, error: "not found" });
}

/* ============================ admin / config ============================= */
function _publicConfig() {
  var rows = _rows("config"), cfg = { banner: { text: "", active: false }, streams: [], rosterVersion: "0" };
  rows.forEach(function (r) {
    if (r[0] === "banner") cfg.banner = _parse(r[1]) || cfg.banner;
    else if (r[0] === "streams") cfg.streams = _parse(r[1]) || [];
    else if (r[0] === "rosterVersion") cfg.rosterVersion = String(r[1] || "0").replace(/^"+|"+$/g, "");
  });
  return cfg;
}
function _setConfig(key, valueObj) {
  var rows = _rows("config"), sh = _tab("config");
  for (var i = 0; i < rows.length; i++) if (rows[i][0] === key) { sh.getRange(i + 2, 2).setValue(JSON.stringify(valueObj)); return; }
  sh.appendRow([key, JSON.stringify(valueObj)]);
}
function _bumpRoster() {
  var cur = Number(_publicConfig().rosterVersion) || 0;
  _setConfig("rosterVersion", String(Math.max(Date.now(), cur + 1)));
}

function _adminBanner(d) {
  var a = _auth(d); if (!a || a.level < 9) return _json({ ok: false, error: "forbidden" });
  _setConfig("banner", { text: String(d.text || "").slice(0, 240), active: !!d.active });
  return _json({ ok: true, config: _publicConfig() });
}
function _adminStreams(d) {
  var a = _auth(d); if (!a || a.level < 9) return _json({ ok: false, error: "forbidden" });
  var list = (d.streams || []).slice(0, 12).map(function (s) { return { label: String(s.label || "Live").slice(0, 40), url: String(s.url || "").slice(0, 400) }; })
                              .filter(function (s) { return s.url; });
  _setConfig("streams", list);
  return _json({ ok: true, config: _publicConfig() });
}

function _adminUsers(d) {
  var a = _auth(d); if (!a || a.level < 5) return _json({ ok: false, error: "forbidden" });
  var users = _rows("accounts").map(function (r) { return { name: _name(r[1]), level: Number(r[2]) || 1, banned: r[3] === true || r[3] === "true" }; });
  return _json({ ok: true, users: users });
}
function _adminSetLevel(d) {
  var a = _auth(d); if (!a || a.level < 9) return _json({ ok: false, error: "forbidden" });
  var idx = _accIndex(), t = idx.byKey[_key(d.target)]; if (!t) return _json({ ok: false, error: "no user" });
  _tab("accounts").getRange(t.row, 3).setValue(_clamp(d.level, 1, 9));
  return _json({ ok: true });
}
function _adminBan(d, banned) {
  var a = _auth(d); if (!a || a.level < 9) return _json({ ok: false, error: "forbidden" });
  var idx = _accIndex(), t = idx.byKey[_key(d.target)]; if (!t) return _json({ ok: false, error: "no user" });
  _tab("accounts").getRange(t.row, 4).setValue(!!banned);
  return _json({ ok: true });
}

/* ============================ editable roster ============================ */
function _polRowFrom(p) {
  var s = p.stats || {};
  var mode = String(p.mode || "");
  var scope = String(p.scope || (mode === "parl2024" ? "p24" : "uk"));
  return [
    _str(p.name, 60), _str(p.party, 40), _str(p.era, 12), _str(scope, 8),
    _clamp(s.appeal, 0, 100), _clamp(s.experience, 0, 100), _clamp(s.oratory, 0, 100),
    _clamp(s.statecraft, 0, 100), _clamp(s.partyMgmt, 0, 100),
    _str((p.fits || []).join(","), 80), _str(p.note, 200), !!p.despot, _str(mode, 12),
    _str(p.cast, 12), _str(p.flag, 20), _str(p.wiki, 120), _str(p.img, 400)
  ];
}
function _adminAddPol(d) {
  var a = _auth(d); if (!a || a.level < 5) return _json({ ok: false, error: "forbidden" });
  var p = d.pol || {}; if (!p.name) return _json({ ok: false, error: "name required" });
  var row = _polRowFrom(p), nameKey = String(row[0]).toLowerCase(), scope = String(row[3]);
  var rows = _rows("pols"), sh = _tab("pols");
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).toLowerCase() === nameKey && String(rows[i][3]) === scope) {
      sh.getRange(i + 2, 1, 1, TABS.pols.length).setValues([row]);
      _bumpRoster();
      return _json({ ok: true, updated: true });
    }
  }
  sh.appendRow(row);
  _bumpRoster();
  return _json({ ok: true, added: true });
}
function _adminDelPol(d) {
  var a = _auth(d); if (!a || a.level < 5) return _json({ ok: false, error: "forbidden" });
  var nameKey = String(d.name || "").trim().toLowerCase(); if (!nameKey) return _json({ ok: false, error: "name required" });
  var scope = String(d.scope || "uk");
  var rows = _rows("pols"), sh = _tab("pols");
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).toLowerCase() === nameKey && String(rows[i][3]) === scope) {
      sh.deleteRow(i + 2);
      _bumpRoster();
      return _json({ ok: true, deleted: true });
    }
  }
  return _json({ ok: false, error: "not found" });
}
function _roster() {
  return _rows("pols").map(function (r) {
    return {
      name: String(r[0]), party: String(r[1]), era: String(r[2]), scope: String(r[3] || "uk"),
      stats: { appeal: Number(r[4]) || 50, experience: Number(r[5]) || 50, oratory: Number(r[6]) || 50, statecraft: Number(r[7]) || 50, partyMgmt: Number(r[8]) || 50 },
      fits: String(r[9] || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean),
      note: String(r[10] || ""), despot: r[11] === true || r[11] === "true", mode: String(r[12] || ""),
      cast: String(r[13] == null ? "" : r[13]), flag: String(r[14] == null ? "" : r[14]),
      wiki: String(r[15] == null ? "" : r[15]), img: String(r[16] == null ? "" : r[16])
    };
  });
}
