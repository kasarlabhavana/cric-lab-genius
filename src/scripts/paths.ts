// Resolve site paths so links work both on the live site (clean URLs)
// and in static previews where pages are served as .html files.
function rootHref(): string {
  const link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
  return link ? link.href.replace(/manifest\.webmanifest$/, "") : location.origin + "/";
}

const htmlMode = () => /\.html$/.test(location.pathname);

export function asset(path: string): string {
  return rootHref() + path.replace(/^\//, "");
}

export function page(path: string): string {
  const [p, hash] = path.split("#");
  let clean = p.replace(/^\//, "");
  if (htmlMode()) clean = clean === "" ? "index.html" : clean + ".html";
  return rootHref() + clean + (hash ? "#" + hash : "");
}
