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

/* ---- party logos: pulled live as the party's website favicon, emoji-sized.
   Parties without a real website (historical, fringe, despots, the satire
   lineages) simply fall back to the existing colour dot. ------------------- */
G.PARTY_LOGO = {
  /* UK */
  "Labour": "labour.org.uk", "Conservative": "conservatives.com", "Tory": "conservatives.com",
  "Liberal Democrat": "libdems.org.uk", "Lib Dem": "libdems.org.uk",
  "Reform UK": "reform.uk", "Brexit Party": "reform.uk",
  "Green": "greenparty.org.uk", "Green Party": "greenparty.org.uk",
  "SNP": "snp.org", "Plaid Cymru": "partyof.wales",
  "Sinn Féin": "sinnfein.ie", "SDLP": "sdlp.ie", "DUP": "mydup.com",
  "UUP": "uup.org", "Alliance": "allianceparty.org", "UKIP": "ukip.org",
  "Your Party": "yourparty.uk",
  /* United States */
  "Democrat (USA)": "democrats.org", "US Democrat": "democrats.org",
  "Republican (USA)": "gop.com", "US Republican": "gop.com",
  /* Germany */
  "SPD (DE)": "spd.de", "CDU (DE)": "cdu.de", "CDU/CSU": "cdu.de",
  "Green (DE)": "gruene.de", "FDP (DE)": "fdp.de",
  /* France */
  "Parti Socialiste": "parti-socialiste.fr", "SFIO (FR)": "parti-socialiste.fr",
  /* Australia */
  "Australian Labor Party": "alp.org.au", "Labor (AU)": "alp.org.au",
  "Liberal (AU)": "liberal.org.au",
  /* Canada */
  "Liberal (CA)": "liberal.ca", "Conservative (CA)": "conservative.ca", "NDP": "ndp.ca",
  /* Japan */
  "LDP (JP)": "jimin.jp",
  /* India */
  "INC": "inc.in", "Congress (IN)": "inc.in", "BJP": "bjp.org", "BJP (IN)": "bjp.org",
  /* Russia / South Africa */
  "United Russia": "er.ru", "ANC": "anc1912.org.za"
};
G.UI.partyBadge = function (label, colour) {
  var dom = G.PARTY_LOGO && G.PARTY_LOGO[label];
  if (dom) {
    return '<img class="party-logo" src="https://www.google.com/s2/favicons?domain=' + dom +
           '&sz=64" alt="" loading="lazy" onerror="this.outerHTML=\'<span class=&quot;party-dot&quot; style=&quot;background:' +
           (colour || "#999") + '&quot;></span>\'">';
  }
  return '<span class="party-dot" style="background:' + (colour || "#999") + '"></span>';
};

var SCREENS = ["screen-menu", "screen-draft", "screen-watch", "screen-result", "screen-about", "screen-rng", "screen-explore", "screen-govern", "screen-legacy", "screen-policy", "screen-campaign", "screen-leaderboard", "screen-account", "screen-chat", "screen-admin", "screen-live", "screen-wiki", "screen-retirement"];

