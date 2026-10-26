// Progress kept in this browser only. Every access is guarded: storage can be
// unavailable (private mode, blocked site data), and the site must still work.

export type AnswerRecord = {
  correct: boolean;   // last answer correct?
  ever: boolean;      // ever answered correctly
  box: number;        // spaced-repetition box (0 = due soon)
  due: number | null; // epoch ms when due for review; null = not scheduled
};

export type State = {
  lessons: Record<string, string>;      // lessonId -> ISO date completed
  answers: Record<string, AnswerRecord>; // questionId -> record
  daily: { date: string; qid: string; correct: boolean } | null;
  streak: { last: string; count: number };
};

const KEY = "cricscience:v1";
const DAY = 86_400_000;
const INTERVALS = [1, 3, 7, 21]; // days

const empty = (): State => ({ lessons: {}, answers: {}, daily: null, streak: { last: "", count: 0 } });
let memory: State = empty();

export function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) memory = { ...empty(), ...JSON.parse(raw) };
  } catch {
    /* storage unavailable: keep in-memory state */
  }
  return memory;
}

function save(s: State) {
  memory = s;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("cs:progress"));
}

export const today = () => new Date().toISOString().slice(0, 10);

export function completeLesson(id: string) {
  const s = load();
  if (!s.lessons[id]) s.lessons[id] = today();
  save(s);
}

/** Record an answer and schedule review. Returns the updated record. */
export function recordAnswer(qid: string, correct: boolean, fromReview = false): AnswerRecord {
  const s = load();
  const prev = s.answers[qid];
  let rec: AnswerRecord;
  if (!correct) {
    rec = { correct: false, ever: prev?.ever ?? false, box: 0, due: Date.now() + INTERVALS[0] * DAY };
  } else if (fromReview && prev) {
    const box = prev.box + 1;
    rec = { correct: true, ever: true, box, due: box >= INTERVALS.length ? null : Date.now() + INTERVALS[box] * DAY };
  } else {
    // Right first time: no review needed unless it was previously missed.
    rec = { correct: true, ever: true, box: prev?.box ?? 0, due: prev?.due ? Date.now() + INTERVALS[Math.min((prev.box ?? 0) + 1, INTERVALS.length - 1)] * DAY : null };
  }
  s.answers[qid] = rec;
  save(s);
  return rec;
}

export function dueQuestions(now = Date.now()): string[] {
  const s = load();
  return Object.entries(s.answers)
    .filter(([, r]) => r.due !== null && r.due <= now)
    .map(([id]) => id);
}

export function recordDaily(qid: string, correct: boolean) {
  const s = load();
  const d = today();
  if (s.daily?.date === d) return;
  s.daily = { date: d, qid, correct };
  const yesterday = new Date(Date.now() - DAY).toISOString().slice(0, 10);
  s.streak = { last: d, count: s.streak.last === yesterday ? s.streak.count + 1 : 1 };
  save(s);
}

export function currentStreak(): number {
  const s = load();
  const yesterday = new Date(Date.now() - DAY).toISOString().slice(0, 10);
  return s.streak.last === today() || s.streak.last === yesterday ? s.streak.count : 0;
}

export function resetAll() {
  save(empty());
}
