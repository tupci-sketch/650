/* =============================================================================
   650 — EMOJI / FLAG RENDERING
   Renders every emoji and flag in the DOM as a Twemoji image pulled live from
   a CDN, so they look identical on Windows, macOS, Linux, iOS and Android
   instead of depending on the operating system's emoji font (which on desktop
   often shows tofu boxes or bare two-letter country codes).

   A MutationObserver re-runs the parse whenever new content is inserted, so
   dynamically-built UI (mode buttons, the wiki flag, live counts, etc.) gets
   imaged too. The observer is disconnected while parsing so Twemoji's own
   <img> insertions don't retrigger it.
   ========================================================================== */
window.G = window.G || {};
(function () {
  var G = window.G;
  var BASE = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/";
  var OPTS = { folder: "svg", ext: ".svg", base: BASE, className: "emoji" };

  function parse(root) {
    if (!window.twemoji || !root) return;
    try { window.twemoji.parse(root, OPTS); } catch (e) { /* offline / blocked — leave native emoji */ }
  }
  /* public: re-image a specific element after you've written emoji into it */
  G.twemoji = function (el) { parse(el || document.body); };

  var obs = null, queued = false;
  function flush() {
    queued = false;
    if (obs) obs.disconnect();
    parse(document.body);
    if (obs) obs.observe(document.body, { childList: true, subtree: true });
  }
  function schedule() {
    if (queued) return;
    queued = true;
    (window.requestAnimationFrame || window.setTimeout)(flush, 16);
  }

  function start() {
    parse(document.body);
    if (!window.MutationObserver) return;
    obs = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var n = added[j];
          /* ignore the <img class="emoji"> nodes Twemoji itself inserts */
          if (n.nodeType === 1 && n.classList && n.classList.contains("emoji")) continue;
          schedule();
          return;
        }
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
