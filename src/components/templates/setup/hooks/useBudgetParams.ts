// ============================================================================
// HOOK PERSONALIZADO: useBudgetParams
//
// Encapsula la obtención y parseo del parámetro de presupuesto desde la URL.
// Se utiliza en la pantalla de duración (setup-duration) para recuperar el
// monto ingresado en el paso anterior (setup-budget) y calcular su valor numérico.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * useBudgetParams – Obtiene el presupuesto desde los parámetros de la ruta.
 *
 * @returns Objeto con:
 *  - budget: string – Valor original del presupuesto (formato preservado).
 *  - numericBudget: number – Valor numérico parseado (0 si no existe o es inválido).
 *
 * @remarks
 * - Lee el parámetro 'budget' de la URL (pasado desde setup-budget).
 * - Utiliza useMemo para evitar cálculos innecesarios en cada render.
 * - Si el parámetro no existe, retorna string vacío y numericBudget = 0.
 */
export const useBudgetParams = () => {
  const params = useLocalSearchParams();

  return React.useMemo(() => {
    // Extrae el presupuesto como string; si no existe, asigna cadena vacía.
    const budget = params.budget as string || '';

    return {
      budget,                           // Valor original (para inputs controlados)
      numericBudget: budget ? parseFloat(budget) : 0, // Valor numérico (para cálculos)
    };
  }, [params]);
};