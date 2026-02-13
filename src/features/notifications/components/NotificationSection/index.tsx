// ============================================================================
// SECCIÓN CONFIGURABLE DE NOTIFICACIONES (NotificationSection)
//
// Componente reutilizable que agrupa los controles para una preferencia
// de notificación dentro de la pantalla de Ajustes (o cualquier otra).
//
// Incluye:
//   - Título + switch de activación.
//   - Descripción opcional (texto informativo).
//   - Selector de hora condicional: se muestra solo si showTimePicker=true
//     y el switch está activado (enabled=true).
//   - Área para contenido extra (ej. botón de prueba).
//
// El placeholder del selector de hora está internacionalizado mediante i18n.
// Los textos de título y descripción deben venir ya traducidos desde el padre.
// ============================================================================

import React from 'react';
import { useTranslation } from 'react-i18next';

import AppBox from '@/components/atoms/structure/AppBox';
import AppStack from '@/components/atoms/structure/AppStack';
import AppText from '@/components/atoms/content/AppText';
import AppSwitch from '@/components/atoms/action/AppSwitch';
import AppSpacer from '@/components/atoms/structure/AppSpacer';
import AppTimePicker from '@/components/atoms/action/AppTimePicker';

import { styles } from './index.styles';
import { NotificationSectionProps } from './index.props';

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

/**
 * Componente de sección para configurar una notificación con toggle.
 * Soporta un selector de hora opcional y un área para contenido extra.
 *
 * @param title         - Título de la sección (debe venir traducido).
 * @param description   - Texto descriptivo opcional (traducido).
 * @param enabled       - Estado actual del switch.
 * @param onToggle      - Callback al cambiar el switch.
 * @param showTimePicker- Controla si se muestra el selector de hora.
 * @param timeValue     - Hora actual en formato HH:mm (para el picker).
 * @param onTimeChange  - Callback al cambiar la hora.
 * @param disabled      - Deshabilita toda la sección (switch + picker).
 * @param extra         - Nodo React para contenido adicional (ej. botón de prueba).
 */
export default function NotificationSection({
  title,
  description,
  enabled,
  onToggle,
  showTimePicker = false,
  timeValue,
  onTimeChange,
  disabled = false,
  extra,
}: NotificationSectionProps) {
  const { t } = useTranslation();

  return (
    <AppBox style={styles.container}>
      <AppStack direction="vertical" gap="s">
        {/* ----------------------------------------------------------------
          Fila principal: título + switch
        ---------------------------------------------------------------- */}
        <AppStack direction="horizontal" justify="space-between" align="center">
          <AppText variant="body" color={disabled ? 'secondary' : 'primary'}>
            {title}
          </AppText>
          <AppSwitch
            value={enabled}
            onValueChange={onToggle}
            disabled={disabled}
          />
        </AppStack>

        {/* ----------------------------------------------------------------
          Descripción (solo si existe)
        ---------------------------------------------------------------- */}
        {description && (
          <AppText variant="caption" color="secondary">
            {description}
          </AppText>
        )}

        {/* ----------------------------------------------------------------
          Selector de hora
          - Solo se renderiza si showTimePicker = true y el switch está activado.
          - El placeholder se obtiene del archivo de traducciones.
        ---------------------------------------------------------------- */}
        {showTimePicker && enabled && (
          <>
            <AppSpacer size="s" />
            <AppTimePicker
              value={timeValue || '20:00'}
              onChange={onTimeChange || (() => {})}
              disabled={disabled}
              placeholder={t('common.time_picker.placeholder')}
            />
          </>
        )}

        {/* ----------------------------------------------------------------
          Elemento extra (ej. botón de prueba en entorno de desarrollo)
        ---------------------------------------------------------------- */}
        {extra && (
          <>
            <AppSpacer size="s" />
            {extra}
          </>
        )}
      </AppStack>
    </AppBox>
  );
}