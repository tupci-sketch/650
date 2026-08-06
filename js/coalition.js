/* =============================================================================
   650 — ACTIVE COALITIONS
   -----------------------------------------------------------------------------
   When you finish short of a majority and form a government with partners, the
   arithmetic is no longer cosmetic: each partner party CLAIMS a share of the
   cabinet, staffed by named politicians drawn from the same background-simulated
   benches the opposition drafted for the election (G.buildOppositionField).
   Those ministers really sit in your G.state.cabinet for the term, so every
   governing gamble runs on the coalition's mixed quality — a strong senior
   partner shores you up; a thin junior partner is a liability you chose.

   Distinct by electoral system: PR governments share ministries in full
   proportion; Westminster-style FPTP hands juniors a token few red boxes;
   two-round France is a wary cohabitation. Country-specific phrasing (the
   Koalitionsvertrag, the Rose Garden, cohabitation…) is attached per system.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;

  /* how large a slice of the cabinet partners get, per system style — a
     multiplier on their strict seat-proportional share. PR = full; Westminster
     FPTP = juniors kept small; TRS = wary middle. */
  G.COALITION_SHARE = { pr: 1.0, trs: 0.8, fptp: 0.65, "default": 0.72 };

  /* per-system flavour: the negotiation's name + a line of country colour.
     deputyFirst = give the lead partner the deputy-head post (their leader as
     Deputy PM / Vice-Chancellor), the classic junior-partner prize. */
  G.COALITION_FLAVOR = {
    fptp_uk:             { title: "The Rose Garden", note: "A full coalition or a confidence-and-supply deal — either way your partner wants red boxes of their own.", deputyFirst: true },
    pr_dhondt_bundestag: { title: "Koalitionsvertrag", note: "German government is coalition government. Sign the agreement and divide the ministries in proportion.", deputyFirst: true },
    pr_dhondt_weimar:    { title: "A Coalition of the Centre", note: "Weimar cabinets are fragile marriages of many parties — hand out the ministries and hope it holds.", deputyFirst: true },
    trs_france:          { title: "Cohabitation", note: "A wary sharing of power across the aisle — the partner takes their portfolios, and their distance.", deputyFirst: true },
    fptp_canada:         { title: "A Supply-and-Confidence Accord", note: "Minority Ottawa runs on deals — give your partner a seat at the table and keep the House.", deputyFirst: false },
    fptp_india:          { title: "A Front of Allies", note: "Delhi governs through coalitions of many parties — the allies expect ministries for their support.", deputyFirst: true },
    av_australia:        { title: "The Coalition Agreement", note: "Partners share the front bench and a joint party room — their leader expects the deputy's chair.", deputyFirst: true },
    fptp_japan:          { title: "A Ruling Coalition", note: "Tokyo's governments are built from partners — hand them cabinet posts to keep the Diet.", deputyFirst: true }
  };
  G.coalitionFlavor = function (sysKey) {
    return G.COALITION_FLAVOR[sysKey] || { title: "Coalition talks", note: "Your partners expect cabinet posts in return for their votes.", deputyFirst: true };
  };

  function fitScore(pol, portKey) {
    var port = G.PORTFOLIO_BY_KEY && G.PORTFOLIO_BY_KEY[portKey];
    var w = port && port.w, s = pol && pol.stats;
    if (!w || !s) return 0;
    var t = 0; for (var k in w) if (w.hasOwnProperty(k)) t += (w[k] || 0) * (s[k] || 50);
    return t;
  }

  /* posts a junior partner may hold. PM is never ceded; when the player is the
     larger party the internal management posts (Leader of the House, Chief Whip)
     also stay in-house. Everything else is fair game, best-fit first. */
  function claimablePosts(cabinet, playerLarger) {
    var block = { pm: 1 };
    if (playerLarger) { block.leader = 1; block.whip = 1; }
    return Object.keys(cabinet).filter(function (k) { return cabinet[k] && !block[k]; });
  }

  /* Build the coalition cabinet. Returns a NEW cabinet plus the handover list;
     never mutates the input cabinet.
       deal       : { parties:[{party,seats,colour}], combined, tag }
       opposition : the field from buildOppositionField (party -> { bench:[pol] })
       cabinet    : the player's own G.state.cabinet
       opts       : { sysKey, playerSeats }                                     */
  G.buildCoalitionCabinet = function (deal, opposition, cabinet, opts) {
    opts = opts || {};
    var out = {}; for (var k in cabinet) if (cabinet.hasOwnProperty(k)) out[k] = cabinet[k];
    if (!deal || !deal.parties || !deal.parties.length) return { cabinet: out, handovers: [] };

    var sys = opts.sysKey && G.ELECTORAL_SYSTEMS ? G.ELECTORAL_SYSTEMS[opts.sysKey] : null;
    var style = (sys && sys.coalitionStyle) || "default";
    var mult = G.COALITION_SHARE[style] != null ? G.COALITION_SHARE[style] : G.COALITION_SHARE["default"];
    var flavor = G.coalitionFlavor(opts.sysKey);

    var N = Object.keys(cabinet).length || 12;
    var combined = deal.combined || 1;
    var playerSeats = (opts.playerSeats != null) ? opts.playerSeats
                    : combined - deal.parties.reduce(function (a, p) { return a + (p.seats || 0); }, 0);
    var playerLarger = deal.parties.every(function (p) { return playerSeats >= (p.seats || 0); });

    /* the player must keep a working grip on their own cabinet: partners never
       take more than (N-1)/2 posts between them, and the player always keeps PM. */
    var partnerCap = Math.max(1, Math.floor((N - 1) / 2));
    var pool = claimablePosts(out, playerLarger);
    var taken = {}, handovers = [], givenTotal = 0;

    /* partners handled largest-first, so the senior partner gets first pick */
    var partners = deal.parties.slice().sort(function (a, b) { return (b.seats || 0) - (a.seats || 0); });
    partners.forEach(function (pp, pi) {
      var field = opposition && opposition[pp.party];
      var bench = (field && field.bench ? field.bench.slice() : []);
      if (!bench.length) return;                       // no simulated bench => can't staff
      var want = Math.round((pp.seats || 0) / combined * N * mult);
      want = Math.max(1, want);
      want = Math.min(want, partnerCap - givenTotal, bench.length, pool.length);
      if (want <= 0) return;

      var claims = [];
      /* the lead partner's leader takes the deputy head-of-government post */
      if (flavor.deputyFirst && pi === 0 && playerLarger && out.deputy && !taken.deputy && pool.indexOf("deputy") !== -1) {
        claims.push("deputy");
      }
      /* fill the rest with the posts this bench is strongest at */
      var avail = pool.filter(function (k) { return !taken[k] && claims.indexOf(k) === -1; });
      avail.sort(function (a, b) {
        var ba = bestOf(bench, a), bb = bestOf(bench, b);
        return fitScore(bb.pol, b) - fitScore(ba.pol, a);
      });
      for (var qi = 0; qi < avail.length && claims.length < want; qi++) claims.push(avail[qi]);

      claims.forEach(function (portKey) {
        var pick = bestOf(bench, portKey);
        if (!pick.pol) return;
        bench.splice(pick.idx, 1);
        taken[portKey] = 1; givenTotal++;
        var minister = {
          name: pick.pol.name, party: pp.party,
          stats: pick.pol.stats, fits: pick.pol.fits, era: pick.pol.era,
          scope: pick.pol.scope, note: pick.pol.note,
          coalitionParty: pp.party, coalitionColour: pp.colour || partyColour(pp.party)
        };
        out[portKey] = minister;
        handovers.push({ key: portKey, title: portTitle(portKey), minister: minister, party: pp.party, colour: minister.coalitionColour });
      });
    });

    return { cabinet: out, handovers: handovers, flavor: flavor, playerLarger: playerLarger };
  };

  function bestOf(bench, portKey) {
    var best = null, bi = -1;
    for (var i = 0; i < bench.length; i++) {
      var sc = fitScore(bench[i], portKey);
      if (!best || sc > best._sc) { best = bench[i]; best._sc = sc; bi = i; }
    }
    return { pol: best, idx: bi };
  }
  function portTitle(k) { var p = G.PORTFOLIO_BY_KEY && G.PORTFOLIO_BY_KEY[k]; return (p && p.name) || k; }
  function partyColour(label) { var p = G.PARTIES && G.PARTIES[label]; return (p && p.colour) || "#6b6b6b"; }
})();
