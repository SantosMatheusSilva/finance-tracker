'use server';

import { queryDb } from '../neondb';
import {
    createIncomeTransactionSchema,
    updateTransactionSchema,
    createExpenseTransactionSchema,
} from '../schemas/transactionsSchemas';

// Mutation function to insert an Income Transaction 
export async function insertIncomeTransaction(formdata: FormData): Promise<{ message: string; errors?: object}> {
    // First validate the data from the form fields
    const validatedForm = createIncomeTransactionSchema.safeParse({
        user_id: formdata.get('user_id'),
        account_id: formdata.get('account_id'),
        amount: formdata.get('amount'),
        transaction_type: formdata.get('transaction_type'),
        income_category: formdata.get('income_category'),
        description: formdata.get('description'),
        transaction_date: formdata.get('transaction_date'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        message: 'Missing fields. Failed to create Income Transaction',
        errors: validatedForm.error.errors,
        }
    }

    // Prepare data for insertion
    const {
        user_id,
        account_id, 
        amount, 
        transaction_type,
        income_category, 
        description, 
        transaction_date
    } = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        INSERT INTO transactions (
        user_id, 
        account_id, 
        amount, 
        transaction_type, 
        income_category, 
        description,
        transaction_date
        )
        VALUES (
        ${user_id}, 
        ${account_id}, 
        ${amount}, 
        ${transaction_type}, 
        ${income_category}, 
        ${description?? ''}, 
        ${transaction_date}
        )`;
        return {
            message: 'Income Transaction created successfully',
        }
    } catch (error) {
        console.error('Database error', error);
        return {
            message: 'Failed to create Income Transaction',
        }
    }
}

// Mutation function to update a Income transaction

const updateIncomeTransactionSchema = updateTransactionSchema.omit({expense_category: true})

export async function updateIncomeTransaction(transaction_id: number, formdata: FormData): Promise<{ message: string; errors?: object}> {
    // First validate the data from the form fields
    const validatedForm = updateIncomeTransactionSchema.safeParse({
        user_id: formdata.get('user_id'),
        account_id: formdata.get('account_id'),
        amount: formdata.get('amount'),
        transaction_type: formdata.get('transaction_type'),
        income_category: formdata.get('income_category'),
        description: formdata.get('description'),
        transaction_date: formdata.get('transaction_date'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        message: 'Missing fields. Failed to update Income Transaction',
        errors: validatedForm.error.errors,
        }
    }

    // Prepare data for insertion
    const {
        user_id,
        account_id, 
        amount, 
        transaction_type,
        income_category, 
        description, 
        transaction_date
    } = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        UPDATE transactions
        SET 
        user_id = ${user_id}, 
        account_id = ${account_id}, 
        amount = ${amount}, 
        transaction_type = ${transaction_type}, 
        income_category = ${income_category}, 
        description = ${description ?? ''}, 
        transaction_date = ${transaction_date}
        WHERE transaction_id = ${transaction_id}
        `;
        return {
            message: 'Income Transaction updated successfully',
        }
    } catch (error) {
        console.error('Database error', error);
        return {
            message: 'Failed to update Income Transaction',
        }
    }
}

// Mutation function to insert an Expense Transaction
export async function insertExpenseTransaction(formdata: FormData): Promise<{ message: string; errors?: object}> {
    // First validate the data from the form fields
    const validatedForm = createExpenseTransactionSchema.safeParse({
        user_id: formdata.get('user_id'),
        account_id: formdata.get('account_id'),
        amount: formdata.get('amount'),
        transaction_type: formdata.get('transaction_type'),
        expense_category: formdata.get('expense_category'),
        description: formdata.get('description'),
        transaction_date: formdata.get('transaction_date'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        message: 'Missing fields. Failed to create Expense Transaction',
        errors: validatedForm.error.errors,
        }
    }

    // Prepare data for insertion
    const {
        user_id,
        account_id, 
        amount, 
        transaction_type,
        expense_category, 
        description, 
        transaction_date
    } = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        INSERT INTO transactions (
        user_id, 
        account_id, 
        amount, 
        transaction_type, 
        expense_category, 
        description,
        transaction_date
        )
        VALUES (
        ${user_id}, 
        ${account_id}, 
        ${amount}, 
        ${transaction_type}, 
        ${expense_category}, 
        ${description?? ''},
        ${transaction_date}
        )`;
        return {
            message: 'Expense Transaction created successfully',
        }
    } catch (error) {
        console.error('Database error', error);
        return {
            message: 'Failed to create Expense Transaction',
        }
    }
}

// Mutation function to update an Expense transaction
const updateExpenseTransactionSchema = updateTransactionSchema.omit({income_category: true})

export async function updateExpenseTransaction(transaction_id: number, formdata: FormData): Promise<{ message: string; errors?: object}> {
    // First validate the data from the form fields
    const validatedForm = updateExpenseTransactionSchema.safeParse({
        user_id: formdata.get('user_id'),
        account_id: formdata.get('account_id'),
        amount: formdata.get('amount'),
        transaction_type: formdata.get('transaction_type'),
        expense_category: formdata.get('expense_category'),
        description: formdata.get('description'),
        transaction_date: formdata.get('transaction_date'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        message: 'Missing fields. Failed to update Expense Transaction',
        errors: validatedForm.error.errors,
        }
    }

    // Prepare data for insertion
    const {
        user_id,
        account_id, 
        amount, 
        transaction_type,
        expense_category, 
        description, 
        transaction_date
    } = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        UPDATE transactions
        SET 
        user_id = ${user_id}, 
        account_id = ${account_id}, 
        amount = ${amount}, 
        transaction_type = ${transaction_type}, 
        expense_category = ${expense_category}, 
        description = ${description ?? ''}, 
        transaction_date = ${transaction_date}
        WHERE transaction_id = ${transaction_id}
        `;
        return {
            message: 'Expense Transaction updated successfully',
        }
    } catch (error) {
        console.error('Database error', error);
        return {    
            message: 'Failed to update Expense Transaction',
        }
    }
}

// Mutation functioon to delete transactions 
export async function deleteTransaction(transaction_id: number): Promise<{ message: string}> {
    // delete block TRY
    try {
        await queryDb`
        DELETE FROM transactions
        WHERE transaction_id = ${transaction_id}
        `;
        return {
            message: 'Transaction deleted successfully',
        }
    } catch (error) {
        console.error('Database error', error);
        return {
            message: 'Failed to delete Transaction',
        }
    }
}
