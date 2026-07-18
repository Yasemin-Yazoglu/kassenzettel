import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import type { Expense, NewExpense } from '@/lib/types'

export function useAddExpense() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (input: NewExpense) => {
        const { data, error } = await supabase
            .from('expense')
            .insert(input)
            .select()
            .single()

        if (error) throw error
            return data as Expense
        },

        onMutate: async (input) => {
            await queryClient.cancelQueries({ queryKey: ['expenses'] })
            const previous = queryClient.getQueryData<Expense[]>(['expenses'])

            const optimisticExpense: Expense = {
                id: crypto.randomUUID(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                user_id: '',
                ...input,
            }

            queryClient.setQueryData<Expense[]>(['expenses'], (old = []) =>
                [optimisticExpense, ...old].sort((a, b) => b.spend_at.localeCompare(a.spend_at))
            )

            return { previous }
        },

        onError: (_err, _input, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['expenses'], context.previous)
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] })
        },
    })
}