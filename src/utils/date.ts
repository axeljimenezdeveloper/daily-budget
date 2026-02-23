// ============================================================================
// UTILIDADES DE FORMATEO DE FECHAS
// ============================================================================

import i18next from 'i18next';

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