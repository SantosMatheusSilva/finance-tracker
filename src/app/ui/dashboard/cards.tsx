'use client'
import {
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter
} from "@heroui/card";

import  Loading  from "@/app/ui/loadingSpinner";
import {
    calculateUserTotalIncome, 
    calculateUserTotalExpense,
    calculateUserBalance,
} from "@/app/lib/services/transactionsServices";
import { fetchAccounts } from "@/app/lib/services/accountsServices";
import { Account } from "@/app/lib/db/schemas/accountSchemas";
import { 
    getDayAndMonth,
    formatCurrency
 } from "@/app/lib/utils/utils";
import {
    useState,
    useEffect,
} from "react";
import { useUser } from "@/app/context/sessionDataProvider";



//The date to be rendered in the Cards
const cardDate = getDayAndMonth(new Date);

// BalanceCard subcomponent
function BalanceCard ({balance, isLoading} : {balance: string, isLoading: boolean}) {

    return (
      <Card
        className="w-full max-w-full max-h-52" /* md:w-72 h-36 */
        radius="lg"
        isHoverable
        isPressable
      >
        <CardHeader className="text-xl">
          <h1>Balance</h1>
        </CardHeader>
        <CardBody className="flex justify-center text-center text-2xl">
          {/* display here the result of all accounts sum incomes - expenses for the current month */}
          {/* { isLoading ? <Loading size="md" color="primary"/> :
                    balance.startsWith('-') ? (
                        <h2 className="text-red-500 ">{balance}</h2>
                    ) : (
                         <h2>{balance}</h2> 
                    )
                } */}
          {isLoading ? (
            <Loading size="md" color="primary" />
          ) : balance ? (
            balance.startsWith("-") ? (
              <h2 className="text-red-500">{balance}</h2>
            ) : (
              <h2>{balance}</h2>
            )
          ) : (
            <p className="sm:text-sm">No balance available</p>
          )}
        </CardBody>
        <CardFooter className="justify-between">
          {/* here the current month */}
          <p className="text-sm">{cardDate}</p>
          <p className="text-sm text-gray-400">View details</p>
        </CardFooter>
      </Card>
    );
}

// ExpenseCard subcomponent
function ExpenseCard({expense, isLoading} : {expense: string, isLoading: boolean}){

    return(
        <Card
            className="w-full max-w-full max-h-52 "/* md:w-72 h-36 */
            radius="lg"
            isHoverable
            isPressable
            >
                <CardHeader
                 className="text-xl"
                 >
                    <h1>Total Expenses</h1>
                </CardHeader>
                
                <CardBody
                className="flex justify-center text-center text-2xl"
                >
                    {/* display here the result of all accounts sum expenses */}
                    {isLoading ? <Loading size="md" color="primary"/> : <h2 className="text-red-500">- {expense}</h2> }
                </CardBody>
                <CardFooter className="justify-between">
                    {/* here the link to transactios > expenses */}
                    <p className="text-sm">{cardDate}</p>
                    <p className="text-sm text-gray-400">view details</p>
                </CardFooter>
            </Card>
    )
}

//IncomeCard subcomponent
function IncomeCard({income, isLoading} : {income: string, isLoading: boolean}){
   
    return (
        <Card
            className="w-full max-w-full max-h-52 "/* md:w-72 h-36 */
            radius="lg"
            isHoverable
            isPressable
            >
                <CardHeader
                 className="text-xl"
                 >
                    <h1>Total Income</h1>
                </CardHeader>
                <CardBody
                className="flex justify-center text-center text-2xl"
                >
                    {/* here the result of this month total income */}
                    {isLoading ? <Loading size="md" color="primary"/> : <h2 className="text-primary-500">{income}</h2> }
                </CardBody>
                <CardFooter className="justify-between">
                    {/* here the link to transactios > incomes */}
                    <p className="text-sm">{cardDate}</p>
                    <p className="text-sm text-gray-400">view details</p>
                </CardFooter>
            </Card>
    )
}

//AccountsCArd subcomponent
function AccountsCard({accounts, isLoading} : {accounts: Account[], isLoading: boolean}){
    
    return (
      <Card
        className="w-full max-w-full max-h-52 "/* md:w-72 h-36 */
        radius="lg"
        isHoverable
        isPressable
      >
        <CardHeader className="text-xl">
          <h1>
            Accounts <span className="text-gray-400">({accounts.length})</span>
          </h1>
        </CardHeader>
        <CardBody className="flex flex-col gap-2 items-center text-xl snap-proximity snap-y ">
          {isLoading ? (
            <Loading size="md" color="primary" />
          ) : !accounts || accounts.length === 0 ? (
            <p className="sm:text-sm">No accounts to display</p>
          ) : (
            accounts.map((account: Account) => (
              <div
                key={account.account_id}
                className="h-max w-full rounded-lg flex flex-col p-2 items-center snap-center"
              >
                <p className="text-primary-500">{formatCurrency(account.balance)}</p>
                <p className="text-sm text-gray-500">{account.account_name}</p>
              </div>
            ))
          )}
        </CardBody>
        <CardFooter className="justify-end">
          <p className="text-sm text-gray-400">view details</p>
        </CardFooter>
      </Card>
    );
}

export default function CardWrapper() {
    const [userTotalIncome, setUserTotalIncome] = useState('0');
    const [userTotalExpenses, setUserTotalExpenses] = useState('0');
    const [userBalance, setUserBalance] = useState('0');
    const [userAccounts, setUserAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const user = useUser();

    //Executes all the services for the Card data fetch
    useEffect( () => {
        const getTotals = async () => {
            setIsLoading(true);
            try{
                const [totalIncome, totalExpense, userBalance, userAccounts ] = await Promise.all([
                    calculateUserTotalIncome(user.sessionUser.user_id),
                    calculateUserTotalExpense(user.sessionUser.user_id),
                    calculateUserBalance(user.sessionUser.user_id),
                    fetchAccounts(user.sessionUser.user_id)
                ]);

                setUserTotalIncome(totalIncome);
                setUserTotalExpenses(totalExpense);
                setUserBalance(userBalance);
                setUserAccounts(userAccounts)
                setIsLoading(false);
            } catch(error) {
                console.error('Failed to fetch total.', error);
            }
        };
        getTotals();
    }, []); 

    
    return(
        <>
        <div className="grid grid-cols-1 grid-rows-1 gap-4 md:grid-cols-2 md:grid-rows-2 lg:flex lg:flex-row justify-between">
            <BalanceCard  balance={userBalance} isLoading={isLoading}/>
            <ExpenseCard expense={userTotalExpenses} isLoading={isLoading}/>
            <IncomeCard income={userTotalIncome} isLoading={isLoading}/>
            <AccountsCard accounts={userAccounts} isLoading={isLoading}/>
        </div>
        </>
    )
}