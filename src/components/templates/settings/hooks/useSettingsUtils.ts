// ============================================================================
// HOOK PERSONALIZADO: useSettingsUtils
//
// Proporciona utilidades y cálculos derivados para la pantalla de ajustes:
// - Cálculo de días transcurridos y restantes
// - Manejador para "Editar plan" (toast informativo)
// ============================================================================

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/useToast';
import { useSettingsStore } from './useSettingsStore';
import { calculateDaysPassed } from '@/store/useVaultStore/index.utils';

export const useSettingsUtils = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { startDate, daysDuration } = useSettingsStore();

  // --------------------------------------------------------------------------
  // Cálculos derivados
  // --------------------------------------------------------------------------
  const daysPassed = calculateDaysPassed(startDate);
  const remainingDays = Math.max(0, daysDuration - daysPassed);

  // --------------------------------------------------------------------------
  // Manejadores
  // --------------------------------------------------------------------------
  const handleEditPlan = useCallback(() => {
    toast.info(t('settings.coming_soon', 'Funcionalidad próxima'));
  }, [toast, t]);

  return {
    remainingDays,
    daysPassed,
    handleEditPlan,
  };
};