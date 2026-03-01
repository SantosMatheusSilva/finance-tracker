// lib/auth.ts
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export function auth() {
  return getServerSession(authOptions);
}

export async function getUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  return session.user.id;
}