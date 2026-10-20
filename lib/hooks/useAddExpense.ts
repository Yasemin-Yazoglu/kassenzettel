import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import type { ExpenseDB, NewExpenseDB } from '@/lib/types/expense/ExpenseDB'

export function useAddExpense() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (input: NewExpenseDB) => {
        const { data, error } = await supabase
            .from('expense')
            .insert(input)
            .select()
            .single()

        if (error) throw error
            return data as ExpenseDB
        },

        onMutate: async (input) => {
            await queryClient.cancelQueries({ queryKey: ['expenses'] })
            const previous = queryClient.getQueryData<ExpenseDB[]>(['expenses'])

            const optimisticExpense: ExpenseDB = {
                id: crypto.randomUUID(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                user_id: '',
                ...input,
            }

            queryClient.setQueryData<ExpenseDB[]>(['expenses'], (old = []) =>
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