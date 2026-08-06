/* =============================================================================
   650 — Cloudflare Worker  (backend + stats, on spectrum-sweeps-db)
   -----------------------------------------------------------------------------
   Replaces the old Google Apps Script backend. Speaks the SAME { game:"650",
   kind } POST protocol and returns the SAME JSON shapes, so the only client
   change is the endpoint URL. Everything lives in D1 tables prefixed b650_*
   (backend) and sim650_* (forecast stats), namespaced so they never collide
   with the Spectrum Sweeps tournament tables on the shared database.

   Passwords + session/owner tokens are salted + PEPPERED and SHA-256 hashed,
   exactly as the Apps Script did (value|salt|PEPPER). PEPPER is a Worker SECRET
   (env.PEPPER) — never in this file. The first account to register is admin.
   ============================================================================= */

/* ---------------- config ---------------- */
/* the hardest PLAYABLE configuration — the single ranked competition. Wildcard
   (the widest, most chaotic pool) on Brutal (elite opposition), an expanded
   16-seat cabinet, no draft do-overs, a full governed term with the manifesto
   and campaign phases on, in the UK's 650-seat Commons. Admin-overridable via
   the "ranked" config key. */
const RANKED_DEFAULT = { country: "uk", mode: "wildcard", difficulty: "brutal", cabinetSize: "expanded", system: "", scenario: "", redos: 0, govern: 1, policy: 1, campaign: 1 };
const RANKED_BOARD = "ranked";
async function getRanked(env) {
  const row = await dFirst(env, "SELECT value FROM b650_config WHERE key='ranked'");
  const saved = row && parse(row.value);
  return saved ? Object.assign({}, RANKED_DEFAULT, saved) : RANKED_DEFAULT;
}
/* does a submitted run match the ranked spec on its seat-affecting settings? */
function rankedMatch(d, spec) {
  if (str(d.mode, 12) !== spec.mode) return false;
  if (str(d.difficulty, 8) !== spec.difficulty) return false;
  if (str(d.cabinetSize, 10) !== spec.cabinetSize) return false;
  const es = str(d.electoralSystem, 40);
  if (spec.system) { if (es !== spec.system) return false; }
  else if (es && es !== "fptp_uk") return false;
  const sc = str(d.scenarioKey, 40);
  if (spec.scenario) { if (sc !== spec.scenario) return false; }
  else if (sc && sc !== "freshstart") return false;
  return true;
}
const SESSION_DAYS = 45, MAX_SEATS = 3000, MAX_RETURN = 50;
const CHAT_FETCH = 80, CHAT_MIN_GAP_MS = 2500, CHAT_MAX = 400, MAX_BOARD = 4000, MAX_RUNS = 8000;

const ALLOW = new Set([
  "https://650-0.co.uk", "https://www.650-0.co.uk",
  "https://tupci-sketch.github.io",
  "http://localhost:8080", "http://localhost:3000", "null"
]);
const DEFAULT_ORIGIN = "https://650-0.co.uk";
function cors(origin) {
  const o = origin && ALLOW.has(origin) ? origin : DEFAULT_ORIGIN;
  return { "Access-Control-Allow-Origin": o, "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
           "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" };
}
function json(data, origin, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...cors(origin) } });
}

/* ---------------- crypto (matches the Apps Script) ---------------- */
async function sha256hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}
function hsh(env, value, salt) { return sha256hex(String(value) + "|" + String(salt) + "|" + String(env.PEPPER || "")); }
function newToken() { return (crypto.randomUUID() + crypto.randomUUID()).replace(/-/g, ""); }
function newSalt() { return crypto.randomUUID().replace(/-/g, ""); }

/* ---------------- tiny utils ---------------- */
const nm = n => (String(n == null ? "" : n).replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, 24)) || "Anonymous";
const keyOf = n => nm(n).toLowerCase();
const str = (s, n) => String(s == null ? "" : s).slice(0, n || 40);
const clampInt = (v, lo, hi) => { v = Math.round(Number(v)); if (!isFinite(v)) return lo; return Math.max(lo, Math.min(hi, v)); };
const nowISO = () => new Date().toISOString();
const parse = s => { try { return typeof s === "string" ? JSON.parse(s) : (s || []); } catch (e) { return []; } };
function boardKeyFrom(mode, difficulty, cabinetSize, scenarioKey, electoralSystem) {
  const sc = str(scenarioKey, 40).replace(/[^a-z0-9_\-]/gi, "");
  if (sc && sc !== "freshstart") return "scenario:" + sc;
  const es = str(electoralSystem, 40).replace(/[^a-z0-9_\-]/gi, "");
  if (es && es !== "fptp_uk") return "system:" + es;
  return str(mode || "unity", 12) + "|" + str(difficulty || "normal", 8) + "|" + str(cabinetSize || "standard", 10);
}
function rankSeatsLegacy(a, b) { if (b.seats !== a.seats) return b.seats - a.seats; return (b.legacy == null ? -1 : b.legacy) - (a.legacy == null ? -1 : a.legacy); }

