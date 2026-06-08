# 650 — Build a Cabinet, Fight an Election

650 is a free, browser-based British political draft game. Spin for a party and an era, draft the cabinet fortune gives you, then fight a general election across all **650 real Westminster constituencies** and see how many you win. Chase the impossible: a **650‑0 clean sweep**.

Play it live: **https://650-0.co.uk**

650 is inspired by, and owes thanks to, the sports draft games [**82‑0**](https://www.82-0.com) (NBA all-time teams) and [**38‑0**](https://38-0.app) (a Premier League season). It borrows their “constrained draft, chase the perfect record” idea and points it at Westminster.

---

## How to play

### 1. Start a game

- Open **https://650-0.co.uk**, or
- Download the game and **double‑click `index.html`** in any modern browser (desktop or mobile). It runs entirely in the browser and does not need a server or build step.

Pick a way to play, choose your difficulty, and (optionally) choose which eras are in the mix before you spin.

### 2. Draft your cabinet

Spin for a **party** and an **era**, then draft the politicians the wheel offers you.

You are trying to fill every cabinet seat with the best team you can build under the constraints the game throws at you. Once your cabinet is complete, you lock it in and head to the country.

Key ideas:

- **Capable fits** – sit someone in the exact job they held and they get a fit bonus; sit them in a closely related job (a Leader of the House, Deputy or great-office holder as PM, a Chancellor at Business) and they’re *capable* — no bonus, no penalty.
- **Deep-bench tier spins** – when a party fields hundreds (e.g. Labour after 2010), you first spin for a *tier* (front rank down to new intake) and then pick from a short random shortlist, so you never scroll through a 400-name list.

### 3. Fight the election

Once your cabinet is set, you fight a UK‑wide general election:

- The game simulates **First Past the Post** across **all 650 constituencies** on the real 2024 boundaries.
- Your cabinet strength, the national mood, and your difficulty level shape your vote share.
- You’ll see seat‑by‑seat results on a **hex cartogram map**: one hex per constituency, the same style of map used on election night.

You can:

- Run the **watch‑along** at slow, normal, or fast declaration speed, watching the map light up seat by seat; or
- Skip to the final result if you just want the numbers.

You’ll see:

- How many seats you won.
- The national verdict on your government.
- How the **rest of the House** looks, with the other parties drawn from the current (2026) landscape, including Reform and the Greens as real forces.

### 4. Govern a full term (optional)

If you choose to **Govern**, winning the election is only the start. You take office and play out a full parliamentary term.

You manage three meters:

- **Approval**
- **The Economy**
- **Party Unity**

Crisis cards throw events at you; the *ministers you drafted* shape how those gambles land. A strong Chancellor might make a fiscal bet pay off; a weak one might tank it.

Along the way you face:

- By‑elections
- Backbench rebellions
- Confidence votes

Survive to polling day and you earn a **legacy score**; fall short and you might be forced out early.

You can govern:

- With a **majority**
- In a **one‑ or two‑party coalition**
- As a **minority** on a knife-edge
- Or as the **Opposition**, trying to build support, win by‑elections, force an early election — or be deposed by your own side.

### 5. Share your result

At the end of a run you can:

- Download a **result card** with your headline seat count, verdict and full cabinet; or
- Post straight to **𝕏** (Twitter), using native image sharing on your phone where available, or the web composer otherwise.

---

## Game modes & options

650 gives you several ways to play:

- **Greatest Cabinet (cross‑party)**  
  Draft across parties and eras. Build a unity ticket that can contest every seat.

- **Single‑Party Dynasty**  
  Stick to one tradition. The big parties (Labour, Conservative, the Liberal/Lib Dem line, the SNP) field a full twelve, and so now do the insurgents:
  - **Reform**, drawing on UKIP and Brexit Party
  - **Green**, spanning Westminster, Holyrood, and the European Parliament

- **Wildcard**  
  A clearly labelled satirical “what if” mode. It opens up world leaders and historical figures:
  - Names span Nazi leadership, 20th‑century despots and, for balance, major world statesmen.
  - Heinous figures carry factual, condemnatory notes and deliberately weak in‑game ratings so the game never rewards them.

You can also tune:

- **Difficulty** – Easy / Normal / Hard shift the national mood for and against you.
- **Eras** – Pick which periods the wheel can land on, from the Age of Revolutions to the present.
- **Cabinet size** – Play a standard 12‑seat cabinet or an expanded 16‑seat one.
- **Re‑spins** – Choose how many do‑overs you get on the spin.
- **Policy phase** (optional) –  
  - Before the vote, write a **manifesto** that nudges your national support.  
  - In office, set a **programme**; keeping promises steadies the party, breaking them invites backlash.

---

## Exploring the real map

The map is real:

- The results map is a **hex cartogram** of all 650 constituencies on the 2024 boundaries — one hexagon per seat.
- Hover or tap any seat to see the constituency name and its current MP.

Use **Explore the map** from the menu to browse the current House of Commons and see the sitting MP and party for every seat.

---

## Fairness & satire

650 is a game and a piece of satire.

- Ratings are a deliberately debatable editorial abstraction applied to everyone on the same scale; they are **not** a factual scorecard of any person.
- Party leanings drive a simple, transparent voting model — it is **not** a prediction engine or polling average.

---

## Who owns what (IP & re‑use)

This game — the **650 / 650‑0 concept, rules, mechanic and presentation** — is the original creative work of its author.

Open source here means:

- You are welcome to **read, learn from, and build on the code**, subject to the MIT licence in `LICENSE`.
- You **must not** strip attribution, pass the game off as your own original concept, or pretend to have invented “650‑0” while lifting its mechanics, structure and presentation.

In practical terms:

- Public forks and adaptations should **keep the existing copyright notice**
- Clearly credit the original game (name and link: **https://650-0.co.uk**)
- Make it clear if what you are running is an **unofficial fork** or variant

Any “spin‑off” that copies the distinctive 650‑0 framing, structure and design is, by definition, built on this work.

---

## Credits & data sources

The current Parliament is in the game. Every sitting MP is draftable by real name, party and constituency.

650 ships two openly licensed datasets directly in the JavaScript, so the game needs no network calls and no API keys:

- **Constituency hex map**  
  Layout by [**Open Innovations**](https://open-innovations.org) and contributors, used under an open licence. It is baked into `js/hexmap.js` as `G.HEXMAP` (650 seats, each with GSS code, name, hex coordinates `q`/`r`, and region).

- **Sitting MPs**  
  From [**mySociety / parlparse**](https://github.com/mysociety/parlparse), an open dataset. It is baked into `js/data.mps.js` as `G.CURRENT_MPS` and then expanded into the draft roster.

**Ratings** are an editorial baseline by design:

- A few dozen front‑rank figures are hand‑rated in `js/data.js`.
- Every other sitting MP gets a consistent, modest baseline derived deterministically from their name rather than invented biographies and stats for hundreds of backbenchers.
- Hand‑rated entries always take precedence.

The underlying datasets remain under their own open licences; please keep their attribution (it appears in the footer and in‑game “How it works”).

---

## For modders (optional)

You do **not** need any tooling to play or lightly tweak the game. Everything is plain files.

If you want to mod or host your own fork:

- **Run it locally**  
  Just open `index.html` in a browser. An internet connection is only used once to load display fonts from Google Fonts; everything else is local.

- **Basic file structure**

  ```text
  index.html            markup + screens
  css/styles.css        all styling
  js/data.js            eras, parties, portfolios, hand-curated politicians, config
  js/hexmap.js          650-seat hex cartogram (Open Innovations layout)
  js/data.mps.js        sitting MPs (parlparse) + roster expansion
  js/election.js        FPTP across 650 constituencies, Monte Carlo odds
  js/engine.js          draft state machine (spin / pick / assign / hold)
  js/ui.js              rendering: draft, map, watch-along, result, explorer
  js/main.js            wiring and the election-night flow
  .nojekyll             tells GitHub Pages to serve the js/ folder as-is
  LICENSE               MIT licence for the code
