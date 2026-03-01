'use server'

import { signIn } from '@/auth'
import  AuthError  from 'next-auth'
//import { queryDb } from '@/app/lib/db/neondb'

export async function login(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', {
      redirect: false,
      email: formData.get('email')?.toString(),
      password: formData.get('password')?.toString(),
      callbackUrl: '/dashboard',
    });
    return '__REDIRECT__';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}