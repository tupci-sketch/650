/* =============================================================================
   CAMPAIGN TRAIL  (Phase 5 of the Grand Expansion)
   Pre-election campaign phase between policy selection and the election.
   Spend campaign days on regions or voter blocs, pick a theme, resolve the
   TV debate.  All outputs are deterministic scalars folded into G.hold()'s
   seed before G.runElection() builds its RNG — no Math.random() inside the
   seeded path.  The debate is the only random element and resolves here.
   ========================================================================== */
window.G = window.G || {};

G.CAMPAIGN_THEMES = [
  { key:"change",   label:"Change & Reform",          axis:"tax",     dir:-1,
    desc:"A fresh start — energises Urban Progressives and Students, risks Reform bloc." },
  { key:"security", label:"Safety & Security",         axis:"imm",     dir:+1,
    desc:"Law, order, borders — wins Red Wall and Pensioners, loses Urban Progressives." },
  { key:"nhs",      label:"Save the NHS",              axis:"nhs",     dir:-1,
    desc:"Funding surge promise — broad appeal across Red Wall and Pensioners." },
  { key:"economy",  label:"Sound Money",               axis:"tax",     dir:+1,
    desc:"Fiscal credibility — wins Business and Shires, risks Red Wall." },
  { key:"climate",  label:"Climate & Future",          axis:"climate", dir:-1,
    desc:"Green pledge — galvanises Students and Urban Progressives, alienates Reform." },
  { key:"global",   label:"Britain on the World Stage",axis:"world",   dir:-1,
    desc:"Pro-international — wins Urban Progressives, risks Reform-curious." }
];

/* ---- initialise a fresh campaign state on G.state ------------------------ */
G.campaignInit = function () {
  var days = 12;
  var diff = G.state && G.state.difficulty;
  if (diff === "easy") days = 14;
  if (diff === "hard") days = 10;
  G.state.campaign = {
    totalDays: days,
    daysLeft: days,
    allocation: {},   /* "region_NE": 3, "bloc_redwall": 2, … */
    theme: null,      /* chosen CAMPAIGN_THEMES key */
    debateWon: null,  /* null until G.resolveDebate() called */
    done: false
  };
  return G.state.campaign;
};

/* ---- compute deterministic outputs --------------------------------------- */
/* Call BEFORE G.hold() so the scalars feed the seed.
   Returns { blocDeltas, regionTilt, voteDelta, sig }.                        */
G.campaignOutputs = function (campaign) {
  if (!campaign) return { blocDeltas:{}, regionTilt:{}, voteDelta:0, sig:"none" };

  var theme = (G.CAMPAIGN_THEMES || []).filter(function (t) { return t.key === campaign.theme; })[0];
  var alloc = campaign.allocation || {};

  /* theme → bloc shifts */
  var blocDeltas = {};
  if (theme && G.ELECTORATE_BLOCS && G.electorateIssueNudge) {
    G.ELECTORATE_BLOCS.forEach(function (b) {
      var sens = b.issues[theme.axis] || 0;
      if (Math.abs(sens) < 0.05) return;
      blocDeltas[b.key] = (blocDeltas[b.key] || 0) + theme.dir * sens * 3;
    });
  }

  /* day allocation → regional logit tilt */
  var regionTilt = {};
  var REGION_K = 0.003;
  (G.REGIONS || []).forEach(function (r) {
    var d = alloc["region_" + r.id] || 0;
    if (d) regionTilt[r.id] = (regionTilt[r.id] || 0) + d * REGION_K;
  });

  /* day allocation → bloc support shifts */
  var BLOC_K = 1.2;
  (G.ELECTORATE_BLOCS || []).forEach(function (b) {
    var d = alloc["bloc_" + b.key] || 0;
    if (d) blocDeltas[b.key] = (blocDeltas[b.key] || 0) + d * BLOC_K;
  });

  /* debate result */
  var voteDelta = 0;
  if (campaign.debateWon === true) {
    voteDelta += 0.012;
    blocDeltas.urbanprog = (blocDeltas.urbanprog || 0) + 3;
    blocDeltas.students  = (blocDeltas.students  || 0) + 2;
  } else if (campaign.debateWon === false) {
    voteDelta -= 0.008;
    blocDeltas.reform    = (blocDeltas.reform    || 0) + 2;
  }

  /* compact sig for seed inclusion */
  var rKeys = (G.REGIONS || []).map(function (r) { return alloc["region_" + r.id] || 0; }).join("");
  var bKeys = (G.ELECTORATE_BLOCS || []).map(function (b) { return Math.round(alloc["bloc_" + b.key] || 0); }).join("");
  var sig = (campaign.theme || "none") + "|" +
            (campaign.debateWon === true ? "W" : campaign.debateWon === false ? "L" : "N") + "|" +
            rKeys + "|" + bKeys;

  return { blocDeltas: blocDeltas, regionTilt: regionTilt, voteDelta: voteDelta, sig: sig };
};

/* ---- resolve the TV debate (uses Math.random — campaign phase only) ------ */
G.resolveDebate = function () {
  var stat = (G.ministerStat ? G.ministerStat("pm", "oratory") : 50);
  var p = Math.max(0.10, Math.min(0.90, 0.30 + (stat - 50) / 100 * 0.90));
  var won = Math.random() < p;
  if (G.state && G.state.campaign) G.state.campaign.debateWon = won;
  return won;
};

/* ---- allocate a day ------------------------------------------------------ */
G.campaignAllocate = function (slot, days) {
  var c = G.state && G.state.campaign;
  if (!c || c.done) return false;
  days = Math.max(0, Math.min(days | 0, c.daysLeft + (c.allocation[slot] || 0)));
  var old = c.allocation[slot] || 0;
  c.daysLeft += old - days;
  c.allocation[slot] = days;
  return true;
};

/* ---- finalise campaign — must be called before G.hold() ------------------ */
G.campaignFinalise = function () {
  var c = G.state && G.state.campaign;
  if (!c) return null;
  if (c.debateWon === null) G.resolveDebate();
  var out = G.campaignOutputs(c);
  G.state.campaignOutputs = out;
  c.done = true;
  return out;
};
