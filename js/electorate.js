/* =============================================================================
   ELECTORATE — voter-bloc layer  (Phases 0–3 of the Grand Expansion)
   Defines 8 voter blocs, initialises support from player alignment/policy,
   computes a national vote nudge + per-region logit tilt, and applies shifts
   from governing events.  All outputs are deterministic scalars resolved
   before G.runElection() builds its RNG — the seeded sim stays byte-identical.
   ========================================================================== */
window.G = window.G || {};

/* 8 blocs; sizes sum to 1.0.
   align: political centre on the same −2…+2 scale as playerAlignValue.
   regions: regional concentration multipliers (absent region = 1.0).
   issues: sensitivity on the four policy axes + two flavour axes.            */
G.ELECTORATE_BLOCS = [
  { key:"redwall",    name:"Red Wall",              size:0.13, align: 0.3,
    regions:{NE:2.2,NW:1.6,YH:1.6,WM:1.1,EM:1.0},
    issues:{tax:0.6,nhs:0.9,imm:1.2,world:0.4,climate:-0.3,crime:0.7} },
  { key:"pensioners", name:"Pensioners",            size:0.18, align: 0.6,
    regions:{SW:1.4,EE:1.3,SE:1.2,WAL:1.1},
    issues:{tax:0.5,nhs:1.1,imm:0.7,world:0.2,climate:-0.2,crime:0.8} },
  { key:"urbanprog",  name:"Urban Progressives",    size:0.14, align:-1.3,
    regions:{LDN:2.4,NW:1.1},
    issues:{tax:-0.4,nhs:0.8,imm:-0.9,world:-0.6,climate:1.1,crime:-0.2} },
  { key:"shires",     name:"Home Counties & Shires",size:0.16, align: 1.2,
    regions:{SE:1.8,EE:1.5,SW:1.3},
    issues:{tax:1.1,nhs:0.2,imm:0.6,world:0.5,climate:-0.1,crime:0.6} },
  { key:"students",   name:"Students & Graduates",  size:0.12, align:-1.1,
    regions:{LDN:1.6,SCO:1.2,NW:1.2,YH:1.1},
    issues:{tax:-0.5,nhs:0.6,imm:-0.8,world:-0.7,climate:1.2,crime:-0.3} },
  { key:"business",   name:"Business & City",       size:0.11, align: 0.7,
    regions:{LDN:1.9,SE:1.3,EE:1.1},
    issues:{tax:1.0,nhs:-0.1,imm:-0.3,world:0.6,climate:0.2,crime:0.3} },
  { key:"nationalist",name:"Nationalist / NI",      size:0.07, align:-0.8,
    regions:{SCO:2.6,WAL:1.4,NI:3.0},
    issues:{tax:-0.2,nhs:0.5,imm:-0.3,world:-0.4,climate:0.4,crime:0} },
  { key:"reform",     name:"Reform-curious",        size:0.09, align: 1.8,
    regions:{EM:1.6,EE:1.5,NE:1.4,WM:1.3,YH:1.2},
    issues:{tax:0.7,nhs:0.3,imm:1.8,world:0.9,climate:-1.0,crime:1.0} }
];

/* ---- seed bloc support from player alignment + manifesto ------------------ */
/* Formula: 50 + clamp(−18..18, (2 − |playerAlign − bloc.align|) × 9)
   then nudged ±1.5 per manifesto stance weighted by issue sensitivity.       */
G.electorateInit = function (playerAlign, policy) {
  var support = {};
  G.ELECTORATE_BLOCS.forEach(function (b) {
    var base = 50 + Math.max(-18, Math.min(18, (2 - Math.abs((playerAlign || 0) - b.align)) * 9));
    if (policy && G.POLICY_AXES) {
      G.POLICY_AXES.forEach(function (ax) {
        var opt = G.policyOption ? G.policyOption(ax.key, policy[ax.key]) : null;
        if (!opt) return;
        var sens = b.issues[ax.key] || 0;
        var optIdx = ax.options.indexOf(opt);
        /* index 0 = right/hard stance, index 2 = left/open stance */
        var dir = optIdx === 0 ? 1 : (optIdx === 2 ? -1 : 0);
        base += dir * sens * 1.5;
      });
    }
    support[b.key] = Math.max(0, Math.min(100, Math.round(base)));
  });
  return support;
};

/* ---- national vote nudge (≈ ±0.06) --------------------------------------- */
/* Size-weighted mean of (support − 50) / 18 × 0.06.
   A fully-neutral electorate produces exactly 0.                              */
G.electorateVoteMod = function (blocSupport) {
  if (!blocSupport) return 0;
  var scale = 0.06;
  var sum = 0, total = 0;
  G.ELECTORATE_BLOCS.forEach(function (b) {
    var s = blocSupport[b.key] != null ? blocSupport[b.key] : 50;
    sum += b.size * (s - 50);
    total += b.size;
  });
  if (!(total > 0)) return 0;
  return Math.max(-scale, Math.min(scale, (sum / total) * (scale / 18)));
};

/* ---- per-region logit tilt (≈ ±0.01–0.03 per region) -------------------- */
/* Blocs concentrate regionally, so the same support map produces a regional
   signature.  Returns { regionId: logitDelta } — pure function, no rnd().   */
G.electorateRegionTilt = function (blocSupport) {
  if (!blocSupport) return {};
  var scale = 0.012;
  var tilt = {};
  (G.REGIONS || []).forEach(function (r) {
    var tot = 0, wt = 0;
    G.ELECTORATE_BLOCS.forEach(function (b) {
      var mul = (b.regions && b.regions[r.id] != null) ? b.regions[r.id] : 1.0;
      var s = blocSupport[b.key] != null ? blocSupport[b.key] : 50;
      tot += b.size * mul * (s - 50);
      wt  += b.size * mul;
    });
    tilt[r.id] = wt > 0
      ? Math.max(-scale * 3, Math.min(scale * 3, (tot / wt) * (scale / 18)))
      : 0;
  });
  return tilt;
};

/* ---- apply a delta map, clamp 0–100 -------------------------------------- */
G.electorateShift = function (blocSupport, deltas) {
  if (!blocSupport || !deltas) return blocSupport || {};
  Object.keys(deltas).forEach(function (k) {
    var cur = blocSupport[k] != null ? blocSupport[k] : 50;
    blocSupport[k] = Math.max(0, Math.min(100, cur + (deltas[k] || 0)));
  });
  return blocSupport;
};

/* ---- implicit nudge from an issue-axis policy direction ------------------- */
/* dir: +1 = right/authoritarian/tight, −1 = left/progressive/open.
   k ≈ 0.025: small per-event, accumulates across a term.                     */
G.electorateIssueNudge = function (axisKey, dir, blocSupport, k) {
  if (!blocSupport || !axisKey || !dir) return blocSupport;
  k = k != null ? k : 0.025;
  var deltas = {};
  G.ELECTORATE_BLOCS.forEach(function (b) {
    var sens = b.issues[axisKey] || 0;
    if (Math.abs(sens) < 0.1) return;
    deltas[b.key] = dir * sens * k * 100;
  });
  return G.electorateShift(blocSupport, deltas);
};
