import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import type { ExpenseDB } from '@/lib/types/expense/ExpenseDB'

interface Options {
    enabled?: boolean
}

export function useExpenses({ enabled = true }: Options = {}) {
    return useQuery<ExpenseDB[]>({
        queryKey: ['expenses'],
        enabled,
        queryFn: async () => {
        const { data, error } = await supabase
            .from('expense')
            .select('id, created_at, updated_at, store, amount_cents, user_id, spend_at')
            .order('spend_at', { ascending: false })
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
        },
    })
}