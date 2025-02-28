// This files contains data definitions for the app data 
// It describes the shape and type of data that each property should acept


// User interaction types
export type User = {
    user_id: number,
    username: string,
    email: string,
    password: string
}

export type SignupForm = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export type LoginForm = {
    email: string,
    password: string
}

export type UpdateProfileForm = {
    name?: string,
    email?: string,
}

// Accounts types 
export type CreateAccount = {
    user_id: number,
    account_name: string,
    account_type: 'cash' | 'bank' | 'credit card' | 'investment' ,
    balance: number,
    currency?: string, // ------> update the accounts table to have enum for usd, eur, gbp. and default to eur.
}

export type UpdateAccount = {
    account_name?: string,
    account_type?: 'cash' | 'bank' | 'credit card' | 'investment' ,
    balance?: number,
    currency?: string,
}

export type Account = {
    account_id: number,
    user_id: number,
    account_name: string,
    account_type: 'cash' | 'bank' | 'credit card' | 'investment' ,
    balance: number,
    currency?: string,
    created_at: Date
}

// Transactions types 
export type TransactionType = 'Income' | 'Expense'
export type ExpenseCategory = 'health' | 'food' | 'education' | 'housing' | 'transport' | 'entertaiment' | 'utilities' | 'other'
export type IncomeCategory = 'salary' | 'extra work' | 'investents' | 'gift' | 'other'


export type CreateTransaction = {
    user_id: number,
    account_id: number,
    amount: number,
    transaction_type: TransactionType,
    transaction_category: ExpenseCategory | IncomeCategory,
    description?: string,
    transaction_date: Date
}

export type Transactions = {
    transaction_id: number,
    user_id: number,
    account_id: number,
    account_name: string,
    amount: number,
    transaction_type: TransactionType,
    transaction_category: ExpenseCategory | IncomeCategory,
    description?: string,
    transaction_date: Date
}

// expense transaction 
export type ExpenseTransactionForm = {
    user_id: number,
    account_id: number,
    amount: number,
    transaction_type: 'Expense',
    expense_category: ExpenseCategory,
    income_category: never,
    description: string,
    transaction_date: Date
}
export type ExpenseTransactions = {
    transaction_id: number,
    user_id: number,
    account_id: number,
    amount: number,
    transaction_type: 'Expense',
    category: ExpenseCategory, // for especifc transactions type queries this field is casted as 'category'.
    income_category: never,
    description: string,
    transaction_date: Date
}

// income transaction
export type IncomeTrasactionForm = {
    user_id: number,
    account_id: number,
    amount: number,
    transaction_type: 'Income',
    income_category: IncomeCategory,
    expense_category: never,
    description: string,
    transaction_date: Date
}

export type IncomeTransactions = {
    transaction_id: number,
    user_id: number,
    account_id: number,
    amount: number,
    transaction_type: 'Income',
    category: IncomeCategory, // for especifc transactions type queries this field is casted as 'category'.
    expense_category: never,
    description: string,
    transaction_date: Date
}



// Recurring transactions types 
export type DayOfMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
export type WeekDays = 'monday' | 'tuesday' | 'weednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type CreateRecurringTransaction = {
    user_id: number,
    account_id: number,
    amount: number,
    transaction_type: TransactionType,
    transaction_category: ExpenseCategory | IncomeCategory,
    description?: string,
    start_date: Date,
    end_date?: Date,
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly',
    execution_day?: DayOfMonth | null,
    day_of_week?: WeekDays | null,
    execution_date?: Date | null
}
 
/* export type UpdateRecurringTransaction = {
    account_id?: string,
    amount?: number,
    transaction_type?: TransactionType,
    transaction_category?: ExpenseCategory | IncomeCategory,
    description?: string,
    start_date?: Date,
    end_date?: Date,
    frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly',
    execution_day?: DayOfMonth | null,
    day_of_week?: WeekDays | null,
    execution_date?: Date | null
} */

export type RecurringTransaction = CreateRecurringTransaction & {
    recurring_id: number,
    last_executed: Date
}


// Budgets types
export type CreateBudget = {
    user_id: number,
    expense_category: ExpenseCategory,
    income_category: never,
    budget_amount: number,
    period_start: Date,
    period_end: Date,
}

export type UpdateBudget = {
    budget_category?: ExpenseCategory | IncomeCategory,
    amount?: number,
    start_date?: Date,
    end_date?: Date
}

export type Budget = CreateBudget & {
    budget_id: number,
    category: ExpenseCategory, // <---
    status: string,
    created_at: Date
}

// Goals types 
export type CreateGoal = {
    user_id: number,
    income_category: 'savings' | 'investment' | 'debt' | 'purchase' | 'lifestyle' | 'family' | 'business' | 'vacations' | 'other',
    expense_category: never,
    goal_name: string,
    description?: string,
    target_amount: string,
    deadline: Date
}

export type UpdateGoal = {
    category?: 'savings' | 'investment' | 'debt' | 'purchase' | 'lifestyle' | 'family' | 'business' | 'vacations' | 'other',
    goal_name?: string,
    description?: string,
    target_amount?: string,
    deadline?: Date
}

export type Goal = CreateGoal & {
    goal_id: number,
    status: string,
    created_at: Date,
    current_amount: number
}
