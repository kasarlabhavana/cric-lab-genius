// Run after `npm run build`: checks quiz data and every internal link in dist/.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
let problems = 0;
const fail = (m) => { problems++; console.error("✗ " + m); };

const qs = JSON.parse(readFileSync(join(dist, "questions.json"), "utf8"));
for (const q of qs) {
  if (q.answer < 0 || q.answer >= q.options.length) fail(`${q.id}: answer index ${q.answer} out of range`);
  if (new Set(q.options).size !== q.options.length) fail(`${q.id}: duplicate options`);
}

const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(dist);
const resolve = (href) => {
  const path = href.split("#")[0].split("?")[0];
  if (path === "/" ) return existsSync(join(dist, "index.html"));
  return existsSync(join(dist, path)) || existsSync(join(dist, path + ".html"));
};
for (const f of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(f, "utf8");
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    if (m[1].startsWith("//")) continue;
    if (!resolve(m[1])) fail(`${f}: broken link ${m[1]}`);
  }
}
console.log(problems ? `${problems} problem(s)` : `OK — ${qs.length} questions, ${files.filter((f) => f.endsWith(".html")).length} pages, all internal links resolve`);
process.exit(problems ? 1 : 0);
