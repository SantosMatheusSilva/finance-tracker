import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { LoginForm, loginFormSchema } from '@/app/lib/db/schemas/userSchemas';
import bcrypt from 'bcrypt';
import { queryDb } from '@/app/lib/db/neondb';



async function getUser(email: string): Promise< LoginForm | undefined> {
    try {
      const user = await queryDb`SELECT * FROM users WHERE email=${email}`;
      return user[0] as LoginForm | undefined;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
          const parsedCredentials = loginFormSchema.safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) return user;
          }
          
          console.log('Invalid credentials');
          return null;
           
        },
      }),
  ],
});