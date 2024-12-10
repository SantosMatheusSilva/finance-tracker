import { z } from 'zod';


// GOALS SCHEMAS

// Schema to create a goal
export const createGoalSchema = z.object({
    user_id: z.number(),
    income_category: z.enum(["savings", "investment", "debt", "purchase", "lifestyle", "family", "business", "vacations", "other"], {
        invalid_type_error: 'Please select an Income Category.'
    }),
    expense_category: z.never(),
    goal_name: z.string(),
    description: z.string().optional(),
    target_amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive(),
    deadline: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date(),
    //status: z.enum(['active', 'complete', 'suspense']).default('active').optional()
})

// CreateBudget type infered from zod createGoalSchema
export type CreateGoal = z.infer<typeof createGoalSchema>;


// Schema to update a goal
export const updateGoalSchema = z.object({
    category: z.enum(["savings", "investment", "debt", "purchase", "lifestyle", "family", "business", "vacations", "other"], {
        invalid_type_error: 'Please select an Income Category.'
    }).optional(),
    goal_name: z.string().optional(),
    description: z.string().optional(),
    target_amount: z.number({
        invalid_type_error: 'Please enter a number grater than 0.',
    }).positive().optional(),
    deadline: z.string({
        invalid_type_error: 'Please enter a valid date.',
    }).date().optional(),
    status: z.enum(['active', 'complete', 'suspense', 'canceled']).default('active').optional()
})

// UpdateBudget type infered from zod updateGoalSchema
export type UpdateGoal = z.infer<typeof updateGoalSchema>;


// Schema to get a goal
export const goalSchema = z.object({
    goal_id: z.number(),
    user_id: z.number(),
    categoty: z.enum(["savings", "investment", "debt", "purchase", "lifestyle", "family", "business", "vacations", "other"]),
    goal_name: z.string(),
    description: z.nullable(z.string()),
    target_amount: z.number().positive(),
    deadline: z.string().date(),
    status: z.enum(['active', 'complete', 'suspense', 'canceled']).default('active'),
    created_at: z.date(),
    current_amount: z.number().positive(),
})

// Goal type infered from zod goalSchema
export type Goal = z.infer<typeof goalSchema>;