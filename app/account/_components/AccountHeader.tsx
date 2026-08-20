"use client";

import type { User } from "@supabase/supabase-js";
import Avatar from "@/components/ui/Avatar";

interface Props {
    user: User;
}

export default function AccountHeader({ user }: Props) {
    const email = user.email ?? "";
    const fullName: string | undefined = user.user_metadata?.full_name;
    const avatarUrl: string | undefined = user.user_metadata?.avatar_url;

    const primaryText = fullName ?? email;

    return (
        <div className="flex items-center gap-4">
            <Avatar src={avatarUrl} fallbackText={primaryText} size="lg" />

            <div className="min-w-0">
                <h2 className="text-white text-xl font-semibold truncate">{primaryText}</h2>
                {fullName && (
                    <p className="text-sm text-slate-400 truncate">{email}</p>
                )}
            </div>
        </div>
    );
}