export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const data = body as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
  };

  const name = String(data?.name ?? "").trim();
  const email = String(data?.email ?? "").trim();
  const message = String(data?.message ?? "").trim();

  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 10
  ) {
    return Response.json(
      { ok: false, error: "Invalid input" },
      { status: 400 }
    );
  }

  // No database. Just return success.
  console.log("New contact form submission:", {
    name,
    email,
    message,
  });

  return Response.json({ ok: true });
}
