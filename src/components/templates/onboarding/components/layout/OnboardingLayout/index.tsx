// ============================================================================
// LAYOUT BASE PARA EL FLUJO DE ONBOARDING
//
// Este componente provee la estructura visual común a todas las pantallas del
// onboarding: fondo oscuro corporativo, contenedor con padding consistente,
// botón "Saltar" en la esquina superior derecha y un área central flexible
// donde se inyecta el contenido específico de cada paso.
//
// El layout delega completamente la lógica de negocio y el contenido variable
// a sus hijos, limitándose a la presentación y a la posición del botón de salto.
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS
// ----------------------------------------------------------------------------
import React from 'react';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES ATMÓMICOS
// ----------------------------------------------------------------------------
// AppContainer: Viewport principal con safe area y fondo uniforme.
// AppStack: Layout flexible basado en Yoga (gap, alineaciones).
// AppButton: Botón configurable con variantes y estados.
// AppText: Texto tipográfico con variantes predefinidas.
import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import AppButton from '@/components/atoms/action/AppButton';
import AppText from '@/components/atoms/content/AppText';

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
// SPACING: Sistema de espaciado consistente (s, m, l, xl...)
// PALETTE: Colores corporativos y funcionales.
import { SPACING } from '@/constants/metrics';
import { PALETTE } from '@/constants/colors';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { OnboardingLayoutProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------
/**
 * Envoltura visual para todas las pantallas de onboarding.
 *
 * El componente se mantiene intencionalmente simple y sin estado:
 * - No gestiona lógica de navegación (solo ejecuta onSkip).
 * - No decide cuándo mostrar el progreso (la prop showProgress está
 *   definida en la interfaz pero no se usa; se delega en OnboardingStep).
 * - Usa el color de fondo deepNight (#0B0E12) para mantener la identidad
 *   visual de la app en todo el flujo de bienvenida.
 */
export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  onSkip,
  skipButtonText,
}) => {
  const { t } = useTranslation();

  return (
    // Fondo negro azulado profundo, consistente con el ecosistema SURV
    <AppContainer style={{ backgroundColor: PALETTE.deepNight }}>
      {/* ----------------------------------------------------------------
          Contenedor principal con padding lateral estándar.
          Padding vertical: l (16px) – separación respecto a los bordes.
          Padding horizontal: m (12px) – respiración en los laterales.
      ---------------------------------------------------------------- */}
      <AppStack
        flex={1}
        style={{ paddingVertical: SPACING.l, paddingHorizontal: SPACING.m }}
      >
        {/* ----------------------------------------------------------------
            Botón "Saltar" anclado a la derecha.
            - Variante 'outline' + estado 'neutral' → borde gris tenue,
              sin fondo, para no competir con el contenido principal.
            - Padding interno reducido (m/s) para mantener el botón compacto.
        ---------------------------------------------------------------- */}
        <AppStack direction="horizontal" justify="flex-end">
          <AppButton
            onPress={onSkip}
            variant="outline"
            status="neutral"
            style={{
              paddingHorizontal: SPACING.m,
              paddingVertical: SPACING.s,
            }}
          >
            <AppText variant="caption" style={{ fontWeight: '500' }}>
              {/*
                Si se proporciona skipButtonText se usa ese valor;
                de lo contrario se recurre a la clave i18n 'onboarding.skip'.
                Esta lógica permite personalizar el texto sin duplicar
                el componente completo.
              */}
              {skipButtonText || t('onboarding.skip')}
            </AppText>
          </AppButton>
        </AppStack>

        {/* ----------------------------------------------------------------
            Área central flexible.
            - flex: 1 → ocupa todo el espacio restante.
            - justify="center", align="center" → centrado perfecto.
            - gap="xl" → separación consistente entre los elementos hijos
              (icono, título, descripción, indicador, botón).
            Aquí se inyecta el contenido específico del paso.
        ---------------------------------------------------------------- */}
        <AppStack flex={1} justify="center" align="center" gap="xl">
          {children}
        </AppStack>
      </AppStack>
    </AppContainer>
  );
};