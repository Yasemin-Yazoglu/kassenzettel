export type Expense = {
    id: string
    created_at: string
    updated_at: string
    store: string
    amount: number
    user_id: string
    spend_at: string
}
  
export type NewExpense = {
    store: string
    amount: number
    spend_at: string
}