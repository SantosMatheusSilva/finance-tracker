'use client';

import { ReactNode } from 'react';
import { useUser } from '@/app/context/sessionDataProvider';

export function SessionGuard({ children }: { children: ReactNode }) {
  const { sessionUser } = useUser();

  // Still loading session
  if (sessionUser === undefined) {
    return <div>Loading user context...</div>;
  }

  if (!sessionUser) {
    return (
      <div className="text-red-500 font-semibold p-4">
        Access denied: You&apos;re not allowed here.
      </div>
    );
  }

  return <>{children}</>;
}