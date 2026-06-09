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
  var choice = { mode: "unity", lineage: null, eras: [], difficulty: "normal",
                 hard: false, govern: true, watch: true, speed: "normal",
                 redos: 1, cabinetSize: "standard", policy: false,
                 partyName: "", partyAlign: "centre", partyColour: "" };

  var lastResult = null;   // kept for re-run / download / copy
  var watch = null;        // live-count animation state
  var currentVerdict = null; // last governing verdict (for sharing)
  var submitting = false;    // guard against double-submit while a post is in flight

  /* ---------------------------------------------------------------- boot -- */
  function boot() {
    sel("metaCount").textContent = G.POLITICIANS.length;
    sel("metaEras").textContent = G.ERAS.filter(function (e) { return !e.wildOnly; }).length;
    buildEraToggles(true);
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
    wireExplore();
    wireLeaderboard();
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
      G.NET.onAuth = function (me) { G.UI.applyAuth(me); updateLbWho(); };
      G.NET.resume();
      G.NET.loadConfig().then(function (cfg) { G.UI.renderBanner(cfg); });
      G.NET.loadRoster();
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
    if (reset) choice.eras = list.map(function (e) { return e.id; });
    else choice.eras = choice.eras.filter(function (id) {
      return list.some(function (e) { return e.id === id; });
    });
    if (!choice.eras.length) choice.eras = list.map(function (e) { return e.id; });

    list.forEach(function (e) {
      var on = choice.eras.indexOf(e.id) !== -1;
      var b = document.createElement("button");
      b.className = "era-chip" + (on ? " sel" : "");
      b.innerHTML = '<b>' + e.label + '</b><span>' + e.years + '</span>';
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

  /* --------------------------------------------------- setup: dynasties -- */
  function buildDynastyChips() {
    var box = sel("dynastyPick"); box.innerHTML = "";
    var need = choice.cabinetSize === "expanded"
      ? (G.PORTFOLIOS_BASE.length + G.PORTFOLIOS_EXTRA.length) : G.PORTFOLIOS_BASE.length;
    var lineages = G.eligibleDynastyLineages(choice.eras, need);
    if (choice.lineage && lineages.indexOf(choice.lineage) === -1) choice.lineage = null;
    if (!choice.lineage) choice.lineage = lineages[0] || null;
    if (lineages.length === 0) {
      box.innerHTML = '<p class="mini-help warn">No tradition can field a full twelve in these eras.</p>';
      return;
    }
    lineages.forEach(function (lin) {
      var b = document.createElement("button");
      b.className = "chip" + (lin === choice.lineage ? " sel" : "");
      b.textContent = lin;
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
      mode: choice.mode, eras: choice.eras,
      lineage: choice.mode === "dynasty" ? choice.lineage : null
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
  function wireSetup() {
    bindRow("modeRow", "data-mode", function (v) {
      choice.mode = v;
      sel("dynastyPick").classList.toggle("show", v === "dynasty");
      sel("wildNote").classList.toggle("show", v === "wildcard");
      updatePartySetup();
      buildEraToggles(true);
      buildDynastyChips();
      updateHint();
      updateEraVisibility();
      updateEligibility();
    });
    bindRow("diffRow",   "data-diff",   function (v) { choice.difficulty = v; updateEligibility(); });
    bindRow("hardRow",   "data-hard",   function (v) { choice.hard   = v === "true"; });
    bindRow("governRow", "data-govern", function (v) { choice.govern = v === "true"; });
    bindRow("watchRow",  "data-watch",  function (v) { choice.watch  = v === "true"; });
    bindRow("speedRow",  "data-speed",  function (v) { choice.speed  = v; });
    bindRow("redoRow",   "data-redos",  function (v) { choice.redos = parseInt(v, 10); });
    bindRow("sizeRow",   "data-size",   function (v) { choice.cabinetSize = v; buildDynastyChips(); updateHint(); updateEligibility(); });
    bindRow("policyRow", "data-policy", function (v) { choice.policy = (v === "true"); });

    sel("startBtn").onclick = function () {
      if (sel("startBtn").disabled) return;
      /* the party name passes the same banned-word screen as usernames (E) */
      if (choice.mode !== "dynasty" && choice.partyName && G.FILTER) {
        var chk = G.FILTER.check(choice.partyName, "party name");
        if (!chk.ok) { showPartyMsg(chk.message); return; }
      }
      currentVerdict = null; submitting = false;
      setLbBtns(false, "\u2605 Post to leaderboard");
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
        custom: choice.mode === "dynasty" ? null : {
          name: choice.partyName, align: choice.partyAlign, colour: choice.partyColour
        }
      });
      G.UI.show("screen-draft");
      G.UI.renderDraft();
    };
    var rp = sel("rankedPresetBtn");
    if (rp) rp.onclick = function () {
      choice.mode = "wildcard"; choice.difficulty = "hard"; choice.cabinetSize = "expanded";
      setSel("modeRow", "data-mode", "wildcard"); setSel("diffRow", "data-diff", "hard"); setSel("sizeRow", "data-size", "expanded");
      sel("dynastyPick").classList.remove("show"); sel("wildNote").classList.add("show");
      buildEraToggles(true); buildDynastyChips(); updateHint(); updateEligibility(); updateEraVisibility();
      var hint = sel("setupHint"); if (hint) { hint.scrollIntoView && hint.scrollIntoView({ behavior: "smooth", block: "center" }); }
    };
    sel("aboutBtn").onclick = function () { G.UI.renderAbout(); };
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
    proceedElection();
  }
  function proceedElection() {
    lastResult = G.hold();
    if (G.state.watch) startWatch(lastResult);
    else showResult(lastResult);
  }
  function showResult(res) {
    G.UI.renderResult(res);
    updatePersonalBest(res);
    try {
      if (G.LB && G.LB.recordLocalRun) G.LB.recordLocalRun(entryFrom(res));
    } catch (e) {}
  }

  /* ----------------------------------------------- seat-by-seat count ----- */
  function regionBounds(results) {
    var out = [], idx = 0;
    G.REGIONS.forEach(function (r) {
      out.push({ id: r.id, name: r.name, start: idx, end: idx + r.seats, total: r.seats });
      idx += r.seats;
    });
    return out;
  }

  /* declaration pace — total seconds to call all 650 seats, by chosen speed.
     slow savours every declaration; fast is a flash; normal sits between. */
  function revealRate() {
    var secs = choice.speed === "slow" ? 200 : choice.speed === "fast" ? 48 : 96;
    return 650 / secs;   // seats per second
  }

  function startWatch(res) {
    cancelWatch();
    var setup = G.UI.renderWatch(res);
    watch = {
      res: res, byId: setup.byId, colour: setup.colour, results: res.campaign.results,
      bounds: regionBounds(res.campaign.results), i: 0, won: 0, regIdx: 0, regWon: 0,
      cancelled: false, done: false, raf: null,
      sps: revealRate(), acc: 0, lastT: null,
      tally: {}, blocLabel: res.campaign.blocLabel, blocColour: res.campaign.blocColour
    };
    G.UI.pushFeed("Counting in " + watch.bounds[0].name + "…", "muted");
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
      G.UI.flipSeat(w.byId[res.id], res.won, w.colour,
                    res.won ? null : G.partyColour(res.winner, w.blocLabel, w.blocColour), res.winner);
      if (res.won) { w.won++; w.regWon++; }
      w.tally[res.winner] = (w.tally[res.winner] || 0) + 1;
      if (!quiet) G.UI.pushFeed(res.name + (res.won ? " — won" : " — lost (" + res.winner + ")"), res.won ? "win" : "");
      w.i++;
    }
    G.UI.setWatchTally(w.won, w.i);
    G.UI.renderStandings("watchStandings", liveBreakdown(w));
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
    G.UI.pushFeed("All 650 seats declared.", "win");
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

  function goMenu() { cancelWatch(); stopChatPoll(); G.UI.show("screen-menu"); }

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
    return { name: name, seats: res.seats, legacy: legacy,
             govt: !!(res.tier && res.tier.govt),
             mode: res.mode || (G.state && G.state.mode) || "unity",
             difficulty: res.difficulty || (G.state && G.state.difficulty) || "normal",
             cabinetSize: res.cabinetSize || (G.state && G.state.cabinetSize) || "standard",
             runId: res.runId || "",
             partyName: custom ? custom.name : "",
             partyAlign: custom ? custom.align : "",
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
    else G.UI.renderGovern();
  }
  function startCoalitionGovern(res, deal, minority) {
    enterGovernment(res, { coalition: deal || null, minority: !!minority });
  }
  function startOpposition(res) {
    G.startOpposition(res);
    G.UI.renderGovern();
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
        proceedElection();
      } else {
        G.applyProgramme(sel2);
        G.UI.renderGovern();
      }
    };
  }

  function wireGovern() {
    sel("governBtn").onclick = function () {
      if (!lastResult || !lastResult.coalition || !lastResult.coalition.soloMajority) return;
      enterGovernment(lastResult);
    };
    sel("eventChoices").addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== this && !(n.classList && n.classList.contains("choice"))) n = n.parentNode;
      if (!n || !n.classList || !n.classList.contains("choice")) return;
      if (!G.term || G.term.over) return;
      var idx = parseInt(n.getAttribute("data-idx"), 10);
      var r = (G.term.kind === "opp") ? G.oppChoose(idx) : G.govChoose(idx);
      G.UI.pushGovLog(r.log);
      G.UI.afterChoice();
      if (r.over) endTerm();
    });
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
    /* the governed term completes THIS run's record: same runId, legacy now
       filled in \u2014 the personal board (and the signed-in run history) update
       the existing record in place rather than adding a second row. */
    try { if (G.LB && G.LB.recordLocalRun && lastResult) G.LB.recordLocalRun(currentEntry()); } catch (e) {}
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
