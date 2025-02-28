'use server' // Runs the file in the server side!

import { queryDb } from "../neondb";
import {
    createBudgetSchema,
    updateBudgetSchema,
} from '../schemas/budgetsSchemas';

// Mutation function to insert a new budget 
export async function insertBudget(formdata: FormData): Promise <{ message: string; errors?: object }> {
    // First validate the data from the form fields
    const validatedForm = createBudgetSchema.safeParse({
        user_id: formdata.get('user_id'),
        expense_category: formdata.get('expense_category'),
        budget_amount: formdata.get('budget_amount'),
        period_start: formdata.get('period_start'),
        period_end: formdata.get('period_end'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        errors: validatedForm.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to create budget',
        }
    }

    // Prepare data for insertion
    const {user_id, expense_category, budget_amount, period_start, period_end} = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        INSERT INTO budgets (user_id, expense_category, budget_amount, period_start, period_end)
        VALUES (${user_id}, ${expense_category}, ${budget_amount}, ${period_start}, ${period_end})
        `;
        return {
            message: 'Budget created successfully',
        };
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to create budget.');
    }
}

// Mutation function to update an existing budget
export async function updateBudget(budget_id: number, formdata: FormData): Promise <{ message: string; errors?: object }> {
    // First validate the data from the form fields
    const validatedForm = updateBudgetSchema.safeParse({
        expense_category: formdata.get('expense_category'),
        budget_amount: formdata.get('budget_amount'),
        period_start: formdata.get('period_start'),
        period_end: formdata.get('period_end'),
        status: formdata.get('status'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        errors: validatedForm.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to update budget',
        }
    }

    // Prepare data for insertion   
    const {expense_category, budget_amount, period_start, period_end, status} = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        UPDATE budgets
        SET 
        expense_category = ${expense_category}, 
        budget_amount = ${budget_amount}, 
        period_start = ${period_start}, 
        period_end = ${period_end}, 
        status = ${status}
        WHERE budget_id = ${budget_id}
        `;
        return {
            message: 'Budget updated successfully',
        };
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to update budget.');
    }
}

// Mutation function to Delete a Budget
export async function deleteBudget(budget_id: number): Promise <{ message: string; errors?: object }> {
    // Insertion block TRY
    try {
        await queryDb`
        DELETE FROM budgets
        WHERE budget_id = ${budget_id}
        `;
        return {
            message: 'Budget deleted successfully',
        };
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to delete budget.');
    }
}