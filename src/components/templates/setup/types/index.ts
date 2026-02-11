// ============================================================================
// TIPOS COMPARTIDOS PARA EL FLUJO DE CONFIGURACIÓN (SETUP)
//
// Define las interfaces principales utilizadas en todo el template de setup:
// - Currency: Representa una moneda con símbolo, código, nombre, bandera y locale.
// - PeriodOption: Opción de duración (semanal, quincenal, mensual, personalizado).
// - SetupStepLayoutProps: Props del layout base que envuelve todas las pantallas.
//
// También re-exporta PERIOD_OPTIONS desde constants/periods para centralizar
// el acceso a las opciones predefinidas.
// ============================================================================

// ----------------------------------------------------------------------------
// INTERFAZ: Currency
// ----------------------------------------------------------------------------
/**
 * Representa una moneda seleccionable por el usuario.
 * Se utiliza en todo el flujo de configuración y se persiste en el store.
 *
 * @property symbol - Símbolo monetario (ej. "$", "€", "Bs").
 * @property name - Nombre completo de la moneda (ej. "Dólar Estadounidense").
 * @property code - Código ISO 4217 (ej. "USD", "EUR").
 * @property flag - Emoji de la bandera del país/región.
 * @property locale - Locale para formateo de números (ej. "en-US", "es-ES").
 */
export interface Currency {
  symbol: string;
  name: string;
  code: string;
  flag: string;
  locale: string;
}

// ----------------------------------------------------------------------------
// INTERFAZ: PeriodOption
// ----------------------------------------------------------------------------
/**
 * Opción de duración para el presupuesto.
 * Las opciones predefinidas (7, 15, 30) usan 'value' como cantidad de días.
 * El valor 0 se reserva para la opción "Personalizado", donde el usuario
 * ingresa manualmente los días.
 *
 * @property label - Texto corto visible (ej. "Semanal").
 * @property value - Número de días (0 = personalizado).
 * @property description - Descripción breve (ej. "7 días").
 */
export interface PeriodOption {
  label: string;
  value: number;
  description: string;
}

// ----------------------------------------------------------------------------
// INTERFAZ: SetupStepLayoutProps
// ----------------------------------------------------------------------------
/**
 * Props del componente SetupStepLayout, que provee la estructura común
 * a todas las pantallas del flujo de configuración (moneda, presupuesto, duración).
 *
 * @property title - Título principal de la pantalla (texto o ReactNode).
 * @property description - Subtítulo opcional (texto o ReactNode).
 * @property totalSteps - Número total de pasos del flujo (para el indicador).
 * @property currentStep - Índice del paso actual (0‑based).
 * @property children - Contenido específico del paso (secciones, formularios).
 * @property actionButtonText - Texto del botón de acción principal.
 * @property onActionPress - Callback al presionar el botón de acción.
 * @property isActionDisabled - Si el botón de acción debe estar deshabilitado.
 * @property isProcessing - Muestra estado de procesamiento (deshabilita el botón).
 * @property onBackPress - Callback para retroceder (normalmente router.back()).
 * @property iconName - Nombre del ícono de Ionicons (defecto: "help-circle-outline").
 * @property backgroundColor - Color de fondo de la pantalla (defecto: PALETTE.deepNight).
 * @property accentColor - Color de acento para ícono, borde del círculo y progreso.
 * @property showBackButton - Controla la visibilidad del botón de retroceso.
 */
export interface SetupStepLayoutProps {
  title: string;
  description?: string;
  totalSteps: number;
  currentStep: number;
  children: React.ReactNode;
  actionButtonText: string;
  onActionPress: () => void;
  isActionDisabled?: boolean;
  isProcessing?: boolean;
  onBackPress: () => void;
  iconName?: string;
  backgroundColor?: string;
  accentColor?: string;
  showBackButton?: boolean;
}

// ----------------------------------------------------------------------------
// RE-EXPORTACIÓN DE CONSTANTES DE DURACIÓN
// ----------------------------------------------------------------------------
// Se importan las opciones predefinidas y se re-exportan con el mismo nombre
// para mantener la coherencia en el resto del template.
import { PERIOD_OPTIONS as PERIODS } from '../constants/periods';
export const PERIOD_OPTIONS = PERIODS;