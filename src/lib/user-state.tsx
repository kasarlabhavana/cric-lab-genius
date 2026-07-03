import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { BADGES, type BadgeId, MODULE_BY_SLUG } from "./modules";
import { supabase } from "@/integrations/supabase/client";

type AuthMethod = "email" | "google" | "guest";

export type CurrentUser = {
  id: string;
  name: string;
  email?: string;
  method: AuthMethod;
  level: "Child" | "Beginner" | "Intermediate" | "Academy" | "Pro" | "Coach" | "Fan";
  createdAt: number;
};

export type UserState = {
  user: CurrentUser | null;
  xp: number;
  completedLessons: Record<string, number>; // key: `${moduleSlug}/${lessonSlug}` → timestamp
  passedQuizzes: Record<string, { score: number; total: number; at: number }>; // quizId → best score
  correctQuestions: Record<string, number>; // key: `${quizId}#${questionIndex}` → timestamp first answered correctly
  bookmarks: string[]; // lesson keys
  badges: BadgeId[];
  streak: { count: number; lastDay: string | null };
  labVisits: string[];
};

const STORAGE_KEY = "cricscience.user.v1";

const empty: UserState = {
  user: null,
  xp: 0,
  completedLessons: {},
  passedQuizzes: {},
  correctQuestions: {},
  bookmarks: [],
  badges: [],
  streak: { count: 0, lastDay: null },
  labVisits: [],
};

function load(): UserState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

