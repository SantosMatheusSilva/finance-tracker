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
    
}
