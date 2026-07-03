import { useState } from "react";
import { Play } from "lucide-react";

function extractId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0] || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/watch")) return u.searchParams.get("v");
      const parts = u.pathname.split("/").filter(Boolean);
      const i = parts.findIndex((p) => ["embed", "shorts", "live", "v"].includes(p));
      if (i >= 0 && parts[i + 1]) return parts[i + 1];
    }
  } catch {
    const m = url.match(/[a-zA-Z0-9_-]{11}/);
    if (m) return m[0];
  }
  return null;
}

export function YouTubeEmbed({ url, title }: { url: string; title?: string }) {
  const id = extractId(url);
  const [play, setPlay] = useState(false);
  if (!id) return null;
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-black shadow-sm">
      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play ${title || "video"}`}
          >
            <img
              src={thumb}
              alt={title || "Video thumbnail"}
              loading="lazy"
              className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition group-hover:scale-110">
                <Play className="size-7 fill-white" />
              </span>
            </span>
          </button>
        )}
      </div>
      {title && (
        <div className="px-3 py-2 text-xs text-white/80 bg-black">{title}</div>
      )}
    </div>
  );
}
