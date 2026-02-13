import { ViewStyle } from 'react-native';

export interface AppTimePickerProps {
  /** Hora actual en formato "HH:mm" (24h) */
  value: string;
  /** Callback que recibe la nueva hora en formato "HH:mm" */
  onChange: (time: string) => void;
  /** Deshabilita la interacción */
  disabled?: boolean;
  /** Texto de etiqueta superior (opcional) */
  label?: string;
  /** Texto de placeholder cuando no hay valor */
  placeholder?: string;
  /** Estilos para el contenedor principal */
  style?: ViewStyle;
}