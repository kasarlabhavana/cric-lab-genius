# CricScience

The physics, biomechanics and technology behind cricket — short lessons with sources, interactive labs, quizzes with spaced review, and a glossary. Built as a static site with [Astro](https://astro.build): no database, no accounts, no tracking. Progress is stored in the visitor's browser.

## Run it

```bash
npm install
npm run dev        # local development at http://localhost:4321
npm run build      # production build into dist/
npm run check      # after build: validates quiz data and every internal link
npm run preview    # serve the built site locally
```

Requires Node 18.20+ (Node 20 or 22 recommended).

## Deploy

The output in `dist/` is plain static files. Any static host works. Pages are built as `name.html` and linked without the extension, which Cloudflare Pages, Netlify and Vercel all serve automatically.

**Cloudflare Pages (recommended):**
1. Push this folder to a GitHub repository.
2. In Cloudflare → Workers & Pages → Create → Pages → Connect to Git, pick the repository.
3. Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
4. After the first deploy, open the project → Custom domains → add `cricscience.com` and `www.cricscience.com`. If the domain's DNS is not on Cloudflare, add the CNAME records Cloudflare shows at your registrar.
5. Set `www` to redirect to the bare domain (Cloudflare → Rules → Redirect Rules), so every page has one canonical address.

Every push to the main branch then redeploys automatically.

## Project layout

```
src/
  content/lessons/<science>/<lesson>.md   lessons (one Markdown file each)
  data/modules.ts                          the seven sciences, their order and questions
  data/glossary.json                       glossary terms, each linked to a lesson
  components/                              quiz, labs, search, scorecard, daily question
  scripts/physics.ts                       the physics models behind the labs
  scripts/store.ts                         progress, review scheduling and streaks (browser storage)
  pages/                                   routes
public/                                    icons, share image, manifest, service worker
scripts/check-content.mjs                  post-build checks
```

## Writing a lesson

Create `src/content/lessons/<science>/<slug>.md`. The build fails if a required field is missing.

```yaml
---
title: Why a new ball swings
summary: One or two sentences. Used as the page description in search results.
module: ball-in-flight          # must match a slug in src/data/modules.ts
order: 1                        # position within the science
minutes: 6
lastReviewed: 2026-10-26
lab: swing                      # optional: flight | swing | six
established:                    # claims with strong evidence
  - ...
debated:                        # claims that are genuinely open
  - ...
sources:                        # at least one; link to the primary source where possible
  - title: "Author — Title, Journal (Year)"
    url: https://...
quiz:                           # at least three questions; answer is the 0-based index
  - q: Question?
    options: ["A", "B", "C", "D"]
    answer: 1
    explain: Why B is right.
---

## The short answer
...
```

Editorial rules the existing lessons follow:
- Every number is either calculated from a stated model or cited.
- No unsourced statistics about individual players.
- If research has moved on, say so in **debated** rather than repeating the old consensus.
- Update `lastReviewed` whenever a lesson is checked or corrected.

## Turning it into an app

The site is already an installable Progressive Web App (manifest + offline service worker): on Android, "Add to Home screen" installs it. To publish to app stores later, wrap `dist/` with [Capacitor](https://capacitorjs.com/).
