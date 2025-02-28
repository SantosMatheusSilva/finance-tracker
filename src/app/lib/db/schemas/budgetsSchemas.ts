import { z } from 'zod';


// BUDGETS SCHEMAS 

// Schema to create a budget
export const createBudgetSchema = z.object({
    user_id: z.number(),
    expense_category: z.enum(["health", "food", "education", "housing", "transport", "entertaiment", "utilities", "other"], {
        invalid_type_error: 'Please select an Expense Category.'
    }),
    income_category: z.never(),
    budget_amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive().gt(0),
    period_start: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(),
    period_end: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(),
})

// CreateBudget type infered from zod createBudgetSchema
export type CreateBudget = z.infer<typeof createBudgetSchema>;


// Schema to update a budget
export const updateBudgetSchema = z.object({
    expense_category: z.enum(["health", "food", "education", "housing", "transport", "entertaiment", "utilities", "other"], {
        invalid_type_error: 'Please select an Expense Category.'
    }),
    budget_amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive().gt(0),
    period_start: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(),
    period_end: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(),
    status: z.enum(['on_track', 'over_budget', 'under_budget'])
})

// UpdateBudget type infered from zod updateBudgetSchema
export type UpdateBudget = z.infer<typeof updateBudgetSchema>;


// Schema to get a budget
export const budgetSchema = z.object({
    budget_id: z.number(),
    user_id: z.number(),
    expense_category: z.string(),
    budget_amount: z.number().positive(),
    period_start: z.string(),
    period_end: z.string(),
    status: z.string().date(),
    created_at: z.date(),
})

// Budget type infered from zod budgetSchema
export type Budget = z.infer<typeof budgetSchema>;