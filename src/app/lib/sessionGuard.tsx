'use client';

import { ReactNode } from 'react';
import { useUser } from '@/app/context/sessionDataProvider';

export function SessionGuard({ children }: { children: ReactNode }) {
  const { sessionUser, routeUserId } = useUser();

  // Still loading session or route context
  if (!sessionUser || routeUserId === undefined) {
    return <div>Loading user context...</div>;
  }

  const isOwner = sessionUser.user_id == routeUserId;

  if (!isOwner) {
    return (
      <div className="text-red-500 font-semibold p-4">
        Access denied: You&apos;re not allowed here.
      </div>
    );
  }

  return <>{children}</>;
}