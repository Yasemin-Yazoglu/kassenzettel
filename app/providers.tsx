'use client'

import type { User } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@/lib/providers/UserProvider';
import { useState } from 'react';

export function Providers({ children, user }: { children: React.ReactNode; user: User | null }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <UserProvider user={user}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </UserProvider>
    );
}