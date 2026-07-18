import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import type { Expense } from '@/lib/types'

export function useExpenses() {
    return useQuery<Expense[]>({
        queryKey: ['expenses'],
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