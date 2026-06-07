/* =============================================================================
   650 — UI
   Pure rendering. Reads G.state / a result object and paints the DOM.
   Interactive elements call into G.ctrl.* (defined in main.js).
   ========================================================================== */

window.G = window.G || {};
G.UI = {};

var $ = function (id) { return document.getElementById(id); };

/* ------------------------------------------------------------- screens -- */
G.UI.show = function (screenId) {
  ["screen-menu", "screen-draft", "screen-result", "screen-about"].forEach(function (s) {
    var el = $(s);
    if (el) el.classList.toggle("active", s === screenId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

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
  var tag = G.state.mode === "dynasty"
    ? (G.state.lineage + " dynasty") : "Unity ticket";
  if (G.state.hard) tag += " · blind";
  $("modeTag").textContent = tag;
};

/* --------------------------------------------------------- draft: reels - */
G.UI.renderReels = function () {
  var sp = G.state.spin;
  var pv = $("reelParty").querySelector(".reel-value");
  var ps = $("reelParty").querySelector(".reel-sub");
  var ev = $("reelEra").querySelector(".reel-value");
  var es = $("reelEra").querySelector(".reel-sub");
  if (!sp) {
    pv.innerHTML = "—"; ps.textContent = "spin to begin";
    ev.textContent = "—"; es.textContent = "";
    return;
  }
  var party = G.PARTIES[sp.party];
  var era = G.ERA_BY_ID[sp.era];
  pv.innerHTML = '<span class="party-dot" style="background:' + (party ? party.colour : "#999") + '"></span>' + sp.party;
  ps.textContent = sp.candidates.length + " available";
  ev.textContent = era ? era.label : sp.era;
  es.textContent = era ? era.years : "";
};

/* show a teaser frame mid-spin (random labels) */
G.UI.flickerReels = function () {
  var parties = Object.keys(G.PARTIES);
  var p = parties[Math.floor(Math.random() * parties.length)];
  var e = G.ERAS[Math.floor(Math.random() * G.ERAS.length)];
  $("reelParty").querySelector(".reel-value").textContent = p;
  $("reelParty").querySelector(".reel-sub").textContent = "···";
  $("reelEra").querySelector(".reel-value").textContent = e.label;
  $("reelEra").querySelector(".reel-sub").textContent = e.years;
};

G.UI.setSpinning = function (on) {
  $("reelParty").classList.toggle("spinning", on);
  $("reelEra").classList.toggle("spinning", on);
};

/* --------------------------------------------------------- draft: pool -- */
G.UI.renderPool = function () {
  var pool = $("pool"); pool.innerHTML = "";
  var sp = G.state.spin;
  if (!sp) { return; }

  if (sp.candidates.length === 0) {
    pool.innerHTML = '<p class="pool-empty">No one left from this party and era. Spin again or use a skip.</p>';
    return;
  }

  if (G.state.pendingPick) {
    var note = document.createElement("p");
    note.className = "assign-note";
    note.textContent = "▶ " + G.state.pendingPick.name + " chosen — now click an open seat on the right →";
    pool.appendChild(note);
  } else {
    var hd = document.createElement("p");
    hd.className = "assign-note";
    hd.style.color = "var(--ink-soft)";
    hd.textContent = "Pick one to bring into your cabinet:";
    pool.appendChild(hd);
  }

  sp.candidates.forEach(function (p) {
    var b = document.createElement("button");
    var isSel = G.state.pendingPick && G.state.pendingPick.name === p.name;
    b.className = "cand" + (isSel ? " sel" : "");
    var fitNames = p.fits.map(function (k) { return G.PORTFOLIO_BY_KEY[k].name.split(" ")[0]; }).slice(0, 3).join(" · ");

    var statsHTML = "";
    if (!G.state.hard) {
      var s = p.stats;
      statsHTML =
        '<div class="stats">' +
          '<span class="stat-chip">APP<b>' + s.appeal + '</b></span>' +
          '<span class="stat-chip">EXP<b>' + s.experience + '</b></span>' +
          '<span class="stat-chip">ORA<b>' + s.oratory + '</b></span>' +
          '<span class="stat-chip">STA<b>' + s.statecraft + '</b></span>' +
          '<span class="stat-chip">PTY<b>' + s.partyMgmt + '</b></span>' +
        '</div>';
    }
    b.innerHTML =
      '<span class="who">' +
        '<span class="nm">' + p.name + '</span>' +
        '<span class="meta">' + (G.state.hard ? "fits: " + (fitNames || "—") : "fits: " + (fitNames || "—")) + '</span>' +
      '</span>' + statsHTML;
    b.onclick = function () { G.ctrl.chooseCandidate(p.name); };
    pool.appendChild(b);
  });
};

/* ------------------------------------------------------ draft: cabinet -- */
G.UI.renderCabinet = function () {
  var box = $("cabinet"); box.innerHTML = "";
  var pending = G.state.pendingPick;
  G.PORTFOLIOS.forEach(function (port) {
    var holder = G.state.cabinet[port.key];
    var seat = document.createElement("div");
    var roleShort = port.name.replace(" of the Exchequer", "").replace(" Secretary", "").replace(" Prime Minister", " PM").replace("Prime Minister", "PM");

    if (holder) {
      var fit = holder.fits.indexOf(port.key) !== -1;
      seat.className = "seat";
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="holder">' + holder.name +
          ' <span class="era-mini">' + (G.ERA_BY_ID[holder.era] ? G.ERA_BY_ID[holder.era].years : "") + '</span></span>' +
        '<span class="fitmark ' + (fit ? "good" : "bad") + '">' + (fit ? "✓ fit" : "△ stretch") + '</span>';
    } else if (pending) {
      seat.className = "seat target";
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="vacant">Place ' + pending.name + ' here</span>' +
        '<span class="fitmark ' + (pending.fits.indexOf(port.key) !== -1 ? "good" : "bad") + '">' +
          (pending.fits.indexOf(port.key) !== -1 ? "✓ fit" : "△ stretch") + '</span>';
      seat.onclick = function () { G.ctrl.assign(port.key); };
    } else {
      seat.className = "seat empty";
      seat.innerHTML =
        '<span class="role">' + roleShort + '</span>' +
        '<span class="vacant">vacant</span>';
    }
    box.appendChild(seat);
  });

  // live strength
  if (G.state.hard) {
    $("strengthVal").textContent = "hidden";
    $("strengthVal").style.fontSize = "18px";
  } else {
    var r = G.preview();
    $("strengthVal").textContent = Math.round(r.raw);
    $("strengthVal").style.fontSize = "";
  }
};

/* ----------------------------------------------------- draft: controls - */
G.UI.refreshControls = function () {
  $("spinBtn").disabled = !!G.state.spin || G.isComplete();
  $("spinBtn").textContent = G.isComplete() ? "Cabinet complete" :
    (G.state.spin ? "Choose from the wheel" : (G.state.spinsTaken ? "Spin again" : "Spin the wheel"));
  $("skipEraBtn").disabled = !(G.state.spin && G.state.skips.era > 0);
  $("skipPartyBtn").disabled = !(G.state.spin && G.state.skips.party > 0);
  $("skipEraBtn").textContent = "↻ Different era (" + G.state.skips.era + " left)";
  $("skipPartyBtn").textContent = "↻ Different party (" + G.state.skips.party + " left)";
  $("holdBtn").disabled = !G.isComplete();
};

G.UI.renderDraft = function () {
  G.UI.renderProgress();
  G.UI.renderReels();
  G.UI.renderPool();
  G.UI.renderCabinet();
  G.UI.refreshControls();
};

/* ----------------------------------------------------------- results --- */
G.UI.renderResult = function (res) {
  var C = G.CONFIG;
  var banner = $("govtBanner");
  if (res.tier.govt) {
    banner.className = "govt-banner win";
    banner.textContent = res.tier.key === "hung"
      ? "You are invited to form a government" : "You form His Majesty's Government";
  } else {
    banner.className = "govt-banner lose";
    banner.textContent = "You lead the Opposition — the Shadow Cabinet";
  }

  $("tierName").textContent = res.tier.label;

  // majority line text
  var maj = res.majorityOf;
  var ml;
  if (res.seats >= C.totalSeats) ml = "Every seat in the House. This is not supposed to be possible.";
  else if (maj >= 0) ml = "A working majority of <b>" + maj + "</b>.";
  else ml = "Short of a majority by <b>" + Math.abs(maj) + "</b> seats.";
  if (res.contestable < C.totalSeats)
    ml += " &nbsp;·&nbsp; this ticket could only contest <b>" + res.contestable + "</b> seats.";
  $("majorityLine").innerHTML = ml;

  // odds
  var pc = function (x) { return x >= 0.995 ? "100%" : x <= 0.0005 ? "<0.1%" : (x * 100).toFixed(x < 0.1 ? 1 : 0) + "%"; };
  $("oddMaj").textContent = pc(res.odds.majority);
  $("oddLand").textContent = pc(res.odds.landslide);
  $("oddSuper").textContent = pc(res.odds.supermajority);
  $("oddSweep").textContent = pc(res.odds.sweep);
  $("rangeNote").innerHTML = "This campaign returned <b>" + res.seats + "</b> on <b>" +
    (res.voteShare * 100).toFixed(1) + "%</b> of the vote. Across thousands of simulated campaigns the result ranged from <b>" +
    res.range.low + "</b> to <b>" + res.range.high + "</b> seats (median <b>" + res.range.median +
    "</b>; central projection <b>" + res.expectedSeats + "</b>). Run it again to fight another.";

  // commons bar
  $("majMark").style.left = (C.majority / C.totalSeats * 100) + "%";
  $("majKeyLabel").textContent = C.majority + " needed";
  setTimeout(function () {
    $("commonsFill").style.width = (res.seats / C.totalSeats * 100) + "%";
  }, 80);

  // cabinet roll
  var roll = $("cabinetRoll"); roll.innerHTML = "";
  G.PORTFOLIOS.forEach(function (port) {
    var h = G.state.cabinet[port.key];
    var line = document.createElement("div");
    line.className = "roll-line";
    line.innerHTML = '<span class="r">' + port.name + '</span><span class="n">' + (h ? h.name : "—") + '</span>';
    roll.appendChild(line);
  });

  // animated seat counter
  G.UI.countTo($("seatNumber"), res.seats);

  G.UI.show("screen-result");
};

G.UI.countTo = function (el, target) {
  var start = performance.now(), dur = 1100;
  function frame(t) {
    var k = Math.min(1, (t - start) / dur);
    var eased = 1 - Math.pow(1 - k, 3);
    var v = Math.round(target * eased);
    el.innerHTML = v + '<span class="of"> / 650</span>';
    if (k < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
};

/* ------------------------------------------------- shareable result card */
G.UI.drawShareCard = function (res) {
  var cv = $("shareCanvas"), x = cv.getContext("2d");
  var W = cv.width, H = cv.height;

  // background
  x.fillStyle = "#f3ecda"; x.fillRect(0, 0, W, H);
  var g = x.createRadialGradient(W * 0.85, 0, 0, W * 0.85, 0, W);
  g.addColorStop(0, "rgba(47,93,58,.16)"); g.addColorStop(1, "rgba(47,93,58,0)");
  x.fillStyle = g; x.fillRect(0, 0, W, H);

  // border
  x.strokeStyle = "#20201b"; x.lineWidth = 3;
  x.strokeRect(26, 26, W - 52, H - 52);
  x.strokeStyle = "#b3862f"; x.lineWidth = 1;
  x.strokeRect(34, 34, W - 68, H - 68);

  x.textAlign = "center";

  // kicker
  x.fillStyle = "#862231";
  x.font = "500 22px 'Spline Sans Mono', monospace";
  x.fillText("6 5 0   ·   B R I T I S H   P O L I T I C A L   D R A F T", W / 2, 96);

  // seat number
  x.fillStyle = "#20201b";
  x.font = "900 210px 'Fraunces', Georgia, serif";
  x.fillText(String(res.seats), W / 2, 320);
  x.fillStyle = "#4f4a3c";
  x.font = "500 30px 'Spline Sans Mono', monospace";
  x.fillText("SEATS OF 650", W / 2, 366);

  // tier
  x.fillStyle = "#862231";
  x.font = "italic 700 46px 'Fraunces', Georgia, serif";
  x.fillText(res.tier.label, W / 2, 432);

  // govt line
  x.fillStyle = "#2f5d3a";
  x.font = "500 24px 'Spline Sans Mono', monospace";
  var gline = res.tier.govt ? "FORMS THE GOVERNMENT" : "LEADS THE OPPOSITION";
  x.fillText(gline, W / 2, 472);

  // PM / Chancellor highlight
  var pm = G.state.cabinet["pm"], ch = G.state.cabinet["chancellor"], fo = G.state.cabinet["foreign"];
  x.fillStyle = "#20201b";
  x.font = "600 26px 'Newsreader', Georgia, serif";
  var who = [];
  if (pm) who.push("PM " + pm.name);
  if (ch) who.push("Chancellor " + ch.name);
  x.fillText(who.join("    ·    "), W / 2, 528);
  if (fo) { x.fillText("Foreign Secretary " + fo.name, W / 2, 560); }

  // footer
  x.fillStyle = "#4f4a3c";
  x.font = "400 20px 'Spline Sans Mono', monospace";
  x.fillText("can you build the greatest cabinet in british history?", W / 2, H - 60);

  return cv.toDataURL("image/png");
};

G.UI.resultText = function (res) {
  var pm = G.state.cabinet["pm"], ch = G.state.cabinet["chancellor"];
  var lines = [
    "650 — my all-time UK cabinet won " + res.seats + " of 650 seats.",
    res.tier.label + (res.tier.govt ? " — formed the government." : " — leads the opposition."),
    (pm ? "PM: " + pm.name : "") + (ch ? "  ·  Chancellor: " + ch.name : ""),
    "Can you go 650-0?"
  ];
  return lines.filter(Boolean).join("\n");
};

/* ------------------------------------------------------------- about --- */
G.UI.renderAbout = function () {
  $("aboutBody").innerHTML =
    '<h3>The idea</h3>' +
    '<p>Spin a wheel that lands on a party and an era, draft whichever politician fortune offers you, and fill all twelve seats of the cabinet. Then hold a general election. Win a majority of the 650 seats and you govern; fall short and you become the Shadow Cabinet. The white whale is the impossible one — every seat in the House, a 650-0 clean sweep.</p>' +
    '<h3>How a seat is scored</h3>' +
    '<p>Every politician carries five ratings: <code>appeal</code>, <code>experience</code>, <code>oratory</code>, <code>statecraft</code> and <code>party management</code>. Each cabinet seat weights those five differently — a Chancellor leans on statecraft and experience, the Leader of the House on oratory. Sit someone in a job they actually held and they earn a fit bonus; play them out of position and they take a penalty.</p>' +
    '<h3>How the election works</h3>' +
    '<p>Your cabinet\'s total strength maps to a projected national vote share. That share runs through a responsiveness curve inspired by the historic "cube law" of British elections — the rule of thumb that the ratio of seats won tracked roughly the cube of the ratio of votes. It has weakened in the real multi-party age, so this is a deliberately stylised version, tuned so that the last hundred seats are punishingly hard to win. A spread of random campaigns then shows the odds you were really facing.</p>' +
    '<h3>Eras &amp; parties</h3>' +
    '<p>The roster spans seven eras from the 1832 Reform Act to today. Party lineages are tracked across their name changes (Tory into Conservative; Whig into Liberal into Liberal Democrat), and a national-unity ticket can stand in all 650 seats. A single-party SNP or Plaid Cymru could only ever contest Scotland or Wales — which is exactly why they can never win a UK majority.</p>' +
    '<h3>The ratings are meant to be argued about</h3>' +
    '<p>The stats are an editorial abstraction, applied by the same logic to every party and anchored to the record where possible: experience and statecraft reward a long, broad governing career; appeal rewards elections won. They are the part you are <em>supposed</em> to disagree with — that is the whole point of the genre. Everything lives in one plain data file, so disagree by editing it.</p>';
  G.UI.show("screen-about");
};
