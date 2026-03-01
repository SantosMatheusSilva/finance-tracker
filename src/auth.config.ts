//import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  debug: true,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error', // Error page URL
    newUser: '/dashboard', // New user redirect URL
  }, 
   callbacks: {
    authorized({ auth, request }: any) {
      const isLoggedIn = !!auth?.user;
  const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isOnDashboard) {
    return isLoggedIn;
  }

  // Don't redirect away from /auth/login or other public pages
  return true;
},
  }, 
  session: {
    strategy: "jwt" as const,
   /*  maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours */
  },
}