/* ---------------- profanity screen (ported) ---------------- */
const F_LEET = { "0":"o","1":"i","3":"e","4":"a","5":"s","6":"g","7":"t","8":"b","9":"g","@":"a","$":"s","!":"i","+":"t","|":"i" };
const F_STRONG = ["beaner","beastial","bestial","bollock","childporn","chink","clusterfuck","cocksuck","coochi","cunnilingus","darkie","fagging","faggot","fagot","fuck","golliwog","gook","jailbait","jigaboo","jiggaboo","kafir","kiddieporn","kike","loli","molest","motherfuck","necrophil","nigg","niglet","nigr","octopussy","paedophil","paki","pedophil","porchmonkey","raghead","raping","rapist","shemale","shit","spic","towelhead","tranny","twat","wank","wetback","wop","zoophil"];
const F_MILD = ["acrotomophilia","alabamahotpocket","alaskanpipeline","anal","anilingus","anus","arsehole","ass","asshole","assmunch","autoerotic","babeland","babybatter","babyjuice","ballgag","ballgravy","ballicking","ballkicking","ballsack","ballsucking","bangbros","bangbus","bareback","barelylegal","barenaked","bastard","bastardo","bastinado","bbw","bdsm","beavercleaver","beaverlips","bigblack","bigbreasts","bigknockers","bigtits","bimbos","birdlock","bitch","bitches","blackcock","blondeaction","blondeonblondeaction","blowjob","blowyourload","bluewaffle","blumpkin","bondage","boner","boob","boobs","bootycall","brownshowers","brunetteaction","bukkake","bulldyke","bulletvibe","bunghole","busty","butt","buttcheeks","butthole","cameltoe","camgirl","camslut","camwhore","carpetmuncher","chocolaterosebuds","cialis","circlejerk","clevelandsteamer","clit","clitoris","cloverclamps","cock","cocks","coon","coons","coprolagnia","coprophilia","cornhole","creampie","cum","cumming","cumshot","cumshots","cunt","daterape","deepthroat","dendrophilia","dick","dildo","dingleberries","dingleberry","dirtypillows","dirtysanchez","doggiestyle","doggystyle","dogstyle","dolcett","domination","dominatrix","dommes","donkeypunch","doubledong","doublepenetration","dpaction","dryhump","dvda","eatmyass","ecchi","ejaculation","erotic","erotism","escort","eunuch","fag","fecal","felch","fellatio","feltch","femalesquirting","femdom","figging","fingerbang","fingering","fisting","footfetish","footjob","frotting","fudgepacker","futanari","gangbang","gaysex","genitals","giantcock","gic","girlon","girlontop","girlsgonewild","girlsicup","goatcx","goatse","goddamn","gokkun","goldenshower","goodpoop","googirl","goregasm","grope","groupsex","gspot","guro","handjob","hardcore","hentai","homoerotic","honkey","hooker","horny","hotcarl","hotchick","howtokill","howtomurder","hugefat","humping","incest","intercourse","jackoff","jellydonut","jerkoff","jiggerboo","jizz","juggs","kinbaku","kinkster","kinky","knobbing","leatherrestraint","leatherstraightjacket","lemonparty","livesex","lovemaking","makemecome","malesquirting","masturbate","masturbating","masturbation","menageatrois","milf","missionaryposition","mong","moundofvenus","mrhands","muffdiver","muffdiving","nambla","nawashi","negro","neonazi","nignog","nimphomania","nipple","nipples","nsfw","nsfwimages","nude","nudity","nutten","nympho","nymphomania","omorashi","onecuptwogirls","oneguyonejar","orgasm","orgy","panties","panty","pedobear","pegging","penis","phonesex","pikey","pissing","pisspig","playboy","pleasurechest","polesmoker","ponyplay","poof","poon","poontang","poopchute","porn","porno","pornography","princealbertpiercing","pthc","pubes","punany","pussy","queaf","queef","quim","ragingboner","rape","rectum","reversecowgirl","rimjob","rimming","rosypalm","rosypalmandherssisters","rustytrombone","sadism","santorum","scat","schlong","scissoring","semen","sex","sexcam","sexo","sexual","sexuality","sexually","sexy","shavedbeaver","shavedpussy","shibari","shota","shrimping","skeet","slanteye","slut","smut","snatch","snowballing","sodomize","sodomy","spastic","splooge","sploogemoose","spooge","spreadlegs","spunk","strapon","strappado","stripclub","styledoggy","suck","sucks","suicidegirls","sultrywomen","swastika","swinger","taintedlove","tastemy","teabagging","threesome","throating","thumbzilla","tiedup","tightwhite","tit","tits","titties","titty","tongueina","topless","tosser","tribadism","tubgirl","tushy","twink","twinkie","twogirlsonecup","undressing","upskirt","urethraplay","urophilia","vagina","venusmound","viagra","vibrator","violetwand","vorarephilia","voyeur","voyeurweb","voyuer","vulva","wetdream","whitepower","whore","worldsex","wrappingmen","wrinkledstarfish","yaoi","yellowshowers","yiffy"];
let F_MILD_SET = null;
function fFold(s) { s = String(s == null ? "" : s).toLowerCase().split("").map(c => F_LEET[c] || c).join(""); return s.replace(/[^a-z]/g, "").replace(/(.)\1{2,}/g, "$1$1"); }
function fTokens(s) { return String(s == null ? "" : s).toLowerCase().split(/[^a-z0-9@$!+|]+/i).map(fFold).filter(t => !!t); }
function isClean(text) {
  if (!F_MILD_SET) { F_MILD_SET = {}; F_MILD.forEach(w => { F_MILD_SET[w] = 1; }); }
  const sq = fFold(text); if (!sq) return true;
  for (let i = 0; i < F_STRONG.length; i++) if (sq.indexOf(F_STRONG[i]) !== -1) return false;
  if (F_MILD_SET[sq]) return false;
  const tk = fTokens(text); for (let j = 0; j < tk.length; j++) if (F_MILD_SET[tk[j]]) return false;
  return true;
}
const cleanMsg = what => "That " + what + " isn't allowed here — please choose different wording.";

/* ---------------- D1 helpers ---------------- */
const dAll = async (env, sql, ...p) => ((await env.DB.prepare(sql).bind(...p).all()).results) || [];
const dFirst = async (env, sql, ...p) => await env.DB.prepare(sql).bind(...p).first();
const dRun = async (env, sql, ...p) => await env.DB.prepare(sql).bind(...p).run();