G.UI.show = function (screenId) {
  SCREENS.forEach(function (s) {
    var el = $(s); if (el) el.classList.toggle("active", s === screenId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* the colour a ticket's won seats are painted in */
G.UI.ticketColour = function (state) {
  if (state && state.mode === "dynasty") {
    /* Fly the SAME party the engine's playerBloc uses for this lineage
       (G.LINEAGE_PARTY) so the won seats, the legend and the standings bars
       all agree. Previously this returned whichever party happened to be
       registered last under the lineage, which — once a lineage gained extra
       parties (Alba under SNP, the Referendum Party under Reform, the far-right
       labels, the Fringe flavours) — no longer matched the bloc colour, so a
       dynasty's map and legend showed two different colours. */
    var lbl = (G.LINEAGE_PARTY && G.LINEAGE_PARTY[state.lineage]) || state.lineage;
    var pty = G.PARTIES[lbl];
    if (pty && pty.colour) return pty.colour;
    var keys = Object.keys(G.PARTIES);
    for (var i = 0; i < keys.length; i++) {
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
  pv.innerHTML = G.UI.partyBadge(d.politician.party, party ? party.colour : "#999") + (party ? party.label : d.politician.party);
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
      '<div class="dc-meta">' + G.UI.partyBadge(p.party, (G.PARTIES[p.party]||{}).colour||"#999") + G.UI._esc(p.party) + ' \u00b7 ' + ((G.ERA_BY_ID[p.era]||{}).label||p.era) + (p.scope==="wild"?' \u00b7 <span class="wild-tag">wildcard</span>':'') + (tierLabel?' \u00b7 <span class="tier-chip t-'+tierKey+'">'+tierLabel+'</span>':'') + '</div>' +
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
      var isCarryOver = G.state.carryOver && G.state.carryOver[port.key] &&
                        G.state.carryOver[port.key].name === holder.name;
      seat.className = "seat" + (despot ? " despot" : "") + (flagged ? " flagged" : "") + (isCarryOver ? " carry-over" : "");
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="seat-pic" data-pol="' + G.UI._esc(holder.name) + '"></span>' +
        '<span class="holder">' + G.UI._esc(holder.name) +
          (isCarryOver ? ' <span class="carry-badge">Returning</span>' : '') +
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
  var fill = el.querySelector(".meter-fill"), num = el.querySelector(".meter-num"), status = el.querySelector(".meter-status");
  var col = value < 34 ? "var(--oxblood,#862231)" : value < 55 ? "var(--brass,#b3862f)" : "var(--green,#2f5d3a)";
  if (fill) { fill.style.width = Math.max(0, Math.min(100, value)) + "%"; fill.style.background = col; }
  if (num) num.textContent = Math.round(value);
  if (status) {
    if (value < 30) { status.textContent = "Critical"; status.className = "meter-status ms-critical"; }
    else if (value < 45) { status.textContent = "Weak"; status.className = "meter-status ms-weak"; }
    else if (value < 65) { status.textContent = "Stable"; status.className = "meter-status ms-stable"; }
    else { status.textContent = "Strong"; status.className = "meter-status ms-strong"; }
  }
};
G.UI.updateGovSeats = function () {
  var t = G.term;
  var majNeeded = (G.activeMajority ? G.activeMajority() : G.CONFIG.majority);
  var maj = t.seats - majNeeded;
  $("govSeats").textContent = t.seats;
  $("govSeatsSub").textContent = maj >= 0 ? "(majority of " + maj + ")" : "(minority — " + Math.abs(maj) + " short)";
};
G.UI.showEvent = function (ev) {
  /* legacy no-op: events are now rendered by renderTurnEvents */
};
G.UI.renderTurnEvents = function () {
  var t = G.term, box = $("eventTurnCards"); if (!box || !t || !t.turnEvents) return;
  box.innerHTML = "";
  t.turnEvents.forEach(function (te, idx) {
    var ev = te.event, staged = te.stagedChoice;
    var card = document.createElement("div");
    card.className = "tc-card";
    var choicesHtml = ev.choices.map(function (c, ci) {
      var isSel = (staged === ci);
      return '<button class="choice' + (isSel ? " choice-staged" : "") + '" data-turn-idx="' + idx + '" data-choice-idx="' + ci + '">' +
        '<span class="choice-label">' + G.UI._esc(c.label) + '</span>' +
        '<span class="choice-sub">' + G.UI._esc(c.text || "") + '</span>' +
        '</button>';
    }).join("");
    card.innerHTML = '<div class="event-head"><span class="event-icon">' + G.UI._esc(ev.icon || "◆") + '</span>' +
      '<span class="event-title">' + G.UI._esc(ev.title) + '</span></div>' +
      '<p class="event-text">' + G.UI._esc(ev.text) + '</p>' +
      '<div class="event-choices">' + choicesHtml + '</div>';
    box.appendChild(card);
  });
  G.UI.updateConfirmBtn();
};
G.UI.updateConfirmBtn = function () {
  var btn = $("govConfirmBtn"); if (!btn) return;
  var staged = G.allChoicesStaged && G.allChoicesStaged();
  btn.disabled = !staged;
  btn.textContent = staged ? "Confirm choices →" : "Make your choices above to continue";
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
  var isGovt = t && t.kind === "govt" && !t.over;
  var isOpp  = t && t.kind === "opp"  && !t.over;
  var rb = $("reshuffleBtn");
  if (rb) rb.style.display = (isGovt && !t.reshuffleUsed) ? "" : "none";
  var rp = $("reshufflePanel"); if (rp && !isGovt) { rp.style.display = "none"; }
  var ceBtn = $("govCallElectionBtn");
  if (ceBtn) ceBtn.style.display = (isGovt && G.canCallEarlyElection && G.canCallEarlyElection()) ? "" : "none";
  var stBtn = $("govStatementBtn");
  if (stBtn) stBtn.style.display = (isGovt && !t.statementUsed) ? "" : "none";
  var pcBtn = $("oppPressConfBtn");
  if (pcBtn) pcBtn.style.display = (isOpp && !t.pressConfUsed) ? "" : "none";
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
  /* country context when governing abroad */
  var govSys = (t.systemKey && t.systemKey !== "fptp_uk" && G.ELECTORAL_SYSTEMS) ? G.ELECTORAL_SYSTEMS[t.systemKey] : null;
  if (govSys) modeLabel = (govSys.flag ? govSys.flag + " " : "") + govSys.country + " · " + modeLabel;
  $("govModeTag").textContent = modeLabel + " · " + (t.difficulty || "normal");
  G.UI._meterLabel("meterApproval", opp ? "Public support" : "Approval");
  G.UI._meterLabel("meterEconomy", opp ? "Momentum" : "Economy");
  G.UI._meterLabel("meterUnity", "Party unity");
  G.UI.setMeter("meterApproval", t.meters.approval);
  G.UI.setMeter("meterEconomy", t.meters.economy);
  G.UI.setMeter("meterUnity", t.meters.unity);
  G.UI.updateGovSeats();
  G.UI.refreshGovActions();
  var intro = '<div class="feed-line muted">' +
    (opp ? "You take charge of the Opposition. The long campaign begins…" : "You enter office. The work begins…") + '</div>';
  if (!opp && t.handovers && t.handovers.length) {
    var fl = t.coalitionFlavor || {};
    var rows = t.handovers.map(function (h) {
      return '<div class="coal-give"><span class="coal-give-post">' + G.UI._esc(h.title) + '</span>' +
             '<span class="coal-give-min"><span class="coal-sw" style="background:' + (h.colour || '#6b6b6b') + '"></span>' +
             G.UI._esc(h.minister.name) + ' <span class="coal-give-party">' + G.UI._esc(h.party) + '</span></span></div>';
    }).join("");
    intro = '<div class="coal-handover"><div class="coal-handover-h">' + G.UI._esc(fl.title || "Coalition") +
            '</div><p class="coal-handover-note">' + G.UI._esc(fl.note || "") +
            ' You cede <b>' + t.handovers.length + '</b> cabinet ' + (t.handovers.length === 1 ? 'post' : 'posts') +
            ' to your partners:</p>' + rows + '</div>' + intro;
  }
  $("govLog").innerHTML = intro;
  G.UI.renderSessionTrack();
  G.UI.renderElectorate(t && t.blocSupport);
  G.UI.renderTurnEvents();
  G.UI.renderObjectiveBanner();
  G.UI.renderCabinetStrip();
  G.UI.show("screen-govern");
};
/* the cabinet, left to right: a portrait + post per minister, tap for detail.
   Coalition partners carry their party colour as a ring + flag. */
G.UI.renderCabinetStrip = function () {
  var strip = document.getElementById("cabinetStrip");
  var panel = document.getElementById("cabinetStripPanel");
  if (!strip || !panel) return;
  var t = G.term, cab = (G.state && G.state.cabinet) || {};
  if (t && t.kind === "opp") { panel.style.display = "none"; return; }
  var html = (G.PORTFOLIOS || []).map(function (port) {
    var pol = cab[port.key]; if (!pol) return "";
    var coal = pol.coalitionParty;
    var ring = coal ? (pol.coalitionColour || "#888") : "";
    return '<button class="cab-min' + (coal ? ' coal' : '') + '" data-port="' + port.key + '"' +
      (coal ? ' style="--ring:' + ring + '"' : '') + ' title="' + G.UI._esc(port.name + ' — ' + pol.name) + '">' +
      '<span class="cab-face" data-pol="' + G.UI._esc(pol.name) + '">' + G.UI._initials(pol.name) + '</span>' +
      '<span class="cab-post">' + G.UI._esc(port.name) + '</span>' +
      (coal ? '<span class="cab-flag" style="background:' + ring + '"></span>' : '') +
      '</button>';
  }).join("");
  strip.innerHTML = html;
  panel.style.display = html ? "" : "none";
  G.UI._hydratePortraits(strip);
};

/* minister detail card — stats, morale, and one light interaction ("have a
   word" nudges loyalty, once a session). Coalition partners are read-only. */
G.UI.showMinisterCard = function (portKey) {
  var overlay = document.getElementById("ministerCardOverlay");
  var card = document.getElementById("ministerCard");
  if (!overlay || !card) return;
  var pol = G.state && G.state.cabinet && G.state.cabinet[portKey];
  var port = G.PORTFOLIO_BY_KEY && G.PORTFOLIO_BY_KEY[portKey];
  if (!pol || !port) return;
  var coal = pol.coalitionParty;
  var ms = G.minState ? G.minState(pol.name) : { loyalty: 55, ambition: 45, traits: [] };
  var s = pol.stats || {};
  function bar(lbl, v) {
    v = Math.max(0, Math.min(100, v || 0));
    return '<div class="mc-stat"><span class="mc-stat-l">' + lbl + '</span>' +
           '<span class="mc-stat-bar"><span style="width:' + v + '%"></span></span>' +
           '<span class="mc-stat-v">' + Math.round(v) + '</span></div>';
  }
  var traits = (ms.traits && ms.traits.length) ? ms.traits.join(", ") : "no notable traits yet";
  var wordable = !coal && G.term && !G.term.over && !(ms._wordedSession === G.term.session);
  card.innerHTML =
    '<button class="mc-close" data-mc="close" aria-label="Close">×</button>' +
    '<div class="mc-head">' +
      '<span class="mc-face" data-pol="' + G.UI._esc(pol.name) + '">' + G.UI._initials(pol.name) + '</span>' +
      '<div class="mc-id"><div class="mc-name">' + G.UI._esc(pol.name) + '</div>' +
        '<div class="mc-role">' + G.UI._esc(port.name) + (coal ? ' · <span class="mc-coal" style="color:' + (pol.coalitionColour || '#888') + '">' + G.UI._esc(coal) + '</span>' : '') + '</div></div>' +
    '</div>' +
    (pol.note ? '<p class="mc-note">' + G.UI._esc(pol.note) + '</p>' : '') +
    '<div class="mc-stats">' +
      bar("Appeal", s.appeal) + bar("Experience", s.experience) + bar("Oratory", s.oratory) +
      bar("Statecraft", s.statecraft) + bar("Party mgmt", s.partyMgmt) +
    '</div>' +
    '<div class="mc-morale">' +
      '<span>Loyalty <b>' + Math.round(ms.loyalty) + '</b></span>' +
      '<span>Ambition <b>' + Math.round(ms.ambition) + '</b></span>' +
      (ms.rivalry ? '<span class="mc-rival">plotting</span>' : '') +
    '</div>' +
    '<p class="mc-traits">' + G.UI._esc(traits) + '</p>' +
    (coal
      ? '<p class="mc-coalnote">A coalition partner — they answer to their own party, not to you.</p>'
      : (wordable
          ? '<button class="btn btn-ghost mc-word" data-mc="word" data-port="' + portKey + '">Have a quiet word</button>'
          : (G.term && !G.term.over ? '<p class="mc-done">You’ve already spoken with them this session.</p>' : '')));
  overlay.style.display = "flex";
  G.UI._hydratePortraits(card);
};
G.UI.hideMinisterCard = function () {
  var o = document.getElementById("ministerCardOverlay"); if (o) o.style.display = "none";
};
G.UI._haveWord = function (portKey) {
  var pol = G.state && G.state.cabinet && G.state.cabinet[portKey];
  if (!pol || !G.minState || !G.term) return;
  var ms = G.minState(pol.name);
  if (ms._wordedSession === G.term.session) return;
  ms.loyalty = Math.max(20, Math.min(95, (ms.loyalty || 55) + 4));
  ms._wordedSession = G.term.session;
  if (G.UI.pushGovLog) G.UI.pushGovLog({ text: "You had a quiet word with " + pol.name + " — loyalty steadies.", cls: "good" });
  G.UI.showMinisterCard(portKey);   // re-render (button now spent)
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
G.UI.afterConfirm = function () {
  var t = G.term;
  G.UI.setMeter("meterApproval", t.meters.approval);
  G.UI.setMeter("meterEconomy", t.meters.economy);
  G.UI.setMeter("meterUnity", t.meters.unity);
  G.UI.updateGovSeats();
  G.UI.refreshGovActions();
  $("govSession").textContent = "· session " + Math.min(t.session, t.length) + " of " + t.length;
  G.UI.renderSessionTrack();
  G.UI.renderElectorate(t && t.blocSupport);
  G.UI.renderCabinetStrip();
  if (!t.over) G.UI.renderTurnEvents();
};
G.UI.afterChoice = function () {
  G.UI.afterConfirm();
};

/* --------------------------------------------------------- session track --
   Renders a row of coloured dots showing progress through the parliament.
   Green = approval ≥ 58 when session ended, red = approval < 36, grey = ok,
   amber pulse = current session, faded = sessions yet to come.              */
G.UI.renderSessionTrack = function () {
  var el = $("sessionTrack"); if (!el) return;
  var t = G.term; if (!t) { el.innerHTML = ""; return; }
  var dots = [];
  for (var i = 1; i <= t.length; i++) {
    var hist = null;
    if (t.history) for (var j = 0; j < t.history.length; j++) if (t.history[j].session === i) { hist = t.history[j]; break; }
    var cls = "st-dot ";
    if (hist) {
      var m = hist.meters;
      cls += (m && m.approval >= 58) ? "st-done-good" : (m && m.approval < 36) ? "st-done-bad" : "st-done";
    } else if (i === Math.min(t.session, t.length)) {
      cls += "st-current";
    } else {
      cls += "st-future";
    }
    var tip = "Session " + i + (hist && hist.titles ? ": " + hist.titles : "");
    dots.push('<span class="' + cls + '" title="' + G.UI._esc(tip) + '"></span>');
  }
  var cur = Math.min(t.session, t.length);
  el.innerHTML = '<span class="st-label">Session ' + cur + ' / ' + t.length + '</span>' +
    '<div class="st-dots">' + dots.join("") + '</div>';
};

/* ----------------------------------------------- career parliament strip --
   Compact history of previous parliaments for result / legacy screens.      */
G.UI.renderCareerParlStrip = function (elId, career) {
  var el = $(elId); if (!el) return;
  if (!career || !career.active || !career.electionHistory || !career.electionHistory.length) {
    el.style.display = "none"; return;
  }
  el.style.display = "";
  var parts = ['<span class="cps-label">Career</span>'];
  career.electionHistory.forEach(function (h) {
    var t = h.tier || "";
    var cls = (t === "landslide" || t === "supermajority" || t === "sweep") ? "cps-landslide"
            : (t === "majority" || t === "largest" || t === "kingmaker") ? "cps-win"
            : (t === "wipeout") ? "cps-lose" : "";
    parts.push(
      '<span class="cps-item ' + cls + '">' +
        '<span class="cps-parl">' + ((G.UI.sysLabels ? G.UI.sysLabels(G.state && G.state._electoralSystemKey).termWord.slice(0,5) : "Parl") + ". " + (h.parliament || "?")) + '</span>' +
        '<span class="cps-seats">' + (h.seats || 0) + '</span>' +
        (h.electionYear ? '<span class="cps-year">' + h.electionYear + '</span>' : '') +
      '</span>'
    );
  });
  el.innerHTML = parts.join("");
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
                    '<span class="tr-t">' + G.UI._esc(h.titles || h.title || "") + '</span>' +
                    '<span class="tr-c">' + G.UI._esc(h.choices || h.choice || "") + '</span>';
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
  if ($("watchTotal")) $("watchTotal").textContent = "650";
  var wLbl = $("watchMapLabel");
  if (wLbl) wLbl.innerHTML = 'The results map <span class="board-note" id="watchMapNote">650 seats · hover to explore</span>';
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

/* International live count: build the country's per-seat hex cartogram (muted),
   then let the shared reveal loop flip each seat live by id. Returns the seat
   id→hex map plus the colour, mirroring renderWatch's contract. */
G.UI.renderWatchIntl = function (res, sys) {
  var colour = G.UI.ticketColour(G.state);
  $("watchTicketName").textContent = G.UI.ticketName(G.state);
  $("watchSeats").textContent = "0";
  $("watchDeclared").textContent = "0";
  if ($("watchTotal")) $("watchTotal").textContent = sys.totalSeats || "";
  $("watchMaj").textContent = sys.majority || 1;
  $("watchFeed").innerHTML = '<div class="feed-line muted">The polls have closed. Counting begins…</div>';
  $("toResultBtn").style.display = "none";
  $("skipCountBtn").style.display = "";
  var lbl = $("watchMapLabel");
  if (lbl) lbl.innerHTML = G.UI._esc((sys.flag ? sys.flag + " " : "") + sys.country + " — live count") +
    ' <span class="board-note" id="watchMapNote">' +
    G.UI._esc((sys.totalSeats || "") + " " + (sys.resultLabel || "seats") + " · hover to explore") + '</span>';

  var handle = G.UI.buildCountryMap ? G.UI.buildCountryMap("mapWatch", sys, res, colour, { revealed: false }) : false;
  G.UI.renderMapLegend("mapWatchLegend", colour, G.state.mode, res.breakdown);
  var wLabels = G.UI.sysLabels(sys.key);
  var wBdLabel = $("watchBreakdownLabel");
  if (wBdLabel) wBdLabel.innerHTML = 'Projected ' + G.UI._esc(wLabels.chamber) + ' <span class="board-note">updating live</span>';
  G.UI.show("screen-watch");
  return { intl: true, byId: (handle && handle.byId) || {}, colour: colour };
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

/* Helper: return system-specific label strings for a given electoral system key.
   Falls back gracefully to UK defaults when sysKey is absent or fptp_uk. */
G.UI.sysLabels = function (sysKey) {
  var sys = (sysKey && sysKey !== "fptp_uk" && G.ELECTORAL_SYSTEMS) ? G.ELECTORAL_SYSTEMS[sysKey] : null;
  return {
    chamber:      sys ? (sys.chamberName || "Parliament")     : "House of Commons",
    head:         sys ? (sys.headOfGovt  || "Prime Minister") : "Prime Minister",
    termWord:     sys ? (sys.termWord    || "Parliament")     : "Parliament",
    hung:         sys ? (sys.hungWord    || "No majority")    : "Hung parliament",
    electorate:   sys ? (sys.registeredElectorate || 47586602) : 47586602,
    turnoutRange: sys ? (sys.typicalTurnout || [0.60, 0.72])  : [0.60, 0.72]
  };
};

/* =========================================================
   INTERNATIONAL RESULT RENDERER
   ========================================================= */
G.UI.renderResultIntl = function (res) {
  var sys = G.ELECTORAL_SYSTEMS && G.ELECTORAL_SYSTEMS[G.state._electoralSystemKey];
  if (!sys) { G.UI.renderResult._base(res); return; }

  var C = G.CONFIG;
  G.UI.renderCareerParlStrip("careerParlStrip", G.career);

  var total = sys.totalSeats || 650;
  var majority = sys.majority || 326;
  var resultLabel = sys.resultLabel || "Seats";
  var flag = sys.flag || "";

  /* — banner — */
  var banner = $("govtBanner");
  var isDespot = sys.despotMode || sys.coalitionStyle === "guided";
  if (isDespot) {
    banner.className = "govt-banner win despot-banner";
    banner.textContent = flag + " " + sys.name + " — The people have spoken";
  } else if (res.tier.govt) {
    var govtPhrases = {
      ec_usa_president: "You win the Presidency",
      fptp_usa_house:   "You take the House",
      pr_dhondt_weimar: "You win the Reichstag",
      pr_dhondt_bundestag: "Your coalition takes the Bundestag",
      trs_france:       "Vous avez gagné l'Assemblée",
      av_australia:     "You form government",
      fptp_canada:      "You form government",
      fptp_india:       "You win the Lok Sabha",
      fptp_japan:       "You win the Shūgiin",
      fptp_uk:          "You form His Majesty's Government"
    };
    banner.className = "govt-banner win";
    banner.textContent = govtPhrases[sys.key] || (flag + " You win — " + sys.name);
  } else {
    banner.className = "govt-banner lose";
    banner.textContent = "Defeat — " + res.seats + " " + resultLabel;
  }

  /* — tier + seat count — */
  $("tierName").textContent = res.tier.label || "";

  if (isDespot) {
    var pct = total > 0 ? (res.seats / total * 100).toFixed(1) : "99.9";
    $("seatNumber").innerHTML = pct + '<span class="of">%</span>';
  } else {
    G.UI.countTo($("seatNumber"), res.seats, total);
  }

  /* — majority line — */
  var ml;
  if (isDespot) {
    ml = "A glorious <b>" + (res.seats / total * 100).toFixed(2) + "%</b> of all " + resultLabel.toLowerCase() + " — " + (res.tier.label || "victory");
  } else if (res.seats >= total) {
    ml = "Every single " + resultLabel.toLowerCase().replace(/s$/, "") + " — an unprecedented clean sweep.";
  } else if (res.tier.govt && res.majorityOf >= 0) {
    ml = "A working majority of <b>" + res.majorityOf + "</b> " + resultLabel.toLowerCase() + ".";
  } else if (res.tier.role === "opposition") {
    ml = "The main opposition on <b>" + res.seats + "</b> " + resultLabel.toLowerCase() + " — second to " +
         G.UI._esc((res.breakdown[0] && res.breakdown[0].party) || "the winning party") + ".";
  } else {
    ml = "<b>" + res.seats + "</b> " + resultLabel.toLowerCase() + " — short of a majority by <b>" + Math.abs(res.majorityOf || (majority - res.seats)) + "</b>.";
  }
  $("majorityLine").innerHTML = ml;

  /* — commons bar (repurposed as seat bar) — */
  $("majMark").style.left = (majority / total * 100) + "%";
  $("majKeyLabel").textContent = majority + " needed";
  setTimeout(function () { $("commonsFill").style.width = (res.seats / total * 100) + "%"; }, 80);

  /* — post-election panel (coalition / govern / opposition) — */
  G.UI.renderPostElectionIntl(res, sys);

  /* — standings — */
  G.UI.renderStandings("seatBreakdown", res.breakdown);
  var labels = G.UI.sysLabels(sys.key);
  var breakdownLabelEl = $("breakdownLabel");
  if (breakdownLabelEl) breakdownLabelEl.textContent = "The new " + labels.chamber;
  var coalitionLabelEl = $("coalitionLabel");
  if (coalitionLabelEl) coalitionLabelEl.textContent = labels.hung + " — your move";

  /* — map / visual panel — replace hexmap with system-appropriate display — */
  G.UI.renderResultMap(res, sys);

  /* — odds — */
  var pc = function (x) { return x >= 0.995 ? "100%" : x <= 0.0005 ? "<0.1%" : (x * 100).toFixed(x < 0.1 ? 1 : 0) + "%"; };
  $("oddMaj").textContent    = pc(res.odds.majority);
  $("oddLand").textContent   = pc(res.odds.landslide);
  $("oddSuper").textContent  = pc(res.odds.supermajority);
  $("oddSweep").textContent  = pc(res.odds.sweep);
  $("rangeNote").innerHTML   = "This campaign returned <b>" + res.seats + "</b> " + resultLabel.toLowerCase() +
    " on <b>" + (res.voteShare * 100).toFixed(1) + "%</b> of the vote. Across " + C.trials.toLocaleString() +
    " simulated campaigns the result ranged from <b>" + res.range.low + "</b> to <b>" + res.range.high +
    "</b> (median <b>" + res.range.median + "</b>; central projection <b>" + res.expectedSeats + "</b>). Run it again to fight another.";
  G.UI.renderForecastChart(res, "forecastChart");
  G.UI.renderLeverage(res);
  G.UI.setOddsLabels(res);

  /* — front bench — */
  var roll = $("cabinetRoll"); roll.innerHTML = "";
  G.PORTFOLIOS.forEach(function (port) {
    var h = G.state.cabinet[port.key];
    var line = document.createElement("div"); line.className = "roll-line";
    line.innerHTML = '<span class="r">' + port.name + '</span><span class="n">' + (h ? h.name : "—") + '</span>';
    roll.appendChild(line);
  });

  /* — objectives — */
  if (G.checkObjectives) {
    var ctx = { seats: res.seats, legacy: 0, scenario: G.state.scenarioKey || null };
    G.UI.renderObjectivesStrip("objectivesStrip", G.checkObjectives(ctx));
  }

  G.UI.show("screen-result");
};

/* System-aware post-election panels */
G.UI.renderPostElectionIntl = function (res, sys) {
  var gp = $("governPanel"), cp = $("coalitionPanel"), op = $("oppositionPanel"), C = G.CONFIG;
  gp.style.display = "none"; cp.style.display = "none"; op.style.display = "none";

  var isDespot = sys.despotMode || sys.coalitionStyle === "guided";
  if (isDespot) {
    /* despots always govern — show the govern panel with a flavour message */
    gp.style.display = "";
    $("govPct").textContent = (res.seats / sys.totalSeats * 100).toFixed(1) + "%";
    $("govLine").textContent = "The result is beyond question. Consolidate power and continue the revolution.";
    setTimeout(function () { $("govFill").style.width = "100%"; }, 90);
    var despotBtn = $("governBtn");
    if (despotBtn) despotBtn.textContent = (sys.govtBuildingAction || "Consolidate power") + " →";
    return;
  }

  if (!res.govern) return;

  var total = sys.totalSeats;
  var majority = sys.majority;
  var co = res.coalition;

  if (co && co.soloMajority) {
    gp.style.display = "";
    var gv = res.governVerdict;
    var word = gv.stability >= 66 ? "commanding" : gv.stability >= 50 ? "workable" : "precarious";
    $("govPct").textContent = gv.stability + "%";
    var govPhrases = {
      ec_usa_president: "Enter the White House and govern.",
      trs_france: "Entrez à l'Élysée — gouvernez la France.",
      av_australia: "Take office in Canberra.",
      fptp_canada: "Take the Prime Minister's Office.",
      fptp_india: "Enter 7 Lok Kalyan Marg — govern India.",
      pr_dhondt_bundestag: "Form your coalition and govern from Berlin.",
      pr_dhondt_weimar: "Form a Reichstag majority and govern."
    };
    $("govLine").textContent = (govPhrases[sys.key] || "Take office and govern.") + " Your opening position looks " + word + ".";
    setTimeout(function () { $("govFill").style.width = gv.stability + "%"; }, 90);
    /* update govern button text to match the country */
    var govBtn = $("governBtn");
    if (govBtn) {
      var action = sys.govtBuildingAction || ("Take " + (sys.govtBuilding || "office"));
      govBtn.textContent = action + " →";
    }
    return;
  }

  /* presidential system: largest EV holder wins (contingent House election if <270) */
  if (sys.coalitionStyle === "presidential") {
    if (co && co.largest) {
      gp.style.display = "";
      var gv2 = res.governVerdict;
      $("govPct").textContent = res.seats + " / " + sys.totalSeats + " EVs";
      $("govLine").textContent = res.seats < sys.majority
        ? "No candidate reached " + sys.majority + " — the House confirms you President. Your opening position looks " + (gv2 && gv2.stability >= 50 ? "workable" : "precarious") + "."
        : "You won the Electoral College. Your opening position looks " + (gv2 && gv2.stability >= 66 ? "commanding" : gv2 && gv2.stability >= 50 ? "workable" : "precarious") + ".";
      setTimeout(function () { $("govFill").style.width = Math.round(res.seats / sys.totalSeats * 100) + "%"; }, 90);
      var presGovBtn = $("governBtn");
      if (presGovBtn) presGovBtn.textContent = (sys.govtBuildingAction || "Enter the White House") + " →";
    } else {
      op.style.display = "";
      $("oppositionLine").textContent = "Your opponent won the election. Lead the opposition and fight for the next race.";
      var presOppBtn = $("oppositionBtn");
      if (presOppBtn) presOppBtn.textContent = "Lead the Opposition →";
    }
    return;
  }

  if (co && (co.deals.length > 0 || co.canMinority)) {
    cp.style.display = "";
    var instLabels = {
      pr_dhondt_weimar:    "Reichstag",
      pr_dhondt_bundestag: "Bundestag",
      trs_france:          "Assemblée Nationale",
      av_australia:        "House of Representatives",
      fptp_canada:         "House of Commons",
      fptp_india:          "Lok Sabha",
      fptp_usa_house:      "House of Representatives"
    };
    var inst = instLabels[sys.key] || "parliament";
    $("coalitionIntro").innerHTML = "No party has a majority — you hold <b>" + res.seats + "</b> seats and need <b>" + majority +
      "</b>. " + (co.largest ? "As the largest party you get first go at forming a government." :
      "You could still try to assemble a majority.");
    var box = $("coalitionOptions"); box.innerHTML = "";
    (co.deals || []).forEach(function (d, i) {
      var names = d.parties.map(function (p) { return p.party; }).join(" + ");
      var sw = d.parties.map(function (p) { return '<span class="coal-sw" style="background:' + p.colour + '"></span>'; }).join("");
      var b = document.createElement("button");
      b.className = "coal-opt"; b.setAttribute("data-act", "deal"); b.setAttribute("data-i", i);
      var tag = d.tag || (d.natural ? "natural" : "unlikely");
      b.innerHTML = '<span class="coal-main">' + sw + 'Coalition with ' + names + G.UI._cedeTag(d, res) + '</span>' +
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
    var oBtn = document.createElement("button");
    oBtn.className = "coal-opt opp"; oBtn.setAttribute("data-act", "opposition");
    oBtn.innerHTML = '<span class="coal-main">Decline — go into opposition</span><span class="coal-meta"><span class="coal-sub">let others try to govern</span></span>';
    box.appendChild(oBtn);
    return;
  }

  op.style.display = "";
  var ob = $("oppositionBtn");
  $("oppositionLine").textContent = res.seats <= 0
    ? "You were wiped out — not a single seat. Regroup."
    : "You came up short. Lead the opposition and fight the next election.";
  if (ob) ob.textContent = res.seats <= 0 ? "Into the wilderness →" : "Lead the Opposition →";
};

/* Replace the UK hexmap with a system-appropriate visual: a geographic hex
   cartogram of the country (when a layout exists) plus a system-specific
   breakdown (EC tally / coalition list / region bars) below it. */
/* how many cabinet posts a deal would cost you — previewed on the coalition
   buttons so the trade-off is visible before you sign. */
G.UI._cedeTag = function (deal, res) {
  try {
    if (!G.buildCoalitionCabinet || !res || !res.opposition || !G.state || !G.state.cabinet) return "";
    var sysKey = (res.electoralSystem && res.electoralSystem !== "fptp_uk") ? res.electoralSystem : (G.state._electoralSystemKey || null);
    var built = G.buildCoalitionCabinet(deal, res.opposition, G.state.cabinet, { sysKey: sysKey, playerSeats: res.seats });
    var n = built && built.handovers ? built.handovers.length : 0;
    return n ? '<span class="coal-cede">cede ' + n + ' post' + (n === 1 ? '' : 's') + '</span>' : "";
  } catch (e) { return ""; }
};

/* ---- odds labels: reflect THIS system's real thresholds ----------------- */
/* "Landslide 400+" only makes sense for the 650-seat Commons; every system has
   its own majority/landslide/supermajority/total, so label the odds tiles with
   the active thresholds (e.g. Australia's landslide is 100+, not 400+). */
G.UI.setOddsLabels = function (res) {
  var th = (res && res.forecast && res.forecast.thresholds) || {};
  var total = th.total || (res && res.totalSeats) || (G.CONFIG && G.CONFIG.totalSeats) || 650;
  function set(id, txt) { var el = document.getElementById(id); if (el) el.textContent = txt; }
  set("oddMajLb", "Majority");
  if (th.landslide) set("oddLandLb", "Landslide " + th.landslide + "+");
  set("oddSuperLb", "Supermajority");
  set("oddSweepLb", total <= 700 ? "Clean sweep" : "Every seat");
};

/* ---- cabinet leverage table -------------------------------------------- */
/* Per-slot expected-seats value of each appointee vs. a replacement-level
   minister, sorted most load-bearing first, plus the best available bench swap
   where one would have helped. Reads res.leverage from the election. */
G.UI.renderLeverage = function (res) {
  var panel = document.getElementById("leveragePanel");
  var box = document.getElementById("leverageList");
  if (!panel || !box) return;
  var lev = res && res.leverage;
  if (!lev || !lev.slots || !lev.slots.length) { panel.style.display = "none"; return; }
  panel.style.display = "";
  var maxMv = 1;
  lev.slots.forEach(function (s) { maxMv = Math.max(maxMv, Math.abs(s.marginal)); });
  box.innerHTML = lev.slots.slice(0, 8).map(function (s) {
    var port = (G.PORTFOLIO_BY_KEY && G.PORTFOLIO_BY_KEY[s.slot]) ? G.PORTFOLIO_BY_KEY[s.slot].name : s.slot;
    var mv = Math.round(s.marginal);
    var mvTxt = (mv > 0 ? "+" : "") + mv;
    var mvCls = mv > 0 ? "lev-pos" : (mv < 0 ? "lev-neg" : "lev-zero");
    var barW = Math.round(Math.min(100, Math.abs(s.marginal) / maxMv * 100));
    var swap = "";
    if (s.best) { var bd = Math.round(s.best.delta); if (bd >= 1) swap = '<span class="lev-swap">swap in <b>' + G.UI._esc(s.best.name) + '</b> for <b class="lev-pos">+' + bd + '</b></span>'; }
    return '<div class="lev-row">' +
      '<span class="lev-port">' + G.UI._esc(port) + '<span class="lev-nm">' + G.UI._esc(s.name) + '</span></span>' +
      '<span class="lev-bar-wrap"><span class="lev-bar ' + mvCls + '" style="width:' + barW + '%"></span></span>' +
      '<span class="lev-mv ' + mvCls + '">' + mvTxt + '</span>' +
      swap +
      '</div>';
  }).join("");
};

/* ---- Monte-Carlo forecast distribution (inline SVG) --------------------- */
/* Draws the seat-total distribution across the simulated campaigns: bars tinted
   for the win zone (≥ majority), a dashed majority line, and a marker for where
   THIS campaign actually landed. Theme-aware via currentColor; scales to width. */
G.UI.renderForecastChart = function (res, containerId) {
  var box = document.getElementById(containerId || "forecastChart");
  if (!box) return;
  var fc = res && res.forecast;
  if (!fc || !fc.histogram || !fc.histogram.length) { box.style.display = "none"; return; }
  box.style.display = "";
  var hist = fc.histogram, th = fc.thresholds || {};
  var maj = th.majority || (G.CONFIG && G.CONFIG.majority) || 326;
  var lo = hist[0].x0, hi = hist[hist.length - 1].x1, span = Math.max(1, hi - lo);
  var W = 600, H = 150, padB = 22, padT = 10, maxN = 1;
  hist.forEach(function (h) { if (h.n > maxN) maxN = h.n; });
  function X(v) { return ((v - lo) / span) * W; }
  var parts = [];
  hist.forEach(function (h) {
    var x = X(h.x0), w = Math.max(0.6, X(h.x1) - X(h.x0)) - 0.4;
    var bh = (h.n / maxN) * (H - padB - padT), y = H - padB - bh;
    var mid = (h.x0 + h.x1) / 2;
    var fill = mid >= maj ? "rgba(74,170,120,0.80)" : "rgba(150,160,175,0.50)";
    parts.push('<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) +
               '" height="' + bh.toFixed(1) + '" fill="' + fill + '"/>');
  });
  if (maj >= lo && maj <= hi) {
    var mx = X(maj);
    parts.push('<line x1="' + mx.toFixed(1) + '" y1="' + padT + '" x2="' + mx.toFixed(1) + '" y2="' + (H - padB) +
               '" stroke="#e0a020" stroke-width="1.4" stroke-dasharray="4 3"/>' +
               '<text x="' + (mx + 4).toFixed(1) + '" y="' + (padT + 9) + '" font-size="10" fill="#e0a020">majority ' + maj + '</text>');
  }
  var ax = X(Math.max(lo, Math.min(hi, res.seats)));
  parts.push('<line x1="' + ax.toFixed(1) + '" y1="' + padT + '" x2="' + ax.toFixed(1) + '" y2="' + (H - padB) +
             '" stroke="currentColor" stroke-width="2"/>' +
             '<text x="' + (ax + 4).toFixed(1) + '" y="' + (H - padB - 5) + '" font-size="10" fill="currentColor">you · ' + res.seats + '</text>');
  parts.push('<text x="2" y="' + (H - 6) + '" font-size="10" fill="#8890a0">' + lo + '</text>' +
             '<text x="' + (W - 22) + '" y="' + (H - 6) + '" font-size="10" fill="#8890a0">' + hi + '</text>');
  var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="display:block;max-height:180px" role="img" ' +
            'aria-label="Seat distribution across ' + fc.trials + ' simulated campaigns">' + parts.join("") + '</svg>';
  var pcH = Math.round((fc.probs.hung || 0) * 100);
  var cap = '<p class="range-note" style="margin-top:6px">Across <b>' + fc.trials.toLocaleString() +
            '</b> simulated campaigns: mean <b>' + Math.round(fc.mean) + '</b> ± ' + Math.round(fc.sd) +
            ', 90% range <b>' + fc.pct.p5 + '–' + fc.pct.p95 + '</b>' +
            (pcH > 0 && pcH < 100 ? ', <b>' + pcH + '%</b> chance of no majority' : '') + '.</p>';
  box.innerHTML = svg + cap;
};

G.UI.renderResultMap = function (res, sys) {
  var mapPanel = $("mapResult");
  if (!mapPanel) return;

  var colour = G.UI.ticketColour ? G.UI.ticketColour(G.state) : "#3dc888";

  /* section label + note */
  var mapLabel = $("resultMapLabel");
  var unit = sys.key === "ec_usa_president" ? "state" :
             sys.key.startsWith("pr_")     ? "region" :
             sys.key.startsWith("guided_") ? "province" : "region";
  if (mapLabel) {
    mapLabel.innerHTML = G.UI._esc((sys.flag ? sys.flag + " " : "") + sys.country + " — by " + unit) +
      ' <span class="board-note" id="resultMapNote">' +
      G.UI._esc((sys.totalSeats || "") + " " + (sys.resultLabel || "seats") + " · hover to explore") + '</span>';
  }

  /* the geographic hex cartogram (fully revealed on the result screen) */
  mapPanel.className = "hexmap";
  var drew = G.UI.buildCountryMap ? G.UI.buildCountryMap("mapResult", sys, res, colour, { revealed: true }) : false;

  /* legend — your ticket plus the leading parties */
  var legend = $("mapResultLegend");
  if (legend) G.UI.renderMapLegend("mapResultLegend", colour, G.state.mode, res.breakdown);

  /* detailed breakdown beneath the map */
  var detail = $("regionSummary");
  if (detail) {
    detail.innerHTML = "";

    /* Electoral College — state tally grid */
    if (sys.key === "ec_usa_president") {
      detail.className = "ec-map-panel";
      var grid = document.createElement("div"); grid.className = "ec-state-grid";
      var byRegion = (res.campaign && res.campaign.byRegion) || res.byRegion || [];
      var totalEV = 0, wonEV = 0;
      byRegion.forEach(function (r) {
        var won = r.won > 0, ev = r.total;
        totalEV += ev; if (won) wonEV += ev;
        var el = document.createElement("div");
        el.className = "ec-state" + (won ? " won" : " lost");
        el.style.background = won ? colour : "#7a7f88";
        el.title = r.name + " — " + ev + " EV — " + (won ? "WON" : "LOST");
        el.innerHTML = '<span class="ec-name">' + G.UI._esc(r.name.split(" ")[0]) + '</span><span class="ec-ev">' + ev + '</span>';
        grid.appendChild(el);
      });
      var summary = document.createElement("div"); summary.className = "ec-summary";
      summary.innerHTML = '<span style="color:' + colour + ';font-weight:700;">' + wonEV + ' EV</span> vs ' +
                          '<span style="color:#7a7f88;">' + (totalEV - wonEV) + ' EV</span>';
      detail.appendChild(grid);
      detail.appendChild(summary);
      return;
    }

    /* PR / TRS / guided — coalition bar + party list */
    if (sys.key.startsWith("pr_") || sys.key.startsWith("guided_") || sys.key.startsWith("trs_") ||
        sys.coalitionStyle === "pr" || sys.coalitionStyle === "trs" || sys.coalitionStyle === "guided") {
      detail.className = "pr-coalition-panel";
      var bd = res.breakdown || [];
      var totalSeats = sys.totalSeats || 1;
      var bar = document.createElement("div"); bar.className = "coalition-bar";
      bd.slice(0, 10).forEach(function (b) {
        if (!b.seats) return;
        var seg = document.createElement("div");
        seg.className = "coalition-seg" + (b.isYou ? " you" : "");
        seg.style.width = (b.seats / totalSeats * 100) + "%";
        seg.style.background = b.colour || "#ccc";
        seg.title = b.party + " — " + b.seats + " seats";
        bar.appendChild(seg);
      });
      detail.appendChild(bar);
      var list = document.createElement("div"); list.className = "pr-list";
      bd.slice(0, 12).forEach(function (b) {
        var row = document.createElement("div"); row.className = "pr-row" + (b.isYou ? " you" : "");
        row.innerHTML = '<span class="pr-sw" style="background:' + (b.colour || "#ccc") + '"></span>' +
          '<span class="pr-name">' + G.UI._esc(b.party) + '</span>' +
          '<span class="pr-seats">' + b.seats + '</span>' +
          '<span class="pr-pct">' + (b.seats / totalSeats * 100).toFixed(1) + '%</span>';
        list.appendChild(row);
      });
      detail.appendChild(list);
      return;
    }

    /* FPTP international — per-region bars */
    detail.className = "region-summary";
    if (G.UI.renderRegionSummary) G.UI.renderRegionSummary("regionSummary", res, colour);
  }

  /* if no geographic layout existed, fall back to bars inside the map panel */
  if (!drew) {
    mapPanel.className = "region-summary-panel";
    if (G.UI.renderRegionSummary) G.UI.renderRegionSummary("mapResult", res, colour);
  }
};

/* =========================================================
   ORIGINAL renderResult — routes to intl if needed
   ========================================================= */
G.UI.renderResult = function (res) {
  /* route international scenarios to dedicated renderer */
  if (G.state && G.state._electoralSystemKey && G.state._electoralSystemKey !== "fptp_uk") {
    G.UI.renderResultIntl(res);
    return;
  }

  var C = G.CONFIG;
  /* reset the results-map label to the UK default (it may carry stale country
     text from a previous international game in the same session) */
  var ukMapLabel = $("resultMapLabel");
  if (ukMapLabel) ukMapLabel.innerHTML = 'The results map <span class="board-note" id="resultMapNote">650 seats · hover to explore</span>';
  /* reset system-specific labels to UK defaults */
  var ukBreakdownLabel = $("breakdownLabel");
  if (ukBreakdownLabel) ukBreakdownLabel.textContent = "The new House of Commons";
  var ukCoalitionLabel = $("coalitionLabel");
  if (ukCoalitionLabel) ukCoalitionLabel.textContent = "Hung parliament — your move";
  var ukWatchLabel = $("watchBreakdownLabel");
  if (ukWatchLabel) ukWatchLabel.innerHTML = 'Projected Commons <span class="board-note">updating live</span>';
  /* career mode: show strip of previous parliaments above the result */
  G.UI.renderCareerParlStrip("careerParlStrip", G.career);
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
  G.UI.renderForecastChart(res, "forecastChart");
  G.UI.renderLeverage(res);
  G.UI.setOddsLabels(res);

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
    var govBtn = $("governBtn");
    if (govBtn) govBtn.textContent = "Enter Downing Street →";
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
      b.innerHTML = '<span class="coal-main">' + sw + 'Coalition with ' + names + G.UI._cedeTag(d, res) + '</span>' +
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
  x.fillText("SEATS OF " + (res.totalSeats || 650), lx, 288);
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
  var total = res.totalSeats || 650;
  var sysName = (res.electoralSystem && res.electoralSystem !== "fptp_uk" && G.ELECTORAL_SYSTEMS &&
                 G.ELECTORAL_SYSTEMS[res.electoralSystem]);
  var arena = sysName ? (sysName.flag + " " + sysName.country) : "650";
  var lines = [
    arena + " — my " + modeLine + " won " + res.seats + " of " + total + " seats.",
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
  var isIntl = e.electoralSystem && e.electoralSystem !== "fptp_uk";
  var ctx = "";
  if (isIntl) {
    var sys = G.ELECTORAL_SYSTEMS && G.ELECTORAL_SYSTEMS[e.electoralSystem];
    var sysLabel = sys ? (sys.flag + " " + sys.name) : e.electoralSystem;
    var total = e.totalSeats || 650;
    var pct = total > 0 ? (e.seats / total * 100).toFixed(1) : "?";
    ctx = '<div class="lbd-bd">' + G.UI._esc(sysLabel);
    if (e.scenarioKey && e.scenarioKey !== "freshstart") {
      var sc = (G.SCENARIOS || []).filter(function (s) { return s.key === e.scenarioKey; })[0];
      ctx += " · " + G.UI._esc(sc ? sc.name : e.scenarioKey);
    }
    ctx += " · " + (e.seats | 0) + "/" + total + " (" + pct + "%)</div>";
  } else if (e.scenarioKey && e.scenarioKey !== "freshstart") {
    var sc2 = (G.SCENARIOS || []).filter(function (s) { return s.key === e.scenarioKey; })[0];
    ctx = '<div class="lbd-bd">🇬🇧 ' + G.UI._esc(sc2 ? sc2.name : e.scenarioKey) + '</div>';
  }
  var bd = (e.breakdown && e.breakdown.length) ? '<div class="lbd-bd">' + e.breakdown.slice(0,6).map(function(b){ return G.UI._esc(b.party) + " " + (b.seats|0); }).join(" · ") + '</div>' : "";
  var party = e.partyName ? '<div class="lbd-bd">Standing as <b>' + G.UI._esc(e.partyName) + '</b>' +
        (e.partyAlign && G.alignLabel ? ' · ' + G.UI._esc(G.alignLabel(e.partyAlign)) : '') + '</div>' : "";
  if (!rows) rows = '<p class="lb-sub">No cabinet stored for this entry.</p>';
  return ctx + party + rows + bd;
};

G.UI._lbRowEl = function (e, rank) {
  var isAllPct = G.UI._lbView === "allpct";
  var row = document.createElement("div");
  row.className = "lb-row expandable" + (rank <= 3 && G.UI._lbView !== "personal" ? " top" : "");
  var leg = (e.legacy === null || e.legacy === undefined) ? "—" : ("" + e.legacy);
  var isIntl = e.electoralSystem && e.electoralSystem !== "fptp_uk";
  var tag;
  if (isIntl) {
    var sys = G.ELECTORAL_SYSTEMS && G.ELECTORAL_SYSTEMS[e.electoralSystem];
    tag = (sys ? sys.flag + " " + sys.name : e.electoralSystem);
  } else if (e.scenarioKey && e.scenarioKey !== "freshstart") {
    var sc3 = (G.SCENARIOS || []).filter(function (s) { return s.key === e.scenarioKey; })[0];
    tag = "🇬🇧 " + (sc3 ? sc3.name : e.scenarioKey);
  } else {
    tag = (e.mode || "") + (e.govt ? " · govt" : "");
  }
  var seatsDisplay;
  if (isAllPct) {
    var total2 = e.totalSeats || 650;
    var pct2 = e.pct != null ? e.pct : (total2 > 0 ? e.seats / total2 * 100 : 0);
    seatsDisplay = pct2.toFixed(1) + "%";
  } else {
    seatsDisplay = (e.seats | 0);
  }
  row.innerHTML =
    '<span class="lb-rk">' + rank + '</span>' +
    '<span class="lb-nm ' + G.UI.roleClass(e.level || 1) + '">' + G.UI._esc(e.name || "—") + '</span>' +
    '<span class="lb-md">' + G.UI._esc(tag) + '</span>' +
    '<span class="lb-seats">' + seatsDisplay + '</span>' +
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
  [["communal", "Hardest (UK)"], ["allpct", "All Results %"], ["personal", "Your Runs"]].forEach(function (t) {
    var b = document.createElement("button");
    b.className = "lb-tab" + (G.UI._lbView === t[0] ? " sel" : "");
    b.textContent = t[1];
    b.onclick = function () {
      G.UI._lbView = t[0];
      if (t[0] === "allpct" && !(G.LB._overallPct && G.LB._overallPct.length) && G.LB.fetchOverallPct) {
        G.LB.fetchOverallPct(function (top) { G.LB._overallPct = top || []; G.UI._drawLb(); });
        return;
      }
      G.UI._drawLb();
    };
    tabs.appendChild(b);
  });
  box.appendChild(tabs);
  var seatsHeader = G.UI._lbView === "allpct" ? "%" : "Seats";
  function head() {
    var h = document.createElement("div"); h.className = "lb-row lb-head";
    h.innerHTML = '<span class="lb-rk">#</span><span class="lb-nm">Player</span><span class="lb-md">Election</span><span class="lb-seats">' + seatsHeader + '</span><span class="lb-leg">Legacy</span>';
    return h;
  }
  function section(title, entries) {
    if (title) { var p = document.createElement("p"); p.className = "section-label"; p.style.marginTop = "14px"; p.textContent = title; box.appendChild(p); }
    box.appendChild(head());
    if (!entries.length) { var emp = document.createElement("p"); emp.className = "pool-empty"; emp.textContent = "No runs yet."; box.appendChild(emp); return; }
    entries.forEach(function (en, i) { box.appendChild(G.UI._lbRowEl(en, i + 1)); });
  }
  if (G.UI._lbView === "communal") {
    section(null, (G.UI._lbCache.top || []).slice(0, G.LB.MAX_SHOW));
  } else if (G.UI._lbView === "allpct") {
    var pctData = (G.LB._overallPct || []).slice(0, G.LB.MAX_SHOW);
    section(null, pctData);
    if (!pctData.length) {
      var note = document.createElement("p"); note.className = "lb-sub"; note.style.padding = "8px 0";
      note.textContent = "Loading cross-system rankings…";
      box.appendChild(note);
      if (G.LB.fetchOverallPct) G.LB.fetchOverallPct(function (top) { G.LB._overallPct = top || []; G.UI._drawLb(); });
    }
  } else {
    section("Your best 10", (G.LB.localTop ? G.LB.localTop(10) : []));
    var worst = (G.LB.localBottom ? G.LB.localBottom(10) : []);
    if (worst.length) section("Your worst 10", worst);
  }
};

G.UI.renderLeaderboard = function (top, communal, error) {
  var status = $("lbStatus");
  if (status) status.textContent =
      error === "not hardest mode" ? "Only the hardest mode (Wildcard · Hard · Expanded) is ranked — that run wasn’t added to the board."
    : error === "duplicate" ? "You’ve already posted this exact run — it wasn’t added again."
    : error === "name taken" ? "That name is claimed by another player (on another device). Pick a different name to post."
    : error === "login" ? "The public board is for registered players — sign in (free) and your runs post under your account name."
    : error === "legacy required" ? "The board needs a fully governed term — finish a term to rank."
    : error ? "Couldn’t reach the shared board — showing your local runs. Tap a row to see the cabinet."
    : communal ? "Worldwide board — one best run per player per election type. Tap a row for the cabinet."
               : "A local board on this device. Tap a row to see the cabinet.";
  G.UI._lbCache = { top: top || [], communal: !!communal };
  if (G.UI._lbView !== "personal" && G.UI._lbView !== "allpct") G.UI._lbView = "communal";
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

  G.UI.renderPlayerRuns = function (runs) {
    var el = $("runsList"); if (!el) return;
    if (!runs || !runs.length) { el.innerHTML = '<p class="mini-help">No runs recorded yet.</p>'; return; }
    var modeMap = { unity: "Greatest Cabinet", wildcard: "Wildcard", dynasty: "Dynasty", parl2024: "2024 Parliament" };
    el.innerHTML = runs.map(function (r) {
      var date = ""; try { date = new Date(r.ts).toLocaleDateString([], { month: "short", day: "numeric" }); } catch (e) {}
      var mode = modeMap[r.mode] || r.mode || "";
      var diff = r.difficulty ? (r.difficulty.charAt(0).toUpperCase() + r.difficulty.slice(1)) : "";
      var sc = "";
      if (r.scenarioKey && r.scenarioKey !== "freshstart") sc = " · " + r.scenarioKey.replace(/_/g, " ");
      var legStr = (r.legacy != null) ? (' · <span class="run-legacy">Legacy ' + r.legacy + '</span>') : "";
      return '<div class="run-row">' +
        '<div><span class="run-seats">' + r.seats + '</span>' +
        '<span class="run-meta"> / ' + r.totalSeats + ' seats' + (r.govt ? ' · governed' : '') + legStr + '</span></div>' +
        '<div class="run-right"><span class="run-pct">' + r.pct + '%</span>' +
        '<span class="run-meta run-tag">' + esc(mode) + (diff ? ' · ' + esc(diff) : '') + esc(sc) + '</span>' +
        '<span class="run-date">' + esc(date) + '</span></div>' +
        '</div>';
    }).join("");
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

/* ============================================================ WIKI SCREEN =
   G.UI.renderWikiParliament(res, state, career)
   Renders the fantasy Wikipedia election infobox after an election result.   */
G.UI.renderWikiParliament = function (res, state, career) {
  if (!res) return;
  G.UI._wikiCaller = G.UI._wikiCaller || "screen-result";
  G.UI.show("screen-wiki");
  var C = G.CONFIG || {};
  var baseline = C.baseline2024 || {};
  var govt2024 = C.govt2024 || { party: "Labour", seats: 411, vote: 33.7, leader: "Keir Starmer" };
  var year = res.electionYear || new Date().getFullYear();
  var el = document.getElementById("wikiYear"); if (el) el.textContent = year;

  /* country-aware header: international systems get their own flag/title */
  var wikiSys = (res.electoralSystem && res.electoralSystem !== "fptp_uk" && G.ELECTORAL_SYSTEMS)
                ? G.ELECTORAL_SYSTEMS[res.electoralSystem] : null;
  var wMajority = wikiSys ? (wikiSys.majority || G.CONFIG.majority) : G.CONFIG.majority;
  var flagEl = document.getElementById("wikiFlag");
  var titleEl = document.getElementById("wikiTitleText");
  var dateEl = document.getElementById("wikiDate");
  if (wikiSys) {
    if (flagEl)  flagEl.textContent  = wikiSys.flag || "🗳";
    if (titleEl) titleEl.textContent = wikiSys.country + " — " + wikiSys.name;
    if (dateEl)  dateEl.textContent  = wikiSys.name + " · " + wikiSys.country;
  } else {
    if (flagEl)  flagEl.textContent  = "🇬🇧";
    if (titleEl) titleEl.textContent = "United Kingdom general election";
    if (dateEl)  dateEl.textContent  = "General election · United Kingdom";
  }

  /* system-specific labels */
  var wikiLabels = G.UI.sysLabels(res.electoralSystem || (G.state && G.state._electoralSystemKey));

  /* electorate */
  var electorateEl = document.getElementById("wikiElectorate");
  if (electorateEl) electorateEl.textContent = wikiLabels.electorate.toLocaleString();

  /* turnout (derived from system's typicalTurnout range, scaled by vote share) */
  var tRange = wikiLabels.turnoutRange;
  var tMin = tRange[0], tMax = tRange[1];
  var tVal = tMin + (res.voteShare || 0) * (tMax - tMin);
  tVal = Math.max(tMin, Math.min(tMax, tVal));
  var turnout = (tVal * 100).toFixed(1) + "%";
  var turnEl = document.getElementById("wikiTurnout"); if (turnEl) turnEl.textContent = turnout;

  /* composition head */
  var compHeadEl = document.getElementById("wikiCompHead");
  if (compHeadEl) compHeadEl.textContent = "Composition of the " + wikiLabels.chamber + " after the election";

  /* PM labels */
  var pmBeforeLabelEl = document.getElementById("wikiPmBeforeLabel");
  if (pmBeforeLabelEl) pmBeforeLabelEl.textContent = wikiLabels.head + " before";
  var pmAfterLabelEl = document.getElementById("wikiPmAfterLabel");
  if (pmAfterLabelEl) pmAfterLabelEl.textContent = wikiLabels.head + " after";

  /* ---- Player (RIGHT column) ---- */
  var bd = res.breakdown || [];
  /* find player entry via isYou flag; fall back to blocLabel match */
  var youEntry = null;
  bd.forEach(function (b) { if (b.isYou) youEntry = b; });
  if (!youEntry && res.blocLabel) {
    bd.forEach(function (b) { if (!youEntry && b.party === res.blocLabel) youEntry = b; });
  }

  /* PM name at election time (stored in res.pmName by G.hold) */
  var playerPm = res.pmName || (state && state.cabinet && state.cabinet.pm ? state.cabinet.pm.name : "—");
  var youParty = (youEntry && youEntry.party) || res.blocLabel || "Your Party";
  var youSeats = youEntry ? youEntry.seats : (res.seats || 0);
  var youVote  = (Math.round((res.voteShare || 0) * 1000) / 10).toFixed(1);

  /* prior data for the right column's "seats before" / "swing" rows */
  var priorData = null;
  if (career && career.active && career.electionHistory && career.electionHistory.length >= 1) {
    var ph = career.electionHistory[career.electionHistory.length - 1];
    priorData = { seats: ph.seats, vote: (ph.voteShare * 100).toFixed(1) };
  } else {
    priorData = baseline[youParty] || null;
  }
  var priorSeats = priorData ? priorData.seats : "—";
  var priorVote  = priorData ? priorData.vote  : "—";
  var seatDelta  = priorData ? (youSeats - priorData.seats) : null;
  var voteDelta  = priorData ? ((res.voteShare * 100) - parseFloat(priorData.vote)) : null;

  /* ---- Previous Government (LEFT column) ---- *
   * Career parliament 2+: player's own prior election result.
   * Otherwise (parliament 1 or non-career): the real 2024 UK government (Labour). */
  var prevParl = null;
  if (career && career.active && career.electionHistory && career.electionHistory.length >= 1) {
    prevParl = career.electionHistory[career.electionHistory.length - 1];
  }

  var leftParty, leftSeats, leftVote, leftLeader, leftHead, leftPriorSeats, leftPriorVote, leftSeatDelta, leftVoteDelta;
  if (prevParl) {
    /* previous parliament — player's own prior result.
       No meaningful "seats before" exists for the player's first parliament
       (there is no prior result to compare against), so always show "—". */
    leftParty  = youParty;
    leftLeader = prevParl.pmName || "—";
    leftSeats  = prevParl.seats;
    leftVote   = (prevParl.voteShare * 100).toFixed(1);
    leftHead   = wikiLabels.termWord + " " + (prevParl.parliament || (career.parliament - 1));
    leftPriorSeats = "—";
    leftPriorVote  = "—";
    leftSeatDelta  = null;
    leftVoteDelta  = null;
  } else if (wikiSys) {
    /* international, first election: the chamber's leading incumbent party
       (largest non-player party in this result) stands in as the outgoing govt */
    var topOpp = null;
    (res.breakdown || []).forEach(function (b) { if (!b.isYou && !topOpp) topOpp = b; });
    leftParty  = topOpp ? topOpp.party : "Previous administration";
    leftLeader = "—";
    leftSeats  = "—";
    leftVote   = "—";
    leftHead   = "Outgoing — " + (wikiSys.country || "");
    leftPriorSeats = "—";
    leftPriorVote  = "—";
    leftSeatDelta  = null;
    leftVoteDelta  = null;
  } else {
    /* no history: show 2024 Labour government as the baseline outgoing govt */
    leftParty  = govt2024.party;
    leftLeader = govt2024.leader;
    leftSeats  = govt2024.seats;
    leftVote   = String(govt2024.vote);
    leftHead   = "2024 General Election";
    leftPriorSeats = "—";
    leftPriorVote  = "—";
    leftSeatDelta  = null;
    leftVoteDelta  = null;
  }

  function sign(n) { return n >= 0 ? "+" + Math.round(n) : String(Math.round(n)); }
  function signF(n, dp) { var v = Math.round(n * Math.pow(10, dp || 1)) / Math.pow(10, dp || 1); return (v >= 0 ? "+" : "") + v.toFixed(dp || 1) + "%"; }

  function buildRows(rows) {
    return rows.map(function (r) {
      return '<tr><td class="wt-label">' + G.UI._esc(r[0]) + '</td><td class="wt-value">' + G.UI._esc(String(r[1])) + '</td></tr>';
    }).join("");
  }

  /* ---- Right column: player's current result ---- */
  var inHeadEl = document.getElementById("wikiInHead");
  var inLabel = !res.tier ? "Result"
              : res.tier.govt ? "Incoming government"
              : res.tier.key === "largest"    ? "Largest party — hung parliament"
              : res.tier.key === "opposition" ? "Official Opposition"
              : res.tier.key === "wipeout"    ? "Wiped out"
              : res.tier.label || "Minor party";
  if (inHeadEl) inHeadEl.textContent = inLabel;

  /* hung-parliament note */
  var hungNote = document.getElementById("wikiHungNote");
  if (hungNote) {
    if (res.tier && res.tier.key === "largest") {
      hungNote.style.display = "";
      hungNote.textContent = "No party won an outright majority. " + youParty + " is the largest party with " + youSeats + " seats — " + (wMajority - youSeats) + " short of a majority.";
    } else {
      hungNote.style.display = "none";
    }
  }

  var inRows = [
    ["Leader",      playerPm],
    ["Party",       youParty],
    ["Seats before", priorSeats],
    ["Seats won",   youSeats],
    ["Seat change", seatDelta != null ? sign(seatDelta) : "—"],
    ["Vote share",  youVote + "%"],
    ["Swing",       voteDelta != null ? signF(voteDelta) : "—"]
  ];
  var tableIn = document.getElementById("wikiTableIn");
  if (tableIn) tableIn.innerHTML = '<tbody>' + buildRows(inRows) + '</tbody>';

  /* portrait for player's PM */
  var inPortEl  = document.getElementById("wikiInPortrait");
  var inInitEl  = document.getElementById("wikiInInit");
  if (inInitEl) inInitEl.textContent = G.UI._initials(playerPm);
  if (inPortEl) {
    inPortEl.style.display = "none";
    if (playerPm && playerPm !== "—") {
      inPortEl.onerror = function () { this.style.display = "none"; };
      var ovr = (G.PHOTO && G.PHOTO[playerPm]) || null;
      var wikiTitle = (ovr && ovr.wiki) ? ovr.wiki : playerPm;
      fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(wikiTitle.replace(/ /g, "_")), { headers: { accept: "application/json" } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { var src = d && d.thumbnail && d.thumbnail.source; if (src) { inPortEl.src = src; inPortEl.style.display = ""; if (inInitEl) inInitEl.style.display = "none"; } })
        .catch(function () {});
    }
  }

  /* ---- Left column: previous government ---- */
  var outHeadEl = document.getElementById("wikiOutHead");
  if (outHeadEl) outHeadEl.textContent = leftHead;

  var outRows = [
    ["Leader",      leftLeader],
    ["Party",       leftParty],
    ["Seats before", leftPriorSeats],
    ["Seats won",   leftSeats],
    ["Seat change", leftSeatDelta != null ? sign(leftSeatDelta) : "—"],
    ["Vote share",  leftVote + "%"],
    ["Swing",       leftVoteDelta != null ? signF(leftVoteDelta) : "—"]
  ];
  var tableOut = document.getElementById("wikiTableOut");
  if (tableOut) tableOut.innerHTML = '<tbody>' + buildRows(outRows) + '</tbody>';

  /* portrait for left column leader */
  var outPortEl = document.getElementById("wikiOutPortrait");
  var outInitEl = document.getElementById("wikiOutInit");
  if (outInitEl) outInitEl.textContent = G.UI._initials(leftLeader);
  if (outPortEl) {
    outPortEl.style.display = "none";
    if (leftLeader && leftLeader !== "—") {
      outPortEl.onerror = function () { this.style.display = "none"; };
      var oovr = (G.PHOTO && G.PHOTO[leftLeader]) || null;
      var oTitle = (oovr && oovr.wiki) ? oovr.wiki : leftLeader;
      fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(oTitle.replace(/ /g, "_")), { headers: { accept: "application/json" } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { var src = d && d.thumbnail && d.thumbnail.source; if (src) { outPortEl.src = src; outPortEl.style.display = ""; if (outInitEl) outInitEl.style.display = "none"; } })
        .catch(function () {});
    }
  }

  /* 650-dot composition grid (always from the current election breakdown) */
  var compEl = document.getElementById("wikiComposition");
  if (compEl) {
    var sorted = bd.slice().sort(function (a, b) { return b.seats - a.seats; });
    var dots = [];
    sorted.forEach(function (party) {
      for (var i = 0; i < party.seats; i++) {
        dots.push('<span class="wiki-dot" style="background:' + (party.colour || "#6b6b6b") + '" title="' + G.UI._esc(party.party) + '"></span>');
      }
    });
    var legend = sorted.slice(0, 6).map(function (p) {
      return '<span class="wiki-dot-leg"><span class="wiki-dot-swatch" style="background:' + (p.colour || "#6b6b6b") + '"></span>' + G.UI._esc(p.party) + ' ' + p.seats + '</span>';
    }).join("");
    compEl.innerHTML = '<div class="wiki-dots">' + dots.join("") + '</div><div class="wiki-dot-legend">' + legend + '</div>';
  }

  /* Full "Results by party" table — Wikipedia style with colour bar + leader */
  var fullEl = document.getElementById("wikiFullResults");
  if (fullEl && bd.length) {
    /* seat-change baseline: player vs prior parliament (career) or vs 2024 for real parties */
    var priorSeatsMap = {};
    if (career && career.active && career.electionHistory && career.electionHistory.length >= 1) {
      priorSeatsMap[youParty] = career.electionHistory[career.electionHistory.length - 1].seats;
    }
    Object.keys(baseline).forEach(function (p) { if (!priorSeatsMap[p]) priorSeatsMap[p] = baseline[p].seats; });

    var wfrRows = bd.map(function (b) {
      var prior = priorSeatsMap[b.party];
      var delta = (prior != null) ? (b.seats - prior) : null;
      var deltaTxt = delta != null ? ((delta > 0 ? "+" : "") + delta) : "—";
      var deltaCls = "wfr-num" + (delta > 0 ? " wfr-gain" : delta < 0 ? " wfr-loss" : "");
      /* leader: player uses election-time PM; NPC parties use their actually-drafted bench leader,
         falling back to 2024 baseline only if the bench is unavailable */
      var npcBench = res.opposition && res.opposition[b.party] && res.opposition[b.party].bench;
      var leader = b.isYou ? playerPm
                 : (npcBench && npcBench.length ? npcBench[0].name
                    : (baseline[b.party] ? baseline[b.party].leader : "—") || "—");
      /* vote: player gets actual; known parties get 2024 baseline; others "—" */
      var voteStr = b.isYou ? youVote + "%" : (baseline[b.party] ? baseline[b.party].vote.toFixed(1) + "%" : "—");
      var youBadge = b.isYou ? ' <span class="wfr-you-badge">you</span>' : "";
      return '<tr' + (b.isYou ? ' class="wiki-you-row"' : '') + '>' +
        '<td class="wfr-bar" style="background:' + (b.colour || "#999") + '"></td>' +
        '<td class="wfr-party">' + G.UI._esc(b.party) + youBadge + '</td>' +
        '<td class="wfr-leader">' + G.UI._esc(leader) + '</td>' +
        '<td class="wfr-num">' + b.seats + '</td>' +
        '<td class="' + deltaCls + '">' + deltaTxt + '</td>' +
        '<td class="wfr-num">' + voteStr + '</td>' +
        '</tr>';
    }).join("");
    fullEl.innerHTML = '<table>' +
      '<thead><tr>' +
        '<th class="wfr-bar"></th>' +
        '<th class="wfr-party">Party</th>' +
        '<th class="wfr-leader">Leader</th>' +
        '<th class="wfr-num">Seats</th>' +
        '<th class="wfr-num">±</th>' +
        '<th class="wfr-num">Vote</th>' +
      '</tr></thead>' +
      '<tbody>' + wfrRows + '</tbody></table>';
  } else if (fullEl) {
    fullEl.innerHTML = "";
  }

  /* PM before/after strip */
  var pmBefore = document.getElementById("wikiPmBefore");
  var pmAfter  = document.getElementById("wikiPmAfter");
  if (pmBefore) pmBefore.textContent = leftLeader;
  if (pmAfter)  pmAfter.textContent  = (res.tier && res.tier.govt) ? playerPm : (res.tier && res.tier.key === "largest") ? playerPm + " (acting)" : "—";
};

/* ========================================================= RETIREMENT SCREEN
   G.UI.renderRetirements(retiring, career)
   Shows which ministers are standing down between parliaments.               */
G.UI.renderRetirements = function (retiring, career) {
  var listEl = document.getElementById("retList");
  var modsEl = document.getElementById("retMods");
  var parlEl = document.getElementById("retParlNum");
  var termWordEl = document.getElementById("retTermWord");
  var introEl = document.getElementById("retIntro");

  if (parlEl && career) parlEl.textContent = career.parliament;
  var retLabels = G.UI.sysLabels(G.state && G.state._electoralSystemKey);
  if (termWordEl) termWordEl.textContent = retLabels.termWord;
  var headingEl = document.getElementById("retHeading");
  if (headingEl) headingEl.textContent = "Between " + retLabels.termWord + "s";
  var miniHelpEl = document.getElementById("retMiniHelp");
  if (miniHelpEl) miniHelpEl.textContent = "The seats they leave vacant will be filled in a fresh draft. Your remaining ministers carry their portfolios into the next " + retLabels.termWord.toLowerCase() + ".";

  if (introEl) {
    introEl.textContent = retiring && retiring.length
      ? "The following members of your cabinet have decided not to contest the next election."
      : "All members of your cabinet are ready to stand again — no retirements this time.";
  }

  if (listEl) {
    if (!retiring || !retiring.length) {
      listEl.innerHTML = '<p class="mini-help">No retirements — a full carry-over into the next parliament.</p>';
    } else {
      listEl.innerHTML = retiring.map(function (r) {
        var pol = r.politician, port = (G.PORTFOLIO_BY_KEY && G.PORTFOLIO_BY_KEY[r.portfolioKey]) || { name: r.portfolioKey };
        var served = (career && career.ministerServeCount && career.ministerServeCount[pol.name]) || 1;
        return '<div class="ret-card">' +
          '<span class="ret-portrait" data-pol="' + G.UI._esc(pol.name) + '">' + G.UI._initials(pol.name) + '</span>' +
          '<div class="ret-info">' +
            '<b>' + G.UI._esc(pol.name) + '</b>' +
            '<span class="ret-port">' + G.UI._esc(port.name) + '</span>' +
            '<span class="ret-served">' + served + ' parliament' + (served !== 1 ? 's' : '') + ' served</span>' +
          '</div>' +
        '</div>';
      }).join("");
      G.UI._hydratePortraits(listEl);
    }
  }

  if (modsEl && career) {
    var mod = career.voteModifier || 0;
    var rep = career.reputationScore || 50;
    var modSign = mod >= 0 ? "+" : "";
    var modText = Math.abs(mod) >= 0.001 ? (modSign + (mod * 100).toFixed(1) + "% projected vote swing into the next election") : "No net vote modifier carried over.";
    var repText = "Reputation: " + Math.round(rep) + " / 100";
    modsEl.innerHTML = '<div class="ret-mod-row"><span class="ret-arrow">' + (mod >= 0.001 ? "↑" : mod <= -0.001 ? "↓" : "→") + '</span><span>' + G.UI._esc(modText) + '</span></div>' +
      '<div class="ret-mod-row"><span class="ret-arrow">★</span><span>' + G.UI._esc(repText) + '</span></div>';
  }

  G.UI.show("screen-retirement");
};

/* ======================================================= CAREER BANNER
   G.UI.renderCareerBanner(career)
   Small "career outlook" strip on the govern screen.                         */
G.UI.renderCareerBanner = function (career) {
  var el = document.getElementById("careerBanner"); if (!el) return;
  if (!career || !career.active) { el.style.display = "none"; return; }
  var mod = career.voteModifier || 0;
  var arrow = mod >= 0.005 ? "↑" : mod <= -0.005 ? "↓" : "→";
  var modTxt = Math.abs(mod) >= 0.001 ? ((mod >= 0 ? "+" : "") + (mod * 100).toFixed(1) + "% projected swing") : "neutral outlook";
  var rep = career.reputationScore != null ? Math.round(career.reputationScore) : 50;
  el.innerHTML = '<span class="cb-arrow">' + arrow + '</span> Career outlook: <b>' + G.UI._esc(modTxt) + '</b> · Reputation <b>' + rep + '/100</b> · ' + (G.UI.sysLabels ? G.UI.sysLabels(G.state && G.state._electoralSystemKey).termWord : 'Parliament') + ' <b>' + (career.parliament || 1) + '</b>';
  el.style.display = "";
};

/* =========================================================== ELECTORATE UI
   G.UI.renderElectorate(blocSupport)
   Renders the "Coalition of voters" bloc bars on the govern screen.           */
G.UI.renderElectorate = function (blocSupport) {
  var panel = $("electoratePanel");
  var list  = $("blocList");
  if (!panel || !list) return;
  var _blocs = G.activeBlocs ? G.activeBlocs() : G.ELECTORATE_BLOCS;
  if (!blocSupport || !_blocs) { panel.style.display = "none"; return; }
  panel.style.display = "";
  var html = "";
  _blocs.forEach(function (b) {
    var s = Math.round(blocSupport[b.key] != null ? blocSupport[b.key] : 50);
    var cls = s >= 58 ? "bloc-good" : s < 42 ? "bloc-bad" : "bloc-mid";
    var pct = s + "%";
    html += '<div class="bloc-row">' +
      '<span class="bloc-name">' + G.UI._esc(b.name) + '</span>' +
      '<span class="bloc-bar-wrap"><span class="bloc-bar ' + cls + '" style="width:' + pct + '"></span></span>' +
      '<span class="bloc-num">' + s + '</span>' +
      '</div>';
  });
  list.innerHTML = html;
};

/* =========================================================== OBJECTIVE BANNER
   Shows the current scenario's objective on the govern screen.                */
G.UI.renderObjectiveBanner = function () {
  var el = $("govObjectiveBanner"); if (!el) return;
  var scKey = G.state && G.state.scenarioKey;
  if (!scKey || !G.SCENARIOS) { el.style.display = "none"; return; }
  var sc = G.SCENARIOS.filter(function (s) { return s.key === scKey; })[0];
  if (!sc || !sc.objective) { el.style.display = "none"; return; }
  el.innerHTML = '<span class="obj-icon">🎯</span> <b>Scenario objective:</b> ' + G.UI._esc(sc.objective.label);
  el.style.display = "";
};

/* =========================================================== OBJECTIVES STRIP
   G.UI.renderObjectivesStrip(id, unlockedKeys) — render & persist objectives. */
G.UI.renderObjectivesStrip = function (id, unlockedKeys) {
  var strip = $(id); if (!strip) return;
  if (!unlockedKeys || !unlockedKeys.length) { strip.style.display = "none"; return; }
  var fresh = G.unlockAchievements ? G.unlockAchievements(unlockedKeys) : unlockedKeys;
  var all = (G.OBJECTIVES || []).concat((G.SCENARIOS || []).map(function (s) {
    return { key: "scenario_" + s.key, label: s.objective ? s.objective.label : s.name + " Complete" };
  }));
  var html = unlockedKeys.map(function (k) {
    var obj = all.filter(function (o) { return o.key === k; })[0];
    var isFresh = fresh.indexOf(k) >= 0;
    return '<span class="objective-badge' + (isFresh ? " new" : "") + '">' +
           G.UI._esc(obj ? obj.label : k) + ' ✓</span>';
  }).join("");
  if (html) { strip.innerHTML = html; strip.style.display = ""; }
  else strip.style.display = "none";
};

/* =========================================================== ACHIEVEMENTS
   G.UI.showAchievements(keys) — flash newly unlocked objectives.             */
G.UI.showAchievements = function (keys) {
  if (!keys || !keys.length || !G.OBJECTIVES) return;
  var strip = $("objectivesStrip") || $("legacyObjectivesStrip");
  if (!strip) return;
  var all = G.OBJECTIVES.concat((G.SCENARIOS || []).map(function (s) {
    return { key: "scenario_" + s.key, label: s.name + " — Objective Complete" };
  }));
  var html = keys.map(function (k) {
    var obj = all.filter(function (o) { return o.key === k; })[0];
    return '<span class="achievement-badge">' + G.UI._esc(obj ? obj.label : k) + ' ✓</span>';
  }).join("");
  if (html) {
    strip.innerHTML = "<b>Achievements unlocked:</b> " + html;
    strip.style.display = "";
  }
};

/* =========================================================== CAMPAIGN SCREEN
   G.UI.renderCampaign() — the campaign trail phase screen.                    */
G.UI.renderCampaign = function () {
  var c = G.state && G.state.campaign;
  if (!c) return;

  /* update days left */
  var dlEl = $("campaignDaysLeft"); if (dlEl) dlEl.textContent = c.daysLeft;
  var titleEl = $("campaignTitle"); if (titleEl) titleEl.textContent = "The Campaign Trail · " + (G.state.gameYear || 2026);

  /* region allocation chips */
  var rAlloc = $("campaignRegionAlloc");
  var _campRegions = (G.activeRegions ? G.activeRegions() : null) || G.REGIONS;
  if (rAlloc && _campRegions) {
    var html = '<p class="section-label" style="margin-top:0">Spend days in key regions</p>';
    html += '<div class="camp-alloc-grid">';
    _campRegions.forEach(function (r) {
      var days = c.allocation["region_" + r.id] || 0;
      html += '<div class="camp-slot" data-slot="region_' + r.id + '">' +
        '<span class="camp-slot-name">' + G.UI._esc(r.name) + '</span>' +
        '<div class="camp-stepper">' +
        '<button class="camp-step-btn" data-dir="-1" data-slot="region_' + r.id + '">−</button>' +
        '<span class="camp-days" id="campdays_region_' + r.id + '">' + days + '</span>' +
        '<button class="camp-step-btn" data-dir="1" data-slot="region_' + r.id + '">+</button>' +
        '</div></div>';
    });
    html += '</div>';
    rAlloc.innerHTML = html;
  }

  /* bloc allocation chips */
  var bAlloc = $("campaignBlocAlloc");
  var _campBlocs = G.activeBlocs ? G.activeBlocs() : G.ELECTORATE_BLOCS;
  if (bAlloc && _campBlocs) {
    var html2 = '<p class="section-label">Spend days courting voter blocs</p>';
    html2 += '<div class="camp-alloc-grid">';
    _campBlocs.forEach(function (b) {
      var days2 = c.allocation["bloc_" + b.key] || 0;
      html2 += '<div class="camp-slot" data-slot="bloc_' + b.key + '">' +
        '<span class="camp-slot-name">' + G.UI._esc(b.name) + '</span>' +
        '<div class="camp-stepper">' +
        '<button class="camp-step-btn" data-dir="-1" data-slot="bloc_' + b.key + '">−</button>' +
        '<span class="camp-days" id="campdays_bloc_' + b.key + '">' + days2 + '</span>' +
        '<button class="camp-step-btn" data-dir="1" data-slot="bloc_' + b.key + '">+</button>' +
        '</div></div>';
    });
    html2 += '</div>';
    bAlloc.innerHTML = html2;
  }

  /* themes */
  var themes = $("campaignThemes");
  if (themes && G.CAMPAIGN_THEMES) {
    themes.innerHTML = G.CAMPAIGN_THEMES.map(function (t) {
      var sel = c.theme === t.key;
      return '<button class="camp-theme-btn' + (sel ? " sel" : "") + '" data-theme="' + t.key + '">' +
        '<b>' + G.UI._esc(t.label) + '</b><br><small>' + G.UI._esc(t.desc) + '</small></button>';
    }).join("");
  }

  /* debate button */
  var debBtn = $("campaignDebateBtn");
  var debRes = $("campaignDebateResult");
  if (debBtn && debRes) {
    if (c.debateWon !== null) {
      debBtn.style.display = "none";
      debRes.style.display = "";
      debRes.textContent = c.debateWon ? "✓ You won the debate!" : "✗ You lost the debate.";
      debRes.className = c.debateWon ? "camp-debate-win" : "camp-debate-loss";
    } else {
      debBtn.style.display = "";
      debRes.style.display = "none";
    }
  }

  /* launch button */
  var launchBtn = $("campaignLaunchBtn");
  if (launchBtn) launchBtn.disabled = false;

  G.UI.show("screen-campaign");
};

/* =========================================================== SCENARIO PICKER
   G.UI.renderScenarioPicker(chosen) — builds the scenario cards in the wizard.
   Groups scenarios by country and adds a country filter tab bar.            */
G.UI.renderScenarioPicker = function (chosen, countryFilter) {
  var el = $("scenarioCards"); if (!el || !G.SCENARIOS) return;

  /* when a country filter is provided (new nation-first flow),
     show only that country's scenarios — no tab bar needed */
  var filterKey = countryFilter || el.getAttribute("data-group") || "uk";

  var scenarios = G.SCENARIOS.filter(function (s) { return (s.country || "uk") === filterKey; });

  var cards = scenarios.map(function (s) {
    var isSel = chosen === s.key || (!chosen && s.key === "freshstart");
    var lockInfo = "";
    if (s.mode || s.difficulty) {
      var parts = [];
      if (s.mode && s.mode !== "unity") parts.push(s.mode);
      if (s.difficulty) parts.push(s.difficulty);
      if (parts.length) lockInfo = '<small class="sc-lock">Locks: ' + G.UI._esc(parts.join(", ")) + '</small>';
    }
    var despotTag = s.despotMode ? '<small class="sc-despot">⚠ Guided democracy</small>' : '';
    return '<div class="scenario-card' + (isSel ? " sel" : "") + '" data-scenario="' + s.key + '">' +
      '<h4>' + G.UI._esc(s.name) + '</h4>' +
      '<p>' + G.UI._esc(s.desc) + '</p>' +
      (s.objective ? '<p class="sc-obj">🎯 ' + G.UI._esc(s.objective.label) + '</p>' : '') +
      lockInfo + despotTag +
      '</div>';
  }).join("");

  el.setAttribute("data-group", filterKey);
  el.innerHTML = '<div class="sc-grid">' + (cards || '<p class="mini-help" style="padding:8px 0">No scenarios for this nation — use the default start.</p>') + '</div>';
};
