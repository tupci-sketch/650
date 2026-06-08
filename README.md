# 650 — Build a Cabinet, Fight an Election

A free, browser-based political draft game. Spin for a party and an era, draft
whichever politician fortune offers, fill every cabinet seat, then fight a
general election across all **650 real Westminster constituencies** and see how
many you win. Chase the impossible: every seat in the House — a **650-0 clean sweep**.

Live: **https://650-0.co.uk**

Inspired by, and with thanks to, the sports draft games
[**82-0**](https://www.82-0.com) (NBA all-time teams) and
[**38-0**](https://38-0.app) (a Premier League season). 650 borrows their
constrained-draft, chase-the-perfect-record idea and points it at Westminster.

---

## Play it locally

No build step, no dependencies, no server. **Double-click `index.html`** — it runs
in any modern browser, including straight off the disk (`file://`). An internet
connection is used once, to load the display fonts from Google Fonts; everything
else is local.

---

## What's in it

**Three ways to play**
- **Greatest Cabinet** (cross-party) — draft the best of all eras, any party. A unity ticket that can contest every seat.
- **Single-Party Dynasty** — one tradition only. The big parties (Labour, Conservative, the Liberal/Lib Dem line, the SNP) field a full twelve, and so now do the insurgents: a **Reform** bench drawing on UKIP and Brexit Party heritage, and a **Green** one spanning Westminster, Holyrood and the European Parliament.
- **Wildcard** — a clearly-labelled satirical "what if", opening up world leaders and historical figures. Names span the Nazi leadership, the 20th-century despots and — for balance — major world statesmen; heinous figures carry factual, condemnatory notes and deliberately feeble in-game ratings, so the game never rewards them.

**Difficulty** — Easy / Normal / Hard shift the national mood for and against you.
**Eras** — toggle which periods the wheel can land on, from the Age of Revolutions to the present.
**Govern** — win, and you don't just get a score: you take office and play a full term. Steer three meters — Approval, the Economy and Party Unity — through a parliament of crisis cards, where the *ministers you drafted* decide whether your gambles land (a strong Chancellor makes a fiscal bet pay off; a weak one tanks it). Survive by-elections, backbench rebellions and confidence votes to reach polling day and earn a **legacy score** — or be brought down early.
**Watch-along** — an election-night count that lights up the map seat by seat, region by region, at your chosen **declaration speed** (slow, normal or fast) — or skip straight to the result.

**A deep-bench tier spin** — when a party fields hundreds (Labour after 2010), you spin for a *tier* first — front rank down to the new intake, by prominence — then choose from a short, randomised shortlist, so you never scroll a 400-name list.

**The whole House** — the count and the result now show every party's seat total, not just yours, with the other parties drawn from the current (2026) landscape — Reform and the Greens included as the real forces they have become.

**Coalitions & opposition** — no majority? Strike a one- or two-party **coalition**, govern as a **minority** on a knife-edge, or lead the **Opposition** in its own full term: build Public support and Momentum against the government, win by-elections, and try to force an early election — or be deposed by your own side.

**Cabinet size & do-overs** — take a standard twelve-seat or an expanded sixteen-seat cabinet, and choose how many re-spin do-overs you get.

**Policy phase (optional)** — write a **manifesto** before the vote (it shifts your national support) and a **programme** in office, where keeping your promises steadies the party and breaking them invites a backlash.

**Capable fits** — sit someone in the exact job they held and they get a fit bonus; sit them in a closely related one (a Leader of the House, Deputy or great-office holder as Prime Minister, a Chancellor at Business) and they're *capable* — no bonus, but no penalty, so your "could-have-been-PMs" don't suffer for it.

**Share your result** — download the result card (headline seats, the verdict and your full cabinet), or post it straight to **𝕏** — using your phone's native image share where available, or the X web composer otherwise.

**The map is real.** The results map is a hex cartogram of all 650 constituencies on
the 2024 boundaries — one hexagon per seat, the same style of map used on election
night. Hover or tap any seat to see the constituency. **Explore the map** from the
menu to browse the current House of Commons and see the actual sitting MP and party
for every seat.

**The current Parliament is in the game.** Every sitting MP is draftable by their
real name, party and constituency.

---

## Where the data comes from (and how to change it)

Two real, openly-licensed datasets are **baked into the shipped JavaScript**, so the
game needs no network and no API key:

- **Constituency hex map** — layout by [**Open Innovations**](https://open-innovations.org)
  and contributors, used under an open licence. Baked into `js/hexmap.js` as `G.HEXMAP`
  (650 seats: GSS code, name, hex coordinates `q`/`r`, region).
- **Sitting MPs** — from [**mySociety / parlparse**](https://github.com/mysociety/parlparse),
  an open dataset. Baked into `js/data.mps.js` as `G.CURRENT_MPS`, then expanded into
  the draft roster.

**Ratings are an editorial baseline, by design.** A few dozen front-rank figures are
hand-rated in `js/data.js`; every other sitting MP gets a *consistent, modest baseline*
derived deterministically from their name — rather than inventing biographies and
statistics for hundreds of backbenchers. Hand-rated entries always take precedence.
To re-rate anyone, add or edit an entry in `js/data.js` (its name overrides the
generated one); to change the baseline, edit the small generator at the bottom of
`js/data.mps.js`.

**Swapping in a true geographic map later.** The renderer reads `G.HEXMAP` and positions
seats from `q`/`r`. To move to real boundary geography, replace the hex layout with a
simplified constituency GeoJSON/TopoJSON keyed by the same GSS codes and adapt
`G.UI.buildMap` to draw paths instead of hexagons; the election engine and the rest of
the UI are already keyed on GSS and need no change. The hex cartogram is shipped on
purpose: it's light, mobile-friendly, and shows every one of the 650 seats at equal size.

---

## File structure

```
index.html            markup + screens
css/styles.css         all styling
js/data.js             eras, parties, portfolios, hand-curated politicians, config
js/hexmap.js           650-seat hex cartogram (Open Innovations layout)
js/data.mps.js         sitting MPs (parlparse) + roster expansion
js/election.js         FPTP across the 650 real constituencies, Monte-Carlo odds
js/engine.js           draft state machine (spin / pick / assign / hold)
js/ui.js               rendering: draft, map, watch-along, result, explorer
js/main.js             wiring and the election-night flow
.nojekyll              tells GitHub Pages to serve the js/ folder as-is
LICENSE                MIT (code)
```

Load order matters and is set in `index.html`:
`data → hexmap → data.mps → election → engine → ui → main`.

---

## Put it online with GitHub Pages

1. Create a repository and upload `index.html`, the `css/` and `js/` folders, `README.md`, `LICENSE`, and the hidden `.nojekyll` file.
2. **Settings → Pages → Build and deployment → Deploy from a branch**, pick your branch and `/ (root)`, save.
3. Keep `.nojekyll` — without it, Pages can hide the `js/` folder and the page renders blank.

---

## Editing and curating

Everything is plain files. Add an era, a party, or a politician in `js/data.js`;
tune the model in the `CONFIG` block; restyle in `css/styles.css`. No tooling required.

---

## A note on fairness

650 is a game and a piece of satire. Ratings are a deliberately debatable editorial
abstraction applied to everyone on the same scale; they are not a factual scorecard of
any person. Party leanings drive a simple, transparent voting model — not a prediction.

---

## Licence

Code is released under the MIT licence (see `LICENSE`). The bundled datasets remain
under their own open licences: the constituency hex layout by Open Innovations and
contributors, and sitting-MP data from mySociety / parlparse. Please keep their
attribution (it's in the footer and the in-game "How it works").
