/* ============================================================================
   650 — GOVERN: a term in office
   A turn-based loop played AFTER you win. Steer three meters — Approval, the
   Economy and Party Unity — through a parliament of crises. The ministers you
   drafted decide whether your gambles pay off (a strong Chancellor makes a
   fiscal gamble land; a weak one tanks it). Survive to polling day for a
   legacy score — or be brought down by a rebellion or a lost confidence vote.

   Pure logic, no DOM. Reads G.state.cabinet (politician objects keyed by
   portfolio) and the election result handed to G.startTerm().
   ========================================================================== */
window.G = window.G || {};

G.GOVCONFIG = {
  sessions: 9,                 // length of a full parliament
  startApprovalMin: 28, startApprovalMax: 66,
  byElectionChance: 0.40,      // per session (from session 2)
  rebellionUnity: 32,          // unity below this risks a rebellion
  drift: 1,                    // incumbency erosion of approval per session
  diff: {                      // multipliers by difficulty
    easy:   { bad: 0.78, confidence: -0.12, byEloss: 0.7 },
    normal: { bad: 1.00, confidence:  0.00, byEloss: 1.0 },
    hard:   { bad: 1.28, confidence:  0.12, byEloss: 1.3 }
  }
};

/* ---- the crisis library -------------------------------------------------- */
/* each choice: label, text, base {a,e,u}, optional gamble {stat, dept,
   success {a,e,u}, fail {a,e,u}}.  a=approval e=economy u=unity              */
