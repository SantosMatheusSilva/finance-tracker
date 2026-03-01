'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type TransactionModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const TransactionModalContext = createContext<TransactionModalContextType | null>(null);

export const useTransactionModal = () => {
  const context = useContext(TransactionModalContext);
  if (!context) throw new Error('useTransactionModal must be used within a TransactionModalProvider');
  return context;
};

export function TransactionModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <TransactionModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </TransactionModalContext.Provider>
  );
}