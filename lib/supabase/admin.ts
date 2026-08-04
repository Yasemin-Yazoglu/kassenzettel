import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Uses the secret key — bypasses RLS entirely. Server-only, never import this in client code.
export function createAdminClient() {
    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!,
        {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
        }
    );
}