G.EVENTS = [
  { id:"budget", dept:"chancellor", title:"The Budget", icon:"£",
    text:"Your first Budget lands next week. The markets, the backbenches and the public all want different things.",
    choices:[
      { label:"A bold tax-cutting Budget", text:"You gamble on growth.",
        base:{a:3,e:0,u:2}, gamble:{stat:"statecraft", dept:"chancellor",
          success:{a:4,e:10,u:1}, fail:{a:-4,e:-12,u:-3}} },
      { label:"Tax rises to fund services", text:"Unpopular, but it steadies the books.",
        base:{a:-5,e:6,u:-2} },
      { label:"Borrow and spend", text:"Sugar now, a bill later.",
        base:{a:6,e:-5,u:1} }
    ]},
  { id:"nhswinter", dept:"health", title:"NHS Winter Crisis", icon:"✚",
    text:"A brutal flu season has hospitals on the brink. The front pages are grim.",
    choices:[
      { label:"Emergency funding package", text:"Throw money at it fast.",
        base:{a:5,e:-4,u:0} },
      { label:"A reform-driven response", text:"Your Health Secretary stakes their reputation on a plan.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"health",
          success:{a:8,e:1,u:2}, fail:{a:-7,e:-1,u:-2}} },
      { label:"Tough it out", text:"Insist the system is coping.",
        base:{a:-6,e:1,u:-1} }
    ]},
  { id:"strikes", dept:"business", title:"A Wave of Strikes", icon:"✊",
    text:"Public-sector unions walk out. Schools shut and trains stop.",
    choices:[
      { label:"Negotiate a settlement", text:"Buy industrial peace.",
        base:{a:4,e:-5,u:-1} },
      { label:"Hold the line", text:"Refuse to budge and face them down.",
        base:{a:-2,e:2,u:3}, gamble:{stat:"partyMgmt", dept:"whip",
          success:{a:3,e:3,u:4}, fail:{a:-6,e:-3,u:-5}} },
      { label:"Legislate against strikes", text:"A confrontational, lasting measure.",
        base:{a:-4,e:3,u:2} }
    ]},
  { id:"foreigncrisis", dept:"foreign", title:"An Overseas Crisis", icon:"✈",
    text:"A flashpoint erupts abroad and allies are watching how you respond.",
    choices:[
      { label:"Lead a diplomatic push", text:"Your Foreign Secretary works the phones.",
        base:{a:1,e:0,u:0}, gamble:{stat:"statecraft", dept:"foreign",
          success:{a:7,e:2,u:2}, fail:{a:-5,e:-2,u:-2}} },
      { label:"Commit firm support", text:"Stand shoulder to shoulder, at a cost.",
        base:{a:3,e:-4,u:1} },
      { label:"Stay out of it", text:"Keep your distance and your options.",
        base:{a:-3,e:1,u:0} }
    ]},
  { id:"scandal", dept:"whip", title:"Trouble on the Benches", icon:"!",
    text:"Allegations swirl around a member of your government. The lobby smells blood.",
    choices:[
      { label:"Draw a line — accept a resignation", text:"Cut it loose to save the week.",
        base:{a:2,e:0,u:-3}, resign:true },
      { label:"Tough it out behind your colleague", text:"Loyalty has a price.",
        base:{a:-5,e:0,u:3} },
      { label:"Order an independent inquiry", text:"Kick it into the long grass.",
        base:{a:-1,e:0,u:0}, gamble:{stat:"oratory", dept:"pm",
          success:{a:3,e:0,u:1}, fail:{a:-4,e:0,u:-2}} }
    ]},
  { id:"immigration", dept:"home", title:"Borders & Asylum", icon:"⚓",
    text:"Crossings dominate the news and your own party is split on the answer.",
    choices:[
      { label:"A tough new enforcement plan", text:"Hard-edged and headline-grabbing.",
        base:{a:4,e:-2,u:-3} },
      { label:"A managed, legalistic approach", text:"Your Home Secretary navigates the courts.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"home",
          success:{a:5,e:1,u:3}, fail:{a:-5,e:-1,u:-3}} },
      { label:"Lead a humane reform", text:"Principle over polls.",
        base:{a:-4,e:0,u:4} }
    ]},
  { id:"costofliving", dept:"chancellor", title:"Cost of Living", icon:"£",
    text:"Prices bite. Households are hurting and they want to know whose side you're on.",
    choices:[
      { label:"Direct cash support", text:"Help now, borrow for it.",
        base:{a:7,e:-6,u:0} },
      { label:"Targeted help for the poorest", text:"Careful and defensible.",
        base:{a:2,e:-2,u:1} },
      { label:"Hold firm on discipline", text:"Promise it will pass.",
        base:{a:-6,e:4,u:-1} }
    ]},
  { id:"reshuffle", dept:"pm", title:"A Reshuffle Beckons", icon:"♻",
    text:"The commentariat says your top team looks tired. You could refresh it.",
    choices:[
      { label:"A bold reshuffle", text:"Promote new blood, make enemies.",
        base:{a:2,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"pm",
          success:{a:4,e:1,u:5}, fail:{a:-3,e:-1,u:-6}} },
      { label:"A steady hand", text:"Reward loyalty, change little.",
        base:{a:0,e:0,u:3} },
      { label:"No change at all", text:"Project calm; risk looking stale.",
        base:{a:-2,e:0,u:-1} }
    ]},
  { id:"housing", dept:"business", title:"The Housing Question", icon:"⌂",
    text:"A generation can't afford a home. Everyone agrees something must be done; no one agrees what.",
    choices:[
      { label:"Build, build, build", text:"Override objections to get spades in the ground.",
        base:{a:3,e:5,u:-4} },
      { label:"Protect the green belt", text:"Side with the shire associations.",
        base:{a:-1,e:-3,u:4} },
      { label:"A grand delivery programme", text:"Stake real money and credibility on it.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"business",
          success:{a:6,e:6,u:1}, fail:{a:-5,e:-4,u:-2}} }
    ]},
  { id:"defence", dept:"defence", title:"Defence Review", icon:"⚔",
    text:"Generals warn the armed forces are stretched thin. A spending decision looms.",
    choices:[
      { label:"Raise defence spending", text:"Reassure allies; squeeze elsewhere.",
        base:{a:2,e:-5,u:1} },
      { label:"A smart procurement reset", text:"Your Defence Secretary promises more for less.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"defence",
          success:{a:4,e:5,u:2}, fail:{a:-3,e:-5,u:-2}} },
      { label:"Hold spending flat", text:"Bank the savings, accept the grumbling.",
        base:{a:-2,e:3,u:-1} }
    ]},
  { id:"education", dept:"education", title:"Schools Under Strain", icon:"✎",
    text:"Crumbling buildings and a recruitment crisis put education in the spotlight.",
    choices:[
      { label:"A major investment plan", text:"Money for buildings and pay.",
        base:{a:5,e:-5,u:1} },
      { label:"A bold reform agenda", text:"Your Education Secretary bets on structural change.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"education",
          success:{a:6,e:2,u:2}, fail:{a:-5,e:-1,u:-2}} },
      { label:"Trust the system", text:"Resist new spending.",
        base:{a:-4,e:2,u:0} }
    ]},
  { id:"localelections", dept:"pm", title:"Local Elections", icon:"▣",
    text:"The country votes in the locals — a real-world verdict on your government so far.",
    choices:[
      { label:"Campaign hard yourself", text:"Put your own standing on the line.",
        base:{a:0,e:0,u:0}, gamble:{stat:"appeal", dept:"pm",
          success:{a:6,e:0,u:4}, fail:{a:-6,e:0,u:-4}} },
      { label:"Keep your distance", text:"Let local candidates carry it.",
        base:{a:-1,e:0,u:0} }
    ]},
  { id:"techfailure", dept:"business", title:"A Big IT Failure", icon:"⚙",
    text:"A flagship government computer system falls over. Services grind to a halt.",
    choices:[
      { label:"Own it and fix it fast", text:"Front up, take the hit, move on.",
        base:{a:1,e:-2,u:0}, gamble:{stat:"experience", dept:"business",
          success:{a:4,e:0,u:1}, fail:{a:-4,e:-2,u:-1}} },
      { label:"Blame the contractors", text:"Deflect to the suppliers.",
        base:{a:-2,e:0,u:1} }
    ]},
  { id:"emergency", dept:"home", title:"A National Emergency", icon:"◆",
    text:"Severe floods hit. The response in the first 48 hours will define the story.",
    choices:[
      { label:"Lead the response in person", text:"Boots on, cameras rolling.",
        base:{a:0,e:0,u:0}, gamble:{stat:"appeal", dept:"pm",
          success:{a:8,e:-2,u:2}, fail:{a:-6,e:-2,u:-2}} },
      { label:"Let the machine handle it", text:"Trust the agencies; stay in No.10.",
        base:{a:-3,e:0,u:0} },
      { label:"A generous recovery fund", text:"Open the cheque book.",
        base:{a:5,e:-5,u:0} }
    ]},
  { id:"eu", dept:"foreign", title:"A Trade Showdown", icon:"⚖",
    text:"A major trading partner threatens tariffs. Exporters are nervous.",
    choices:[
      { label:"Negotiate hard for a deal", text:"Your Foreign Secretary goes to the wire.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"foreign",
          success:{a:4,e:8,u:1}, fail:{a:-3,e:-6,u:-2}} },
      { label:"Retaliate in kind", text:"Stand firm and risk escalation.",
        base:{a:3,e:-5,u:2} },
      { label:"Concede to keep trade flowing", text:"Swallow pride for stability.",
        base:{a:-3,e:4,u:-1} }
    ]},
  { id:"crime", dept:"home", title:"Crime in the Headlines", icon:"⚠",
    text:"A spike in crime has the public rattled and the opposition pouncing.",
    choices:[
      { label:"More police, tougher sentences", text:"Visible, popular, costly.",
        base:{a:5,e:-3,u:0} },
      { label:"A prevention-first strategy", text:"Long-term, harder to sell.",
        base:{a:-2,e:1,u:2} },
      { label:"A flagship policing reform", text:"Your Home Secretary's plan, all in.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"home",
          success:{a:6,e:1,u:1}, fail:{a:-5,e:-1,u:-2}} }
    ]},
  { id:"backbench", dept:"whip", title:"A Backbench Revolt", icon:"⚑",
    text:"A bill you care about faces a sizeable rebellion on your own side.",
    choices:[
      { label:"Whip it through hard", text:"Bend arms; spend authority.",
        base:{a:1,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"whip",
          success:{a:3,e:2,u:3}, fail:{a:-3,e:-1,u:-7}} },
      { label:"Offer concessions", text:"Water it down to pass it.",
        base:{a:-2,e:-1,u:4} },
      { label:"Pull the bill", text:"Retreat to fight another day.",
        base:{a:-4,e:0,u:1} }
    ]},
  { id:"economyboom", dept:"chancellor", title:"Unexpected Growth", icon:"↑",
    text:"The economy surprises on the upside. You have a little headroom — and a choice.",
    choices:[
      { label:"Cut taxes with the windfall", text:"Hand it back; bank the goodwill.",
        base:{a:6,e:-2,u:1} },
      { label:"Invest it for the long term", text:"Your Chancellor argues for the future.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"chancellor",
          success:{a:3,e:9,u:2}, fail:{a:-1,e:-2,u:-1}} },
      { label:"Pay down debt", text:"Prudent, and quietly unloved.",
        base:{a:-2,e:5,u:0} }
    ]},
  { id:"speech", dept:"pm", title:"Conference Speech", icon:"♞",
    text:"You face your party faithful with the cameras rolling. A big speech can reset everything.",
    choices:[
      { label:"Swing for the fences", text:"A soaring, risky address.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"pm",
          success:{a:7,e:0,u:6}, fail:{a:-5,e:0,u:-4}} },
      { label:"A safe, solid speech", text:"No disasters, no fireworks.",
        base:{a:1,e:0,u:2} }
    ]},
  { id:"devolution", dept:"deputy", title:"The Union Strains", icon:"⚜",
    text:"Tensions flare with the devolved nations over money and powers.",
    choices:[
      { label:"Devolve more powers", text:"Generous, and risky for the centre.",
        base:{a:2,e:-2,u:-2} },
      { label:"Hold the line from Westminster", text:"Assert the centre's authority.",
        base:{a:-1,e:1,u:2} },
      { label:"Broker a settlement", text:"Your Deputy PM leads the talks.",
        base:{a:0,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"deputy",
          success:{a:4,e:1,u:4}, fail:{a:-3,e:-1,u:-3}} }
    ]},
  { id:"media", dept:"leader", title:"A Hostile Press", icon:"❝",
    text:"A relentless media campaign is denting the government's standing.",
    choices:[
      { label:"Take the fight to them", text:"Your Leader of the House goes on the offensive.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"leader",
          success:{a:5,e:0,u:3}, fail:{a:-5,e:0,u:-2}} },
      { label:"Rise above it", text:"Refuse to engage; let it burn out.",
        base:{a:-2,e:0,u:1} },
      { label:"A grand policy announcement", text:"Change the subject with substance.",
        base:{a:3,e:-3,u:0} }
    ]},
  { id:"manifesto", dept:"chancellor", title:"A Flagship Pledge Comes Due", icon:"★",
    text:"A signature promise from your campaign is now or never. Delivering it is hard and expensive.",
    choices:[
      { label:"Deliver it, whatever the cost", text:"Keep faith with the voters.",
        base:{a:6,e:-6,u:2} },
      { label:"Quietly water it down", text:"Trim it to something affordable.",
        base:{a:-4,e:3,u:0} },
      { label:"Make it the fight of the term", text:"Bet the house on landing it well.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"chancellor",
          success:{a:7,e:3,u:3}, fail:{a:-6,e:-4,u:-3}} }
    ]}
];

