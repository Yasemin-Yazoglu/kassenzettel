import { User } from "@supabase/supabase-js";

export function getName(user: User | null | undefined): string | null {
    if (!user) {
        return null;
    }

    const metadata = user.user_metadata ?? {};

    const name =
        metadata.full_name ??
        metadata.name ??
        metadata.user_name ??
        metadata.preferred_username;

    if (typeof name === "string" && name.trim().length > 0) {
        return name.trim();
    }

    if (user.email) {
        return user.email.split("@")[0];
    }

    return null;
}