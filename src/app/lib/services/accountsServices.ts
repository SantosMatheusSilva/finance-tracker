import { getAccounts } from "../db/queries/accounts";
import { formatCurrency } from "../utils/utils";

export async function fetchAccounts(userId: number = 1) {
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