function save(s: UserState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export type Level = { name: string; min: number; next: number | null; progress: number };

export function deriveLevel(xp: number): Level {
  const tiers = [
    { name: "Rookie", min: 0 },
    { name: "Club", min: 200 },
    { name: "State", min: 600 },
    { name: "National", min: 1500 },
    { name: "International", min: 3500 },
  ];
  let idx = 0;
  for (let i = 0; i < tiers.length; i++) if (xp >= tiers[i].min) idx = i;
  const cur = tiers[idx];
  const next = tiers[idx + 1] ?? null;
  const progress = next ? (xp - cur.min) / (next.min - cur.min) : 1;
  return { name: cur.name, min: cur.min, next: next?.min ?? null, progress: Math.max(0, Math.min(1, progress)) };
}

type Ctx = {
  state: UserState;
  signInEmail: (email: string, password: string) => Promise<{ error?: string }>;
  signUpEmail: (email: string, password: string, name?: string) => Promise<{ error?: string }>;
  signInGoogle: () => Promise<{ error?: string }>;
  signInGuest: (name?: string) => void;
  signOut: () => Promise<void>;
  setLevel: (level: CurrentUser["level"]) => void;
  completeLesson: (moduleSlug: string, lessonSlug: string) => { xpGained: number; newBadges: BadgeId[] };
  toggleBookmark: (moduleSlug: string, lessonSlug: string) => void;
  recordQuiz: (quizId: string, correctIndices: number[], total: number) => { xpGained: number; newBadges: BadgeId[]; newlyCorrect: number; alreadyCorrect: number };
  visitLab: (slug: string) => { newBadges: BadgeId[] };
  isLessonComplete: (moduleSlug: string, lessonSlug: string) => boolean;
  isBookmarked: (moduleSlug: string, lessonSlug: string) => boolean;
  moduleProgress: (moduleSlug: string) => { done: number; total: number; pct: number };
};

const UserCtx = createContext<Ctx | null>(null);

function evaluateBadges(s: UserState): BadgeId[] {
  const have = new Set(s.badges);
  const earned: BadgeId[] = [];
  const lessonCount = Object.keys(s.completedLessons).length;
  const quizCount = Object.keys(s.passedQuizzes).length;

  const addIf = (cond: boolean, id: BadgeId) => { if (cond && !have.has(id)) earned.push(id); };

  addIf(lessonCount >= 1, "first-step");
  addIf(lessonCount >= 5, "curious-mind");
  addIf(lessonCount >= 25, "scholar");
  addIf(quizCount >= 1, "quiz-rookie");
  addIf(quizCount >= 10, "quiz-master");
  addIf(s.streak.count >= 3, "streak-3");
  addIf(s.streak.count >= 7, "streak-7");
  addIf(s.labVisits.length >= 1, "lab-rat");

  const moduleBadges: Array<[string, BadgeId]> = [
    ["bowling-science", "bowler-bookworm"],
    ["batting-science", "batters-eye"],
    ["pitch-science", "groundskeeper"],
    ["environment-science", "weatherman"],
  ];
  for (const [slug, badgeId] of moduleBadges) {
    const mod = MODULE_BY_SLUG[slug];
    if (!mod) continue;
    const allDone = mod.lessons.every(l => s.completedLessons[`${slug}/${l.slug}`]);
    addIf(allDone, badgeId);
  }
  return earned;
}

function bumpStreak(s: UserState): UserState {
  const t = today();
  if (s.streak.lastDay === t) return s;
  const next = { ...s, streak: { ...s.streak } };
  if (s.streak.lastDay === yesterday()) next.streak.count = s.streak.count + 1;
  else next.streak.count = 1;
  next.streak.lastDay = t;
  return next;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>(empty);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);

    // Hydrate from Supabase session (real auth) — overrides any cached guest user
    let active = true;
    const applySession = (sUser: { id: string; email?: string | null; user_metadata?: Record<string, unknown> } | null, method: AuthMethod) => {
      if (!active) return;
      if (!sUser) return;
      const meta = (sUser.user_metadata ?? {}) as Record<string, unknown>;
      const name = (meta.name as string) || (meta.full_name as string) || sUser.email?.split("@")[0] || "Player";
      setState(prev => ({
        ...prev,
        user: {
          id: sUser.id,
          name,
          email: sUser.email ?? undefined,
          method,
          level: prev.user?.level ?? "Beginner",
          createdAt: Date.now(),
        },
      }));
    };

    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s?.user) applySession(s.user, s.user.app_metadata?.provider === "google" ? "google" : "email");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setState(prev => ({ ...prev, user: prev.user?.method === "guest" ? prev.user : null }));
        return;
      }
      if (session?.user && (event === "SIGNED_IN" || event === "USER_UPDATED" || event === "TOKEN_REFRESHED")) {
        applySession(session.user, session.user.app_metadata?.provider === "google" ? "google" : "email");
      }
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (hydrated) save(state);
  }, [state, hydrated]);

  const apply = useCallback((mut: (s: UserState) => UserState) => {
    setState(prev => {
      const next = mut(prev);
      const earned = evaluateBadges(next);
      return earned.length ? { ...next, badges: [...next.badges, ...earned] } : next;
    });
  }, []);

  const ctx = useMemo<Ctx>(() => ({
    state,
    signInEmail: async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? { error: error.message } : {};
    },
    signUpEmail: async (email, password, name) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
          data: name ? { name } : undefined,
        },
      });
      return error ? { error: error.message } : {};
    },
    signInGoogle: async () => {
      const { lovable } = await import("@/integrations/lovable");
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) return { error: result.error.message };
      return {};
    },
    signInGuest: (name) => {
      apply(s => ({
        ...s,
        user: {
          id: crypto.randomUUID(),
          name: name?.trim() || "Guest Cricketer",
          method: "guest",
          level: s.user?.level ?? "Beginner",
          createdAt: Date.now(),
        },
      }));
    },
    signOut: async () => {
      await supabase.auth.signOut().catch(() => {});
      setState(empty);
    },
    setLevel: (level) => apply(s => s.user ? { ...s, user: { ...s.user, level } } : s),
    completeLesson: (moduleSlug, lessonSlug) => {
      const key = `${moduleSlug}/${lessonSlug}`;
      let xpGained = 0;
      let newBadges: BadgeId[] = [];
      setState(prev => {
        if (prev.completedLessons[key]) return prev;
        xpGained = 10;
        let next: UserState = {
          ...prev,
          completedLessons: { ...prev.completedLessons, [key]: Date.now() },
          xp: prev.xp + 10,
        };
        next = bumpStreak(next);
        const earned = evaluateBadges(next);
        newBadges = earned;
        return earned.length ? { ...next, badges: [...next.badges, ...earned] } : next;
      });
      return { xpGained, newBadges };
    },
    toggleBookmark: (moduleSlug, lessonSlug) => {
      const key = `${moduleSlug}/${lessonSlug}`;
      apply(s => ({
        ...s,
        bookmarks: s.bookmarks.includes(key) ? s.bookmarks.filter(k => k !== key) : [...s.bookmarks, key],
      }));
    },
    recordQuiz: (quizId, score, total) => {
      let xpGained = 0;
      let newBadges: BadgeId[] = [];
      setState(prev => {
        const prior = prev.passedQuizzes[quizId];
        const passed = score / total >= 0.6;
        const perAnswer = 5 * score;
        const passBonus = passed && (!prior || prior.score < score) ? 50 : 0;
        xpGained = perAnswer + passBonus;
        let next: UserState = {
          ...prev,
          xp: prev.xp + xpGained,
          passedQuizzes: passed
            ? { ...prev.passedQuizzes, [quizId]: { score, total, at: Date.now() } }
            : prev.passedQuizzes,
        };
        next = bumpStreak(next);
        const earned = evaluateBadges(next);
        newBadges = earned;
        return earned.length ? { ...next, badges: [...next.badges, ...earned] } : next;
      });
      return { xpGained, newBadges };
    },
    visitLab: (slug) => {
      let newBadges: BadgeId[] = [];
      setState(prev => {
        if (prev.labVisits.includes(slug)) return prev;
        const next: UserState = { ...prev, labVisits: [...prev.labVisits, slug] };
        const earned = evaluateBadges(next);
        newBadges = earned;
        return earned.length ? { ...next, badges: [...next.badges, ...earned] } : next;
      });
      return { newBadges };
    },
    isLessonComplete: (m, l) => !!state.completedLessons[`${m}/${l}`],
    isBookmarked: (m, l) => state.bookmarks.includes(`${m}/${l}`),
    moduleProgress: (slug) => {
      const mod = MODULE_BY_SLUG[slug];
      if (!mod) return { done: 0, total: 0, pct: 0 };
      const total = mod.lessons.length;
      const done = mod.lessons.filter(l => state.completedLessons[`${slug}/${l.slug}`]).length;
      return { done, total, pct: total ? done / total : 0 };
    },
  }), [state, apply]);

  return <UserCtx.Provider value={ctx}>{children}</UserCtx.Provider>;
}

export function useUser(): Ctx {
  const c = useContext(UserCtx);
  if (!c) throw new Error("useUser must be used within UserProvider");
  return c;
}
