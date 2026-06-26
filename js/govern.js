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
  sessions: 14,                // length of a full parliament
  startApprovalMin: 28, startApprovalMax: 66,
  byElectionChance: 0.30,      // per session (from session 2) — lower with longer terms
  rebellionUnity: 32,          // unity below this risks a rebellion
  drift: 1,                    // incumbency erosion of approval per session
  earlyElectionMinSession: 5,  // earliest session you can call an early election
  earlyElectionApproval: 48,   // minimum approval needed to call early election
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
          success:{a:4,e:10,u:1}, fail:{a:-4,e:-12,u:-3}},
        careerEffect:{voteShift:0.012,repShift:3} },
      { label:"Tax rises to fund services", text:"Unpopular, but it steadies the books.",
        base:{a:-5,e:6,u:-2}, careerEffect:{voteShift:-0.008,repShift:2} },
      { label:"Borrow and spend", text:"Sugar now, a bill later.",
        base:{a:6,e:-5,u:1}, careerEffect:{voteShift:0.004,repShift:-1} }
    ]},
  { id:"nhswinter", dept:"health", title:"NHS Winter Crisis", icon:"✚",
    text:"A brutal flu season has hospitals on the brink. The front pages are grim.",
    choices:[
      { label:"Emergency funding package", text:"Throw money at it fast.",
        base:{a:5,e:-4,u:0}, careerEffect:{voteShift:0.008,repShift:4} },
      { label:"A reform-driven response", text:"Your Health Secretary stakes their reputation on a plan.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"health",
          success:{a:8,e:1,u:2}, fail:{a:-7,e:-1,u:-2}},
        careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Tough it out", text:"Insist the system is coping.",
        base:{a:-6,e:1,u:-1}, careerEffect:{voteShift:-0.012,repShift:-5} }
    ]},
  { id:"strikes", dept:"business", title:"A Wave of Strikes", icon:"✊",
    text:"Public-sector unions walk out. Schools shut and trains stop.",
    choices:[
      { label:"Negotiate a settlement", text:"Buy industrial peace.",
        base:{a:4,e:-5,u:-1}, careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Hold the line", text:"Refuse to budge and face them down.",
        base:{a:-2,e:2,u:3}, gamble:{stat:"partyMgmt", dept:"whip",
          success:{a:3,e:3,u:4}, fail:{a:-6,e:-3,u:-5}},
        careerEffect:{voteShift:0.004,repShift:0} },
      { label:"Legislate against strikes", text:"A confrontational, lasting measure.",
        base:{a:-4,e:3,u:2}, careerEffect:{voteShift:-0.008,repShift:-3} }
    ]},
  { id:"foreigncrisis", dept:"foreign", title:"An Overseas Crisis", icon:"✈",
    text:"A flashpoint erupts abroad and allies are watching how you respond.",
    choices:[
      { label:"Lead a diplomatic push", text:"Your Foreign Secretary works the phones.",
        base:{a:1,e:0,u:0}, gamble:{stat:"statecraft", dept:"foreign",
          success:{a:7,e:2,u:2}, fail:{a:-5,e:-2,u:-2}},
        careerEffect:{voteShift:0.008,repShift:3} },
      { label:"Commit firm support", text:"Stand shoulder to shoulder, at a cost.",
        base:{a:3,e:-4,u:1}, careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Stay out of it", text:"Keep your distance and your options.",
        base:{a:-3,e:1,u:0}, careerEffect:{voteShift:-0.006,repShift:-2} }
    ]},
  { id:"scandal", dept:"whip", title:"Trouble on the Benches", icon:"!",
    text:"Allegations swirl around a member of your government. The lobby smells blood.",
    choices:[
      { label:"Draw a line — accept a resignation", text:"Cut it loose to save the week.",
        base:{a:2,e:0,u:-3}, resign:true, careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Tough it out behind your colleague", text:"Loyalty has a price.",
        base:{a:-5,e:0,u:3}, careerEffect:{voteShift:-0.010,repShift:-6} },
      { label:"Order an independent inquiry", text:"Kick it into the long grass.",
        base:{a:-1,e:0,u:0}, gamble:{stat:"oratory", dept:"pm",
          success:{a:3,e:0,u:1}, fail:{a:-4,e:0,u:-2}},
        careerEffect:{voteShift:-0.004,repShift:-1} }
    ]},
  { id:"immigration", dept:"home", title:"Borders & Asylum", icon:"⚓", axis:"imm",
    text:"Crossings dominate the news and your own party is split on the answer.",
    choices:[
      { label:"A tough new enforcement plan", text:"Hard-edged and headline-grabbing.",
        base:{a:4,e:-2,u:-3}, axisDir:+1,
        careerEffect:{voteShift:0.010,repShift:-2,blocShift:{redwall:+4,reform:+6,pensioners:+3,urbanprog:-5,students:-4}} },
      { label:"A managed, legalistic approach", text:"Your Home Secretary navigates the courts.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"home",
          success:{a:5,e:1,u:3}, fail:{a:-5,e:-1,u:-3}},
        careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Lead a humane reform", text:"Principle over polls.",
        base:{a:-4,e:0,u:4}, axisDir:-1,
        careerEffect:{voteShift:-0.008,repShift:3,blocShift:{urbanprog:+5,students:+4,nationalist:+3,redwall:-4,reform:-7,pensioners:-3}} }
    ]},
  { id:"costofliving", dept:"chancellor", title:"Cost of Living", icon:"£", axis:"tax",
    text:"Prices bite. Households are hurting and they want to know whose side you're on.",
    choices:[
      { label:"Direct cash support", text:"Help now, borrow for it.",
        base:{a:7,e:-6,u:0}, axisDir:-1,
        careerEffect:{voteShift:0.012,repShift:4,blocShift:{redwall:+5,pensioners:+4,students:+3,business:-4,shires:-3}} },
      { label:"Targeted help for the poorest", text:"Careful and defensible.",
        base:{a:2,e:-2,u:1}, careerEffect:{voteShift:0.004,repShift:2} },
      { label:"Hold firm on discipline", text:"Promise it will pass.",
        base:{a:-6,e:4,u:-1}, axisDir:+1,
        careerEffect:{voteShift:-0.010,repShift:-4,blocShift:{business:+4,shires:+3,redwall:-5,pensioners:-4,students:-3}} }
    ]},
  { id:"reshuffle", dept:"pm", title:"A Reshuffle Beckons", icon:"♻",
    text:"The commentariat says your top team looks tired. You could refresh it.",
    choices:[
      { label:"A bold reshuffle", text:"Promote new blood, make enemies.",
        base:{a:2,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"pm",
          success:{a:4,e:1,u:5}, fail:{a:-3,e:-1,u:-6}},
        careerEffect:{voteShift:0.006,repShift:2} },
      { label:"A steady hand", text:"Reward loyalty, change little.",
        base:{a:0,e:0,u:3}, careerEffect:{voteShift:0.002,repShift:1} },
      { label:"No change at all", text:"Project calm; risk looking stale.",
        base:{a:-2,e:0,u:-1}, careerEffect:{voteShift:-0.004,repShift:-2} }
    ]},
  { id:"housing", dept:"business", title:"The Housing Question", icon:"⌂",
    text:"A generation can't afford a home. Everyone agrees something must be done; no one agrees what.",
    choices:[
      { label:"Build, build, build", text:"Override objections to get spades in the ground.",
        base:{a:3,e:5,u:-4},
        careerEffect:{voteShift:0.010,repShift:3,blocShift:{students:+5,urbanprog:+4,redwall:+3,shires:-4,pensioners:-2}} },
      { label:"Protect the green belt", text:"Side with the shire associations.",
        base:{a:-1,e:-3,u:4},
        careerEffect:{voteShift:-0.006,repShift:-2,blocShift:{shires:+5,pensioners:+3,students:-4,urbanprog:-3,redwall:-2}} },
      { label:"A grand delivery programme", text:"Stake real money and credibility on it.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"business",
          success:{a:6,e:6,u:1}, fail:{a:-5,e:-4,u:-2}},
        careerEffect:{voteShift:0.008,repShift:3} }
    ]},
  { id:"defence", dept:"defence", title:"Defence Review", icon:"⚔",
    text:"Generals warn the armed forces are stretched thin. A spending decision looms.",
    choices:[
      { label:"Raise defence spending", text:"Reassure allies; squeeze elsewhere.",
        base:{a:2,e:-5,u:1}, careerEffect:{voteShift:0.006,repShift:2} },
      { label:"A smart procurement reset", text:"Your Defence Secretary promises more for less.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"defence",
          success:{a:4,e:5,u:2}, fail:{a:-3,e:-5,u:-2}},
        careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Hold spending flat", text:"Bank the savings, accept the grumbling.",
        base:{a:-2,e:3,u:-1}, careerEffect:{voteShift:-0.004,repShift:-1} }
    ]},
  { id:"education", dept:"education", title:"Schools Under Strain", icon:"✎",
    text:"Crumbling buildings and a recruitment crisis put education in the spotlight.",
    choices:[
      { label:"A major investment plan", text:"Money for buildings and pay.",
        base:{a:5,e:-5,u:1}, careerEffect:{voteShift:0.010,repShift:4} },
      { label:"A bold reform agenda", text:"Your Education Secretary bets on structural change.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"education",
          success:{a:6,e:2,u:2}, fail:{a:-5,e:-1,u:-2}},
        careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Trust the system", text:"Resist new spending.",
        base:{a:-4,e:2,u:0}, careerEffect:{voteShift:-0.008,repShift:-3} }
    ]},
  { id:"localelections", dept:"pm", title:"Local Elections", icon:"▣",
    text:"The country votes in the locals — a real-world verdict on your government so far.",
    choices:[
      { label:"Campaign hard yourself", text:"Put your own standing on the line.",
        base:{a:0,e:0,u:0}, gamble:{stat:"appeal", dept:"pm",
          success:{a:6,e:0,u:4}, fail:{a:-6,e:0,u:-4}},
        careerEffect:{voteShift:0.008,repShift:3} },
      { label:"Keep your distance", text:"Let local candidates carry it.",
        base:{a:-1,e:0,u:0}, careerEffect:{voteShift:-0.002,repShift:0} }
    ]},
  { id:"techfailure", dept:"business", title:"A Big IT Failure", icon:"⚙",
    text:"A flagship government computer system falls over. Services grind to a halt.",
    choices:[
      { label:"Own it and fix it fast", text:"Front up, take the hit, move on.",
        base:{a:1,e:-2,u:0}, gamble:{stat:"experience", dept:"business",
          success:{a:4,e:0,u:1}, fail:{a:-4,e:-2,u:-1}},
        careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Blame the contractors", text:"Deflect to the suppliers.",
        base:{a:-2,e:0,u:1}, careerEffect:{voteShift:-0.008,repShift:-4} }
    ]},
  { id:"emergency", dept:"home", title:"A National Emergency", icon:"◆",
    text:"Severe floods hit. The response in the first 48 hours will define the story.",
    choices:[
      { label:"Lead the response in person", text:"Boots on, cameras rolling.",
        base:{a:0,e:0,u:0}, gamble:{stat:"appeal", dept:"pm",
          success:{a:8,e:-2,u:2}, fail:{a:-6,e:-2,u:-2}},
        careerEffect:{voteShift:0.010,repShift:4} },
      { label:"Let the machine handle it", text:"Trust the agencies; stay in No.10.",
        base:{a:-3,e:0,u:0}, careerEffect:{voteShift:-0.006,repShift:-3} },
      { label:"A generous recovery fund", text:"Open the cheque book.",
        base:{a:5,e:-5,u:0}, careerEffect:{voteShift:0.008,repShift:3} }
    ]},
  { id:"eu", dept:"foreign", title:"A Trade Showdown", icon:"⚖",
    text:"A major trading partner threatens tariffs. Exporters are nervous.",
    choices:[
      { label:"Negotiate hard for a deal", text:"Your Foreign Secretary goes to the wire.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"foreign",
          success:{a:4,e:8,u:1}, fail:{a:-3,e:-6,u:-2}},
        careerEffect:{voteShift:0.008,repShift:3} },
      { label:"Retaliate in kind", text:"Stand firm and risk escalation.",
        base:{a:3,e:-5,u:2}, careerEffect:{voteShift:0.004,repShift:0} },
      { label:"Concede to keep trade flowing", text:"Swallow pride for stability.",
        base:{a:-3,e:4,u:-1}, careerEffect:{voteShift:-0.006,repShift:-2} }
    ]},
  { id:"crime", dept:"home", title:"Crime in the Headlines", icon:"⚠",
    text:"A spike in crime has the public rattled and the opposition pouncing.",
    choices:[
      { label:"More police, tougher sentences", text:"Visible, popular, costly.",
        base:{a:5,e:-3,u:0}, careerEffect:{voteShift:0.008,repShift:2} },
      { label:"A prevention-first strategy", text:"Long-term, harder to sell.",
        base:{a:-2,e:1,u:2}, careerEffect:{voteShift:-0.004,repShift:1} },
      { label:"A flagship policing reform", text:"Your Home Secretary's plan, all in.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"home",
          success:{a:6,e:1,u:1}, fail:{a:-5,e:-1,u:-2}},
        careerEffect:{voteShift:0.006,repShift:2} }
    ]},
  { id:"backbench", dept:"whip", title:"A Backbench Revolt", icon:"⚑",
    text:"A bill you care about faces a sizeable rebellion on your own side.",
    choices:[
      { label:"Whip it through hard", text:"Bend arms; spend authority.",
        base:{a:1,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"whip",
          success:{a:3,e:2,u:3}, fail:{a:-3,e:-1,u:-7}},
        careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Offer concessions", text:"Water it down to pass it.",
        base:{a:-2,e:-1,u:4}, careerEffect:{voteShift:-0.004,repShift:0} },
      { label:"Pull the bill", text:"Retreat to fight another day.",
        base:{a:-4,e:0,u:1}, careerEffect:{voteShift:-0.008,repShift:-3} }
    ]},
  { id:"economyboom", dept:"chancellor", title:"Unexpected Growth", icon:"↑",
    text:"The economy surprises on the upside. You have a little headroom — and a choice.",
    choices:[
      { label:"Cut taxes with the windfall", text:"Hand it back; bank the goodwill.",
        base:{a:6,e:-2,u:1}, careerEffect:{voteShift:0.012,repShift:4} },
      { label:"Invest it for the long term", text:"Your Chancellor argues for the future.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"chancellor",
          success:{a:3,e:9,u:2}, fail:{a:-1,e:-2,u:-1}},
        careerEffect:{voteShift:0.008,repShift:3} },
      { label:"Pay down debt", text:"Prudent, and quietly unloved.",
        base:{a:-2,e:5,u:0}, careerEffect:{voteShift:0.002,repShift:1} }
    ]},
  { id:"speech", dept:"pm", title:"Conference Speech", icon:"♞",
    text:"You face your party faithful with the cameras rolling. A big speech can reset everything.",
    choices:[
      { label:"Swing for the fences", text:"A soaring, risky address.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"pm",
          success:{a:7,e:0,u:6}, fail:{a:-5,e:0,u:-4}},
        careerEffect:{voteShift:0.010,repShift:4} },
      { label:"A safe, solid speech", text:"No disasters, no fireworks.",
        base:{a:1,e:0,u:2}, careerEffect:{voteShift:0.002,repShift:1} }
    ]},
  { id:"devolution", dept:"deputy", title:"The Union Strains", icon:"⚜",
    text:"Tensions flare with the devolved nations over money and powers.",
    choices:[
      { label:"Devolve more powers", text:"Generous, and risky for the centre.",
        base:{a:2,e:-2,u:-2}, careerEffect:{voteShift:0.004,repShift:2} },
      { label:"Hold the line from Westminster", text:"Assert the centre's authority.",
        base:{a:-1,e:1,u:2}, careerEffect:{voteShift:0.002,repShift:0} },
      { label:"Broker a settlement", text:"Your Deputy PM leads the talks.",
        base:{a:0,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"deputy",
          success:{a:4,e:1,u:4}, fail:{a:-3,e:-1,u:-3}},
        careerEffect:{voteShift:0.006,repShift:2} }
    ]},
  { id:"media", dept:"leader", title:"A Hostile Press", icon:"❝",
    text:"A relentless media campaign is denting the government's standing.",
    choices:[
      { label:"Take the fight to them", text:"Your Leader of the House goes on the offensive.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"leader",
          success:{a:5,e:0,u:3}, fail:{a:-5,e:0,u:-2}},
        careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Rise above it", text:"Refuse to engage; let it burn out.",
        base:{a:-2,e:0,u:1}, careerEffect:{voteShift:-0.002,repShift:0} },
      { label:"A grand policy announcement", text:"Change the subject with substance.",
        base:{a:3,e:-3,u:0}, careerEffect:{voteShift:0.006,repShift:1} }
    ]},
  { id:"manifesto", dept:"chancellor", title:"A Flagship Pledge Comes Due", icon:"★",
    text:"A signature promise from your campaign is now or never. Delivering it is hard and expensive.",
    choices:[
      { label:"Deliver it, whatever the cost", text:"Keep faith with the voters.",
        base:{a:6,e:-6,u:2}, careerEffect:{voteShift:0.016,repShift:6} },
      { label:"Quietly water it down", text:"Trim it to something affordable.",
        base:{a:-4,e:3,u:0}, careerEffect:{voteShift:-0.010,repShift:-4} },
      { label:"Make it the fight of the term", text:"Bet the house on landing it well.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"chancellor",
          success:{a:7,e:3,u:3}, fail:{a:-6,e:-4,u:-3}},
        careerEffect:{voteShift:0.012,repShift:4} }
    ]},
  { id:"publicpay", dept:"chancellor", title:"Public Sector Pay Dispute", icon:"£",
    text:"Nurses, teachers, and civil servants are demanding pay rises above inflation. The unions are coordinating.",
    choices:[
      { label:"A generous above-inflation deal", text:"Settle it and move on. It's expensive.",
        base:{a:6,e:-7,u:2}, careerEffect:{voteShift:0.010,repShift:5} },
      { label:"A pay review body recommendation", text:"Take the politics out of it.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"chancellor",
          success:{a:3,e:2,u:2}, fail:{a:-4,e:-2,u:-3}},
        careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Hold firm below inflation", text:"Fiscal discipline, at a political cost.",
        base:{a:-7,e:5,u:-3}, careerEffect:{voteShift:-0.012,repShift:-5} }
    ]},
  { id:"nhswaiting", dept:"health", title:"NHS Waiting List Crisis", icon:"✚",
    text:"Seven million people are waiting for treatment. The Health Secretary needs a plan.",
    choices:[
      { label:"Outsource to the private sector", text:"Fast results, fierce controversy.",
        base:{a:3,e:-5,u:-5}, careerEffect:{voteShift:0.006,repShift:-3} },
      { label:"A waiting list taskforce", text:"Your Health Secretary's reform programme.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"health",
          success:{a:7,e:2,u:3}, fail:{a:-5,e:-2,u:-2}},
        careerEffect:{voteShift:0.008,repShift:3} },
      { label:"New funding, new targets", text:"Throw money and accountability at it.",
        base:{a:5,e:-6,u:1}, careerEffect:{voteShift:0.010,repShift:4} }
    ]},
  { id:"climate", dept:"business", title:"Climate Emergency", icon:"♻",
    text:"A record-breaking summer — floods, droughts, and wildfires — forces the agenda onto your desk.",
    choices:[
      { label:"A green investment surge", text:"Net zero leadership. Expensive.",
        base:{a:4,e:-6,u:-2}, careerEffect:{voteShift:0.010,repShift:5} },
      { label:"Carbon pricing and market signals", text:"The economically sound option — unpopular.",
        base:{a:-3,e:3,u:-1}, careerEffect:{voteShift:0.002,repShift:1} },
      { label:"A climate commission", text:"Delay the hard choices with a review.",
        base:{a:-1,e:0,u:0}, gamble:{stat:"statecraft", dept:"business",
          success:{a:2,e:1,u:2}, fail:{a:-4,e:-1,u:-3}},
        careerEffect:{voteShift:-0.004,repShift:-2} }
    ]},
  { id:"university", dept:"education", title:"University Funding Crisis", icon:"✎",
    text:"Vice-chancellors warn dozens of universities face insolvency. Tuition fees have not risen in a decade.",
    choices:[
      { label:"Raise tuition fees", text:"Necessary but deeply unpopular with graduates.",
        base:{a:-6,e:3,u:-3}, careerEffect:{voteShift:-0.010,repShift:-4} },
      { label:"A public university rescue fund", text:"Bail them out, attach conditions.",
        base:{a:3,e:-5,u:1}, careerEffect:{voteShift:0.006,repShift:3} },
      { label:"Consolidation and mergers", text:"Your Education Secretary restructures the sector.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"education",
          success:{a:3,e:4,u:2}, fail:{a:-4,e:-2,u:-2}},
        careerEffect:{voteShift:0.004,repShift:1} }
    ]},
  { id:"pension", dept:"chancellor", title:"Pension Triple Lock Under Pressure", icon:"£",
    text:"The triple lock is costing £20bn more than forecast. The Treasury wants a review.",
    choices:[
      { label:"Keep it — a promise is a promise", text:"Popular with pensioners; expensive for everyone else.",
        base:{a:5,e:-5,u:2}, careerEffect:{voteShift:0.010,repShift:3} },
      { label:"Cap it at earnings growth", text:"A compromise that satisfies nobody.",
        base:{a:-2,e:3,u:-1}, careerEffect:{voteShift:-0.004,repShift:-2} },
      { label:"Means-test pensioner benefits", text:"Politically toxic, fiscally sensible.",
        base:{a:-7,e:6,u:-4}, careerEffect:{voteShift:-0.012,repShift:-5} }
    ]},
  { id:"energy", dept:"business", title:"Energy Bills Winter Crunch", icon:"⚙",
    text:"Energy prices spike heading into winter. Millions face fuel poverty.",
    choices:[
      { label:"Extend the price cap", text:"Intervention at a serious cost to the books.",
        base:{a:7,e:-7,u:1}, careerEffect:{voteShift:0.012,repShift:5} },
      { label:"A windfall tax on energy firms", text:"Popular with the public, war with business.",
        base:{a:5,e:-4,u:-2}, careerEffect:{voteShift:0.008,repShift:2} },
      { label:"An accelerated nuclear pledge", text:"Invest for the long term; no help this winter.",
        base:{a:-1,e:4,u:0}, gamble:{stat:"statecraft", dept:"business",
          success:{a:3,e:6,u:2}, fail:{a:-3,e:-2,u:-2}},
        careerEffect:{voteShift:0.004,repShift:2} }
    ]},
  { id:"policecrisis", dept:"home", title:"Police Integrity Crisis", icon:"⚠",
    text:"A series of corruption and misconduct cases have shaken public confidence in the police.",
    choices:[
      { label:"An independent national watchdog", text:"Structural reform. The Police Federation is furious.",
        base:{a:4,e:0,u:-2}, careerEffect:{voteShift:0.008,repShift:4} },
      { label:"Mandatory training and standards", text:"Reform from within.",
        base:{a:2,e:0,u:0}, gamble:{stat:"statecraft", dept:"home",
          success:{a:4,e:0,u:2}, fail:{a:-3,e:0,u:-2}},
        careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Support the existing leadership", text:"Stand by the force and take the heat.",
        base:{a:-5,e:0,u:1}, careerEffect:{voteShift:-0.008,repShift:-4} }
    ]},
  { id:"aijobs", dept:"business", title:"Automation & Job Losses", icon:"⚙",
    text:"A wave of AI-driven redundancies hits white-collar sectors. Think-tanks warn of structural unemployment.",
    choices:[
      { label:"A national retraining guarantee", text:"Ambitious, expensive, and popular.",
        base:{a:5,e:-5,u:2}, careerEffect:{voteShift:0.010,repShift:4} },
      { label:"Regulate AI deployment in the workplace", text:"Slow the wave; business is unhappy.",
        base:{a:2,e:-3,u:3}, careerEffect:{voteShift:0.004,repShift:2} },
      { label:"Let the market adapt", text:"Hands off. Growth in the long run; pain in the short.",
        base:{a:-4,e:3,u:-2}, careerEffect:{voteShift:-0.008,repShift:-4} }
    ]},
  { id:"niunity", dept:"deputy", title:"Northern Ireland Tensions", icon:"⚜",
    text:"A political crisis in Belfast has stalled the power-sharing executive. Both communities want Westminster's ear.",
    choices:[
      { label:"Convene an emergency summit", text:"Your Deputy PM chairs talks at Lancaster House.",
        base:{a:2,e:0,u:1}, gamble:{stat:"partyMgmt", dept:"deputy",
          success:{a:5,e:1,u:3}, fail:{a:-3,e:-1,u:-2}},
        careerEffect:{voteShift:0.006,repShift:3} },
      { label:"A special investment fund for NI", text:"Money as diplomacy.",
        base:{a:3,e:-4,u:1}, careerEffect:{voteShift:0.004,repShift:2} },
      { label:"Westminster resumes direct control", text:"Decisive but deeply controversial.",
        base:{a:-2,e:0,u:-1}, careerEffect:{voteShift:-0.004,repShift:-2} }
    ]},
  { id:"transport", dept:"business", title:"Infrastructure in Crisis", icon:"⚑",
    text:"A major infrastructure project is years late and billions over budget. Cancel it and disappoint; commit and bleed.",
    choices:[
      { label:"Full commitment to delivery", text:"Finish what you started — at enormous cost.",
        base:{a:2,e:-8,u:1}, careerEffect:{voteShift:0.008,repShift:3} },
      { label:"A scaled-back revised plan", text:"Compromise between vision and fiscal reality.",
        base:{a:-1,e:-3,u:0}, gamble:{stat:"statecraft", dept:"business",
          success:{a:3,e:2,u:2}, fail:{a:-4,e:-3,u:-3}},
        careerEffect:{voteShift:0.002,repShift:0} },
      { label:"Cancel and compensate contractors", text:"Cut your losses; take the political hit now.",
        base:{a:-6,e:4,u:-2}, careerEffect:{voteShift:-0.010,repShift:-4} }
    ]}
];

