
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

/* import getServerSession from 'next-auth';

const session = await getServerSession( { req });
const userId = session?.user?.user_id; */

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
    const transactions = await getTransactions(userId)
    const balance = transactions.reduce((sum, transaction) => {
        const amount = transaction.amount; // or Number(transaction.amount)
        if (transaction.transaction_type === 'Expense') {
            return sum - amount;
        } else {
            return sum + amount;
        }
    }, 0);
    const formattedBalance = formatCurrency(balance);
    return formattedBalance;
   } catch(error) {
    console.error('Database error', error);
    throw new Error('Failed to fetch balance.')
   }
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
