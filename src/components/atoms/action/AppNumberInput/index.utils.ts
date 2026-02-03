import { PALETTE } from "@/constants/colors";

// Mapping de estados semánticos
export const STATE_COLORS = {
  success: PALETTE.successGreen,
  error: PALETTE.errorRed,
  warning: PALETTE.warningOrange,
  info: PALETTE.infoBlue,
  neutral: PALETTE.slateGray,
  primary: PALETTE.nightBlue,
  accent: PALETTE.sunsetOrange,
};

// Formatear número con separadores de miles
export const formatNumberWithSeparators = (value: string): string => {
  // Remover cualquier separador existente que no sea punto decimal
  const cleanValue = value.replace(/[^\d.]/g, '');
  
  if (!cleanValue) return '';
  
  // Separar parte entera y decimal
  const [integerPart, decimalPart] = cleanValue.split('.');
  
  // Formatear parte entera con separadores de miles
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Si hay parte decimal, agregarla de vuelta
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

// Convertir string formateado a número
export const parseFormattedNumber = (formattedValue: string): number => {
  const numericString = formattedValue.replace(/[^\d.]/g, '');
  return parseFloat(numericString) || 0;
};

// Validar si un valor es numérico válido
export const isValidNumber = (value: string, allowDecimals: boolean = true): boolean => {
  if (value === '') return true;
  
  const regex = allowDecimals ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;
  return regex.test(value);
};

// Limitar decimales
export const limitDecimals = (value: string, decimalPlaces: number = 2): string => {
  const [integerPart, decimalPart] = value.split('.');
  
  if (!decimalPart || decimalPlaces === 0) {
    return integerPart;
  }
  
  return `${integerPart}.${decimalPart.substring(0, decimalPlaces)}`;
};

// Incrementar valor
export const incrementValue = (
  currentValue: string,
  step: number = 1,
  max?: number
): string => {
  const numericValue = parseFormattedNumber(currentValue) || 0;
  const newValue = numericValue + step;
  
  if (max !== undefined && newValue > max) {
    return max.toString();
  }
  
  return newValue.toString();
};

// Decrementar valor
export const decrementValue = (
  currentValue: string,
  step: number = 1,
  min?: number
): string => {
  const numericValue = parseFormattedNumber(currentValue) || 0;
  const newValue = Math.max(numericValue - step, min || 0);
  
  return newValue.toString();
};