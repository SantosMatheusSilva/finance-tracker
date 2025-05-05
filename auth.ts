// lib/auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
//import type { NextAuthConfig } from 'next-auth';
import { loginFormSchema, User } from '@/app/lib/db/schemas/userSchemas';
import { queryDb } from '@/app/lib/db/neondb';
import bcrypt from 'bcrypt';
import { authConfig } from 'auth.config';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await queryDb`SELECT * FROM users WHERE email=${email}`;
    return user[0] as User | undefined;
  } catch (err) {
    console.error('DB error:', err);
    return undefined;
  }
}

const authOptions = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginFormSchema.safeParse(credentials);
        if (!parsed.success) {
          console.log('Invalid credentials format');
          return null;
        }

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return null;

        return {
          user_id: user.user_id.toString(),
          username: user.username,
          email: user.email,
          createdAt: user.created_at,
        };
      },
    }),
  ],
  callbacks: {
     async jwt({ token, user } : { token: any; user: any }) {
      if (user) {
        token.id = user.user_id;
        token.name = user.username;
        token.email = user.email;
        token.createdAt = user.createdAt;
      }
      return token;
    },

  async session({ session, token } : { session: any; token: any }) {
      if (token) {
        session.user = {
          user_id: token.id as string,
          username: token.name,
          email: token.email as string,
          emailVerified: token.emailVerified as Date,
          createdAt: token.createdAt as Date,
        };
      }
      return session;
    },
  },
  
};

export const {
  auth,  // For middleware/server components
  signIn,
  signOut,
  handlers,  // For API routes
} = NextAuth(authOptions);

// For direct usage in server components
export default NextAuth(authOptions);

