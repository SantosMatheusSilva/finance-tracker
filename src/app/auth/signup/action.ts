'use server'

import { insertUser } from "@/app/lib/db/mutations/user"

export async function signup(_:unknown, formData: FormData) {
  try {
    const result = await insertUser(formData);
    console.log('signup result', result);
    if (result.errors ) {
        return { success: false, error: result.message, errors: result.errors };
    } 
    
    return { success: true };
    
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }

  
}