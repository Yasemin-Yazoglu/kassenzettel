import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import type { Expense } from '@/lib/types'

type UpdateExpenseInput = {
    id: string
    store?: string
    amount?: number
    spend_at?: string
}

export function useUpdateExpense() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, ...changes }: UpdateExpenseInput) => {
        const { data, error } = await supabase
            .from('expense')
            .update(changes)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data as Expense
        },

        onMutate: async ({ id, ...changes }) => {
            await queryClient.cancelQueries({ queryKey: ['expenses'] })
            const previous = queryClient.getQueryData<Expense[]>(['expenses'])

            queryClient.setQueryData<Expense[]>(['expenses'], (old = []) =>
                old.map((expense) =>
                expense.id === id ? { ...expense, ...changes } : expense
                )
            )

            return { previous }
        },

        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['expenses'], context.previous)
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] })
        },
    })
}