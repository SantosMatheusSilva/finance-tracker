import { queryDb } from "../neondb";
import { Account } from "../definitions/types";

export async function getAccounts(userId: number): Promise<Account[]> {
    try {
        const data: Account[] = await queryDb`
        SELECT * FROM accounts WHERE user_id = ${userId}
        `;
        return data;
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch accounts.');
    }
}