import { queryDb } from "../neondb";
import { 
    CreateAccount,
     } from "../definitions/types";


// Mutation to insert a new Account.
export async function insertAccount({user_id, account_name, account_type, balance, currency}: CreateAccount): Promise<{message: string}> {
    try {
        await queryDb`
        INSERT INTO accounts (user_id, account_name, account_type, balance, currency) 
        VALUES (${user_id}, ${account_name}, ${account_type}, ${balance}, ${currency ?? ''}) // ------> update the accounts table to have enum for usd, eur, gbp. and default to eur.
        `;
        return { message: 'Account created successfully' };
    } catch(error) {
        console.error('Failed to create account', error)
        throw new Error('Failed to create account');
    }
} 