import { z } from 'zod'; 

// USER SCHEMAS 

// Schema to create a user
export const createUserSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
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
    created_at: z.string().date(),
});

// User type infered from zod userSchema
export type User = z.infer<typeof userSchema>;

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