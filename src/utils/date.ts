// ============================================================================
// UTILIDADES DE FORMATEO DE FECHAS
// ============================================================================

import i18next from 'i18next';

// ----------------------------------------------------------------------------
// NUEVAS FUNCIONES PARA FECHAS LOCALES (RESUELVEN PROBLEMAS DE ZONA HORARIA)
// ----------------------------------------------------------------------------

/**
 * Convierte una fecha (Date o string ISO) a string YYYY-MM-DD en la zona horaria LOCAL.
 * 
 * @param date - Objeto Date o string ISO (ej. "2026-05-21T00:00:00Z")
 * @returns Fecha local en formato "YYYY-MM-DD"
 * 
 * @example
 * getLocalDateKey('2026-05-21T03:00:00Z') 
 * // En UTC-3 retorna "2026-05-20" (porque la hora local sigue siendo 20)
 */
export const getLocalDateKey = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Extraer componentes en hora local
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Obtiene la fecha actual en formato local YYYY-MM-DD.
 * Útil para comparar con getLocalDateKey de transacciones.
 * 
 * @returns Fecha local actual en "YYYY-MM-DD"
 */
export const getTodayLocalKey = (): string => {
  return getLocalDateKey(new Date());
};

/**
 * Convierte una fecha local YYYY-MM-DD a un objeto Date en la zona horaria local.
 * Útil cuando se tiene una clave de fecha y se necesita un objeto Date para formateo.
 * 
 * @param localDateKey - Fecha en formato "YYYY-MM-DD" (asumida en hora local)
 * @returns Objeto Date con la fecha correcta en hora local (00:00:00)
 */
export const getDateFromLocalKey = (localDateKey: string): Date => {
  const [year, month, day] = localDateKey.split('-').map(Number);
  // Nota: new Date(year, month-1, day) crea la fecha en zona horaria local
  return new Date(year, month - 1, day);
};

// ----------------------------------------------------------------------------
// FUNCIONES EXISTENTES (formateo para UI)
// ----------------------------------------------------------------------------

/**
 * Formatea una fecha ISO a formato legible según el idioma actual.
 * Ejemplo (es): "15 may 2021" | Ejemplo (en): "May 15, 2021"
 *
 * @param dateISO - Fecha en formato ISO (string) o null
 * @returns String formateado, o cadena vacía si la fecha es inválida
 */
export const formatDate = (dateISO: string | null): string => {
  if (!dateISO) return '';

  const date = new Date(dateISO);
  if (isNaN(date.getTime())) return '';

  const lang = i18next.language; // 'es' o 'en'

  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Formatea una fecha ISO a formato corto (DD/MM/YYYY) sin importar el idioma.
 * Útil para CSV o contextos donde se requiera formato fijo.
 */
export const formatDateShort = (dateISO: string | null): string => {
  if (!dateISO) return '';
  const date = new Date(dateISO);
  if (isNaN(date.getTime())) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formatea una fecha en tiempo relativo (hace X horas, ayer, dd/mm)
 * @param date - Objeto Date
 * @returns string legible
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay === 0) {
    if (diffHour > 0) {
      return `hace ${diffHour} hora${diffHour > 1 ? 's' : ''}`;
    }
    if (diffMin > 0) {
      return `hace ${diffMin} minuto${diffMin > 1 ? 's' : ''}`;
    }
    return 'ahora mismo';
  } else if (diffDay === 1) {
    return 'ayer';
  } else if (diffDay === 2) {
    return 'anteayer';
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  }
};