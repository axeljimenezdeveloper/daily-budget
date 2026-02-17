// ============================================================================
// PANTALLA DE AUTENTICACIÓN BIOMÉTRICA - biometric.tsx
//
// Esta pantalla se muestra cuando el usuario tiene activada la opción de
// bloqueo biométrico en Ajustes. Solicita la huella dactilar antes de
// permitir el acceso a la sección principal de la aplicación.
//
// Flujo:
//   1. Al montar, si el hardware y las huellas están disponibles, intenta
//      autenticar automáticamente.
//   2. Si la autenticación es exitosa, redirige a /(main).
//   3. Si falla (error temporal, cancelación, o hardware no disponible),
//      muestra opciones para reintentar o desactivar la biometría.
//   4. Al desactivar, actualiza el store y redirige a /(main).
// ============================================================================

import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS Y LAYOUTS
// ----------------------------------------------------------------------------
import AnimationLayout from '@/components/templates/animations/components/layout/AnimationLayout';
import AppButton from '@/components/atoms/action/AppButton';
import AppText from '@/components/atoms/content/AppText';
import AppBox from '@/components/atoms/structure/AppBox';
import AppSpinner from '@/components/atoms/visual/AppSpinner';
import AppIcon from '@/components/atoms/content/AppIcon';

// ----------------------------------------------------------------------------
// HOOKS PERSONALIZADOS Y STORE
// ----------------------------------------------------------------------------
import { useBiometricAuth } from '@/features/biometrics/hooks/useBiometricAuth';
import { useVaultStore } from '@/store/useVaultStore';

// ----------------------------------------------------------------------------
// CONSTANTES DE DISEÑO Y RUTAS
// ----------------------------------------------------------------------------
import { SPACING } from '@/constants/metrics';
import { PALETTE } from '@/constants/colors';
import { ROUTES } from '@/constants/navigation'; 

export default function BiometricScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  // --------------------------------------------------------------------------
  // HOOK DE BIOMETRÍA
  // --------------------------------------------------------------------------
  const {
    isBiometryUsable,
    hasHardware,
    isEnrolled,
    authLoading,
    authenticate,
  } = useBiometricAuth();

  // --------------------------------------------------------------------------
  // STORE
  // --------------------------------------------------------------------------
  const setBiometricEnabled = useVaultStore((s) => s.setBiometricEnabled);

  // --------------------------------------------------------------------------
  // ESTADO LOCAL
  // --------------------------------------------------------------------------
  const [authAttempted, setAuthAttempted] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authCancelled, setAuthCancelled] = useState(false);

  // --------------------------------------------------------------------------
  // EFECTO: INTENTO AUTOMÁTICO DE AUTENTICACIÓN
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Solo intentamos una vez al montar, si la biometría es usable y no se ha intentado aún
    if (isBiometryUsable && !authAttempted && !authLoading) {
      setAuthAttempted(true);
      authenticate({
        promptMessage: t('auth.biometric.message'),
        disableDeviceFallback: false, // Permitir PIN/patrón como respaldo
      }).then((result) => {
        if (result.success) {
          router.replace(ROUTES.MAIN.INDEX); // ✅ Corregido
        } else {
          // Guardamos el error para mostrarlo, pero distinguimos cancelación
          if (result.code === 'user_cancel') {
            setAuthCancelled(true);
            setAuthError(null); // No mostramos error si canceló
          } else {
            setAuthError(result.error || t('auth.biometric.error'));
          }
        }
      });
    }
  }, [isBiometryUsable, authAttempted, authLoading, authenticate, router, t]);

  // --------------------------------------------------------------------------
  // MANEJADORES
  // --------------------------------------------------------------------------

  /** Reintenta la autenticación */
  const handleRetry = async () => {
    setAuthError(null);
    setAuthCancelled(false);
    const result = await authenticate({
      promptMessage: t('auth.biometric.message'),
      disableDeviceFallback: false,
    });
    if (result.success) {
      router.replace(ROUTES.MAIN.INDEX); // ✅ Corregido
    } else if (result.code !== 'user_cancel') {
      setAuthError(result.error || t('auth.biometric.error'));
    } else {
      setAuthCancelled(true);
    }
  };

  /** Desactiva la biometría y continúa a main */
  const handleDisableAndContinue = () => {
    setBiometricEnabled(false);
    router.replace(ROUTES.MAIN.INDEX); // ✅ Corregido
  };

  // --------------------------------------------------------------------------
  // RENDERIZADO DEL CONTENIDO EXTRA (debajo del subtítulo)
  // --------------------------------------------------------------------------
  const renderExtraContent = () => {
    // Caso 1: Cargando
    if (authLoading) {
      return (
        <AppBox align="center" marginTop={SPACING.xl}>
          <AppSpinner size="l" color="accent" />
        </AppBox>
      );
    }

    // Caso 2: Hardware no disponible o sin huellas registradas
    if (!isBiometryUsable && (hasHardware === false || isEnrolled === false)) {
      return (
        <AppBox align="center" marginTop={SPACING.xl} gap="m">
          <AppText variant="body" color="secondary" align="center">
            {t('auth.biometric.not_available')}
          </AppText>
          <AppButton
            onPress={handleDisableAndContinue}
            status="accent"
            variant="filled"
            style={{ minWidth: 200 }}
          >
            {t('auth.biometric.disable_and_continue')}
          </AppButton>
        </AppBox>
      );
    }

    // Caso 3: Error de autenticación (no cancelación)
    if (authError) {
      return (
        <AppBox align="center" marginTop={SPACING.xl} gap="m">
          <AppText variant="body" color="error" align="center">
            {authError}
          </AppText>
          <AppBox
            direction="row"
            gap="m"
            justify="center"
            style={{ flexWrap: 'wrap' }}
          >
            <AppButton onPress={handleRetry} status="accent" variant="filled">
              {t('auth.biometric.retry')}
            </AppButton>
            <AppButton
              onPress={handleDisableAndContinue}
              status="neutral"
              variant="outline"
            >
              {t('auth.biometric.disable_and_continue')}
            </AppButton>
          </AppBox>
        </AppBox>
      );
    }

    // Caso 4: Cancelación (solo mostramos opciones, sin mensaje de error)
    if (authCancelled) {
      return (
        <AppBox align="center" marginTop={SPACING.xl} gap="m">
          <AppBox
            direction="row"
            gap="m"
            justify="center"
            style={{ flexWrap: 'wrap' }}
          >
            <AppButton onPress={handleRetry} status="accent" variant="filled">
              {t('auth.biometric.retry')}
            </AppButton>
            <AppButton
              onPress={handleDisableAndContinue}
              status="neutral"
              variant="outline"
            >
              {t('auth.biometric.disable_and_continue')}
            </AppButton>
          </AppBox>
        </AppBox>
      );
    }

    // Caso por defecto: esperando acción (no debería llegar aquí normalmente)
    return null;
  };

  // --------------------------------------------------------------------------
  // RENDERIZADO PRINCIPAL
  // --------------------------------------------------------------------------
  return (
    <AnimationLayout
      title={t('auth.biometric.title')}
      subtitle={t('auth.biometric.message')}
      circleContent={
        <AppIcon
          name="finger-print-outline"
          library="Ionicons"
          size="xxl"
          color="accent"
        />
      }
      extraContent={renderExtraContent()}
      // Usamos el color de acento por defecto (sunsetOrange)
      // El footer se mantiene automático con la versión de la app
    />
  );
}