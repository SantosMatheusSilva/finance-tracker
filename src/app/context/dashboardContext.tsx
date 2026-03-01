'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardContextType {
  refreshTrigger: number;
  refreshDashboard: () => void;
  refreshTransactions: () => void;
  refreshAccounts: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshDashboard = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const refreshTransactions = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const refreshAccounts = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <DashboardContext.Provider value={{
      refreshTrigger,
      refreshDashboard,
      refreshTransactions,
      refreshAccounts,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}; 