/* ---- helpers ------------------------------------------------------------- */
G._clampM = function (v) { return Math.max(0, Math.min(100, Math.round(v))); };
G.ministerStat = function (portfolioKey, stat) {
  var t = G.term;
  if (t && t.caretaker && t.caretaker[portfolioKey]) return 38;       // caretaker = weak
  var pol = (G.state && G.state.cabinet) ? G.state.cabinet[portfolioKey] : null;
  if (!pol || !pol.stats || typeof pol.stats[stat] !== "number") return 50;
  return pol.stats[stat];
};
G.ministerName = function (portfolioKey) {
  var pol = (G.state && G.state.cabinet) ? G.state.cabinet[portfolioKey] : null;
  return pol ? pol.name : "the minister";
};
G._diff = function () { var d = (G.state && G.state.difficulty) || "normal"; return G.GOVCONFIG.diff[d] || G.GOVCONFIG.diff.normal; };

/* ---- start a term -------------------------------------------------------- */
/* opts (optional): { coalition: deal, minority: bool } */
G.startTerm = function (res, opts) {
  opts = opts || {};
  var cfg = G.GOVCONFIG, C = G.CONFIG;
  var mode = (G.state && G.state.mode) || "unity";
  var seats = res.seats;
  if (opts.coalition) seats = opts.coalition.combined;

  var approval = G._clampM(38 + (res.voteShare - 0.33) * 120 + (res.tier.govt ? 4 : 0));
  approval = Math.max(cfg.startApprovalMin, Math.min(cfg.startApprovalMax, approval));
  var economy = G._clampM(46 + (G.ministerStat("chancellor", "statecraft") - 50) * 0.30);
  var maj = seats - C.majority;
  var unity = G._clampM(42 + maj / 22 + (mode === "dynasty" ? 6 : -2)
                          + (G.ministerStat("whip", "partyMgmt") - 50) * 0.25
                          + (G.ministerStat("leader", "partyMgmt") - 50) * 0.10);
  /* coalitions and minorities are harder to hold together — and the further
     apart the partners' politics (the deal's alignment tag), the harder. */
  if (opts.coalition) {
    var co = opts.coalition;
    var pen = { natural: 8, workable: 12, strained: 16, unlikely: 20 };
    var tag = co.tag || (co.natural ? "natural" : "unlikely");
    unity = G._clampM(unity - (pen[tag] != null ? pen[tag] : 16));
  }
  if (opts.minority)  unity = G._clampM(unity - 10);

  G.term = {
    kind: "govt",
    coalition: opts.coalition || null, minority: !!opts.minority,
    meters: { approval: approval, economy: economy, unity: unity },
    seats: seats, startSeats: seats,
    session: 1, length: cfg.sessions,
    mode: mode, difficulty: (G.state && G.state.difficulty) || "normal",
    caretaker: {}, drawn: [], current: null,
    over: false, outcome: null, fellSession: null,
    history: [], byElectionSeats: []
  };
  G.term.current = G.govDraw();
  return G.term;
};

