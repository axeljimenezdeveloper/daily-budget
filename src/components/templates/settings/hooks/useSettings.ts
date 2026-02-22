// ============================================================================
// HOOK PERSONALIZADO: useSettings (versión compuesta)
//
// Punto de entrada unificado para la lógica de la pantalla de ajustes.
// Compone múltiples subhooks especializados para mantener el código limpio
// y facilitar el mantenimiento. La interfaz de retorno es idéntica a la
// versión anterior, garantizando compatibilidad total.
// ============================================================================

// ----------------------------------------------------------------------------
// SUBHOOKS ESPECIALIZADOS
// ----------------------------------------------------------------------------
import { useSettingsStore } from './useSettingsStore';
import { useSettingsNotifications } from './useSettingsNotifications';
import { useSettingsBiometrics } from './useSettingsBiometrics';
import { useSettingsExport } from './useSettingsExport';
import { useSettingsModals } from './useSettingsModals';
import { useSettingsUtils } from './useSettingsUtils';
// ----------------------------------------------------------------------------
// TIPO DE RETORNO 
// ----------------------------------------------------------------------------
import { UseSettingsReturn } from './useSettings.types';
// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
export const useSettings = (): UseSettingsReturn => {
  // Instanciar todos los subhooks
  const store = useSettingsStore();
  const notifications = useSettingsNotifications();
  const biometrics = useSettingsBiometrics();
  const exportModule = useSettingsExport();
  const modals = useSettingsModals();
  const utils = useSettingsUtils();

  // Combinar todas las propiedades en un solo objeto
  return {
    ...store,
    ...notifications,
    ...biometrics,
    ...exportModule,
    ...modals,
    ...utils,
  };
};