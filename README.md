# 650 — Build the Greatest Cabinet in British History

A free, browser-based political draft game. Spin a wheel for a party and an era, draft whichever politician fortune offers, fill all twelve cabinet seats, then fight a general election and see how many of the 650 seats you can win. Chase the impossible: every seat in the House, a **650-0 clean sweep**.

Inspired by the sports draft games [82-0](https://www.82-0.com) (NBA) and [38-0](https://38-0.app) (Premier League).

---

## Play it locally

No build step, no dependencies, no server. Just open the file:

- Double-click **`index.html`** — it runs straight in any modern browser.

(An internet connection is used once, to load the display fonts from Google Fonts. Everything else is local.)

---

## Put it online with GitHub Pages (about 5 clicks)

This is a plain static site, so hosting is free and takes a minute.

1. **Create a new repository** on GitHub (any name, e.g. `650`). Make it **Public**.
2. On the repo's main page click **Add file → Upload files**, then drag in **all of these files and folders**, keeping the structure intact:
   ```
   index.html
   .nojekyll
   css/styles.css
   js/data.js
   js/election.js
   js/engine.js
   js/ui.js
   js/main.js
   ```
   Click **Commit changes**.
3. Go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**. Set the branch to **`main`** and the folder to **`/ (root)`**, then **Save**.
5. Wait ~1 minute and refresh. GitHub shows your live link at the top of the Pages settings — something like `https://yourname.github.io/650/`. That's it.

> The empty **`.nojekyll`** file is included on purpose: it tells GitHub Pages to serve the `js/` folder as-is. Keep it.

---

## Make it your own

Everything that decides the game lives in plain, commented files — no framework to fight:

- **`js/data.js`** — the roster, the eras, the parties, the cabinet seats, and all the tuning constants. **This is the file to edit.** Each politician is one line: `P("Name", "Party", "era-id", ["seats they fit"], [appeal, experience, oratory, statecraft, partyMgmt], "one-line note")`. Ratings are 1–99. Add people, change numbers, argue with it — that's the whole point.
- **`js/election.js`** — how a cabinet's strength becomes a vote share and then seats (a deliberately stylised "cube-law"-style curve), plus the Monte-Carlo odds.
- **`js/engine.js`** — the draft loop and game state.
- **`js/ui.js`** — rendering.
- **`js/main.js`** — the wiring.
- **`css/styles.css`** — the look (an election-night / broadsheet theme).

To change the tuning (how hard a majority is, how punishing the top end is, how much campaign luck varies), edit the `CONFIG` block at the bottom of `data.js`.

---

## A note on the ratings

The player ratings are an **editorial abstraction**, applied by the same logic to every party and anchored to the public record where possible. They are meant to be disagreed with — so disagree, by editing `data.js`. This is a satirical game for entertainment and is not affiliated with any party, person, or institution.

## Licence

MIT — see [`LICENSE`](LICENSE). Do what you like with it.
