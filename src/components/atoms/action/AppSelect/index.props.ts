import { ViewStyle, StyleProp, DimensionValue } from "react-native";

export interface AppSelectProps {
  /** Opción actualmente seleccionada (texto mostrado) */
  value?: string;
  /** Etiqueta opcional mostrada sobre el campo */
  label?: string;
  /** Texto mostrado cuando no hay valor seleccionado */
  placeholder?: string;
  /** Función a ejecutar al presionar (para abrir modal/sheet) */
  onPress: () => void;
  /** Mensaje de error de validación */
  error?: string;
  /** Deshabilita la interacción */
  disabled?: boolean;
  /** Ancho personalizado del contenedor */
  width?: DimensionValue;
  /** Estilos adicionales para el contenedor */
  style?: StyleProp<ViewStyle>;
  /**
   * Tiempo mínimo (en ms) entre ejecuciones de onPress.
   * Por defecto se usa DEFAULT_PRESS_THROTTLE_MS (300ms) para evitar
   * pulsaciones dobles accidentales.
   * @default ANIMATION.DEFAULT_PRESS_THROTTLE_MS
   */
  throttleMs?: number;
}