/* pick the next crisis (avoid repeating recent ones) */
G.govDraw = function () {
  var t = G.term, src = (t.kind === "opp") ? G.OPP_EVENTS : G.EVENTS;
  var pool = src.filter(function (e) { return t.drawn.indexOf(e.id) === -1; });
  if (!pool.length) { t.drawn = []; pool = src.slice(); }
  var e = pool[Math.floor(Math.random() * pool.length)];
  t.drawn.push(e.id);
  return e;
};

/* apply an effects bundle {a,e,u} (bad parts scaled by difficulty) */
G._apply = function (eff, scaleBad) {
  if (!eff) return;
  var m = G.term.meters, k = { a: "approval", e: "economy", u: "unity" };
  ["a", "e", "u"].forEach(function (key) {
    var v = eff[key] || 0;
    if (v < 0 && scaleBad) v *= G._diff().bad;
    m[k[key]] = G._clampM(m[k[key]] + v);
  });
};

/* resolve the current event with the chosen option index.
   returns { log:[{text,cls}], over, outcome } and mutates G.term */
G.govChoose = function (idx) {
  var t = G.term; if (!t || t.over) return { log: [], over: true, outcome: t ? t.outcome : null };
  var ev = t.current, choice = ev.choices[idx];
  var log = [];
  log.push({ text: ev.title + " — " + choice.label, cls: "head" });

  /* base effects */
  G._apply(choice.base, true);

  /* gamble resolved by the relevant minister */
  if (choice.gamble) {
    var g = choice.gamble;
    var stat = G.ministerStat(g.dept, g.stat);
    var p = 0.30 + (stat - 50) / 100 * 0.95 - G._diff().confidence * 0.5;
    p = Math.max(0.05, Math.min(0.95, p));
    var win = Math.random() < p;
    G._apply(win ? g.success : g.fail, true);
    log.push({
      text: (win ? "✓ " : "✗ ") + G.ministerName(g.dept) + (win ? " pulls it off." : " can't make it land."),
      cls: win ? "good" : "bad"
    });
  }

  /* a resignation consequence (generic — about the office, not the person) */
  if (choice.resign) { G._caretake(log); }

  /* incumbency erosion */
  t.meters.approval = G._clampM(t.meters.approval - G.GOVCONFIG.drift);

  /* by-election */
  if (t.session >= 2 && Math.random() < G.GOVCONFIG.byElectionChance) G._byElection(log);

  /* spontaneous rebellion if discipline collapses */
  if (t.meters.unity < G.GOVCONFIG.rebellionUnity) G._rebellion(log);

  /* record + advance */
  t.history.push({ session: t.session, title: ev.title, choice: choice.label,
                   meters: { approval: t.meters.approval, economy: t.meters.economy, unity: t.meters.unity }, seats: t.seats });

  /* confidence / collapse check */
  if (G._confidenceAtRisk()) {
    var survived = G._confidenceVote(log);
    if (!survived) { t.over = true; t.outcome = "collapsed"; t.fellSession = t.session;
      return { log: log, over: true, outcome: "collapsed" }; }
  }

  t.session++;
  if (t.session > t.length) {
    t.over = true; t.outcome = "completed";
    log.push({ text: "You reach polling day with your government intact.", cls: "good" });
    return { log: log, over: true, outcome: "completed" };
  }

  t.current = G.govDraw();
  return { log: log, over: false, outcome: null };
};

