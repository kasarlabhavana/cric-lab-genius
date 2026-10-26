// Builds preview/ from dist/: rewrites root-relative links to relative .html paths
// so the site can be browsed from any sub-path (e.g. a hosted preview).
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, cpSync, rmSync, existsSync } from "node:fs";
import { join, relative, dirname, posix } from "node:path";
const src = "dist", out = "preview";
rmSync(out, { recursive: true, force: true });
cpSync(src, out, { recursive: true });
rmSync(join(out, "sw.js"), { force: true });
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(out);
const target = (path) => {
  const [p, hash] = path.split("#");
  let t;
  if (p === "/") t = "index.html";
  else if (existsSync(join(out, p)) && statSync(join(out, p)).isFile()) t = p.slice(1);
  else t = p.slice(1) + ".html";
  return { t, hash };
};
for (const f of files) {
  if (!/\.(html|css|js)$/.test(f)) continue;
  let s = readFileSync(f, "utf8");
  const fromDir = posix.dirname(relative(out, f).split("\\").join("/"));
  const rel = (path) => {
    const { t, hash } = target(path);
    let r = posix.relative(fromDir === "." ? "" : fromDir, t) || "index.html";
    return r + (hash !== undefined ? "#" + hash : "");
  };
  if (f.endsWith(".html")) {
    s = s.replace(/(href|src)="(\/(?!\/)[^"]*)"/g, (_, a, p) => `${a}="${rel(p)}"`);
  } else if (f.endsWith(".css")) {
    s = s.replace(/url\((\/_astro\/[^)]+)\)/g, (_, p) => `url(${posix.relative(fromDir, p.slice(1))})`);
  } else {
    s = s.replace(/"\/_astro\//g, '"./');
  }
  writeFileSync(f, s);
}
// Hosted previews reserve top-level names starting with "_"; move build assets.
import { renameSync } from "node:fs";
renameSync(join(out, "_astro"), join(out, "assets"));
for (const f of files.map((f) => f.replace(join(out, "_astro"), join(out, "assets")))) {
  if (!/\.(html|css|js)$/.test(f)) continue;
  writeFileSync(f, readFileSync(f, "utf8").replaceAll("_astro/", "assets/"));
}
console.log(`preview/ ready (${files.length} files)`);
