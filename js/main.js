/* =============================================================================
   650 — CONTROLLER
   -----------------------------------------------------------------------------
   The only file that holds the wires. Reads the menu, drives the draft loop via
   the engine, repaints through G.UI, and owns the small side-effects (spin
   animation, clipboard, download, personal best). Loaded last.
   ========================================================================== */

(function () {
  "use strict";

  var sel = function (id) { return document.getElementById(id); };

  /* menu selections (defaults match the .sel buttons in the markup) */
  var choice = { mode: "unity", lineage: null, hard: false };

  /* the most recent election result, kept for re-run / download / copy */
  var lastResult = null;

  /* ---------------------------------------------------------------- boot -- */
  function boot() {
    sel("metaCount").textContent = G.POLITICIANS.length;
    buildDynastyChips();
    wireMenu();
    wireDraft();
    wireResult();
    wireAbout();
    G.UI.show("screen-menu");
  }

  /* ------------------------------------------------------------ the menu -- */
  function buildDynastyChips() {
    var box = sel("dynastyPick");
    box.innerHTML = "";
    var lineages = G.eligibleDynastyLineages();
    choice.lineage = lineages[0] || null;
    lineages.forEach(function (lin, i) {
      var b = document.createElement("button");
      b.className = "chip" + (i === 0 ? " sel" : "");
      b.textContent = lin;
      b.setAttribute("data-lineage", lin);
      b.onclick = function () {
        choice.lineage = lin;
        Array.prototype.forEach.call(box.children, function (c) {
          c.classList.toggle("sel", c === b);
        });
      };
      box.appendChild(b);
    });
  }

  function wireMenu() {
    /* game mode */
    var modeRow = sel("modeRow");
    Array.prototype.forEach.call(modeRow.querySelectorAll("[data-mode]"), function (btn) {
      btn.onclick = function () {
        choice.mode = btn.getAttribute("data-mode");
        Array.prototype.forEach.call(modeRow.querySelectorAll("[data-mode]"), function (b) {
          b.classList.toggle("sel", b === btn);
        });
        sel("dynastyPick").classList.toggle("show", choice.mode === "dynasty");
      };
    });

    /* difficulty */
    var hardRow = sel("hardRow");
    Array.prototype.forEach.call(hardRow.querySelectorAll("[data-hard]"), function (btn) {
      btn.onclick = function () {
        choice.hard = btn.getAttribute("data-hard") === "true";
        Array.prototype.forEach.call(hardRow.querySelectorAll("[data-hard]"), function (b) {
          b.classList.toggle("sel", b === btn);
        });
      };
    });

    sel("startBtn").onclick = function () {
      G.newGame({
        mode: choice.mode,
        lineage: choice.mode === "dynasty" ? choice.lineage : null,
        hard: choice.hard
      });
      G.UI.show("screen-draft");
      G.UI.renderDraft();
    };

    sel("aboutBtn").onclick = function () { G.UI.renderAbout(); };
  }

  /* --------------------------------------------------------- the wheel ---- */
  /* one shared slot-machine flourish, used by spin and by both skips */
  var spinning = false;
  function spinFlourish(commit) {
    if (spinning) return;
    spinning = true;
    G.UI.setSpinning(true);
    sel("spinBtn").disabled = true;
    sel("skipEraBtn").disabled = true;
    sel("skipPartyBtn").disabled = true;

    var ticks = 0;
    var flick = setInterval(function () {
      G.UI.flickerReels();
      ticks++;
    }, 70);

    setTimeout(function () {
      clearInterval(flick);
      G.UI.setSpinning(false);
      spinning = false;
      commit();           // mutate engine state (spin / skip)
      G.UI.renderDraft();  // repaint everything from state
    }, 720);
  }

  /* ------------------------------------------------- the draft controller - */
  G.ctrl = {
    spin: function () {
      spinFlourish(function () { G.spin(); });
    },
    skipEra: function () {
      if (!(G.state.spin && G.state.skips.era > 0)) return;
      spinFlourish(function () { G.skipEra(); });
    },
    skipParty: function () {
      if (!(G.state.spin && G.state.skips.party > 0)) return;
      spinFlourish(function () { G.skipParty(); });
    },
    chooseCandidate: function (name) {
      G.choosePick(name);
      G.UI.renderPool();
      G.UI.renderCabinet();   // open seats become click targets
      G.UI.refreshControls();
    },
    assign: function (portfolioKey) {
      if (!G.assignTo(portfolioKey)) return;
      G.UI.renderDraft();
    },
    hold: function () {
      runAndShow();
    }
  };

  function wireDraft() {
    sel("spinBtn").onclick = function () { G.ctrl.spin(); };
    sel("skipEraBtn").onclick = function () { G.ctrl.skipEra(); };
    sel("skipPartyBtn").onclick = function () { G.ctrl.skipParty(); };
    sel("holdBtn").onclick = function () { G.ctrl.hold(); };
  }

  /* ------------------------------------------------------- the election --- */
  function runAndShow() {
    if (!G.isComplete()) return;
    lastResult = G.hold();
    G.UI.renderResult(lastResult);
    updatePersonalBest(lastResult);
  }

  /* --------------------------------------------------- the result screen -- */
  function wireResult() {
    sel("downloadBtn").onclick = function () {
      if (!lastResult) return;
      var go = function () {
        var url = G.UI.drawShareCard(lastResult);
        var a = document.createElement("a");
        a.href = url;
        a.download = "650-result.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      /* wait for the display fonts so the card isn't drawn in a fallback */
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(go).catch(go);
      } else {
        go();
      }
    };

    sel("copyBtn").onclick = function () {
      if (!lastResult) return;
      var text = G.UI.resultText(lastResult);
      var done = function () { flashButton(sel("copyBtn"), "Copied ✓"); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { legacyCopy(text, done); });
      } else {
        legacyCopy(text, done);
      }
    };

    sel("againBtn").onclick = function () { runAndShow(); };       // fresh simulation, same cabinet
    sel("menuBtn").onclick = function () { G.UI.show("screen-menu"); };
  }

  function flashButton(btn, msg) {
    var old = btn.textContent;
    btn.textContent = msg;
    setTimeout(function () { btn.textContent = old; }, 1400);
  }

  function legacyCopy(text, done) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      if (done) done();
    } catch (e) { /* clipboard simply unavailable */ }
  }

  /* ----------------------------------------------------- personal best ---- */
  var PB_KEY = "650.bestSeats";

  function readPB() {
    try {
      var v = window.localStorage.getItem(PB_KEY);
      return v === null ? null : parseInt(v, 10);
    } catch (e) { return null; }
  }
  function writePB(n) {
    try { window.localStorage.setItem(PB_KEY, String(n)); } catch (e) { /* private mode */ }
  }

  function updatePersonalBest(res) {
    var note = sel("pbNote");
    var prev = readPB();
    if (prev === null || res.seats > prev) {
      writePB(res.seats);
      note.innerHTML = prev === null
        ? "Saved as your personal best: <b>" + res.seats + "</b> seats."
        : "🏆 New personal best — <b>" + res.seats + "</b> seats, beating " + prev + ".";
    } else {
      note.innerHTML = "Your personal best is <b>" + prev + "</b> seats.";
    }
  }

  /* --------------------------------------------------------- the about ---- */
  function wireAbout() {
    sel("aboutBackBtn").onclick = function () { G.UI.show("screen-menu"); };
    sel("methodLink").onclick = function () { G.UI.renderAbout(); };
  }

  /* ------------------------------------------------------------- launch --- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
