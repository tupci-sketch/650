/* =============================================================================
   650 — EXTRA GOVERNING EVENTS  (variety pack)
   Appends new "session issues" to the existing decks: the UK governing deck
   (G.EVENTS), the opposition deck (G.OPP_EVENTS), and every country deck in
   G.COUNTRY_EVENTS. Same shapes the term engine already consumes; a=approval,
   e=economy, u=unity; careerEffect.voteShift/repShift carry into the next
   election. Loaded after govern.intl.js, before ui.js.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;

  function gmb(stat, dept, sa, se, su, fa, fe, fu) {
    return { stat: stat, dept: dept, success: { a: sa, e: se, u: su }, fail: { a: fa, e: fe, u: fu } };
  }
  function ch(label, text, a, e, u, vote, rep, gamble, extra) {
    var c = { label: label, text: text, base: { a: a, e: e, u: u },
              careerEffect: { voteShift: vote, repShift: rep } };
    if (gamble) c.gamble = gamble;
    if (extra) {
      if (extra.axisDir)  c.axisDir = extra.axisDir;
      if (extra.resign)   c.resign = true;
      if (extra.blocShift) c.careerEffect.blocShift = extra.blocShift;
    }
    return c;
  }
  function ev(id, dept, title, icon, text, choices, axis) {
    var e = { id: id, dept: dept, title: title, icon: icon, text: text, choices: choices };
    if (axis) e.axis = axis;
    return e;
  }
  function add(arr, evs) { if (Array.isArray(arr)) evs.forEach(function (e) { arr.push(e); }); }

  /* ===================================================== UK — governing ===== */
  add(G.EVENTS, [
    ev("uk_water", "environment", "Rivers of Sewage", "🌊",
      "Water companies are dumping raw sewage into the rivers and the public is disgusted. Your Environment Secretary is in the firing line.",
      [ ch("Nationalise the failing firms", "Popular, expensive, and a fight with the City.", 6, -6, -2, 0.010, 2, gmb("statecraft","environment", 5,-2,2, -5,-5,-3)),
        ch("Hard fines and tough new limits", "Regulate hard without taking them over.", 3, -2, 0, 0.006, 3),
        ch("Trust the market to invest", "Let the companies fix it themselves.", -5, 2, -1, -0.008, -3) ], "climate"),
    ev("uk_boats", "home", "The Small Boats", "⚓",
      "Channel crossings hit a record. Your backbenches are split and the tabloids want blood.",
      [ ch("An offshore removals scheme", "Headline-grabbing, legally fraught.", 5, -3, -3, 0.012, -1, null, { axisDir:+1, blocShift:{ reform:+6, redwall:+4, urbanprog:-5 } }),
        ch("Smash the smuggling gangs", "Police and prosecutors, not planes.", 1, -1, 1, 0.004, 2, gmb("statecraft","home", 5,1,2, -5,-1,-3)),
        ch("Safe legal routes and fast processing", "Humane, and a gift to your critics.", -4, -1, 3, -0.008, 2, null, { axisDir:-1, blocShift:{ urbanprog:+5, students:+3, reform:-6 } }) ], "imm"),
    ev("uk_juniordoctors", "health", "The Doctors Walk Out", "✚",
      "Junior doctors begin the longest strike in NHS history. Operations are cancelled by the thousand.",
      [ ch("Meet them at the table", "Find the money and end it fast.", 5, -5, 1, 0.008, 3),
        ch("Split the difference on pay", "A deal nobody loves.", 1, -2, 1, 0.003, 1, gmb("partyMgmt","health", 4,1,3, -4,-2,-3)),
        ch("Face them down", "Refuse and dare them to escalate.", -6, 2, 2, -0.010, -4) ]),
    ev("uk_prisons", "justice", "Prisons at Bursting Point", "§",
      "The jails are full. Judges are being told there is nowhere to put the people they sentence.",
      [ ch("Emergency early-release scheme", "Free up cells and brace for the headlines.", -5, 1, -2, -0.008, -2),
        ch("A crash prison-building programme", "Concrete and time you may not have.", 2, -4, 0, 0.004, 2, gmb("statecraft","justice", 5,-2,1, -4,-4,-2)),
        ch("Tougher sentencing anyway", "Play to the gallery; store up trouble.", 3, -2, 1, 0.006, -1, null, { axisDir:+1 }) ], "crime"),
    ev("uk_socialcare", "health", "The Social Care Timebomb", "⌂",
      "Councils are going bust under care costs and a generation is trapped between ageing parents and their own kids.",
      [ ch("A funded national care service", "Bold, historic, and it must be paid for.", 6, -7, 2, 0.010, 4, gmb("statecraft","health", 7,-2,2, -6,-6,-3)),
        ch("A cap on care costs", "Cautious, defensible, half a solution.", 2, -2, 1, 0.004, 2),
        ch("Push it onto the councils", "Not your problem this year.", -4, 1, -2, -0.006, -3) ]),
    ev("uk_gilts", "chancellor", "The Markets Turn", "📉",
      "A nervous bond market sends gilt yields spiking. The pound wobbles and mortgages twitch.",
      [ ch("Reassure with an emergency statement", "Calm the markets with hard numbers.", 1, 4, 0, 0.004, 2, gmb("statecraft","chancellor", 3,8,1, -4,-10,-2)),
        ch("A U-turn on your fiscal plan", "Eat the humiliation to steady the ship.", -4, 5, -2, -0.006, 1),
        ch("Tough it out and blame speculators", "Hold the line and hope.", -3, -6, 1, -0.010, -3) ], "tax"),
    ev("uk_riots", "home", "Disorder on the Streets", "🔥",
      "A viral rumour sparks nights of rioting in several towns. The police are stretched to breaking.",
      [ ch("Flood the streets with police", "Order first; ask questions later.", 4, -2, 0, 0.008, 2, gmb("statecraft","home", 5,-1,3, -5,-2,-4)),
        ch("Swift courts and stiff sentences", "Make examples fast.", 3, -1, 1, 0.006, 1, null, { axisDir:+1 }),
        ch("Address the grievances behind it", "Look weak now to heal later.", -3, 0, 2, -0.006, 1) ], "crime"),
    ev("uk_farmers", "environment", "The Farmers Revolt", "🚜",
      "Tractors block Whitehall over subsidy cuts and cheap imports. Rural England is in open revolt.",
      [ ch("Restore the farm payments", "Buy peace in the shires.", 3, -4, 1, 0.006, 2, null, { blocShift:{ shires:+5, pensioners:+2 } }),
        ch("A grand food-security strategy", "Reframe it as national resilience.", 1, 0, 0, 0.004, 3, gmb("statecraft","environment", 4,3,1, -3,-3,-2)),
        ch("Hold firm on the reforms", "Modernise and take the hit.", -4, 3, -2, -0.008, -2) ]),
    ev("uk_ai", "business", "The Machines Take the Jobs", "🤖",
      "A wave of AI automation threatens millions of white-collar jobs. Nobody has done this before.",
      [ ch("Regulate hard and protect workers", "Slow it down, reassure the anxious.", 4, -3, 0, 0.008, 2, null, { blocShift:{ redwall:+3, students:+2 } }),
        ch("Go all-in as an AI superpower", "Bet the economy on being first.", 0, 6, 1, 0.006, 3, gmb("statecraft","business", 3,10,2, -5,-8,-4)),
        ch("Let it rip and retrain later", "Trust the market, brace the workforce.", -3, 3, -2, -0.006, -1) ]),
    ev("uk_union", "pm", "The Union Under Strain", "🏴",
      "A fresh independence surge tests the bonds of the United Kingdom. The nationalists smell their moment.",
      [ ch("Offer a new devolution settlement", "Hand powers away to hold it together.", 3, -2, 2, 0.006, 2, null, { blocShift:{ nationalist:+5 } }),
        ch("Make a positive case for the Union", "Argue, don't concede.", 1, 0, 1, 0.004, 2, gmb("oratory","pm", 5,0,3, -4,0,-3)),
        ch("Rule out any referendum flatly", "Deny them the vote and the oxygen.", -3, 1, -1, -0.006, -2) ]),
    ev("uk_lobbying", "whip", "A Lobbying Scandal", "💼",
      "A former minister is caught texting for a paycheque. The word 'sleaze' is back on every front page.",
      [ ch("Sacrifice the culprit publicly", "A clean kill to end the story.", 3, 0, -3, 0.004, 1, null, { resign:true }),
        ch("New rules on second jobs", "Reform your way out of it.", 2, -1, 1, 0.004, 2),
        ch("Circle the wagons", "Loyalty over optics, and the price of it.", -5, 0, 2, -0.010, -5) ])
  ]);

  /* ===================================================== UK — opposition ==== */
  if (G.OPP_EVENTS) add(G.OPP_EVENTS, [
    ev("opp_grid", "pm", "Grid a Government Blunder", "📰",
      "The government has fumbled a policy launch. There is a clean open goal in front of you.",
      [ ch("Go for the jugular at the despatch box", "Ruthless, and it could define the week.", 0,0,4, 0.010, 3, gmb("oratory","leader", 4,0,4, -4,0,-3)),
        ch("Offer a serious alternative", "Look like a government-in-waiting.", 0,0,2, 0.008, 4),
        ch("Let them keep digging", "Say little; let the story run.", 0,0,-1, 0.004, 1) ]),
    ev("opp_reshuffle", "pm", "Your Shadow Cabinet Sags", "♻",
      "Colleagues grumble your top team looks tired. A shadow reshuffle would signal renewal — or panic.",
      [ ch("A bold shadow reshuffle", "Fresh faces, fresh enemies.", 0,0,3, 0.006, 2, gmb("partyMgmt","leader", 4,0,5, -3,0,-6)),
        ch("Reward your loyalists", "Stability over spectacle.", 0,0,2, 0.002, 1),
        ch("Leave it be", "Project calm; risk looking stale.", 0,0,-1, -0.002, -1) ]),
    ev("opp_donor", "chancellor", "A Big Donor Comes Calling", "💷",
      "A wealthy backer offers a war chest — with strings, and a whiff of risk attached.",
      [ ch("Take the money, quietly", "Fund the fight; hope it stays quiet.", 0,0,1, 0.008, 1, gmb("statecraft","chancellor", 2,0,2, -6,0,-3)),
        ch("Publish everything up front", "Clean hands, smaller cheque.", 0,0,2, 0.004, 3),
        ch("Politely decline", "Principle over pounds.", 0,0,1, 0.0, 2) ]),
    ev("opp_movement", "home", "A Movement Adopts You", "✊",
      "A surging protest movement wants your endorsement. Their energy is real; so is their baggage.",
      [ ch("Embrace them on stage", "Ride the wave and own the risk.", 0,0,3, 0.010, 1, null, { blocShift:{ students:+5, urbanprog:+4 } }),
        ch("Warm words, careful distance", "Sympathy without the selfie.", 0,0,1, 0.004, 2),
        ch("Keep them at arm's length", "Protect the centre ground.", 0,0,-1, -0.004, 0) ]),
    ev("opp_defector", "whip", "A Defector Crosses the Floor", "🚪",
      "A disillusioned government MP offers to join you — a coup, or a Trojan horse.",
      [ ch("Welcome them with fanfare", "A symbolic win with a headline.", 0,0,3, 0.008, 3, gmb("partyMgmt","whip", 3,0,4, -4,0,-5)),
        ch("Accept them quietly", "Bank the vote, skip the circus.", 0,0,1, 0.004, 2),
        ch("Turn them away", "Purity over a headline.", 0,0,-2, -0.002, -1) ])
  ]);

  /* ================================================= COUNTRY DECKS (extra) == */
  var CE = G.COUNTRY_EVENTS || {};

  add(CE.usa, [
    ev("usa_filibuster", "whip", "The Filibuster Question", "▦",
      "Your signature bill is dead in the Senate unless you blow up the filibuster. Your own caucus is split.",
      [ ch("Go nuclear — kill the filibuster", "Ram it through and change the Senate forever.", 3,0,-4, 0.008, 1, gmb("partyMgmt","whip", 5,0,4, -7,0,-6)),
        ch("Carve out a narrow exception", "A precedent-setting compromise.", 1,0,-1, 0.004, 2),
        ch("Keep the rules, lose the bill", "Preserve the institution, pay the price.", -4,0,2, -0.006, 0) ]),
    ev("usa_fed", "chancellor", "The Fed Raises Rates", "📉",
      "The central bank hikes rates into a slowing economy. Wall Street cheers; Main Street groans.",
      [ ch("Publicly pressure the Fed", "Break the taboo and lean on them.", 2,-3,1, 0.004, -1),
        ch("Respect its independence", "Bite your tongue and take the hit.", -2,3,0, 0.004, 2),
        ch("A fiscal package to cushion it", "Spend to offset the squeeze.", 4,-4,0, 0.006, 2, gmb("statecraft","chancellor", 4,4,1, -4,-6,-2)) ]),
    ev("usa_midterms", "pm", "The Midterms Loom", "🗳",
      "Your party braces for a midterm shellacking. Every decision now is a campaign decision.",
      [ ch("Tack to the base", "Fire up the faithful and turn them out.", 3,0,3, 0.008, 1, null, { blocShift:{ maga:+4, urbanprog:+4 } }),
        ch("Court the swing suburbs", "Chase the moderates who decide it.", 2,0,-1, 0.006, 2, null, { blocShift:{ suburban:+5 } }),
        ch("Govern and hope", "Let the record speak; risk the losses.", -2,1,0, -0.004, 1) ])
  ]);

  add(CE.germany, [
    ev("de_energy", "business", "The Energy Shock", "⚡",
      "Gas supplies from the east are cut. Industry warns of shutdowns and a hard winter looms.",
      [ ch("Fire up the coal plants again", "Keep the lights on; anger the Greens.", 3,4,-3, 0.006, 1, null, { blocShift:{ green_urban:-5, afd_ost:+3 } }),
        ch("A massive price-cap subsidy", "Shield households, blow the budget.", 5,-6,1, 0.008, 3),
        ch("Accelerate the renewables build-out", "Turn crisis into transformation.", 1,-2,1, 0.004, 2, gmb("statecraft","business", 4,5,2, -4,-6,-3)) ]),
    ev("de_debtbrake", "chancellor", "The Debt Brake", "§",
      "The Schuldenbremse blocks the borrowing you need. Reforming it means a constitutional fight.",
      [ ch("Reform the debt brake", "Unlock investment; break a taboo.", 2,3,-2, 0.006, 2, gmb("statecraft","chancellor", 4,6,1, -5,-5,-4)),
        ch("Find creative off-budget funds", "Special vehicles the courts may strike down.", 0,2,-1, 0.002, 0),
        ch("Respect the brake, cut your plans", "Fiscal virtue, thinner ambition.", -3,4,1, -0.004, 1) ]),
    ev("de_farright", "home", "The AfD Surges", "▲",
      "The far right tops a regional poll for the first time. The 'firewall' against them is cracking.",
      [ ch("Hold the firewall absolutely", "Refuse all cooperation, whatever the cost.", 2,0,2, 0.004, 3, null, { blocShift:{ afd_ost:-4 } }),
        ch("Co-opt their hardest policies", "Steal their thunder; own the risk.", 1,0,-2, 0.006, -1, null, { axisDir:+1, blocShift:{ afd_ost:+3, green_urban:-4 } }),
        ch("Out-organise them on the ground", "Beat them at the doorstep.", 0,0,1, 0.004, 2, gmb("partyMgmt","whip", 4,0,3, -4,0,-4)) ])
  ]);

  add(CE.france, [
    ev("fr_493", "whip", "Article 49.3", "§",
      "You lack the votes. The constitution lets you force the bill through — and dare them to topple you.",
      [ ch("Invoke 49.3 and ram it through", "Govern by decree; invite the censure.", -3,2,-4, 0.004, 0, gmb("statecraft","pm", 4,2,3, -8,-2,-7)),
        ch("Water it down for the votes", "Trade ambition for a majority.", 1,-1,2, 0.004, 2),
        ch("Withdraw the bill", "Retreat and live to fight again.", -2,0,1, -0.004, 1) ]),
    ev("fr_banlieue", "home", "The Banlieues Erupt", "🔥",
      "A death in police custody sets the suburbs alight. Cars burn for a week of nights.",
      [ ch("A state of emergency", "Curfews and riot police.", 3,-2,-2, 0.006, -1, null, { axisDir:+1 }),
        ch("Reach out to community leaders", "Cool it with dialogue and money.", -2,-1,2, -0.004, 2, gmb("oratory","pm", 4,0,3, -5,0,-3)),
        ch("Promise reform of the police", "Concede to critics; anger the unions.", -1,0,1, -0.002, 1) ]),
    ev("fr_pension", "work", "Raise the Retirement Age", "⏳",
      "The pension maths no longer adds up. Raising the age means a million people in the streets.",
      [ ch("Push the reform through", "Fiscally right, politically radioactive.", -6,5,-3, 0.006, 1, gmb("statecraft","chancellor", 4,7,1, -8,-3,-5)),
        ch("A softer, phased version", "Half the fix, half the fury.", -2,2,0, 0.002, 1),
        ch("Drop it entirely", "Keep the peace, keep the deficit.", 4,-5,2, -0.006, 0) ]) ]);

  add(CE.india, [
    ev("in_farmlaws", "environment", "The Farm Laws Revolt", "🚜",
      "Hundreds of thousands of farmers ring the capital in protest at your agricultural reforms.",
      [ ch("Repeal the laws", "A humbling retreat that buys peace.", 3,-3,1, 0.006, 2, null, { blocShift:{ farmers_in:+6 } }),
        ch("Negotiate amendments", "Concede detail, keep the frame.", 1,-1,1, 0.004, 2, gmb("statecraft","environment", 4,2,2, -4,-3,-3)),
        ch("Hold firm on reform", "Modernise and face them down.", -5,4,-2, -0.008, -2) ]),
    ev("in_river", "environment", "The Monsoon Fails", "🌧",
      "A failed monsoon threatens the harvest across the north. Water wars flare between states.",
      [ ch("A massive relief and irrigation push", "Spend big to save the season.", 5,-5,1, 0.008, 3),
        ch("Broker a river-sharing pact", "Knock heads between the states.", 1,0,2, 0.004, 2, gmb("statecraft","pm", 4,1,3, -4,-2,-3)),
        ch("Leave it to the states", "Devolve the blame and the bill.", -4,1,-2, -0.006, -2) ]),
    ev("in_language", "culture", "The Language Question", "🗣",
      "A push to promote Hindi enrages the southern states, who see it as northern imposition.",
      [ ch("Champion linguistic pluralism", "Reassure the south; irk the base.", 1,0,2, 0.004, 2, null, { blocShift:{ south_reg:+5, hindutva:-3 } }),
        ch("Press ahead with Hindi", "Play to the heartland.", 2,0,-3, 0.006, -1, null, { blocShift:{ hindutva:+4, south_reg:-6 } }),
        ch("Quietly shelve the plan", "Duck the fight for now.", -1,0,1, -0.002, 0) ]) ]);

  add(CE.japan, [
    ev("jp_demographics", "health", "The Demographic Cliff", "⏳",
      "Deaths outnumber births by half a million a year. The workforce is vanishing.",
      [ ch("Open the door to migrant labour", "Fill the jobs; break a taboo.", 1,4,-3, 0.006, 1, null, { axisDir:-1 }),
        ch("A huge childcare and birth package", "Pay families to have children.", 4,-5,1, 0.008, 3, gmb("statecraft","health", 4,3,2, -4,-5,-3)),
        ch("Automate the shortage away", "Robots over immigrants.", 0,3,0, 0.004, 2) ]),
    ev("jp_article9", "defence", "Rearming Japan", "⚔",
      "Rising regional threats revive the debate over Article 9 and a real military.",
      [ ch("Push to revise the constitution", "Historic, divisive, generational.", 1,-2,-2, 0.006, 1, gmb("oratory","pm", 4,-1,3, -6,-2,-5)),
        ch("Boost defence within the rules", "Spend more, change nothing on paper.", 2,-3,1, 0.006, 2),
        ch("Hold to pacifism", "Keep the postwar settlement.", -1,1,1, -0.004, 0) ]),
    ev("jp_boj", "chancellor", "The Yen Collapses", "💴",
      "The yen slides to historic lows. Importers scream; exporters cheer; the Bank of Japan dithers.",
      [ ch("Intervene to prop up the yen", "Burn reserves to defend the currency.", 2,-2,0, 0.004, 1, gmb("statecraft","chancellor", 3,5,1, -4,-6,-2)),
        ch("Let it fall and back exporters", "Ride the weak yen for growth.", -2,4,0, 0.004, 1),
        ch("Pressure the BOJ to hike", "End the cheap-money era.", 0,-1,-1, -0.002, 0) ]) ]);

  add(CE.australia, [
    ev("au_voice", "culture", "A Referendum Beckons", "🗳",
      "A national referendum on Indigenous recognition divides the country down the middle.",
      [ ch("Campaign hard for Yes", "Spend capital on a cause you believe in.", 2,0,1, 0.006, 2, gmb("oratory","pm", 5,0,3, -6,0,-4), { blocShift:{ inner_metro:+5, battlers:-3 } }),
        ch("Stay studiously neutral", "Let the people decide, dodge the blame.", -1,0,0, 0.0, 0),
        ch("Quietly back No", "Side with the sceptics.", 1,0,-2, 0.004, -1, null, { blocShift:{ battlers:+3, inner_metro:-5 } }) ]),
    ev("au_china", "foreign", "Beijing Freezes You Out", "⚖",
      "China slaps tariffs on your wine, barley and coal in a diplomatic deep freeze.",
      [ ch("Stand firm and diversify trade", "Take the pain; find new buyers.", 2,-4,2, 0.006, 3, gmb("statecraft","foreign", 4,4,2, -3,-6,-2)),
        ch("Seek a quiet reconciliation", "Mend fences for the sake of exports.", 1,3,-1, 0.004, 1),
        ch("Rally the region against Beijing", "Lead a coalition of the wary.", 3,-2,1, 0.006, 2) ]),
    ev("au_fires", "environment", "Black Summer", "🔥",
      "Catastrophic bushfires ring the cities in smoke. The climate argument is literally in the air.",
      [ ch("Lead a huge federal response", "Be everywhere; spend what it takes.", 6,-5,1, 0.010, 3),
        ch("Announce serious climate action", "Turn the disaster into a mandate.", 3,-2,-1, 0.006, 2, null, { blocShift:{ inner_metro:+5, teal:+4, mining:-4 } }),
        ch("Downplay the climate link", "Protect the coal jobs and the base.", -3,1,1, -0.006, -1, null, { blocShift:{ mining:+4, inner_metro:-5 } }) ]) ]);

  add(CE.canada, [
    ev("ca_pipeline", "environment", "The Pipeline Fight", "🛢",
      "A pipeline pits Alberta's oil jobs against BC's coast and a wall of protest.",
      [ ch("Approve it and buy the peace", "Jobs now; the activists howl.", 2,4,-3, 0.006, 1, null, { blocShift:{ prairie:+5, urban_prog:-5 } }),
        ch("Kill it on environmental grounds", "Green credentials; western fury.", 1,-4,-2, 0.004, 1, null, { blocShift:{ urban_prog:+5, prairie:-6 } }),
        ch("Approve with strict conditions", "Thread the needle and hope it holds.", 0,1,0, 0.004, 2, gmb("statecraft","environment", 3,3,2, -4,-4,-4)) ]),
    ev("ca_quebec", "justice", "Québec Flexes", "⚜",
      "Québec invokes the notwithstanding clause over a divisive law. Ottawa's authority is on the line.",
      [ ch("Challenge it in the courts", "Defend the Charter; provoke a crisis.", 1,0,-3, 0.004, 1, gmb("statecraft","justice", 4,0,2, -5,0,-5)),
        ch("Respect provincial jurisdiction", "Keep the peace; disappoint your base.", -1,0,2, -0.002, 0, null, { blocShift:{ quebec_nat:+5 } }),
        ch("Negotiate a face-saving deal", "Quiet diplomacy over confrontation.", 1,0,1, 0.004, 2) ]),
    ev("ca_healthcare", "health", "Medicare Cracks", "✚",
      "Emergency rooms close and wait times explode. The provinces demand billions more from Ottawa.",
      [ ch("A big new health transfer", "Open the federal wallet.", 5,-6,1, 0.008, 3),
        ch("Money with strings attached", "Fund it, but demand reform.", 2,-3,0, 0.004, 2, gmb("statecraft","health", 4,2,1, -3,-4,-3)),
        ch("Tell the provinces to manage", "Hold the purse; wear the blame.", -4,2,-2, -0.006, -2) ]) ]);

  if (typeof console !== "undefined" && console.log) {
    console.log("[gov events] +UK " + 11 + " +OPP " + 5 + " +country decks");
  }
})();
