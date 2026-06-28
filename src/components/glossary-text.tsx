import { Fragment, useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GLOSSARY_REGEX, lookupGlossary } from "@/lib/glossary";

type Part = { type: "text"; value: string } | { type: "term"; value: string; def: string };

function splitWithGlossary(input: string): Part[] {
  const parts: Part[] = [];
  let last = 0;
  // Reset stateful regex
  const re = new RegExp(GLOSSARY_REGEX.source, GLOSSARY_REGEX.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) parts.push({ type: "text", value: input.slice(last, m.index) });
    const def = lookupGlossary(m[0]) ?? "";
    parts.push({ type: "term", value: m[0], def });
    last = m.index + m[0].length;
  }
  if (last < input.length) parts.push({ type: "text", value: input.slice(last) });
  return parts;
}

export function GlossaryText({ text, className }: { text: string; className?: string }) {
  const parts = useMemo(() => splitWithGlossary(text), [text]);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.type === "text" ? (
          <Fragment key={i}>{p.value}</Fragment>
        ) : (
          <Popover key={i}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="underline decoration-dotted decoration-[color:var(--brand-orange)]/70 underline-offset-2 hover:decoration-solid focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
              >
                {p.value}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 text-sm">
              <div className="font-display text-sm font-semibold text-primary">{p.value}</div>
              <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">{p.def}</p>
            </PopoverContent>
          </Popover>
        ),
      )}
    </span>
  );
}
