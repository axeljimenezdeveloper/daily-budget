import { ReactNode } from 'react';

export interface NotificationSectionProps {
  /** Título principal de la sección */
  title: string;
  /** Descripción opcional que aparece debajo del título */
  description?: string;
  /** Estado actual del switch (activado/desactivado) */
  enabled: boolean;
  /** Callback cuando se cambia el switch */
  onToggle: (value: boolean) => void;
  /** Si debe mostrarse el selector de hora */
  showTimePicker?: boolean;
  /** Valor actual de la hora (formato HH:mm) */
  timeValue?: string;
  /** Callback cuando cambia la hora */
  onTimeChange?: (time: string) => void;
  /** Deshabilita toda la sección (switch y time picker) */
  disabled?: boolean;
  /** Elemento adicional opcional para mostrar al final (ej. botón de prueba) */
  extra?: ReactNode;
}