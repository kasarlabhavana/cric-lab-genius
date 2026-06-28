import { Fragment, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { GLOSSARY_REGEX, lookupGlossary } from "@/lib/glossary";

type Part = { type: "text"; value: string } | { type: "term"; value: string; def: string };

function splitWithGlossary(input: string): Part[] {
  const parts: Part[] = [];
  let last = 0;
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

function TermButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="underline decoration-dotted decoration-[color:var(--brand-orange)]/70 underline-offset-2 hover:decoration-solid focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded px-0.5 py-0.5 -my-0.5 touch-manipulation"
    >
      {label}
    </button>
  );
}

function GlossaryTerm({ term, def }: { term: string; def: string }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <TermButton label={term} onClick={() => setOpen(true)} />
        <DrawerContent className="pb-[max(env(safe-area-inset-bottom),1rem)]">
          <div className="mx-auto w-full max-w-lg px-5 pt-2 pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                  Cricket term
                </div>
                <div className="mt-0.5 font-display text-xl font-bold text-primary break-words">
                  {term}
                </div>
              </div>
              <DrawerClose asChild>
                <button
                  type="button"
                  aria-label="Close definition"
                  className="-mr-2 -mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="size-5" />
                </button>
              </DrawerClose>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">{def}</p>
            <DrawerClose asChild>
              <button
                type="button"
                className="mt-5 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Got it
              </button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TermButton label={term} />
      </PopoverTrigger>
      <PopoverContent className="w-72 text-sm">
        <div className="flex items-start justify-between gap-2">
          <div className="font-display text-sm font-semibold text-primary break-words">{term}</div>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">{def}</p>
      </PopoverContent>
    </Popover>
  );
}

export function GlossaryText({ text, className }: { text: string; className?: string }) {
  const parts = useMemo(() => splitWithGlossary(text), [text]);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.type === "text" ? (
          <Fragment key={i}>{p.value}</Fragment>
        ) : (
          <GlossaryTerm key={i} term={p.value} def={p.def} />
        ),
      )}
    </span>
  );
}
