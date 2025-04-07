'use server';

import { queryDb } from "../neondb";
import { createRecurringTransactionSchema, updateRecurringTransactionSchema } from "@/app/lib/db/schemas/recurringTransactionsSchemas";

// Mutation function to insert a new recurring transaction.
export async function insertRecurringTransaction(formdata: FormData): Promise<{ message: string; errors?: object}> {
    // First validate the data from the form fields 
    const validatedForm = createRecurringTransactionSchema.safeParse({
        user_id: formdata.get('user_id'),
        account_id: formdata.get('account_id'),
        amount: formdata.get('amount'),
        transaction_type: formdata.get('transaction_type'),
        expense_category: formdata.get('expense_category'),
        income_category: formdata.get('income_category'),
        description: formdata.get('description'),
        start_date: formdata.get('start_date'),
        end_date: formdata.get('end_date'),
        frequency: formdata.get('frequency'),
        execution_day: formdata.get('execution_day'),
        day_of_week: formdata.get('day_of_week'),
        execution_date: formdata.get('execution_date'),
    });

    if (!validatedForm.success) {
        return {
            message: 'Invalid data. Please check the form fields.',
            errors: validatedForm.error.errors,
        };
    }

    // Prepare data for insertion
    const {
        user_id, 
        account_id, 
        amount, 
        transaction_type, 
        expense_category, 
        income_category, 
        description, 
        start_date, 
        end_date, 
        frequency, 
        execution_day, 
        day_of_week, 
        execution_date
    } = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        INSERT INTO recurring_transactions (
            user_id,
            account_id,
            amount,
            transaction_type,
            expense_category,
            income_category,
            description,
            start_date,
            end_date,
            frequency,
            execution_day,
            day_of_week,
            execution_date
        )
        VALUES (
            ${user_id},
            ${account_id},
            ${amount},
            ${transaction_type},
            ${expense_category?? 'null'},
            ${income_category?? 'null'},
            ${description?? 'null'},
            ${start_date},
            ${end_date?? 'null'},
            ${frequency},
            ${execution_day?? 'null'},
            ${day_of_week?? 'null'},
            ${execution_date?? 'null'}
        )
    `;
        return { message: 'Recurring transaction created successfully.' };
    } catch (error) {
        console.error('Database error', error);
        return { message: 'Error creating recurring transaction.' };
    }
}

// Mutation function to update a Goal
export async function updateRecurringTransaction(recurring_transaction_id: number, formdata: FormData): Promise <{ message: string; errors?: object }> {
    // First validate the data from the form fields
    const validatedForm = updateRecurringTransactionSchema.safeParse({
        account_id: formdata.get('account_id'),
        amount: formdata.get('amount'),
        transaction_type: formdata.get('transaction_type'),
        expense_category: formdata.get('expense_category'),
        income_category: formdata.get('income_category'),
        description: formdata.get('description'),
        start_date: formdata.get('start_date'),
        end_date: formdata.get('end_date'),
        frequency: formdata.get('frequency'),
        execution_day: formdata.get('execution_day'),
        day_of_week: formdata.get('day_of_week'),
        execution_date: formdata.get('execution_date'),
    });

    if (!validatedForm.success) {
        return {
            message: 'Invalid data. Please check the form fields.',
            errors: validatedForm.error.errors,
        };
    }

    // Prepare data for insertion
    const {
        account_id, 
        amount, 
        transaction_type, 
        expense_category, 
        income_category, 
        description, 
        start_date, 
        end_date, 
        frequency, 
        execution_day, 
        day_of_week, 
        execution_date
    } = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        UPDATE recurring_transactions
        SET
            account_id = ${account_id},
            amount = ${amount},
            transaction_type = ${transaction_type},
            expense_category = ${expense_category?? 'null'},
            income_category = ${income_category?? 'null'},
            description = ${description?? 'null'},
            start_date = ${start_date},
            end_date = ${end_date?? 'null'},
            frequency = ${frequency},
            execution_day = ${execution_day?? 'null'},
            day_of_week = ${day_of_week?? 'null'},
            execution_date = ${execution_date?? 'null'}
        WHERE recurring_transaction_id = ${recurring_transaction_id}
    `;
        return { message: 'Recurring transaction updated successfully.' };
    } catch (error) {
        console.error('Database error', error);
        return { message: 'Error updating recurring transaction.' };
    }
}

//Mutation function to Delete a Recurring Transasaction
export async function deleteRecurringTransaction(recurring_transaction_id: number): Promise<{ message: string}> {
    // delete block TRY
    try {
        await queryDb`
        DELETE FROM recurring_transactions
        WHERE recurring_transaction_id = ${recurring_transaction_id}
        `;
        return {
            message: 'Recurring Transaction deleted successfully',
        }
    } catch (error) {
        console.error('Database error', error);
        return {
            message: 'Failed to delete Recurring Transaction',
        }
    }
}