G._caretake = function (log) {
  var t = G.term;
  var keys = G.PORTFOLIOS.map(function (p) { return p.key; })
              .filter(function (k) { return k !== "pm" && !t.caretaker[k]; });
  if (!keys.length) return;
  var k = keys[Math.floor(Math.random() * keys.length)];
  t.caretaker[k] = true;
  var port = G.PORTFOLIOS.filter(function (p) { return p.key === k; })[0];
  log.push({ text: "A resignation leaves " + (port ? port.name : "a department") + " in caretaker hands.", cls: "bad" });
};

G._byElection = function (log) {
  var t = G.term, geo = G.buildGeo ? G.buildGeo() : null;
  var name = "a marginal seat";
  if (geo && geo.constituencies.length) name = geo.constituencies[Math.floor(Math.random() * geo.constituencies.length)].name;
  var ap = t.meters.approval;
  var lossBias = (50 - ap) / 60;                      // unpopular ⇒ likelier to lose
  var roll = Math.random();
  if (roll < 0.5 + lossBias) {                        // a loss
    var lost = Math.random() < 0.35 ? 2 : 1;
    lost = Math.max(1, Math.round(lost * G._diff().byEloss));
    t.seats = Math.max(0, t.seats - lost);
    t.meters.unity = G._clampM(t.meters.unity - 2);
    log.push({ text: "By-election in " + name + ": a loss. " + lost + " seat" + (lost > 1 ? "s" : "") + " gone (" + t.seats + " held).", cls: "bad" });
  } else if (roll > 0.9) {                            // a rare gain
    t.seats += 1;
    log.push({ text: "By-election in " + name + ": a gain against the odds (" + t.seats + " held).", cls: "good" });
  } else {
    log.push({ text: "By-election in " + name + ": held.", cls: "" });
  }
};

G._rebellion = function (log) {
  var t = G.term;
  var grip = (G.ministerStat("whip", "partyMgmt") + G.ministerStat("leader", "partyMgmt")) / 2;
  var p = 0.35 + (grip - 50) / 100 * 0.8 + (t.seats - G.CONFIG.majority) / 400;
  p = Math.max(0.1, Math.min(0.9, p));
  if (Math.random() < p) {
    t.meters.unity = G._clampM(t.meters.unity + 6);
    log.push({ text: "Rebellion brewing — the whips face it down.", cls: "good" });
  } else {
    G._apply({ a: -4, u: -8 }, true);
    log.push({ text: "Open revolt on the benches; your authority takes a hit.", cls: "bad" });
    if (Math.random() < 0.4) G._caretake(log);
  }
};

G._confidenceAtRisk = function () {
  var m = G.term.meters;
  if (m.approval < 26 && m.unity < 40) return true;
  if (G.term.seats < G.CONFIG.majority && m.unity < 36) return true;
  if (m.unity < 18) return true;
  return false;
};

G._confidenceVote = function (log) {
  var t = G.term, m = t.meters;
  log.push({ text: "A motion of no confidence is tabled.", cls: "head" });
  var grip = (G.ministerStat("leader", "partyMgmt") + G.ministerStat("whip", "partyMgmt") + G.ministerStat("pm", "appeal")) / 3;
  var p = 0.40 + (m.unity - 40) / 100 + (t.seats - G.CONFIG.majority) / 220
            + (grip - 50) / 160 - G._diff().confidence;
  p = Math.max(0.05, Math.min(0.95, p));
  if (Math.random() < p) {
    m.unity = G._clampM(m.unity + 8); m.approval = G._clampM(m.approval + 2);
    log.push({ text: "You survive the vote — bruised, but standing.", cls: "good" });
    return true;
  }
  log.push({ text: "You lose the vote. The government falls.", cls: "bad" });
  return false;
};

/* apply a governing programme to the term's opening meters. Matching the
   manifesto rewards unity (promises kept); diverging costs unity + approval. */
G.applyProgramme = function (programme) {
  var t = G.term; if (!t || !programme) return;
  var man = (G.state && G.state.policy) || {};
  var kept = 0, diverged = 0;
  G.POLICY_AXES.forEach(function (ax) {
    var sel = programme[ax.key]; if (!sel) return;
    var opt = G.policyOption(ax.key, sel);
    if (opt && opt.gov) G._apply({ a: opt.gov.a || 0, e: opt.gov.e || 0, u: opt.gov.u || 0 }, false);
    if (man[ax.key]) { if (man[ax.key] === sel) kept++; else diverged++; }
  });
  t.meters.unity = G._clampM(t.meters.unity + kept * 2 - diverged * 3);
  if (diverged) t.meters.approval = G._clampM(t.meters.approval - diverged);
  t.programme = programme; t.policyKept = kept; t.policyDiverged = diverged;
};