let schemaReady = false;
async function ensureSchema(env) {
  if (schemaReady) return;
  const DB = env.DB;
  await DB.prepare("CREATE TABLE IF NOT EXISTS sim650_runs (id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER, scenario TEXT, country TEXT, mode TEXT, difficulty TEXT, cab_sig TEXT, per_seat REAL, seats INTEGER, total INTEGER, p_majority REAL, p5 INTEGER, p50 INTEGER, p95 INTEGER, model TEXT)").run();
  await DB.prepare("CREATE INDEX IF NOT EXISTS sim650_runs_scen ON sim650_runs(scenario, difficulty)").run();
  await DB.prepare("CREATE TABLE IF NOT EXISTS b650_accounts (userKey TEXT PRIMARY KEY, display TEXT, level INTEGER, banned INTEGER, pwHash TEXT, pwSalt TEXT, sessHash TEXT, sessExp INTEGER, createdISO TEXT, lastISO TEXT, prefs TEXT)").run();
  await DB.prepare("CREATE TABLE IF NOT EXISTS b650_owners (nameKey TEXT PRIMARY KEY, display TEXT, tokenHash TEXT, salt TEXT, userKey TEXT, createdISO TEXT, lastISO TEXT)").run();
  await DB.prepare("CREATE TABLE IF NOT EXISTS b650_board (id INTEGER PRIMARY KEY AUTOINCREMENT, boardKey TEXT, name TEXT, userKey TEXT, seats INTEGER, legacy INTEGER, govt INTEGER, mode TEXT, difficulty TEXT, cabinetSize TEXT, cabinet TEXT, breakdown TEXT, ts INTEGER, runId TEXT, party TEXT, align TEXT, scenarioKey TEXT, electoralSystem TEXT, totalSeats INTEGER)").run();
  await DB.prepare("CREATE UNIQUE INDEX IF NOT EXISTS b650_board_uk ON b650_board(userKey, boardKey)").run();
  await DB.prepare("CREATE TABLE IF NOT EXISTS b650_runs (id INTEGER PRIMARY KEY AUTOINCREMENT, ts_iso TEXT, name TEXT, nameKey TEXT, seats INTEGER, legacy INTEGER, govt INTEGER, mode TEXT, difficulty TEXT, cabinetSize TEXT, kind TEXT, cabinet TEXT, breakdown TEXT, runId TEXT, party TEXT, align TEXT, scenarioKey TEXT, electoralSystem TEXT, totalSeats INTEGER)").run();
  await DB.prepare("CREATE INDEX IF NOT EXISTS b650_runs_who ON b650_runs(nameKey, runId, kind)").run();
  await DB.prepare("CREATE TABLE IF NOT EXISTS b650_chat (id TEXT PRIMARY KEY, ts_iso TEXT, userKey TEXT, display TEXT, level INTEGER, text TEXT, deleted INTEGER)").run();
  await DB.prepare("CREATE TABLE IF NOT EXISTS b650_config (key TEXT PRIMARY KEY, value TEXT)").run();
  await DB.prepare("CREATE TABLE IF NOT EXISTS b650_pols (id INTEGER PRIMARY KEY AUTOINCREMENT, nameKey TEXT, scope TEXT, name TEXT, party TEXT, era TEXT, appeal INTEGER, experience INTEGER, oratory INTEGER, statecraft INTEGER, partyMgmt INTEGER, fits TEXT, note TEXT, despot INTEGER, mode TEXT, cast TEXT, flag TEXT, wiki TEXT, img TEXT, deleted INTEGER DEFAULT 0)").run();
  await DB.prepare("CREATE UNIQUE INDEX IF NOT EXISTS b650_pols_uk ON b650_pols(nameKey, scope)").run();
  /* anti-replay: the first player to score a given run fingerprint owns it; a
     byte-identical run (a loaded replay) can never score again. Stores the run
     code too, so any leaderboard run can be loaded and reproduced. */
  await DB.prepare("CREATE TABLE IF NOT EXISTS b650_claims (runFp TEXT PRIMARY KEY, userKey TEXT, ts INTEGER, runCode TEXT, boardKey TEXT, seats INTEGER)").run();
  /* additive columns for run codes on the board (guarded — ignore if present) */
  await addCol(env, "b650_board", "runFp", "TEXT");
  await addCol(env, "b650_board", "runCode", "TEXT");
  /* base=1 marks a migrated built-in figure (the full roster lives in D1 and is
     editable from housekeeping); base=0 marks an admin delta (edit / add /
     tombstone) that the gameplay overlay applies over the bundled base. */
  await addCol(env, "b650_pols", "base", "INTEGER DEFAULT 0");
  schemaReady = true;
}
async function addCol(env, table, col, type) {
  try { await env.DB.prepare("ALTER TABLE " + table + " ADD COLUMN " + col + " " + type).run(); } catch (e) { /* already exists */ }
}

/* ---------------- accounts / auth ---------------- */
function profile(a) { return { name: nm(a.display), level: Number(a.level) || 1 }; }
async function auth(env, d) {
  const token = String(d.token || ""); if (!token) return null;
  const rows = await dAll(env, "SELECT * FROM b650_accounts");
  const now = Date.now();
  for (const a of rows) {
    if (a.banned) continue;
    if (Number(a.sessExp) < now) continue;
    if ((await hsh(env, token, a.pwSalt)) === String(a.sessHash)) return a;
  }
  return null;
}
async function levelMap(env) {
  const rows = await dAll(env, "SELECT userKey, level FROM b650_accounts");
  const m = {}; rows.forEach(r => { m[keyOf(r.userKey)] = Number(r.level) || 1; }); return m;
}

