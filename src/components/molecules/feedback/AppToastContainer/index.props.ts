// ============================================================================
// PROPS PARA AppToastContainer
// ============================================================================

import { ViewStyle } from 'react-native';

export interface AppToastContainerProps {
  /** Posición de los toasts en la pantalla (top / bottom) */
  position?: 'top' | 'bottom';
  /** Espaciado entre toasts */
  spacing?: number;
  /** Offset adicional desde el borde (útil para evitar notches) */
  offset?: number;
  /** Estilo personalizado para el contenedor */
  style?: ViewStyle;
}