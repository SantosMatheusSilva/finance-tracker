
import {
    getTransactions, 
    getIncomeTransactions, 
    getExpenseTransactions 
} from "../db/queries/transactions";
import {
    deleteTransaction,
} from "../db/mutations/transactions"
import { 
    formatCurrency, 
    formatDateToLocal, 
} from "../utils/utils";
import { createTransaction } from '../db/mutations/transactions';
import { CreateTransaction } from "../db/schemas/transactionsSchemas";


export async function createTransactionService(data: CreateTransaction): Promise<{ message: string; errors?: object }> {
    try {
        // Convert the data to FormData format
        const formData = new FormData();
        formData.append('user_id', data.user_id.toString());
        formData.append('account_id', data.account_id.toString());
        formData.append('amount', data.amount.toString());
        formData.append('transaction_type', data.transaction_type);
        
        if (data.transaction_type === 'Income') {
            formData.append('income_category', data.income_category || '');
        }
        
        if (data.transaction_type === 'Expense') {
            formData.append('expense_category', data.expense_category || '');
        }
        
        if (data.description) {
            formData.append('description', data.description);
        }
        
        formData.append('transaction_date', data.transaction_date);

        // Debug: Log what's being sent to the mutation
      /*   console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        } */

        // Call the mutation
        const result = await createTransaction(formData);
        console.log('Mutation result:', result);
        return result;
    } catch (error) {
        console.error('Service error:', error);
        return {
            message: 'Failed to create transaction',
        };
    }
}


// function to get the latest transactios (expenses and inocmes) => LATEST TRANSACTIONS TABLE 
export const fetchLatestTransactions = async (userId: number, limit: number = 15) => {

    try {
    const transactions = await getTransactions(userId);
    const limitedTransactions = transactions.slice(0, limit)
    const formattedTransactions = limitedTransactions.map((transaction) => ({
        ...transaction, // Spread the original transaction properties
        transaction_date: formatDateToLocal(transaction.transaction_date), // Format the date
        //amount: formatCurrency(transaction.amount), // Format the amount
      }));
    return formattedTransactions;
    } catch (error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch transactions.')
} 
}


/**
 * deleteTransactionById Function
 * Deletes a transaction by its ID.
 * @param {number} transactionId - The ID of the transaction to delete.
 * @returns {Promise<Transaction | null>} The deleted transaction or null if not found.
 * @throws {Error} If the transaction ID is invalid or the transaction does not exist.
 */
//Function to dele a transaction
export const deleteTransactionById = async (transactionId: number) => {
    if (!transactionId || typeof transactionId !== 'number') {
        throw new Error('Invalid transaction ID provided.');
    }

    try {
        const deletedTransaction = await deleteTransaction(transactionId);

        if (!deletedTransaction) {
            throw new Error('Transaction not found or already deleted.');
        }

        return deletedTransaction; 
    } catch (error) {
        console.error('Database error while deleting transaction:', error);
        throw new Error('Failed to delete transaction.');
    }
};



//FUNCTION TO CALCULATE USER TOTAL INCOME (FOR THE CURRENT MONTH)
export const calculateUserTotalIncome = async (userId: number) => {

    try{
        const incomeTransactions = await getIncomeTransactions(userId);
        //console.log(incomeTransactions)
        if(incomeTransactions.length === 0) {
            return formatCurrency(0);
        }
        const totalIncome = incomeTransactions.reduce((sum, transaction) => {
            const amount = Number(transaction.amount); // or Number(transaction.amount)
            if (!isNaN(amount)) {
                return sum + amount;
            }
            return sum; // Skip invalid amounts
        }, 0);
        
        const formattedTotal = formatCurrency(totalIncome);
        return formattedTotal;
    }catch(error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch income transactions total.')
    }
}
//FUNCTION TO CALCULATE USER TOTAL EXPENSE (FOR THE CURRENT MONTH)
export const calculateUserTotalExpense = async (userId: number) => {

    try{
        const expenseTransactions = await getExpenseTransactions(userId);
        console.log(expenseTransactions)
        const totalExpense = expenseTransactions.reduce((sum, transaction) => {
            const amount = Number(transaction.amount); // or Number(transaction.amount)
            
            if (!isNaN(amount)) {
                return sum + amount;
            }
            return sum; // Skip invalid amounts
        }, 0);
        console.log(totalExpense)
        const formattedTotal = formatCurrency(totalExpense);
        return formattedTotal;
    }catch(error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch expense transactions total.')
    }
}

//FUNCTION TO CALCULATE THE USER BALANCE
export const calculateUserBalance = async (userId: number) => {

   try{
    // Get account balances (these are already updated with transactions)
    const { fetchAccounts } = await import('./accountsServices');
    const accounts = await fetchAccounts(userId);
    const totalBalance = accounts.reduce((sum, account) => {
        const balance = Number(account.balance) || 0;
        return sum + balance;
    }, 0);
    
    const formattedBalance = formatCurrency(totalBalance);
    return formattedBalance;
   } catch(error) {
    console.error('Database error', error);
    throw new Error('Failed to fetch balance.')
   }
}

//FUNCTION TO GET THE USER'S TOTALs FOR INCOMES AND EXPENSES BY MONTH 
export async function getMonthlyTotals(userId: number) {
  const incomeTransactions = await getIncomeTransactions(userId);
  const expenseTransactions = await getExpenseTransactions(userId);

  const income = new Array(12).fill(0);
  const expenses = new Array(12).fill(0);

  for (const t of incomeTransactions) {
    const month = new Date(t.transaction_date).getMonth(); // 0–11
    income[month] += Number(t.amount);
  }

  for (const t of expenseTransactions) {
    const month = new Date(t.transaction_date).getMonth();
    expenses[month] += Number(t.amount);
  }

  return { income, expenses };
}

// RECURRINGS //

// FUnction to get user's recurring transactions => UPCOMING TRANSACTIONS -- ERROR
/* export const fetchUpcomingTransactions = async (userId: number = 1, limit: number = 5) => {
    try{
        const upComingTransactions = await getRecurringTransactions(userId);
        if(!upComingTransactions) {
            return [];
        }
        const limitedTransactions = upComingTransactions.slice(0, limit);
        const formattedTransactions = limitedTransactions.map((upComingTransactions) => ({
            ...upComingTransactions,
            amount: formatCurrency(upComingTransactions.amount), // Format the amount
          }));
        return formattedTransactions;
    } catch(error) {
        console.error('Database error', error);
        throw new Error('Failed to fetch recurring transactions.')
    }
} */