/* ---------------- board / entries ---------------- */
function entryFromBoard(r, lv) {
  const totalSeats = Number(r.totalSeats) > 0 ? Number(r.totalSeats) : 650;
  const seats = clampInt(r.seats, 0, MAX_SEATS);
  return {
    name: nm(r.name), seats,
    legacy: (r.legacy == null || r.legacy === "") ? null : clampInt(r.legacy, 0, 100),
    govt: !!r.govt, mode: str(r.mode, 12), difficulty: str(r.difficulty, 8), cabinetSize: str(r.cabinetSize, 10),
    cabinet: parse(r.cabinet), breakdown: parse(r.breakdown), ts: Number(r.ts) || 0,
    runId: str(r.runId, 32), partyName: str(r.party, 28), partyAlign: str(r.align, 14),
    scenarioKey: str(r.scenarioKey, 40), electoralSystem: str(r.electoralSystem, 40),
    totalSeats, pct: totalSeats > 0 ? seats / totalSeats * 100 : 0,
    runCode: str(r.runCode, 2000),
    level: (lv && lv[keyOf(r.name)]) || 1
  };
}
async function topBoard(env, key) {
  if (!key) key = RANKED_BOARD;
  const lv = await levelMap(env);
  const rows = await dAll(env, "SELECT * FROM b650_board WHERE boardKey=? ORDER BY seats DESC, COALESCE(legacy,-1) DESC LIMIT ?", key, MAX_RETURN);
  return rows.map(r => entryFromBoard(r, lv));
}
async function overall(env) {
  const lv = await levelMap(env);
  const rows = await dAll(env, "SELECT * FROM b650_board");
  const byPlayer = {};
  rows.forEach(r => {
    const e = entryFromBoard(r, lv), pk = keyOf(e.name);
    const p = byPlayer[pk] = byPlayer[pk] || { name: e.name, bestSeats: 0, bestLegacy: null, govt: false, rep: null };
    if (e.seats > p.bestSeats) p.bestSeats = e.seats;
    if (e.legacy != null && (p.bestLegacy == null || e.legacy > p.bestLegacy)) p.bestLegacy = e.legacy;
    p.govt = p.govt || e.govt;
    if (!p.rep || rankSeatsLegacy(e, p.rep) < 0) p.rep = e;
  });
  const out = Object.keys(byPlayer).map(pk => {
    const p = byPlayer[pk], rep = p.rep || {};
    return { name: p.name, seats: p.bestSeats, legacy: p.bestLegacy, govt: p.govt,
             mode: rep.mode || "", difficulty: rep.difficulty || "", cabinetSize: rep.cabinetSize || "",
             runId: rep.runId || "", partyName: rep.partyName || "", partyAlign: rep.partyAlign || "",
             cabinet: rep.cabinet || [], breakdown: rep.breakdown || [], level: (lv[pk] || 1),
             scenarioKey: rep.scenarioKey || "", electoralSystem: rep.electoralSystem || "", totalSeats: rep.totalSeats || 650 };
  });
  out.sort((a, b) => { const la = a.legacy == null ? -1 : a.legacy, lb = b.legacy == null ? -1 : b.legacy; if (lb !== la) return lb - la; return b.seats - a.seats; });
  return out.slice(0, MAX_RETURN);
}
function rankPct(a, b) { const pa = a.pct != null ? a.pct : 0, pb = b.pct != null ? b.pct : 0; if (Math.abs(pb - pa) > 0.0001) return pb - pa; return (b.legacy == null ? -1 : b.legacy) - (a.legacy == null ? -1 : a.legacy); }
async function overallPct(env) {
  const lv = await levelMap(env);
  const rows = await dAll(env, "SELECT * FROM b650_board");
  const byPlayer = {};
  rows.forEach(r => {
    const es = str(r.electoralSystem, 40);
    if (es && es.indexOf("guided_") === 0) return;
    const e = entryFromBoard(r, lv), pk = keyOf(e.name), p = byPlayer[pk];
    if (!p || rankPct(e, p) < 0 || (Math.abs(e.pct - p.pct) < 0.0001 && (e.legacy || 0) > (p.legacy || 0))) byPlayer[pk] = e;
  });
  return Object.values(byPlayer).sort(rankPct).slice(0, MAX_RETURN);
}

