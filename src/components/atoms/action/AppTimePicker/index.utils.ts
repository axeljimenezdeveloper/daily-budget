// ============================================================================
// UTILIDADES DE CONVERSIÓN DE HORA (AppTimePicker)
//
// Funciones para convertir entre string "HH:mm" y objeto Date.
// Se utiliza una fecha fija (2000-01-01) para aislar solo la hora.
// ============================================================================

/**
 * Convierte un string en formato "HH:mm" a un objeto Date.
 * @param time - Hora en formato "HH:mm" (24h)
 * @returns Objeto Date con la hora especificada.
 */
export const timeStringToDate = (time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(2000, 0, 1, hours, minutes);
};

/**
 * Convierte un objeto Date a string en formato "HH:mm" (24h, dos dígitos).
 * @param date - Objeto Date.
 * @returns Hora en formato "HH:mm".
 */
export const dateToTimeString = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};