// ============================================================================
// HOOK PERSONALIZADO: useCurrencyParams
//
// Encapsula la obtención y reconstrucción del objeto Currency desde los
// parámetros de la ruta. Se utiliza en las pantallas de presupuesto y duración
// para recuperar la moneda seleccionada en el paso anterior (setup-currency).
//
// Soporta dos modos:
// - Parámetro serializado 'currencyJSON' (recomendado).
// - Parámetros individuales (currencySymbol, currencyCode, etc.) como fallback.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

// ----------------------------------------------------------------------------
// TIPOS Y CONSTANTES LOCALES
// ----------------------------------------------------------------------------
import { Currency } from '../types';
import { CURRENCY_LIST } from '../constants/currencies';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * useCurrencyParams – Obtiene la moneda desde los parámetros de la ruta.
 *
 * @returns Objeto Currency completamente construido.
 *
 * @remarks
 * - Intenta parsear `currencyJSON` si existe; si falla, cae en la construcción manual.
 * - Si no hay ningún parámetro de moneda, retorna la primera moneda de `CURRENCY_LIST` (USD).
 * - El locale se fuerza a "en-US" en el modo de parámetros individuales.
 */
export const useCurrencyParams = (): Currency => {
  const params = useLocalSearchParams();

  return React.useMemo(() => {
    // ------------------------------------------------------------------------
    // INTENTO 1: Leer objeto serializado (currencyJSON)
    // ------------------------------------------------------------------------
    if (params.currencyJSON) {
      try {
        return JSON.parse(params.currencyJSON as string);
      } catch (e) {
        // Nota: Error controlado; no interrumpimos el flujo, solo se loguea.
        console.error("Error parsing currency JSON:", e);
      }
    }

    // ------------------------------------------------------------------------
    // INTENTO 2: Construir desde parámetros individuales (fallback)
    // ------------------------------------------------------------------------
    return {
      symbol: (params.currencySymbol as string) || CURRENCY_LIST[0].symbol,
      code: (params.currencyCode as string) || CURRENCY_LIST[0].code,
      name: (params.currencyName as string) || CURRENCY_LIST[0].name,
      flag: (params.currencyFlag as string) || CURRENCY_LIST[0].flag,
      locale: "en-US", // Valor por defecto cuando no se provee locale explícito
    };
  }, [params]);
};