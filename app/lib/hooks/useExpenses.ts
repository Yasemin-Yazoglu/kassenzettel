import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/app/lib/supabase/client'
import type { Expense } from '@/app/lib/types'

export function useExpenses() {
    return useQuery<Expense[]>({
        queryKey: ['expenses'],
        queryFn: async () => {
        const { data, error } = await supabase
            .from('expense')
            .select('*')
            .order('spend_at', { ascending: false })

        if (error) throw error
        return data
        },
    })
}