// ============================================================================
// PROPS DEL COMPONENTE AppCircularProgress
// ============================================================================

export interface AppCircularProgressProps {
  /**
   * Progreso actual en porcentaje (0-100)
   */
  progress: number;

  /**
   * Presupuesto restante (para mostrar en modo dinero)
   */
  remaining: number;

  /**
   * Presupuesto total inicial
   */
  total: number;

  /**
   * Símbolo de la moneda (ej. "$", "€")
   */
  currency: string;

  /**
   * Indica si el modo cuidado está activo. Si es true y se muestra el porcentaje,
   * el anillo se mostrará en rojo en lugar de verde.
   */
  isExtremeMode?: boolean;

  /**
   * Texto para la etiqueta cuando se muestra el porcentaje (ej. "Gastado")
   * @default "Gastado"
   */
  spentLabel?: string;

  /**
   * Texto para la etiqueta cuando se muestra el dinero (ej. "Disponible")
   * @default "Disponible"
   */
  availableLabel?: string;

  /**
   * Texto para el pie cuando se muestra el porcentaje (puede incluir formato)
   * Si no se proporciona, se usa un texto por defecto con remaining y remainingDays.
   * Nota: remainingDays debe pasarse como prop adicional si se quiere personalizar.
   */
  spentFooter?: React.ReactNode;

  /**
   * Texto para el pie cuando se muestra el dinero (ej. "Presupuesto inicial: X")
   * Si no se proporciona, se usa un texto por defecto con total.
   */
  availableFooter?: React.ReactNode;

  /**
   * Callback opcional al presionar. Si no se proporciona, se alterna la métrica internamente.
   */
  onPress?: () => void;
}