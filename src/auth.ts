import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//import type { NextAuthConfig } from 'next-auth';
import { loginFormSchema, User } from "@/app/lib/db/schemas/userSchemas";
import { queryDb } from "@/app/lib/db/neondb";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";
import type { NextAuthOptions } from "next-auth";

export async function getUser(email: string): Promise<User | null> {
  try {
    const users = await queryDb<
      User[]
    >`SELECT * FROM users WHERE email=${email}`;
    if (!users || users.length === 0) return null;
    return users[0] as unknown as User;
  } catch (err) {
    console.error("DB error:", err);
    return null;
  }
}
export const authOptions: NextAuthOptions = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorize() called with credentials:", credentials);

        const parsed = loginFormSchema.safeParse(credentials);
        if (!parsed.success) {
          console.log("Invalid credentials format");
          return null;
        }

        const { email, password } = parsed.data;

        const user = await getUser(email);
        if (!user) {
          console.log("User not found");
          return null;
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
          console.log("Invalid password");
          return null;
        }

        console.log("User authenticated successfully:", user.email);

        return {
          id: String(user.user_id),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<Record<string, unknown>> {
      if (user) {
        console.log("JWT callback - user:", user);
        token.id = String(user.id);
        //token.user_id = Number(user.user_id);
        //token.name = user.username;
        token.email = user.email;
        //token.created_at = user.created_at;
        console.log("JWT callback - token after update:", token);
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session callback - token:", token);
      if (session.user) {
        //session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }

      return session;
    },
  },
};

export const {
  auth, // For middleware/server components
  signIn,
  signOut,
} = NextAuth(authOptions);

// For direct usage in server components
export default NextAuth(authOptions);

export const handlers = {
  GET: NextAuth(authOptions),
  POST: NextAuth(authOptions),
};
