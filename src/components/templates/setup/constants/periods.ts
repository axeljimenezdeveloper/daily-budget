// ============================================================================
// CONSTANTES DE DURACIÓN PARA EL FLUJO DE CONFIGURACIÓN
//
// Define las opciones de período predefinidas (semanal, quincenal, mensual,
// personalizado) y los límites mínimos y máximos de días permitidos.
// Estas constantes son utilizadas por el hook useSetupDuration y el modal
// PeriodModal para ofrecer selección al usuario.
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTACIÓN DE TIPOS
// ----------------------------------------------------------------------------
import { PeriodOption } from '../types';

// ----------------------------------------------------------------------------
// OPCIONES DE DURACIÓN PREDEFINIDAS
// ----------------------------------------------------------------------------
/**
 * Lista de opciones de duración disponibles para el usuario.
 * 
 * - value: 7   → Semanal   (7 días)
 * - value: 15  → Quincenal (15 días)
 * - value: 30  → Mensual   (30 días)
 * - value: 0   → Personalizado (el usuario ingresa la cantidad de días)
 * 
 * La opción con value = 0 activa el campo de entrada personalizada en la UI.
 * El orden del array determina el orden de presentación en el modal.
 */
export const PERIOD_OPTIONS: PeriodOption[] = [
  { label: "Semanal", value: 7, description: "7 días" },
  { label: "Quincenal", value: 15, description: "15 días" },
  { label: "Mensual", value: 30, description: "30 días" },
  { label: "Personalizado", value: 0, description: "Elige tus días" },
];

// ----------------------------------------------------------------------------
// LÍMITES DE DÍAS PARA OPCIÓN PERSONALIZADA
// ----------------------------------------------------------------------------
/**
 * Duración mínima permitida para un presupuesto.
 * Se establece en 1 día para garantizar que el período tenga sentido.
 */
export const MIN_DAYS = 1;

/**
 * Duración máxima permitida para un presupuesto.
 * Se limita a 365 días (1 año) para evitar períodos excesivamente largos
 * que dificultarían el seguimiento y la adherencia.
 */
export const MAX_DAYS = 365;