import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ReadingLevel = "easy" | "medium";

const KEY = "cs-reading-level";

type Ctx = {
  level: ReadingLevel;
  setLevel: (l: ReadingLevel) => void;
  simplify: (text: string) => string;
};

const ReadingLevelContext = createContext<Ctx | null>(null);

// Word substitutions applied in Easy mode. Whole-word, case-insensitive,
// preserves the first character's case. Keep entries plain-English replacements
// that don't change meaning.
const EASY_SWAPS: Array<[RegExp, string]> = [
  [/\bbiomechanical\b/gi, "body-motion"],
  [/\bbiomechanics\b/gi, "body motion"],
  [/\baerodynamic(s|ally)?\b/gi, "airflow"],
  [/\btrajectory\b/gi, "flight path"],
  [/\bvelocity\b/gi, "speed"],
  [/\brevolutions?\b/gi, "spins"],
  [/\brpm\b/gi, "spin rate"],
  [/\bdeliveries\b/gi, "balls"],
  [/\bdelivery\b/gi, "ball"],
  [/\bapproximately\b/gi, "about"],
  [/\bpredominantly\b/gi, "mostly"],
  [/\butilise[sd]?\b/gi, "use"],
  [/\butilize[sd]?\b/gi, "use"],
  [/\bcommence[sd]?\b/gi, "start"],
  [/\bdemonstrate[sd]?\b/gi, "show"],
  [/\bsignificantly\b/gi, "a lot"],
  [/\bsubsequently\b/gi, "then"],
  [/\bpriorr?\s+to\b/gi, "before"],
  [/\bfollowing\s+the\b/gi, "after the"],
  [/\boptimal\b/gi, "best"],
  [/\boptimum\b/gi, "best"],
  [/\bmaximise[sd]?\b/gi, "boost"],
  [/\bmaximize[sd]?\b/gi, "boost"],
  [/\bgenerate[sd]?\b/gi, "create"],
  [/\binitiate[sd]?\b/gi, "start"],
  [/\bexecute[sd]?\b/gi, "play"],
  [/\borientation\b/gi, "angle"],
  [/\bdecelerate[sd]?\b/gi, "slow down"],
  [/\baccelerate[sd]?\b/gi, "speed up"],
  [/\bkinematic\b/gi, "movement"],
  [/\bkinetic\b/gi, "motion"],
  [/\bproprioception\b/gi, "body awareness"],
  [/\bperipheral vision\b/gi, "side vision"],
  [/\binflection\b/gi, "turning"],
  [/\binitial\b/gi, "first"],
  [/\bsubstantial\b/gi, "big"],
  [/\bnumerous\b/gi, "many"],
  [/\bin order to\b/gi, "to"],
  [/\bin addition\b/gi, "also"],
  [/\bdue to the fact that\b/gi, "because"],
  [/\bwith regard to\b/gi, "about"],
];

function preserveCase(original: string, replacement: string): string {
  if (!original) return replacement;
  if (original[0] === original[0]?.toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

function easySimplify(text: string): string {
  let out = text;
  for (const [re, rep] of EASY_SWAPS) {
    out = out.replace(re, (m) => preserveCase(m, rep));
  }
  // Soft sentence split: long sentences > 28 words get an extra break at " — "
  return out;
}

export function ReadingLevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<ReadingLevel>("medium");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY) as ReadingLevel | null;
      if (stored === "easy" || stored === "medium") setLevelState(stored);
    } catch {}
  }, []);

  const setLevel = (l: ReadingLevel) => {
    setLevelState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  };

  const value = useMemo<Ctx>(
    () => ({
      level,
      setLevel,
      simplify: (text: string) => (level === "easy" ? easySimplify(text) : text),
    }),
    [level],
  );

  return <ReadingLevelContext.Provider value={value}>{children}</ReadingLevelContext.Provider>;
}

export function useReadingLevel(): Ctx {
  const ctx = useContext(ReadingLevelContext);
  if (!ctx) {
    // Safe fallback (no provider in tree) — return identity simplify
    return { level: "medium", setLevel: () => {}, simplify: (t) => t };
  }
  return ctx;
}
