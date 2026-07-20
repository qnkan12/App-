import { db } from "@/db";
import { messages } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const data = body as { name?: unknown; email?: unknown; message?: unknown };
  const name = String(data?.name ?? "").trim();
  const email = String(data?.email ?? "").trim();
  const message = String(data?.message ?? "").trim();

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return Response.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  // Best-effort persistence — the UX never breaks even if the store is unavailable.
  try {
    await db.insert(messages).values({ name, email, message });
  } catch (err) {
    console.error("[contact] DB insert failed:", err);
  }

  return Response.json({ ok: true });
}
