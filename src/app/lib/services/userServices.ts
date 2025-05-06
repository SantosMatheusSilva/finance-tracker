'use server';
 
import { signIn } from 'auth';
import { AuthError } from 'next-auth';
import { insertUser } from '../db/mutations/user';
import { queryDb } from '../db/neondb';
import { User } from '../db/schemas/userSchemas';

type AuthFormState =  {
  success: true; redirectTo: string;
} | {
  success: false; error: string;
};

 
export async function authenticate(
  prevState: AuthFormState | undefined,
  formData: FormData,
): Promise<AuthFormState> {
  try {
    const res = await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password'),
    });
    
    if (res?.error) {
      console.error('Sign in error:', res.error);
      return { success: false, error: 'Invalid credentials' };
    }
 
    const email = formData.get('email')?.toString() ?? '';
    const result = await queryDb`SELECT * FROM users WHERE email=${email}`;
    const user = result[0] as User | undefined;
    if (!user || !user.user_id) {
      console.error('User not found:', res?.user?.email);
      return { success: false, error: 'User not found' };
    }

    return {
      success: true,
      redirectTo: `/dashboard/${user.user_id}/`,
    }

  } catch (error: Error | unknown) {
    console.error('Error during sign in:', error);
    if ((error as AuthError).type?.startsWith('NEXT_REDIRECT')) throw error;
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid credentials' };
        default:
          return { success: false, error: 'An unknown error occurred.' };
      }
    }
    return { success: false, error : 'An unknown error occurred.' };
  }
}

export async function createUser (prevState:{ message: string; errors?: object | undefined} | {error: string}, formData: FormData) {
  try{
    const user = await insertUser(formData);
    if(user && user.message === 'User created successfully') {
      return user 
    }
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user'};
  }
}