// ============================================================================
// PROPS DEL MODAL DE SELECCIÓN DE PERÍODO (PeriodModal)
//
// Define los parámetros que recibe el componente PeriodModal para controlar
// su visibilidad, la opción de período seleccionada y las acciones de
// selección/cierre. Utilizado en el flujo de configuración (setup-duration).
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTACIÓN DE TIPOS COMPARTIDOS
// ----------------------------------------------------------------------------
import { PeriodOption } from "../../../types";

// ----------------------------------------------------------------------------
// INTERFAZ: PeriodModalProps
// ----------------------------------------------------------------------------

/**
 * Props del componente PeriodModal.
 *
 * @property isOpen           - Controla si el modal está visible.
 * @property onClose          - Callback para cerrar el modal.
 * @property selectedPeriod   - Período actualmente seleccionado (resaltado en la lista).
 * @property onSelectPeriod   - Callback que se ejecuta al elegir un período.
 *                              Recibe el objeto PeriodOption completo.
 */
export interface PeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPeriod: PeriodOption;
  onSelectPeriod: (option: PeriodOption) => void;
}