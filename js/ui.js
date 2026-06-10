/* =============================================================================
   650 — UI  (v2)
   Pure rendering. Reads G.state / a result object and paints the DOM.
   Interactive elements call into G.ctrl.* (defined in main.js).
   ========================================================================== */

window.G = window.G || {};
G.UI = {};

var $ = function (id) { return document.getElementById(id); };

/* role -> name colour class (admin dark red, moderator dark blue, user black) */
G.UI.roleClass = function (level) { return (level >= 9) ? "role-admin" : (level >= 5) ? "role-mod" : "role-user"; };

var SCREENS = ["screen-menu", "screen-draft", "screen-watch", "screen-result", "screen-about", "screen-rng", "screen-explore", "screen-govern", "screen-legacy", "screen-policy", "screen-leaderboard", "screen-account", "screen-chat", "screen-admin", "screen-live"];

G.UI.show = function (screenId) {
  SCREENS.forEach(function (s) {
    var el = $(s); if (el) el.classList.toggle("active", s === screenId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* the colour a ticket's won seats are painted in */
G.UI.ticketColour = function (state) {
  if (state && state.mode === "dynasty") {
    var keys = Object.keys(G.PARTIES);
    for (var i = keys.length - 1; i >= 0; i--) {
      if (G.PARTIES[keys[i]].lineage === state.lineage) return G.PARTIES[keys[i]].colour;
    }
  }
  if (state && state.custom && state.custom.colour) return state.custom.colour;
  if (state && state.mode === "wildcard") return "#b3862f";
  return "#2f5d3a";
};
/* the bloc name a ticket fights under */
G.UI.ticketName = function (state) {
  if (!state) return "Your seats";
  if (state.mode === "dynasty") return state.lineage + " seats";
  if (state.custom && state.custom.name) return state.custom.name;
  return "Your seats";
};

/* portraits: lazy Wikipedia thumbnail, cached, monogram fallback (offline-safe) */
G.UI._initials = function (n) { var p = String(n||"").replace(/[^A-Za-z .'-]/g,"").split(/\s+/).filter(Boolean); return p.length ? ((p[0][0]||"")+(p.length>1?p[p.length-1][0]:"")).toUpperCase() : "?"; };
G.UI.portrait = function (name, elm) {
  if (!elm) return;
  elm.textContent = G.UI._initials(name);
  var key = "650.pic." + name, cached = null;
  try { cached = window.localStorage.getItem(key); } catch (e) {}
  if (cached === "none") return;
  function put(url){ var img = document.createElement("img"); img.alt=""; img.loading="lazy"; img.referrerPolicy="no-referrer"; img.onerror=function(){ try{elm.removeChild(img);}catch(e){} }; img.src=url; elm.innerHTML=""; elm.appendChild(img); }
  if (cached) { put(cached); return; }
  /* hard-coded overrides: a direct image wins outright; a wiki title redirects
     the lookup (for every figure whose display name is not the article title) */
  var ovr = (G.PHOTO && G.PHOTO[name]) || null;
  if (ovr && ovr.img) { try{window.localStorage.setItem(key, ovr.img);}catch(e){} put(ovr.img); return; }
  var title = (ovr && ovr.wiki) ? ovr.wiki : String(name);
  if (typeof fetch !== "function") return;
  fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title.replace(/ /g,"_")), { headers:{ accept:"application/json" } })
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(d){ var src = d && d.thumbnail && d.thumbnail.source; if (src){ try{window.localStorage.setItem(key,src);}catch(e){} put(src); } else { try{window.localStorage.setItem(key,"none");}catch(e){} } })
    .catch(function(){});
};
G.UI._hydratePortraits = function (root) {
  var nodes = (root || document).querySelectorAll("[data-pol]");
  for (var i=0;i<nodes.length;i++){ var el=nodes[i]; if (el._picDone) continue; el._picDone=true; G.UI.portrait(el.getAttribute("data-pol"), el); }
};
G.UI._ovrClass = function (v){ return v>=80?"s-elite":v>=66?"s-good":v>=52?"s-mid":"s-low"; };

/* --------------------------------------------------------- draft: pips -- */
G.UI.renderProgress = function () {
  var pips = $("pips"); pips.innerHTML = "";
  var filled = G.PORTFOLIOS.length - G.openSeats().length;
  G.PORTFOLIOS.forEach(function (_, i) {
    var d = document.createElement("span");
    d.className = "pip" + (i < filled ? " on" : "");
    pips.appendChild(d);
  });
  $("draftCount").textContent = filled + " / " + G.PORTFOLIOS.length + " seats filled";
  var tag = G.state.mode === "dynasty" ? (G.state.lineage + " dynasty")
          : G.state.mode === "wildcard" ? "Wildcard \u26A1" : "Unity ticket";
  if (G.state.hard) tag += " · blind";
  if (G.state.difficulty && G.state.difficulty !== "normal")
    tag += " · " + (G.CONFIG.difficulties[G.state.difficulty] || {}).label;
  $("modeTag").textContent = tag;
};

/* --------------------------------------------------------- draft: reels - */
G.UI.renderReels = function () {
  var st = G.state, d = st.lastDeal;
  var pv = $("reelParty").querySelector(".reel-value");
  var ps = $("reelParty").querySelector(".reel-sub");
  var ev = $("reelEra").querySelector(".reel-value");
  var es = $("reelEra").querySelector(".reel-sub");
  if (!d) {
    var offering = st.choices && st.choices.length;
    pv.innerHTML = offering ? "3" : "\u2014";
    ps.textContent = offering ? "candidates dealt" : "tap deal to begin";
    ev.textContent = offering ? "pick one" : "\u2014";
    es.textContent = offering ? "below" : "";
    return;
  }
  var party = G.PARTIES[d.politician.party];
  var era = G.ERA_BY_ID[d.politician.era];
  pv.innerHTML = '<span class="party-dot" style="background:' + (party ? party.colour : "#999") + '"></span>' + (party ? party.label : d.politician.party);
  ps.textContent = "your pick";
  ev.textContent = era ? era.label : d.politician.era;
  es.textContent = era ? era.years : "";
};

G.UI.flickerReels = function () {
  var parties = Object.keys(G.PARTIES);
  var p = G.PARTIES[parties[Math.floor(Math.random() * parties.length)]];
  var e = G.ERAS[Math.floor(Math.random() * G.ERAS.length)];
  $("reelParty").querySelector(".reel-value").textContent = p.label;
  $("reelParty").querySelector(".reel-sub").textContent = "···";
  $("reelEra").querySelector(".reel-value").textContent = e.label;
  $("reelEra").querySelector(".reel-sub").textContent = e.years;
};

G.UI.setSpinning = function (on) {
  $("reelParty").classList.toggle("spinning", on);
  $("reelEra").classList.toggle("spinning", on);
};

/* --------------------------------------------------------- draft: pool -- */
/* Each round DEALS THREE candidates. Each card rolls a TIER first (odds blend
   difficulty with the pool's make-up), then a uniform pick within it — random
   at the core, weighted at the edges. You pick one, then choose the seat. */
G.UI.renderPool = function () {
  var pool = $("pool"); pool.innerHTML = "";
  var st = G.state, choices = st.choices, hard = st.hard, pend = st.pendingPick || null;
  if (!choices || !choices.length) {
    pool.innerHTML = '<p class="assign-note" style="color:var(--ink-soft)">Tap <b>Spin for three candidates</b>. Each card spins up a tier of the party first \u2014 front rank down to the new intake \u2014 then a name within it \u2014 <b>you</b> pick one, then choose which open seat they fill. Re-draw the three if you have re-draws left.</p>';
    return;
  }
  var wrap = document.createElement("div");
  wrap.className = "deal-choices";
  var dealTiers = (st.dealInfo && st.dealInfo.tiers) || [];
  if (st.dealInfo && st.dealInfo.boost) {
    var bn = document.createElement("div");
    bn.className = "grandees-banner";
    bn.textContent = "\u2605 The party grandees intervene \u2014 the top of the bench answers the call.";
    pool.appendChild(bn);
  }
  choices.forEach(function (p, ci) {
    var chosen = pend && pend.name === p.name;
    var despot = G.isDespot && G.isDespot(p);
    var flagged = !despot && G.isFlagged && G.isFlagged(p);
    var tierKey = dealTiers[ci];
    var tierLabel = tierKey ? (G.TIERS.filter(function (t) { return t.key === tierKey; })[0] || {}).label : null;
    var card = document.createElement("div");
    card.className = "deal-card choice" + (despot ? " is-despot" : "") + (flagged ? " is-flagged" : "") + (chosen ? " chosen" : "");
    card.setAttribute("role", "button"); card.tabIndex = 0;
    var pic = '<span class="cand-pic" data-pol="' + G.UI._esc(p.name) + '"></span>';
    var stats = hard ? '' :
      '<div class="dc-stats">' +
        '<span class="stat-chip">APP<b>' + p.stats.appeal + '</b></span>' +
        '<span class="stat-chip">EXP<b>' + p.stats.experience + '</b></span>' +
        '<span class="stat-chip">ORA<b>' + p.stats.oratory + '</b></span>' +
        '<span class="stat-chip">STA<b>' + p.stats.statecraft + '</b></span>' +
        '<span class="stat-chip">PTY<b>' + p.stats.partyMgmt + '</b></span>' +
      '</div>';
    var fits = p.fits.map(function (k) { return (G.PORTFOLIO_BY_KEY[k] || { name: k }).name; });
    var fitLine = '<div class="dc-assign">' + (chosen
        ? '\u2713 chosen \u2014 <b>tap a seat below to appoint</b>'
        : 'Suits: ' + G.UI._esc(fits.slice(0, 3).join(", ")) + (fits.length > 3 ? "\u2026" : "")) + '</div>';
    var main = '<div class="dc-main">' +
      '<div class="dc-nm">' + G.UI._esc(p.name) + '</div>' +
      '<div class="dc-meta"><span class="party-dot" style="background:' + ((G.PARTIES[p.party]||{}).colour||"#999") + '"></span>' + G.UI._esc(p.party) + ' \u00b7 ' + ((G.ERA_BY_ID[p.era]||{}).label||p.era) + (p.scope==="wild"?' \u00b7 <span class="wild-tag">wildcard</span>':'') + (tierLabel?' \u00b7 <span class="tier-chip t-'+tierKey+'">'+tierLabel+'</span>':'') + '</div>' +
      (p.note ? '<div class="dc-note">' + G.UI._esc(p.note) + '</div>' : '') +
      fitLine +
      (despot ? '<div class="dc-despot">\u26a0 a despot \u2014 appointing them is a national scandal</div>' : '') +
      (flagged ? '<div class="dc-flag">\u26a0 ' + G.UI._esc(G.flagLabel(p)) + ' \u2014 included as historical fact, not endorsement; a credibility drag in cabinet</div>' : '') +
      stats +
      '</div>';
    var ovr = hard ? '' : ('<div style="text-align:center"><span class="ovr ' + G.UI._ovrClass(G.overall(p)) + '">' + G.overall(p) + '</span><span class="ovr-cap">overall</span></div>');
    card.innerHTML = pic + main + ovr;
    card.onclick = (function (nm) { return function () { if (G.ctrl && G.ctrl.choose) G.ctrl.choose(nm); }; })(p.name);
    wrap.appendChild(card);
  });
  pool.appendChild(wrap);
};

/* ------------------------------------------------------ draft: cabinet -- */
/* Filled seats are display (portrait + overall). While a minister is in hand,
   every OPEN seat becomes a tap-target showing how well they'd fit it. */
G.UI.renderCabinet = function () {
  var box = $("cabinet"); box.innerHTML = "";
  var hard = G.state.hard;
  var pend = G.state.pendingPick || null;
  G.PORTFOLIOS.forEach(function (port) {
    var holder = G.state.cabinet[port.key];
    var seat = document.createElement("div");
    var roleShort = port.name.replace(" of the Exchequer", "").replace(" Secretary", "").replace("Prime Minister", "PM");
    if (holder) {
      var despot = G.isDespot && G.isDespot(holder);
      var flagged = !despot && G.isFlagged && G.isFlagged(holder);
      var hCls = G.fitClass(holder, port.key);
      var right = hard
        ? '<span class="fitmark ' + hCls + '">' + (hCls==="good"?"\u2713 fit":hCls==="okay"?"\u2248 capable":"\u25b3 stretch") + '</span>'
        : '<span class="ovr ' + G.UI._ovrClass(G.overall(holder)) + ' seat-ovr">' + G.overall(holder) + '</span>';
      seat.className = "seat" + (despot ? " despot" : "") + (flagged ? " flagged" : "");
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="seat-pic" data-pol="' + G.UI._esc(holder.name) + '"></span>' +
        '<span class="holder">' + G.UI._esc(holder.name) +
          ' <span class="era-mini">' + (G.ERA_BY_ID[holder.era] ? G.ERA_BY_ID[holder.era].years : "") + '</span></span>' +
        right;
    } else if (pend) {
      var fc = G.fitClass(pend, port.key);
      var lbl = fc === "good" ? "\u2713 fits well" : fc === "okay" ? "\u2248 capable" : "\u25b3 a stretch";
      seat.className = "seat target " + fc;
      seat.setAttribute("role", "button"); seat.tabIndex = 0;
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="holder" style="color:var(--ink-soft)">appoint here</span>' +
        '<span class="fitmark ' + fc + '">' + lbl + '</span>';
      seat.onclick = (function (key) { return function () { if (G.ctrl && G.ctrl.assign) G.ctrl.assign(key); }; })(port.key);
    } else {
      seat.className = "seat empty";
      seat.innerHTML = '<span class="role">' + roleShort + '</span><span class="vacant">awaiting appointment\u2026</span>';
    }
    box.appendChild(seat);
  });
  if (hard) {
    $("strengthVal").textContent = "hidden"; $("strengthVal").style.fontSize = "18px";
  } else {
    var r = G.preview(); $("strengthVal").textContent = Math.round(r.raw); $("strengthVal").style.fontSize = "";
  }
};

/* ----------------------------------------------------- draft: controls - */
G.UI.refreshControls = function () {
  var st = G.state;
  var complete = G.isComplete();
  var pend = st.pendingPick || null;
  var offering = !!(st.choices && st.choices.length);
  var spin = $("spinBtn");
  spin.disabled = complete || offering;          // while three are on offer, pick one (don't re-deal via this button)
  spin.textContent = complete ? "Cabinet complete"
                   : pend ? "\u2191 Appoint them to a seat"
                   : offering ? "Choose one of the three"
                   : (Object.keys(st.cabinet).length ? "Deal the next three" : "Deal three candidates");

  /* the first skip slot is the RE-DRAW control (re-deals the three); second retired. */
  var rd = $("skipEraBtn"), redos = G.redosLeft ? G.redosLeft() : 0;
  if (rd) {
    if (offering && redos > 0) { rd.style.display = ""; rd.disabled = false; rd.textContent = "\u21bb Re-draw the three (" + redos + " left)"; }
    else { rd.style.display = "none"; }
  }
  if ($("skipPartyBtn")) $("skipPartyBtn").style.display = "none";

  $("holdBtn").disabled = !complete;
  $("holdBtn").textContent = st.watch ? "Hold the election \u2192" : "Hold the election";
};

G.UI.renderDraft = function () {
  G.UI.renderProgress();
  G.UI.renderReels();
  G.UI.renderPool();
  G.UI.renderCabinet();
  G.UI.refreshControls();
  G.UI._hydratePortraits($("screen-draft"));
};

/* ================================================================ MAP === */
/* Interactive hex cartogram of all 650 constituencies (2024 boundaries).
   Builds an SVG once and returns { byId } so the watch-along can flip seats. */
G.UI._hexPts = function (cx, cy, s) {
  var w = Math.sqrt(3) / 2 * s;
  return [cx, cy - s, cx + w, cy - s / 2, cx + w, cy + s / 2,
          cx, cy + s, cx - w, cy + s / 2, cx - w, cy - s / 2].join(",");
};
G.UI._tip = function () {
  var t = $("mapTip");
  if (!t) { t = document.createElement("div"); t.id = "mapTip"; t.className = "map-tip"; document.body.appendChild(t); }
  return t;
};
G.UI.buildMap = function (containerId, opts) {
  opts = opts || {};
  var geo = G.buildGeo(), cons = geo.constituencies;
  var s = 10, w = Math.sqrt(3) * s, rowH = 1.5 * s, W2 = Math.sqrt(3) / 2 * s;
  var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9, P = [];
  cons.forEach(function (c) {
    var shift = (((c.r % 2) + 2) % 2);
    var cx = (c.q + 0.5 * shift) * w, cy = (-c.r) * rowH;   // north up
    P.push({ c: c, cx: cx, cy: cy });
    if (cx - W2 < minX) minX = cx - W2; if (cx + W2 > maxX) maxX = cx + W2;
    if (cy - s < minY) minY = cy - s; if (cy + s > maxY) maxY = cy + s;
  });
  var pad = 6, vbW = (maxX - minX) + pad * 2, vbH = (maxY - minY) + pad * 2;
  var resById = {};
  if (opts.results) opts.results.forEach(function (r) { resById[r.id] = r; });
  var svg = '<svg class="hexsvg" viewBox="' + (minX - pad) + ' ' + (minY - pad) + ' ' + vbW + ' ' + vbH +
            '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="UK constituency map">';
  P.forEach(function (p) {
    var c = p.c, fill = "rgba(80,74,60,.10)", state = "", info = "";
    if (opts.mode === "explore") {
      var mp = geo.seatMP[c.gss];
      fill = mp ? mp.colour : "rgba(80,74,60,.18)";
      info = mp ? (mp.name + " (" + mp.party + ")") : "vacant / no data";
    } else if (opts.revealed && opts.results) {
      var rr = resById[c.id];
      if (rr && rr.won) { fill = opts.colour; state = "won"; }
      else {
        /* colour the seat by the WINNING party's real colour (C) */
        fill = (rr && rr.winner) ? G.partyColour(rr.winner, opts.blocLabel, opts.colour) : "rgba(80,74,60,.22)";
        state = "lost";
        if (rr && rr.winner) info = rr.winner + " win";
      }
    }
    svg += '<polygon points="' + G.UI._hexPts(p.cx, p.cy, s) + '" fill="' + fill + '"' +
           ' data-id="' + c.id + '" data-name="' + c.name.replace(/"/g, "&quot;") + '"' +
           (info ? ' data-info="' + info.replace(/"/g, "&quot;") + '"' : '') +
           (state ? ' data-state="' + state + '"' : '') + '></polygon>';
  });
  svg += '</svg>';
  var box = $(containerId); box.innerHTML = svg;
  var svgEl = box.querySelector("svg"), tip = G.UI._tip();
  function showTip(t, x, y) {
    var name = t.getAttribute("data-name"), info = t.getAttribute("data-info"), st = t.getAttribute("data-state");
    tip.textContent = name + (info ? " — " + info : st === "won" ? " — won" : st === "lost" ? " — lost" : "");
    tip.style.display = "block"; tip.style.left = x + "px"; tip.style.top = (y - 14) + "px";
  }
  svgEl.addEventListener("mousemove", function (e) { if (e.target.tagName === "polygon") showTip(e.target, e.clientX, e.clientY); else tip.style.display = "none"; });
  svgEl.addEventListener("mouseleave", function () { tip.style.display = "none"; });
  svgEl.addEventListener("click", function (e) { if (e.target.tagName === "polygon") showTip(e.target, e.clientX, e.clientY); });
  var byId = {}, polys = svgEl.querySelectorAll("polygon");
  for (var i = 0; i < polys.length; i++) byId[polys[i].getAttribute("data-id")] = polys[i];
  return { byId: byId };
};
G.UI.flipSeat = function (el, won, colour, winnerColour, winnerLabel) {
  if (!el) return;
  el.setAttribute("fill", won ? colour : (winnerColour || "rgba(80,74,60,.22)"));
  el.setAttribute("data-state", won ? "won" : "lost");
  if (!won && winnerLabel) el.setAttribute("data-info", winnerLabel + " win");
};
/* the legend lists the parties actually present: you first, then the main
   others by seats won (C2). Pass the result breakdown; falls back to the old
   two-swatch key when no breakdown is to hand. */
G.UI.renderMapLegend = function (containerId, colour, mode, breakdown) {
  var youLabel = mode === "dynasty" ? "your party" : "your seats";
  var html;
  if (breakdown && breakdown.length) {
    var you = breakdown.filter(function (b) { return b.isYou; });
    var rest = breakdown.filter(function (b) { return !b.isYou; }).slice(0, 6);
    html = you.map(function (b) {
      return '<span class="bk"><span class="bk-sw" style="background:' + b.colour + '"></span>' + G.UI._esc(b.party) + ' (you)</span>';
    }).join("") + rest.map(function (b) {
      return '<span class="bk"><span class="bk-sw" style="background:' + b.colour + '"></span>' + G.UI._esc(b.party) + '</span>';
    }).join("");
    if (breakdown.length > rest.length + you.length) html += '<span class="bk muted-k">+ others</span>';
  } else {
    html = '<span class="bk"><span class="bk-sw" style="background:' + colour + '"></span>' + youLabel + '</span>' +
           '<span class="bk"><span class="bk-sw lost"></span>other parties</span>';
  }
  html += '<span class="bk muted-k">hover / tap a hex for the seat</span>';
  $(containerId).innerHTML = html;
};
G.UI.renderRegionSummary = function (containerId, res, colour) {
  var box = $(containerId); if (!box) return;
  box.innerHTML = "";
  res.campaign.byRegion.forEach(function (r) {
    var pct = r.total ? Math.round(r.won / r.total * 100) : 0;
    var row = document.createElement("div"); row.className = "rs-row";
    row.innerHTML =
      '<span class="rs-name">' + r.name + '</span>' +
      '<span class="rs-bar"><span class="rs-fill" style="width:' + pct + '%;background:' + colour + '"></span></span>' +
      '<span class="rs-num">' + r.won + ' / ' + r.total + '</span>';
    box.appendChild(row);
  });
};
G.UI.renderExplore = function () {
  G.UI.buildMap("mapExplore", { mode: "explore" });
  var geo = G.buildGeo(), counts = {};
  Object.keys(geo.seatMP).forEach(function (g) { var p = geo.seatMP[g].party; counts[p] = (counts[p] || 0) + 1; });
  var top = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; });
  $("exploreLegend").innerHTML = top.map(function (p) {
    var col = (G.PARTIES[p] || {}).colour || "#888";
    return '<span class="bk"><span class="bk-sw" style="background:' + col + '"></span>' + p + ' ' + counts[p] + '</span>';
  }).join("") + '<span class="bk muted-k">hover / tap a hex</span>';
  G.UI.show("screen-explore");
};
G.UI.filterExplore = function (term) {
  term = (term || "").trim().toLowerCase();
  var polys = document.querySelectorAll("#mapExplore polygon"), n = 0;
  for (var i = 0; i < polys.length; i++) {
    var nm = (polys[i].getAttribute("data-name") || "").toLowerCase();
    var hit = !term || nm.indexOf(term) !== -1;
    polys[i].style.opacity = hit ? "1" : "0.12";
    if (term && hit) n++;
  }
  var hint = $("exploreSearchHint");
  if (hint) hint.textContent = term ? (n + " seat" + (n === 1 ? "" : "s") + " match") : "";
};

/* ============================================================== GOVERN === */
G.UI.setMeter = function (id, value) {
  var el = $(id); if (!el) return;
  var fill = el.querySelector(".meter-fill"), num = el.querySelector(".meter-num");
  var col = value < 34 ? "var(--oxblood,#862231)" : value < 55 ? "var(--brass,#b3862f)" : "var(--green,#2f5d3a)";
  if (fill) { fill.style.width = Math.max(0, Math.min(100, value)) + "%"; fill.style.background = col; }
  if (num) num.textContent = Math.round(value);
};
G.UI.updateGovSeats = function () {
  var t = G.term, maj = t.seats - G.CONFIG.majority;
  $("govSeats").textContent = t.seats;
  $("govSeatsSub").textContent = maj >= 0 ? "(majority of " + maj + ")" : "(minority — " + Math.abs(maj) + " short)";
};
G.UI.showEvent = function (ev) {
  $("eventIcon").textContent = ev.icon || "◆";
  $("eventTitle").textContent = ev.title;
  $("eventText").textContent = ev.text;
  var box = $("eventChoices"); box.innerHTML = "";
  ev.choices.forEach(function (c, i) {
    var b = document.createElement("button");
    b.className = "choice"; b.setAttribute("data-idx", i);
    b.innerHTML = '<span class="choice-label">' + c.label + '</span>' +
                  '<span class="choice-sub">' + (c.text || "") + '</span>';
    box.appendChild(b);
  });
};
G.UI._meterLabel = function (meterId, text) {
  var el = $(meterId); if (!el) return;
  var l = el.querySelector(".meter-label"); if (l) l.textContent = text;
};
/* the PLEDGE TRACKER strip (government terms with the manifesto on) */
G.UI.renderPledges = function () {
  var box = $("pledgeStrip"); if (!box) return;
  var t = G.term, pls = t && t.pledges;
  if (!pls || t.kind !== "govt") { box.style.display = "none"; box.innerHTML = ""; return; }
  box.style.display = "";
  box.innerHTML = '<span class="pl-cap">Pledges</span>' + pls.map(function (pl) {
    return '<span class="pledge ' + pl.status + '" title="' + G.UI._esc(pl.title) + '">' +
           G.UI._esc(pl.label) + '<i>' + (pl.status === "open" ? "open" : pl.status) + '</i></span>';
  }).join("");
};
/* the OPPOSITION panel: the government you are breaking, your attack line,
   and the snap-election trigger */
G.UI.renderOppPanel = function () {
  var box = $("oppGovPanel"); if (!box) return;
  var t = G.term;
  if (!t || t.kind !== "opp") { box.style.display = "none"; return; }
  box.style.display = "";
  $("oppGovName").textContent = "The " + (t.gov.party || "government") + " government";
  G.UI.setMeter("govApprovalBar", t.gov.approval);
  G.UI.setMeter("govEconomyBar", t.gov.economy);
  var ar = $("attackRow");
  if (ar) { var chips = ar.querySelectorAll("[data-attack]");
    for (var i = 0; i < chips.length; i++) chips[i].classList.toggle("sel", chips[i].getAttribute("data-attack") === t.attack); }
  var fb = $("forceBtn");
  if (fb) {
    var can = G.canForceElection();
    fb.disabled = !can;
    fb.textContent = t.forceLock > 0 ? ("\u2716 The moment has passed (" + t.forceLock + ")")
                   : can ? "\u26a1 Force the election" : "\u26a1 Force the election (not yet)";
  }
};
G.UI.refreshGovActions = function () {
  var t = G.term;
  var rb = $("reshuffleBtn");
  if (rb) rb.style.display = (t && t.kind === "govt" && !t.over && !t.reshuffleUsed) ? "" : "none";
  var rp = $("reshufflePanel"); if (rp && (!t || t.kind !== "govt" || t.reshuffleUsed)) { rp.style.display = "none"; }
  G.UI.renderPledges();
  G.UI.renderOppPanel();
};
G.UI.renderGovern = function () {
  var t = G.term, opp = t.kind === "opp";
  if ($("govHeading")) $("govHeading").textContent = opp ? "In opposition" : "In government";
  $("govSession").textContent = "· session " + t.session + " of " + t.length;
  var modeLabel = opp
    ? (t.mode === "dynasty" ? (G.state.lineage + " opposition") : t.mode === "wildcard" ? "Wildcard opposition" : "Opposition front bench")
    : (t.mode === "dynasty" ? (G.state.lineage + " government") : t.mode === "wildcard" ? "Wildcard government" : "Cabinet of all the talents");
  if (t.coalition) modeLabel += " · coalition";
  else if (t.minority) modeLabel += " · minority";
  $("govModeTag").textContent = modeLabel + " · " + (t.difficulty || "normal");
  G.UI._meterLabel("meterApproval", opp ? "Public support" : "Approval");
  G.UI._meterLabel("meterEconomy", opp ? "Momentum" : "Economy");
  G.UI._meterLabel("meterUnity", "Party unity");
  G.UI.setMeter("meterApproval", t.meters.approval);
  G.UI.setMeter("meterEconomy", t.meters.economy);
  G.UI.setMeter("meterUnity", t.meters.unity);
  G.UI.updateGovSeats();
  G.UI.refreshGovActions();
  $("govLog").innerHTML = '<div class="feed-line muted">' +
    (opp ? "You take charge of the Opposition. The long campaign begins…" : "You enter office. The work begins…") + '</div>';
  G.UI.showEvent(t.current);
  G.UI.show("screen-govern");
};
G.UI.pushGovLog = function (lines) {
  var feed = $("govLog");
  (Array.isArray(lines) ? lines : [lines]).slice().reverse().forEach(function (ln) {
    var d = document.createElement("div");
    d.className = "feed-line" + (ln.cls ? " gl-" + ln.cls : "");
    d.textContent = ln.text;
    feed.insertBefore(d, feed.firstChild);
  });
  while (feed.children.length > 9) feed.removeChild(feed.lastChild);
};
G.UI.afterChoice = function () {
  var t = G.term;
  G.UI.setMeter("meterApproval", t.meters.approval);
  G.UI.setMeter("meterEconomy", t.meters.economy);
  G.UI.setMeter("meterUnity", t.meters.unity);
  G.UI.updateGovSeats();
  G.UI.refreshGovActions();
  $("govSession").textContent = "· session " + Math.min(t.session, t.length) + " of " + t.length;
  if (!t.over) G.UI.showEvent(t.current);
};
G.UI.legacyText = function (v) {
  if (v.kind === "opp") {
    var ov = v.outcome === "ousted" ? "I was deposed as Leader of the Opposition"
      : v.outcome === "forced" ? "I forced the government to an early election"
      : "I led the Opposition for a full parliament";
    return "650 — " + ov + ". Opposition score " + v.legacy + "/100: \u201c" + v.tier.label + "\u201d. " +
           "Build a cabinet and play at 650-0.co.uk";
  }
  var verb = v.outcome === "collapsed"
    ? "My government fell after " + v.sessionsServed + " sessions"
    : "I governed for a full term";
  return "650 — " + verb + ". Legacy score " + v.legacy + "/100: \u201c" + v.tier.label + "\u201d. " +
         "Build a cabinet and govern at 650-0.co.uk";
};
G.UI.renderLegacy = function (v) {
  var opp = v.kind === "opp";
  var b = $("legacyBanner");
  var fell = v.outcome === "collapsed" || v.outcome === "ousted";
  var win = ["great", "good", "swept", "forced"].indexOf(v.tier.key) !== -1;
  b.className = "legacy-banner " + (fell ? "fell" : win ? "win" : "mixed");
  b.textContent = v.tier.label;
  $("legacyLine").textContent = v.tier.line;
  G.UI._meterLabel("legApproval", opp ? "Public support" : "Approval");
  G.UI._meterLabel("legEconomy", opp ? "Momentum" : "Economy");
  G.UI._meterLabel("legUnity", "Party unity");
  G.UI.setMeter("legApproval", v.meters.approval);
  G.UI.setMeter("legEconomy", v.meters.economy);
  G.UI.setMeter("legUnity", v.meters.unity);
  $("legSeats").innerHTML = "<b>" + v.seats + "</b> seats · " + v.sessionsServed + " of " + v.length +
    " sessions served" + (v.caretakers ? " · " + v.caretakers + " caretaker department" + (v.caretakers > 1 ? "s" : "") : "");
  var pb = $("legacyPledges");
  if (pb) {
    if (v.pledges && v.pledges.length) {
      pb.style.display = "";
      pb.innerHTML = '<span class="pl-cap">Pledges</span>' + v.pledges.map(function (pl) {
        var st2 = pl.status === "open" ? "undone" : pl.status;
        return '<span class="pledge ' + (pl.status === "open" ? "broken" : pl.status) + '">' + G.UI._esc(pl.label) + '<i>' + st2 + '</i></span>';
      }).join("");
    } else { pb.style.display = "none"; pb.innerHTML = ""; }
  }
  var box = $("termReview"); box.innerHTML = "";
  v.history.forEach(function (h) {
    var row = document.createElement("div"); row.className = "tr-row";
    row.innerHTML = '<span class="tr-s">S' + h.session + '</span>' +
                    '<span class="tr-t">' + h.title + '</span>' +
                    '<span class="tr-c">' + h.choice + '</span>';
    box.appendChild(row);
  });
  G.UI.show("screen-legacy");
  G.UI.countTo($("legacyNum"), v.legacy, 100);   // legacy is out of 100, not 650
};

/* =========================================================== WATCH-ALONG = */
G.UI.renderWatch = function (res) {
  var colour = G.UI.ticketColour(G.state);
  $("watchTicketName").textContent = G.UI.ticketName(G.state);
  $("watchSeats").textContent = "0";
  $("watchDeclared").textContent = "0";
  $("watchMaj").textContent = G.CONFIG.majority;
  $("watchFeed").innerHTML = '<div class="feed-line muted">The polls have closed. Counting begins…</div>';
  $("toResultBtn").style.display = "none";
  $("skipCountBtn").style.display = "";
  var map = G.UI.buildMap("mapWatch", { mode: "result", results: res.campaign.results, colour: colour,
                                        blocLabel: res.campaign.blocLabel, revealed: false });
  G.UI.renderMapLegend("mapWatchLegend", colour, G.state.mode, res.breakdown);
  G.UI.show("screen-watch");
  return { byId: map.byId, colour: colour };
};

G.UI.pushFeed = function (text, cls) {
  var feed = $("watchFeed");
  var line = document.createElement("div");
  line.className = "feed-line" + (cls ? " " + cls : "");
  line.textContent = text;
  feed.insertBefore(line, feed.firstChild);
  while (feed.children.length > 200) feed.removeChild(feed.lastChild);
};

G.UI.setWatchTally = function (seats, declared) {
  $("watchSeats").textContent = seats;
  $("watchDeclared").textContent = declared;
};

/* ============================================================== RESULTS == */
G.UI.renderResult = function (res) {
  var C = G.CONFIG;
  var banner = $("govtBanner");
  if (res.tier.govt) {
    banner.className = "govt-banner win";
    banner.textContent = res.tier.key === "hung"
      ? "You are invited to form a government" : "You form His Majesty's Government";
  } else if (res.tier.role === "minor") {
    banner.className = "govt-banner lose";
    banner.textContent = res.seats <= 0 ? "Wiped out — no seats in the Commons" : "A minor party on the back benches";
  } else if (res.tier.role === "kingmaker") {
    banner.className = "govt-banner";
    banner.textContent = "You hold the balance of power";
  } else {
    banner.className = "govt-banner lose";
    banner.textContent = "You lead the Opposition — the Shadow Cabinet";
  }

  $("tierName").textContent = res.tier.label;

  var maj = res.majorityOf, ml;
  if (res.seats >= C.totalSeats) ml = "Every seat in the Commons. This is not supposed to be possible.";
  else if (res.tier.govt && maj >= 0) ml = "A working majority of <b>" + maj + "</b>.";
  else if (res.tier.role === "opposition")
    ml = "The <b>Official Opposition</b> on <b>" + res.seats + "</b> seats \u2014 second only to " + G.UI._esc((res.breakdown[0] && res.breakdown[0].party) || "the government") + ".";
  else if (res.tier.role === "minor")
    ml = res.seats <= 0 ? "Not a single seat returned." :
         "<b>" + res.seats + "</b> seats \u2014 the <b>" + G.ordinal(res.youRank || res.breakdown.length) + "</b> largest party. Too few to be the Official Opposition.";
  else ml = "Short of a majority by <b>" + Math.abs(maj) + "</b> seats.";
  if (res.contestable < C.totalSeats)
    ml += " &nbsp;·&nbsp; this ticket could only contest <b>" + res.contestable + "</b> seats.";
  $("majorityLine").innerHTML = ml;

  /* post-election: solo government, coalition, or opposition */
  G.UI.renderPostElection(res);

  /* the full House breakdown */
  G.UI.renderStandings("seatBreakdown", res.breakdown);

  /* results map (fully declared) + a per-region summary */
  var colour = G.UI.ticketColour(G.state);
  G.UI.buildMap("mapResult", { mode: "result", results: res.campaign.results, colour: colour,
                               blocLabel: res.campaign.blocLabel, revealed: true });
  G.UI.renderMapLegend("mapResultLegend", colour, G.state.mode, res.breakdown);
  G.UI.renderRegionSummary("regionSummary", res, colour);

  /* odds */
  var pc = function (x) { return x >= 0.995 ? "100%" : x <= 0.0005 ? "<0.1%" : (x * 100).toFixed(x < 0.1 ? 1 : 0) + "%"; };
  $("oddMaj").textContent = pc(res.odds.majority);
  $("oddLand").textContent = pc(res.odds.landslide);
  $("oddSuper").textContent = pc(res.odds.supermajority);
  $("oddSweep").textContent = pc(res.odds.sweep);
  $("rangeNote").innerHTML = "This campaign returned <b>" + res.seats + "</b> on <b>" +
    (res.voteShare * 100).toFixed(1) + "%</b> of the vote. Across " + C.trials.toLocaleString() +
    " simulated campaigns the result ranged from <b>" + res.range.low + "</b> to <b>" + res.range.high +
    "</b> seats (median <b>" + res.range.median + "</b>; central projection <b>" + res.expectedSeats +
    "</b>). Run it again to fight another.";

  /* commons bar */
  $("majMark").style.left = (C.majority / C.totalSeats * 100) + "%";
  $("majKeyLabel").textContent = C.majority + " needed";
  setTimeout(function () { $("commonsFill").style.width = (res.seats / C.totalSeats * 100) + "%"; }, 80);

  /* front bench */
  var roll = $("cabinetRoll"); roll.innerHTML = "";
  G.PORTFOLIOS.forEach(function (port) {
    var h = G.state.cabinet[port.key];
    var line = document.createElement("div"); line.className = "roll-line";
    line.innerHTML = '<span class="r">' + port.name + '</span><span class="n">' + (h ? h.name : "—") + '</span>';
    roll.appendChild(line);
  });

  G.UI.countTo($("seatNumber"), res.seats);
  G.UI.show("screen-result");
};

G.UI.countTo = function (el, target, outOf) {
  outOf = outOf || 650;
  var start = performance.now(), dur = 1100;
  function frame(t) {
    var k = Math.min(1, (t - start) / dur);
    var eased = 1 - Math.pow(1 - k, 3);
    var v = Math.round(target * eased);
    el.innerHTML = v + '<span class="of"> / ' + outOf + '</span>';
    if (k < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
};

/* ------------------------------------------------- shareable result card */
G.UI._policySel = {};
G.UI._policyMode = "manifesto";
G.UI.renderPolicy = function (mode) {
  G.UI._policyMode = mode;
  var isProg = mode === "programme";
  $("policyTitle").textContent = isProg ? "Your programme for government" : "Your manifesto";
  $("policyIntro").textContent = isProg
    ? "What you will actually do in office. Match your manifesto to keep faith with the voters — diverge, and your own party may cry betrayal."
    : "What you promise to win votes. Each stance helps or hurts you at the ballot box; choose the platform you'll run on.";
  $("policyConfirm").textContent = isProg ? "Take office with this programme →" : "Adopt this manifesto →";

  var base = isProg ? ((G.state && G.state.policy) || {}) : {};
  G.UI._policySel = {};
  G.POLICY_AXES.forEach(function (ax) { G.UI._policySel[ax.key] = base[ax.key] || ax.options[0].key; });

  var box = $("policyAxes"); box.innerHTML = "";
  G.POLICY_AXES.forEach(function (ax) {
    var group = document.createElement("div"); group.className = "policy-axis";
    var h = document.createElement("p"); h.className = "policy-axis-title"; h.textContent = ax.title; group.appendChild(h);
    var opts = document.createElement("div"); opts.className = "policy-opts";
    ax.options.forEach(function (o) {
      var b = document.createElement("button");
      b.className = "policy-opt" + (G.UI._policySel[ax.key] === o.key ? " sel" : "");
      b.setAttribute("data-axis", ax.key); b.setAttribute("data-opt", o.key);
      b.innerHTML = '<span class="po-label">' + o.label + '</span><span class="po-blurb">' + o.blurb + '</span>';
      b.onclick = function () {
        G.UI._policySel[ax.key] = o.key;
        var sibs = opts.querySelectorAll(".policy-opt");
        for (var i = 0; i < sibs.length; i++) sibs[i].classList.toggle("sel", sibs[i].getAttribute("data-opt") === o.key);
      };
      opts.appendChild(b);
    });
    group.appendChild(opts); box.appendChild(group);
  });
  G.UI.show("screen-policy");
};

G.UI.renderPostElection = function (res) {
  var gp = $("governPanel"), cp = $("coalitionPanel"), op = $("oppositionPanel"), C = G.CONFIG;
  gp.style.display = "none"; cp.style.display = "none"; op.style.display = "none";
  if (!res.govern) return;                       // player chose "just the election"
  var co = res.coalition;

  if (co.soloMajority) {
    gp.style.display = "";
    var gv = res.governVerdict;
    var word = gv.stability >= 66 ? "commanding" : gv.stability >= 50 ? "workable" : gv.stability >= 38 ? "precarious" : "fragile";
    $("govPct").textContent = gv.stability + "%";
    $("govLine").textContent = "Your opening position looks " + word + ". Take office and govern through a full parliament — steer approval, the economy and your party, survive the crises, and chase a lasting legacy.";
    setTimeout(function () { $("govFill").style.width = gv.stability + "%"; }, 90);
    return;
  }

  if (co.deals.length > 0 || co.canMinority) {
    cp.style.display = "";
    $("coalitionIntro").innerHTML = "No party has a majority — you hold <b>" + res.seats + "</b> seats and need <b>" + C.majority +
      "</b>. " + (co.largest ? "As the largest party you get first go at forming a government." : "You could still try to assemble a majority of others.");
    var box = $("coalitionOptions"); box.innerHTML = "";
    co.deals.forEach(function (d, i) {
      var names = d.parties.map(function (p) { return p.party; }).join(" + ");
      var sw = d.parties.map(function (p) { return '<span class="coal-sw" style="background:' + p.colour + '"></span>'; }).join("");
      var b = document.createElement("button");
      b.className = "coal-opt"; b.setAttribute("data-act", "deal"); b.setAttribute("data-i", i);
      var tag = d.tag || (d.natural ? "natural" : "unlikely");
      b.innerHTML = '<span class="coal-main">' + sw + 'Coalition with ' + names + '</span>' +
                    '<span class="coal-meta"><span class="coal-sub">' + d.combined + ' seats</span>' +
                    '<span class="coal-tag ' + tag + '">' + tag + '</span></span>';
      box.appendChild(b);
    });
    if (co.canMinority) {
      var m = document.createElement("button");
      m.className = "coal-opt minority"; m.setAttribute("data-act", "minority");
      m.innerHTML = '<span class="coal-main">Govern alone as a minority</span><span class="coal-meta"><span class="coal-sub">' + res.seats + ' seats · confidence on a knife-edge</span></span>';
      box.appendChild(m);
    }
    var o = document.createElement("button");
    o.className = "coal-opt opp"; o.setAttribute("data-act", "opposition");
    o.innerHTML = '<span class="coal-main">Decline — go into opposition</span><span class="coal-meta"><span class="coal-sub">let others try to govern</span></span>';
    box.appendChild(o);
    return;
  }

  op.style.display = "";
  var ob = $("oppositionBtn");
  if (res.tier.role === "minor") {
    $("oppositionLine").textContent = res.seats <= 0
      ? "You were wiped out — not a single seat. There is no Opposition to lead from here; regroup and fight another election."
      : "With " + res.seats + " seats you are the " + G.ordinal(res.youRank || res.breakdown.length) + " largest party — too few to form the Official Opposition. You can scrap on from the margins, but real power is a long way off.";
    if (ob) ob.textContent = res.seats <= 0 ? "Into the wilderness →" : "Fight on from the margins →";
  } else {
    $("oppositionLine").textContent = "You came up short and cannot form a government. Lead the Opposition: hold the government to account, win the by-elections, build public support and try to force them out before the next election.";
    if (ob) ob.textContent = "Lead the Opposition →";
  }
};

G.UI.renderStandings = function (containerId, breakdown, opts) {
  opts = opts || {};
  var box = $(containerId); if (!box) return;
  var max = 1; breakdown.forEach(function (b) { if (b.seats > max) max = b.seats; });
  box.innerHTML = breakdown.map(function (b) {
    var pct = Math.round(b.seats / max * 100);
    return '<div class="st-row' + (b.isYou ? " you" : "") + '">' +
      '<span class="st-name"><span class="st-sw" style="background:' + b.colour + '"></span>' +
        b.party + (b.isYou ? ' <span class="st-you">you</span>' : '') + '</span>' +
      '<span class="st-bar"><span class="st-fill" style="width:' + pct + '%;background:' + b.colour + '"></span></span>' +
      '<span class="st-seats">' + b.seats + '</span>' +
    '</div>';
  }).join("");
};
G.UI.drawShareCard = function (res) {
  var cv = $("shareCanvas"), x = cv.getContext("2d");
  var W = cv.width, H = cv.height;

  /* background */
  x.fillStyle = "#f3ecda"; x.fillRect(0, 0, W, H);
  var g = x.createRadialGradient(W * 0.5, -40, 0, W * 0.5, -40, W);
  g.addColorStop(0, "rgba(47,93,58,.14)"); g.addColorStop(1, "rgba(47,93,58,0)");
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.strokeStyle = "#20201b"; x.lineWidth = 3; x.strokeRect(26, 26, W - 52, H - 52);
  x.strokeStyle = "#b3862f"; x.lineWidth = 1; x.strokeRect(34, 34, W - 68, H - 68);

  /* masthead */
  x.textAlign = "center"; x.fillStyle = "#862231";
  x.font = "500 22px 'Spline Sans Mono', monospace";
  var modeLine = G.state.mode === "dynasty" ? (String(G.state.lineage).toUpperCase() + " DYNASTY")
               : (G.state.custom && G.state.custom.name) ? String(G.state.custom.name).toUpperCase().slice(0, 30)
               : G.state.mode === "wildcard" ? "WILDCARD CABINET" : "UNITY TICKET";
  x.fillText("6 5 0   ·   " + modeLine, W / 2, 74);
  x.strokeStyle = "rgba(32,32,27,.28)"; x.lineWidth = 1;
  x.beginPath(); x.moveTo(70, 92); x.lineTo(W - 70, 92); x.stroke();

  /* LEFT — the headline result */
  var lx = 270;
  x.textAlign = "center"; x.fillStyle = "#20201b";
  x.font = "900 150px 'Fraunces', Georgia, serif";
  x.fillText(String(res.seats), lx, 250);
  x.fillStyle = "#4f4a3c"; x.font = "500 22px 'Spline Sans Mono', monospace";
  x.fillText("SEATS OF 650", lx, 288);
  x.fillStyle = "#862231"; x.font = "italic 700 30px 'Fraunces', Georgia, serif";
  x.fillText(res.tier.label, lx, 340);
  x.fillStyle = res.tier.govt ? "#2f5d3a" : "#862231";
  x.font = "500 19px 'Spline Sans Mono', monospace";
  x.fillText(res.tier.govt ? "FORMS THE GOVERNMENT" : "LEADS THE OPPOSITION", lx, 374);
  var maj = res.majorityOf;
  var majLine = (res.voteShare != null ? (Math.round(res.voteShare * 1000) / 10) + "% vote" : "");
  if (typeof maj === "number") majLine += (majLine ? "  ·  " : "") + (maj >= 0 ? "majority " + maj : maj + " short");
  x.fillStyle = "#4f4a3c"; x.font = "400 18px 'Spline Sans Mono', monospace";
  x.fillText(majLine, lx, 406);

  /* divider */
  x.strokeStyle = "rgba(32,32,27,.22)"; x.lineWidth = 1;
  x.beginPath(); x.moveTo(512, 118); x.lineTo(512, H - 96); x.stroke();

  /* RIGHT — the full cabinet */
  var rx = 548;
  x.textAlign = "left"; x.fillStyle = "#862231";
  x.font = "500 20px 'Spline Sans Mono', monospace";
  x.fillText("THE CABINET", rx, 138);
  var shortRole = {
    pm: "PM", chancellor: "CHANCELLOR", foreign: "FOREIGN", home: "HOME",
    deputy: "DEPUTY PM", defence: "DEFENCE", health: "HEALTH", education: "EDUCATION",
    justice: "JUSTICE", business: "BUSINESS", whip: "CHIEF WHIP", leader: "LEADER"
  };
  var y = 172, lh = 31;
  G.PORTFOLIOS.forEach(function (port) {
    var who = G.state.cabinet[port.key];
    x.fillStyle = "#862231"; x.font = "500 13px 'Spline Sans Mono', monospace";
    x.fillText(shortRole[port.key] || port.key.toUpperCase(), rx, y);
    x.fillStyle = "#20201b"; x.font = "600 21px 'Newsreader', Georgia, serif";
    x.fillText(who ? who.name : "—", rx + 168, y);
    y += lh;
  });

  /* footer */
  x.textAlign = "center"; x.fillStyle = "#4f4a3c";
  x.font = "400 18px 'Spline Sans Mono', monospace";
  x.fillText("650-0.co.uk   ·   build a cabinet, fight an election, go 650-0", W / 2, H - 46);

  return cv.toDataURL("image/png");
};
G.UI.shareCardBlob = function (res) {
  G.UI.drawShareCard(res);
  var cv = $("shareCanvas");
  return new Promise(function (resolve, reject) {
    if (cv.toBlob) cv.toBlob(function (b) { b ? resolve(b) : reject(new Error("no blob")); }, "image/png");
    else reject(new Error("toBlob unsupported"));
  });
};

G.UI.resultText = function (res) {
  var pm = G.state.cabinet["pm"], ch = G.state.cabinet["chancellor"];
  var modeLine = G.state.mode === "dynasty" ? (G.state.lineage + " dynasty")
               : (G.state.custom && G.state.custom.name) ? ("\u201c" + G.state.custom.name + "\u201d")
               : G.state.mode === "wildcard" ? "wildcard cabinet" : "unity ticket";
  var lines = [
    "650 — my " + modeLine + " won " + res.seats + " of 650 seats.",
    res.tier.label + (res.tier.govt ? " — formed the government." : " — leads the opposition."),
    (pm ? "PM: " + pm.name : "") + (ch ? "  ·  Chancellor: " + ch.name : ""),
    "Can you go 650-0? — 650-0.co.uk"
  ];
  return lines.filter(Boolean).join("\n");
};

/* ------------------------------------------------------------- about --- */
G.UI.renderAbout = function () {
  $("aboutBody").innerHTML =
    '<h3>The idea</h3>' +
    '<p>Spin a wheel that lands on a party and an era, draft whichever politician fortune offers you, and fill every seat of the cabinet. Then hold a general election. Win a majority of the 650 seats and you govern; fall short and you can try to build a coalition, govern as a minority, or cross to the Opposition. The white whale is the impossible one — every seat in the Commons, a 650-0 clean sweep.</p>' +
    '<h3>With thanks</h3>' +
    '<p>650 is an unaffiliated homage to two brilliant sports-draft games: <b>82-0</b>, which has you draft an all-time NBA roster and chase a perfect 82–0 season, and <b>38-0</b>, the Premier League version over a 38-game season. 650 borrows their core loop — a constrained, luck-of-the-draw draft against the dream of a flawless record — and points it at Westminster.</p>' +
    '<h3>How a seat is scored</h3>' +
    '<p>Every politician carries five ratings: <code>appeal</code>, <code>experience</code>, <code>oratory</code>, <code>statecraft</code> and <code>party management</code>. Each cabinet seat weights those five differently — a Chancellor leans on statecraft and experience, the Leader of the House on oratory. Sit someone in a job they actually held and they earn a <b>fit</b> bonus. Sit them in a closely related one — a Leader of the House, Deputy or great-office holder as Prime Minister, say, or a Chancellor at Business — and they\'re marked <b>capable</b>: no bonus, but no penalty either, so your "could-have-been-PMs" don\'t suffer for it. Play someone truly out of position and they take the <b>stretch</b> penalty.</p>' +
    '<h3>How the election works — seat by seat</h3>' +
    '<p>Your cabinet\'s total strength maps to a projected national vote share, nudged by your chosen difficulty. That share sets a national per-seat win probability through a responsiveness curve inspired by the historic "cube law" of British elections. Then every one of the 650 constituencies is fought as its own contest: a regional lean, a shared regional swing, and a dose of per-seat luck decide each winner. That is the cruelty of first-past-the-post — a small move in the vote can swing a great many seats. Run many campaigns and you get the odds you were really facing. Every seat is awarded to a party, so the whole Commons is shown — your bench against all the rest, every hex in the winner\'s colours — and the make-up of the other parties reflects the current (2026) landscape, with Reform and the Greens as the serious forces they have become.</p>' +
    '<h3>Modes, casts, eras &amp; difficulty</h3>' +
    '<p>A <b>unity ticket</b> drafts across all parties and can contest all 650 seats. A <b>single-party dynasty</b> draws on one tradition\'s whole bench \u2014 and the bench is deep now: Labour and the Conservatives across two centuries, the Liberal line from the Whigs through the SDP to today, the SNP, Plaid, Reform\'s UKIP-and-Brexit heritage, the Greens, all five of Northern Ireland\'s main parties \u2014 and yes, the <b>Monster Raving Loony</b> fringe, every one of whom really stood. <b>Wildcard</b> throws open the whole globe and all of history, back to the age of Walpole and Pitt (an era you can also switch on elsewhere \u2014 it starts off by default). New <b>cast toggles</b> decide who else may walk in: SpAds, strategists and mandarins; and the mavericks and meme candidates, off by default and clearly marked. Difficulty now reaches the draft too: each of the three dealt cards <b>spins up a tier first</b> \u2014 front rank down to the new intake \u2014 with odds that blend your difficulty\'s appetite with the pool\'s own make-up, then takes a uniform pick within it. Random at its core: an awful round is always possible. But if your bench is genuinely struggling part-way through, the party <b>grandees may intervene</b> with a top-shelf deal \u2014 a couple of times on Easy, once on Normal, never on Hard. You can also leave eras out, hide the ratings to draft blind, set the count\'s pace, take a standard twelve or an <b>expanded</b> sixteen, choose your <b>do-overs</b>, and switch on the <b>policy phase</b>: a manifesto before the vote, and your promises tracked in office.</p>' +
    '<h3>Govern \u2014 or oppose: two different games</h3>' +
    '<p><b>In government</b> you steer Approval, the Economy and Party Unity through a parliament of crises \u2014 your drafted ministers resolve the gambles, so a brilliant Chancellor lands the risky Budget a weak one wrecks. v6 adds the <b>mid-term Budget</b> set-piece, a once-a-term <b>reshuffle</b> to rescue a misfit department, and the <b>pledge tracker</b>: your manifesto promises sit on screen all term, delivered for legacy or shelved at a price. By-elections nibble your majority; let unity collapse and the benches revolt; survive to polling day for a <b>legacy score</b>.</p>' +
    '<p><b>In opposition</b> the game changes shape: the government you face is simulated in front of you, its standing and economic record decaying in public view. You choose an <b>attack line</b> each phase \u2014 hit the weaker front and it bites harder \u2014 fight <b>by-elections in the actual seats you nearly won</b> on your own map, see off leadership challenges, and decide the biggest call yourself: when to <b>force the election</b>. Call it too early and the moment passes; time it right and you bring the government down.</p>' +
    '<p>Every sitting MP is draftable, by their real name, party and constituency, sourced from <b>mySociety\'s parlparse</b> open dataset \u2014 alongside getting on for five hundred hand-rated figures from Walpole\'s day to this morning\'s papers. That depth is what lets every tradition field a full single-party dynasty, and what makes a normal game\'s draftable pool run well past fifteen hundred names.</p>' +
    '<div class="rng-simple"><h4>How the dice work, in plain terms</h4>' +
    '<p>Your cabinet\'s strength sets a national vote share \u00b7 a swing curve turns votes into seats \u00b7 every one of the 650 seats then rolls its own dice, with its own persistent lean \u00b7 every rival party fields a random front bench of its own that shapes who takes the seats you lose \u00b7 the draft itself spins weighted tiers, with a rare rescue from the grandees when you\'re struggling \u00b7 difficulty tilts all of it, openly. Nothing is scripted; the same run replays identically from its seed.</p>' +
    '<button class="btn btn-ghost" id="rngMoreBtn">The full machinery \u2192</button></div>' +
    '<h3>The ratings are meant to be argued about</h3>' +
    '<p>The stats are an editorial abstraction, applied by the same logic to every party and anchored to the record where possible. Wildcard mode is satire, not endorsement: figures responsible for atrocities are named as historical fact and their disastrous records keep them poor picks. Everything lives in one plain data file, so disagree by editing it.</p>';
  G.UI.show("screen-about");
};

/* ------------------------------------------------------- leaderboard ---- */
G.UI._esc = function (s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); };
G.UI._lbView = "communal";
G.UI._lbCache = { top: [], communal: false };
G.UI._cabinetInner = function (e) {
  var rows = (e.cabinet || []).map(function (s) {
    return '<div class="lbd-seat"><span class="role">' + G.UI._esc(s.seat) + '</span><span class="who">' + G.UI._esc(s.name) + ' <span class="lb-sub">' + G.UI._esc(s.party) + '</span></span></div>';
  }).join("");
  var bd = (e.breakdown && e.breakdown.length) ? '<div class="lbd-bd">Commons: ' + e.breakdown.slice(0,6).map(function(b){ return G.UI._esc(b.party) + " " + (b.seats|0); }).join(" \u00b7 ") + '</div>' : "";
  var party = e.partyName ? '<div class="lbd-bd">Standing as <b>' + G.UI._esc(e.partyName) + '</b>' +
        (e.partyAlign && G.alignLabel ? ' \u00b7 ' + G.UI._esc(G.alignLabel(e.partyAlign)) : '') + '</div>' : "";
  if (!rows) rows = '<p class="lb-sub">No cabinet stored for this entry.</p>';
  return party + rows + bd;
};
G.UI._lbRowEl = function (e, rank) {
  var row = document.createElement("div");
  row.className = "lb-row expandable" + (rank <= 3 && G.UI._lbView === "communal" ? " top" : "");
  var leg = (e.legacy === null || e.legacy === undefined) ? "—" : ("" + e.legacy);
  var tag = (e.mode || "") + (e.govt ? " \u00b7 govt" : "");
  row.innerHTML =
    '<span class="lb-rk">' + rank + '</span>' +
    '<span class="lb-nm ' + G.UI.roleClass(e.level || 1) + '">' + G.UI._esc(e.name || "—") + '</span>' +
    '<span class="lb-md">' + G.UI._esc(tag) + '</span>' +
    '<span class="lb-seats">' + (e.seats | 0) + '</span>' +
    '<span class="lb-leg">' + leg + '</span>';
  var detail = null;
  row.onclick = function () {
    if (detail) { detail.parentNode.removeChild(detail); detail = null; return; }
    detail = document.createElement("div"); detail.className = "lb-detail"; detail.innerHTML = G.UI._cabinetInner(e);
    row.parentNode.insertBefore(detail, row.nextSibling);
  };
  return row;
};
G.UI._drawLb = function () {
  var box = $("lbTable"); if (!box) return;
  box.innerHTML = "";
  var tabs = document.createElement("div"); tabs.className = "lb-tabs";
  [["communal", "Communal"], ["personal", "Your runs"]].forEach(function (t) {
    var b = document.createElement("button");
    b.className = "lb-tab" + (G.UI._lbView === t[0] ? " sel" : "");
    b.textContent = t[1];
    b.onclick = function () { G.UI._lbView = t[0]; G.UI._drawLb(); };
    tabs.appendChild(b);
  });
  box.appendChild(tabs);
  function head() { var h = document.createElement("div"); h.className = "lb-row lb-head"; h.innerHTML = '<span class="lb-rk">#</span><span class="lb-nm">Player</span><span class="lb-md">Ticket</span><span class="lb-seats">Seats</span><span class="lb-leg">Legacy</span>'; return h; }
  function section(title, rows) {
    if (title) { var p = document.createElement("p"); p.className = "section-label"; p.style.marginTop = "14px"; p.textContent = title; box.appendChild(p); }
    box.appendChild(head());
    if (!rows.length) { var e = document.createElement("p"); e.className = "pool-empty"; e.textContent = "No runs yet."; box.appendChild(e); return; }
    rows.forEach(function (en, i) { box.appendChild(G.UI._lbRowEl(en, i + 1)); });
  }
  if (G.UI._lbView === "communal") {
    section(null, (G.UI._lbCache.top || []).slice(0, G.LB.MAX_SHOW));
  } else {
    section("Your best 10", (G.LB.localTop ? G.LB.localTop(10) : []));
    var worst = (G.LB.localBottom ? G.LB.localBottom(10) : []);
    if (worst.length) section("Your worst 10", worst);
  }
};
G.UI.renderLeaderboard = function (top, communal, error) {
  var status = $("lbStatus");
  if (status) status.textContent =
      error === "not hardest mode" ? "Only the hardest mode (Wildcard \u00b7 Hard \u00b7 Expanded) is ranked \u2014 that run wasn\u2019t added to the board."
    : error === "duplicate" ? "You\u2019ve already posted this exact run \u2014 it wasn\u2019t added again."
    : error === "name taken" ? "That name is claimed by another player (on another device). Pick a different name to post."
    : error === "login" ? "The public board is for registered players \u2014 sign in (free) and your runs post under your account name."
    : error === "legacy required" ? "The board needs a fully governed term \u2014 finish a term to rank."
    : error ? "Couldn\u2019t reach the shared board \u2014 showing your local runs. Tap a row to see the cabinet."
    : communal ? "A shared, worldwide board \u2014 hardest mode, one best run per player. Tap a row to see the cabinet."
               : "A local board on this device. Tap a row to see the cabinet.";
  G.UI._lbCache = { top: top || [], communal: !!communal };
  if (G.UI._lbView !== "personal") G.UI._lbView = "communal";
  G.UI._drawLb();
};

/* =============================================================== PLATFORM ===
   Account bar, live banner, chatroom, housekeeping and the Live tab. All render
   defensively and degrade gracefully when the backend is unreachable.        */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return G.UI._esc(String(s == null ? "" : s)); };

  G.UI.applyAuth = function (me) {
    var who = $("acctWho"), open = $("acctOpenBtn"), adm = $("adminBtn");
    if (who) who.textContent = me ? ("Signed in as " + me.name + (me.level >= 9 ? " · admin" : me.level >= 5 ? " · moderator" : "")) : "Not signed in";
    if (open) open.textContent = me ? "Account / sign out" : "Sign in / Register";
    if (adm) adm.style.display = (me && me.level >= 5) ? "" : "none";
    var ci = $("chatInput"), cs = $("chatSend");
    if (ci) { ci.disabled = !me; ci.placeholder = me ? "Say something…" : "Sign in to chat…"; }
    if (cs) cs.disabled = !me;
  };

  G.UI.renderBanner = function (config) {
    var b = $("liveBanner"); if (!b) return;
    var on = config && config.banner && config.banner.active && config.banner.text;
    b.style.display = on ? "" : "none";
    b.innerHTML = on ? ('<span class="lb-dot">●</span> ' + esc(config.banner.text)) : "";
  };

  G.UI.renderChat = function (messages) {
    var feed = $("chatFeed"); if (!feed) return;
    var mod = G.NET && G.NET.isMod && G.NET.isMod();
    if (!messages || !messages.length) { feed.innerHTML = '<p class="chat-empty">No messages yet. Be the first.</p>'; return; }
    feed.innerHTML = messages.map(function (m) {
      var t = ""; try { t = new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); } catch (e) {}
      var badge = m.level >= 9 ? '<span class="chat-badge admin">admin</span>' : m.level >= 5 ? '<span class="chat-badge mod">mod</span>' : "";
      var del = mod ? '<button class="chat-del" data-id="' + esc(m.id) + '" title="delete">✕</button>' : "";
      return '<div class="chat-msg"><span class="chat-meta"><b class="' + G.UI.roleClass(m.level || 1) + '">' + esc(m.display) + '</b>' + badge + ' <span class="chat-time">' + t + '</span>' + del + '</span><span class="chat-text">' + esc(m.text) + '</span></div>';
    }).join("");
    feed.scrollTop = feed.scrollHeight;
  };

  G.UI.renderAdmin = function () {
    var c = (G.NET && G.NET.config) || { banner: {}, streams: [] };
    if ($("admBannerText")) $("admBannerText").value = (c.banner && c.banner.text) || "";
    if ($("admBannerActive")) $("admBannerActive").checked = !!(c.banner && c.banner.active);
    if ($("admStreams")) $("admStreams").value = (c.streams || []).map(function (s) { return (s.label || "") + " | " + (s.url || ""); }).join("\n");
    if ($("adminLvl")) $("adminLvl").textContent = G.NET && G.NET.me ? ("level " + G.NET.me.level) : "";
  };

  G.UI.renderAdminUsers = function (users) {
    var box = $("admUsers"); if (!box) return;
    if (!users || !users.length) { box.innerHTML = '<p class="chat-empty">No users yet.</p>'; return; }
    box.innerHTML = users.map(function (u) {
      return '<div class="adm-user' + (u.banned ? " banned" : "") + '">' +
        '<span class="au-name">' + esc(u.name) + ' <span class="au-lvl">L' + u.level + (u.banned ? " · banned" : "") + '</span></span>' +
        '<span class="au-acts">' +
          '<button class="link-btn" data-act="promote" data-u="' + esc(u.name) + '">+lvl</button>' +
          '<button class="link-btn" data-act="demote" data-u="' + esc(u.name) + '">−lvl</button>' +
          '<button class="link-btn" data-act="' + (u.banned ? "unban" : "ban") + '" data-u="' + esc(u.name) + '">' + (u.banned ? "unban" : "ban") + '</button>' +
        '</span></div>';
    }).join("");
  };

  G.UI.renderLive = function (config) {
    var grid = $("liveGrid"), msg = $("liveMsg"); if (!grid) return;
    var streams = (config && config.streams) || [];
    if (!streams.length) {
      grid.innerHTML = "";
      if (msg) msg.innerHTML = 'No streams configured yet. An admin can add embeddable UK TV / political-news streams in <b>Housekeeping</b>. Whether a given channel can be embedded is up to the broadcaster.';
      return;
    }
    if (msg) msg.textContent = "";
    grid.innerHTML = streams.map(function (s) {
      return '<div class="live-card"><div class="live-label">' + esc(s.label || "Live") + '</div>' +
        '<div class="live-frame"><iframe src="' + esc(s.url) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="no-referrer"></iframe></div></div>';
    }).join("");
  };
})();
