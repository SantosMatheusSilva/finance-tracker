
import { getUserData } from '@/app/lib/db/queries/user'
import {
    getExpenseTransactions, 
    getIncomeTransactions,
    getTransactions
} from '@/app/lib/db/queries/transactions'
import { getAccounts } from '@/app/lib/db/queries/accounts';
import { getBudgets } from '@/app/lib/db/queries/budgets';
import { getGoals } from '@/app/lib/db/queries/goals';

export default async function Page() {
    const userdata = await getUserData(1);
    const expenseTransactions = await getExpenseTransactions(1);
    const transactions = await getTransactions(1);
    const incomeTransactions = await getIncomeTransactions(1);
    const accounts = await getAccounts(1);
    const budgets = await getBudgets(1);
    const goals = await getGoals(1);

    //console.log('expense recult', expenseTransactions)
    //console.log('transactions result', transactions)
    //console.log('income result', incomeTransactions);
    //console.log('user data', userdata);
    

    return(
        <>
        <div>
            <p>Hello {userdata.username}, {userdata.email} {userdata.user_id}</p>
            <div>
                <p>YOUR GOALS:</p>
                <div>
                    {goals.map((goal) => (
                        <div key={goal.goal_id}>
                            <p>{goal.goal_name}</p>
                            <p>{goal.target_amount}</p>
                            <p>{goal.current_amount}</p>
                            <p>{goal.status}</p>
                            <p>{goal.income_category}</p>
                            <p>{goal.deadline.toDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <p>YOUR BUDGETS:</p>
            <div>
                {budgets.map((budget) => (
                    <div key={budget.budget_id} >
                        <p>{budget.category}</p>
                        <p>€{budget.budget_amount}</p>
                        <p>{budget.status}</p>
                        <p>{budget.period_start.toDateString()}</p>
                        <p>{budget.period_end.toDateString()}</p>
                    </div>
                ))}
            </div>
            <p>YOUR ACCOUNTS:</p>
            <div>
                {accounts.map((account) => (
                    <div key={account.account_id}>
                        <p>{account.account_name}</p>
                        <p>{account.account_type}</p>
                        <p>€{account.balance}</p>
                        <p>{account.currency}</p>
                    </div>
                ))}
            </div>
            <p>YOUR INCOMES:</p>
            {incomeTransactions.length === 0 ? (
                <p>No income transactions</p>
            ) : (
                <div>
                {incomeTransactions.map((income) => (
                    <div key={income.transaction_id}>
                        <p>€{income.amount}</p>
                        <p>{income.transaction_date.toDateString()}</p>
                        <p>{income.category}</p>
                        <p>{income.description}</p>
                    </div>
                ))}
            </div>
            )}
            
            <p>YOUR transactions:</p>
            <div>
                {transactions.map((transaction) => (
                    <div key={transaction.transaction_id}>
                        <p>€{transaction.amount}</p>
                        <p>from: {transaction.account_name}</p>
                        <p>{transaction.transaction_date.toDateString()}</p>
                        <p>{transaction.transaction_type}</p>
                        <p>{transaction.transaction_category}</p>
                        <p>{transaction.description}</p>
                    </div>
                ))}
            </div>
            <p>YOUR EXPENSES:</p>
            {expenseTransactions.length === 0 ? (
                <p>No expense transactions</p>
            ) : (
                <div>
                {expenseTransactions.map((expense) => (
                    <div key={expense.transaction_id}>
                        <p>€{expense.amount}</p>
                        <p>{expense.transaction_date.toDateString()}</p>
                        <p>{expense.category}</p>
                        <p>{expense.description}</p>
                    </div>
                ))}
            </div>
            )}
           
        </div>
        </>
    )
}   