/* ---- career effect accumulator ------------------------------------------ */
/* Called once per choice in career mode. Accumulates voteShift and repShift
   into G.career; the totals feed the next election via G.careerApplyVoteMod. */
G.applyCareerEffect = function (effect) {
  if (!effect) return;
  if (G.career && G.career.active) {
    var shift = effect.voteShift || 0;
    var rep   = effect.repShift  || 0;
    G.career.voteModifier    = Math.max(-0.12, Math.min(0.12, (G.career.voteModifier || 0) + shift));
    G.career.reputationScore = Math.max(0, Math.min(100, (G.career.reputationScore || 50) + rep));
  }
  /* apply bloc support shifts (always, even in single-election mode) */
  if (effect.blocShift && G.term && G.term.blocSupport && G.electorateShift) {
    G.electorateShift(G.term.blocSupport, effect.blocShift);
    if (G.career && G.career.blocSupport) G.electorateShift(G.career.blocSupport, effect.blocShift);
  }
};

/* ============================================================ LIVING CABINET ==
   Minister state lives in a name-keyed side-table (never on the politician
   object itself — those are shared references into G.POLITICIANS).
   State table: G.career.ministerState (persists) or G.state.ministerState
   (single-election mode).                                                      */

G._minStateTable = function () {
  if (G.career && G.career.active) return G.career.ministerState || (G.career.ministerState = {});
  return G.state.ministerState || (G.state.ministerState = {});
};

