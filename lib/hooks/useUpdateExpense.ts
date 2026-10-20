import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import type { ExpenseDB, NewExpenseDB } from '@/lib/types/expense/ExpenseDB'

type UpdateExpenseInput = { id: string } & Partial<NewExpenseDB>

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
        return data as ExpenseDB
        },

        onMutate: async ({ id, ...changes }) => {
            await queryClient.cancelQueries({ queryKey: ['expenses'] })
            const previous = queryClient.getQueryData<ExpenseDB[]>(['expenses'])

            queryClient.setQueryData<ExpenseDB[]>(['expenses'], (old = []) =>
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