/* ---------------- run history upsert ---------------- */
async function upsertRun(env, name, d, kind, partyName) {
  const nameKey = keyOf(name), rid = str(d.runId, 32);
  const row = {
    ts_iso: nowISO(), name, nameKey, seats: clampInt(d.seats, 0, MAX_SEATS),
    legacy: (d.legacy === null || d.legacy === undefined || d.legacy === "") ? null : clampInt(d.legacy, 0, 100),
    govt: d.govt ? 1 : 0, mode: str(d.mode, 12), difficulty: str(d.difficulty, 8), cabinetSize: str(d.cabinetSize, 10),
    kind, cabinet: JSON.stringify(d.cabinet || []), breakdown: JSON.stringify(d.breakdown || []),
    runId: rid, party: partyName, align: str(d.partyAlign, 14), scenarioKey: str(d.scenarioKey, 40),
    electoralSystem: str(d.electoralSystem, 40), totalSeats: Number(d.totalSeats) > 0 ? Number(d.totalSeats) : 650
  };
  if (rid) {
    const ex = await dFirst(env, "SELECT id, legacy, seats FROM b650_runs WHERE nameKey=? AND runId=? AND kind=? ORDER BY id DESC LIMIT 1", nameKey, rid, kind);
    if (ex) {
      if (row.legacy == null && ex.legacy != null && clampInt(ex.seats, 0, MAX_SEATS) === row.seats) row.legacy = clampInt(ex.legacy, 0, 100);
      await dRun(env, "UPDATE b650_runs SET ts_iso=?,name=?,seats=?,legacy=?,govt=?,mode=?,difficulty=?,cabinetSize=?,cabinet=?,breakdown=?,party=?,align=?,scenarioKey=?,electoralSystem=?,totalSeats=? WHERE id=?",
        row.ts_iso, row.name, row.seats, row.legacy, row.govt, row.mode, row.difficulty, row.cabinetSize, row.cabinet, row.breakdown, row.party, row.align, row.scenarioKey, row.electoralSystem, row.totalSeats, ex.id);
      return;
    }
  }
  await dRun(env, "INSERT INTO b650_runs (ts_iso,name,nameKey,seats,legacy,govt,mode,difficulty,cabinetSize,kind,cabinet,breakdown,runId,party,align,scenarioKey,electoralSystem,totalSeats) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    row.ts_iso, row.name, row.nameKey, row.seats, row.legacy, row.govt, row.mode, row.difficulty, row.cabinetSize, row.kind, row.cabinet, row.breakdown, row.runId, row.party, row.align, row.scenarioKey, row.electoralSystem, row.totalSeats);
}

async function doScore(env, d, kind) {
  const account = await auth(env, d);
  let partyName = str(d.partyName, 28).replace(/[<>&"']/g, "").replace(/\s+/g, " ");
  if (partyName && !isClean(partyName)) partyName = "";

  if (kind === "log") {
    if (!account) return { ok: true };
    await upsertRun(env, nm(account.display), d, "log", partyName);
    return { ok: true };
  }
  if (!account) return { ok: false, error: "login", top: await topBoard(env, null) };

  const name = nm(account.display), userKey = keyOf(account.userKey);
  /* a run that meets the ranked spec competes on the single ranked board;
     everything else lands on its natural per-nation / per-mode board. */
  const rankedSpec = await getRanked(env);
  const isRanked = !!d.ranked && rankedMatch(d, rankedSpec);
  const bk = isRanked ? RANKED_BOARD : boardKeyFrom(d.mode, d.difficulty, d.cabinetSize, d.scenarioKey, d.electoralSystem);
  const seats = clampInt(d.seats, 0, MAX_SEATS);
  const legacy = (d.legacy === null || d.legacy === undefined || d.legacy === "") ? null : clampInt(d.legacy, 0, 100);

  /* ANTI-REPLAY: a run's fingerprint is claimed by the first player to score it.
     A byte-identical run submitted by anyone else is a replay and cannot count. */
  const fp = str(d.runFp, 24), runCode = str(d.runCode, 2000);
  if (fp) {
    const claim = await dFirst(env, "SELECT userKey FROM b650_claims WHERE runFp=?", fp);
    if (claim && keyOf(claim.userKey) !== userKey) {
      return { ok: false, error: "replay", top: await topBoard(env, bk) };
    }
    if (!claim) {
      await dRun(env, "INSERT OR IGNORE INTO b650_claims (runFp,userKey,ts,runCode,boardKey,seats) VALUES (?,?,?,?,?,?)",
        fp, userKey, Date.now(), runCode, bk, seats);
    }
  }

  await dRun(env,
    "INSERT INTO b650_board (boardKey,name,userKey,seats,legacy,govt,mode,difficulty,cabinetSize,cabinet,breakdown,ts,runId,party,align,scenarioKey,electoralSystem,totalSeats,runFp,runCode) " +
    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) " +
    "ON CONFLICT(userKey,boardKey) DO UPDATE SET name=excluded.name,seats=excluded.seats,legacy=excluded.legacy,govt=excluded.govt,mode=excluded.mode,difficulty=excluded.difficulty,cabinetSize=excluded.cabinetSize,cabinet=excluded.cabinet,breakdown=excluded.breakdown,ts=excluded.ts,runId=excluded.runId,party=excluded.party,align=excluded.align,scenarioKey=excluded.scenarioKey,electoralSystem=excluded.electoralSystem,totalSeats=excluded.totalSeats,runFp=excluded.runFp,runCode=excluded.runCode " +
    "WHERE excluded.seats > b650_board.seats OR (excluded.seats = b650_board.seats AND COALESCE(excluded.legacy,-1) > COALESCE(b650_board.legacy,-1))",
    bk, name, userKey, seats, legacy, d.govt ? 1 : 0, str(d.mode, 12), str(d.difficulty, 8), str(d.cabinetSize, 10),
    JSON.stringify(d.cabinet || []), JSON.stringify(d.breakdown || []), Date.now(), str(d.runId, 32), partyName, str(d.partyAlign, 14),
    str(d.scenarioKey, 40), str(d.electoralSystem, 40), Number(d.totalSeats) > 0 ? Number(d.totalSeats) : 650, fp, runCode);
  await upsertRun(env, name, d, "submit", partyName);
  return { ok: true, top: await topBoard(env, bk), overallPct: await overallPct(env) };
}

/* ---------------- register / login / session ---------------- */
async function ensureOwner(env, nameKey, display, account) {
  const rec = await dFirst(env, "SELECT * FROM b650_owners WHERE nameKey=?", nameKey);
  if (rec) {
    if (account && rec.userKey && String(rec.userKey) === account.userKey) { await dRun(env, "UPDATE b650_owners SET lastISO=? WHERE nameKey=?", nowISO(), nameKey); return { ok: true }; }
    return { ok: false };
  }
  const token = newToken(), salt = newSalt();
  await dRun(env, "INSERT INTO b650_owners (nameKey,display,tokenHash,salt,userKey,createdISO,lastISO) VALUES (?,?,?,?,?,?,?)",
    nameKey, nm(display), await hsh(env, token, salt), salt, account ? account.userKey : "", nowISO(), nowISO());
  return { ok: true, token };
}
async function register(env, d) {
  const u = nm(d.username), pw = String(d.password || ""), key = keyOf(u);
  if (u === "Anonymous" || key.length < 3) return { ok: false, error: "bad username" };
  if (!isClean(u)) return { ok: false, error: cleanMsg("username") };
  if (pw.length < 6) return { ok: false, error: "password too short" };
  if (await dFirst(env, "SELECT userKey FROM b650_accounts WHERE userKey=?", key)) return { ok: false, error: "name taken" };
  const count = await dFirst(env, "SELECT COUNT(*) n FROM b650_accounts");
  const level = (count && count.n) ? 1 : 9;
  const salt = newSalt(), token = newToken(), exp = Date.now() + SESSION_DAYS * 864e5;
  await dRun(env, "INSERT INTO b650_accounts (userKey,display,level,banned,pwHash,pwSalt,sessHash,sessExp,createdISO,lastISO,prefs) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    key, u, level, 0, await hsh(env, pw, salt), salt, await hsh(env, token, salt), exp, nowISO(), nowISO(), "{}");
  const oSalt = newSalt(), oTok = newToken();
  await dRun(env, "INSERT INTO b650_owners (nameKey,display,tokenHash,salt,userKey,createdISO,lastISO) VALUES (?,?,?,?,?,?,?)",
    key, u, await hsh(env, oTok, oSalt), oSalt, key, nowISO(), nowISO());
  return { ok: true, token, profile: { name: u, level }, prefs: {}, ownerToken: oTok };
}
async function login(env, d) {
  const key = keyOf(d.username), pw = String(d.password || "");
  const a = await dFirst(env, "SELECT * FROM b650_accounts WHERE userKey=?", key);
  if (!a) return { ok: false, error: "no such user" };
  if (a.banned) return { ok: false, error: "banned" };
  if ((await hsh(env, pw, a.pwSalt)) !== String(a.pwHash)) return { ok: false, error: "wrong password" };
  const token = newToken(), exp = Date.now() + SESSION_DAYS * 864e5;
  await dRun(env, "UPDATE b650_accounts SET sessHash=?, sessExp=?, lastISO=? WHERE userKey=?", await hsh(env, token, a.pwSalt), exp, nowISO(), key);
  return { ok: true, token, profile: profile(a), prefs: parse(a.prefs) || {} };
}

/* ---------------- roster ---------------- */
function polFromRow(r) {
  return {
    name: String(r.name), party: String(r.party), era: String(r.era), scope: String(r.scope || "uk"),
    stats: { appeal: Number(r.appeal) || 50, experience: Number(r.experience) || 50, oratory: Number(r.oratory) || 50, statecraft: Number(r.statecraft) || 50, partyMgmt: Number(r.partyMgmt) || 50 },
    fits: String(r.fits || "").split(",").map(s => s.trim()).filter(Boolean),
    note: String(r.note || ""), despot: !!r.despot, mode: String(r.mode || ""),
    cast: String(r.cast || ""), flag: String(r.flag || ""), wiki: String(r.wiki || ""), img: String(r.img || "")
  };
}
async function roster(env) {
  /* GAMEPLAY overlay: only the deltas (admin edits / adds / tombstones, base=0)
     — the built-in figures ship bundled, so this stays small and fast even
     though the full roster also lives in D1. */
  const rows = await dAll(env, "SELECT * FROM b650_pols WHERE base=0 ORDER BY id");
  return rows.map(r => { const p = polFromRow(r); p.deleted = !!r.deleted; return p; });
}
/* EDITOR view: the whole roster in D1 (base + deltas), optionally filtered by a
   search term, paginated — for housekeeping. */
async function rosterAll(env, q, limit, offset) {
  limit = Math.max(1, Math.min(500, Number(limit) || 200));
  offset = Math.max(0, Number(offset) || 0);
  const like = "%" + String(q || "").toLowerCase().replace(/[%_]/g, "") + "%";
  const where = q ? "WHERE nameKey LIKE ? OR LOWER(party) LIKE ?" : "";
  const totalRow = q
    ? await dFirst(env, "SELECT COUNT(*) n FROM b650_pols " + where, like, like)
    : await dFirst(env, "SELECT COUNT(*) n FROM b650_pols");
  const rows = q
    ? await dAll(env, "SELECT * FROM b650_pols " + where + " ORDER BY name LIMIT ? OFFSET ?", like, like, limit, offset)
    : await dAll(env, "SELECT * FROM b650_pols ORDER BY name LIMIT ? OFFSET ?", limit, offset);
  return { total: Number(totalRow && totalRow.n) || 0, limit, offset,
           politicians: rows.map(r => { const p = polFromRow(r); p.deleted = !!r.deleted; p.base = !!r.base; return p; }) };
}
async function publicConfig(env) {
  const rows = await dAll(env, "SELECT key, value FROM b650_config");
  const cfg = { banner: { text: "", active: false }, streams: [], rosterVersion: "0", ranked: RANKED_DEFAULT };
  rows.forEach(r => {
    if (r.key === "banner") cfg.banner = parse(r.value) || cfg.banner;
    else if (r.key === "streams") cfg.streams = parse(r.value) || [];
    else if (r.key === "rosterVersion") cfg.rosterVersion = String(r.value || "0").replace(/^"+|"+$/g, "");
    else if (r.key === "ranked") cfg.ranked = Object.assign({}, RANKED_DEFAULT, parse(r.value) || {});
  });
  return cfg;
}
async function setConfig(env, key, valueObj) {
  await dRun(env, "INSERT INTO b650_config (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", key, JSON.stringify(valueObj));
}
async function bumpRoster(env) {
  const cur = Number((await publicConfig(env)).rosterVersion) || 0;
  await setConfig(env, "rosterVersion", String(Math.max(Date.now(), cur + 1)));
}
function polColsFrom(p) {
  const s = p.stats || {};
  const mode = String(p.mode || "");
  const scope = String(p.scope || (mode === "parl2024" ? "p24" : "uk"));
  return {
    nameKey: String(p.name || "").toLowerCase(), scope, name: str(p.name, 60), party: str(p.party, 40), era: str(p.era, 12),
    appeal: clampInt(s.appeal, 0, 100), experience: clampInt(s.experience, 0, 100), oratory: clampInt(s.oratory, 0, 100),
    statecraft: clampInt(s.statecraft, 0, 100), partyMgmt: clampInt(s.partyMgmt, 0, 100),
    fits: str((p.fits || []).join(","), 80), note: str(p.note, 200), despot: p.despot ? 1 : 0, mode: str(mode, 12),
    cast: str(p.cast, 12), flag: str(p.flag, 20), wiki: str(p.wiki, 120), img: str(p.img, 400)
  };
}

/* ---------------- main handler ---------------- */
async function backend(env, d) {
  switch (String(d.kind || "")) {
    case "submit": return await doScore(env, d, "submit");
    case "log": return await doScore(env, d, "log");
    case "board": return { ok: true, top: await topBoard(env, boardKeyFrom(d.mode, d.difficulty, d.cabinetSize, d.scenarioKey, d.electoralSystem)) };
    case "board_key": return { ok: true, top: await topBoard(env, str(d.key, 60)) };
    case "ranked": return { ok: true, top: await topBoard(env, RANKED_BOARD), ranked: await getRanked(env) };
    case "overall": return { ok: true, top: await overall(env) };
    case "overall_pct": return { ok: true, top: await overallPct(env) };
    case "register": return await register(env, d);
    case "login": return await login(env, d);
    case "session": { const a = await auth(env, d); return a ? { ok: true, profile: profile(a), prefs: parse(a.prefs) || {} } : { ok: false }; }
    case "logout": { const a = await auth(env, d); if (a) await dRun(env, "UPDATE b650_accounts SET sessHash='' WHERE userKey=?", keyOf(a.userKey)); return { ok: true }; }
    case "save": { const a = await auth(env, d); if (!a) return { ok: false, error: "login" }; await dRun(env, "UPDATE b650_accounts SET prefs=? WHERE userKey=?", JSON.stringify(d.prefs || {}), keyOf(a.userKey)); return { ok: true }; }
    case "config": return { ok: true, config: await publicConfig(env) };
    case "roster": return { ok: true, politicians: await roster(env) };
    case "roster_all": { const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 5) return { ok: false, error: "forbidden" }; return Object.assign({ ok: true }, await rosterAll(env, d.q, d.limit, d.offset)); }
    case "chat_fetch": {
      const rows = await dAll(env, "SELECT * FROM b650_chat WHERE deleted=0 ORDER BY ts_iso DESC LIMIT ?", CHAT_FETCH);
      return { ok: true, messages: rows.reverse().map(r => ({ id: String(r.id), display: nm(r.display), level: Number(r.level) || 1, text: String(r.text), ts: Date.parse(r.ts_iso) || 0 })) };
    }
    case "chat_post": {
      const a = await auth(env, d); if (!a) return { ok: false, error: "login" };
      const text = String(d.text || "").replace(/\s+$/, "").slice(0, 280); if (!text) return { ok: false, error: "empty" };
      if (!isClean(text)) return { ok: false, error: cleanMsg("message") };
      const last = await dFirst(env, "SELECT ts_iso FROM b650_chat WHERE userKey=? ORDER BY ts_iso DESC LIMIT 1", keyOf(a.userKey));
      if (last && Date.now() - (Date.parse(last.ts_iso) || 0) < CHAT_MIN_GAP_MS) return { ok: false, error: "slow down" };
      await dRun(env, "INSERT INTO b650_chat (id,ts_iso,userKey,display,level,text,deleted) VALUES (?,?,?,?,?,?,0)", crypto.randomUUID(), nowISO(), keyOf(a.userKey), nm(a.display), Number(a.level) || 1, text);
      return { ok: true };
    }
    case "chat_delete": { const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 5) return { ok: false, error: "forbidden" }; await dRun(env, "UPDATE b650_chat SET deleted=1 WHERE id=?", String(d.id)); return { ok: true }; }
    case "admin_users": { const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 5) return { ok: false, error: "forbidden" }; const rows = await dAll(env, "SELECT display, level, banned FROM b650_accounts"); return { ok: true, users: rows.map(r => ({ name: nm(r.display), level: Number(r.level) || 1, banned: !!r.banned })) }; }
    case "admin_setlevel": { const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 9) return { ok: false, error: "forbidden" }; await dRun(env, "UPDATE b650_accounts SET level=? WHERE userKey=?", clampInt(d.level, 1, 9), keyOf(d.target)); return { ok: true }; }
    case "admin_ban":
    case "admin_unban": { const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 9) return { ok: false, error: "forbidden" }; await dRun(env, "UPDATE b650_accounts SET banned=? WHERE userKey=?", d.kind === "admin_ban" ? 1 : 0, keyOf(d.target)); return { ok: true }; }
    case "admin_banner": { const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 9) return { ok: false, error: "forbidden" }; await setConfig(env, "banner", { text: String(d.text || "").slice(0, 240), active: !!d.active }); return { ok: true, config: await publicConfig(env) }; }
    case "admin_streams": { const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 9) return { ok: false, error: "forbidden" }; const list = (d.streams || []).slice(0, 12).map(s => ({ label: String(s.label || "Live").slice(0, 40), url: String(s.url || "").slice(0, 400) })).filter(s => s.url); await setConfig(env, "streams", list); return { ok: true, config: await publicConfig(env) }; }
    case "admin_ranked": {
      const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 9) return { ok: false, error: "forbidden" };
      const r = d.ranked || {};
      const spec = {
        country: str(r.country, 12) || "uk", mode: str(r.mode, 12) || "wildcard",
        difficulty: str(r.difficulty, 8) || "brutal", cabinetSize: str(r.cabinetSize, 10) || "expanded",
        system: str(r.system, 40), scenario: str(r.scenario, 40),
        redos: clampInt(r.redos, 0, 3), govern: r.govern ? 1 : 0, policy: r.policy ? 1 : 0, campaign: r.campaign ? 1 : 0
      };
      await setConfig(env, "ranked", spec);
      return { ok: true, config: await publicConfig(env) };
    }
    case "admin_addpol": {
      const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 5) return { ok: false, error: "forbidden" };
      const p = d.pol || {}; if (!p.name) return { ok: false, error: "name required" };
      const c = polColsFrom(p);
      await dRun(env, "INSERT INTO b650_pols (nameKey,scope,name,party,era,appeal,experience,oratory,statecraft,partyMgmt,fits,note,despot,mode,cast,flag,wiki,img,deleted,base) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0) " +
        "ON CONFLICT(nameKey,scope) DO UPDATE SET name=excluded.name,party=excluded.party,era=excluded.era,appeal=excluded.appeal,experience=excluded.experience,oratory=excluded.oratory,statecraft=excluded.statecraft,partyMgmt=excluded.partyMgmt,fits=excluded.fits,note=excluded.note,despot=excluded.despot,mode=excluded.mode,cast=excluded.cast,flag=excluded.flag,wiki=excluded.wiki,img=excluded.img,deleted=0,base=0",
        c.nameKey, c.scope, c.name, c.party, c.era, c.appeal, c.experience, c.oratory, c.statecraft, c.partyMgmt, c.fits, c.note, c.despot, c.mode, c.cast, c.flag, c.wiki, c.img);
      await bumpRoster(env);
      return { ok: true, saved: true };
    }
    case "admin_delpol": {
      const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 5) return { ok: false, error: "forbidden" };
      const nameKey = String(d.name || "").trim().toLowerCase(); if (!nameKey) return { ok: false, error: "name required" };
      const scope = String(d.scope || "uk");
      /* tombstone: works for BASE figures too (creates a deleted=1 row that the
         client applies to hide the built-in figure). Re-adding clears it. */
      await dRun(env, "INSERT INTO b650_pols (nameKey,scope,name,deleted,base) VALUES (?,?,?,1,0) ON CONFLICT(nameKey,scope) DO UPDATE SET deleted=1,base=0", nameKey, scope, str(d.name || nameKey, 60));
      await bumpRoster(env);
      return { ok: true, deleted: true };
    }
    case "admin_restorepol": {
      const a = await auth(env, d); if (!a || (Number(a.level) || 1) < 5) return { ok: false, error: "forbidden" };
      const nameKey = String(d.name || "").trim().toLowerCase(); if (!nameKey) return { ok: false, error: "name required" };
      /* un-delete in place (the row persists so it still lists in the editor) */
      await dRun(env, "UPDATE b650_pols SET deleted=0 WHERE nameKey=? AND scope=?", nameKey, String(d.scope || "uk"));
      await bumpRoster(env);
      return { ok: true, restored: true };
    }
    case "player_runs": {
      const a = await auth(env, d); if (!a) return { ok: false, error: "login" };
      const rows = await dAll(env, "SELECT * FROM b650_runs WHERE nameKey=? ORDER BY id DESC LIMIT 25", keyOf(a.userKey));
      return { ok: true, runs: rows.map(r => { const totalSeats = Number(r.totalSeats) > 0 ? Number(r.totalSeats) : 650; const seats = clampInt(r.seats, 0, MAX_SEATS); return { ts: r.ts_iso, seats, legacy: (r.legacy == null) ? null : clampInt(r.legacy, 0, 100), govt: !!r.govt, mode: str(r.mode, 12), difficulty: str(r.difficulty, 8), cabinetSize: str(r.cabinetSize, 10), kind: str(r.kind, 12), partyName: str(r.party, 28), scenarioKey: str(r.scenarioKey, 40), electoralSystem: str(r.electoralSystem, 40), totalSeats, pct: totalSeats > 0 ? Math.round(seats / totalSeats * 1000) / 10 : 0 }; }) };
    }
    default: return { ok: false, error: "unknown kind" };
  }
}

