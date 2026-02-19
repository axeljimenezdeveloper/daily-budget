// ============================================================================
// SECCIÓN DE NOTIFICACIONES - NotificationsSection
//
// Componente que agrupa todas las opciones de configuración de notificaciones:
// - Recordatorio diario
// - Alerta de modo cuidado
// - Alerta de presupuesto excedido
// - Selector de hora para el recordatorio
// - Botón de notificación de prueba
// ============================================================================

// ----------------------------------------------------------------------------
// DEPENDENCIAS EXTERNAS
// ----------------------------------------------------------------------------
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------------
// COMPONENTES ATÓMICOS
// ----------------------------------------------------------------------------
import AppBox from '@/components/atoms/structure/AppBox';
import AppText from '@/components/atoms/content/AppText';
import AppListItem from '@/components/atoms/action/AppListItem';
import AppSwitch from '@/components/atoms/action/AppSwitch';
import AppDivider from '@/components/atoms/structure/AppDivider';
import AppTimePicker from '@/components/atoms/action/AppTimePicker';
import AppSpinner from '@/components/atoms/visual/AppSpinner';

// ----------------------------------------------------------------------------
// CONSTANTES GLOBALES
// ----------------------------------------------------------------------------
import { SPACING } from '@/constants/metrics';

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------
import { NotificationsSectionProps } from './index.props';

// ----------------------------------------------------------------------------
// SUBCOMPONENTES MEMOIZADOS (INTERNOS)
// ----------------------------------------------------------------------------

const DailyReminderItem = memo<{
  value: boolean;
  isSaving: boolean;
  onChange: (val: boolean) => void;
}>(({ value, isSaving, onChange }) => {
  const { t } = useTranslation();

  const rightContent = (
    <AppBox style={{ width: 50, height: 32 }} align="center" justify="center">
      {isSaving ? (
        <AppSpinner size="s" color="accent" />
      ) : (
        <AppSwitch value={value} onValueChange={onChange} disabled={isSaving} />
      )}
    </AppBox>
  );

  return (
    <>
      <AppListItem
        label={t('settings.daily_reminder_title')}
        subLabel={t('settings.daily_reminder_description')}
        icon="notifications-outline"
        rightContent={rightContent}
      />
      <AppDivider color="darkBorder" thickness={1} marginVertical="s" />
    </>
  );
});

const ExtremeAlertItem = memo<{
  value: boolean;
  onChange: (val: boolean) => void;
}>(({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <>
      <AppListItem
        label={t('settings.extreme_alert_title')}
        subLabel={t('settings.extreme_alert_description')}
        icon="alert-circle-outline"
        rightContent={<AppSwitch value={value} onValueChange={onChange} />}
      />
      <AppDivider color="darkBorder" thickness={1} marginVertical="s" />
    </>
  );
});

const BudgetExceededItem = memo<{
  value: boolean;
  onChange: (val: boolean) => void;
}>(({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <>
      <AppListItem
        label={t('settings.budget_exceeded_title')}
        subLabel={t('settings.budget_exceeded_description')}
        icon="warning-outline"
        rightContent={<AppSwitch value={value} onValueChange={onChange} />}
      />
      <AppDivider color="darkBorder" thickness={1} marginVertical="s" />
    </>
  );
});

const ReminderTimeItem = memo<{
  value: string;
  isSaving: boolean;
  onChange: (time: string) => void;
}>(({ value, isSaving, onChange }) => {
  const { t } = useTranslation();
  return (
    <>
      <AppTimePicker
        value={value}
        onChange={onChange}
        label={t('settings.daily_reminder_title')}
        placeholder={t('common.time_picker.placeholder')}
        disabled={isSaving}
      />
      <AppDivider color="darkBorder" thickness={1} marginVertical="s" />
    </>
  );
});

const TestNotificationItem = memo<{
  onPress: () => void;
}>(({ onPress }) => {
  const { t } = useTranslation();
  return (
    <AppListItem
      label={t('settings.test_button')}
      icon="send-outline"
      onPress={onPress}
      isActive
    />
  );
});

// ----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (MEMOIZADO)
// ----------------------------------------------------------------------------
export const NotificationsSection: React.FC<NotificationsSectionProps> = React.memo(({
  dailyReminder,
  extremeModeAlert,
  budgetExceededAlert,
  reminderTime,
  isSaving,
  onDailyReminderChange,
  onExtremeAlertChange,
  onBudgetExceededChange,
  onReminderTimeChange,
  onTestNotification,
}) => {
  const { t } = useTranslation();

  return (
    <AppBox marginBottom="xl">
      <AppText variant="h3" color="accent" style={{ marginBottom: SPACING.s }}>
        {t('settings.notifications_section')}
      </AppText>
      <AppBox>
        <DailyReminderItem
          value={dailyReminder}
          isSaving={isSaving}
          onChange={onDailyReminderChange}
        />
        <ExtremeAlertItem value={extremeModeAlert} onChange={onExtremeAlertChange} />
        <BudgetExceededItem value={budgetExceededAlert} onChange={onBudgetExceededChange} />
        <ReminderTimeItem value={reminderTime} isSaving={isSaving} onChange={onReminderTimeChange} />
        <TestNotificationItem onPress={onTestNotification} />
      </AppBox>
    </AppBox>
  );
});

NotificationsSection.displayName = 'NotificationsSection';

// Asignar displayName a los subcomponentes para mejor depuración
DailyReminderItem.displayName = 'DailyReminderItem';
ExtremeAlertItem.displayName = 'ExtremeAlertItem';
BudgetExceededItem.displayName = 'BudgetExceededItem';
ReminderTimeItem.displayName = 'ReminderTimeItem';
TestNotificationItem.displayName = 'TestNotificationItem';