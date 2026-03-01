'use client';

import { useTransactionModal } from '../../../context/transactionModalContext';
import AddTransactionModal from '@/app/ui/dashboard/Transactions/add-transaction-modal';

export default function ModalWrapper() {
  const { isOpen, openModal, closeModal } = useTransactionModal();

  return (
    <AddTransactionModal
    isOpen={isOpen}
    onOpenChange={(open) => (open ? openModal() : closeModal())}
    onCloseAction={closeModal}
    onOpenChangeAction={closeModal}
    >
      <div></div>
    </AddTransactionModal>
  );
}