G.initMinisterState = function (pol) {
  if (!pol) return { loyalty: 55, ambition: 45, traits: [], rivalry: false };
  var pm = (pol.fits || []).indexOf("pm") >= 0;
  return {
    loyalty:  Math.max(20, Math.min(90, Math.round(55 + ((pol.stats && pol.stats.partyMgmt || 50) - 50) * 0.4))),
    ambition: Math.max(10, Math.min(95, Math.round(45 + ((pol.stats && pol.stats.appeal   || 50) - 50) * 0.5 + (pm ? 15 : 0)))),
    traits:   [],
    rivalry:  false
  };
};

/* Get or create minister state for a politician (by name). */
G.minState = function (name) {
  if (!name) return G.initMinisterState(null);
  var tbl = G._minStateTable();
  if (!tbl[name]) {
    /* look up the politician to seed the initial state */
    var pol = null;
    if (G.state && G.state.cabinet) {
      Object.keys(G.state.cabinet).forEach(function (k) {
        if (G.state.cabinet[k] && G.state.cabinet[k].name === name) pol = G.state.cabinet[k];
      });
    }
    if (!pol && G.POLITICIANS) pol = G.POLITICIANS.filter(function (p) { return p.name === name; })[0] || null;
    tbl[name] = G.initMinisterState(pol);
  }
  return tbl[name];
};

