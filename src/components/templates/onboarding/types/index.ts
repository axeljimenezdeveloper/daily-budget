// ============================================================================
// TIPOS COMPARTIDOS DEL FLUJO DE ONBOARDING
//
// Este archivo define las interfaces y tipos utilizados por los componentes
// del template de onboarding. Centralizar estos tipos garantiza consistencia
// entre las distintas pantallas y facilita el mantenimiento.
// ============================================================================

// ----------------------------------------------------------------------------
// BIBLIOTECAS DE ICONOS SOPORTADAS
// ----------------------------------------------------------------------------
/**
 * Bibliotecas de iconos disponibles en la aplicación.
 * Se corresponden con los paquetes instalados (@expo/vector-icons).
 * - 'Ionicons': Biblioteca principal, usada por defecto.
 * - 'MaterialCommunityIcons': Iconos adicionales de Material Design.
 * - 'FontAwesome': Iconos clásicos.
 * - 'MaterialIcons': Variante estándar de Material Design.
 */
export type IconLibrary = 'Ionicons' | 'MaterialCommunityIcons' | 'FontAwesome' | 'MaterialIcons';

// ----------------------------------------------------------------------------
// PROPS DEL COMPONENTE OnboardingStep
// ----------------------------------------------------------------------------
/**
 * Propiedades del componente OnboardingStep.
 * Este componente se utiliza para renderizar cada paso del flujo de onboarding
 * de manera consistente, recibiendo toda la configuración específica del paso
 * a través de estas props.
 */
export interface OnboardingStepProps {
  /**
   * Número del paso actual (1-indexado).
   * Se utiliza para mostrar la posición en el indicador de progreso y para
   * determinar la navegación relativa.
   */
  stepNumber: number;

  /**
   * Número total de pasos del flujo de onboarding.
   * Generalmente 3, pero se mantiene como prop para flexibilidad futura.
   */
  totalSteps: number;

  /**
   * Título principal de la pantalla.
   * Se renderiza con AppText variant="h1" y alineación centrada.
   */
  title: string;

  /**
   * Descripción del paso.
   * Puede ser un string simple o un nodo React para permitir formato
   * personalizado (negritas, colores, etc.). Cuando se requiere destacar
   * palabras clave, se pasa un fragmento de JSX con componentes AppText
   * con color 'accent', 'success' o 'warning'.
   */
  description: string | React.ReactNode;

  /**
   * Nombre del icono según la librería seleccionada.
   * Debe coincidir con un nombre válido de la librería correspondiente.
   */
  iconName: string;

  /**
   * Librería de iconos a utilizar.
   * Por defecto se usa 'Ionicons' si no se especifica.
   */
  iconLibrary?: IconLibrary;

  /**
   * Texto del botón de acción principal (Siguiente / Comenzar).
   */
  buttonText: string;

  /**
   * Callback que se ejecuta al presionar el botón principal.
   * Generalmente navega al siguiente paso o finaliza el flujo.
   */
  onNext: () => void;

  /**
   * Callback que se ejecuta al presionar el botón "Saltar".
   * En la mayoría de los casos redirige directamente a la animación de transición.
   */
  onSkip: () => void;

  /**
   * Texto personalizado para el botón de saltar.
   * Si no se provee, se usa la traducción por defecto 'onboarding.skip'.
   */
  skipButtonText?: string;

  /**
   * Estilo visual del botón principal.
   * - 'primary': Naranja corporativo (por defecto en pasos 1 y 2).
   * - 'accent':  Naranja brillante para destacar acción final (paso 3).
   * - Otros:     Usados en contextos específicos (éxito, advertencia, etc.).
   * @default 'primary'
   */
  buttonStatus?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';

  /**
   * Rotación aplicada al icono (en grados).
   * Útil para dar énfasis visual a ciertos iconos, como el reloj de arena
   * rotado 45° en la primera pantalla.
   * @default 0
   */
  iconRotation?: number;
}