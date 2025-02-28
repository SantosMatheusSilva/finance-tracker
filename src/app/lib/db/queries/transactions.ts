import { queryDb } from "../neondb";
import { Transaction } from "../schemas/transactionsSchemas";
import { formatDateToLocal } from "../../utils/utils";



// Function to query user's transactions
export async function getTransactions(userId: number): Promise<Transaction[]> {
    try {
        const data: Transaction[] = await queryDb`
        SELECT
            transactions.user_id,
            transactions.transaction_id,
            transactions.account_id,
            accounts.account_name AS account_name,
            transactions.amount,
            transactions.transaction_type,
            transactions.transaction_date,
            transactions.expense_category AS transaction_category,
            transactions.description
        FROM transactions
        JOIN accounts ON transactions.account_id = accounts.account_id
        WHERE transactions.user_id = ${userId}
        ORDER BY transactions.transaction_date DESC;
        `;

        const transactions = data.map((transaction) => ({
            ...transaction,
            transaction_date: formatDateToLocal(transaction.transaction_date),
            //amount: Number(transaction.amount),
            //amount: formatCurrency(transaction.amount),
        }));
        return transactions;
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch transactions.');
    }
}

// Funtion to query user's EXPENSES transactions
export async function getExpenseTransactions(userId: number): Promise<Transaction[]> {
    try {
        const data: Transaction[] = await queryDb`
        SELECT
            transactions.user_id,
            transactions.transaction_id,
            transactions.account_id,
            transactions.amount,
            transactions.transaction_type,
            transactions.transaction_date,
            transactions.expense_category AS category,
            transactions.description
        FROM transactions
        WHERE transactions.user_id = ${userId}
        AND transactions.transaction_type = 'Expense'
        ORDER BY transactions.transaction_date DESC;
        `;

        const expenseTransactions = data.map((expense) => ({
            ...expense,
            transaction_date: formatDateToLocal(expense.transaction_date)
        }));
    
        return expenseTransactions;
        

    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch transactions.');
    }
}

// Function to query user's INCOMES transactions
export async function getIncomeTransactions(userId: number): Promise<Transaction[]> {
    try {
        const data: Transaction[] = await queryDb`
        SELECT
            transactions.user_id,
            transactions.transaction_id,
            transactions.account_id,
            transactions.amount,
            transactions.transaction_type,
            transactions.transaction_date,
            transactions.income_category AS category,
            transactions.description
        FROM transactions
        WHERE transactions.user_id = ${userId}
        AND transactions.transaction_type = 'Income'
        ORDER BY transactions.transaction_date DESC;
        `;
        
        const incomeTransactions = data.map((income) => ({
            ...income,
            transaction_date: formatDateToLocal(income.transaction_date)
        }));
        return incomeTransactions;

    } catch(error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch transactions.');
    }
}