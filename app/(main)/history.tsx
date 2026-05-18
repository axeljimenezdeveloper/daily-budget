// ============================================================================
// PANTALLA DE HISTORIAL DE GASTOS (CORREGIDA)
// ============================================================================

import React, { useState } from 'react';
import { HistoryLayout } from '@/components/templates/history/components/layout/HistoryLayout';
import { ExpensesList } from '@/components/templates/history/components/sections/ExpensesList';
import { EmptyState } from '@/components/templates/history/components/sections/EmptyState';
import { DeleteModal } from '@/components/templates/history/components/modals/DeleteModal';
import { ExpenseDetailModal } from '@/components/templates/history/components/modals/ExpenseDetailModal';
import { useHistory } from '@/components/templates/history/hooks/useHistory';
import { useExpenseDelete } from '@/components/templates/history/hooks/useExpenseDelete';
import { Transaction } from '@/store/useVaultStore/index.types';

export default function HistoryScreen() {
  const { groupedExpenses, currency, hasTransactions } = useHistory();
  const { showDeleteModal, openDeleteModal, confirmDelete, cancelDelete } = useExpenseDelete();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openDetailModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      {/* Layout principal (ahora solo contiene el contenido de la pantalla) */}
      <HistoryLayout>
        {!hasTransactions ? (
          <EmptyState />
        ) : (
          <ExpensesList
            groupedExpenses={groupedExpenses}
            currency={currency}
            onDeletePress={openDeleteModal}
            onDetailPress={openDetailModal}
          />
        )}
      </HistoryLayout>

      {/* Modales fuera del layout, al mismo nivel */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />

      <ExpenseDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        transaction={selectedTransaction}
        currency={currency}
      />
    </>
  );
}