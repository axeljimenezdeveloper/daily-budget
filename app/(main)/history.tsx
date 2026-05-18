// ============================================================================
// PANTALLA DE HISTORIAL DE GASTOS
//
// Punto de entrada de la funcionalidad de historial.
// Consume los componentes del template history y los hooks correspondientes.
// Obtiene los datos reales del store (useVaultStore) y gestiona la eliminación
// de gastos con confirmación modal y feedback visual mediante toasts.
// Ahora también permite ver el detalle completo de un gasto al presionar la fila.
//
// IMPORTANTE: Los modales (DeleteModal y ExpenseDetailModal) se renderizan
// FUERA de HistoryLayout para evitar problemas de posicionamiento (centrado
// incorrecto). Este mismo patrón se usa en settings.tsx y funciona correctamente.
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

// ----------------------------------------------------------------------------
// HOOKS DEL TEMPLATE HISTORY (implementaciones reales)
// ----------------------------------------------------------------------------
import { useHistory } from '@/components/templates/history/hooks/useHistory';
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
  // FUNCIÓN PARA ABRIR EL MODAL DE DETALLE
  // --------------------------------------------------------------------------
  const openDetailModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  return (
    <>
      {/* --------------------------------------------------------------------
        LAYOUT PRINCIPAL (SOLO CONTENIDO DE LA PANTALLA)
      -------------------------------------------------------------------- */}
      <HistoryLayout>
        {/* Mostrar lista de gastos si existen, de lo contrario estado vacío */}
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

      {/* --------------------------------------------------------------------
        MODALES (FUERA DEL LAYOUT PARA EVITAR PROBLEMAS DE POSICIONAMIENTO)
        Nota: Se renderizan al mismo nivel que HistoryLayout, igual que en
        settings.tsx. Esto asegura que AppOverlay ocupe toda la pantalla y
        AppModal pueda alinear su contenido al fondo correctamente.
      -------------------------------------------------------------------- */}

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
    </>
  );
}