/* ---- final verdict ------------------------------------------------------- */
G.govVerdict = function () {
  var t = G.term;
  if (t.kind === "opp") return G.oppVerdict();
  var m = t.meters;
  var seatScore = Math.max(0, Math.min(20, t.seats / G.CONFIG.totalSeats * 20));
  var raw = m.approval * 0.34 + m.economy * 0.24 + m.unity * 0.20 + seatScore
            + (t.outcome === "completed" ? 8 : 0);
  var legacy = Math.round(Math.max(0, Math.min(100, raw)));
  if (t.outcome === "collapsed") legacy = Math.round(legacy * 0.6);

  var tier;
  if (t.outcome === "collapsed") tier = { key: "fell", label: "A government that unravelled",
        line: "Brought down in session " + t.fellSession + " of " + t.length + ". The history books will not be kind." };
  else if (legacy >= 82) tier = { key: "great", label: "A defining premiership",
        line: "A towering term. Statues, libraries, the lot." };
  else if (legacy >= 68) tier = { key: "good", label: "A successful government",
        line: "You leave office with your head held high." };
  else if (legacy >= 54) tier = { key: "ok", label: "A serviceable term",
        line: "Remembered, if not revered." };
  else if (legacy >= 40) tier = { key: "rough", label: "A troubled term",
        line: "You clung on, but it was a hard road." };
  else tier = { key: "poor", label: "A government adrift",
        line: "It limped to the line and few will mourn it." };

  return {
    legacy: legacy, tier: tier, outcome: t.outcome,
    meters: { approval: m.approval, economy: m.economy, unity: m.unity },
    seats: t.seats, startSeats: t.startSeats,
    sessionsServed: t.outcome === "completed" ? t.length : (t.fellSession || t.session),
    length: t.length, history: t.history, caretakers: Object.keys(t.caretaker).length
  };
};

/* ============================================================================
   650 — OPPOSITION: a term on the other benches
   Played when you fail to form a government. The three meters are repurposed:
     approval -> Public support   economy -> Momentum (pressure on the govt)
     unity    -> Party unity
   Win by driving Momentum to breaking point (you force an early election and
   sweep in); survive to the next election as a strong opposition; or lose the
   leadership if your own party turns on you. Your drafted cabinet doubles as
   the Shadow Cabinet, so the same ministers' stats decide your gambles.
   ========================================================================== */
G.OPPCONFIG = { sessions: 8, forceMomentum: 85, challengeUnity: 26, momentumDrift: 1 };

G.OPP_EVENTS = [
  { id:"pmqs", dept:"pm", title:"Prime Minister's Questions", icon:"❝",
    text:"The despatch box, every Wednesday. A clean hit can dominate the news for days.",
    choices:[
      { label:"Go for the jugular", text:"A scripted, high-risk ambush.",
        base:{a:1,e:1,u:1}, gamble:{stat:"oratory", dept:"pm",
          success:{a:4,e:7,u:3}, fail:{a:-3,e:-2,u:-3}} },
      { label:"Forensic and factual", text:"Six quiet questions, no theatrics.",
        base:{a:2,e:3,u:0} },
      { label:"Rise above the bear pit", text:"Look statesmanlike; cede the drama.",
        base:{a:1,e:-2,u:1} }
    ]},
  { id:"oppbudget", dept:"chancellor", title:"Responding to the Budget", icon:"£",
    text:"The Chancellor sits down. You have minutes to tear the Budget apart at the despatch box.",
    choices:[
      { label:"Demolish the numbers", text:"Your Shadow Chancellor goes line by line.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"chancellor",
          success:{a:5,e:8,u:2}, fail:{a:-3,e:-3,u:-2}} },
      { label:"Make it about fairness", text:"Frame it as a Budget for the few.",
        base:{a:4,e:3,u:1} },
      { label:"Promise a costed alternative", text:"Look like a government-in-waiting.",
        base:{a:2,e:2,u:-1} }
    ]},
  { id:"oppscandal", dept:"home", title:"A Government Scandal Breaks", icon:"!",
    text:"A minister is in serious trouble. The lobby wants the opposition's response.",
    choices:[
      { label:"Demand the resignation", text:"Lead the chase; keep the pressure on.",
        base:{a:3,e:6,u:1} },
      { label:"Call for a full inquiry", text:"Sober and procedural — and lasting.",
        base:{a:1,e:3,u:0} },
      { label:"Overreach for the kill", text:"Throw everything at it and risk looking opportunistic.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"leader",
          success:{a:3,e:9,u:1}, fail:{a:-5,e:-3,u:-2}} }
    ]},
  { id:"oppbyelection", dept:"whip", title:"A By-election Opportunity", icon:"▣",
    text:"A seat falls vacant in territory you could take. A win would shake the government.",
    choices:[
      { label:"Pour in every activist", text:"Throw the kitchen sink at it.",
        base:{a:0,e:0,u:0}, gamble:{stat:"appeal", dept:"pm",
          success:{a:4,e:7,u:4}, fail:{a:-2,e:-3,u:-3}} },
      { label:"Run a disciplined local race", text:"Steady, professional, low-risk.",
        base:{a:2,e:3,u:1} },
      { label:"Manage expectations", text:"Downplay it to avoid a damaging loss.",
        base:{a:0,e:-1,u:1} }
    ]},
  { id:"oppunity", dept:"deputy", title:"Your Own Party Grumbles", icon:"⚑",
    text:"A faction wants a sharper line; another wants caution. The papers smell division.",
    choices:[
      { label:"Bang heads together", text:"Your deputy enforces discipline.",
        base:{a:0,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"deputy",
          success:{a:1,e:2,u:6}, fail:{a:-2,e:-2,u:-5}} },
      { label:"Give the activists red meat", text:"Please the base, spook the centre.",
        base:{a:-2,e:2,u:4} },
      { label:"Appeal for unity", text:"Plead for discipline; hope it holds.",
        base:{a:1,e:0,u:2} }
    ]},
  { id:"oppvision", dept:"leader", title:"A Defining Speech", icon:"♞",
    text:"Conference season. A big vision speech could announce you as the next government.",
    choices:[
      { label:"Set out a bold programme", text:"A soaring, risky prospectus.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"pm",
          success:{a:7,e:4,u:5}, fail:{a:-5,e:-2,u:-4}} },
      { label:"A safe, unifying speech", text:"No risks, modest reward.",
        base:{a:2,e:1,u:2} },
      { label:"A relentless attack on the record", text:"All offence, little vision.",
        base:{a:1,e:4,u:-1} }
    ]},
  { id:"oppvote", dept:"whip", title:"An Opposition Day Vote", icon:"⚖",
    text:"You control the agenda for a day. Pick the battlefield and try to split the government benches.",
    choices:[
      { label:"Table a wedge motion", text:"Design it to divide their party.",
        base:{a:1,e:3,u:1}, gamble:{stat:"partyMgmt", dept:"whip",
          success:{a:2,e:7,u:2}, fail:{a:-2,e:-2,u:-2}} },
      { label:"A popular, populist motion", text:"Win the room and the clip.",
        base:{a:4,e:3,u:0} },
      { label:"A serious policy motion", text:"Worthy, less dramatic.",
        base:{a:1,e:1,u:1} }
    ]},
  { id:"oppmedia", dept:"leader", title:"The Sunday Interviews", icon:"✦",
    text:"The big political programmes want you. A strong round can set the week's narrative.",
    choices:[
      { label:"Make news with a pledge", text:"Announce something eye-catching.",
        base:{a:4,e:2,u:-1} },
      { label:"Stay relentlessly on message", text:"Disciplined repetition of the attack.",
        base:{a:1,e:4,u:1} },
      { label:"Wing a tricky interview", text:"Trust your front-runner to perform.",
        base:{a:0,e:0,u:0}, gamble:{stat:"appeal", dept:"pm",
          success:{a:5,e:3,u:1}, fail:{a:-5,e:-2,u:-2}} }
    ]},
  { id:"oppdefection", dept:"whip", title:"A Government MP Wavers", icon:"⇄",
    text:"A disillusioned backbencher on the other side hints they might cross the floor.",
    choices:[
      { label:"Court them hard", text:"Roll out the charm; a defection is gold.",
        base:{a:0,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"whip",
          success:{a:3,e:9,u:2}, fail:{a:-1,e:-1,u:-3}} },
      { label:"Welcome them quietly", text:"Avoid spooking them with a circus.",
        base:{a:1,e:4,u:0} },
      { label:"Keep your distance", text:"Defectors bring baggage.",
        base:{a:0,e:-1,u:2} }
    ]},
  { id:"oppcrisis", dept:"foreign", title:"A National Crisis", icon:"◆",
    text:"Events take over. The country looks to the government — and judges the opposition's response too.",
    choices:[
      { label:"Offer responsible support", text:"Put country before party; look like a PM.",
        base:{a:5,e:-1,u:1} },
      { label:"Attack the handling", text:"Hammer every misstep.",
        base:{a:-1,e:5,u:0} },
      { label:"Lead with a credible plan", text:"Your shadow team sets out what it would do.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"foreign",
          success:{a:5,e:5,u:2}, fail:{a:-4,e:-2,u:-2}} }
    ]}
];

