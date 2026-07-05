import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/app/lib/supabase/client'
import type { Expense } from '@/app/lib/types'

export function useDeleteExpense() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('expense')
                .delete()
                .eq('id', id)

            if (error) throw error
            return id
        },

        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ['expenses'] })
            const previous = queryClient.getQueryData<Expense[]>(['expenses'])

            queryClient.setQueryData<Expense[]>(['expenses'], (old = []) =>
                old.filter((expense) => expense.id !== id)
            )

            return { previous }
        },

        onError: (_err, _id, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['expenses'], context.previous)
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] })
        },
    })
}