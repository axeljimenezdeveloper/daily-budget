// ============================================================================
// HOOK PERSONALIZADO: useBiometricAuth
//
// Encapsula la lógica de autenticación biométrica (huella dactilar) usando
// expo-local-authentication (v17.0.8+). Proporciona:
//   - Verificación de disponibilidad de hardware y registro.
//   - Verificación del nivel de seguridad biométrica (SecurityLevel).
//   - Función para lanzar el diálogo de autenticación con manejo de errores
//     según la API oficial de Expo SDK 54.
//   - Estados de carga y error.
//
// Basado en la documentación oficial y en las correcciones del error
// 'lockout_permanent' (reemplazado por 'lockout').
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS
// ----------------------------------------------------------------------------
import { useState, useCallback, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Platform } from 'react-native';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------

/**
 * Resultado de la autenticación biométrica.
 */
export type BiometricAuthResult =
  | { success: true }
  | { success: false; error: string; code?: LocalAuthentication.LocalAuthenticationError };

/**
 * Información sobre la disponibilidad y nivel de la biometría.
 */
export interface BiometricAvailability {
  /** El hardware está presente (sensor de huella/rostro) */
  hasHardware: boolean | null;
  /** El usuario tiene datos biométricos registrados en el sistema */
  isEnrolled: boolean | null;
  /** Nivel de seguridad (solo Android, en iOS siempre es STRONG si está disponible) */
  securityLevel: LocalAuthentication.SecurityLevel | null;
  /** Mensaje de error si ocurrió alguno en la verificación */
  error: string | null;
  /** Cargando la verificación inicial */
  loading: boolean;
}

// ----------------------------------------------------------------------------
// HOOK PRINCIPAL
// ----------------------------------------------------------------------------

export const useBiometricAuth = () => {
  // --- Estado de disponibilidad ---
  const [availability, setAvailability] = useState<BiometricAvailability>({
    hasHardware: null,
    isEnrolled: null,
    securityLevel: null,
    error: null,
    loading: true,
  });

  // --- Estado para operaciones de autenticación ---
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // VERIFICACIÓN DE DISPONIBILIDAD (con flag de montaje)
  // --------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    const checkAvailability = async () => {
      try {
        // 1. Verificar hardware
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!isMounted) return;

        if (!hasHardware) {
          setAvailability({
            hasHardware: false,
            isEnrolled: false,
            securityLevel: LocalAuthentication.SecurityLevel.NONE,
            error: null,
            loading: false,
          });
          return;
        }

        // 2. Verificar si hay datos registrados
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isMounted) return;

        // 3. Obtener nivel de seguridad (importante en Android)
        const securityLevel = await LocalAuthentication.getEnrolledLevelAsync();
        if (!isMounted) return;

        setAvailability({
          hasHardware: true,
          isEnrolled,
          securityLevel,
          error: null,
          loading: false,
        });
      } catch (err) {
        if (!isMounted) return;
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido al verificar biometría';
        setAvailability({
          hasHardware: null,
          isEnrolled: null,
          securityLevel: null,
          error: errorMessage,
          loading: false,
        });
      }
    };

    checkAvailability();

    return () => {
      isMounted = false;
    };
  }, []);

  // --------------------------------------------------------------------------
  // AUTENTICACIÓN
  // --------------------------------------------------------------------------

  /**
   * Lanza el diálogo nativo de autenticación biométrica.
   *
   * @param options - Opciones de autenticación (promptMessage, disableDeviceFallback)
   * @returns Promise<BiometricAuthResult>
   *
   * @example
   * const result = await authenticate({
   *   promptMessage: 'Inicia sesión con tu huella',
   *   disableDeviceFallback: false
   * });
   */
  const authenticate = useCallback(async (
    options?: {
      promptMessage?: string;
      disableDeviceFallback?: boolean;
    }
  ): Promise<BiometricAuthResult> => {
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (!availability.hasHardware) {
        throw new Error('Biometría no disponible en este dispositivo');
      }
      if (!availability.isEnrolled) {
        throw new Error('No hay huellas o rostro registrados en el sistema');
      }

      const authOptions: LocalAuthentication.LocalAuthenticationOptions = {
        promptMessage: options?.promptMessage ?? 'Autenticación requerida',
        cancelLabel: 'Cancelar',
        disableDeviceFallback: options?.disableDeviceFallback ?? false,
        fallbackLabel: 'Usar código de acceso',
      };

      const result = await LocalAuthentication.authenticateAsync(authOptions);

      if (result.success) {
        setAuthLoading(false);
        return { success: true };
      }

      let errorMessage = 'Autenticación fallida';
      if (result.error) {
        switch (result.error) {
          case 'user_cancel':
            errorMessage = 'Cancelaste la autenticación';
            break;
          case 'user_fallback':
            errorMessage = 'Usaste método alternativo';
            break;
          case 'lockout':
            errorMessage = 'Demasiados intentos fallidos. El sensor está bloqueado temporalmente.';
            break;
          case 'not_enrolled':
            errorMessage = 'No hay datos biométricos configurados en el dispositivo.';
            break;
          case 'not_available':
            errorMessage = 'La autenticación biométrica no está disponible en este momento.';
            break;
          case 'authentication_failed':
            errorMessage = 'Huella no reconocida. Intenta de nuevo.';
            break;
          case 'system_cancel':
            errorMessage = 'La autenticación fue cancelada por el sistema.';
            break;
          case 'passcode_not_set':
            errorMessage = 'El dispositivo no tiene un PIN/contraseña configurado.';
            break;
          default:
            errorMessage = `Error: ${result.error}`;
        }
      }

      setAuthError(errorMessage);
      setAuthLoading(false);
      return {
        success: false,
        error: errorMessage,
        code: result.error,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error inesperado';
      setAuthError(msg);
      setAuthLoading(false);
      return { success: false, error: msg };
    }
  }, [availability.hasHardware, availability.isEnrolled]);

  // --------------------------------------------------------------------------
  // UTILIDADES
  // --------------------------------------------------------------------------

  const isBiometryUsable = availability.hasHardware === true && availability.isEnrolled === true;
  const isStrongSecurity = availability.securityLevel === LocalAuthentication.SecurityLevel.BIOMETRIC_STRONG;

  return {
    // Estados
    ...availability,
    authLoading,
    authError,
    isBiometryUsable,
    isStrongSecurity,

    // Métodos
    checkAvailability: async () => {
      // Este método queda obsoleto porque la verificación ya ocurre en el efecto,
      // pero lo exponemos por si se necesita forzar una re-verificación manual.
      // Podríamos implementarlo si hiciera falta, pero no es necesario ahora.
      console.warn('checkAvailability se ejecuta automáticamente. Usa el hook directamente.');
    },
    authenticate,
  };
};