import { ReactNode } from "react";
import { ViewStyle, StyleProp, DimensionValue } from "react-native";

export interface AppModalProps {
  /** Contenido del modal */
  children: ReactNode;
  /** Controla la visibilidad del modal */
  isOpen: boolean;
  /** Función a ejecutar al cerrar el modal */
  onClose: () => void;
  /** Título opcional del modal */
  title?: string;
  /** Muestra el header con título y botón de cierre */
  showHeader?: boolean;
  /** Altura del modal (puede ser número, porcentaje o 'auto') */
  height?: DimensionValue;
  /** Tipo de animación al abrir/cerrar */
  animationType?: "slide" | "fade";
  /** Permite cerrar deslizando hacia abajo */
  swipeToClose?: boolean;
  /** Opacidad del fondo (overlay) */
  backdropOpacity?: number;
  /** Muestra el botón de cierre en el header */
  showCloseButton?: boolean;
  /** Cierra el modal al presionar el fondo */
  closeOnBackdropPress?: boolean;
  /** Estilos adicionales para el contenedor del modal */
  style?: StyleProp<ViewStyle>;
  /** Estilos adicionales para el contenido del modal */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Tiempo mínimo (en ms) entre ejecuciones de onClose.
   * Se aplica al botón de cierre y, si se desea, a otras acciones internas.
   * @default ANIMATION.DEFAULT_PRESS_THROTTLE_MS
   */
  throttleMs?: number;
}