/* ---- minister dynamics: update state after a choice is applied ------------ */
G.ministerDynamics = function (ev, choice, gambleWon) {
  var t = G.term;
  if (!t || !G.state || !G.state.cabinet) return;
  /* find the minister for this event's department */
  var portfolioKey = ev.dept;
  var pol = G.state.cabinet[portfolioKey];
  if (!pol) return;
  var ms = G.minState(pol.name);

  if (choice.gamble) {
    if (gambleWon) {
      /* competent trait progress */
      if (ms.traits.indexOf("competent") < 0 && Math.random() < 0.4) ms.traits.push("competent");
      if (ms.ambition < 60) ms.loyalty = Math.min(90, ms.loyalty + 3);
      else ms.ambition = Math.min(95, ms.ambition + 4);
    } else {
      ms.loyalty = Math.max(20, ms.loyalty - 5);
      if (ms.traits.indexOf("gaffe-prone") < 0 && Math.random() < 0.25) ms.traits.push("gaffe-prone");
    }
  }
  if (choice.resign) {
    ms.loyalty = Math.max(20, ms.loyalty - 8);
  }
  /* low unity triggers rivalry for high-ambition/low-loyalty ministers */
  if (t.meters && t.meters.unity < 35 && ms.ambition > 65 && ms.loyalty < 45) {
    ms.rivalry = true;
    if (ms.traits.indexOf("schemer") < 0) ms.traits.push("schemer");
  }
  /* rising star: sustained gamble wins across terms */
  if (ms.traits.indexOf("competent") >= 0 && ms.traits.indexOf("rising-star") < 0 && Math.random() < 0.2) {
    ms.traits.push("rising-star");
  }
};

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

  /* governing context — the chamber you actually hold (UK or an international one) */
  var sysKey = G.state && G.state._electoralSystemKey;
  var activeSys = (sysKey && G.ELECTORAL_SYSTEMS) ? G.ELECTORAL_SYSTEMS[sysKey] : null;
  var isDespot = activeSys && (activeSys.despotMode || activeSys.coalitionStyle === "guided");

  var approval;
  if (isDespot) {
    /* despotic governments start with fabricated high approval (85–95%) */
    approval = 85 + Math.round(Math.random() * 10);
  } else {
    approval = G._clampM(38 + (res.voteShare - 0.33) * 120 + (res.tier.govt ? 4 : 0));
    approval = Math.max(cfg.startApprovalMin, Math.min(cfg.startApprovalMax, approval));
  }
  var economy = G._clampM(46 + (G.ministerStat("chancellor", "statecraft") - 50) * 0.30);
  var termMajority  = (G.activeMajority ? G.activeMajority() : C.majority);
  var termTotalSeats = (G.activeTotalSeats ? G.activeTotalSeats() : C.totalSeats);
  var termDeck = (G.govDeckFor ? G.govDeckFor(sysKey) : null);
  var maj = seats - termMajority;
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
    majority: termMajority, totalSeats: termTotalSeats,
    systemKey: sysKey || "fptp_uk", govDeck: termDeck,
    session: 1, length: cfg.sessions,
    mode: mode, difficulty: (G.state && G.state.difficulty) || "normal",
    caretaker: {}, drawn: [], current: null,
    over: false, outcome: null, fellSession: null,
    history: [], byElectionSeats: [],
    reshuffleUsed: false,
    /* the PLEDGE TRACKER: your manifesto stances become four tracked promises.
       Deliver them in office for legacy; shelve them and pay for it. */
    pledges: (G.state && G.state.policyOn && G.state.policy) ? G.POLICY_AXES.map(function (ax) {
      var opt = G.policyOption(ax.key, G.state.policy[ax.key]);
      return opt ? { axis: ax.key, title: ax.title, label: opt.label, status: "open" } : null;
    }).filter(Boolean) : null
  };
  /* seed voter-bloc support for this term */
  if (G.electorateInit) {
    var careerBlocs = G.career && G.career.blocSupport && Object.keys(G.career.blocSupport).length
                      ? G.career.blocSupport : null;
    var scenBlocs   = G.state && G.state._scenarioBlocSupport;
    if (careerBlocs) {
      G.term.blocSupport = JSON.parse(JSON.stringify(careerBlocs));
    } else if (scenBlocs) {
      G.term.blocSupport = JSON.parse(JSON.stringify(scenBlocs));
    } else {
      var pAlign = G.playerAlignValue ? G.playerAlignValue(mode, G.state && G.state.lineage, G.state && G.state.custom) : 0;
      G.term.blocSupport = G.electorateInit(pAlign, G.state && G.state.policy);
    }
  }
  G.govDrawTurn(2);
  return G.term;
};

/* the seat each pledge axis lives in */
G.PLEDGE_DEPT = { tax: "chancellor", nhs: "health", imm: "home", world: "foreign" };

/* a generated one-off event: deliver or shelve a tracked pledge */
G._pledgeEvent = function (pl) {
  var dept = G.PLEDGE_DEPT[pl.axis] || "pm";
  return { id: "pledge-" + pl.axis, dept: dept, special: "pledge", axis: pl.axis,
    title: "Manifesto Moment: " + pl.title, icon: "✓",
    text: "A window opens to deliver your pledge — \u201c" + pl.label + "\u201d. Legislation is drafted; the whips await your word.",
    choices: [
      { label: "Deliver it in full", text: "Your " + (G.PORTFOLIO_BY_KEY[dept] ? G.PORTFOLIO_BY_KEY[dept].name : "minister") + " carries the bill.",
        base: { a: 1, e: 0, u: 1 }, deliver: pl.axis,
        gamble: { stat: "statecraft", dept: dept, success: { a: 5, e: 2, u: 3 }, fail: { a: -3, e: -2, u: -2 } } },
      { label: "Water it down", text: "Half a loaf, quietly.", base: { a: 0, e: 1, u: -1 }, water: pl.axis },
      { label: "Shelve it", text: "Events, dear boy. The promise dies.", base: { a: -3, e: 1, u: -3 }, shelve: pl.axis }
    ] };
};
/* the mid-term BUDGET set-piece: a bigger, louder fiscal moment than the
   weekly crisis cards — resolved by your actual Chancellor. */
G.MID_BUDGET = { id: "midbudget", dept: "chancellor", special: "budget",
  title: "The Mid-term Budget", icon: "£",
  text: "Half-time. The biggest set-piece of the parliament: the markets, the manifesto and the marginals all want different Budgets.",
  choices: [
    { label: "A giveaway for the voters", text: "Spend the war chest where it shows.",
      base: { a: 7, e: -6, u: 2 } },
    { label: "A reforming, radical Budget", text: "Your Chancellor bets the house on a rewrite of the tax code.",
      base: { a: 0, e: 0, u: 0 }, gamble: { stat: "statecraft", dept: "chancellor",
        success: { a: 8, e: 10, u: 3 }, fail: { a: -8, e: -9, u: -4 } } },
    { label: "A fortress Budget", text: "Build reserves; bore the sketchwriters.",
      base: { a: -4, e: 8, u: 0 } }
  ] };

/* a once-per-term RESHUFFLE: swap any two of your ministers. Costs a little
   unity (someone always sulks) but can rescue a misfit department. */
G.reshuffle = function (keyA, keyB) {
  var st = G.state, t = G.term;
  if (!t || t.kind !== "govt" || t.over || t.reshuffleUsed) return null;
  if (!st.cabinet[keyA] || !st.cabinet[keyB] || keyA === keyB) return null;
  var tmp = st.cabinet[keyA]; st.cabinet[keyA] = st.cabinet[keyB]; st.cabinet[keyB] = tmp;
  st.draftedNames[st.cabinet[keyA].name] = keyA;
  st.draftedNames[st.cabinet[keyB].name] = keyB;
  t.reshuffleUsed = true;
  t.meters.unity = G._clampM(t.meters.unity - 2);
  var pa = G.PORTFOLIO_BY_KEY[keyA].name, pb = G.PORTFOLIO_BY_KEY[keyB].name;
  return { text: "Reshuffle: " + st.cabinet[keyA].name + " takes " + pa + "; " + st.cabinet[keyB].name + " moves to " + pb + ". Someone is sulking.", cls: "head" };
};

