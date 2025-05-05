/* import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/dashboard/:path*'],
};  */
import { auth } from 'auth';

export default auth((req) => {
  // Optional: Add custom logic
  if (!req.auth) {
    // Handle unauthenticated requests
  }
});

export const config = {
  matcher: ['/dashboard/:path*'],
};