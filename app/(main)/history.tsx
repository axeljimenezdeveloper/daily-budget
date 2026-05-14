// ============================================================================
// PANTALLA DE HISTORIAL DE GASTOS
//
// Punto de entrada de la funcionalidad de historial.
// Consume los componentes del template history y los hooks correspondientes.
// Obtiene los datos reales del store (useVaultStore) y gestiona la eliminación
// de gastos con confirmación modal y feedback visual mediante toasts.
// ============================================================================

import React from 'react';

// ----------------------------------------------------------------------------
// COMPONENTES DEL TEMPLATE HISTORY
// ----------------------------------------------------------------------------
import { HistoryLayout } from '@/components/templates/history/components/layout/HistoryLayout';
import { ExpensesList } from '@/components/templates/history/components/sections/ExpensesList';
import { EmptyState } from '@/components/templates/history/components/sections/EmptyState';
import { DeleteModal } from '@/components/templates/history/components/modals/DeleteModal';

// ----------------------------------------------------------------------------
// HOOKS DEL TEMPLATE HISTORY (implementaciones reales)
// ----------------------------------------------------------------------------
import { useHistory } from '@/components/templates/history/hooks/useHistory';
import { useExpenseDelete } from '@/components/templates/history/hooks/useExpenseDelete';

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

  return (
    <HistoryLayout>
      {/* Mostrar lista de gastos si existen, de lo contrario estado vacío */}
      {!hasTransactions ? (
        <EmptyState />
      ) : (
        <ExpensesList
          groupedExpenses={groupedExpenses}
          currency={currency}
          onDeletePress={openDeleteModal}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </HistoryLayout>
  );
}