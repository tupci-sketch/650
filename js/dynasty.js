/* =============================================================================
   650 — A CAREER ACROSS DECADES
   -----------------------------------------------------------------------------
   • Ageing    — every parliament a minister serves changes them: experience
                 and statecraft grow, the shine on their appeal (and later
                 their oratory) wears off. Applied to carried-over ministers as
                 clones, so the shared roster is never mutated.
   • Protégés  — a retiring minister names an heir from their own tradition
                 (a later generation, a good fit for the post). Promote them
                 straight into the vacancy, mentored, or leave it to the draft.
   • The book  — every parliament becomes a chapter of the party's history:
                 who led, what you won, who fell, who rose. Read it at the end.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var D = G.Dynasty = {};

  function byName(n) {
    if (!D._idx || D._idxN !== (G.POLITICIANS || []).length) {
      D._idx = {}; D._idxN = (G.POLITICIANS || []).length;
      (G.POLITICIANS || []).forEach(function (p) { D._idx[p.name] = p; });
    }
    return D._idx[n] || null;
  }
  function clamp(v) { return Math.max(1, Math.min(99, Math.round(v))); }

  /* the change n parliaments of service makes */
  D.ageDelta = function (n) {
    n = Math.max(0, n | 0);
    return { experience: 3 * n, statecraft: Math.min(6, n), appeal: -1.5 * Math.max(0, n - 1), oratory: -Math.max(0, n - 2), partyMgmt: Math.min(4, n) };
  };
  /* a minister as they are after n parliaments (base stats from the roster) */
  D.aged = function (pol, n, extra) {
    if (!pol) return pol;
    var base = byName(pol.name) || pol;
    var d = D.ageDelta(n), s = base.stats || {}, out = {};
    for (var k in base) if (Object.prototype.hasOwnProperty.call(base, k)) out[k] = base[k];
    out.stats = {
      appeal: clamp((s.appeal || 50) + d.appeal + (extra || 0)), experience: clamp((s.experience || 50) + d.experience + (extra || 0)),
      oratory: clamp((s.oratory || 50) + d.oratory + (extra || 0)), statecraft: clamp((s.statecraft || 50) + d.statecraft + (extra || 0)),
      partyMgmt: clamp((s.partyMgmt || 50) + d.partyMgmt + (extra || 0))
    };
    out._served = n;
    if (pol._mentor) { out._mentor = pol._mentor; out._mentored = pol._mentored; }
    if (out._mentored) { var b = out._mentored; ["appeal","experience","oratory","statecraft","partyMgmt"].forEach(function (k2) { out.stats[k2] = clamp(out.stats[k2] + b); }); }
    return out;
  };
  /* serve counts for a cabinet (for the run code, so replays can reproduce) */
  D.servedMap = function (cab) {
    var m = {}, c = (G.career && G.career.ministerServeCount) || {};
    Object.keys(cab || {}).forEach(function (k) {
      var p = cab[k]; if (p && (p._served || p._mentored)) m[p.name] = [p._served || 0, p._mentored || 0];
    });
    return m;
  };

  /* held seats as a compact bitset over the UK map (for run codes) */
  D.packSeats = function (list) {
    if (!list || !list.length || !G.buildGeo) return "";
    var cons = G.buildGeo().constituencies, set = {}, bytes = new Array(Math.ceil(cons.length / 8)).fill(0), any = false;
    list.forEach(function (g) { set[g] = 1; });
    cons.forEach(function (c, i) { if (set[c.gss]) { bytes[i >> 3] |= (1 << (i & 7)); any = true; } });
    return any ? btoa(String.fromCharCode.apply(null, bytes)) : "";
  };
  D.unpackSeats = function (str) {
    if (!str || !G.buildGeo) return [];
    var cons = G.buildGeo().constituencies, bin = atob(str), out = [];
    cons.forEach(function (c, i) { if (bin.charCodeAt(i >> 3) & (1 << (i & 7))) out.push(c.gss); });
    return out;
  };

  /* ---- protégés ---------------------------------------------------------- */
  D.protegeFor = function (retiree, port, taken) {
    if (!retiree) return null;
    var lin = G.lineageOf ? G.lineageOf(retiree.party) : retiree.party;
    var eraIdx = function (e) { var i = (G.ERAS || []).map(function (x) { return x.id; }).indexOf(e); return i < 0 ? 0 : i; };
    var minEra = eraIdx(retiree.era);
    var car = G.career || {};
    var sys = G.activeElectoralSystem && G.activeElectoralSystem();
    var country = sys ? sys.country : null;
    var cands = (G.POLITICIANS || []).filter(function (p) {
      if (!p.stats || taken[p.name] || (car.retiredMinsters || {})[p.name]) return false;
      if (G.isDespot && G.isDespot(p) && !(sys && sys.despotMode)) return false;
      if (G.castOf && G.castOf(p) !== "statesman") return false;
      if ((G.lineageOf ? G.lineageOf(p.party) : p.party) !== lin) return false;
      if (eraIdx(p.era) < minEra) return false;
      if (country && G.partyCountry) { var pc = G.partyCountry(p.party); if (pc && pc.toUpperCase() !== String(country).toUpperCase() && !(country === "Japan" && pc.toUpperCase() === "JP")) return false; }
      return true;
    }).map(function (p) { return { p: p, v: G.scoreFor(p, port) * G.fitMultiplier(p, port) }; })
      .sort(function (a, b) { return b.v - a.v; });
    if (!cands.length) return null;
    var pick = cands[Math.floor(Math.random() * Math.min(3, cands.length))];
    return pick.p;
  };

  /* resolve the retirement screen once (so what you see is what happens) */
  D.planRetirements = function (cabinet) {
    var retiring = G.checkRetirements ? G.checkRetirements(cabinet || {}) : [];
    var taken = {};
    Object.keys(cabinet || {}).forEach(function (k) { if (cabinet[k]) taken[cabinet[k].name] = 1; });
    retiring.forEach(function (r) {
      var pr = D.protegeFor(r.politician, r.portfolioKey, taken);
      if (pr) { taken[pr.name] = 1; r.protege = pr; r.promote = true; }
    });
    if (G.career) G.career._pendingRetire = retiring;
    return retiring;
  };

  /* ---- the history book -------------------------------------------------- */
  D.chapter = function (result, verdict) {
    var car = G.career; if (!car || !result) return;
    car.book = car.book || [];
    var m = G.NightFX ? G.NightFX.moments(result) : null;
    var t = G.term;
    var hist = (t && t.history) || [];
    var events = [];
    hist.forEach(function (h) { (h.titles || h.title || "").split(" / ").forEach(function (x) { if (x && events.indexOf(x) === -1) events.push(x); }); });
    car.book.push({
      parliament: car.parliament, year: result.electionYear || (G.state && G.state.gameYear) || 2026,
      party: result.campaign && result.campaign.blocLabel, pm: result.pmName,
      seats: result.seats, total: result.totalSeats || 650, vote: Math.round((result.voteShare || 0) * 1000) / 10,
      tier: result.tier && result.tier.label, govt: !!(t && t.kind === "govt"),
      outcome: verdict ? verdict.outcome : null, legacy: verdict ? verdict.legacy : null,
      events: events.slice(0, 5),
      fallen: m ? m.ministersLost.map(function (x) { return x.name; }) : [],
      scalps: m ? m.scalps.map(function (x) { return x.name + " (" + x.party + ")"; }) : [],
      rivals: t && t.rival ? t.rival.leaders.slice() : [],
      rivalParty: t && t.rival ? t.rival.party : null,
      defections: t && t.tl ? t.tl.defections : 0,
      byElections: t && t.byElectionSeats ? t.byElectionSeats.length : 0,
      cabinet: (G.PORTFOLIOS || []).map(function (p) { var x = G.state && G.state.cabinet && G.state.cabinet[p.key]; return x ? { post: p.key, name: x.name, served: x._served || 0 } : null; }).filter(Boolean)
    });
  };
  D.noteRetirements = function (retiring) {
    var car = G.career; if (!car || !car.book || !car.book.length) return;
    var ch = car.book[car.book.length - 1];
    ch.retired = retiring.map(function (r) { return r.politician.name; });
    ch.proteges = retiring.filter(function (r) { return r.protege && r.promote; }).map(function (r) { return r.protege.name + " (protégé of " + r.politician.name + ")"; });
  };

  function post(k) { return (G.NightFX && G.NightFX.postTitle) ? G.NightFX.postTitle(k) : ((G.PORTFOLIO_BY_KEY[k] || {}).name || k); }
  D.bookText = function () {
    var car = G.career; if (!car || !car.book || !car.book.length) return "";
    var party = car.book[0].party || car.partyName || "The Party";
    var out = ["A HISTORY OF " + String(party).toUpperCase(), ""];
    car.book.forEach(function (c, i) {
      out.push("Chapter " + (i + 1) + " — " + c.year + ": " + (c.govt ? "In Government" : "In Opposition"));
      out.push(c.pm + " led " + c.party + " to " + c.seats + " of " + c.total + " seats on " + c.vote + "% (" + c.tier + ").");
      if (c.scalps && c.scalps.length) out.push("The night's scalps: " + c.scalps.join(", ") + ".");
      if (c.fallen && c.fallen.length) out.push("Lost their seats: " + c.fallen.join(", ") + ".");
      if (c.events && c.events.length) out.push("The parliament: " + c.events.join("; ") + ".");
      if (c.rivals && c.rivals.length) out.push("Opposite: " + c.rivals.join(" → ") + (c.rivalParty ? " (" + c.rivalParty + ")" : "") + ".");
      if (c.defections) out.push(c.defections + " MP" + (c.defections > 1 ? "s" : "") + " crossed the floor.");
      if (c.outcome) out.push("Verdict: " + c.outcome + (c.legacy != null ? " — legacy " + c.legacy + "/100" : "") + ".");
      if (c.retired && c.retired.length) out.push("Stood down: " + c.retired.join(", ") + ".");
      if (c.proteges && c.proteges.length) out.push("Rising: " + c.proteges.join(", ") + ".");
      out.push("");
    });
    return out.join("\n");
  };
  D.renderBook = function (backTo) {
    var car = G.career, box = document.getElementById("bookBody");
    if (!box) return;
    var esc = G.UI._esc;
    if (!car || !car.book || !car.book.length) { box.innerHTML = '<p class="muted">The first chapter is written when your first parliament ends.</p>'; }
    else {
      var party = car.book[0].party || car.partyName || "The Party";
      box.innerHTML = '<h2 class="book-title">A History of ' + esc(party) + '</h2>' + car.book.map(function (c, i) {
        var line = function (lbl, v) { return v ? '<p><b>' + lbl + '</b> ' + v + '</p>' : ''; };
        return '<article class="book-ch"><h3><span>Chapter ' + (i + 1) + '</span> ' + c.year + ' · ' + (c.govt ? "In Government" : "In Opposition") + '</h3>' +
          '<p class="book-lede">' + esc(c.pm) + ' led ' + esc(c.party) + ' to <b>' + c.seats + '</b> of ' + c.total + ' seats on ' + c.vote + '% — ' + esc(c.tier || "") + '.</p>' +
          line("Scalps:", c.scalps && c.scalps.length ? esc(c.scalps.join(", ")) : "") +
          line("Lost their seats:", c.fallen && c.fallen.length ? esc(c.fallen.join(", ")) : "") +
          line("The parliament:", c.events && c.events.length ? esc(c.events.join("; ")) : "") +
          line("Opposite:", c.rivals && c.rivals.length ? esc(c.rivals.join(" → ")) + (c.rivalParty ? " (" + esc(c.rivalParty) + ")" : "") : "") +
          line("Floor-crossings:", c.defections ? String(c.defections) : "") +
          line("Verdict:", c.outcome ? esc(c.outcome) + (c.legacy != null ? " — legacy " + c.legacy + "/100" : "") : "") +
          '<div class="book-cab">' + (c.cabinet || []).map(function (m) { return '<span>' + esc(post(m.post)) + ': <b>' + esc(m.name) + '</b>' + (m.served > 0 ? ' <i>' + (m.served + 1) + 'th term</i>'.replace(/^(.*?)(\d+)th/, function (_, a, n) { n = +n; return a + n + (n === 2 ? "nd" : n === 3 ? "rd" : "th"); }) : '') + '</span>'; }).join("") + '</div>' +
          line("Stood down:", c.retired && c.retired.length ? esc(c.retired.join(", ")) : "") +
          line("Rising:", c.proteges && c.proteges.length ? esc(c.proteges.join(", ")) : "") +
          '</article>';
      }).join("");
    }
    D._back = backTo || "screen-menu";
    G.UI.show("screen-book");
  };
})();
