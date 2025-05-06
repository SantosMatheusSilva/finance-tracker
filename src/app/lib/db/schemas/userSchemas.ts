import { z } from 'zod'; 

// USER SCHEMAS 

// Schema to create a user
export const createUserSchema = z.object({
    username: z.string().min(3, {message: 'Username must be at least 3 characters long' }).max(20, { message: 'Username must be at most 20 characters long' }),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

// CreateUser type infered from zod createUserSchema
export type CreateUser = z.infer<typeof createUserSchema>;


// Schema to update a user
export const updateUserSchema = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    confirmPassword: z.string().min(6).optional(),
});

// UpdateUser type infered from zod updateUserSchema
export type UpdateUser = z.infer<typeof updateUserSchema>;

// Schema to get a User 
export const userSchema = z.object({
    user_id: z.number(),
    username: z.string(),
    email: z.string().email(),
    password_hash: z.string(),
    created_at: z.string().date(),
});

// User type infered from zod userSchema
export type User = z.infer<typeof userSchema>;
export type SessionUser = Omit<User, 'password_hash'>;

// LOGIN FORM 

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// LoginForm type infered from zod loginFormSchema  
export type LoginForm = z.infer<typeof loginFormSchema>;


// SIGNUP FORM 

export const signupFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
});

// SignupForm type infered from zod signupFormSchema
export type SignupForm = z.infer<typeof signupFormSchema>;