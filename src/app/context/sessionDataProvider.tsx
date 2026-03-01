'use client';

import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SessionUser } from '@/app/lib/db/schemas/userSchemas';

// Define the context shape
interface SessionDataContextType {
  sessionUser: SessionUser;
}

// Create the context
const SessionDataContext = createContext<SessionDataContextType | null>(null);

// Custom hook to consume the context
export const useUser = () => {
  const context = useContext(SessionDataContext);
  if (!context) throw new Error('useUser must be used within a SessionDataProvider');

  return context;
};

// Provider component
export const SessionDataProvider = ({

  children,
}: {
  userId: number;
  children: ReactNode;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;
  if (!session?.user) return null; // Handles brief undefined session edge case

  return (
    <SessionDataContext.Provider
      value={{
        sessionUser: session.user as SessionUser,
      }}
    >
      {children}
    </SessionDataContext.Provider>
  );
};