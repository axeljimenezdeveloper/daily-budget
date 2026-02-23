import { ReactNode } from "react";
import { ViewStyle, StyleProp } from "react-native";

// Definimos los tipos de haptic permitidos
export type HapticFeedbackType = 
  | 'light'
  | 'medium'
  | 'heavy'
  | 'selection'
  | 'success'
  | 'warning'
  | 'error';

export interface AppPressableProps {
  /** Contenido que se volverá interactivo */
  children: ReactNode;
  /** Función a ejecutar al presionar */
  onPress: () => void;
  /** Estilos personalizados para el contenedor */
  style?: StyleProp<ViewStyle>;
  /** Si es true, el componente no responde a toques */
  disabled?: boolean;
  /**
   * Tiempo mínimo (en ms) entre ejecuciones de onPress.
   * Si se proporciona un valor > 0, se aplica throttle de tipo "leading":
   * la primera pulsación se ejecuta inmediatamente y las siguientes se
   * ignoran hasta que pase el intervalo.
   * @default undefined (sin throttle)
   */
  throttleMs?: number;
  /**
   * Activa retroalimentación háptica al presionar.
   * - Si es `true`, usa el tipo por defecto 'light'.
   * - Si es un string, debe ser uno de los tipos soportados.
   * @example
   * hapticFeedback="light"   // impacto ligero
   * hapticFeedback="success" // notificación de éxito
   */
  hapticFeedback?: boolean | HapticFeedbackType;
}