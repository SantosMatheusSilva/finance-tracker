import type { NextAuthConfig}   from 'next-auth';
 
export const authConfig = {
  debug: true,
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
   /*  maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours */
  },
  providers: [],
} satisfies  NextAuthConfig;

