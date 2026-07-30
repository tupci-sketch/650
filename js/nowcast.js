/* =============================================================================
   650 — LIVE-NIGHT NOWCAST
   -----------------------------------------------------------------------------
   As seats declare, project the final seat total with a shrinking uncertainty
   band and a live probability of a majority — the way a real election-night
   desk "calls" the result before every seat is in. Uses the Monte-Carlo
   forecast's per-region win probabilities (res.forecast.regionProb) as the prior
   for undeclared regions, blended toward what each region has actually done as it
   fills up. Purely a read of already-declared results — no RNG, deterministic
   given the (already seeded) result, so it never affects the outcome.
   ============================================================================= */
window.G = window.G || {};
(function () {
  var G = window.G;
  var NC = G.Nowcast = G.Nowcast || {};

  function erf(x) {
    var t = 1 / (1 + 0.3275911 * Math.abs(x));
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return x >= 0 ? y : -y;
  }
  function normCdf(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  NC.normCdf = normCdf;

  /* w must carry: total, i (declared), won (player wins declared),
     regionTotals {regionId:seats}, declaredByRegion {}, wonByRegion {}.
     res carries forecast.regionProb (prior) + forecast.thresholds.majority.     */
  NC.project = function (w, res) {
    var fc = (res && res.forecast) || {};
    /* prefer THIS campaign's own deterministic per-region expectation (tracks the
       actual result); fall back to the forecast average, then the overall rate */
    var regionProb = (res && res.campaign && res.campaign.regionExpected) || fc.regionProb || null;
    var majority = (fc.thresholds && fc.thresholds.majority) ||
                   (G.activeMajority ? G.activeMajority() : ((G.CONFIG && G.CONFIG.majority) || 326));
    var total = w.total, declared = w.i, wonDeclared = w.won;

    if (declared >= total) {
      return { projected: wonDeclared, low: wonDeclared, high: wonDeclared,
               pMajority: wonDeclared >= majority ? 1 : 0, declared: declared,
               total: total, majority: majority, final: true };
    }
    var overallRate = declared > 0 ? wonDeclared / declared : 0.5;
    var rt = w.regionTotals || {};
    var dbr = w.declaredByRegion || {}, wbr = w.wonByRegion || {};

    /* national swing so far: how far the declared seats have run ABOVE/below what
       the forecast's per-region priors expected of them. FPTP swing is strongly
       correlated, so this same swing is applied to every undeclared region — this
       is what lets the projection track a specific campaign, not the average. */
    var priorOf = {}, expWins = 0;
    Object.keys(rt).forEach(function (rid) {
      var prior = (regionProb && regionProb[rid] != null) ? regionProb[rid] : overallRate;
      priorOf[rid] = prior;
      expWins += (dbr[rid] || 0) * prior;
    });
    var swing = declared > 0 ? (wonDeclared - expWins) / declared : 0;

    var projected = wonDeclared, idioVar = 0;
    Object.keys(rt).forEach(function (rid) {
      var tot = rt[rid] || 0, decl = dbr[rid] || 0, won = wbr[rid] || 0;
      var remaining = Math.max(0, tot - decl);
      if (!remaining) return;
      var adj = Math.max(0, Math.min(1, priorOf[rid] + swing));   // prior shifted by the national swing
      var pEff;
      if (decl > 0) { var wgt = decl / tot; pEff = wgt * (won / decl) + (1 - wgt) * adj; }
      else pEff = adj;
      pEff = Math.max(0, Math.min(1, pEff));
      projected += remaining * pEff;
      idioVar += remaining * pEff * (1 - pEff);         // per-seat idiosyncratic variance
    });

    /* the dominant early uncertainty is the correlated national swing itself,
       estimated with error ~ p(1-p)/declared — it shrinks as the night goes on. */
    var remainingTotal = total - declared;
    var pbar = declared > 0 ? wonDeclared / declared : 0.5;
    /* regularised so an all-win/all-lose early sample doesn't read as certainty */
    var swingVar = (pbar * (1 - pbar) + 0.03) / (declared + 4);
    var sd = Math.sqrt(Math.max(0.25, idioVar + remainingTotal * remainingTotal * swingVar));
    sd = Math.max(sd, 0.04 * remainingTotal);        // never falsely certain with many seats out
    var pMaj = normCdf((projected - majority + 0.5) / sd);
    return {
      projected: Math.round(projected),
      low:  Math.max(0, Math.round(projected - 1.64 * sd)),
      high: Math.min(total, Math.round(projected + 1.64 * sd)),
      pMajority: pMaj, declared: declared, total: total, majority: majority, final: false
    };
  };

  /* one-line human summary for the watch header */
  NC.line = function (p) {
    if (!p) return "";
    if (p.final) return "Final: " + p.projected + " seats";
    var pctMaj = Math.round(p.pMajority * 100);
    var majWord = pctMaj >= 99 ? "majority certain"
                : pctMaj <= 1  ? "no majority"
                : pctMaj + "% chance of a majority";
    var half = Math.max(1, Math.round((p.high - p.low) / 2));
    return "Projected " + p.projected + " ± " + half + " · " + majWord;
  };
})();