/* pick the next crisis (avoid repeating recent ones) */
G.govDraw = function () {
  var t = G.term;
  var src = (t.kind === "opp") ? G.OPP_EVENTS
          : (G.activeGovDeckEvents ? G.activeGovDeckEvents() : G.EVENTS);
  var pool = src.filter(function (e) { return t.drawn.indexOf(e.id) === -1; });
  if (!pool.length) { t.drawn = []; pool = src.slice(); }
  var e = pool[Math.floor(Math.random() * pool.length)];
  t.drawn.push(e.id);
  return e;
};

/* draw n crisis events for this turn; stored as t.turnEvents = [{event, stagedChoice:null}] */
G.govDrawTurn = function (n) {
  var t = G.term;
  var events = [];
  for (var i = 0; i < n; i++) {
    var ev = null;
    if (t.kind === "govt") {
      if (i === 0 && t.session === Math.ceil(t.length / 2) && t.drawn.indexOf("midbudget") === -1) {
        t.drawn.push("midbudget");
        ev = G.MID_BUDGET;
      } else if (i >= 1) {
        var openPl = (t.pledges || []).filter(function (pl) { return pl.status === "open"; });
        if (openPl.length && Math.random() < 0.34) {
          ev = G._pledgeEvent(openPl[Math.floor(Math.random() * openPl.length)]);
        }
      }
    } else {
      if (i >= 1 && t.session % 3 === 0) {
        ev = G._oppByElectionEvent();
      }
    }
    if (!ev) ev = G.govDraw();
    events.push(ev);
  }
  t.turnEvents = events.map(function (e) { return { event: e, stagedChoice: null }; });
  t.current = null;
  return t.turnEvents;
};

/* stage a choice for one event without applying it yet */
G.stageChoice = function (eventIdx, choiceIdx) {
  var t = G.term;
  if (!t || t.over || !t.turnEvents || !t.turnEvents[eventIdx]) return false;
  t.turnEvents[eventIdx].stagedChoice = choiceIdx;
  return true;
};

/* true when every event in the current turn has a staged choice */
G.allChoicesStaged = function () {
  var t = G.term;
  if (!t || !t.turnEvents || !t.turnEvents.length) return false;
  return t.turnEvents.every(function (te) { return te.stagedChoice !== null && te.stagedChoice !== undefined; });
};

/* apply effects from one event+choice pair (no session advance, no per-turn drift) */
G._applyChoiceEffects = function (ev, choice, log) {
  log.push({ text: ev.title + " — " + choice.label, cls: "head" });
  G._apply(choice.base, true);
  G.applyCareerEffect(choice.careerEffect);
  /* implicit bloc nudge: if the event has an issue axis and the choice has a
     known direction (hand-authored axisDir), apply a small automatic shift    */
  if (ev.axis && choice.axisDir && G.term && G.term.blocSupport && G.electorateIssueNudge) {
    G.electorateIssueNudge(ev.axis, choice.axisDir, G.term.blocSupport);
  }
  var gambleWon = false;
  if (choice.gamble) {
    var g = choice.gamble, stat = G.ministerStat(g.dept, g.stat);
    var p = Math.max(0.05, Math.min(0.95, 0.30 + (stat - 50) / 100 * 0.95 - G._diff().confidence * 0.5));
    gambleWon = Math.random() < p;
    G._apply(gambleWon ? g.success : g.fail, true);
    log.push({ text: (gambleWon ? "✓ " : "✗ ") + G.ministerName(g.dept) + (gambleWon ? " pulls it off." : " can't make it land."), cls: gambleWon ? "good" : "bad" });
  }
  if (G.ministerDynamics) G.ministerDynamics(ev, choice, gambleWon);
  if (choice.deliver || choice.water || choice.shelve) {
    var ax = choice.deliver || choice.water || choice.shelve;
    (G.term.pledges || []).forEach(function (pl) {
      if (pl.axis !== ax) return;
      if (choice.shelve) {
        pl.status = "broken";
        log.push({ text: "Pledge shelved: “" + pl.label + "”.", cls: "bad" });
      } else if (choice.water) {
        pl.status = "watered";
        log.push({ text: "Pledge watered down: “" + pl.label + "”.", cls: "" });
      } else {
        var won = !choice.gamble || gambleWon;
        pl.status = won ? "delivered" : "open";
        log.push(won ? { text: "Pledge DELIVERED: “" + pl.label + "”.", cls: "good" }
                     : { text: "The bill stalls.", cls: "bad" });
      }
    });
  }
  if (choice.resign) G._caretake(log);
  if (ev.special === "byel" && choice.seatId && G.term.kind === "opp") {
    G.term.targetsUsed[choice.seatId] = 1;
    if (gambleWon) {
      G.term.seats += 1;
      if (G.term.gov) G.term.gov.approval = G._clampM(G.term.gov.approval - 3);
      log.push({ text: "GAIN: " + choice.seatName + " falls to you (" + G.term.seats + " seats now).", cls: "good" });
    } else {
      log.push({ text: choice.seatName + " holds for the government.", cls: "bad" });
    }
  }
};

