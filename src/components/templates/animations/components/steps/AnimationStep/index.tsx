// ============================================================================
// COMPONENTE REUTILIZABLE PARA PANTALLAS DE ANIMACIÓN
//
// Este componente actúa como un "contenedor inteligente" que centraliza toda
// la lógica y presentación de las pantallas de animación. Sigue el mismo
// patrón que OnboardingStep y los componentes de setup, permitiendo que
// las pantallas finales (loading, transition, success) queden reducidas a
// una sola línea.
//
// Responsabilidades:
//   - Obtener la configuración específica de la variante (colores, duración, etc.)
//   - Resolver textos mediante i18n (con posibilidad de sobrescritura)
//   - Renderizar el contenido del círculo (spinner o icono) según la variante
//   - Mostrar contenido extra específico (slogan en success)
//   - Gestionar el temporizador de redirección automática
//   - Inyectar todas las props resueltas en AnimationLayout
// ============================================================================

import React from 'react';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES BASE
// ----------------------------------------------------------------------------
import AppSpinner from '@/components/atoms/visual/AppSpinner';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppText from '@/components/atoms/content/AppText';
import AppBox from '@/components/atoms/structure/AppBox';
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// LAYOUT Y CONFIGURACIÓN
// ----------------------------------------------------------------------------
import AnimationLayout from '../../layout/AnimationLayout';
import { ANIMATION_VARIANT_CONFIG } from '../../../constants';
import { AnimationStepProps } from './index.props';

// ----------------------------------------------------------------------------
// HOOKS PERSONALIZADOS
// ----------------------------------------------------------------------------
import { useAnimationTimer } from '../../../hooks/useAnimationTimer';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export default function AnimationStep({
  variant,
  title: customTitle,
  subtitle: customSubtitle,
  accentColor: customAccentColor,
  disableAutoRedirect = false,
}: AnimationStepProps) {
  // --------------------------------------------------------------------------
  // HOOKS
  // --------------------------------------------------------------------------
  const { t } = useTranslation();

  // --------------------------------------------------------------------------
  // OBTENER CONFIGURACIÓN SEGÚN VARIANTE
  // --------------------------------------------------------------------------
  const config = ANIMATION_VARIANT_CONFIG[variant];
  const {
    color: defaultColor,
    duration,
    destination,
    isSpinner,
    circlePadding,
    dividerWidth,
  } = config;

  // --------------------------------------------------------------------------
  // RESOLVER TEXTO (PRIORIDAD: PROP > TRADUCCIÓN)
  // --------------------------------------------------------------------------
  const title = customTitle ?? t(`animations.${variant}.title`);
  const subtitle = customSubtitle ?? t(`animations.${variant}.subtitle`);

  // --------------------------------------------------------------------------
  // RESOLVER COLOR DE ACENTO
  // --------------------------------------------------------------------------
  const accentColor = customAccentColor ?? defaultColor;

  // --------------------------------------------------------------------------
  // GENERAR CONTENIDO DEL CÍRCULO
  // --------------------------------------------------------------------------
  // Según la configuración de la variante, mostramos:
  // - isSpinner = true  → AppSpinner (loading, transition)
  // - isSpinner = false → AppIcon de check (success)
  const circleContent = isSpinner ? (
    <AppSpinner size="l" color={accentColor} />
  ) : (
    <AppIcon
      name="checkmark-circle"
      library="Ionicons"
      size="xxl"
      color="success" // El icono de éxito usa el color semántico "success" de la paleta
    />
  );

  // --------------------------------------------------------------------------
  // CONTENIDO EXTRA (SOLO PARA VARIANTE SUCCESS)
  // --------------------------------------------------------------------------
  // El slogan de la aplicación aparece únicamente en la pantalla de éxito.
  // Se renderiza dentro de un AppBox con margen superior definido por SPACING.xl.
  const extraContent = variant === 'success' ? (
    <AppBox marginTop={SPACING.xl}>
      <AppText
        variant="label"
        color="secondary"
        align="center"
        style={{ opacity: 0.6, letterSpacing: 1 }}
      >
        {t('animations.success.app_slogan')}
      </AppText>
    </AppBox>
  ) : null;

  // --------------------------------------------------------------------------
  // TEMPORIZADOR DE REDIRECCIÓN AUTOMÁTICA
  // --------------------------------------------------------------------------
  // Solo se activa si:
  //   - No está deshabilitado explícitamente (disableAutoRedirect = false)
  //   - La variante tiene definida una ruta destino (destination no es null)
  //   - La duración es mayor a 0 (loading tiene duración 0, no redirige)
  const shouldRedirect = !disableAutoRedirect && destination && duration > 0;
  useAnimationTimer(
    shouldRedirect ? duration : 0,
    shouldRedirect ? destination : null
  );

  // --------------------------------------------------------------------------
  // RENDERIZADO
  // --------------------------------------------------------------------------
  // Se delega completamente en AnimationLayout, pasando todas las props resueltas.
  // El divisor (showDivider) se muestra siempre (valor por defecto true).
  return (
    <AnimationLayout
      title={title}
      subtitle={subtitle}
      accentColor={accentColor}
      circleContent={circleContent}
      extraContent={extraContent}
      dividerWidth={dividerWidth}
      circlePadding={circlePadding}
      showDivider
    />
  );
}