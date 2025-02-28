import { queryDb } from "../neondb";
import { RecurringTransactions } from "../schemas/recurringTransactionsSchemas";
import { formatDateToLocal, formatCurrency } from "../../utils/utils";

// Function to query user's recurring transactions
export async function getRecurringTransactions(userId: number): Promise<RecurringTransactions[]> {
    try {
        const data: RecurringTransactions[] = (await queryDb`
        SELECT 
        recurringTransaction.user_id,
        recurringTransaction.recurring_id,
        recurringTransaction.account_id,
        recurringTransaction.amount,
        recurringTransaction.transaction_type,
        recurringTransaction.expense_category,
        recurringTransaction.income_category,
        recurringTransaction.description,
        recurringTransaction.start_date,
        recurringTransaction.end_date,
        recurringTransaction.frequency,
        recurringTransaction.execution_day,
        recurringTransaction.day_of_week,
        recurringTransaction.execution_date,
        recurringTransaction.last_executed

        FROM recurring_transactions WHERE user_id = ${userId} `) as RecurringTransactions[];
        
        const recurringTransactions = data.map((recurringTransaction) => ({
            ...recurringTransaction,
            //amount: formatCurrency(recurringTransaction.amount),
            start_date: formatDateToLocal(recurringTransaction.start_date),
            end_date: formatDateToLocal(recurringTransaction.end_date ?? ''),
            execution_date: formatDateToLocal(recurringTransaction.execution_date?.toString() ?? ''),
        }));
        return data;
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch recurring transactions.');
    }
}