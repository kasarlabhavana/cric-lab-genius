import { useState } from "react";
import { Share2, Link as LinkIcon, Check, X } from "lucide-react";
import { toast } from "sonner";

type Props = {
  title: string;
  text?: string;
  url?: string;
  className?: string;
};

export function ShareButton({ title, text, url, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text ?? title;

  const tryNative = async () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title, text: shareText, url: shareUrl });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  const onClick = async () => {
    const ok = await tryNative();
    if (!ok) setOpen(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const encoded = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${shareText} — ${shareUrl}`);
  const encodedTitle = encodeURIComponent(title);

  const targets: Array<{ label: string; href: string; color: string; icon: React.ReactNode }> = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}`,
      color: "bg-[#25D366] text-white",
      icon: <WhatsAppIcon />,
    },
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
      color: "bg-black text-white",
      icon: <XIcon />,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      color: "bg-[#1877F2] text-white",
      icon: <FacebookIcon />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      color: "bg-[#0A66C2] text-white",
      icon: <LinkedInIcon />,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encoded}&text=${encodedTitle}`,
      color: "bg-[#229ED9] text-white",
      icon: <TelegramIcon />,
    },
    {
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encoded}&title=${encodedTitle}`,
      color: "bg-[#FF4500] text-white",
      icon: <RedditIcon />,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
      color: "bg-muted text-foreground",
      icon: <EmailIcon />,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:bg-muted ${className}`}
        aria-label="Share lesson"
      >
        <Share2 className="size-3.5" />
        Share
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-border bg-card p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold text-primary">Share this lesson</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{title}</p>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {targets.map((t) => (
                <a
                  key={t.label}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 text-[11px] font-medium text-foreground/80 hover:text-foreground"
                >
                  <span className={`inline-flex size-11 items-center justify-center rounded-full ${t.color}`}>
                    {t.icon}
                  </span>
                  {t.label}
                </a>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-border bg-surface p-2">
              <LinkIcon className="ml-1 size-4 text-muted-foreground shrink-0" />
              <input
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent text-xs text-foreground/80 outline-none truncate"
              />
              <button
                onClick={copy}
                className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {copied ? <Check className="size-3.5" /> : <LinkIcon className="size-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const svgCls = "size-5";
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className={svgCls} fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 3.2 17l-1.2 4.4 4.5-1.2A11 11 0 1 0 20.5 3.5Zm-8.5 18a9 9 0 0 1-4.6-1.3l-.3-.2-2.7.7.7-2.6-.2-.3A9 9 0 1 1 12 21.5Zm5.2-6.7c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2s-.8.9-1 1.1c-.2.2-.4.2-.7.1a7.4 7.4 0 0 1-3.6-3.1c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.3c0 1.4 1 2.8 1.2 3 .1.2 2.1 3.2 5 4.4 1.8.7 2.5.8 3.4.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className={svgCls} fill="currentColor" aria-hidden>
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.828l-4.77-6.24L4.8 22H2l7-8L2 2h6.914l4.32 5.72L18.244 2Zm-1.196 18h1.653L7.03 4H5.29l11.758 16Z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className={svgCls} fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.7V14h2.7v8h3.1Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className={svgCls} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9.5h4V21H3V9.5Zm7 0h3.8v1.6h.1c.5-1 1.9-2 3.9-2 4.1 0 4.9 2.7 4.9 6.2V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z" />
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className={svgCls} fill="currentColor" aria-hidden>
      <path d="M9.4 15.3 9.2 19c.4 0 .5-.2.8-.4l1.9-1.8 4 2.9c.7.4 1.3.2 1.5-.7l2.7-12.7c.3-1.1-.4-1.6-1.1-1.3L3.5 10.4c-1.1.4-1.1 1 0 1.3l4.2 1.3 9.8-6.1c.4-.3.8-.1.5.2L9.4 15.3Z" />
    </svg>
  );
}
function RedditIcon() {
  return (
    <svg viewBox="0 0 24 24" className={svgCls} fill="currentColor" aria-hidden>
      <path d="M22 12a2.2 2.2 0 0 0-3.7-1.6 10.7 10.7 0 0 0-5.5-1.7l.9-4.2 2.9.6a1.6 1.6 0 1 0 .2-1l-3.4-.7c-.2 0-.4.1-.5.3l-1 4.9a10.7 10.7 0 0 0-5.6 1.7A2.2 2.2 0 1 0 3.4 14a4.4 4.4 0 0 0 0 .6c0 3.3 3.8 6 8.6 6s8.6-2.7 8.6-6a4.4 4.4 0 0 0 0-.6A2.2 2.2 0 0 0 22 12ZM8 13.5a1.4 1.4 0 1 1 1.4 1.4A1.4 1.4 0 0 1 8 13.5Zm7.9 3.7a5.7 5.7 0 0 1-3.9 1.2 5.7 5.7 0 0 1-3.9-1.2.4.4 0 1 1 .5-.6 4.9 4.9 0 0 0 3.4 1 4.9 4.9 0 0 0 3.4-1 .4.4 0 1 1 .5.6Zm-.3-2.3a1.4 1.4 0 1 1 1.4-1.4 1.4 1.4 0 0 1-1.4 1.4Z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className={svgCls} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
