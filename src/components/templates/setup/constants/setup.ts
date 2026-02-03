export const MIN_BUDGET = 1;
export const MAX_BUDGET = 1000000;
export const MIN_DAYS = 1;
export const MAX_DAYS = 365;

export const CURRENCY_LIST = [
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
  { symbol: "€", name: "Euro", code: "EUR", flag: "🇪🇺", locale: "es-ES" },
  {
    symbol: "£",
    name: "Libra Esterlina",
    code: "GBP",
    flag: "🇬🇧",
    locale: "en-GB",
  },
];

export const PERIOD_OPTIONS = [
  { label: "Semanal", value: 7, description: "7 días" },
  { label: "Quincenal", value: 15, description: "15 días" },
  { label: "Mensual", value: 30, description: "30 días" },
  { label: "Personalizado", value: 0, description: "Elige tus días" },
];