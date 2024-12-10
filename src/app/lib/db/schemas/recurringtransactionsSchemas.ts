import { z } from 'zod';


// RECURRING TRANSACTIONS SCHEMAS

// Schema to create a recurring transaction
export const createRecurringTransactionSchema = z.object({
    user_id: z.number(),
    account_id: z.number(),
    amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive(),
    transaction_type: z.enum(["Expense", "Income"]),
    expense_category: z.enum(["health", "food", "education", "housing", "transport", "entertaiment", "utilities", "other"]).optional(),
    income_category: z.enum(['salary', 'extra work', 'investents', 'gift', 'other']).optional(),
    description: z.string().optional(),
    start_date: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(),
    end_date: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date().optional(),
    frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    execution_day: z.union([z.number().min(1).max(31), z.null()]).optional(),
    day_of_week: z.union([z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]), z.null()]).optional(),
    execution_date: z.union([z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(), z.null()]).optional(),
});

// CreateRecurringTransaction type infered from zod createRecurringTransactionSchema
export type CreateRecurringTransaction = z.infer<typeof createRecurringTransactionSchema>;


// Schema to update a recurring transaction
export const updateRecurringTransactionSchema = z.object({
    account_id: z.number().optional(),
    amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive().optional(),
    transaction_type: z.enum(["Expense", "Income"]).optional(),
    expense_category: z.enum(["health", "food", "education", "housing", "transport", "entertaiment", "utilities", "other"]).optional(),
    income_category: z.enum(['salary', 'extra work', 'investents', 'gift', 'other']).optional(),
    description: z.string().optional(),
    start_date: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date().optional(),
    end_date: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date().optional(),
    frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
    execution_day: z.union([z.number().min(1).max(31), z.null()]).optional(),
    day_of_week: z.union([z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]), z.null()]).optional(),
    execution_date: z.union([z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(), z.null()]).optional(),
});

// UpdateRecurringTransaction type infered from zod updateRecurringTransactionSchema
export type UpdateRecurringTransaction = z.infer<typeof updateRecurringTransactionSchema>;


// Schema to get recurring transactions 
export const getRecurringTransactionsSchema = z.object({
    recurring_id: z.number(),
    user_id: z.number(),
    account_id: z.number(),
    amount: z.number().positive(),
    transaction_type: z.enum(["Expense", "Income"]),
    income_category: z.union([z.enum(['salary', 'extra work', 'investents', 'gift', 'other']), z.null()]),
    expense_category: z.union([z.enum(["health", "food", "education", "housing", "transport", "entertaiment", "utilities", "other"]), z.null()]),
    description: z.string().optional(),
    start_date: z.string().date(),
    end_date: z.string().date().optional(),
    frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    execution_day: z.union([z.number().min(1).max(31), z.null()]).optional(),
    day_of_week: z.union([z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]), z.null()]).optional(),
    execution_date: z.union([z.string().date(), z.null()]).optional(),
    created_at: z.date(),
})