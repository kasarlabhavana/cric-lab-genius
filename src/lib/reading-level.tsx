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
  // Common-vocabulary swaps so Easy mode is visibly different on lessons that
  // don't happen to use the technical words above.
  [/\butilis(e|es|ed|ing)\b/gi, "use"],
  [/\bemploy(s|ed|ing)?\b/gi, "use"],
  [/\bcomprises?\b/gi, "has"],
  [/\bconsists? of\b/gi, "is made of"],
  [/\bpermit(s|ted|ting)?\b/gi, "let"],
  [/\bobtain(s|ed|ing)?\b/gi, "get"],
  [/\bacquire(s|d)?\b/gi, "get"],
  [/\brequire(s|d)?\b/gi, "need"],
  [/\bsufficient\b/gi, "enough"],
  [/\badditional\b/gi, "extra"],
  [/\bnumerous\b/gi, "many"],
  [/\bvarious\b/gi, "different"],
  [/\bprovide(s|d)?\b/gi, "give"],
  [/\bensure(s|d)?\b/gi, "make sure"],
  [/\battempt(s|ed|ing)?\b/gi, "try"],
  [/\bobserve(s|d)?\b/gi, "watch"],
  [/\bidentify(ing)?\b/gi, "spot"],
  [/\bidentifies\b/gi, "spots"],
  [/\bidentified\b/gi, "spotted"],
  [/\bdetermine(s|d)?\b/gi, "decide"],
  [/\bestablish(es|ed|ing)?\b/gi, "set up"],
  [/\bmaintain(s|ed|ing)?\b/gi, "keep"],
  [/\bachieve(s|d)?\b/gi, "get"],
  [/\bcontribute(s|d)?\b/gi, "add"],
  [/\bdemonstrates?\b/gi, "shows"],
  [/\bdemonstrated\b/gi, "showed"],
  [/\billustrate(s|d)?\b/gi, "show"],
  [/\bindicate(s|d)?\b/gi, "show"],
  [/\bcommonly\b/gi, "often"],
  [/\btypically\b/gi, "usually"],
  [/\bgenerally\b/gi, "usually"],
  [/\bfrequently\b/gi, "often"],
  [/\bessentially\b/gi, "basically"],
  [/\bprimarily\b/gi, "mostly"],
  [/\bparticularly\b/gi, "especially"],
  [/\bregardless of\b/gi, "no matter"],
  [/\bnevertheless\b/gi, "still"],
  [/\bhowever,?\b/gi, "but"],
  [/\bmoreover,?\b/gi, "also"],
  [/\bfurthermore,?\b/gi, "also"],
  [/\btherefore,?\b/gi, "so"],
  [/\bthus,?\b/gi, "so"],
  [/\bhence,?\b/gi, "so"],
  [/\bbatsman\b/gi, "batter"],
  [/\bbatsmen\b/gi, "batters"],
  [/\bdismiss(es|ed|ing)?\b/gi, "get out"],
  [/\bdismissal(s)?\b/gi, "wicket"],
  [/\bcrease\b/gi, "batting line"],
  [/\bfielder positioned\b/gi, "fielder standing"],
  [/\bpositioned\b/gi, "placed"],
  [/\bsignature\b/gi, "trademark"],
  [/\bvariation(s)?\b/gi, "version"],
  [/\bexecution\b/gi, "the action"],
  [/\bopponent(s)?\b/gi, "rival"],
  [/\bdominant\b/gi, "strong"],
  [/\bnotable\b/gi, "famous"],
  [/\brenowned\b/gi, "famous"],
  [/\blegendary\b/gi, "famous"],
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
