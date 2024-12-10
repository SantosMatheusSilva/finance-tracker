import { z } from 'zod';


// TRANSACTIONS SCHEMAS 

// Schema to create a transaction
export const createTransactionSchema = z.object({
    user_id: z.number(),
    account_id: z.number(),
    amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive(),
    transaction_type: z.enum(["Expense", "Income"]),
    expense_category: z.enum(["health", "food", "education", "housing", "transport", "entertaiment", "utilities", "other"]).optional(),
    income_category: z.enum(['salary', 'extra work', 'investents', 'gift', 'other']).optional(),
    description: z.string().optional(),
    transaction_date: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(),
})

// CreateTransaction type infered from zod createTransactionSchema
export type CreateTransaction = z.infer<typeof createTransactionSchema>


// Schema to update a transaction
export const updateTransactionSchema = z.object({
    account_id: z.number().optional(),
    amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive().optional(),
    transaction_type: z.enum(["Expense", "Income"]).optional(),
    expense_category: z.enum(["health", "food", "education", "housing", "transport", "entertaiment", "utilities", "other"]).optional(),
    income_category: z.enum(['salary', 'extra work', 'investents', 'gift', 'other']).optional(),
    description: z.string().optional(),
    transaction_date: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date().optional(),
})

// UpdateTransaction type infered from zod updateTransactionSchema
export type UpdateTransaction = z.infer<typeof updateTransactionSchema>;


// Schema to create an expense transaction 
export const createExpenseTransactionSchema = z.object({
    user_id: z.number(),
    account_id: z.number(),
    amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive(),
    transaction_type: z.enum(["Expense"]),
    expense_category: z.enum(["health", "food", "education", "housing", "transport", "entertaiment", "utilities", "other"]),
    income_category: z.never(),
    description: z.string().optional(),
    transaction_date: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(),
}); 

// CreateExpenseTransaction type infered from zod createExpenseTransactionSchema
export type CreateExpenseTransaction = z.infer<typeof createExpenseTransactionSchema>


// Schema to create an income transaction
export const createIncomeTransactionSchema = z.object({
    user_id: z.number(),
    account_id: z.number(),
    amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive(),
    transaction_type: z.enum(["Income"]),
    income_category: z.enum(['salary', 'extra work', 'investents', 'gift', 'other']),
    expense_category: z.never(),
    description: z.string().optional(),
    transaction_date: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(),
});

// CreateIncomeTransaction type infered from zod createIncomeTransactionSchema
export type CreateIncomeTransaction = z.infer<typeof createIncomeTransactionSchema>


// Schema to get transactions 
export const transactionsSchema = z.object({
    transaction_id: z.number(),
    user_id: z.number(),
    account_id: z.number(),
    amount: z.number().positive(),
    transaction_type: z.enum(["Expense", "Income"]),
    income_category: z.union([z.enum(['salary', 'extra work', 'investents', 'gift', 'other']), z.null()]),
    expense_category: z.union([z.enum(["health", "food", "education", "housing", "transport", "entertaiment", "utilities", "other"]), z.null()]),
    description: z.string().nullable(),
    transaction_date: z.date(),
    created_at: z.date(),
})

// Transactions type infered from zod transactionSchema
export type Transaction = z.infer<typeof transactionsSchema>;