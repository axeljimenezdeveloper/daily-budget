// ============================================================================
// HOOK PERSONALIZADO: useExpenseDelete
//
// Encapsula la lógica de eliminación de gastos en el historial.
// Gestiona el estado del modal de confirmación, el identificador del gasto
// seleccionado, y la llamada al store para eliminar la transacción.
// Proporciona feedback visual mediante toasts (éxito/error).
// ============================================================================

import { useState, useCallback } from 'react';
import { useVaultStore } from '@/store/useVaultStore';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Hook que gestiona la eliminación de un gasto con confirmación modal.
 *
 * @returns Objeto con:
 *   - showDeleteModal: boolean - Controla la visibilidad del modal.
 *   - selectedExpenseId: string | null - ID del gasto a eliminar.
 *   - openDeleteModal: (id: string) => void - Abre el modal para un gasto.
 *   - confirmDelete: () => Promise<void> - Ejecuta la eliminación y cierra modal.
 *   - cancelDelete: () => void - Cierra el modal sin eliminar.
 */
export const useExpenseDelete = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const deleteTransaction = useVaultStore((state) => state.deleteTransaction);

  // --------------------------------------------------------------------------
  // ESTADOS DEL MODAL
  // --------------------------------------------------------------------------
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // FUNCIONES PARA ABRIR, CONFIRMAR Y CANCELAR
  // --------------------------------------------------------------------------

  /**
   * Abre el modal de confirmación para eliminar un gasto específico.
   * @param id - Identificador único de la transacción a eliminar.
   */
  const openDeleteModal = useCallback((id: string) => {
    setSelectedExpenseId(id);
    setShowDeleteModal(true);
  }, []);

  /**
   * Cierra el modal sin realizar ninguna eliminación.
   */
  const cancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setSelectedExpenseId(null);
  }, []);

  /**
   * Confirma la eliminación del gasto seleccionado.
   * Llama a la acción deleteTransaction del store y muestra feedback.
   */
  const confirmDelete = useCallback(async () => {
    if (!selectedExpenseId) return;

    try {
      deleteTransaction(selectedExpenseId);
      toast.success(t('history.delete.success'));
    } catch (error) {
      console.error('[useExpenseDelete] Error al eliminar:', error);
      toast.error(t('history.delete.error'));
    } finally {
      setShowDeleteModal(false);
      setSelectedExpenseId(null);
    }
  }, [selectedExpenseId, deleteTransaction, toast, t]);

  return {
    showDeleteModal,
    selectedExpenseId,
    openDeleteModal,
    confirmDelete,
    cancelDelete,
  };
};