G.startOpposition = function (res) {
  var cfg = G.OPPCONFIG, gc = G.GOVCONFIG;
  var mode = (G.state && G.state.mode) || "unity";
  var support = G._clampM(30 + (res.voteShare - 0.30) * 120);
  support = Math.max(22, Math.min(60, support));
  var momentum = G._clampM(28 + (50 - support) * 0.15);   // a little anti-incumbency to start
  var unity = G._clampM(46 + (res.seats - 180) / 14 + (mode === "dynasty" ? 6 : -2)
                          + (G.ministerStat("whip", "partyMgmt") - 50) * 0.20
                          + (G.ministerStat("leader", "partyMgmt") - 50) * 0.10);

  G.term = {
    kind: "opp",
    meters: { approval: support, economy: momentum, unity: unity },
    seats: res.seats, startSeats: res.seats,
    session: 1, length: cfg.sessions,
    mode: mode, difficulty: (G.state && G.state.difficulty) || "normal",
    caretaker: {}, drawn: [], current: null,
    over: false, outcome: null, fellSession: null,
    history: [], byElectionSeats: []
  };
  G.term.current = G.govDraw();
  return G.term;
};

G.oppChoose = function (idx) {
  var t = G.term; if (!t || t.over) return { log: [], over: true, outcome: t ? t.outcome : null };
  var ev = t.current, choice = ev.choices[idx], log = [];
  log.push({ text: ev.title + " — " + choice.label, cls: "head" });

  G._apply(choice.base, true);

  if (choice.gamble) {
    var g = choice.gamble, stat = G.ministerStat(g.dept, g.stat);
    var p = 0.30 + (stat - 50) / 100 * 0.95 - G._diff().confidence * 0.5;
    p = Math.max(0.05, Math.min(0.95, p));
    var win = Math.random() < p;
    G._apply(win ? g.success : g.fail, true);
    log.push({ text: (win ? "✓ " : "✗ ") + G.ministerName(g.dept) + (win ? " lands the blow." : " fluffs it."),
               cls: win ? "good" : "bad" });
  }

  /* momentum drifts back to the government between flashpoints */
  t.meters.economy = G._clampM(t.meters.economy - G.OPPCONFIG.momentumDrift);

  /* an opposition by-election: a win adds seats + momentum; a loss stings */
  if (t.session >= 2 && Math.random() < 0.42) G._oppByElection(log);

  t.history.push({ session: t.session, title: ev.title, choice: choice.label,
    meters: { approval: t.meters.approval, economy: t.meters.economy, unity: t.meters.unity }, seats: t.seats });

  /* force an early election if the pressure becomes unbearable */
  if (t.meters.economy >= G.OPPCONFIG.forceMomentum && t.meters.approval >= 45) {
    t.over = true; t.outcome = "forced"; t.fellSession = t.session;
    log.push({ text: "The government's position collapses — it is forced to the country, and you are ready.", cls: "good" });
    return { log: log, over: true, outcome: "forced" };
  }

  /* lose your own leadership if the party turns */
  if (t.meters.unity < G.OPPCONFIG.challengeUnity) {
    var survived = G._leadershipChallenge(log);
    if (!survived) { t.over = true; t.outcome = "ousted"; t.fellSession = t.session;
      return { log: log, over: true, outcome: "ousted" }; }
  }

  t.session++;
  if (t.session > t.length) {
    t.over = true; t.outcome = "survived";
    log.push({ text: "You reach the next general election as a credible opposition.", cls: "good" });
    return { log: log, over: true, outcome: "survived" };
  }
  t.current = G.govDraw();
  return { log: log, over: false, outcome: null };
};

