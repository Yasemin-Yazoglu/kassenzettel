import { createClient } from "@supabase/supabase-js";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Die neuen API-Keys liegen als JSON-Objekt in der Umgebung, der Schlüssel heißt "default".
function defaultKey(envName: string): string {
  const raw = Deno.env.get(envName);
  if (!raw) throw new Error(`Missing ${envName}`);
  const key = JSON.parse(raw)["default"];
  if (!key) throw new Error(`No default key in ${envName}`);
  return key;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "unauthorized" }, 401);

  try {
    const url = Deno.env.get("SUPABASE_URL")!;

    // Den Aufrufer immer aus seinem eigenen Token bestimmen, nie aus Daten im Request-Body.
    const userClient = createClient(url, defaultKey("SUPABASE_PUBLISHABLE_KEYS"));
    const { data, error } = await userClient.auth.getUser(token);
    if (error || !data.user) return json({ error: "unauthorized" }, 401);

    const admin = createClient(url, defaultKey("SUPABASE_SECRET_KEYS"), {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { error: deleteError } = await admin.auth.admin.deleteUser(data.user.id);
    if (deleteError) {
      console.error("deleteUser failed:", deleteError.message);
      return json({ error: "delete_failed" }, 500);
    }

    return json({ success: true });
  } catch (err) {
    console.error("delete-account failed:", err);
    return json({ error: "internal_error" }, 500);
  }
});