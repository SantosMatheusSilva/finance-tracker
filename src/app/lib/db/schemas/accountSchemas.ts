import { z } from 'zod';

// ACCOUNT SCHEMAS 

// Schema to create a new account 
export const createAccountSchema = z.object({
    user_id: z.number(),
    account_name: z.string(),
    account_type: z.enum(['cash', 'bank', 'credit card', 'investment']),
    balance: z.number().default(0),
    currency: z.enum(['EUR', 'USD', 'GBP']).default('EUR'),
  });

// CreateAccount type infered from zod createAccountSchema
export type CreateAccount = z.infer<typeof createAccountSchema>;

// Schema to update an account
export const updateAccountSchema = z.object({
    account_name: z.string().optional(),
    account_type: z.enum(['cash', 'bank', 'credit card', 'investment']).optional(),
    balance: z.number().optional(),
    currency: z.enum(['EUR', 'USD', 'GBP']).optional(),
  });

// UpdateAccount type infered from zod updateAccountSchema
export type UpdateAccount = z.infer<typeof updateAccountSchema>;

// Schema to get an account
export const accountSchema = z.object({
    account_id: z.number(),
    user_id: z.number(),
    account_name: z.string(),
    account_type: z.enum(['cash', 'bank', 'credit card', 'investment']),
    balance: z.number(),
    currency: z.enum(['EUR', 'USD', 'GBP']),
    created_at: z.date(),
  });

// Account type infered from zod accountSchema
export type Account = z.infer<typeof accountSchema>;