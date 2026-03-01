import { getAccounts } from "../db/queries/accounts";
import { insertAccount } from "../db/mutations/accounts";
import { CreateAccount } from "../db/schemas/accountSchemas";

export async function fetchAccounts(userId: number ) {
    try {
        const accounts = await getAccounts(userId)
        const formatedAccounts = accounts.map((account) => ({
            ...account,
            //balance: formatCurrency(account.balance)
        }))
        return formatedAccounts
    }catch(error) {
        console.error('Database error', error);
        throw new Error ('Failed to fetch accounts.')
    }
}

export async function createAccountService(data: CreateAccount): Promise<{ message: string; errors?: object }> {
    try {
        if (!data) {
            return { message: 'No data provided' };
        }
        
        // Convert the data to FormData format
        const formData = new FormData();
        formData.append('user_id', data.user_id?.toString());
        formData.append('account_name', data.account_name || '');
        formData.append('account_type', data.account_type || 'cash');
        formData.append('balance', data.balance?.toString() || '0');
        formData.append('currency', data.currency || 'EUR');

        // Call the mutation
        const result = await insertAccount(formData);
        return result;
    } catch (error) {
        console.error('Service error:', error);
        return {
            message: 'Failed to create account',
        };
    }
}