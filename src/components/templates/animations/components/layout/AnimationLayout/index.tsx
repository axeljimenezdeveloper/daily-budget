// ============================================================================
// LAYOUT BASE PARA TODAS LAS PANTALLAS DE ANIMACIÓN
//
// Este componente provee la estructura visual común a todas las pantallas
// de animación: fondo negro profundo, contenedor centrado, círculo decorativo,
// título, divisor, subtítulo, contenido extra y footer de versión.
//
// Soporta dos modos de uso:
//   1. Declarativo: mediante la prop `variant`, que carga configuración predefinida.
//   2. Manual: pasando explícitamente `accentColor`, `dividerWidth`, `circlePadding`.
//
// El layout está optimizado para pantallas de carga, transición y éxito,
// siguiendo la identidad visual de SURV.
// ============================================================================

import React from 'react';
import AppText from '@/components/atoms/content/AppText';
import AppStack from '@/components/atoms/structure/AppStack';
import AppContainer from '@/components/atoms/structure/AppContainer';
import AppBox from '@/components/atoms/structure/AppBox';
import AppDivider from '@/components/atoms/structure/AppDivider';
import { PALETTE } from '@/constants/colors';
import { SPACING } from '@/constants/metrics';
import { getAppInfoForFooter } from '@/utils/version';
import {
  DIVIDER_WIDTH,
  CIRCLE_PADDING,
  ANIMATION_VARIANT_CONFIG,
} from '../../../constants';
import { AnimationLayoutProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
export default function AnimationLayout({
  title,
  subtitle,
  accentColor: propAccentColor,
  circleBackgroundColor,
  circleContent,
  extraContent,
  showDivider = true,
  dividerWidth: propDividerWidth,
  circlePadding: propCirclePadding,
  footerText,
  variant,
}: AnimationLayoutProps) {
  // --------------------------------------------------------------------------
  // RESOLUCIÓN DE CONFIGURACIÓN DESDE VARIANTE
  // --------------------------------------------------------------------------
  // Si se proporciona una variante, obtenemos su configuración predefinida.
  // Esta configuración incluye color, ancho de divisor y padding del círculo.
  const variantConfig = variant ? ANIMATION_VARIANT_CONFIG[variant] : null;

  // --------------------------------------------------------------------------
  // RESOLUCIÓN DE COLOR DE ACENTO
  // --------------------------------------------------------------------------
  // Prioridad: prop explícita > configuración de variante > fallback (sunsetOrange)
  const accentColor = propAccentColor ?? variantConfig?.color ?? PALETTE.sunsetOrange;

  // --------------------------------------------------------------------------
  // RESOLUCIÓN DE ANCHO DEL DIVISOR
  // --------------------------------------------------------------------------
  // Prioridad: prop explícita > configuración de variante > valor por defecto (40px)
  const dividerWidth = propDividerWidth ?? variantConfig?.dividerWidth ?? DIVIDER_WIDTH.DEFAULT;

  // --------------------------------------------------------------------------
  // RESOLUCIÓN DE PADDING DEL CÍRCULO
  // --------------------------------------------------------------------------
  // El padding puede ser:
  //   - Número: se usa directamente (útil para valores personalizados)
  //   - String: debe ser una clave de SPACING (ej. 'l', 'xl')
  //   - undefined: se toma de la configuración de variante o del valor por defecto
  const circlePaddingValue = (() => {
    if (propCirclePadding !== undefined) {
      return typeof propCirclePadding === 'number'
        ? propCirclePadding
        : SPACING[propCirclePadding];
    }
    if (variantConfig?.circlePadding) {
      return SPACING[variantConfig.circlePadding];
    }
    return SPACING[CIRCLE_PADDING.DEFAULT];
  })();

  // --------------------------------------------------------------------------
  // GENERACIÓN DE FONDO POR DEFECTO PARA EL CÍRCULO
  // --------------------------------------------------------------------------
  // Si no se proporciona circleBackgroundColor, generamos un color con
  // 5% de opacidad del accentColor. Esto replica el comportamiento de
  // las pantallas originales (rgba(245,123,56,0.05), rgba(66,153,225,0.05), etc.)
  const defaultCircleBg = `${accentColor}${Math.round(0.05 * 255)
    .toString(16)
    .padStart(2, '0')}`;
  const circleBg = circleBackgroundColor ?? defaultCircleBg;

  // --------------------------------------------------------------------------
  // RENDERIZADO
  // --------------------------------------------------------------------------
  return (
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      {/* Stack principal que ocupa toda la pantalla y centra el contenido */}
      <AppStack
        flex={1}
        justify="center"
        align="center"
        style={{ padding: SPACING.xl }}
      >
        {/* Contenedor principal del contenido (círculo + texto) */}
        <AppStack align="center" gap="xl" style={{ marginBottom: SPACING.xxl }}>
          {/* ----------------------------------------------------------------
            CÍRCULO DECORATIVO
            Contiene el spinner o ícono, con fondo semitransparente.
            El padding, radio y color de fondo son totalmente configurables.
          ---------------------------------------------------------------- */}
          <AppBox
            padding={circlePaddingValue}
            align="center"
            justify="center"
            radius={100}
            background={circleBg}
          >
            {circleContent}
          </AppBox>

          {/* ----------------------------------------------------------------
            BLOQUE DE TEXTO
            Título (con estilo h1 por defecto), divisor decorativo,
            subtítulo y contenido extra opcional.
          ---------------------------------------------------------------- */}
          <AppStack align="center" gap="xs">
            {/* Título: si es string se aplica formato estándar; si es nodo se renderiza tal cual */}
            {typeof title === 'string' ? (
              <AppText
                variant="h1"
                style={{
                  fontSize: 32,
                  letterSpacing: -0.5,
                  textAlign: 'center',
                }}
              >
                {title}
              </AppText>
            ) : (
              title
            )}

            {/* Divisor decorativo (opcional, activado por defecto) */}
            {showDivider && (
              <AppDivider
                color={accentColor}
                thickness={2}
                width={dividerWidth}
                borderRadius={1}
                marginVertical="s"
                alignSelf="center"
              />
            )}

            {/* Subtítulo: mismo patrón que el título (string → AppText, nodo → directo) */}
            {subtitle &&
              (typeof subtitle === 'string' ? (
                <AppText
                  variant="body"
                  color="secondary"
                  align="center"
                  style={{ opacity: 0.9 }}
                >
                  {subtitle}
                </AppText>
              ) : (
                subtitle
              ))}

            {/* Contenido extra (ej. slogan de success) */}
            {extraContent}
          </AppStack>
        </AppStack>

        {/* ----------------------------------------------------------------
          FOOTER DE VERSIÓN
          Siempre fijo en la parte inferior, muestra información de la build.
          El texto es personalizable mediante footerText; por defecto usa
          getAppInfoForFooter(true, 'Alpha').
        ---------------------------------------------------------------- */}
        <AppBox position="absolute" bottom={SPACING.xxl}>
          <AppText variant="label" color="secondary" style={{ opacity: 0.4 }}>
            {footerText ?? getAppInfoForFooter(true, 'Alpha')}
          </AppText>
        </AppBox>
      </AppStack>
    </AppContainer>
  );
}