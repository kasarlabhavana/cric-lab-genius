export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /progress

Sitemap: https://cricscience.com/sitemap-index.xml
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
