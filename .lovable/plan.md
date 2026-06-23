
# CricScience — Build Plan (Phase 1: Full Skeleton)

A complete frontend skeleton of the CricScience platform. Every navigation route and core module exists as a real, navigable page. Sample lessons and quizzes are AI-generated placeholders shipped as static JSON. State (XP, badges, streaks, bookmarks, progress) persists in localStorage. No backend yet.

## Design Direction

Khan Academy × Brilliant.org hybrid — clean, educational, friendly-but-serious. Cricket-coded, not toy-like.

- **Palette**: Primary navy `#0B1F3A`, Secondary orange `#FF8C00`, Accent green `#27AE60`, Background white, soft neutral surfaces (`#F7F8FA`, `#EEF1F5`).
- **Typography**: `Outfit` (headings, geometric, confident) + `Figtree` (body, highly readable). Loaded via `@fontsource`.
- **Visual language**: Generous whitespace, 12–16px rounded cards, subtle navy borders, soft shadows. Diagram-forward illustrations (pitch maps, trajectory arcs, force vectors) rendered as inline SVG using the brand palette. Orange used sparingly as the action color; green for success/XP/correct answers.
- **Motion**: Tasteful — hover lifts on cards, animated progress rings, XP count-up, lesson completion confetti. No heavy parallax.

## Information Architecture

```text
/                       Home (hero, today's challenge, continue learning, modules grid)
/explore                Explore Topics (all 13 modules as cards, filter by audience level)
/explore/$module        Module overview (lesson list, progress ring, what you'll learn)
/explore/$module/$lesson  Lesson page (content + diagrams + "mark complete" → XP)
/laboratory             Cricket Laboratory (interactive sims index)
/laboratory/$sim        Individual sim placeholder (e.g. swing simulator, trajectory plotter)
/ai-coach               AI Coach (chat UI shell, mocked responses for now)
/quiz                   Quiz Zone (quiz list by module + daily challenge)
/quiz/$quizId           Quiz runner (MCQ, scoring, XP reward)
/progress               My Progress (XP, level, streak, badges grid, certificates, bookmarks)
/community              Community (feed shell, leaderboard, discussion placeholders)
/profile                Profile (avatar, stats, settings, audience-level switcher)
/auth                   Auth screen (Email / Google / Continue as Guest — all mocked)
```

## Modules (all 13 scaffolded)

Bowling • Batting • Fielding • Pitch • Ball • Environment • Fitness • Umpiring Science, plus Cricket Laboratory, AI Coach, Quiz Zone, Progress Tracking, Community.

Each science module ships with: icon, color tint, 1-paragraph intro, 4–6 sample lessons, 1 sample quiz — all generated as static JSON so the app feels populated.

## Gamification (localStorage-backed)

- **XP**: +10 per lesson completion, +5 per correct quiz answer, +50 per quiz pass.
- **Levels**: XP thresholds (Rookie → Club → State → National → International).
- **Streaks**: Daily-login counter with flame indicator.
- **Badges**: 12 starter badges (First Lesson, Bowling Novice, Quiz Streak 5, etc.) auto-awarded on triggers.
- **Daily Challenge**: One rotating quiz/lesson surfaced on Home.
- **Leaderboard**: Static seeded users + the player, ranked by XP.
- **Bookmarks**: Star icon on lessons; saved list on Progress page.
- **Certificates**: Auto-issued (downloadable as styled HTML) when a module's lessons are all complete.

## Auth (mocked)

Single `/auth` page with Email, Google, and Guest buttons. All three set a `currentUser` in localStorage and route to `/`. Real OAuth deferred until backend phase.

## AI Coach (mocked)

Chat UI shell with conversation history in localStorage. Replies are canned/random from a curated cricket-tip pool for now. Marked clearly as "Demo mode — full AI in next phase."

## Tech / Structure

- TanStack Start file-based routing under `src/routes/`. Every route above gets its own file with proper `head()` metadata for SEO.
- Shared layout in `__root.tsx`: top nav (Home, Explore, Laboratory, AI Coach, Quiz, Progress, Community) + profile avatar. Mobile-responsive with a sheet drawer.
- Design tokens defined in `src/styles.css` under `@theme` (semantic: `--color-primary`, `--color-secondary`, `--color-accent`, surface tokens).
- Reusable components: `ModuleCard`, `LessonCard`, `ProgressRing`, `XPBar`, `BadgePill`, `QuizQuestion`, `StreakFlame`, `LeaderboardRow`, `DiagramFrame`.
- Sample content in `src/content/{module}.ts` as typed data.
- Gamification logic in `src/lib/gamification.ts` with a tiny `useUserState` hook over localStorage.
- Fonts via `bun add @fontsource/outfit @fontsource/figtree`, imported in the root.

## What's intentionally deferred

- Real auth, database, persistent multi-device progress (needs Lovable Cloud).
- Real AI Coach responses (needs AI Gateway).
- Interactive physics simulations in the Laboratory (placeholder pages with explanatory copy + diagrams for now).
- Community posting (read-only seeded feed for now).

## Deliverable

A navigable, on-brand CricScience app where you can: sign in as guest → browse all 13 modules → open a lesson → mark complete → earn XP → take a quiz → see your streak/badges/leaderboard update — all without a backend.
