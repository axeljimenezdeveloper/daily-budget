// ============================================================================
// SELECTOR DE HORA REUTILIZABLE (AppTimePicker)
//
// Este componente se integra visualmente como un AppListItem:
// - Ícono de reloj a la izquierda (time-outline)
// - Etiqueta textual a la izquierda (prop label)
// - A la derecha muestra la hora seleccionada o el placeholder
// - Al presionar se abre el selector nativo (Android) o un modal personalizado (iOS)
// - Utiliza AppPressable internamente (a través de AppListItem) para feedback táctil
// ============================================================================

import React, { useState } from 'react';
import { View, Platform, Modal } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';

// Componentes base
import AppListItem from '@/components/atoms/action/AppListItem';
import AppText from '@/components/atoms/content/AppText';
import AppStack from '@/components/atoms/structure/AppStack';
import AppButton from '@/components/atoms/action/AppButton';

// Utilidades y estilos
import { timeStringToDate, dateToTimeString } from './index.utils';
import { styles } from './index.styles';
import { AppTimePickerProps } from './index.props';

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
    timeStringToDate(value || '20:00')
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
      setTempTime(timeStringToDate(value || '20:00'));
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
    <>
      {/* ----------------------------------------------------------------
        ÍTEM PRINCIPAL (con aspecto de AppListItem)
        - Icono: time-outline (Ionicons)
        - Label: texto descriptivo
        - Right content: hora seleccionada o placeholder
        - OnPress: abre el selector
      ---------------------------------------------------------------- */}
      <AppListItem
        icon="time-outline"
        label={label || ''}
        onPress={handlePress}
        disabled={disabled}
        rightContent={
          <AppText color={value ? 'primary' : 'secondary'}>
            {value || displayPlaceholder}
          </AppText>
        }
        style={style}
      />

      {/* ----------------------------------------------------------------
        ANDROID: Diálogo nativo de selección de hora
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
    </>
  );
}