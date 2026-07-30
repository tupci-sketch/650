/* =============================================================================
   650 — CONTROLLER  (v2)
   Reads the setup screen, drives the draft via the engine, runs the seat-by-seat
   count, and repaints through G.UI. The only file that holds the wires.
   ========================================================================== */

(function () {
  "use strict";

  var sel = function (id) { return document.getElementById(id); };
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };
  function setSel(rowId, attr, val) { var row = sel(rowId); if (!row) return; each(row.querySelectorAll("[" + attr + "]"), function (b) { b.classList.toggle("sel", b.getAttribute(attr) === val); }); }
  function isRankedSetup() { return choice.mode === "wildcard" && choice.difficulty === "hard" && choice.cabinetSize === "expanded"; }
  function updateEligibility() {
    var b = sel("lbEligBadge"); if (!b) return;
    if (isRankedSetup()) { b.textContent = "\uD83C\uDFC6 Leaderboard-eligible \u2014 this is the ranked mode (Wildcard \u00b7 Hard \u00b7 Expanded)."; b.className = "elig-badge ok"; }
    else { b.textContent = "Not ranked \u2014 only Wildcard \u00b7 Hard \u00b7 Expanded counts on the global board. You'll still get a personal board, and can post for fun."; b.className = "elig-badge"; }
  }
  function setLbBtns(disabled, label) { ["resultLbBtn", "legacyLbBtn"].forEach(function (id) { var b = sel(id); if (!b) return; b.disabled = !!disabled; if (label) b.textContent = label; }); }

  /* setup selections (defaults match the .sel buttons in the markup) */
  var choice = { country: "uk", mode: "unity", lineage: null, eras: [], difficulty: "normal",
                 hard: false, govern: true, watch: true, speed: "normal",
                 redos: 1, cabinetSize: "standard", policy: false, campaignOn: false,
                 casts: { insider: true, novelty: false },
                 partyName: "", partyAlign: "centre", partyColour: "",
                 careerMode: false, scenarioKey: "freshstart" };

  var lastResult = null;   // kept for re-run / download / copy
  var watch = null;        // live-count animation state
  var currentVerdict = null; // last governing verdict (for sharing)
  var submitting = false;    // guard against double-submit while a post is in flight
  var _saveTimer = null;     // debounce for cloud auto-save

  /* ---- country data -------------------------------------------------------- */
  var COUNTRIES = [
    { key:"uk", flag:"🇬🇧", name:"United Kingdom",  defaultScenario:"freshstart",
      subSystems: null },
    { key:"us", flag:"🇺🇸", name:"United States",   defaultScenario:"usa_ec_2024",
      subSystems:[
        { label:"Presidential Electoral College", note:"538 electors", scenario:"usa_ec_2024"  },
        { label:"House of Representatives",       note:"435 seats",    scenario:"usa_house_2024" }
      ]},
    { key:"de", flag:"🇩🇪", name:"Germany",         defaultScenario:"bundestag_2021",
      subSystems:[
        { label:"Modern Bundestag",  note:"736 seats", scenario:"bundestag_2021"   },
        { label:"Weimar Republic",   note:"577 seats", scenario:"weimar_1932_jul"  }
      ]},
    { key:"fr", flag:"🇫🇷", name:"France",          defaultScenario:"france_2022",   subSystems:null },
    { key:"au", flag:"🇦🇺", name:"Australia",       defaultScenario:"australia_2022",subSystems:null },
    { key:"ca", flag:"🇨🇦", name:"Canada",          defaultScenario:"canada_2021",   subSystems:null },
    { key:"jp", flag:"🇯🇵", name:"Japan",           defaultScenario:"japan_2021",    subSystems:null },
    { key:"in", flag:"🇮🇳", name:"India",           defaultScenario:"india_2024",    subSystems:null },
    { key:"cn", flag:"🇨🇳", name:"China",           defaultScenario:"china",         subSystems:null },
    { key:"kp", flag:"🇰🇵", name:"North Korea",     defaultScenario:"north_korea",   subSystems:null },
    { key:"su", flag:"🚩",  name:"Soviet Union",    defaultScenario:"soviet_1937",   subSystems:null },
    { key:"cu", flag:"🇨🇺", name:"Cuba",            defaultScenario:"cuba",          subSystems:null }
  ];

  /* era label overrides per country (same era IDs, country-appropriate names) */
  var COUNTRY_ERA_LABELS = {
    us: { e0:"Colonial & Early Republic", e1:"Jacksonian to Gilded Age", e2:"Progressive Era",
          e3:"New Deal & World War II", e4:"Civil Rights Era", e5:"Reagan Revolution",
          e6:"Bush to Obama", e7:"Trump to Biden" },
    de: { e0:"Holy Roman Empire & Prussia", e1:"Kaiserreich (German Empire)", e2:"Late Wilhelmine Era",
          e3:"Weimar Republic & Third Reich", e4:"Divided Germany (FRG/GDR)", e5:"Reunification Era",
          e6:"Berlin Republic", e7:"Contemporary Germany" },
    fr: { e0:"Ancien Régime & Revolution", e1:"Second Empire & Third Republic", e2:"Belle Époque",
          e3:"World Wars", e4:"Fourth & Fifth Republic", e5:"Mitterrand to Chirac",
          e6:"Sarkozy & Hollande", e7:"Macron Era" },
    au: { e0:"Colonial Era", e1:"Federation & Pioneers", e2:"Federation to WWI",
          e3:"World Wars & Depression", e4:"Postwar Boom", e5:"Fraser · Hawke · Keating",
          e6:"Howard to Rudd & Gillard", e7:"Abbott to Albanese" },
    ca: { e0:"Colonial & Confederation", e1:"Macdonald Era", e2:"Laurier Era",
          e3:"World Wars & Depression", e4:"Diefenbaker to Trudeau Sr", e5:"Mulroney Era",
          e6:"Chrétien to Martin", e7:"Harper to Trudeau Jr" },
    jp: { e0:"Edo Period", e1:"Meiji Era", e2:"Taishō Era",
          e3:"Imperial Japan & World War II", e4:"Postwar Recovery & LDP", e5:"Bubble Economy",
          e6:"Koizumi to DPJ", e7:"Abe to Contemporary" },
    in: { e0:"Mughal & Colonial Period", e1:"British Raj", e2:"Independence Movement",
          e3:"WWII & Partition", e4:"Nehru Era", e5:"Indira to Rajiv Gandhi",
          e6:"Coalition Era (NDA/UPA)", e7:"Modi Era" },
    cn: { e0:"Late Qing Dynasty", e1:"Reform & Republic", e2:"Republic of China",
          e3:"Warlords, Republic & World War", e4:"Early PRC & Mao Era", e5:"Reform & Opening Up",
          e6:"Jiang & Hu Era", e7:"Xi Jinping Era" },
    kp: { e0:"Joseon Dynasty", e1:"Joseon Late Period", e2:"Japanese Occupation",
          e3:"Liberation & Division", e4:"Kim Il-sung Era", e5:"Juche Consolidation",
          e6:"Kim Jong-il Era", e7:"Kim Jong-un Era" },
    su: { e0:"Tsarist Russia", e1:"Late Tsarist Era", e2:"Revolution & Civil War",
          e3:"Stalin Era", e4:"Khrushchev & Brezhnev", e5:"Late Cold War",
          e6:"Gorbachev & Dissolution", e7:"Post-Soviet Era" },
    cu: { e0:"Spanish Colony", e1:"Wars of Independence", e2:"Early Republic",
          e3:"Revolution & WWII", e4:"Castro Era", e5:"Special Period",
          e6:"Raúl Castro", e7:"Post-Castro Era" }
  };

  function applyCountryChoice(countryKey) {
    choice.country = countryKey;
    var def = COUNTRIES.filter(function (c) { return c.key === countryKey; })[0];
    if (!def) return;
    /* set default scenario for the country — scenarios step can refine it */
    choice.scenarioKey = def.defaultScenario;
    /* show sub-system picker if this country has multiple systems */
    var sub = sel("countrySubSys");
    if (sub) {
      if (def.subSystems && def.subSystems.length) {
        sub.innerHTML = def.subSystems.map(function (s, i) {
          var sel2 = (i === 0) ? " sel" : "";
          return '<button class="subsys-btn' + sel2 + '" data-sub-scenario="' + s.scenario + '">' +
                 s.label + ' <small>(' + s.note + ')</small></button>';
        }).join("");
        sub.classList.add("show");
        /* wire sub-system clicks */
        each(sub.querySelectorAll(".subsys-btn"), function (btn) {
          btn.onclick = function () {
            choice.scenarioKey = btn.getAttribute("data-sub-scenario");
            each(sub.querySelectorAll(".subsys-btn"), function (b) { b.classList.toggle("sel", b === btn); });
          };
        });
      } else {
        sub.innerHTML = "";
        sub.classList.remove("show");
      }
    }
    /* update scenario picker filter label */
    var lbl = sel("scenarioCountryLabel");
    var cf = def.flag + " " + def.name + " ";
    if (lbl) lbl.textContent = "— " + cf;
    /* re-render scenario picker filtered to this country */
    if (G.UI && G.UI.renderScenarioPicker) G.UI.renderScenarioPicker(choice.scenarioKey, countryKey);
    /* rebuild step-2 mode options for this country */
    updateModeStep(countryKey);
  }

  /* ---- update step-2 mode buttons based on chosen country ----- */
  function updateModeStep(countryKey) {
    var isUK = !countryKey || countryKey === "uk";
    var modeRow = sel("modeRow");
    var step2   = sel("wstep-2");
    if (!modeRow || !step2) return;
    var labelEl  = step2.querySelector(".section-label");
    var wildNote = sel("wildNote");
    if (isUK) {
      modeRow.className = "choice-row quad";
      modeRow.innerHTML =
        '<button class="opt sel" data-mode="unity"><h4>Greatest Cabinet</h4>' +
          '<p>A national-unity ticket. Draft the best of every party and era. Stands in all 650 seats.</p></button>' +
        '<button class="opt" data-mode="dynasty"><h4>Single-Party Dynasty</h4>' +
          '<p>Pick one tradition and build a cabinet only from its ranks, across the decades.</p></button>' +
        '<button class="opt" data-mode="wildcard"><h4>Wildcard ⚡</h4>' +
          '<p>The whole globe and all of history walk in — presidents, founders, despots. For political nerds only.</p></button>' +
        '<button class="opt" data-mode="parl2024"><h4>2024 Parliament 🗳</h4>' +
          '<p>Draft from the 2024 general-election field — the current House of Commons.</p></button>';
      if (labelEl) labelEl.textContent = "2 · Choose your game";
      if (wildNote) wildNote.textContent = "Wildcard is satire — a rogues’ gallery, not an endorsement. Figures responsible for atrocities are included as historical fact, flagged plainly, and their disastrous records keep them poor picks. UK figures appear in every mode; the rest are wildcard-only.";
      WSTEP_TITLES[1] = "Choose your game";
    } else {
      var countryDef = COUNTRIES.filter(function (c) { return c.key === countryKey; })[0];
      var cname = countryDef ? countryDef.name : "your nation";
      modeRow.className = "choice-row triple";
      modeRow.innerHTML =
        '<button class="opt sel" data-mode="unity"><h4>Historical Cabinet</h4>' +
          '<p>Build ' + cname + '’s dream government from across its political history.</p></button>' +
        '<button class="opt" data-mode="dynasty"><h4>Political Dynasty</h4>' +
          '<p>Pick one party tradition and staff your cabinet only from its ranks, through the decades.</p></button>' +
        '<button class="opt" data-mode="wildcard"><h4>Global Wildcard</h4>' +
          '<p>The whole world walks in — field the greatest minds from any era, any nation.</p></button>';
      if (labelEl) labelEl.textContent = "2 · Build your government";
      if (wildNote) wildNote.textContent = "Wildcard is satire — a rogues’ gallery, not an endorsement. Despots and controversial figures are included as historical fact and are poor picks. Your chosen country’s politicians appear in every mode; the rest are global wildcard-only.";
      WSTEP_TITLES[1] = "Build your government";
      choice.mode = "unity";
    }
    bindRow("modeRow", "data-mode", applyModeChoice);
    applyModeChoice(choice.mode);
    var titleEl = sel("wizardStepTitle");
    if (titleEl && wizardStep === 2) titleEl.textContent = WSTEP_TITLES[1];
  }

  /* ---- setup wizard -------------------------------------------------------- */
  var wizardStep = 1;
  var WSTEP_TITLES = ["Choose your nation", "Choose your game", "Who's in the pool",
                      "Election difficulty", "Draft rules", "After the election",
                      "Career mode", "Ready to play"];
  /* ---- cloud save / restore ------------------------------------------------ */
  function buildSaveSnapshot(screenTag) {
    if (!G.state) return null;
    var cab = {};
    Object.keys(G.state.cabinet || {}).forEach(function (k) {
      var p = G.state.cabinet[k]; if (p) cab[k] = p.name;
    });
    return {
      version: 1, ts: Date.now(), screen: screenTag || "draft",
      career: G.career ? JSON.parse(JSON.stringify(G.career)) : null,
      state: {
        mode: G.state.mode, lineage: G.state.lineage || null,
        eras: (G.state.eras || []).slice(), difficulty: G.state.difficulty,
        govern: G.state.govern, watch: G.state.watch,
        cabinetSize: G.state.cabinetSize,
        custom: G.state.custom ? JSON.parse(JSON.stringify(G.state.custom)) : null,
        alignValue: G.state.alignValue,
        casts: JSON.parse(JSON.stringify(G.state.casts || { insider: true, novelty: false })),
        policyOn: G.state.policyOn, campaignOn: G.state.campaignOn,
        scenarioKey: G.state.scenarioKey || null,
        gameYear: G.state.gameYear || 2026,
        policy: G.state.policy ? JSON.parse(JSON.stringify(G.state.policy)) : null,
        campaignOutputs: G.state.campaignOutputs ? JSON.parse(JSON.stringify(G.state.campaignOutputs)) : null,
        cabinetNames: cab
      }
    };
  }

  function autoSave(screenTag) {
    /* Local save works for everyone; the cloud sync (inside NET.saveGame) only
       fires when signed in. No longer gated on being logged in. */
    if (!G.NET || !G.state) return;
    if (_saveTimer) { clearTimeout(_saveTimer); _saveTimer = null; }
    _saveTimer = setTimeout(function () {
      _saveTimer = null;
      var snap = buildSaveSnapshot(screenTag);
      if (!snap) return;
      G.NET.saveGame(snap);
      var b = sel("saveBadge");
      if (b) { b.style.display = ""; setTimeout(function () { b.style.display = "none"; }, 2500); }
    }, 800);
  }

  /* immediate (non-debounced) save — used when leaving the game via the logo */
  function autoSaveNow(screenTag) {
    if (!G.NET || !G.state) return;
    var snap = buildSaveSnapshot(screenTag);
    if (snap) G.NET.saveGame(snap);
  }

  /* the gameplay screens a live game can be resumed to */
  var GAMEPLAY_SCREENS = {
    "screen-draft": 1, "screen-watch": 1, "screen-result": 1, "screen-govern": 1,
    "screen-coalition": 1, "screen-policy": 1, "screen-campaign": 1,
    "screen-retirement": 1, "screen-legacy": 1
  };
  var activeGameScreen = null;   // last gameplay screen shown (in-memory resume)

  function tryRestoreGame(snap) {
    if (!snap || !snap.state) return;
    var card = sel("continueCard"); if (!card) return;
    var car = snap.career, st = snap.state;
    var info = [];
    if (car && car.parliament > 1) {
      var _termLabels = G.UI && G.UI.sysLabels ? G.UI.sysLabels(st._electoralSystemKey) : { termWord: "Parliament" };
      info.push(_termLabels.termWord + " " + car.parliament);
    }
    var modeMap = { unity: "Greatest Cabinet", wildcard: "Wildcard", dynasty: "Dynasty", parl2024: "2024 Parliament" };
    info.push(modeMap[st.mode] || st.mode);
    info.push(((st.difficulty || "normal").charAt(0).toUpperCase() + (st.difficulty || "normal").slice(1)));
    if (st.scenarioKey && st.scenarioKey !== "freshstart") {
      var sc = G.SCENARIOS && G.SCENARIOS.filter(function (s) { return s.key === st.scenarioKey; })[0];
      info.push(sc ? sc.name : st.scenarioKey.replace(/_/g, " "));
    }
    var ago = "";
    if (snap.ts) {
      var diff = Math.floor((Date.now() - snap.ts) / 60000);
      if (diff < 2) ago = "just now";
      else if (diff < 60) ago = diff + "m ago";
      else if (diff < 1440) ago = Math.floor(diff / 60) + "h ago";
      else ago = Math.floor(diff / 1440) + "d ago";
    }
    var screenMap = { result: "Election result", govern: "After governing", draft: "Mid-draft", retirement: "Between parliaments" };
    var atLabel = (screenMap[snap.screen] || "Saved game") + (ago ? " · " + ago : "");
    var numMins = Object.keys(st.cabinetNames || {}).length;
    if (numMins) atLabel += " · " + numMins + " ministers";
    card.innerHTML =
      '<div class="cont-body">' +
        '<p class="cont-label">Continue where you left off</p>' +
        '<p class="cont-desc">' + G.UI._esc(info.join(" · ")) + '</p>' +
        '<p class="cont-at">' + G.UI._esc(atLabel) + '</p>' +
      '</div>' +
      '<div class="cont-btns">' +
        '<button class="btn btn-primary" id="continueBtn">Continue →</button>' +
        '<button class="link-btn cont-dismiss" id="continueDismiss">Dismiss</button>' +
      '</div>';
    card.style.display = "";
    var btn = sel("continueBtn");
    if (btn) btn.onclick = function () { card.style.display = "none"; restoreFromSave(snap); };
    var dis = sel("continueDismiss");
    if (dis) dis.onclick = function () { card.style.display = "none"; if (G.NET) G.NET.clearGame(); };
  }

  /* Splash "session" card: prefer resuming the live in-memory game exactly where
     you left it; otherwise offer to restore the most recent saved game (cloud
     when signed in, else the local slot). Called on boot and whenever we return
     to the menu. */
  function showSessionCard() {
    var card = sel("continueCard"); if (!card) return;
    if (activeGameScreen && G.state) { renderResumeCard(card); return; }
    var snap = (G.NET && G.NET.bestSave) ? G.NET.bestSave() : null;
    if (snap) tryRestoreGame(snap); else card.style.display = "none";
  }

  function renderResumeCard(card) {
    var st = G.state;
    var modeMap = { unity: "Greatest Cabinet", wildcard: "Wildcard", dynasty: "Dynasty", parl2024: "2024 Parliament" };
    var bits = [];
    if (G.career && G.career.parliament > 1) {
      var tl = G.UI && G.UI.sysLabels ? G.UI.sysLabels(st._electoralSystemKey) : { termWord: "Parliament" };
      bits.push(tl.termWord + " " + G.career.parliament);
    }
    bits.push(modeMap[st.mode] || st.mode);
    bits.push((st.difficulty || "normal").charAt(0).toUpperCase() + (st.difficulty || "normal").slice(1));
    if (st.scenarioKey && st.scenarioKey !== "freshstart") {
      var sc = G.SCENARIOS && G.SCENARIOS.filter(function (s) { return s.key === st.scenarioKey; })[0];
      bits.push(sc ? sc.name : st.scenarioKey.replace(/_/g, " "));
    }
    var screenMap = {
      "screen-draft": "Building your cabinet", "screen-watch": "Election night",
      "screen-result": "Election result", "screen-govern": "In government",
      "screen-coalition": "Coalition talks", "screen-policy": "Writing the manifesto",
      "screen-campaign": "On the campaign trail", "screen-retirement": "Between parliaments",
      "screen-legacy": "Your legacy"
    };
    card.innerHTML =
      '<div class="cont-body">' +
        '<p class="cont-label">Game in progress</p>' +
        '<p class="cont-desc">' + G.UI._esc(bits.join(" · ")) + '</p>' +
        '<p class="cont-at">' + G.UI._esc(screenMap[activeGameScreen] || "In play") + '</p>' +
      '</div>' +
      '<div class="cont-btns">' +
        '<button class="btn btn-primary" id="resumeBtn">Resume game →</button>' +
        '<button class="link-btn cont-dismiss" id="resumeNewBtn">Start a new game instead</button>' +
      '</div>';
    card.style.display = "";
    var rb = sel("resumeBtn");
    if (rb) rb.onclick = function () { card.style.display = "none"; G.UI.show(activeGameScreen); };
    var nb = sel("resumeNewBtn");
    if (nb) nb.onclick = function () { card.style.display = "none"; };
  }

  function restoreFromSave(snap) {
    if (!snap || !snap.state) return;
    var st = snap.state;
    if (snap.career) G.career = snap.career;
    /* rebuild carryOver from saved cabinet names */
    var carryOver = {};
    Object.keys(st.cabinetNames || {}).forEach(function (pKey) {
      var name = st.cabinetNames[pKey];
      var pol = G.POLITICIANS ? G.POLITICIANS.filter(function (p) { return p.name === name; })[0] : null;
      if (pol) carryOver[pKey] = pol;
    });
    G.newGame({
      mode: st.mode, lineage: st.lineage || null, eras: st.eras || [],
      difficulty: st.difficulty || "normal", govern: st.govern !== false,
      watch: st.watch !== false, cabinetSize: st.cabinetSize || "standard",
      custom: st.custom || null, casts: st.casts || { insider: true, novelty: false },
      policyOn: st.policyOn || false, campaignOn: st.campaignOn || false,
      scenarioKey: st.scenarioKey || null, gameYear: st.gameYear || 2026,
      carryOver: carryOver
    });
    if (st.scenarioKey && G.applyScenario) {
      G.applyScenario(st.scenarioKey);
      G.state.gameYear = st.gameYear || 2026;
    }
    /* fill any cabinet slots not covered by carryOver */
    Object.keys(st.cabinetNames || {}).forEach(function (pKey) {
      if (!G.state.cabinet[pKey]) {
        var name = st.cabinetNames[pKey];
        var pol = G.POLITICIANS ? G.POLITICIANS.filter(function (p) { return p.name === name; })[0] : null;
        if (pol) { G.state.cabinet[pKey] = pol; G.state.draftedNames[pol.name] = pKey; }
      }
    });
    if (st.policy) G.state.policy = st.policy;
    if (st.campaignOutputs) G.state.campaignOutputs = st.campaignOutputs;
    G.UI.show("screen-draft");
    G.UI.renderDraft();
  }

  function updateReadySummary() {
    var el = sel("readySummary"); if (!el) return;
    var countryDef = COUNTRIES.filter(function (c) { return c.key === choice.country; })[0];
    var countryStr = countryDef ? countryDef.flag + " " + countryDef.name : "United Kingdom";
    var modeLabels = {
      unity: "Greatest Cabinet", wildcard: "Wildcard", parl2024: "2024 Parliament",
      dynasty: "Single-Party Dynasty" + (choice.lineage ? " · " + choice.lineage : "")
    };
    var lines = [
      "<b>Nation:</b> " + countryStr,
      "<b>Game:</b> " + (modeLabels[choice.mode] || choice.mode),
      "<b>Difficulty:</b> " + choice.difficulty.charAt(0).toUpperCase() + choice.difficulty.slice(1),
      "<b>Cabinet:</b> " + (choice.cabinetSize === "expanded" ? "Expanded (16)" : "Standard (12)") + (choice.policy ? " · policy phase on" : ""),
      "<b>After election:</b> " + (choice.govern ? "Win and govern (up to 14 sessions)" : "Result only"),
      "<b>Run:</b> " + (choice.careerMode ? "Career mode — cabinet carries over between parliaments" : "Single election")
    ];
    el.innerHTML = lines.map(function (l) { return "<p>" + l + "</p>"; }).join("");
  }
  function goWizardStep(n) {
    var prevEl = sel("wstep-" + wizardStep);
    if (prevEl) prevEl.classList.remove("wactive");
    wizardStep = Math.max(1, Math.min(8, n));
    var nextEl = sel("wstep-" + wizardStep);
    if (nextEl) nextEl.classList.add("wactive");
    each(document.querySelectorAll(".wp-dot"), function (dot) {
      var s = parseInt(dot.getAttribute("data-step"), 10);
      dot.classList.toggle("wactive", s === wizardStep);
      dot.classList.toggle("wdone", s < wizardStep);
    });
    var titleEl = sel("wizardStepTitle");
    if (titleEl) titleEl.textContent = WSTEP_TITLES[wizardStep - 1] || "";
    var backBtn = sel("wstepBackBtn"), nextBtn = sel("wstepNextBtn");
    if (backBtn) backBtn.style.display = wizardStep === 1 ? "none" : "";
    if (nextBtn) { nextBtn.style.display = wizardStep === 8 ? "none" : ""; nextBtn.textContent = "Continue →"; }
    if (wizardStep === 8) { updateReadySummary(); updateHint(); }
    var top = sel("screen-menu"); if (top) top.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------------------------------------------------------------- boot -- */
  function boot() {
    /* record the last gameplay screen so the logo/menu can offer an in-place
       "Resume game" without rebuilding or losing state */
    if (G.UI && G.UI.show && !G.UI._showWrapped) {
      var _origShow = G.UI.show;
      G.UI.show = function (id) { if (GAMEPLAY_SCREENS[id]) activeGameScreen = id; return _origShow.apply(this, arguments); };
      G.UI._showWrapped = true;
    }
    sel("metaCount").textContent = G.POLITICIANS.length;
    sel("metaEras").textContent = G.ERAS.filter(function (e) { return !e.wildOnly; }).length;
    if (sel("metaSystems") && G.ELECTORAL_SYSTEMS) sel("metaSystems").textContent = Object.keys(G.ELECTORAL_SYSTEMS).length;
    if (sel("metaScenarios") && G.SCENARIOS) sel("metaScenarios").textContent = G.SCENARIOS.length;
    buildEraToggles(true);
    buildCastToggles();
    buildDynastyChips();
    wireSetup();
    wirePartySetup();
    wireDraft();
    wireWatch();
    wireResult();
    wireAbout();
    wireGovern();
    wireCoalition();
    wirePolicy();
    wireCampaign();
    wireExplore();
    wireLeaderboard();
    wireRetirement();
    wireLegacyCareer();
    wirePlatform();
    renderRecords();
    sel("homeLink").onclick = goMenu;
    if (G.buildGeo) G.buildGeo();
    sel("exploreBtn").onclick = function () {
      var s = sel("exploreSearch"); if (s) s.value = "";
      G.UI.renderExplore(); G.UI.filterExplore("");
    };
    updateHint();
    updateEligibility();
    updateEraVisibility();
    if (G.NET) {
      G.NET.onAuth = function (me) {
        G.UI.applyAuth(me); updateLbWho();
        /* surface a saved game (cloud when signed in, else the local slot) —
           unless a live in-memory game is already offering an in-place resume */
        showSessionCard();
        if (me) {
          /* load run history for the account screen */
          if (G.NET.playerRuns) G.NET.playerRuns().then(function (d) {
            var rp = sel("runsPanel"); if (!rp) return;
            if (d && d.ok && d.runs && d.runs.length) {
              if (G.UI.renderPlayerRuns) G.UI.renderPlayerRuns(d.runs);
              rp.style.display = "";
            } else rp.style.display = "none";
          });
        } else {
          var rp2 = sel("runsPanel"); if (rp2) rp2.style.display = "none";
        }
      };
      G.NET.resume();
      G.NET.loadConfig().then(function (cfg) { G.UI.renderBanner(cfg); });
      G.NET.loadRoster();
    }
    /* theme toggle */
    var themeBtn = sel("themeToggleBtn");
    if (themeBtn) {
      var lightStored = localStorage.getItem("650_theme") === "light";
      if (lightStored) { document.documentElement.classList.add("theme-light"); themeBtn.innerHTML = "🌙 Dark theme"; G.twemoji && G.twemoji(themeBtn); }
      themeBtn.onclick = function () {
        var isLight = document.documentElement.classList.toggle("theme-light");
        themeBtn.innerHTML = isLight ? "🌙 Dark theme" : "☀ Light theme";
        G.twemoji && G.twemoji(themeBtn);
        localStorage.setItem("650_theme", isLight ? "light" : "dark");
      };
    }
    G.UI.show("screen-menu");
  }

  /* -------------------------------------------------------- setup: eras -- */
  function erasList() {
    return G.ERAS.filter(function (e) { return choice.mode === "wildcard" ? true : !e.wildOnly; });
  }
  function buildEraToggles(reset) {
    var box = sel("eraToggles"); box.innerHTML = "";
    var list = erasList();
    if (reset) choice.eras = list.filter(function (e) { return !e.defaultOff || choice.mode === "wildcard"; })
                                 .map(function (e) { return e.id; });
    else choice.eras = choice.eras.filter(function (id) {
      return list.some(function (e) { return e.id === id; });
    });
    if (!choice.eras.length) choice.eras = list.map(function (e) { return e.id; });

    var eraOverrides = COUNTRY_ERA_LABELS[choice.country] || null;
    list.forEach(function (e) {
      var on = choice.eras.indexOf(e.id) !== -1;
      var b = document.createElement("button");
      b.className = "era-chip" + (on ? " sel" : "");
      var lbl = (eraOverrides && eraOverrides[e.id]) || e.label;
      b.innerHTML = '<b>' + lbl + '</b><span>' + e.years + '</span>';
      b.onclick = function () { toggleEra(e.id); };
      box.appendChild(b);
    });
  }
  function toggleEra(id) {
    var i = choice.eras.indexOf(id);
    if (i !== -1) { if (choice.eras.length > 1) choice.eras.splice(i, 1); }
    else choice.eras.push(id);
    buildEraToggles(false);
    buildDynastyChips();
    updateHint();
  }

  /* ------------------------------------------------------ setup: casts -- */
  function buildCastToggles() {
    var box = sel("castToggles"); if (!box) return;
    box.innerHTML = "";
    (G.CASTS || []).forEach(function (c) {
      var on = c.locked ? true : !!choice.casts[c.key];
      var b = document.createElement("button");
      b.className = "era-chip cast-chip" + (on ? " sel" : "") + (c.locked ? " locked" : "");
      b.innerHTML = '<b>' + c.label + '</b><span>' + (c.locked ? "always in" :
        (c.key === "novelty" ? "joke candidates who really stood" : "SpAds, strategists, mandarins")) + '</span>';
      if (!c.locked) b.onclick = function () {
        choice.casts[c.key] = !choice.casts[c.key];
        buildCastToggles(); updateHint(); updateEligibility();
      };
      box.appendChild(b);
    });
    var note = sel("castNote");
    if (note) note.style.display = (choice.mode === "dynasty") ? "" : "none";
  }

  /* --------------------------------------------------- setup: dynasties -- */
  function buildDynastyChips() {
    var box = sel("dynastyPick"); box.innerHTML = "";
    var need = choice.cabinetSize === "expanded"
      ? (G.PORTFOLIOS_BASE.length + G.PORTFOLIOS_EXTRA.length) : G.PORTFOLIOS_BASE.length;
    var lineages = G.eligibleDynastyLineages(choice.eras, need, choice.country || "uk");
    if (choice.lineage && lineages.indexOf(choice.lineage) === -1) choice.lineage = null;
    if (!choice.lineage) choice.lineage = lineages[0] || null;
    if (lineages.length === 0) {
      box.innerHTML = '<p class="mini-help warn">No tradition can field a full twelve in these eras.</p>';
      return;
    }
    lineages.forEach(function (lin) {
      var b = document.createElement("button");
      b.className = "chip" + (lin === choice.lineage ? " sel" : "");
      b.textContent = (G.LINEAGE_PARTY && G.LINEAGE_PARTY[lin]) || lin;
      b.onclick = function () {
        choice.lineage = lin;
        each(box.children, function (c) { c.classList.toggle("sel", c === b); });
        updateHint();
      };
      box.appendChild(b);
    });
  }

  /* ------------------------------------------------- setup: playability -- */
  function poolCount() {
    return G.poolFor({
      mode: choice.mode, eras: choice.eras, casts: choice.casts,
      lineage: choice.mode === "dynasty" ? choice.lineage : null,
      country: choice.country || null
    }).length;
  }
  function updateHint() {
    var n = poolCount(), need = G.PORTFOLIOS.length;
    var hint = sel("setupHint");
    var ok = n >= need && (choice.mode !== "dynasty" || !!choice.lineage);
    sel("startBtn").disabled = !ok;
    if (choice.mode === "dynasty" && !choice.lineage) {
      hint.textContent = "Pick a party tradition with a deep enough bench."; hint.className = "setup-hint warn";
    } else if (n < need) {
      hint.textContent = "Only " + n + " draftable here — you need at least " + need + ". Put an era back in.";
      hint.className = "setup-hint warn";
    } else {
      var flavour = choice.mode === "wildcard" ? "the gloves are off"
                  : choice.mode === "dynasty" ? (choice.lineage + " only") : "all parties welcome";
      hint.textContent = n + " figures in the pool · " + flavour; hint.className = "setup-hint";
    }
  }

  /* the 2024 Parliament is a single distinct era — hide the era selector for it */
  function updateEraVisibility() {
    var sec = sel("eraSection");
    if (sec) sec.style.display = (choice.mode === "parl2024") ? "none" : "";
  }

  /* ----------------------------------------------------- setup: wiring --- */
  function bindRow(rowId, attr, apply) {
    var row = sel(rowId);
    each(row.querySelectorAll("[" + attr + "]"), function (btn) {
      btn.onclick = function () {
        each(row.querySelectorAll("[" + attr + "]"), function (b) { b.classList.toggle("sel", b === btn); });
        apply(btn.getAttribute(attr));
      };
    });
  }
  function applyModeChoice(v) {
    choice.mode = v;
    var dp = sel("dynastyPick"); if (dp) dp.classList.toggle("show", v === "dynasty");
    var wn = sel("wildNote");   if (wn) wn.classList.toggle("show", v === "wildcard");
    updatePartySetup();
    buildEraToggles(true);
    buildDynastyChips();
    updateHint();
    updateEraVisibility();
    updateEligibility();
  }
  function wireSetup() {
    bindRow("modeRow", "data-mode", applyModeChoice);
    bindRow("diffRow",   "data-diff",   function (v) { choice.difficulty = v; updateEligibility(); });
    bindRow("hardRow",   "data-hard",   function (v) { choice.hard   = v === "true"; });
    bindRow("governRow", "data-govern", function (v) { choice.govern = v === "true"; });
    bindRow("watchRow",  "data-watch",  function (v) { choice.watch  = v === "true"; });
    bindRow("speedRow",  "data-speed",  function (v) { choice.speed  = v; });
    bindRow("redoRow",   "data-redos",  function (v) { choice.redos = parseInt(v, 10); });
    bindRow("sizeRow",   "data-size",   function (v) { choice.cabinetSize = v; buildDynastyChips(); updateHint(); updateEligibility(); });
    bindRow("policyRow",   "data-policy",   function (v) { choice.policy     = (v === "true"); });
    bindRow("campaignRow", "data-campaign", function (v) { choice.campaignOn = (v === "true"); });
    bindRow("careerRow",   "data-career",   function (v) {
      choice.careerMode = (v === "true");
      var n = sel("careerNote"); if (n) n.style.display = choice.careerMode ? "" : "none";
    });

    /* country picker (step 1) */
    var cgrid = sel("countryGrid");
    if (cgrid) {
      each(document.querySelectorAll("[data-country]"), function (btn) {
        btn.onclick = function () {
          each(document.querySelectorAll("[data-country]"), function (b) { b.classList.remove("sel"); });
          btn.classList.add("sel");
          applyCountryChoice(btn.getAttribute("data-country"));
        };
      });
    }
    /* initialise with default country (UK) */
    applyCountryChoice(choice.country);

    /* scenario picker */
    if (G.UI.renderScenarioPicker) G.UI.renderScenarioPicker(choice.scenarioKey, choice.country);
    var scCards = sel("scenarioCards");
    if (scCards) {
      scCards.addEventListener("click", function (e) {
        var card = e.target && e.target.closest ? e.target.closest(".scenario-card") : null;
        if (!card) return;
        var key = card.getAttribute("data-scenario");
        choice.scenarioKey = key;
        each(scCards.querySelectorAll(".scenario-card"), function (c) { c.classList.toggle("sel", c === card); });
        /* if the scenario locks mode/difficulty, apply them */
        if (G.SCENARIOS) {
          var sc = G.SCENARIOS.filter(function (s) { return s.key === key; })[0];
          if (sc && sc.mode) { choice.mode = sc.mode; setSel("modeRow", "data-mode", sc.mode); updateEligibility(); }
          if (sc && sc.difficulty) { choice.difficulty = sc.difficulty; setSel("diffRow", "data-diff", sc.difficulty); }
        }
      });
    }

    /* wizard navigation */
    sel("wstepNextBtn").onclick = function () { goWizardStep(wizardStep + 1); };
    sel("wstepBackBtn").onclick = function () { goWizardStep(wizardStep - 1); };
    each(document.querySelectorAll(".wp-dot"), function (dot) {
      dot.onclick = function () { goWizardStep(parseInt(dot.getAttribute("data-step"), 10)); };
    });
    goWizardStep(1);

    sel("startBtn").onclick = function () {
      if (sel("startBtn").disabled) return;
      /* the party name passes the same banned-word screen as usernames (E) */
      if (choice.mode !== "dynasty" && choice.partyName && G.FILTER) {
        var chk = G.FILTER.check(choice.partyName, "party name");
        if (!chk.ok) { showPartyMsg(chk.message); return; }
      }
      currentVerdict = null; submitting = false;
      setLbBtns(false, "\u2605 Post to leaderboard");
      /* career init (or clear) */
      if (choice.careerMode) {
        G.careerInit({
          partyName:   choice.partyName,
          partyColour: choice.partyColour,
          partyAlign:  choice.partyAlign,
          mode:        choice.mode,
          lineage:     choice.mode === "dynasty" ? choice.lineage : null,
          difficulty:  choice.difficulty,
          cabinetSize: choice.cabinetSize,
          eras:        choice.eras.slice(),
          scenarioKey: choice.scenarioKey || null
        });
      } else {
        G.career = null;
      }
      G.newGame({
        mode: choice.mode,
        lineage: choice.mode === "dynasty" ? choice.lineage : null,
        hard: choice.hard,
        eras: choice.eras.slice(),
        difficulty: choice.difficulty,
        govern: choice.govern,
        watch: choice.watch,
        redos: choice.redos,
        cabinetSize: choice.cabinetSize,
        policyOn: choice.policy,
        campaignOn: choice.campaignOn || false,
        casts: { insider: !!choice.casts.insider, novelty: !!choice.casts.novelty },
        country: choice.country || "uk",
        custom: choice.mode === "dynasty" ? null : {
          name: choice.partyName, align: choice.partyAlign, colour: choice.partyColour
        }
      });
      /* apply scenario if one was chosen */
      if (choice.scenarioKey && G.applyScenario) G.applyScenario(choice.scenarioKey);
      G.UI.show("screen-draft");
      G.UI.renderDraft();
    };
    var rp = sel("rankedPresetBtn");
    if (rp) rp.onclick = function () {
      choice.mode = "wildcard"; choice.difficulty = "hard"; choice.cabinetSize = "expanded";
      setSel("modeRow", "data-mode", "wildcard"); setSel("diffRow", "data-diff", "hard"); setSel("sizeRow", "data-size", "expanded");
      sel("dynastyPick").classList.remove("show"); sel("wildNote").classList.add("show");
      buildEraToggles(true); buildCastToggles(); buildDynastyChips(); updateHint(); updateEligibility(); updateEraVisibility();
      var hint = sel("setupHint"); if (hint) { hint.scrollIntoView && hint.scrollIntoView({ behavior: "smooth", block: "center" }); }
    };
    sel("aboutBtn").onclick = function () { G.UI.renderAbout(); };
    document.addEventListener("click", function (e) {
      var n = e.target;
      if (n && n.id === "rngMoreBtn") { G.UI.show("screen-rng"); }
      if (n && n.id === "rngBackBtn") { G.UI.renderAbout(); }
    });
  }

  /* ------------------------------------------------- your party (D1/D2) --- */
  function showPartyMsg(text) {
    var m = sel("partyMsg"); if (m) m.textContent = text || "";
  }
  function updatePartySetup() {
    var box = sel("partySection"); if (!box) return;
    box.style.display = (choice.mode === "dynasty") ? "none" : "";   // a dynasty IS its party
    var def = G.defaultCustom ? G.defaultCustom(choice.mode) : { name: "", align: "centre", colour: "" };
    var inp = sel("partyNameInput");
    if (inp) inp.placeholder = def.name + "\u2026";
    if (!choice.partyColour) choice.partyColour = def.colour;
    each(document.querySelectorAll("#partyAlignRow .align-chip"), function (b) {
      b.classList.toggle("sel", b.getAttribute("data-align") === choice.partyAlign);
    });
    each(document.querySelectorAll("#partySwatches .party-swatch"), function (b) {
      b.classList.toggle("sel", b.getAttribute("data-colour") === choice.partyColour);
    });
  }
  function wirePartySetup() {
    var box = sel("partySection"); if (!box) return;
    /* the alignment chips */
    var ar = sel("partyAlignRow");
    if (ar) {
      ar.innerHTML = (G.ALIGNMENTS || []).map(function (a) {
        return '<button class="align-chip" data-align="' + a.key + '">' + a.label + '</button>';
      }).join("");
      ar.addEventListener("click", function (e) {
        var b = e.target && e.target.closest ? e.target.closest(".align-chip") : null; if (!b) return;
        choice.partyAlign = b.getAttribute("data-align");
        updatePartySetup();
      });
    }
    /* the curated colour swatches */
    var sw = sel("partySwatches");
    if (sw) {
      sw.innerHTML = (G.PARTY_PALETTE || []).map(function (c) {
        return '<button class="party-swatch" data-colour="' + c.colour + '" title="' + c.label +
               '" style="background:' + c.colour + '"><span>' + c.label + '</span></button>';
      }).join("");
      sw.addEventListener("click", function (e) {
        var b = e.target && e.target.closest ? e.target.closest(".party-swatch") : null; if (!b) return;
        choice.partyColour = b.getAttribute("data-colour");
        updatePartySetup();
      });
    }
    /* the name, screened as you type (same filter the server runs) */
    var inp = sel("partyNameInput");
    if (inp) inp.addEventListener("input", function () {
      choice.partyName = (inp.value || "").replace(/\s+/g, " ").slice(0, 28);
      if (choice.partyName && G.FILTER && G.FILTER.hit(choice.partyName)) {
        showPartyMsg("That party name isn't allowed here \u2014 please choose different wording.");
      } else showPartyMsg(choice.partyName ? "" : "");
    });
    updatePartySetup();
  }

  /* --------------------------------------------------------- the wheel ---- */
  var spinning = false;
  function spinFlourish(commit) {
    if (spinning) return;
    spinning = true;
    G.UI.setSpinning(true);
    sel("spinBtn").disabled = true;
    sel("skipEraBtn").disabled = true;
    sel("skipPartyBtn").disabled = true;
    var flick = setInterval(function () { G.UI.flickerReels(); }, 70);
    setTimeout(function () {
      clearInterval(flick);
      G.UI.setSpinning(false);
      spinning = false;
      commit();
      G.UI.renderDraft();
    }, 720);
  }

  G.ctrl = {
    spin:   function () { spinFlourish(function () { G.deal(); }); },   // deal three candidates
    redraw: function () { if (G.state.choices && G.redosLeft && G.redosLeft() > 0) spinFlourish(function () { G.redraw(); }); },
    choose: function (name) { if (G.chooseFromDeal(name)) G.UI.renderDraft(); },   // pick one of the three
    assign: function (portfolioKey) { if (G.assignTo(portfolioKey)) G.UI.renderDraft(); },
    hold:   function () { runElectionFlow(); }
  };

  function wireDraft() {
    sel("spinBtn").onclick = function () { G.ctrl.spin(); };
    sel("skipEraBtn").onclick = function () { G.ctrl.redraw(); };   // re-draw the three on offer
    sel("skipPartyBtn").onclick = function () {};                   // retired
    sel("holdBtn").onclick = function () { G.ctrl.hold(); };
  }

  /* ------------------------------------------------------- the election --- */
  function runElectionFlow() {
    if (!G.isComplete()) return;
    if (G.state.policyOn && !G.state.policy) { G.UI.renderPolicy("manifesto"); return; }
    /* campaign trail gate — if enabled and not yet done */
    if (G.state.campaignOn && !G.state.campaign) { G.campaignInit && G.campaignInit(); }
    if (G.state.campaignOn && G.state.campaign && !G.state.campaign.done) {
      if (G.UI.renderCampaign) G.UI.renderCampaign();
      return;
    }
    proceedElection();
  }
  function proceedElection() {
    /* finalise campaign if pending */
    if (G.state.campaign && !G.state.campaign.done && G.campaignFinalise) G.campaignFinalise();
    lastResult = G.hold();
    if (G.state.watch) startWatch(lastResult);
    else showResult(lastResult);
  }
  function showResult(res) {
    G.UI.renderResult(res);
    updatePersonalBest(res);
    autoSave("result");
    /* check objectives and achievements */
    if (G.checkObjectives && G.unlockAchievements) {
      var ctx = {
        seats: res.seats,
        byRegion: res.campaign && res.campaign.byRegion,
        blocSupport: res.blocSupport,
        totalSeats: res.totalSeats || (G.activeTotalSeats ? G.activeTotalSeats() : 650),
        majority: (G.activeMajority ? G.activeMajority() : ((G.CONFIG && G.CONFIG.majority) || 326)),
        coalition: res.coalition,
        largest: !!(res.coalition && res.coalition.largest),
        electoralSystem: res.electoralSystem || (G.state && G.state._electoralSystemKey),
        country: choice.country || "uk",
        scenario: res.scenarioKey || (G.state && G.state.scenarioKey)
      };
      var unlocked = G.unlockAchievements(G.checkObjectives(ctx));
      if (unlocked.length && G.UI.showAchievements) G.UI.showAchievements(unlocked);
    }
    try {
      if (G.LB && G.LB.recordLocalRun) G.LB.recordLocalRun(entryFrom(res));
    } catch (e) {}
  }

  /* ----------------------------------------------- seat-by-seat count ----- */
  /* career "continue" button label, by the chamber you actually govern */
  function careerNextLabel() {
    var key = G.state && G.state._electoralSystemKey;
    if (!key || key === "fptp_uk") return "→ Next Parliament";
    var sys = G.ELECTORAL_SYSTEMS && G.ELECTORAL_SYSTEMS[key];
    if (sys && (sys.despotMode || sys.coalitionStyle === "guided")) return "→ Next Term in Power";
    var labels = G.UI && G.UI.sysLabels ? G.UI.sysLabels(key) : { termWord: "Parliament" };
    return "→ Next " + labels.termWord;
  }

  /* declaration bounds over the per-seat results list. UK uses the 650-seat
     constituency layout; international systems declare in region order, sized
     by each region's seat count. */
  function regionBounds(res, intl) {
    var out = [], idx = 0;
    if (intl) {
      ((res.campaign && res.campaign.byRegion) || res.byRegion || []).forEach(function (r) {
        out.push({ id: r.id, name: r.name, start: idx, end: idx + r.total, total: r.total });
        idx += r.total;
      });
    } else {
      G.REGIONS.forEach(function (r) {
        out.push({ id: r.id, name: r.name, start: idx, end: idx + r.seats, total: r.seats });
        idx += r.seats;
      });
    }
    return out;
  }

  /* declaration pace — total seconds to call every seat, by chosen speed. */
  function revealRate(total) {
    var secs = choice.speed === "slow" ? 200 : choice.speed === "fast" ? 48 : 96;
    return (total || 650) / secs;   // seats per second
  }

  function startWatch(res) {
    cancelWatch();
    var intl = G.state && G.state._electoralSystemKey && G.state._electoralSystemKey !== "fptp_uk";
    var sys  = intl && G.ELECTORAL_SYSTEMS ? G.ELECTORAL_SYSTEMS[G.state._electoralSystemKey] : null;
    var results = res.campaign.results || [];
    var total = results.length || (sys ? sys.totalSeats : 650);
    var bounds = regionBounds(res, intl);

    var setup = intl ? G.UI.renderWatchIntl(res, sys) : G.UI.renderWatch(res);
    /* seats per region — for the live nowcast projection */
    var regionTotals = {};
    results.forEach(function (r) { regionTotals[r.region] = (regionTotals[r.region] || 0) + 1; });
    watch = {
      res: res, intl: intl,
      byId: setup.byId, colour: setup.colour,
      results: results, bounds: bounds, total: total,
      i: 0, won: 0, regIdx: 0, regWon: 0,
      cancelled: false, done: false, raf: null,
      sps: revealRate(total), acc: 0, lastT: null,
      tally: {}, blocLabel: res.campaign.blocLabel, blocColour: res.campaign.blocColour,
      regionTotals: regionTotals, declaredByRegion: {}, wonByRegion: {}
    };
    if (watch.bounds[0]) G.UI.pushFeed("Counting in " + watch.bounds[0].name + "…", "muted");
    frame();
  }

  function liveBreakdown(w) {
    return Object.keys(w.tally).map(function (label) {
      return { party: label, seats: w.tally[label],
        colour: label === w.blocLabel ? w.blocColour : ((G.PARTIES[label] || {}).colour || "#6b6b6b"),
        isYou: label === w.blocLabel };
    }).sort(function (a, b) { return b.seats - a.seats; });
  }

  function reveal(n, quiet) {
    var w = watch; if (!w) return;
    for (var c = 0; c < n && w.i < w.results.length; c++) {
      while (w.regIdx < w.bounds.length && w.i >= w.bounds[w.regIdx].end) {
        var b = w.bounds[w.regIdx];
        if (!quiet) G.UI.pushFeed(b.name + " — " + w.regWon + " / " + b.total, (w.regWon * 2 >= b.total) ? "win" : "");
        w.regIdx++; w.regWon = 0;
        if (!quiet && w.regIdx < w.bounds.length) G.UI.pushFeed("Counting in " + w.bounds[w.regIdx].name + "…", "muted");
      }
      var res = w.results[w.i];
      /* flip the seat's hex (works for the UK constituency map and every
         international country cartogram alike — both key hexes by seat id) */
      G.UI.flipSeat(w.byId[res.id], res.won, w.colour,
                    res.won ? null : G.partyColour(res.winner, w.blocLabel, w.blocColour), res.winner);
      /* the UK declares real, named constituencies seat-by-seat; international
         seats are synthetic, so there the feed reports at the region level */
      if (!quiet && !w.intl)
        G.UI.pushFeed(res.name + (res.won ? " — won" : " — lost (" + res.winner + ")"), res.won ? "win" : "");
      if (res.won) { w.won++; w.regWon++; w.wonByRegion[res.region] = (w.wonByRegion[res.region] || 0) + 1; }
      w.declaredByRegion[res.region] = (w.declaredByRegion[res.region] || 0) + 1;
      w.tally[res.winner] = (w.tally[res.winner] || 0) + 1;
      w.i++;
    }
    G.UI.setWatchTally(w.won, w.i);
    G.UI.renderStandings("watchStandings", liveBreakdown(w));
    updateNowcast(w);
  }

  /* live-night projection line under the tally */
  function updateNowcast(w) {
    var el = sel("watchNowcast"); if (!el || !G.Nowcast) return;
    /* the confident nowcast needs this campaign's per-region expectations, which
       today are produced only for the constituency (UK) model; skip otherwise so
       we never show a misleading projection. */
    if (!(w.res && w.res.campaign && w.res.campaign.regionExpected)) { el.style.display = "none"; return; }
    /* wait until a small sample is in, and stop once everything's declared */
    if (w.i < 8 || w.i >= w.total) { el.style.display = "none"; return; }
    var p = G.Nowcast.project(w, w.res);
    el.textContent = G.Nowcast.line(p);
    el.className = "wt-proj" + (p.pMajority >= 0.5 ? " wt-proj-win" : "");
    el.style.display = "";
  }

  function frame() {
    if (!watch || watch.cancelled) return;
    var now = (window.performance && window.performance.now) ? window.performance.now() : Date.now();
    if (watch.lastT == null) watch.lastT = now;
    var dt = now - watch.lastT; if (dt > 250) dt = 250; watch.lastT = now;
    watch.acc += watch.sps * dt / 1000;
    var n = Math.floor(watch.acc);
    if (n > 0) { watch.acc -= n; reveal(n); }
    if (watch.i < watch.results.length) watch.raf = requestAnimationFrame(frame);
    else finishWatch();
  }

  function finishWatch() {
    var w = watch; if (!w) return;
    while (w.regIdx < w.bounds.length) {
      var b = w.bounds[w.regIdx];
      G.UI.pushFeed(b.name + " — " + w.regWon + " / " + b.total, (w.regWon * 2 >= b.total) ? "win" : "");
      w.regIdx++; w.regWon = 0;
    }
    w.done = true;
    G.UI.setWatchTally(w.won, w.i);
    G.UI.pushFeed("All " + w.total + " seats declared.", "win");
    sel("skipCountBtn").style.display = "none";
    sel("toResultBtn").style.display = "";
  }

  function cancelWatch() {
    if (watch) { watch.cancelled = true; if (watch.raf) cancelAnimationFrame(watch.raf); }
  }

  function wireWatch() {
    sel("skipCountBtn").onclick = function () {
      if (!watch) return;
      watch.cancelled = true; if (watch.raf) cancelAnimationFrame(watch.raf);
      reveal(watch.results.length, true);
      finishWatch();
    };
    sel("toResultBtn").onclick = function () {
      if (!watch) return;
      showResult(watch.res);
    };
  }

  /* --------------------------------------------------- the result screen -- */
  function wireResult() {
    sel("wikiBtn").onclick = function () {
      if (!lastResult) return;
      G.UI._wikiCaller = "screen-result";
      G.UI.renderWikiParliament(lastResult, G.state, G.career);
    };
    sel("wikiBackBtn").onclick = function () { G.UI.show(G.UI._wikiCaller || "screen-result"); };

    sel("downloadBtn").onclick = function () {
      if (!lastResult) return;
      var go = function () {
        var url = G.UI.drawShareCard(lastResult);
        var a = document.createElement("a");
        a.href = url; a.download = "650-result.png";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go).catch(go);
      else go();
    };

    sel("copyBtn").onclick = function () {
      if (!lastResult) return;
      var text = G.UI.resultText(lastResult);
      var done = function () { flashButton(sel("copyBtn"), "Copied ✓"); };
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(text).then(done).catch(function () { legacyCopy(text, done); });
      else legacyCopy(text, done);
    };

    sel("xShareBtn").onclick = function () {
      if (!lastResult) return;
      postToX(G.UI.resultText(lastResult) + " #650game", function () { return G.UI.shareCardBlob(lastResult); });
    };

    sel("againBtn").onclick = function () {
      cancelWatch();
      currentVerdict = null; submitting = false;             // a new election is a new, unique turn
      setLbBtns(false, "\u2605 Post to leaderboard");
      lastResult = G.hold();
      if (G.state.watch) startWatch(lastResult);
      else showResult(lastResult);
    };
    sel("menuBtn").onclick = goMenu;
  }

  /* ------------------------------------------------------ share to X ------ */
  function openXIntent(text, url) {
    var href = "https://x.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
    try { window.open(href, "_blank", "noopener"); } catch (e) {}
  }
  function postToX(text, getBlob) {
    var url = "https://650-0.co.uk";
    // On phones that support it, share the actual result image to the X app.
    if (getBlob && typeof navigator !== "undefined" && navigator.canShare) {
      try {
        getBlob().then(function (blob) {
          try {
            var file = new File([blob], "650-result.png", { type: "image/png" });
            if (navigator.canShare({ files: [file] }) && navigator.share) {
              navigator.share({ files: [file], text: text }).catch(function () { openXIntent(text, url); });
              return;
            }
          } catch (e) {}
          openXIntent(text, url);
        }).catch(function () { openXIntent(text, url); });
        return;
      } catch (e) {}
    }
    openXIntent(text, url);
  }

  function goMenu() {
    cancelWatch(); stopChatPoll();
    /* capture the current spot so the logo never loses progress */
    if (activeGameScreen && G.state) autoSaveNow(activeGameScreen);
    G.UI.show("screen-menu");
    goWizardStep(1);        /* always land on the first setup step */
    showSessionCard();
  }

  /* --------------------------------------------------------- leaderboard -- */
  function wireLeaderboard() {
    sel("leaderboardBtn").onclick = openLeaderboard;
    sel("lbBackBtn").onclick = goMenu;
    sel("lbRefreshBtn").onclick = function () { loadLeaderboard(); };
    sel("resultLbBtn").onclick = submitToLeaderboard;
    sel("legacyLbBtn").onclick = submitToLeaderboard;
  }
  function updateLbWho() {
    var el = sel("lbWhoNote"); if (!el) return;
    if (G.NET && G.NET.me) el.textContent = "Posting as " + G.NET.me.name + ".";
    else el.textContent = "The public board is for registered players \u2014 sign in (free) to post your runs.";
  }
  function openLeaderboard() {
    updateLbWho();
    G.UI.show("screen-leaderboard"); loadLeaderboard();
  }
  function loadLeaderboard() {
    var s = sel("lbStatus"); if (s) s.textContent = "Loading\u2026";
    var bm = sel("lbBoardMode"), v = bm ? bm.value : "ranked";
    var done = function (d) { G.UI.renderLeaderboard((d && d.top) || [], true, (d && d.ok) ? null : "offline"); };
    if (v === "overall" && G.NET) { G.NET.overall().then(done); return; }
    if (v && v !== "ranked" && G.NET) { var p = v.split("|"); G.NET.board({ mode: p[0], difficulty: p[1], cabinetSize: p[2] }).then(done); return; }
    G.LB.fetchTop(function (top, communal, err) { G.UI.renderLeaderboard(top, communal, err); });
  }
  /* one finished ELECTION = one entry. The cabinet comes from the manifest
     snapshotted at hold() (A3) and the runId minted there keys the record on
     every board (A1) \u2014 so the entry stays right even after a new draft begins. */
  function entryFrom(res) {
    if (!res) return null;
    var name = (G.NET && G.NET.me && G.NET.me.name) || "";
    var legacy = (currentVerdict && typeof currentVerdict.legacy === "number") ? currentVerdict.legacy : null;
    var custom = res.custom || (G.state && G.state.custom) || null;
    var _sys = G.activeElectoralSystem && G.activeElectoralSystem();
    var _totalSeats = _sys ? (_sys.totalSeats || 650) : (G.CONFIG && G.CONFIG.totalSeats || 650);
    return { name: name, seats: res.seats, legacy: legacy,
             govt: !!(res.tier && res.tier.govt),
             mode: res.mode || (G.state && G.state.mode) || "unity",
             difficulty: res.difficulty || (G.state && G.state.difficulty) || "normal",
             cabinetSize: res.cabinetSize || (G.state && G.state.cabinetSize) || "standard",
             runId: res.runId || "",
             partyName: custom ? custom.name : "",
             partyAlign: custom ? custom.align : "",
             scenarioKey: (G.state && G.state.scenarioKey) || "",
             electoralSystem: (G.state && G.state._electoralSystemKey) || "",
             totalSeats: _totalSeats,
             cabinet: res.manifest || (G.cabinetManifest ? G.cabinetManifest() : []),
             breakdown: (res.breakdown || []).map(function (b) { return { party: b.party, seats: b.seats }; }) };
  }
  function currentEntry() { return entryFrom(lastResult); }
  function submitToLeaderboard() {
    if (!G.NET || !G.NET.me) {                       // the leaderboard is for signed-in players only
      setLbBtns(true, "Sign in to post");
      setAcctTab("login");
      G.UI.show("screen-account");
      var msg = sel("acctMsg"); if (msg) msg.textContent = "Sign in (or register) to post your run to the leaderboard.";
      return;
    }
    var e = currentEntry(); if (!e || !e.name) return;
    if (submitting) return;                                  // already posting
    var sig = G.LB.signature(e);
    if (G.LB.alreadySent(sig)) {                             // accidental re-tap of the same run
      setLbBtns(true, "Already posted \u2713"); openLeaderboard(); return;
    }
    submitting = true; setLbBtns(true, "Posting\u2026");
    G.LB.submit(e, function (top, communal, err) {
      submitting = false;
      G.UI.show("screen-leaderboard");
      updateLbWho();
      G.UI.renderLeaderboard(top, communal, err);
      if (err === "offline") setLbBtns(false, "\u2605 Try posting again");          // allow retry
      else if (err === "duplicate") setLbBtns(true, "Already posted \u2713");
      else if (err === "not hardest mode") setLbBtns(true, "Not in ranked mode");
      else if (err === "login") setLbBtns(true, "Sign in to post");
      else setLbBtns(true, "Posted \u2713");
    });
  }

  function flashButton(btn, msg) {
    var old = btn.textContent; btn.textContent = msg;
    setTimeout(function () { btn.textContent = old; }, 1400);
  }
  function legacyCopy(text, done) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); document.execCommand("copy");
      document.body.removeChild(ta); if (done) done();
    } catch (e) { /* clipboard unavailable */ }
  }

  /* ----------------------------------------------------- personal best ---- */
  var PB_KEY = "650.bestSeats";
  function readPB() { try { var v = window.localStorage.getItem(PB_KEY); return v === null ? null : parseInt(v, 10); } catch (e) { return null; } }
  function writePB(n) { try { window.localStorage.setItem(PB_KEY, String(n)); } catch (e) {} }
  function updatePersonalBest(res) {
    var note = sel("pbNote"), prev = readPB();
    if (prev === null || res.seats > prev) {
      writePB(res.seats);
      note.innerHTML = prev === null
        ? "Saved as your personal best: <b>" + res.seats + "</b> seats."
        : "🏆 New personal best — <b>" + res.seats + "</b> seats, beating " + prev + ".";
    } else {
      note.innerHTML = "Your personal best is <b>" + prev + "</b> seats.";
    }
  }

  /* --------------------------------------------------------- governing ---- */
  function enterGovernment(res, opts) {
    G.startTerm(res, opts || {});
    if (G.state.policyOn) G.UI.renderPolicy("programme");
    else { G.UI.renderGovern(); if (G.UI.renderCareerBanner) G.UI.renderCareerBanner(G.career); }
  }
  function startCoalitionGovern(res, deal, minority) {
    enterGovernment(res, { coalition: deal || null, minority: !!minority });
  }
  function startOpposition(res) {
    G.startOpposition(res);
    G.UI.renderGovern();
    if (G.UI.renderCareerBanner) G.UI.renderCareerBanner(G.career);
  }

  function wireCoalition() {
    sel("coalitionOptions").addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== this && !(n.classList && n.classList.contains("coal-opt"))) n = n.parentNode;
      if (!n || !n.classList || !n.classList.contains("coal-opt")) return;
      if (!lastResult || !lastResult.coalition) return;
      var act = n.getAttribute("data-act");
      if (act === "deal") {
        var i = parseInt(n.getAttribute("data-i"), 10);
        startCoalitionGovern(lastResult, lastResult.coalition.deals[i], false);
      } else if (act === "minority") {
        startCoalitionGovern(lastResult, null, true);
      } else if (act === "opposition") {
        startOpposition(lastResult);
      }
    });
    sel("oppositionBtn").onclick = function () { if (lastResult) startOpposition(lastResult); };
  }

  function wirePolicy() {
    sel("policyConfirm").onclick = function () {
      var sel2 = {};
      G.POLICY_AXES.forEach(function (ax) { sel2[ax.key] = G.UI._policySel[ax.key]; });
      if (G.UI._policyMode === "manifesto") {
        G.state.policy = sel2;
        runElectionFlow();   /* may proceed to campaign or election */
      } else {
        G.applyProgramme(sel2);
        G.UI.renderGovern();
      }
    };
  }

  function wireCampaign() {
    var screen = document.getElementById("screen-campaign"); if (!screen) return;
    /* stepper buttons for region/bloc day allocation */
    screen.addEventListener("click", function (e) {
      var btn = e.target;
      if (!btn.classList.contains("camp-step-btn")) return;
      var slot = btn.getAttribute("data-slot");
      var dir  = parseInt(btn.getAttribute("data-dir"), 10);
      var c = G.state && G.state.campaign; if (!c) return;
      var cur = c.allocation[slot] || 0;
      var newVal = Math.max(0, cur + dir);
      if (dir > 0 && c.daysLeft <= 0) return; /* no days left */
      if (G.campaignAllocate) G.campaignAllocate(slot, newVal);
      /* update displayed day count */
      var numEl = document.getElementById("campdays_" + slot);
      if (numEl) numEl.textContent = c.allocation[slot] || 0;
      var dlEl = document.getElementById("campaignDaysLeft");
      if (dlEl) dlEl.textContent = c.daysLeft;
    });
    /* theme selection */
    var themesEl = document.getElementById("campaignThemes");
    if (themesEl) {
      themesEl.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest(".camp-theme-btn") : null; if (!btn) return;
        var key = btn.getAttribute("data-theme");
        var c = G.state && G.state.campaign; if (!c) return;
        c.theme = (c.theme === key) ? null : key; /* toggle */
        each(themesEl.querySelectorAll(".camp-theme-btn"), function (b) { b.classList.toggle("sel", b.getAttribute("data-theme") === c.theme); });
      });
    }
    /* debate button */
    var debBtn = document.getElementById("campaignDebateBtn");
    if (debBtn) {
      debBtn.onclick = function () {
        var won = G.resolveDebate ? G.resolveDebate() : false;
        var debRes = document.getElementById("campaignDebateResult");
        if (debRes) {
          debRes.style.display = "";
          debRes.textContent = won ? "✓ You won the debate!" : "✗ You lost the debate.";
          debRes.className = won ? "camp-debate-win" : "camp-debate-loss";
        }
        debBtn.style.display = "none";
      };
    }
    /* launch button */
    var launchBtn = document.getElementById("campaignLaunchBtn");
    if (launchBtn) {
      launchBtn.onclick = function () {
        if (G.campaignFinalise) G.campaignFinalise();
        proceedElection();
      };
    }
  }

  function wireGovern() {
    sel("governBtn").onclick = function () {
      if (!lastResult) return;
      var co = lastResult.coalition;
      if (co && co.soloMajority) { enterGovernment(lastResult); return; }
      var sys = G.activeElectoralSystem && G.activeElectoralSystem();
      /* presidential: largest EV holder governs, even if <270 via House contingent */
      if (sys && sys.coalitionStyle === "presidential" && co && co.largest) { enterGovernment(lastResult); return; }
      /* despot / guided: outcome is never in doubt */
      if (sys && (sys.despotMode || sys.coalitionStyle === "guided")) { enterGovernment(lastResult); return; }
    };
    sel("eventTurnCards").addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== this && !(n.classList && n.classList.contains("choice"))) n = n.parentNode;
      if (!n || !n.classList || !n.classList.contains("choice")) return;
      if (!G.term || G.term.over) return;
      var turnIdx = parseInt(n.getAttribute("data-turn-idx"), 10);
      var choiceIdx = parseInt(n.getAttribute("data-choice-idx"), 10);
      G.stageChoice(turnIdx, choiceIdx);
      G.UI.renderTurnEvents();
    });
    sel("govConfirmBtn").onclick = function () {
      if (!G.allChoicesStaged()) return;
      var r = G.confirmTurn();
      G.UI.pushGovLog(r.log);
      G.UI.afterConfirm();
      if (r.over) endTerm();
    };
    /* once-a-term reshuffle: pick two seats to swap */
    var resel = [];
    sel("reshuffleBtn").onclick = function () {
      var pnl = sel("reshufflePanel"); if (!pnl) return;
      resel = [];
      if (pnl.style.display !== "none" && pnl.innerHTML) { pnl.style.display = "none"; pnl.innerHTML = ""; return; }
      pnl.style.display = "";
      pnl.innerHTML = '<p class="mini-help">Tap two departments to swap their ministers (once a term; someone will sulk).</p>' +
        G.PORTFOLIOS.map(function (po) {
          var who = G.state.cabinet[po.key];
          return '<button class="chip rs-chip" data-rs="' + po.key + '">' + po.name + (who ? ' \u00b7 ' + who.name : '') + '</button>';
        }).join("");
    };
    sel("reshufflePanel").addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-rs]") : null; if (!b) return;
      var k = b.getAttribute("data-rs");
      if (resel.indexOf(k) !== -1) { resel = resel.filter(function (x) { return x !== k; }); b.classList.remove("sel"); return; }
      resel.push(k); b.classList.add("sel");
      if (resel.length === 2) {
        var line = G.reshuffle(resel[0], resel[1]);
        var pnl = sel("reshufflePanel"); pnl.style.display = "none"; pnl.innerHTML = "";
        if (line) { G.UI.pushGovLog(line); }
        G.UI.afterChoice();
        resel = [];
      }
    });
    /* the opposition's attack line */
    sel("attackRow").addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-attack]") : null; if (!b) return;
      if (G.setAttackLine(b.getAttribute("data-attack"))) {
        G.UI.pushGovLog({ text: "Attack line: " + (G.term.attack === "approval" ? "the government's standing." : "the government's economic record."), cls: "" });
        G.UI.refreshGovActions();
      }
    });
    /* the player-timed snap election (opposition) */
    sel("forceBtn").onclick = function () {
      var r = G.forceElection(); if (!r) return;
      G.UI.pushGovLog(r.log);
      G.UI.afterChoice();
      if (r.over) endTerm();
    };
    /* government-initiated early election */
    sel("govCallElectionBtn").onclick = function () {
      var r = G.callEarlyElection ? G.callEarlyElection() : null; if (!r) return;
      G.UI.pushGovLog(r.log);
      G.UI.afterChoice();
      if (r.over) endTerm();
    };
    /* once-per-term national statement (government) */
    sel("govStatementBtn").onclick = function () {
      var r = G.govStatement ? G.govStatement() : null; if (!r) return;
      G.UI.pushGovLog(r.log);
      G.UI.refreshGovActions();
    };
    /* once-per-term press conference (opposition) */
    sel("oppPressConfBtn").onclick = function () {
      var r = G.oppPressConference ? G.oppPressConference() : null; if (!r) return;
      G.UI.pushGovLog(r.log);
      G.UI.refreshGovActions();
    };
    /* election record from legacy screen */
    var legWiki = sel("legacyWikiBtn");
    if (legWiki) legWiki.onclick = function () {
      if (!lastResult) return;
      G.UI._wikiCaller = "screen-legacy";
      G.UI.renderWikiParliament(lastResult, G.state, G.career);
    };
    sel("legacyAgainBtn").onclick = function () {
      cancelWatch();
      currentVerdict = null; submitting = false;             // a new election is a new, unique turn
      setLbBtns(false, "\u2605 Post to leaderboard");
      lastResult = G.hold();
      if (G.state.watch) startWatch(lastResult); else showResult(lastResult);
    };
    sel("legacyShareBtn").onclick = function () {
      if (!currentVerdict) return;
      var text = G.UI.legacyText(currentVerdict);
      var done = function () { flashButton(sel("legacyShareBtn"), "Copied ✓"); };
      if (navigator.clipboard && navigator.clipboard.writeText)
        navigator.clipboard.writeText(text).then(done).catch(function () { legacyCopy(text, done); });
      else legacyCopy(text, done);
    };
    sel("legacyMenuBtn").onclick = goMenu;
    sel("legacyXBtn").onclick = function () {
      if (!currentVerdict) return;
      postToX(G.UI.legacyText(currentVerdict) + " #650game", null);
    };
  }
  function endTerm() {
    currentVerdict = G.govVerdict();
    G.UI.renderLegacy(currentVerdict);
    recordLegacy(currentVerdict);
    /* check term-level objectives (legacy, pledges, approval, blocs) */
    if (G.checkObjectives && G.unlockAchievements) {
      var termCtx = {
        legacy: currentVerdict && currentVerdict.legacy,
        pledges: G.term && G.term.pledges,
        approvalEnd: currentVerdict && currentVerdict.meters && currentVerdict.meters.approval,
        termGovt: G.term && G.term.kind === "govt",
        blocSupport: G.term && G.term.blocSupport,
        byRegion: lastResult && lastResult.campaign && lastResult.campaign.byRegion,
        seats: lastResult && lastResult.seats,
        totalSeats: (lastResult && lastResult.totalSeats) || (G.activeTotalSeats ? G.activeTotalSeats() : 650),
        majority: (G.activeMajority ? G.activeMajority() : ((G.CONFIG && G.CONFIG.majority) || 326)),
        coalition: lastResult && lastResult.coalition,
        largest: !!(lastResult && lastResult.coalition && lastResult.coalition.largest),
        electoralSystem: G.state && G.state._electoralSystemKey,
        country: choice.country || "uk",
        scenario: G.state && G.state.scenarioKey
      };
      var tUnlocked = G.unlockAchievements(G.checkObjectives(termCtx));
      if (tUnlocked.length) {
        var legStrip = document.getElementById("legacyObjectivesStrip");
        if (legStrip) {
          var all = (G.OBJECTIVES || []).concat((G.SCENARIOS || []).map(function (s) {
            return { key: "scenario_" + s.key, label: s.name + " — Objective Complete" };
          }));
          legStrip.innerHTML = "<b>Achievements unlocked:</b> " + tUnlocked.map(function (k) {
            var obj = all.filter(function (o) { return o.key === k; })[0];
            return '<span class="achievement-badge">' + G.UI._esc(obj ? obj.label : k) + ' ✓</span>';
          }).join("");
          legStrip.style.display = "";
        }
      }
    }
    /* career: record this term and prepare retirement screen */
    if (G.career && G.career.active && G.careerRecordTerm) {
      G.careerRecordTerm(lastResult, currentVerdict);
      /* push election history NOW (before legacy screen opens) so the wiki
         button on the legacy screen can show the correct prior-parliament data.
         careerRecordTerm already incremented G.career.parliament, so -1 gives
         the number of the parliament that just finished. */
      if (lastResult && G.career.electionHistory.length < G.career.parliament - 1) {
        G.career.electionHistory.push({
          parliament: G.career.parliament - 1,
          seats: lastResult.seats,
          voteShare: lastResult.voteShare,
          tier: lastResult.tier && lastResult.tier.key,
          pmName: lastResult.pmName || "—",
          electionYear: lastResult.electionYear || G.state.gameYear || 2026
        });
      }
    }
    if (G.career && G.career.active) {
      var btn = sel("legacyAgainBtn"); if (btn) btn.textContent = careerNextLabel();
      /* show career parliament history strip on the legacy screen */
      if (G.UI.renderCareerParlStrip) G.UI.renderCareerParlStrip("legacyCareerStrip", G.career);
    }
    /* the governed term completes THIS run's record: same runId, legacy now
       filled in \u2014 the personal board (and the signed-in run history) update
       the existing record in place rather than adding a second row. */
    try { if (G.LB && G.LB.recordLocalRun && lastResult) G.LB.recordLocalRun(currentEntry()); } catch (e) {}
    autoSave("govern");
  }

  /* ----------------------------------------- career retirement screen ----- */
  function wireRetirement() {
    var btn = sel("retContinueBtn"); if (!btn) return;
    btn.onclick = function () {
      if (!G.career || !G.career.active) { goMenu(); return; }
      /* compute retirements based on serve counts set in careerRecordTerm */
      var retiring = G.checkRetirements ? G.checkRetirements(G.state.cabinet || {}) : [];
      /* add retiring names to retiredMinisters so pool excludes them */
      retiring.forEach(function (r) {
        if (G.career.retiredMinsters) G.career.retiredMinsters[r.politician.name] = true;
      });
      /* build carry-over: ministers NOT retiring keep their portfolio */
      var carryOver = {};
      var cabinet = (G.state && G.state.cabinet) || {};
      Object.keys(cabinet).forEach(function (key) {
        var pol = cabinet[key]; if (!pol) return;
        var isRetiring = retiring.some(function (r) { return r.politician.name === pol.name; });
        if (!isRetiring) carryOver[key] = pol;
      });
      /* record election history entry for career (guard: endTerm() may have
         already pushed this parliament's entry when the legacy screen opened) */
      if (lastResult && G.career.electionHistory.length < G.career.parliament - 1) {
        G.career.electionHistory.push({
          parliament: G.career.parliament - 1,
          seats: lastResult.seats,
          voteShare: lastResult.voteShare,
          tier: lastResult.tier && lastResult.tier.key,
          pmName: lastResult.pmName || "—",
          electionYear: lastResult.electionYear || G.state.gameYear || 2026
        });
      }
      /* start the next parliament with carry-over cabinet */
      currentVerdict = null; submitting = false;
      setLbBtns(false, "★ Post to leaderboard");
      var nextYear = (G.state.gameYear || 2026) + 4 + Math.floor(Math.random() * 2);
      G.newGame({
        mode: G.career.mode,
        lineage: G.career.lineage || null,
        eras: G.career.eras || [],
        difficulty: G.career.difficulty,
        govern: true,
        watch: G.state ? G.state.watch : true,
        cabinetSize: G.career.cabinetSize || "standard",
        carryOver: carryOver,
        custom: G.state ? G.state.custom : null,
        gameYear: nextYear,
        scenarioKey: G.career.scenarioKey || null
      });
      /* keep the same country / electoral system across the whole career; the
         scenario sets its own year, so restore the advanced career year after. */
      if (G.career.scenarioKey && G.applyScenario) {
        G.applyScenario(G.career.scenarioKey);
        G.state.gameYear = nextYear;
      }
      G.UI.show("screen-draft");
      G.UI.renderDraft();
    };
  }

  /* legacy screen "between parliaments" button (career mode only) */
  function wireLegacyCareer() {
    var legEl = sel("legacyAgainBtn"); if (!legEl) return;
    var origOnclick = legEl.onclick;
    if (G.career && G.career.active) legEl.textContent = careerNextLabel();
    legEl.onclick = function () {
      if (G.career && G.career.active) {
        /* show retirement screen instead of new game */
        var retiring = G.checkRetirements ? G.checkRetirements(G.state.cabinet || {}) : [];
        G.UI.renderRetirements(retiring, G.career);
      } else {
        if (origOnclick) origOnclick.call(this);
        else {
          cancelWatch();
          currentVerdict = null; submitting = false;
          setLbBtns(false, "★ Post to leaderboard");
          lastResult = G.hold();
          if (G.state.watch) startWatch(lastResult); else showResult(lastResult);
        }
      }
    };
  }

  /* --------------------------------------------------------- explorer ----- */
  function wireExplore() {
    var s = sel("exploreSearch");
    if (s) s.addEventListener("input", function () { G.UI.filterExplore(s.value); });
  }

  /* ----------------------------------------------------------- records ---- */
  var LEG_KEY = "650.bestLegacy";
  function readLeg() { try { var v = window.localStorage.getItem(LEG_KEY); return v === null ? null : parseInt(v, 10); } catch (e) { return null; } }
  function recordLegacy(v) {
    try { var prev = readLeg(); if (prev === null || v.legacy > prev) window.localStorage.setItem(LEG_KEY, String(v.legacy)); } catch (e) {}
    renderRecords();
  }
  function renderRecords() {
    var el = sel("recordsLine"); if (!el) return;
    var seats = readPB(), leg = readLeg(), bits = [];
    if (seats !== null) bits.push("best <b>" + seats + "</b> seats");
    if (leg !== null) bits.push("best legacy <b>" + leg + "</b>");
    el.innerHTML = bits.length ? ("Your records: " + bits.join(" · ")) : "";
  }

  /* --------------------------------------------------------- the about ---- */
  function wireAbout() {
    sel("aboutBackBtn").onclick = goMenu;
    sel("exploreBackBtn").onclick = goMenu;
    sel("methodLink").onclick = function () { G.UI.renderAbout(); };
  }

  /* ------------------------------------------------------------- launch --- */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  /* ----------------------------------------------------------- platform -- */
  var chatTimer = null, acctTab = "login";
  function stopChatPoll() { if (chatTimer) { clearInterval(chatTimer); chatTimer = null; } }
  function chatRefresh() { if (!G.NET) return; G.NET.chatFetch("").then(function (d) { G.UI.renderChat((d && d.messages) || []); }); }
  function openChat() { stopChatPoll(); G.UI.show("screen-chat"); chatRefresh(); chatTimer = setInterval(chatRefresh, 5000); }
  function openLive() {
    stopChatPoll(); G.UI.show("screen-live");
    if (G.NET) G.NET.loadConfig().then(function (cfg) { G.UI.renderLive(cfg); G.UI.renderBanner(cfg); });
  }
  function openAdmin() {
    stopChatPoll(); G.UI.show("screen-admin");
    if (G.NET) G.NET.loadConfig().then(function () { G.UI.renderAdmin(); });
    fillPolNames();
    refreshUsers();
    refreshPolList();
  }
  function fillPolNames() {
    var dl = sel("apNames"); if (!dl || !G.POLITICIANS) return;
    var seen = {}, names = [];
    G.POLITICIANS.forEach(function (p) { var k = p.name.toLowerCase(); if (!seen[k]) { seen[k] = 1; names.push(p.name); } });
    names.sort();
    dl.innerHTML = names.map(function (n) { return '<option value="' + n.replace(/"/g, "&quot;") + '"></option>'; }).join("");
  }
  /* ---- plain-text politician records (Housekeeping) -----------------------
     One field per line, `key: value`. Parenthetical hints after the value are
     ignored, keys are case-insensitive, missing keys take sensible defaults —
     so a moderator can add to or amend a record without learning a format. */
  function polToText(p) {
    var s = p.stats || {};
    return [
      "name: " + (p.name || ""),
      "party: " + (p.party || ""),
      "era: " + (p.era || ""),
      "scope: " + (p.scope || "uk") + "            (uk = historical \u00b7 p24 = 2024 Parliament)",
      "stats: " + [s.appeal, s.experience, s.oratory, s.statecraft, s.partyMgmt]
                    .map(function (x) { return x == null ? 50 : x; }).join(", ") +
                  "    (appeal, experience, oratory, statecraft, party)",
      "fits: " + (p.fits || []).join(", "),
      "despot: " + (p.despot ? "yes" : "no"),
      "cast: " + (p.cast || "statesman") + "        (statesman \u00b7 insider \u00b7 novelty)",
      "flag: " + (p.flag || "") + "            (e.g. conspiracist \u2014 usually blank)",
      "wiki: " + ((G.PHOTO[p.name] && G.PHOTO[p.name].wiki) || "") + "         (Wikipedia article title, if it differs)",
      "img: " + ((G.PHOTO[p.name] && G.PHOTO[p.name].img) || "") + "          (direct image URL \u2014 overrides wiki)",
      "note: " + (p.note || "")
    ].join("\n");
  }
  function textToPol(text) {
    var f = {};
    String(text || "").split("\n").forEach(function (ln) {
      var i = ln.indexOf(":"); if (i === -1) return;
      var key = ln.slice(0, i).trim().toLowerCase();
      var val = ln.slice(i + 1).replace(/\([^)]*\)\s*$/, "").trim();   // drop the trailing hint
      if (key) f[key] = val;
    });
    if (!f.name) return null;
    var st = (f.stats || "").split(",").map(function (x) { return parseInt(x, 10); });
    var scope = (f.scope === "p24" || /2024/.test(f.scope || "")) ? "p24" : "uk";
    return {
      name: f.name, party: f.party || "",
      era: f.era || "", scope: scope,
      fits: (f.fits || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean),
      stats: { appeal: st[0] || 0, experience: st[1] || 0, oratory: st[2] || 0, statecraft: st[3] || 0, partyMgmt: st[4] || 0 },
      despot: /^(y|yes|true|1)$/i.test(f.despot || ""),
      cast: (f.cast && f.cast !== "statesman") ? f.cast : "",
      flag: f.flag || "",
      wiki: f.wiki || "",
      img: f.img || "",
      note: (f.note || "").slice(0, 200),
      mode: scope === "p24" ? "parl2024" : ""
    };
  }
  /* the deletable list: ONLY records that live in the sheet (added figures and
     overrides). Built-in figures never appear here, so they can't be deleted. */
  function refreshPolList() {
    var box = sel("apList"); if (!box || !G.NET || !G.NET.rosterList) return;
    box.innerHTML = '<p class="chat-empty">Loading\u2026</p>';
    G.NET.rosterList().then(function (d) {
      var rows = (d && d.ok && d.politicians) || [];
      if (!rows.length) { box.innerHTML = '<p class="chat-empty">No server records yet \u2014 everything in the game is built in.</p>'; return; }
      box.innerHTML = rows.map(function (p) {
        var nm = p.name.replace(/"/g, "&quot;");
        return '<div class="adm-pol"><span class="ap-nm">' + G.UI._esc(p.name) +
               ' <span class="au-lvl">' + G.UI._esc(p.party || "\u2014") + ' \u00b7 ' + (p.scope === "p24" ? "2024" : "historical") + '</span></span>' +
               '<span class="au-acts">' +
                 '<button class="link-btn" data-pact="edit" data-nm="' + nm + '" data-sc="' + p.scope + '">edit</button>' +
                 '<button class="link-btn" data-pact="del" data-nm="' + nm + '" data-sc="' + p.scope + '">delete</button>' +
               '</span></div>';
      }).join("");
    });
  }
  function refreshUsers() { if (!G.NET) return; G.NET.adminUsers().then(function (d) { G.UI.renderAdminUsers((d && d.ok && d.users) || []); }); }
  function setAcctTab(t) {
    acctTab = t;
    each(document.querySelectorAll("#screen-account .acct-tab"), function (b) { b.classList.toggle("sel", b.getAttribute("data-at") === t); });
    var sub = sel("acctSubmit"); if (sub) sub.textContent = (t === "register") ? "Create account" : "Sign in";
  }
  function sendChat() {
    if (!G.NET) return; var inp = sel("chatInput"); var t = (inp.value || "").trim(); if (!t) return;
    inp.value = "";
    G.NET.chatPost(t).then(function (d) {
      if (d && !d.ok && d.error === "login") inp.placeholder = "Sign in to chat\u2026";
      chatRefresh();
    });
  }
  function flash(btn, txt) { if (!btn) return; var o = btn.textContent; btn.textContent = txt; setTimeout(function () { btn.textContent = o; }, 1400); }
  function wirePlatform() {
    sel("acctOpenBtn").onclick = function () {
      stopChatPoll();
      if (G.NET && G.NET.me) { if (!window.confirm || window.confirm("Sign out of " + G.NET.me.name + "?")) G.NET.logout(); return; }
      setAcctTab("login"); G.UI.show("screen-account");
    };
    sel("acctBackBtn").onclick = goMenu;
    each(document.querySelectorAll("#screen-account .acct-tab"), function (b) { b.onclick = function () { setAcctTab(b.getAttribute("data-at")); }; });
    sel("acctSubmit").onclick = function () {
      if (!G.NET) return;
      var u = (sel("acctUser").value || "").trim(), p = sel("acctPass").value || "", m = sel("acctMsg");
      if (m) m.textContent = (acctTab === "register" ? "Creating account\u2026" : "Signing in\u2026");
      (acctTab === "register" ? G.NET.register(u, p) : G.NET.login(u, p)).then(function (d) {
        if (d && d.ok) { sel("acctPass").value = ""; goMenu(); }
        else if (m) m.textContent = "Couldn't " + (acctTab === "register" ? "register" : "sign in") + ": " + ((d && d.error) || "offline") + ".";
      });
    };
    sel("chatBtn").onclick = openChat;
    sel("liveBtn").onclick = openLive;
    sel("adminBtn").onclick = openAdmin;
    sel("chatBackBtn").onclick = goMenu;
    sel("liveBackBtn").onclick = goMenu;
    sel("adminBackBtn").onclick = goMenu;
    sel("chatSend").onclick = sendChat;
    sel("chatInput").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); sendChat(); } });
    sel("chatFeed").addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest(".chat-del") : null;
      if (b && G.NET) G.NET.chatDelete(b.getAttribute("data-id")).then(chatRefresh);
    });
    sel("admBannerSave").onclick = function () {
      if (!G.NET) return;
      G.NET.adminBanner(sel("admBannerText").value || "", !!sel("admBannerActive").checked).then(function (d) {
        if (d && d.config) G.UI.renderBanner(d.config); flash(sel("admBannerSave"), (d && d.ok) ? "Saved \u2713" : "Failed");
      });
    };
    sel("admStreamsSave").onclick = function () {
      if (!G.NET) return;
      var streams = [];
      (sel("admStreams").value || "").split("\n").forEach(function (ln) {
        var i = ln.indexOf("|");
        if (i === -1) { if (ln.trim()) streams.push({ label: "Live", url: ln.trim() }); return; }
        var url = ln.slice(i + 1).trim(); if (url) streams.push({ label: ln.slice(0, i).trim() || "Live", url: url });
      });
      G.NET.adminStreams(streams).then(function (d) { flash(sel("admStreamsSave"), (d && d.ok) ? "Saved \u2713" : "Failed"); });
    };
    sel("apLoad").onclick = function () {
      var name = (sel("apName").value || "").trim();
      var m = sel("apMsg");
      if (!name) { if (m) m.textContent = "Type a name first."; return; }
      var matches = (G.POLITICIANS || []).filter(function (p) { return p.name.toLowerCase() === name.toLowerCase(); });
      if (!matches.length) {
        if (m) m.textContent = "No figure called \u201c" + name + "\u201d \u2014 write the record below as plain text to add them as new.";
        sel("apText").value = polToText({ name: name, scope: "uk", stats: {} });
        return;
      }
      var fig = matches.filter(function (p) { return p.scope !== "p24"; })[0] || matches[0];
      sel("apName").value = fig.name;
      sel("apText").value = polToText(fig);                       // the WHOLE record, plain text
      if (m) m.textContent = "Loaded " + fig.name + " (" + (fig.scope === "p24" ? "2024 record" : "historical record") + ") as plain text. Edit any line and Save to override." +
                             (matches.length > 1 ? " (They also have a " + (fig.scope === "p24" ? "historical" : "2024") + " record \u2014 change the scope line to load by saving the other.)" : "");
    };
    sel("apSave").onclick = function () {
      if (!G.NET) return;
      var m = sel("apMsg");
      var pol = textToPol(sel("apText").value);
      if (!pol) { if (m) m.textContent = "The record needs at least a \u201cname:\u201d line."; return; }
      if (!pol.era) {
        // reuse the era of the record being overridden, if any
        var existing = (G.POLITICIANS || []).filter(function (p) { return p.name.toLowerCase() === pol.name.toLowerCase() && p.scope === pol.scope; })[0];
        pol.era = existing ? existing.era : (pol.scope === "p24" ? "e24" : "e7");
      }
      if (m) m.textContent = "Saving\u2026";
      if (G.mergeRoster) G.mergeRoster([pol]);          // apply at once so it's live immediately
      sel("metaCount").textContent = G.POLITICIANS.length;
      updateHint();
      G.NET.adminAddPol(pol).then(function (d) {
        if (m) m.textContent = (d && d.ok)
          ? ((d.updated ? "Updated " : "Added ") + pol.name + ". Saved to the sheet \u2014 live now, and for everyone at next load.")
          : ("Saved locally, but the sheet didn't accept it: " + ((d && d.error) || "offline") + ".");
        if (d && d.ok && G.NET.loadRoster) G.NET.loadRoster();
        fillPolNames();
        refreshPolList();
      });
    };
    sel("apDelete").onclick = function () {
      if (!G.NET) return;
      var m = sel("apMsg");
      var pol = textToPol(sel("apText").value) || { name: (sel("apName").value || "").trim(), scope: "uk" };
      if (!pol.name) { if (m) m.textContent = "Load or name a record first."; return; }
      if (window.confirm && !window.confirm("Delete the server record for " + pol.name + "? (Built-in figures are untouched \u2014 an override reverts to the built-in version at next load.)")) return;
      if (m) m.textContent = "Deleting\u2026";
      G.NET.adminDelPol(pol.name, pol.scope).then(function (d) {
        if (m) m.textContent = (d && d.ok) ? ("Deleted the server record for " + pol.name + ".")
             : ((d && d.error === "not found") ? "No server record by that name \u2014 built-in, hard-coded figures can't be deleted."
             : "Couldn't delete: " + ((d && d.error) || "offline") + ".");
        refreshPolList();
      });
    };
    sel("apListRefresh").onclick = refreshPolList;
    /* PHOTO AUDIT: walk every figure in-browser through the same portrait
       chain the game uses (img override → wiki title → name) and list every
       miss, with a one-tap route into the editor to set a wiki/img override.
       Runs here because only the browser can reach Wikipedia. */
    var auditing = false;
    sel("photoAuditBtn").onclick = function () {
      if (auditing) { auditing = false; return; }
      var prog = sel("auditProgress"), list = sel("auditList");
      if (!prog || !list) return;
      auditing = true; list.innerHTML = "";
      var seen = {}, names = [];
      G.POLITICIANS.forEach(function (pp) { if (!seen[pp.name]) { seen[pp.name] = pp; names.push(pp.name); } });
      var i = 0, misses = 0, CONC = 6;
      function checkOne(nm) {
        var ovr = (G.PHOTO && G.PHOTO[nm]) || null;
        if (ovr && ovr.img) return Promise.resolve(true);
        var title = (ovr && ovr.wiki) ? ovr.wiki : nm;
        return fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(String(title).replace(/ /g, "_")),
                     { headers: { accept: "application/json" } })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (d) { return !!(d && d.thumbnail && d.thumbnail.source); })
          .catch(function () { return false; });
      }
      function step() {
        if (!auditing || i >= names.length) {
          prog.textContent = "Audit " + (i >= names.length ? "complete" : "stopped") + ": " + i + " checked, " + misses + " without a photo." +
                             (misses ? " Fix each via the editor (add a wiki: title or img: URL line and Save)." : " Every figure resolves a picture.");
          auditing = false; sel("photoAuditBtn").textContent = "Run photo audit"; return;
        }
        sel("photoAuditBtn").textContent = "Stop audit";
        var batch = names.slice(i, i + CONC);
        Promise.all(batch.map(checkOne)).then(function (oks) {
          oks.forEach(function (ok, j) {
            if (!ok) {
              misses++;
              var pp = seen[batch[j]];
              var row = document.createElement("div");
              row.className = "adm-pol";
              row.innerHTML = '<span class="ap-nm">' + G.UI._esc(pp.name) + ' <span class="au-lvl">' + G.UI._esc(pp.party || "") + '</span></span>' +
                              '<span class="au-acts"><button class="link-btn" data-fixpic="' + pp.name.replace(/"/g, "&quot;") + '">fix in editor</button></span>';
              list.appendChild(row);
            }
          });
          i += batch.length;
          prog.textContent = "Checking " + i + " / " + names.length + " \u2014 " + misses + " miss" + (misses === 1 ? "" : "es") + " so far\u2026";
          setTimeout(step, 160);
        });
      }
      step();
    };
    sel("auditList").addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-fixpic]") : null; if (!b) return;
      var nm = b.getAttribute("data-fixpic");
      var fig = (G.POLITICIANS || []).filter(function (pp) { return pp.name === nm; })[0];
      if (fig) { sel("apName").value = fig.name; sel("apText").value = polToText(fig);
        sel("apMsg").textContent = "Add a wiki: title (or img: URL) line, then Save \u2014 the override ships to everyone at next load.";
        sel("apText").scrollIntoView && sel("apText").scrollIntoView({ behavior: "smooth" }); }
    });
    sel("apList").addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-pact]") : null; if (!b || !G.NET) return;
      var act = b.getAttribute("data-pact"), nm = b.getAttribute("data-nm"), sc = b.getAttribute("data-sc");
      if (act === "edit") {
        G.NET.rosterList().then(function (d) {
          var rec = ((d && d.politicians) || []).filter(function (p) { return p.name === nm && p.scope === sc; })[0];
          if (rec) { sel("apName").value = rec.name; sel("apText").value = polToText(rec); sel("apMsg").textContent = "Loaded the server record \u2014 edit and Save."; }
        });
      } else if (act === "del") {
        if (window.confirm && !window.confirm("Delete the server record for " + nm + "?")) return;
        G.NET.adminDelPol(nm, sc).then(function () { refreshPolList(); });
      }
    });
    sel("admUsersRefresh").onclick = refreshUsers;
    sel("admUsers").addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-act]") : null; if (!b || !G.NET) return;
      var act = b.getAttribute("data-act"), who = b.getAttribute("data-u"), done = refreshUsers;
      if (act === "ban") G.NET.adminBan(who).then(done);
      else if (act === "unban") G.NET.adminUnban(who).then(done);
      else {
        var lvlEl = b.parentNode.parentNode.querySelector(".au-lvl"), lvl = 1, mt = lvlEl && /L(\d+)/.exec(lvlEl.textContent);
        if (mt) lvl = parseInt(mt[1], 10);
        lvl = Math.max(1, Math.min(9, lvl + (act === "promote" ? 1 : -1)));
        G.NET.adminSetLevel(who, lvl).then(done);
      }
    });
    var bm = sel("lbBoardMode"); if (bm) bm.addEventListener("change", function () { loadLeaderboard(); });
  }
})();
