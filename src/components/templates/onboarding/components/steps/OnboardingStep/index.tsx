// ============================================================================
// COMPONENTE REUTILIZABLE PARA CADA PASO DEL ONBOARDING
//
// Este componente encapsula la estructura visual y lógica de presentación
// de cada pantalla individual del flujo de onboarding. Recibe toda la
// configuración específica del paso mediante props y delega el layout base
// en OnboardingLayout.
//
// Responsabilidades:
//   - Renderizar ícono dentro de un círculo decorativo con fondo semitransparente.
//   - Mostrar título y descripción con formato enriquecido (JSX).
//   - Indicador de progreso mediante puntos (AppProgressDots).
//   - Botón de acción principal (Siguiente / Comenzar).
//   - Reenviar callbacks de navegación al layout.
//
// NOTA: Este componente NO maneja lógica de negocio ni navegación directa;
//       solo ejecuta los callbacks que recibe desde la pantalla contenedora.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS
// ----------------------------------------------------------------------------
import React from 'react';
import { View } from 'react-native';

// ----------------------------------------------------------------------------
// COMPONENTES ATMÓMICOS
// ----------------------------------------------------------------------------
// AppText: Texto tipográfico con variantes predefinidas 
// AppIcon: Ícono vectorizado con soporte múltiples librerías
// AppButton: Botón interactivo con variantes de estado
// AppStack: Layout flexible con sistema de gap
// AppProgressDots: Indicador visual de progreso tipo "paginación"
import AppText from '@/components/atoms/content/AppText';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppButton from '@/components/atoms/action/AppButton';
import AppStack from '@/components/atoms/structure/AppStack';
import AppProgressDots from '@/components/atoms/visual/AppProgressDots';

// ----------------------------------------------------------------------------
// COMPONENTE LAYOUT BASE
// ----------------------------------------------------------------------------
// OnboardingLayout aporta la estructura común: fondo, botón de saltar y área centrada.
import { OnboardingLayout } from '../../layout/OnboardingLayout';

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
// SPACING: Sistema de espaciado (xl = 24px, m = 12px, etc.)
// BORDER_RADIUS: Valores de borde redondeado (round = 100)
// PALETTE: Colores corporativos (sunsetOrange, slateGray, deepNight...)
import { SPACING, BORDER_RADIUS } from '@/constants/metrics';
import { PALETTE } from '@/constants/colors';

// ----------------------------------------------------------------------------
// TIPOS PROPS
// ----------------------------------------------------------------------------
// OnboardingStepProps: Definición centralizada en types/ (ver JSDoc allí)
import { OnboardingStepProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
/**
 * Plantilla de paso individual para el flujo de onboarding.
 *
 * @param props - Ver `OnboardingStepProps` para detalles completos.
 * @returns Elemento JSX configurado según el paso.
 */
export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  stepNumber,
  totalSteps,
  title,
  description,
  iconName,
  iconLibrary = 'Ionicons',
  buttonText,
  onNext,
  onSkip,
  skipButtonText,
  buttonStatus = 'primary',
  iconRotation = 0,
}) => {
  return (
    // ------------------------------------------------------------------------
    // LAYOUT BASE: Fondo, botón saltar, contenedor centrado
    // ------------------------------------------------------------------------
    <OnboardingLayout
      onSkip={onSkip}
      skipButtonText={skipButtonText}
      currentStep={stepNumber - 1}        // El layout espera índice 0‑based
      totalSteps={totalSteps}
      // El indicador de progreso se renderiza aquí, no en el layout,
      // por eso se desactiva explícitamente.
      showProgress={false}
    >
      {/* ----------------------------------------------------------------
          CÍRCULO DECORATIVO DEL ÍCONO
          - Fondo: sunsetOrange con 15% de opacidad (formato hexadecimal).
          - Borde: mismo color con 30% de opacidad para dar profundidad.
          - Padding interno grande (xl) para dar respiro al ícono.
          - border-radius: round (100) → círculo perfecto.
      ---------------------------------------------------------------- */}
      <View
        style={{
          padding: SPACING.xl,
          borderRadius: BORDER_RADIUS.round,
          backgroundColor: `${PALETTE.sunsetOrange}15`, // Opacidad 15%
          borderWidth: 1,
          borderColor: `${PALETTE.sunsetOrange}30`,     // Opacidad 30%
        }}
      >
        <AppIcon
          name={iconName}
          library={iconLibrary}
          size="xxxl"                       // Tamaño extra‑extra‑large
          color="accent"                   // Usa el color de acento global
          // Solo se aplica rotación si el valor es distinto de 0
          style={iconRotation ? { transform: [{ rotate: `${iconRotation}deg` }] } : undefined}
        />
      </View>

      {/* ----------------------------------------------------------------
          BLOQUE DE TEXTO (TÍTULO + DESCRIPCIÓN)
          - maxWidth: 320 para legibilidad en pantallas grandes.
          - gap="m" separación entre título y descripción.
      ---------------------------------------------------------------- */}
      <AppStack align="center" gap="m" style={{ maxWidth: 320 }}>
        <AppText variant="h1" align="center">
          {title}
        </AppText>

        {/* La descripción puede ser string o ReactNode (formato enriquecido) */}
        <AppText
          variant="body"
          align="center"
          color="secondary"                // Gris claro para contraste sobre fondo oscuro
          style={{ lineHeight: 24 }}       // Altura de línea manual para mejorar lectura
        >
          {typeof description === 'string' ? description : description}
        </AppText>
      </AppStack>

      {/* ----------------------------------------------------------------
          INDICADOR DE PROGRESO (PUNTOS)
          - current: índice 0‑based (stepNumber - 1).
          - Colores: sunsetOrange (activo) / slateGray (inactivo).
          - inactiveOpacity: 0.5 para suavizar visualmente.
      ---------------------------------------------------------------- */}
      <AppProgressDots
        total={totalSteps}
        current={stepNumber - 1}
        size="m"
        spacing="m"
        activeColor={PALETTE.sunsetOrange}
        inactiveColor={PALETTE.slateGray}
        inactiveOpacity={0.5}
      />

      {/* ----------------------------------------------------------------
          BOTÓN DE ACCIÓN PRINCIPAL
          - Ancho completo (100%) para fácil pulsación.
          - El estilo (primary, accent, etc.) se controla desde la pantalla.
          - El texto se recibe como prop y ya está traducido.
      ---------------------------------------------------------------- */}
      <AppStack style={{ width: '100%' }}>
        <AppButton
          onPress={onNext}
          status={buttonStatus}
          style={{ width: '100%' }}
        >
          <AppText style={{ fontWeight: '700' }}>
            {buttonText}
          </AppText>
        </AppButton>
      </AppStack>
    </OnboardingLayout>
  );
};