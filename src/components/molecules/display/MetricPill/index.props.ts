// ============================================================================
// PROPS DEL COMPONENTE MetricPill
// ============================================================================

export type MetricPillStatus = 'default' | 'success' | 'warning' | 'error';

export interface MetricPillProps {
  /**
   * Texto de la etiqueta (parte superior)
   */
  label: string;

  /**
   * Valor a mostrar (puede ser string o número)
   */
  value: string | number;

  /**
   * Estado visual que determina el color del valor
   * - 'default': color primario (creamWhite)
   * - 'success': color success (successGreen)
   * - 'warning': color warning (warningOrange)
   * - 'error': color error (errorRed)
   * @default 'default'
   */
  status?: MetricPillStatus;
}