G._oppByElection = function (log) {
  var t = G.term, geo = G.buildGeo ? G.buildGeo() : null;
  var name = "a marginal seat";
  if (geo && geo.constituencies.length) name = geo.constituencies[Math.floor(Math.random() * geo.constituencies.length)].name;
  var sup = t.meters.approval;
  var winBias = (sup - 50) / 60;                       // popular ⇒ likelier to gain
  var roll = Math.random();
  if (roll < 0.45 + winBias) {
    var gained = Math.random() < 0.3 ? 2 : 1;
    t.seats += gained;
    t.meters.economy = G._clampM(t.meters.economy + 4);
    log.push({ text: "By-election in " + name + ": a gain! " + gained + " seat" + (gained > 1 ? "s" : "") + " taken from the government (" + t.seats + " now).", cls: "good" });
  } else if (roll > 0.92) {
    t.seats = Math.max(0, t.seats - 1);
    t.meters.approval = G._clampM(t.meters.approval - 2);
    log.push({ text: "By-election in " + name + ": a disappointing loss (" + t.seats + " held).", cls: "bad" });
  } else {
    log.push({ text: "By-election in " + name + ": no change.", cls: "" });
  }
};

G._leadershipChallenge = function (log) {
  var t = G.term, m = t.meters;
  log.push({ text: "A challenge to your leadership is mounted.", cls: "head" });
  var grip = (G.ministerStat("leader", "partyMgmt") + G.ministerStat("whip", "partyMgmt") + G.ministerStat("pm", "appeal")) / 3;
  var p = 0.42 + (m.unity - 30) / 100 + (m.approval - 40) / 200 + (grip - 50) / 160 - G._diff().confidence;
  p = Math.max(0.05, Math.min(0.95, p));
  if (Math.random() < p) {
    m.unity = G._clampM(m.unity + 10);
    log.push({ text: "You see off the challenge and emerge stronger.", cls: "good" });
    return true;
  }
  log.push({ text: "You lose the confidence of your party and the leadership with it.", cls: "bad" });
  return false;
};

G.oppVerdict = function () {
  var t = G.term, m = t.meters;
  var seatScore = Math.max(0, Math.min(16, t.seats / G.CONFIG.totalSeats * 16));
  var raw = m.approval * 0.40 + m.economy * 0.30 + m.unity * 0.18 + seatScore;
  if (t.outcome === "forced")   raw += 14;
  if (t.outcome === "survived") raw += 4;
  var legacy = Math.round(Math.max(0, Math.min(100, raw)));
  if (t.outcome === "ousted") legacy = Math.round(legacy * 0.55);

  var tier;
  if (t.outcome === "ousted") tier = { key: "ousted", label: "Deposed by your own side",
        line: "Toppled in session " + t.fellSession + " of " + t.length + ". The opposition moves on without you." };
  else if (t.outcome === "forced" && legacy >= 70) tier = { key: "swept", label: "Swept into power",
        line: "You broke the government and won the country. The keys to No.10 are yours." };
  else if (t.outcome === "forced") tier = { key: "forced", label: "Brought the government down",
        line: "You forced the election — now the hard part begins." };
  else if (legacy >= 72) tier = { key: "great", label: "A government-in-waiting",
        line: "Disciplined, popular, ready. The next election is yours to lose." };
  else if (legacy >= 56) tier = { key: "good", label: "An effective opposition",
        line: "You landed real blows and look like a credible alternative." };
  else if (legacy >= 42) tier = { key: "ok", label: "A workmanlike opposition",
        line: "You held the line without ever quite breaking through." };
  else tier = { key: "poor", label: "An ineffective opposition",
        line: "The years drifted by and the government barely noticed you." };

  return {
    kind: "opp",
    legacy: legacy, tier: tier, outcome: t.outcome,
    meters: { approval: m.approval, economy: m.economy, unity: m.unity },
    seats: t.seats, startSeats: t.startSeats,
    sessionsServed: t.outcome === "survived" ? t.length : (t.fellSession || t.session),
    length: t.length, history: t.history, caretakers: 0
  };
};
