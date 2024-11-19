// This files contains data definitions for the app data 
// It describes the shape and type of data that each property should acept


// User interaction types
export type User = {
    id: string,
    name: string,
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
    user_id: string,
    account_name: string,
    account_type: 'cash' | 'bank' | 'credit card' | 'investment' ,
    balance: number,
    currency?: string,
}

export type UpdateAccount = {
    account_name?: string,
    account_type?: 'cash' | 'bank' | 'credit card' | 'investment' ,
    balance?: number,
    currency?: string,
}

export type Account = {
    id: string,
    user_id: string,
    account_name: string,
    account_type: 'cash' | 'bank' | 'credit card' | 'investment' ,
    balance: number,
    currency?: string,
    created_at: Date
}

// Transactions types 
export type TransactionType = 'income' | 'expense'
export type ExpenseCategory = 'health' | 'food' | 'education' | 'housing' | 'transport' | 'entertaiment' | 'utilities' | 'other'
export type IncomeCategory = 'salary' | 'extra work' | 'investents' | 'gift' | 'other'

export type CreateTransaction = {
    user_id: string,
    account_id: string,
    amount: number,
    transaction_type: TransactionType,
    transaction_category: ExpenseCategory | IncomeCategory,
    description?: string,
    transaction_date: Date
}

export type Transactions = CreateTransaction & {
    transaction_id: string
}

// Recurring transactions types 
type DayOfMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
type WeekDays = 'monday' | 'tuesday' | 'weednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type CreateRecurringTransaction = {
    user_id: string,
    account_id: string,
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
 
export type UpdateRecurringTransaction = {
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
}

export type RecurringTransaction = CreateRecurringTransaction & {
    recurring_id: string,
    last_executed: Date
}


// Budgets types
export type CreateBudget = {
    user_id: string,
    budget_category: ExpenseCategory | IncomeCategory,
    amount: number,
    start_date: Date,
    end_date: Date,
}

export type UpdateBudget = {
    budget_category?: ExpenseCategory | IncomeCategory,
    amount?: number,
    start_date?: Date,
    end_date?: Date
}

export type Budget = CreateBudget & {
    budget_id: string,
    status: string,
    created_at: Date
}

// Goals types 
export type CreateGoal = {
    user_id: string,
    goal_categoty: 'savings' | 'investment' | 'debt' | 'purchase' | 'lifestyle' | 'family' | 'business' | 'vacations' | 'other'
    goal_name: string,
    description?: string,
    target_amount: string,
    deadline: Date
}

export type UpdateGoal = {
    goal_categoty?: 'savings' | 'investment' | 'debt' | 'purchase' | 'lifestyle' | 'family' | 'business' | 'vacations' | 'other',
    goal_name?: string,
    description?: string,
    target_amount?: string,
    deadline?: Date
}

export type Goal = CreateGoal & {
    goal_id: string,
    status: string,
    created_at: Date,
}