/* apply all staged choices, run per-turn side effects, advance session */
G.confirmTurn = function () {
  var t = G.term;
  if (!t || t.over || !G.allChoicesStaged()) return { log: [], over: false, outcome: null };
  var log = [];
  t.turnEvents.forEach(function (te) {
    G._applyChoiceEffects(te.event, te.event.choices[te.stagedChoice], log);
  });
  if (t.kind === "govt") {
    t.meters.approval = G._clampM(t.meters.approval - G.GOVCONFIG.drift);
    if (t.session >= 2 && Math.random() < G.GOVCONFIG.byElectionChance) G._byElection(log);
    if (t.meters.unity < G.GOVCONFIG.rebellionUnity) G._rebellion(log);
  } else {
    t.meters.economy = G._clampM(t.meters.economy - G.OPPCONFIG.momentumDrift);
    var oc = G.OPPCONFIG;
    var decay = oc.govDecayMin + Math.random() * (oc.govDecayMax - oc.govDecayMin);
    var weak = t.gov.approval <= t.gov.economy ? "approval" : "economy";
    var bite = (t.attack === weak) ? oc.attackBite * (0.6 + Math.random() * 0.8) : 0;
    if (bite > 0) log.push({ text: "Your attack line lands where it hurts.", cls: "good" });
    t.gov[t.attack] = G._clampM(t.gov[t.attack] - decay - bite);
    var other = t.attack === "approval" ? "economy" : "approval";
    t.gov[other] = G._clampM(t.gov[other] - decay * 0.4 + (Math.random() - 0.6));
    t.meters.economy = G._clampM(t.meters.economy + (50 - t.gov.approval) / 25);
    if (t.forceLock > 0) t.forceLock--;
  }
  t.history.push({
    session: t.session,
    titles: t.turnEvents.map(function (te) { return te.event.title; }).join(" / "),
    choices: t.turnEvents.map(function (te) { return te.event.choices[te.stagedChoice].label; }).join(" / "),
    meters: { approval: t.meters.approval, economy: t.meters.economy, unity: t.meters.unity },
    seats: t.seats
  });
  if (t.kind === "govt") {
    if (G._confidenceAtRisk()) {
      var surv = G._confidenceVote(log);
      if (!surv) { t.over = true; t.outcome = "collapsed"; t.fellSession = t.session; return { log: log, over: true, outcome: "collapsed" }; }
    }
  } else {
    if (t.meters.unity < G.OPPCONFIG.challengeUnity) {
      var surv2 = G._leadershipChallenge(log);
      if (!surv2) { t.over = true; t.outcome = "ousted"; t.fellSession = t.session; return { log: log, over: true, outcome: "ousted" }; }
    }
  }
  t.session++;
  if (t.session > t.length) {
    t.over = true;
    t.outcome = t.kind === "govt" ? "completed" : "survived";
    log.push({ text: t.kind === "govt" ? "You reach polling day with your government intact." : "You reach the next general election as a credible opposition.", cls: "good" });
    return { log: log, over: true, outcome: t.outcome };
  }
  G.govDrawTurn(2);
  return { log: log, over: false, outcome: null };
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

  /* career effect: accumulates into G.career for the next election */
  G.applyCareerEffect(choice.careerEffect);

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

  /* pledge bookkeeping (the gamble above already decided success) */
  if (choice.deliver || choice.water || choice.shelve) {
    var ax = choice.deliver || choice.water || choice.shelve;
    (t.pledges || []).forEach(function (pl) {
      if (pl.axis !== ax) return;
      if (choice.shelve) { pl.status = "broken"; log.push({ text: "Pledge shelved: \u201c" + pl.label + "\u201d. The broken-promises file thickens.", cls: "bad" }); }
      else if (choice.water) { pl.status = "watered"; log.push({ text: "Pledge watered down: \u201c" + pl.label + "\u201d.", cls: "" }); }
      else {
        var won = !choice.gamble || log.some(function (l) { return l.cls === "good" && l.text.indexOf("pulls it off") !== -1; });
        pl.status = won ? "delivered" : "stalled";
        log.push(won ? { text: "Pledge DELIVERED: \u201c" + pl.label + "\u201d.", cls: "good" }
                     : { text: "The bill stalls — the pledge hangs in the balance.", cls: "bad" });
        if (!won) pl.status = "open";
      }
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

  /* what lands next: the mid-term Budget at half-time; an open pledge's
     moment (sometimes); else the next crisis off the deck */
  if (t.session === Math.ceil(t.length / 2) && t.drawn.indexOf("midbudget") === -1) {
    t.drawn.push("midbudget");
    t.current = G.MID_BUDGET;
  } else {
    var openPl = (t.pledges || []).filter(function (pl) { return pl.status === "open"; });
    if (openPl.length && Math.random() < 0.34) {
      t.current = G._pledgeEvent(openPl[Math.floor(Math.random() * openPl.length)]);
    } else {
      t.current = G.govDraw();
    }
  }
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
  /* no backbench rebellions in one-party authoritarian systems */
  var _sysKey = t.systemKey;
  var _sys = (_sysKey && G.ELECTORAL_SYSTEMS) ? G.ELECTORAL_SYSTEMS[_sysKey] : null;
  if (_sys && (_sys.despotMode || _sys.coalitionStyle === "guided")) return;
  var grip = (G.ministerStat("whip", "partyMgmt") + G.ministerStat("leader", "partyMgmt")) / 2;
  var p = 0.35 + (grip - 50) / 100 * 0.8 + (t.seats - (t.majority || G.CONFIG.majority)) / 400;
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
  /* no confidence votes in one-party authoritarian systems */
  var _sysKey = G.term && G.term.systemKey;
  var _sys = (_sysKey && G.ELECTORAL_SYSTEMS) ? G.ELECTORAL_SYSTEMS[_sysKey] : null;
  if (_sys && (_sys.despotMode || _sys.coalitionStyle === "guided")) return false;
  var m = G.term.meters;
  if (m.approval < 26 && m.unity < 40) return true;
  if (G.term.seats < (G.term.majority || G.CONFIG.majority) && m.unity < 36) return true;
  if (m.unity < 18) return true;
  return false;
};

G._confidenceVote = function (log) {
  var t = G.term, m = t.meters;
  log.push({ text: "A motion of no confidence is tabled.", cls: "head" });
  var grip = (G.ministerStat("leader", "partyMgmt") + G.ministerStat("whip", "partyMgmt") + G.ministerStat("pm", "appeal")) / 3;
  var p = 0.40 + (m.unity - 40) / 100 + (t.seats - (t.majority || G.CONFIG.majority)) / 220
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
  var seatScore = Math.max(0, Math.min(20, t.seats / (t.totalSeats || G.CONFIG.totalSeats) * 20));
  var pledgeScore = 0;
  if (t.pledges) t.pledges.forEach(function (pl) {
    if (pl.status === "delivered") pledgeScore += 3;
    else if (pl.status === "watered") pledgeScore += 1;
    else if (pl.status === "broken") pledgeScore -= 2;
    else pledgeScore -= 1;                                   // quietly never done
  });
  var raw = m.approval * 0.34 + m.economy * 0.24 + m.unity * 0.20 + seatScore + pledgeScore
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
    length: t.length, history: t.history, caretakers: Object.keys(t.caretaker).length,
    pledges: t.pledges || null
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
G.OPPCONFIG = { sessions: 12, forceMomentum: 85, challengeUnity: 26, momentumDrift: 1,
  /* the simulated GOVERNMENT you are trying to break (visible meters) */
  govDecayMin: 0.6, govDecayMax: 2.2,      /* its standing erodes — faster under pressure */
  attackBite: 2.5,                          /* extra erosion when your attack line hits its weak front */
  forceFloor: 44,                           /* you may go for the kill once gov standing dips here, or momentum is high */
  forceLockSessions: 2 };

G.OPP_EVENTS = [
  { id:"pmqs", dept:"pm", title:"Prime Minister's Questions", icon:"❝",
    text:"The despatch box, every Wednesday. A clean hit can dominate the news for days.",
    choices:[
      { label:"Go for the jugular", text:"A scripted, high-risk ambush.",
        base:{a:1,e:1,u:1}, gamble:{stat:"oratory", dept:"pm",
          success:{a:4,e:7,u:3}, fail:{a:-3,e:-2,u:-3}},
        careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Forensic and factual", text:"Six quiet questions, no theatrics.",
        base:{a:2,e:3,u:0}, careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Rise above the bear pit", text:"Look statesmanlike; cede the drama.",
        base:{a:1,e:-2,u:1}, careerEffect:{voteShift:0.002,repShift:1} }
    ]},
  { id:"oppbudget", dept:"chancellor", title:"Responding to the Budget", icon:"£",
    text:"The Chancellor sits down. You have minutes to tear the Budget apart at the despatch box.",
    choices:[
      { label:"Demolish the numbers", text:"Your Shadow Chancellor goes line by line.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"chancellor",
          success:{a:5,e:8,u:2}, fail:{a:-3,e:-3,u:-2}},
        careerEffect:{voteShift:0.008,repShift:3} },
      { label:"Make it about fairness", text:"Frame it as a Budget for the few.",
        base:{a:4,e:3,u:1}, careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Promise a costed alternative", text:"Look like a government-in-waiting.",
        base:{a:2,e:2,u:-1}, careerEffect:{voteShift:0.004,repShift:2} }
    ]},
  { id:"oppscandal", dept:"home", title:"A Government Scandal Breaks", icon:"!",
    text:"A minister is in serious trouble. The lobby wants the opposition's response.",
    choices:[
      { label:"Demand the resignation", text:"Lead the chase; keep the pressure on.",
        base:{a:3,e:6,u:1}, careerEffect:{voteShift:0.008,repShift:2} },
      { label:"Call for a full inquiry", text:"Sober and procedural — and lasting.",
        base:{a:1,e:3,u:0}, careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Overreach for the kill", text:"Throw everything at it and risk looking opportunistic.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"leader",
          success:{a:3,e:9,u:1}, fail:{a:-5,e:-3,u:-2}},
        careerEffect:{voteShift:0.006,repShift:1} }
    ]},
  { id:"oppbyelection", dept:"whip", title:"A By-election Opportunity", icon:"▣",
    text:"A seat falls vacant in territory you could take. A win would shake the government.",
    choices:[
      { label:"Pour in every activist", text:"Throw the kitchen sink at it.",
        base:{a:0,e:0,u:0}, gamble:{stat:"appeal", dept:"pm",
          success:{a:4,e:7,u:4}, fail:{a:-2,e:-3,u:-3}},
        careerEffect:{voteShift:0.010,repShift:3} },
      { label:"Run a disciplined local race", text:"Steady, professional, low-risk.",
        base:{a:2,e:3,u:1}, careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Manage expectations", text:"Downplay it to avoid a damaging loss.",
        base:{a:0,e:-1,u:1}, careerEffect:{voteShift:0.002,repShift:0} }
    ]},
  { id:"oppunity", dept:"deputy", title:"Your Own Party Grumbles", icon:"⚑",
    text:"A faction wants a sharper line; another wants caution. The papers smell division.",
    choices:[
      { label:"Bang heads together", text:"Your deputy enforces discipline.",
        base:{a:0,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"deputy",
          success:{a:1,e:2,u:6}, fail:{a:-2,e:-2,u:-5}},
        careerEffect:{voteShift:0.004,repShift:2} },
      { label:"Give the activists red meat", text:"Please the base, spook the centre.",
        base:{a:-2,e:2,u:4}, careerEffect:{voteShift:-0.004,repShift:1} },
      { label:"Appeal for unity", text:"Plead for discipline; hope it holds.",
        base:{a:1,e:0,u:2}, careerEffect:{voteShift:0.002,repShift:1} }
    ]},
  { id:"oppvision", dept:"leader", title:"A Defining Speech", icon:"♞",
    text:"Conference season. A big vision speech could announce you as the next government.",
    choices:[
      { label:"Set out a bold programme", text:"A soaring, risky prospectus.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"pm",
          success:{a:7,e:4,u:5}, fail:{a:-5,e:-2,u:-4}},
        careerEffect:{voteShift:0.010,repShift:4} },
      { label:"A safe, unifying speech", text:"No risks, modest reward.",
        base:{a:2,e:1,u:2}, careerEffect:{voteShift:0.002,repShift:1} },
      { label:"A relentless attack on the record", text:"All offence, little vision.",
        base:{a:1,e:4,u:-1}, careerEffect:{voteShift:0.004,repShift:0} }
    ]},
  { id:"oppvote", dept:"whip", title:"An Opposition Day Vote", icon:"⚖",
    text:"You control the agenda for a day. Pick the battlefield and try to split the government benches.",
    choices:[
      { label:"Table a wedge motion", text:"Design it to divide their party.",
        base:{a:1,e:3,u:1}, gamble:{stat:"partyMgmt", dept:"whip",
          success:{a:2,e:7,u:2}, fail:{a:-2,e:-2,u:-2}},
        careerEffect:{voteShift:0.006,repShift:2} },
      { label:"A popular, populist motion", text:"Win the room and the clip.",
        base:{a:4,e:3,u:0}, careerEffect:{voteShift:0.006,repShift:1} },
      { label:"A serious policy motion", text:"Worthy, less dramatic.",
        base:{a:1,e:1,u:1}, careerEffect:{voteShift:0.002,repShift:1} }
    ]},
  { id:"oppmedia", dept:"leader", title:"The Sunday Interviews", icon:"✦",
    text:"The big political programmes want you. A strong round can set the week's narrative.",
    choices:[
      { label:"Make news with a pledge", text:"Announce something eye-catching.",
        base:{a:4,e:2,u:-1}, careerEffect:{voteShift:0.008,repShift:2} },
      { label:"Stay relentlessly on message", text:"Disciplined repetition of the attack.",
        base:{a:1,e:4,u:1}, careerEffect:{voteShift:0.004,repShift:1} },
      { label:"Wing a tricky interview", text:"Trust your front-runner to perform.",
        base:{a:0,e:0,u:0}, gamble:{stat:"appeal", dept:"pm",
          success:{a:5,e:3,u:1}, fail:{a:-5,e:-2,u:-2}},
        careerEffect:{voteShift:0.006,repShift:2} }
    ]},
  { id:"oppdefection", dept:"whip", title:"A Government MP Wavers", icon:"⇄",
    text:"A disillusioned backbencher on the other side hints they might cross the floor.",
    choices:[
      { label:"Court them hard", text:"Roll out the charm; a defection is gold.",
        base:{a:0,e:0,u:0}, gamble:{stat:"partyMgmt", dept:"whip",
          success:{a:3,e:9,u:2}, fail:{a:-1,e:-1,u:-3}},
        careerEffect:{voteShift:0.012,repShift:3} },
      { label:"Welcome them quietly", text:"Avoid spooking them with a circus.",
        base:{a:1,e:4,u:0}, careerEffect:{voteShift:0.006,repShift:1} },
      { label:"Keep your distance", text:"Defectors bring baggage.",
        base:{a:0,e:-1,u:2}, careerEffect:{voteShift:0.002,repShift:0} }
    ]},
  { id:"oppcrisis", dept:"foreign", title:"A National Crisis", icon:"◆",
    text:"Events take over. The country looks to the government — and judges the opposition's response too.",
    choices:[
      { label:"Offer responsible support", text:"Put country before party; look like a PM.",
        base:{a:5,e:-1,u:1}, careerEffect:{voteShift:0.008,repShift:4} },
      { label:"Attack the handling", text:"Hammer every misstep.",
        base:{a:-1,e:5,u:0}, careerEffect:{voteShift:0.004,repShift:0} },
      { label:"Lead with a credible plan", text:"Your shadow team sets out what it would do.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"foreign",
          success:{a:5,e:5,u:2}, fail:{a:-4,e:-2,u:-2}},
        careerEffect:{voteShift:0.008,repShift:3} }
    ]},
  { id:"oppcommission", dept:"chancellor", title:"Your Policy Commission Reports", icon:"✎",
    text:"Your independent policy commission has published its landmark report. How do you respond?",
    choices:[
      { label:"Adopt the recommendations in full", text:"Bold, but expensive. A clear line of difference.",
        base:{a:4,e:1,u:-2}, careerEffect:{voteShift:0.008,repShift:4} },
      { label:"A nuanced partial adoption", text:"Pick and choose what works; avoid the awkward bits.",
        base:{a:1,e:2,u:2}, careerEffect:{voteShift:0.004,repShift:2} },
      { label:"Commission a further review", text:"Delay the hard choices. The papers will notice.",
        base:{a:-3,e:0,u:1}, careerEffect:{voteShift:-0.004,repShift:-2} }
    ]},
  { id:"oppleadership", dept:"pm", title:"Your Leadership Under Scrutiny", icon:"⚑",
    text:"A profile piece raises questions about your authority and vision. The party is watching.",
    choices:[
      { label:"A high-profile party address", text:"Make the case directly to your members.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"pm",
          success:{a:4,e:1,u:7}, fail:{a:-2,e:0,u:-5}},
        careerEffect:{voteShift:0.008,repShift:4} },
      { label:"Reshape the top team", text:"Quietly move the doubters out.",
        base:{a:0,e:0,u:4}, careerEffect:{voteShift:0.004,repShift:2} },
      { label:"Stay above it", text:"Let the story die without engaging.",
        base:{a:-2,e:0,u:-2}, careerEffect:{voteShift:-0.002,repShift:-1} }
    ]},
  { id:"oppinternational", dept:"foreign", title:"An International Platform", icon:"✈",
    text:"You're invited to address a major international summit as Leader of the Opposition.",
    choices:[
      { label:"A statesman's turn — lead with ideas", text:"Command the room; look prime ministerial.",
        base:{a:0,e:0,u:0}, gamble:{stat:"oratory", dept:"pm",
          success:{a:6,e:2,u:3}, fail:{a:-3,e:0,u:-2}},
        careerEffect:{voteShift:0.010,repShift:5} },
      { label:"Use it to embarrass the government", text:"Contrast their record with your vision.",
        base:{a:3,e:4,u:0}, careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Send your shadow foreign secretary", text:"Safe; below the radar.",
        base:{a:0,e:1,u:1}, careerEffect:{voteShift:0.002,repShift:1} }
    ]},
  { id:"opppolling", dept:"deputy", title:"A Poll Surge", icon:"↑",
    text:"A dramatic poll has you twelve points ahead. The media wants to know if you'll call it an election mandate.",
    choices:[
      { label:"Double down — demand a snap election", text:"Force the issue; test your moment.",
        base:{a:4,e:5,u:-1}, gamble:{stat:"appeal", dept:"pm",
          success:{a:5,e:5,u:2}, fail:{a:-4,e:-3,u:-3}},
        careerEffect:{voteShift:0.010,repShift:3} },
      { label:"Cautious optimism", text:"Stay disciplined; don't over-read it.",
        base:{a:2,e:2,u:2}, careerEffect:{voteShift:0.006,repShift:2} },
      { label:"Let the numbers speak", text:"Say nothing — let it build pressure.",
        base:{a:1,e:3,u:0}, careerEffect:{voteShift:0.004,repShift:1} }
    ]},
  { id:"oppeconomy", dept:"chancellor", title:"A Recession is Declared", icon:"£",
    text:"Two quarters of negative growth. The government is on the back foot and every journalist wants your plan.",
    choices:[
      { label:"Unveil your alternative economic plan", text:"Put substance on the table.",
        base:{a:0,e:0,u:0}, gamble:{stat:"statecraft", dept:"chancellor",
          success:{a:6,e:8,u:2}, fail:{a:-3,e:-2,u:-2}},
        careerEffect:{voteShift:0.012,repShift:5} },
      { label:"Attack the government's record relentlessly", text:"Turn the screw. Economy as your weapon.",
        base:{a:3,e:7,u:1}, careerEffect:{voteShift:0.008,repShift:3} },
      { label:"Call for cross-party talks", text:"Look statesmanlike; risk looking weak.",
        base:{a:4,e:1,u:-1}, careerEffect:{voteShift:0.004,repShift:2} }
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

  /* the government you face: seeded from the real result — who actually won,
     and how strong their random front bench was on the night */
  var winner = (res.breakdown || []).filter(function (b) { return !b.isYou; })[0] || { party: "the government" };
  var oppField = res.opposition || {};
  var benchStr = (oppField[winner.party] && oppField[winner.party].strength) || 1;
  var gov = {
    party: winner.party,
    approval: G._clampM(50 + (benchStr - 1) * 60 + ((winner.seats || 340) - 340) / 18),
    economy:  G._clampM(48 + (benchStr - 1) * 40)
  };

  /* your by-election TARGETS: real seats you lost in the regions where you ran
     strongest — the marginals worth pouring activists into */
  var targets = [];
  if (res.campaign && res.campaign.results && res.campaign.byRegion) {
    var strength = {};
    res.campaign.byRegion.forEach(function (r) { strength[r.id] = r.total ? r.won / r.total : 0; });
    targets = res.campaign.results.filter(function (r) { return !r.won; })
      .sort(function (a, b) { return (strength[b.region] || 0) - (strength[a.region] || 0); })
      .slice(0, 12);
  }

  G.term = {
    kind: "opp",
    meters: { approval: support, economy: momentum, unity: unity },
    gov: gov,                                  /* the visible, decaying government */
    attack: "approval",                        /* your chosen attack line: approval | economy */
    targets: targets, targetsUsed: {},
    forceLock: 0, forceTried: 0,
    seats: res.seats, startSeats: res.seats,
    session: 1, length: cfg.sessions,
    mode: mode, difficulty: (G.state && G.state.difficulty) || "normal",
    caretaker: {}, drawn: [], current: null,
    over: false, outcome: null, fellSession: null,
    history: [], byElectionSeats: []
  };
  G.govDrawTurn(2);
  return G.term;
};

/* set your ATTACK LINE: hammer the government's standing (approval) or its
   economic record. Hitting the weaker front bites harder — read the meters. */
G.setAttackLine = function (line) {
  var t = G.term; if (!t || t.kind !== "opp" || t.over) return false;
  if (line !== "approval" && line !== "economy") return false;
  t.attack = line;
  return true;
};

/* a generated by-election event built on REAL seats from your own map */
G._oppByElectionEvent = function () {
  var t = G.term;
  var fresh = t.targets.filter(function (r) { return !t.targetsUsed[r.id]; }).slice(0, 3);
  if (fresh.length < 2) return null;
  return { id: "oppbyel-" + t.session, dept: "pm", special: "byel",
    title: "A By-election Falls Vacant", icon: "▣",
    text: "Three of your near-misses are in play. Pick the battleground — your map, your call.",
    choices: fresh.map(function (r) {
      return { label: "Fight " + r.name, text: "Target the seat you nearly took.",
               seatId: r.id, seatName: r.name, region: r.region,
               base: { a: 0, e: 0, u: 0 },
               gamble: { stat: "appeal", dept: "pm", success: { a: 3, e: 6, u: 3 }, fail: { a: -2, e: -3, u: -2 } } };
    }) };
};

/* the player-timed kill: call the vote of no confidence and force the country
   to the polls. Available once the government is genuinely wounded; fail and
   you hand it a reprieve — and lock yourself out while the moment passes. */
G.canForceElection = function () {
  var t = G.term;
  if (!t || t.kind !== "opp" || t.over || t.forceLock > 0) return false;
  return t.gov.approval <= G.OPPCONFIG.forceFloor || t.meters.economy >= G.OPPCONFIG.forceMomentum - 10;
};
G.forceElection = function () {
  var t = G.term; if (!G.canForceElection()) return null;
  var log = [{ text: "You table a motion of no confidence in the government.", cls: "head" }];
  var grip = (G.ministerStat("pm", "appeal") + G.ministerStat("leader", "oratory")) / 2;
  var p = 0.18 + (t.meters.economy - 50) / 120 + (50 - t.gov.approval) / 110
            + (t.meters.approval - 45) / 200 + (grip - 50) / 220 - G._diff().confidence;
  p = Math.max(0.05, Math.min(0.92, p));
  t.forceTried++;
  if (Math.random() < p) {
    t.over = true; t.outcome = "forced"; t.fellSession = t.session;
    t.killQuality = G._clampM(60 + (50 - t.gov.approval));
    log.push({ text: "The House divides — and the government FALLS. The country goes to the polls with you ahead of events.", cls: "good" });
  } else {
    t.forceLock = G.OPPCONFIG.forceLockSessions;
    G._apply({ e: -12, u: -6 }, true);
    t.gov.approval = G._clampM(t.gov.approval + 5);
    log.push({ text: "The government scrapes home. Your moment passes — momentum drains, and the chance is gone for now.", cls: "bad" });
  }
  return { log: log, over: t.over, outcome: t.outcome };
};

G.oppChoose = function (idx) {
  var t = G.term; if (!t || t.over) return { log: [], over: true, outcome: t ? t.outcome : null };
  var ev = t.current, choice = ev.choices[idx], log = [];
  log.push({ text: ev.title + " — " + choice.label, cls: "head" });

  G._apply(choice.base, true);

  /* career effect for opposition events */
  G.applyCareerEffect(choice.careerEffect);

  if (choice.gamble) {
    var g = choice.gamble, stat = G.ministerStat(g.dept, g.stat);
    var p = 0.30 + (stat - 50) / 100 * 0.95 - G._diff().confidence * 0.5;
    p = Math.max(0.05, Math.min(0.95, p));
    var win = Math.random() < p;
    G._apply(win ? g.success : g.fail, true);
    log.push({ text: (win ? "✓ " : "✗ ") + G.ministerName(g.dept) + (win ? " lands the blow." : " fluffs it."),
               cls: win ? "good" : "bad" });
  }

  /* the chosen by-election battleground resolves off the gamble above */
  if (ev.special === "byel" && choice.seatId) {
    t.targetsUsed[choice.seatId] = 1;
    var won = log.some(function (l) { return l.cls === "good"; });
    if (won) { t.seats += 1; t.gov.approval = G._clampM(t.gov.approval - 3);
      log.push({ text: "GAIN: " + choice.seatName + " falls to you. The government reels (" + t.seats + " seats now).", cls: "good" }); }
    else log.push({ text: choice.seatName + " holds for the government. A bruise, not a wound.", cls: "bad" });
  }

  /* momentum drifts back to the government between flashpoints */
  t.meters.economy = G._clampM(t.meters.economy - G.OPPCONFIG.momentumDrift);

  /* the government decays in public view — faster where your ATTACK LINE
     lands on its weaker front */
  var oc = G.OPPCONFIG;
  var decay = oc.govDecayMin + Math.random() * (oc.govDecayMax - oc.govDecayMin);
  var weak = t.gov.approval <= t.gov.economy ? "approval" : "economy";
  var bite = (t.attack === weak) ? oc.attackBite * (0.6 + Math.random() * 0.8) : 0;
  if (bite > 0) log.push({ text: "Your attack line lands where it hurts — the government's " + (weak === "approval" ? "standing" : "economic record") + " takes the hit.", cls: "good" });
  t.gov[t.attack] = G._clampM(t.gov[t.attack] - decay - bite);
  var other = t.attack === "approval" ? "economy" : "approval";
  t.gov[other] = G._clampM(t.gov[other] - decay * 0.4 + (Math.random() - 0.6));
  t.meters.economy = G._clampM(t.meters.economy + (50 - t.gov.approval) / 25);
  if (t.forceLock > 0) t.forceLock--;

  t.history.push({ session: t.session, title: ev.title, choice: choice.label,
    meters: { approval: t.meters.approval, economy: t.meters.economy, unity: t.meters.unity }, seats: t.seats });

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
  /* roughly every third session a REAL by-election target comes up */
  var byel = (t.session % 3 === 0) ? G._oppByElectionEvent() : null;
  t.current = byel || G.govDraw();
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

/* government calls a snap election — available from session earlyElectionMinSession
   when approval >= earlyElectionApproval. A high-approval gamble: the country either
   rewards the boldness or punishes the hubris. */
G.canCallEarlyElection = function () {
  var t = G.term;
  if (!t || t.kind !== "govt" || t.over) return false;
  return t.session >= G.GOVCONFIG.earlyElectionMinSession &&
         t.meters.approval >= G.GOVCONFIG.earlyElectionApproval;
};
G.callEarlyElection = function () {
  var t = G.term; if (!G.canCallEarlyElection()) return null;
  var log = [{ text: "You call a snap election, betting the country is with you.", cls: "head" }];
  var bonus = Math.round((t.meters.approval - 48) / 4);
  if (bonus > 0) log.push({ text: "High approval heading in — the gamble looks good.", cls: "good" });
  t.over = true; t.outcome = "early"; t.fellSession = t.session;
  t.earlyBonus = bonus;
  log.push({ text: "Parliament is dissolved. The campaign begins.", cls: "good" });
  return { log: log, over: true, outcome: "early" };
};

/* a once-per-term national statement — PM addresses the nation directly.
   Costs nothing but the PM's oratory; used once. */
G.canGovStatement = function () {
  var t = G.term;
  return t && t.kind === "govt" && !t.over && !t.statementUsed;
};
G.govStatement = function () {
  var t = G.term; if (!G.canGovStatement()) return null;
  t.statementUsed = true;
  var log = [{ text: "You address the nation directly.", cls: "head" }];
  var stat = G.ministerStat("pm", "oratory");
  var p = 0.30 + (stat - 50) / 100 * 0.90;
  p = Math.max(0.10, Math.min(0.90, p));
  if (Math.random() < p) {
    var gain = Math.round(4 + (stat - 50) / 12);
    t.meters.approval = G._clampM(t.meters.approval + gain);
    t.meters.unity    = G._clampM(t.meters.unity + 4);
    log.push({ text: "✓ " + G.ministerName("pm") + " delivers. Approval +" + gain + ", party rallies.", cls: "good" });
    G.applyCareerEffect({ voteShift: 0.010, repShift: 4 });
  } else {
    var loss = Math.round(3 + (50 - stat) / 16);
    t.meters.approval = G._clampM(t.meters.approval - loss);
    log.push({ text: "✗ The address falls flat. Approval −" + loss + ". The speech writers are blamed.", cls: "bad" });
    G.applyCareerEffect({ voteShift: -0.006, repShift: -2 });
  }
  return { log: log, over: false, outcome: null };
};

/* a once-per-term opposition press conference — your leader sets the agenda.
   Used once; cannot be repeated. */
G.canOppPressConf = function () {
  var t = G.term;
  return t && t.kind === "opp" && !t.over && !t.pressConfUsed;
};
G.oppPressConference = function () {
  var t = G.term; if (!G.canOppPressConf()) return null;
  t.pressConfUsed = true;
  var log = [{ text: "You call a major press conference to set the national agenda.", cls: "head" }];
  var stat = G.ministerStat("pm", "oratory");
  var p = 0.30 + (stat - 50) / 100 * 0.90;
  p = Math.max(0.10, Math.min(0.90, p));
  if (Math.random() < p) {
    var mGain = Math.round(5 + (stat - 50) / 10);
    var aGain = Math.round(3 + (stat - 50) / 16);
    t.meters.economy = G._clampM(t.meters.economy + mGain);
    t.meters.approval = G._clampM(t.meters.approval + aGain);
    log.push({ text: "✓ " + G.ministerName("pm") + " dominates the news cycle. Momentum +" + mGain + ", Support +" + aGain + ".", cls: "good" });
    G.applyCareerEffect({ voteShift: 0.010, repShift: 4 });
  } else {
    t.meters.economy = G._clampM(t.meters.economy - 4);
    t.meters.unity   = G._clampM(t.meters.unity - 3);
    log.push({ text: "✗ The press conference stumbles. Awkward questions left unanswered; momentum stalls.", cls: "bad" });
    G.applyCareerEffect({ voteShift: -0.006, repShift: -2 });
  }
  return { log: log, over: false, outcome: null };
};

G.oppVerdict = function () {
  var t = G.term, m = t.meters;
  var totalSeats = (G.activeTotalSeats ? G.activeTotalSeats() : G.CONFIG.totalSeats);
  var seatScore = Math.max(0, Math.min(16, t.seats / totalSeats * 16));
  var raw = m.approval * 0.40 + m.economy * 0.30 + m.unity * 0.18 + seatScore;
  if (t.outcome === "forced")   raw += 10 + Math.round(((t.killQuality || 60) - 50) / 4);
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
