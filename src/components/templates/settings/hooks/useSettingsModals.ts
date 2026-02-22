// ============================================================================
// HOOK PERSONALIZADO: useSettingsModals
//
// Encapsula la lógica de modales de la pantalla de ajustes:
// - Modal de selección de idioma
// - Modal de confirmación de reinicio
// Proporciona estados booleanos y manejadores para abrir/cerrar y confirmar.
// ============================================================================

import { useState, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useSettingsStore } from './useSettingsStore';
import { ROUTES } from '@/constants/navigation';

export const useSettingsModals = () => {
  const router = useRouter();
  const { setLanguage, resetVault } = useSettingsStore();

  // Estados de modales
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Manejador para seleccionar idioma
  const handleLanguageSelect = useCallback((lang: 'es' | 'en') => {
    setLanguage(lang);
    setShowLanguageModal(false);
  }, [setLanguage]);

  // Manejador para confirmar reinicio
  const handleResetConfirm = useCallback(() => {
    resetVault();
    setShowResetModal(false);
    router.replace(ROUTES.WELCOME.ONBOARDING1);
    // No se muestra toast porque la acción redirige inmediatamente
  }, [resetVault, router]);

  return {
    showLanguageModal,
    setShowLanguageModal,
    showResetModal,
    setShowResetModal,
    handleLanguageSelect,
    handleResetConfirm,
  };
};