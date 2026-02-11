// ============================================================================
// CONSTANTES DE MONEDAS DISPONIBLES PARA CONFIGURACIÓN
//
// Lista predefinida de monedas que el usuario puede seleccionar durante el
// flujo de configuración (setup-currency). Incluye símbolo, código ISO,
// nombre, bandera y locale para formateo numérico.
//
// La primera moneda (USD) se establece como selección por defecto.
// ============================================================================

// ----------------------------------------------------------------------------
// IMPORTACIÓN DE TIPOS
// ----------------------------------------------------------------------------
import { Currency } from '../types';

// ----------------------------------------------------------------------------
// LISTA DE MONEDAS
// ----------------------------------------------------------------------------
/**
 * Array de monedas disponibles para el usuario.
 * 
 * Cada objeto cumple con la interfaz Currency y contiene:
 * - symbol: Símbolo monetario visible.
 * - name: Nombre completo en español.
 * - code: Código ISO 4217 (usado como identificador único).
 * - flag: Emoji de la bandera del país o región.
 * - locale: Locale para formateo de cantidades (ej. "en-US", "es-ES").
 * 
 * La lista incluye monedas de América Latina, Estados Unidos, Europa y Reino Unido,
 * cubriendo los casos de uso más frecuentes del público objetivo de SURV.
 * 
 * @default USD es la moneda preseleccionada por defecto.
 */
export const CURRENCY_LIST: Currency[] = [
  {
    symbol: "$",
    name: "Dólar Estadounidense",
    code: "USD",
    flag: "🇺🇸",
    locale: "en-US",
  },
  {
    symbol: "Bs",
    name: "Bolívar Venezolano",
    code: "VES",
    flag: "🇻🇪",
    locale: "es-VE",
  },
  {
    symbol: "$",
    name: "Peso Mexicano",
    code: "MXN",
    flag: "🇲🇽",
    locale: "es-MX",
  },
  {
    symbol: "$",
    name: "Peso Colombiano",
    code: "COP",
    flag: "🇨🇴",
    locale: "es-CO",
  },
  {
    symbol: "$",
    name: "Peso Argentino",
    code: "ARS",
    flag: "🇦🇷",
    locale: "es-AR",
  },
  {
    symbol: "S/",
    name: "Sol Peruano",
    code: "PEN",
    flag: "🇵🇪",
    locale: "es-PE",
  },
  {
    symbol: "R$",
    name: "Real Brasileño",
    code: "BRL",
    flag: "🇧🇷",
    locale: "pt-BR",
  },
  {
    symbol: "€",
    name: "Euro",
    code: "EUR",
    flag: "🇪🇺",
    locale: "es-ES",
  },
  {
    symbol: "£",
    name: "Libra Esterlina",
    code: "GBP",
    flag: "🇬🇧",
    locale: "en-GB",
  },
];