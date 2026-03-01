import type { NextAuthOptions } from "next-auth";

export const authConfig: NextAuthOptions = {
  providers: [],
  debug: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Error page URL
    newUser: "/dashboard", // New user redirect URL
  },
  session: {
    strategy: "jwt" as const,
    /*  maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours */
  },
};
