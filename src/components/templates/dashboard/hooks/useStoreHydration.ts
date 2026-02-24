// ============================================================================
// HOOK PERSONALIZADO: useStoreHydration
// ============================================================================
// Proporciona un booleano que indica si el store global (useVaultStore) ya ha
// sido hidratado desde AsyncStorage. Útil para mostrar pantallas de carga
// mientras se restauran los datos persistidos.
//
// Uso típico:
//   const hydrated = useStoreHydration();
//   if (!hydrated) return <LoadingSpinner />;
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useVaultStore } from '@/store/useVaultStore';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Hook que indica si el store ya ha sido hidratado desde AsyncStorage.
 *
 * @returns {boolean} - `true` si el store está hidratado, `false` en caso contrario.
 */
export const useStoreHydration = (): boolean => {
  // Suscripción directa al flag _hasHydrated.
  // Este valor es actualizado por el store durante el proceso de rehidratación.
  return useVaultStore((state) => state._hasHydrated);
};