import { BookOpenCheck, Sparkles } from "lucide-react";
import { useReadingLevel, type ReadingLevel } from "@/lib/reading-level";

export function ReadingLevelToggle({ className = "" }: { className?: string }) {
  const { level, setLevel } = useReadingLevel();
  const opts: Array<{ id: ReadingLevel; label: string; hint: string }> = [
    { id: "easy", label: "Easy", hint: "Plain words" },
    { id: "medium", label: "Medium", hint: "Standard" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Reading level"
      className={`inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 ${className}`}
    >
      <span className="hidden sm:inline-flex items-center gap-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <BookOpenCheck className="size-3.5" /> Reading
      </span>
      {opts.map((o) => {
        const active = level === o.id;
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={active}
            onClick={() => setLevel(o.id)}
            title={o.hint}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {o.id === "easy" && <Sparkles className="size-3" />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
