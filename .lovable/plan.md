
## 1. Cricket Field Radial Map (replaces card deck on `/`)

Rebuild `CardDeck` in `src/routes/index.tsx` as a top-down oval field:

- SVG oval pitch (green gradient, 30-yard inner circle, pitch strip in middle, boundary rope) sized responsively via `viewBox="0 0 800 900"` + `preserveAspectRatio`.
- Sciences pinned by field role, positioned with `%` on absolute-positioned wrappers over the SVG:
  - **Bowling / Physics of Delivery / Spin / Swing / Pace** → bowler's end (top of pitch)
  - **Batting / Shot Selection / Footwork** → batter's end (bottom of pitch)
  - **Fielding / Catching / Wicket-keeping / Fitness** → ring positions (slip, point, cover, mid-off, mid-on, midwicket, square leg, fine leg)
  - **Environment / Pitch / Weather** → sky band above the boundary
  - **Equipment / Rules / History** → pavilion strip below the boundary
- Each pin = compact `ScienceTile` (icon + short label) that opens the topic page. Reuse existing `Link to="/topics/$slug"`.
- Mobile: field scales down; pins keep min 44px tap target; labels truncate; long-press/tap shows tooltip with description.
- Keyboard: pins are `<Link>` in DOM order (bowler → pitch → fielders clockwise → batter → env → equipment) with visible focus ring and aria-labels.

## 2. New Lesson Chapters

Add to `src/lib/modules.ts` (or `modules-additions.ts`):

- **Rules & Officiating** module (or extend existing rules module) with lessons: **DRS**, **Mankading (Run-out at non-striker's end)**, **UltraEdge**, **Snickometer**.
- **Environment** module: add **Overcast Conditions** lesson (swing bias, visibility, DLS implications).
- Each lesson: full `LessonContent` with sections, glossary refs, one quiz question (see §7).

## 3. Global Search

- New `src/components/global-search.tsx`: Cmd/Ctrl+K + header icon button, opens a `Dialog` with input and grouped results.
- Index built at module load from `MODULES`, `TOPICS`, `QUIZZES`, `LABS` (simulators), `GLOSSARY` → flat array `{ type, title, subtitle, to, params }`.
- Client-side fuzzy match (simple `.toLowerCase().includes` + token score; no dependency). Show top 8, grouped by type with icons.
- Mount in `src/components/app-layout.tsx` so it's on every page. Header gets a search button (icon + "Search" label on ≥sm).

## 4. Rename AI Coach → Intelli Coach

- Rename displayed text everywhere (nav, page title, headings, meta, toasts). Route stays `/ai-coach` to avoid breaking links, but add a redirect route `/intelli-coach` → `/ai-coach` and update all in-app `<Link>`s to `/ai-coach` label "Intelli Coach". (Or rename file to `intelli-coach.tsx` with redirect from old — I'll pick file rename + redirect for cleanliness.)

## 5. Intelli Coach — Focus Selector + Pro Comparison

In `src/routes/ai-coach.tsx` (renamed):

- After a video is uploaded, before assessment starts, show a required choice: **Focus on** — Bowler / Batsman / Fielder (radio card group). Persist choice in component state; pass to the assessment call.
- Assessment prompt (server function using Lovable AI Gateway, `google/gemini-2.5-pro` for vision) includes:
  - The selected role so the model ignores the other players in frame.
  - Instruction to output a structured assessment **plus a "Comparison with a top pro"** section: pick a role-appropriate benchmark (e.g., Bumrah for pace bowling, Kohli for batting, Jonty Rhodes for fielding) and compare technique points side-by-side.
- UI renders the comparison as a two-column card ("You" vs "Pro benchmark") under the main assessment.

## 6. Quiz Bank — 200 Questions

Expand `QUIZZES` in `src/lib/modules.ts` to at least 200 total questions across existing quizzes:

- Ensure ≥1 question per lesson (including new DRS/Mankading/UltraEdge/Snicko/Overcast).
- Fill remaining slots with general cricket science + GK questions distributed across modules.
- Keep existing XP / correct-once-only logic in `user-state.tsx` unchanged.

## 7. Daily 5-Question Landing Modal

- New `src/components/daily-quiz-modal.tsx`, mounted in `app-layout.tsx`.
- On mount: check `localStorage["cricscience.dailyQuiz.lastShown"]`. If ≠ today's `YYYY-MM-DD`, open modal.
- Question set: deterministic daily selection seeded by date — 3 pulled from lesson quiz pool, 2 from a new `GK_QUESTIONS` array (general cricket trivia). Seeded shuffle so all users get the same set that day; new set every day.
- **Custom UI**:
  - Question card badge = **cricket bat SVG icon** (inline SVG, brand colors) next to question text.
  - Each answer option = **cricket ball SVG** (red leather with white seam) with letter A/B/C/D centered on the ball. Layout: 2×2 grid on desktop, single column on mobile. Selected/correct/incorrect states change ball tint (green/red).
  - Progress dots at top (5 balls, filled as answered).
  - Playful micro-animations (ball wobble on hover, bat swing on correct).
- Final score screen: score out of 5 + XP earned (uses `recordQuiz` with a synthetic id `daily-YYYY-MM-DD` so XP still follows correct-once-per-question rule), plus two buttons: **Retake tomorrow** (closes modal) and **Explore homepage** (closes modal, stays on `/`).
- Dismissible via ESC / close button; dismissal still marks "shown today" so it doesn't re-open on route changes.

## Technical Notes

- All new data (lessons, questions, GK bank) is static TS in `src/lib/` — no DB changes.
- Global search + daily modal are client-only; safe to render inside `AppLayout`.
- Intelli Coach vision assessment uses `createServerFn` calling Lovable AI Gateway (`LOVABLE_API_KEY` already set); role focus passed as input; response returned as structured JSON via `Output.object` with `assessment`, `strengths`, `improvements`, `proComparison: { name, points[] }`.
- Field-map SVG lives inline in `index.tsx` (no new asset dependency); uses existing `--brand-green` etc. tokens.
- Rename handled by moving `src/routes/ai-coach.tsx` → `intelli-coach.tsx` + a tiny redirect route at old path.

Confirm to switch to build mode and I'll implement in this order: (1) lessons + question bank, (2) field map, (3) global search, (4) daily modal, (5) Intelli Coach rename + focus + pro comparison.
