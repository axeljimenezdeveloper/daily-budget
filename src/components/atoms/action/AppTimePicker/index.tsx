// ============================================================================
// SELECTOR DE HORA REUTILIZABLE (AppTimePicker)
//
// Proporciona un campo de entrada para seleccionar hora en formato HH:mm.
// - Android: diálogo nativo (DateTimePicker modal).
// - iOS:   modal personalizado con picker spinner y botones Cancelar/Confirmar.
// - Soporta i18n: todos los textos visibles se obtienen del hook useTranslation.
// - Fallback: si no se provee value, se muestra el placeholder traducido.
// ============================================================================

import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Modal } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

import AppText from '@/components/atoms/content/AppText';
import AppIcon from '@/components/atoms/content/AppIcon';
import AppStack from '@/components/atoms/structure/AppStack';
import AppButton from '@/components/atoms/action/AppButton';
import { styles } from './index.styles';
import { AppTimePickerProps } from './index.props';

// ----------------------------------------------------------------------------
// UTILIDADES DE CONVERSIÓN (HH:mm <-> Date)
// ----------------------------------------------------------------------------

/**
 * Convierte un string en formato "HH:mm" a un objeto Date.
 * Se utiliza una fecha fija (2000-01-01) para aislar solo la hora.
 *
 * @param time - Hora en formato "HH:mm" (24h)
 * @returns Objeto Date con la hora especificada.
 */
const timeStringToDate = (time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(2000, 0, 1, hours, minutes);
};

/**
 * Convierte un objeto Date a string en formato "HH:mm" (24h, dos dígitos).
 *
 * @param date - Objeto Date.
 * @returns Hora en formato "HH:mm".
 */
const dateToTimeString = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL
// ----------------------------------------------------------------------------

export default function AppTimePicker({
  value,
  onChange,
  disabled = false,
  label,
  placeholder,
  style,
}: AppTimePickerProps) {
  const { t } = useTranslation();

  // Estado para Android: visibilidad del diálogo nativo
  const [androidPickerVisible, setAndroidPickerVisible] = useState(false);

  // Estado para iOS: control del modal y valor temporal durante la edición
  const [iosModalVisible, setIosModalVisible] = useState(false);
  const [tempTime, setTempTime] = useState<Date>(() =>
    value ? timeStringToDate(value) : timeStringToDate('20:00')
  );

  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';

  // --------------------------------------------------------------------------
  // MANEJADORES DE INTERACCIÓN
  // --------------------------------------------------------------------------

  const handlePress = () => {
    if (disabled) return;
    if (isAndroid) {
      setAndroidPickerVisible(true);
    } else {
      // En iOS: preparamos el modal con la hora actual
      setTempTime(value ? timeStringToDate(value) : timeStringToDate('20:00'));
      setIosModalVisible(true);
    }
  };

  // --- Android: confirmar / cancelar desde el picker nativo ---
  const handleAndroidChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setAndroidPickerVisible(false);
    if (event.type === 'set' && selectedDate) {
      onChange(dateToTimeString(selectedDate));
    }
  };

  // --- iOS: confirmar desde el modal ---
  const handleIosConfirm = () => {
    onChange(dateToTimeString(tempTime));
    setIosModalVisible(false);
  };

  // --- iOS: cancelar desde el modal ---
  const handleIosCancel = () => {
    setIosModalVisible(false);
  };

  // Resolver placeholder: si no se provee, usar el valor traducido por defecto
  const displayPlaceholder = placeholder ?? t('common.time_picker.placeholder');

  return (
    <View style={[styles.container, style]}>
      {label && (
        <AppText variant="label" color="secondary" style={styles.label}>
          {label}
        </AppText>
      )}

      <TouchableOpacity
        style={[styles.pickerButton, disabled && styles.disabled]}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <AppText
          variant="body"
          color={value ? 'primary' : 'secondary'}
          style={styles.timeText}
        >
          {value || displayPlaceholder}
        </AppText>
        <AppIcon
          name="time-outline"
          library="Ionicons"
          size="m"
          color={disabled ? 'secondary' : 'primary'}
        />
      </TouchableOpacity>

      {/* ----------------------------------------------------------------
        ANDROID: Diálogo nativo de selección de hora
        Se muestra solo cuando el usuario presiona el botón.
      ---------------------------------------------------------------- */}
      {isAndroid && androidPickerVisible && (
        <DateTimePicker
          value={timeStringToDate(value || '20:00')}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleAndroidChange}
        />
      )}

      {/* ----------------------------------------------------------------
        iOS: Modal personalizado con picker y botones
        - Título, botones Cancelar/Confirmar traducidos.
        - El picker actualiza el estado temporal local.
      ---------------------------------------------------------------- */}
      {isIOS && (
        <Modal
          transparent={true}
          visible={iosModalVisible}
          animationType="slide"
          onRequestClose={handleIosCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <AppStack direction="vertical" gap="l" style={styles.modalInner}>
                <AppText variant="h3" align="center">
                  {t('common.time_picker.title')}
                </AppText>

                <DateTimePicker
                  value={tempTime}
                  mode="time"
                  is24Hour={true}
                  display="spinner"
                  onChange={(event, date) => {
                    if (date) setTempTime(date);
                  }}
                />

                <AppStack direction="horizontal" gap="m" justify="space-evenly">
                  <AppButton variant="outline" onPress={handleIosCancel}>
                    {t('common.time_picker.cancel')}
                  </AppButton>
                  <AppButton variant="filled" onPress={handleIosConfirm}>
                    {t('common.time_picker.confirm')}
                  </AppButton>
                </AppStack>
              </AppStack>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}