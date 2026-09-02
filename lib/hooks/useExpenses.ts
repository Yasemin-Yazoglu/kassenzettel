import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import type { Expense } from '@/lib/types'

interface Options {
    enabled?: boolean
}

export function useExpenses({ enabled = true }: Options = {}) {
    return useQuery<Expense[]>({
        queryKey: ['expenses'],
        enabled,
        queryFn: async () => {
        const { data, error } = await supabase
            .from('expense')
            .select('*')
            .order('spend_at', { ascending: false })
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
        },
    })
}