/* ---------------- sim650 stats (forecast layer) ---------------- */
const sInt = (v, lo, hi) => clampInt(v, lo, hi);
async function stats(env, url, origin) {
  const path = url.pathname.replace(/\/+$/, "");
  if (path === "/sim650/health") return json({ ok: true, service: "sim650", ts: Date.now() }, origin);
  if (path === "/sim650/run") return null; // handled in POST branch
  if (path === "/sim650/stats") {
    const scenario = str(url.searchParams.get("scenario"), 40) || "freshstart";
    const difficulty = str(url.searchParams.get("difficulty"), 10) || "normal";
    const seats = url.searchParams.get("seats");
    const agg = await dFirst(env, "SELECT COUNT(*) n, AVG(seats) avg_seats, MIN(seats) min_seats, MAX(seats) max_seats, AVG(per_seat) avg_ps, AVG(p_majority) avg_pmaj FROM sim650_runs WHERE scenario=? AND difficulty=?", scenario, difficulty);
    let percentile = null;
    if (seats != null && agg && agg.n > 0) { const r = await dFirst(env, "SELECT COUNT(*) le FROM sim650_runs WHERE scenario=? AND difficulty=? AND seats<=?", scenario, difficulty, sInt(seats, 0, 5000)); percentile = r ? r.le / agg.n : null; }
    return json({ ok: true, scenario, difficulty, n: (agg && agg.n) || 0, avgSeats: agg && agg.avg_seats != null ? Math.round(agg.avg_seats) : null, minSeats: agg ? agg.min_seats : null, maxSeats: agg ? agg.max_seats : null, avgPerSeat: agg && agg.avg_ps != null ? Math.round(agg.avg_ps) : null, avgPMajority: agg && agg.avg_pmaj != null ? agg.avg_pmaj : null, percentile }, origin);
  }
  return json({ ok: false, error: "not-found" }, origin, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const path = url.pathname.replace(/\/+$/, "");
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (!env.DB) return json({ ok: false, error: "no-db-binding" }, origin, 500);
    try {
      await ensureSchema(env);
      /* sim650 forecast-stats endpoints */
      if (path.indexOf("/sim650/") === 0) {
        if (path === "/sim650/run" && request.method === "POST") {
          const b = await request.json().catch(() => ({})); const total = sInt(b.total, 1, 5000);
          await dRun(env, "INSERT INTO sim650_runs (ts,scenario,country,mode,difficulty,cab_sig,per_seat,seats,total,p_majority,p5,p50,p95,model) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            Date.now(), str(b.scenario, 40) || "freshstart", str(b.country, 4), str(b.mode, 12), str(b.difficulty, 10), str(b.cabSig, 200),
            Number(b.perSeat) || 0, sInt(b.seats, 0, total), total, Number(b.pMajority) || 0, sInt(b.p5, 0, total), sInt(b.p50, 0, total), sInt(b.p95, 0, total), str(b.model, 12));
          return json({ ok: true }, origin);
        }
        return await stats(env, url, origin);
      }
      /* backend: GET root = doGet snapshot; POST root = { kind } protocol */
      if (request.method === "GET") {
        return json({ ok: true, ranked: await getRanked(env), top: await topBoard(env, null), overall: await overall(env), overallPct: await overallPct(env), config: await publicConfig(env) }, origin);
      }
      if (request.method === "POST") {
        const bodyText = await request.text();
        let d = {}; try { d = JSON.parse(bodyText || "{}"); } catch (e) {}
        if (d.game !== "650") return json({ ok: false, error: "bad game" }, origin);
        return json(await backend(env, d), origin);
      }
      return json({ ok: false, error: "method" }, origin, 405);
    } catch (e) {
      return json({ ok: false, error: String(e && e.message || e).slice(0, 300) }, origin, 500);
    }
  }
};
