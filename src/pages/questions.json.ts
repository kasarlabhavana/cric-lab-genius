import { allQuestions } from "../lib/content";

export async function GET() {
  return new Response(JSON.stringify(await allQuestions()), { headers: { "Content-Type": "application/json" } });
}
