
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
//import type { NextAuthConfig } from 'next-auth';
import { loginFormSchema, User } from '@/app/lib/db/schemas/userSchemas';
import { queryDb } from '@/app/lib/db/neondb';
import bcrypt from 'bcryptjs';
import { authConfig } from '@/auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await queryDb`SELECT * FROM users WHERE email=${email}`;
    return user[0] as User | undefined;
  } catch (err) {
    console.error('DB error:', err);
    return undefined;
  }
}
 export const authOptions = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text'},
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('authorize() called with credentials:', credentials)

        const parsed = loginFormSchema.safeParse(credentials);
        if (!parsed.success) {
          console.log('Invalid credentials format');
          return null;
        }

        const { email, password } = parsed.data;

        const user = await getUser(email);
        if (!user) {
          console.log('User not found');
          return null;
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
          console.log('Invalid password');
          return null;
        }

        console.log('User authenticated successfully:', user.email);

        return user as any;
      },
    }),
  ],
  callbacks: {
     async jwt({ token, user } : { token: any; user: any }) {
      if (user) {
        console.log('JWT callback - user:', user);
        token.user_id = user.user_id;
        token.name = user.username;
        token.email = user.email;
        token.created_at = user.created_at;
        console.log('JWT callback - token after update:', token);
      }
      return token;
    },

  async session({ session, token } : { session: any; token: any }) {
      console.log('Session callback - token:', token);
      if (token) {
        session.user = {
          user_id: token.user_id || parseInt(token.sub as string),
          username: token.name,
          email: token.email as string,
          emailVerified: token.emailVerified || null,
          created_at: token.created_at || null,
        };
        console.log('Session callback - session.user:', session.user);
      }
      return session;
    },
  },
  
};

export const {
  auth,  // For middleware/server components
  signIn,
  signOut,
} = NextAuth(authOptions);

// For direct usage in server components
export default NextAuth(authOptions);

export const handlers = {
  GET: NextAuth(authOptions),
  POST: NextAuth(authOptions),
};

