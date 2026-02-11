// ============================================================================
// HOOK PERSONALIZADO: useAnimationTimer
//
// Encapsula la lógica de temporizador y redirección automática utilizada en
// las pantallas de animación (transition, success). Centraliza la gestión
// de setTimeout, limpieza de memoria y navegación, evitando duplicación
// de efectos y posibles fugas de memoria.
//
// Sigue el mismo patrón que los hooks personalizados en onboarding y setup
// (useOnboardingNavigation, useSetupNavigation, useSetupDuration, etc.)
// ============================================================================

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'expo-router';

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------
/**
 * Configura un temporizador que redirige automáticamente después de una duración.
 *
 * @param duration    - Tiempo en milisegundos antes de ejecutar la redirección.
 *                      Si es <= 0, no se inicia ningún temporizador.
 * @param destination - Ruta de destino (ej. "/(welcome)/setup-currency").
 *                      Si es null, undefined o se omite, no se redirige.
 * @returns Objeto con función `clearTimer` para cancelar manualmente el temporizador.
 */
export const useAnimationTimer = (duration: number, destination?: string | null) => {
  // --------------------------------------------------------------------------
  // HOOKS DE NAVEGACIÓN Y REFERENCIA
  // --------------------------------------------------------------------------
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --------------------------------------------------------------------------
  // LIMPIEZA DEL TEMPORIZADOR
  // --------------------------------------------------------------------------
  /**
   * Cancela el temporizador activo si existe y limpia la referencia.
   * Memoizada con useCallback para evitar recreaciones innecesarias.
   */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // --------------------------------------------------------------------------
  // INICIO DEL TEMPORIZADOR
  // --------------------------------------------------------------------------
  /**
   * Inicia el temporizador solo si hay un destino válido y la duración es positiva.
   * Antes de crear un nuevo temporizador, limpia cualquier temporizador previo
   * para evitar múltiples redirecciones o comportamientos inconsistentes.
   */
  const startTimer = useCallback(() => {
    if (!destination || duration <= 0) return;

    clearTimer();

    timerRef.current = setTimeout(() => {
      router.replace(destination);
    }, duration);
  }, [duration, destination, router, clearTimer]);

  // --------------------------------------------------------------------------
  // EFECTO PRINCIPAL
  // --------------------------------------------------------------------------
  /**
   * Ejecuta startTimer al montar el componente y cuando cambian sus dependencias.
   * La función de limpieza (cleanup) se ejecuta al desmontar o antes de reiniciar,
   * garantizando que no queden temporizadores huérfanos.
   */
  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  // --------------------------------------------------------------------------
  // EXPOSICIÓN DE API
  // --------------------------------------------------------------------------
  /**
   * Retorna `clearTimer` para que el componente pueda cancelar manualmente
   * la redirección si es necesario (por ejemplo, si el usuario toca la pantalla).
   */
  return { clearTimer };
};