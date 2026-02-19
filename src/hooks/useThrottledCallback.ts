// ============================================================================
// HOOK PERSONALIZADO: useThrottledCallback
//
// Aplica throttle de tipo "leading" a una función. La primera llamada se
// ejecuta de inmediato; las siguientes dentro del intervalo `throttleMs`
// son ignoradas. Útil para prevenir pulsaciones dobles en botones.
// ============================================================================

import { useRef, useCallback } from 'react';

/**
 * Hook que retorna una versión throttled (leading edge) de la función proporcionada.
 *
 * @param callback - Función a ejecutar con throttle.
 * @param throttleMs - Tiempo mínimo entre ejecuciones en milisegundos.
 * @returns Función throttled (misma firma que callback).
 *
 * @example
 * const throttledSave = useThrottledCallback(saveData, 300);
 * // Al llamar a throttledSave, se ejecutará saveData inmediatamente,
 * // y luego se ignorarán llamadas durante 300ms.
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  throttleMs: number
): T {
  const lastRun = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= throttleMs) {
        lastRun.current = now;
        callback(...args);
      }
      // Si está en período de bloqueo, se ignora la llamada.
    },
    [callback, throttleMs]
  ) as T;
}