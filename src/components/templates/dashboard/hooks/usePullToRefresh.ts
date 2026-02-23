// ============================================================================
// HOOK PERSONALIZADO: usePullToRefresh
//
// Encapsula la lógica de pull-to-refresh para la pantalla principal.
// Proporciona el estado de refresco y la función para disparar la acción,
// incluyendo feedback háptico y una simulación de recarga (retraso breve).
//
// Aunque los datos del dashboard ya están en el store y no requieren
// sincronización remota, este hook ofrece una experiencia de usuario
// satisfactoria al actualizar visualmente la pantalla y dar feedback táctil.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useState, useCallback } from 'react';
import { useHaptic } from '@/hooks/useHaptic';

// ----------------------------------------------------------------------------
// CONSTANTES
// ----------------------------------------------------------------------------
const REFRESH_DELAY = 500; // milisegundos

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
export const usePullToRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const haptic = useHaptic();

  const onRefresh = useCallback(async () => {
    // Iniciar feedback háptico (selección sutil)
    haptic.selection();

    // Activar estado de refresco
    setRefreshing(true);

    // Simular una pequeña carga (aunque los datos ya están en el store,
    // este retraso permite que el indicador de refresco se muestre el
    // tiempo suficiente para que el usuario perciba la acción).
    await new Promise((resolve) => setTimeout(resolve, REFRESH_DELAY));

    // Finalizar refresco
    setRefreshing(false);

    // Nota: Si en el futuro se necesitara forzar algún recálculo o
    // sincronización adicional, este es el lugar para hacerlo.
  }, [haptic]);

  return {
    refreshing,
    onRefresh,
  };
};