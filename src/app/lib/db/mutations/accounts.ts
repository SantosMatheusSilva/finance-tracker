'use server ' // Runs this file in the server side!

import { queryDb } from "../neondb";
import { 
    createAccountSchema,
    updateAccountSchema,
 } from "../schemas/accountSchemas";


// Mutation function to insert a new Account.
export async function insertAccount(formdata: FormData): Promise<{ message: string; errors?: {}}> { // -> maybe add the user id in the parametters 
    // First validate the data from the form fields 
    const validatedForm = createAccountSchema.safeParse({
        user_id: formdata.get('user_id'),
        account_name: formdata.get('account_name'),
        account_type: formdata.get('account_type'),
        balance: formdata.get('balance'),
        currency: formdata.get('currency'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        errors: validatedForm.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to create Account',
        }
    }

    // Prepare data for insertion 
    const {user_id, account_name, account_type, balance, currency} = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        INSERT INTO accounts (user_id, account_name, account_type, balance, currency)
        VALUES (${user_id}, ${account_name}, ${account_type}, ${balance}, ${currency})
        `;
        return {
            message: 'Account created successfully',
        };
    } catch (error) {
        console.error('An error ocurred while inserting an account:', error);
        return {
            message: 'Failed to create Account',
            errors: {
            }
        };
    }
}

// Mutation function to update an existing Account.
export async function updateAccount(account_id: number, formdata: FormData): Promise<{ message: string; errors?: {}}> {
    // First validate the data from the form fields
    const validatedForm = updateAccountSchema.safeParse({
        account_name: formdata.get('account_name'),
        account_type: formdata.get('account_type'),
        balance: formdata.get('balance'),
        currency: formdata.get('currency'),
    });

    // If the validation fails, return erros, otherwise, continue
    if (!validatedForm.success) {
        return{
        errors: validatedForm.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to update Account',
        }
    }

    // Prepare data for insertion
    const {account_name, account_type, balance, currency} = validatedForm.data;

    // Insertion block TRY
    try {
        await queryDb`
        UPDATE accounts
        SET 
        account_name = ${account_name}, 
        account_type = ${account_type}, 
        balance = ${balance}, 
        currency = ${currency}
        WHERE account_id = ${account_id}
        `;
        return {
            message: 'Account updated successfully',
        };
    } catch (error) {
        console.error('An error ocurred while updating an account:', error);
        return {
            message: 'Failed to update Account',
            errors: {
            }
        };
    }
}

// Mutation function to dele an Account
export async function deleteAccount(account_id: number): Promise<{ message: string}> {
    // delete block TRY
    try {
        await queryDb`
        DELETE FROM accounts
        WHERE account_id = ${account_id}
        `;
        return {
            message: 'Account deleted successfully',
        }
    } catch (error) {
        return {
            message: 'Failed to delete Account',
        }
    }
}