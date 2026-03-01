import { z } from 'zod';

// EXPENSE CATEGORIES
export const expenseCategories = [
  "Health",
  "Food", 
  "Education",
  "Housing",
  "Transport",
  "Entertainment",
  "Utilities",
  "Other"
] as const;

export const expenseCategorySchema = z.enum(expenseCategories);
export type ExpenseCategory = z.infer<typeof expenseCategorySchema>;

// INCOME CATEGORIES
export const incomeCategories = [
  'Salary',
  'Extra Work',
  'Investments',
  'Gifts',
  'Other'
] as const;

export const incomeCategorySchema = z.enum(incomeCategories);
export type IncomeCategory = z.infer<typeof incomeCategorySchema>;

// TRANSACTION TYPES
export const transactionTypes = ["Expense", "Income"] as const;
export const transactionTypeSchema = z.enum(transactionTypes);
export type TransactionType = z.infer<typeof transactionTypeSchema>; 