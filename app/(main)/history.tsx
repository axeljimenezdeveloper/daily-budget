// ============================================================================
// PANTALLA DE HISTORIAL DE GASTOS - CARGA INFINITA
//
// Punto de entrada de la funcionalidad de historial.
// Consume los componentes del template history y los hooks correspondientes.
// Obtiene los datos reales del store (useVaultStore) y gestiona la eliminación
// de gastos con confirmación modal y feedback visual mediante toasts.
// Ahora también permite ver el detalle completo de un gasto al presionar la fila
// y editar un gasto mediante el modal de edición.
//
// IMPLEMENTA CARGA INFINITA (FlatList con onEndReached) para mejorar el
// rendimiento con muchos gastos.
//
// IMPORTANTE: Los modales (DeleteModal, ExpenseDetailModal y EditExpenseModal)
// se renderizan FUERA de HistoryLayout para evitar problemas de posicionamiento
// (centrado incorrecto). Este mismo patrón se usa en settings.tsx y funciona correctamente.
// ============================================================================

import React, { useState } from 'react';

// ----------------------------------------------------------------------------
// COMPONENTES DEL TEMPLATE HISTORY
// ----------------------------------------------------------------------------
import { HistoryLayout } from '@/components/templates/history/components/layout/HistoryLayout';
import { ExpensesList } from '@/components/templates/history/components/sections/ExpensesList';
import { EmptyState } from '@/components/templates/history/components/sections/EmptyState';
import { DeleteModal } from '@/components/templates/history/components/modals/DeleteModal';
import { ExpenseDetailModal } from '@/components/templates/history/components/modals/ExpenseDetailModal';
import { EditExpenseModal } from '@/components/templates/history/components/modals/EditExpenseModal';

// ----------------------------------------------------------------------------
// HOOKS DEL TEMPLATE HISTORY (implementaciones reales)
// ----------------------------------------------------------------------------
import { useHistory } from '@/components/templates/history/hooks/useHistory';
import { usePaginatedHistory } from '@/components/templates/history/hooks/usePaginatedHistory';
import { useExpenseDelete } from '@/components/templates/history/hooks/useExpenseDelete';

// ----------------------------------------------------------------------------
// TIPOS DEL STORE
// ----------------------------------------------------------------------------
import { Transaction } from '@/store/useVaultStore/index.types';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export default function HistoryScreen() {
  // Obtener datos agrupados y moneda desde el store
  const { groupedExpenses, currency, hasTransactions } = useHistory();

  // Paginación (carga infinita)
  const {
    paginatedGroups,
    loadMore,
    hasMore,
    isLoadingMore,
  } = usePaginatedHistory(groupedExpenses);

  // Lógica de eliminación (modal, confirmación, toast)
  const {
    showDeleteModal,
    openDeleteModal,
    confirmDelete,
    cancelDelete,
  } = useExpenseDelete();

  // --------------------------------------------------------------------------
  // ESTADO PARA EL MODAL DE DETALLE
  // --------------------------------------------------------------------------
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // --------------------------------------------------------------------------
  // ESTADO PARA EL MODAL DE EDICIÓN
  // --------------------------------------------------------------------------
  const [selectedEditTransaction, setSelectedEditTransaction] = useState<Transaction | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // --------------------------------------------------------------------------
  // FUNCIONES PARA ABRIR MODALES
  // --------------------------------------------------------------------------
  const openDetailModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  const openEditModal = (transaction: Transaction) => {
    setSelectedEditTransaction(transaction);
    setIsEditModalOpen(true);
  };

  // --------------------------------------------------------------------------
  // RENDERIZADO CONDICIONAL (sin gastos)
  // --------------------------------------------------------------------------
  if (!hasTransactions) {
    return (
      <>
        <HistoryLayout>
          <EmptyState />
        </HistoryLayout>
        {/* Los modales se renderizan igual aunque no haya gastos (no se abrirán) */}
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
        <EditExpenseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          transaction={selectedEditTransaction}
          currency={currency}
        />
      </>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER CON CARGA INFINITA (FlatList)
  // --------------------------------------------------------------------------
  return (
    <>
      <HistoryLayout
        flatListData={paginatedGroups}
        renderGroup={(group) => (
          <ExpensesList
            singleGroup={group}
            currency={currency}
            onDeletePress={openDeleteModal}
            onDetailPress={openDetailModal}
            onEditPress={openEditModal}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />

      {/* Modal de detalle del gasto */}
      <ExpenseDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        transaction={selectedTransaction}
        currency={currency}
      />

      {/* Modal de edición del gasto */}
      <EditExpenseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        transaction={selectedEditTransaction}
        currency={currency}
      />
    </>
  );
}