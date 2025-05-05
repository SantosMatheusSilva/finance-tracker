'use server';

import { queryDb } from "../neondb";
import {  
    createUserSchema 
} from "../schemas/userSchemas";
//import { redirect } from "next/navigation";
import  bcrypt  from "bcrypt";

export async function insertUser(formdata: FormData): Promise<{ message: string; errors?: object}> {
    try {
        // First validate the data from the form fields
        const validatedForm = createUserSchema.safeParse({
            username: formdata.get('username'),
            email: formdata.get('email'),
            password: formdata.get('password'),
            confirmPassword: formdata.get('confirmPassword'),
        });

        // If the validation fails, return erros, otherwise, continue
        if (!validatedForm.success) {
            return { message: 'Validation failed', errors: validatedForm.error };    
        }
        // Check if the email already exists
        const existingUser = await queryDb`SELECT * FROM users WHERE email=${validatedForm.data.email}`;
        if (existingUser.length > 0) {
            return { message: 'Email already exists' };
        }
        // Check if the passwords match
        if (validatedForm.data.password !== validatedForm.data.confirmPassword) {
            return { message: 'Passwords do not match' };
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(validatedForm.data.password, 10);
        // Update the validatedForm data with the hashed password
        validatedForm.data.password = hashedPassword;
        // Prepare data for insertion
        const {
            username, 
            email, 
            password = hashedPassword,
        } = validatedForm.data;
        // Insertion block TRY
        await queryDb`
        INSERT INTO users (
            username,
            email,
            password_hash
        ) VALUES (
            ${username},
            ${email},
            ${password}
        )`;
        console.log('User inserted successfully');
        
        // Insertion block CATCH
        } catch (error) {
            console.error('Failed to insert user:', error);
            return { message: 'Failed to insert user' };
        }

        // Return success message
        return (
            {
                message: 'User created successfully',
            }
        ) 
}