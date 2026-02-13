import React, { useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useVaultStore } from '@/store/useVaultStore';
import { formatMoney } from '@/store/useVaultStore/index.utils';

// Átomos
import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import AppInput from '@/components/atoms/action/AppInput';
import AppButton from '@/components/atoms/action/AppButton';
import AppCard from '@/components/atoms/surface/AppCard';
import AppDivider from '@/components/atoms/structure/AppDivider';
import AppText from '@/components/atoms/content/AppText';

export default function TestStoreScreen() {
  const { t } = useTranslation();

  // --------------------------------------------------------------------------
  // STORE – Estado completo y acciones
  // --------------------------------------------------------------------------
  const state = useVaultStore();

  const {
    // Estado financiero
    totalBudget,
    remainingBudget,
    isExtremeMode,
    transactions,
    daysDuration,
    startDate,
    isConfigured,
    hasFinishedOnboarding,
    currency,
    language,

    // Notificaciones
    notificationPreferences,
    notificationsScheduledForDate,
    hasRequestedPermissions,

    // Flags internos
    _hasHydrated,

    // Acciones
    initVault,
    addTransaction,
    resetVault,
    setLanguage,
    getSummary,
  } = state;

  // --------------------------------------------------------------------------
  // Estado local para inputs
  // --------------------------------------------------------------------------
  const [amountInput, setAmountInput] = useState('');
  const [daysInput, setDaysInput] = useState('7');
  const [currencyInput, setCurrencyInput] = useState(currency || '$');

  // --------------------------------------------------------------------------
  // Manejadores
  // --------------------------------------------------------------------------
  const handleInit = () => {
    const amt = parseFloat(amountInput);
    const dys = parseInt(daysInput);
    if (isNaN(amt) || isNaN(dys) || !currencyInput) {
      return Alert.alert('Error', 'Completa los parámetros de la misión');
    }
    initVault(amt, dys, currencyInput);
    setAmountInput('');
  };

  const handleQuickSpend = (val: number, isVital: boolean) => {
    const category = isVital
      ? t('common.vital_supply', 'Vital')
      : t('common.leak_luxury', 'Lujo');
    addTransaction(val, category, 'Gasto de prueba');
  };

  // --------------------------------------------------------------------------
  // Resumen calculado
  // --------------------------------------------------------------------------
  const summary = getSummary?.() || {
    totalSpent: 0,
    daysPassed: 0,
    isOverBudget: false,
    dailyAverage: 0,
  };

  return (
    <AppContainer>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <AppStack gap="l">
          {/* ====================================================================
               CABECERA
          ==================================================================== */}
          <AppText
            variant="h2"
            color="primary"
            style={{ marginTop: 20, textTransform: 'uppercase' }}
          >
            🧪 Survival Console
          </AppText>

          {/* ====================================================================
               SELECTOR DE IDIOMA (funcional)
          ==================================================================== */}
          <AppStack gap="s">
            <AppText variant="label" color="secondary">
              SISTEMA DE LENGUAJE
            </AppText>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <AppButton
                  status={language === 'es' ? 'info' : 'neutral'}
                  variant={language === 'es' ? 'filled' : 'outline'}
                  onPress={() => setLanguage('es')}
                >
                  Español 🇪🇸
                </AppButton>
              </View>
              <View style={{ flex: 1 }}>
                <AppButton
                  status={language === 'en' ? 'info' : 'neutral'}
                  variant={language === 'en' ? 'filled' : 'outline'}
                  onPress={() => setLanguage('en')}
                >
                  English 🇺🇸
                </AppButton>
              </View>
            </View>
          </AppStack>

          <AppDivider />

          {/* ====================================================================
               MONITOR DEL TANQUE DE OXÍGENO (resumen visual)
          ==================================================================== */}
          <AppCard
            style={{
              borderColor: isExtremeMode ? '#EF4444' : '#1E293B',
              borderWidth: 2,
              backgroundColor: isExtremeMode ? '#1a0505' : '#0f172a',
            }}
          >
            <AppStack gap="xs">
              <AppText
                variant="label"
                color={isExtremeMode ? 'error' : 'secondary'}
                style={{ letterSpacing: 1.5 }}
              >
                STATUS:{' '}
                {isExtremeMode
                  ? t('common.extreme_mode', 'MODO CUIDADO').toUpperCase()
                  : 'ESTABLE'}
              </AppText>

              <AppText
                variant="h1"
                color="primary"
                style={{ marginVertical: 8 }}
              >
                {formatMoney(remainingBudget, currency)}
              </AppText>

              <View
                style={{
                  height: 8,
                  backgroundColor: '#1E293B',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: `${Math.min(
                      Math.max((remainingBudget / totalBudget) * 100, 0),
                      100
                    )}%`,
                    height: '100%',
                    backgroundColor: isExtremeMode ? '#EF4444' : '#22C55E',
                  }}
                />
              </View>

              <AppText variant="caption" color="secondary" style={{ marginTop: 8 }}>
                {t('common.oxygen_tank', 'Tanque')}:{' '}
                <AppText variant="caption" color="primary">
                  {formatMoney(totalBudget, currency)}
                </AppText>
              </AppText>
            </AppStack>
          </AppCard>

          {/* ====================================================================
               CONFIGURACIÓN DE MISIÓN
          ==================================================================== */}
          <AppStack gap="m">
            <AppText variant="h3" color="primary">
              {t('setup.titles.main', 'Configurar misión')}
            </AppText>
            <AppInput
              label={t('setup.currency_section.currency_label', 'Moneda')}
              placeholder="Ej: Bs, $, ARS"
              value={currencyInput}
              onChangeText={setCurrencyInput}
            />
            <AppInput
              label={t('setup.budget_section.budget_label', 'Presupuesto')}
              keyboardType="numeric"
              value={amountInput}
              onChangeText={setAmountInput}
            />
            <AppInput
              label={t('setup.duration_section.custom_days_label', 'Días')}
              keyboardType="numeric"
              value={daysInput}
              onChangeText={setDaysInput}
            />
            <AppButton status="success" onPress={handleInit}>
              {t('setup.completion.start_management', 'Cargar Suministros')}
            </AppButton>
          </AppStack>

          {/* ====================================================================
               SIMULACIÓN DE GASTOS BINARIOS
          ==================================================================== */}
          <AppStack gap="m">
            <AppText variant="h3" color="primary">
              Simular Fuga
            </AppText>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <AppButton
                  status="info"
                  variant="outline"
                  onPress={() => handleQuickSpend(50, true)}
                >
                  Vital -50
                </AppButton>
              </View>
              <View style={{ flex: 1 }}>
                <AppButton
                  status="error"
                  variant="outline"
                  onPress={() => handleQuickSpend(150, false)}
                >
                  Lujo -150
                </AppButton>
              </View>
            </View>
          </AppStack>

          <AppButton status="neutral" variant="outline" onPress={resetVault}>
            {t('setup.errors.vault_config_error', 'Abortar Misión (Reset)')}
          </AppButton>

          {/* ====================================================================
               HISTORIAL DE GASTOS
          ==================================================================== */}
          <AppStack gap="s">
            <AppText variant="h3" color="primary">
              Registros del Tanque
            </AppText>
            {transactions.length === 0 ? (
              <AppText variant="body" color="secondary" style={{ fontStyle: 'italic' }}>
                No hay movimientos en esta misión.
              </AppText>
            ) : (
              transactions.map((t) => (
                <AppCard key={t.id} style={{ padding: 12 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <AppText variant="body" color="primary" style={{ fontWeight: 'bold' }}>
                        {t.category}
                      </AppText>
                      <AppText variant="caption" color="secondary">
                        {new Date(t.date).toLocaleTimeString()}
                      </AppText>
                    </View>
                    <AppText
                      variant="body"
                      color={t.category.includes('Vital') ? 'success' : 'error'}
                      style={{ fontWeight: 'bold' }}
                    >
                      -{formatMoney(t.amount, currency)}
                    </AppText>
                  </View>
                </AppCard>
              ))
            )}
          </AppStack>

          <AppDivider />

          {/* ====================================================================
               ESTADO COMPLETO DEL STORE (DEBUG)
          ==================================================================== */}
          <AppStack gap="m">
            <AppText variant="h3" color="primary">
              📦 Estado completo del store
            </AppText>

            <AppCard style={{ padding: 16, backgroundColor: '#0a0f1c' }}>
              <AppStack gap="s">
                {/* --- Flags de aplicación --- */}
                <AppText variant="label" color="secondary">
                  🧭 FLUJO
                </AppText>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">hasFinishedOnboarding:</AppText>
                    <AppText variant="caption" color="primary">{String(hasFinishedOnboarding)}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">isConfigured:</AppText>
                    <AppText variant="caption" color="primary">{String(isConfigured)}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">_hasHydrated:</AppText>
                    <AppText variant="caption" color="primary">{String(_hasHydrated)}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">language:</AppText>
                    <AppText variant="caption" color="primary">{language}</AppText>
                  </View>
                </View>

                {/* --- Finanzas --- */}
                <AppText variant="label" color="secondary" style={{ marginTop: 8 }}>
                  💰 FINANZAS
                </AppText>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">totalBudget:</AppText>
                    <AppText variant="caption" color="primary">{totalBudget} {currency}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">remainingBudget:</AppText>
                    <AppText variant="caption" color="primary">{remainingBudget} {currency}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">daysDuration:</AppText>
                    <AppText variant="caption" color="primary">{daysDuration}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">isExtremeMode:</AppText>
                    <AppText variant="caption" color="primary">{String(isExtremeMode)}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">startDate:</AppText>
                    <AppText variant="caption" color="primary">{startDate || 'null'}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">currency:</AppText>
                    <AppText variant="caption" color="primary">{currency}</AppText>
                  </View>
                </View>

                {/* --- Resumen calculado --- */}
                <AppText variant="label" color="secondary" style={{ marginTop: 8 }}>
                  📊 RESUMEN (getSummary)
                </AppText>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">totalSpent:</AppText>
                    <AppText variant="caption" color="primary">{summary.totalSpent} {currency}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">daysPassed:</AppText>
                    <AppText variant="caption" color="primary">{summary.daysPassed}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">isOverBudget:</AppText>
                    <AppText variant="caption" color="primary">{String(summary.isOverBudget)}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">dailyAverage:</AppText>
                    <AppText variant="caption" color="primary">{summary.dailyAverage.toFixed(2)} {currency}</AppText>
                  </View>
                </View>

                {/* --- Notificaciones --- */}
                <AppText variant="label" color="secondary" style={{ marginTop: 8 }}>
                  🔔 NOTIFICACIONES
                </AppText>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">dailyReminder:</AppText>
                    <AppText variant="caption" color="primary">{String(notificationPreferences?.dailyReminder)}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">extremeModeAlert:</AppText>
                    <AppText variant="caption" color="primary">{String(notificationPreferences?.extremeModeAlert)}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">budgetExceededAlert:</AppText>
                    <AppText variant="caption" color="primary">{String(notificationPreferences?.budgetExceededAlert)}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">reminderTime:</AppText>
                    <AppText variant="caption" color="primary">{notificationPreferences?.reminderTime || '20:00'}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">notificationsScheduledForDate:</AppText>
                    <AppText variant="caption" color="primary">{notificationsScheduledForDate || 'null'}</AppText>
                  </View>
                  <View style={{ width: '50%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">hasRequestedPermissions:</AppText>
                    <AppText variant="caption" color="primary">{String(hasRequestedPermissions)}</AppText>
                  </View>
                </View>

                {/* --- Transacciones (solo conteo) --- */}
                <AppText variant="label" color="secondary" style={{ marginTop: 8 }}>
                  🧾 TRANSACCIONES
                </AppText>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ width: '100%', marginBottom: 4 }}>
                    <AppText variant="caption" color="secondary">cantidad:</AppText>
                    <AppText variant="caption" color="primary">{transactions.length}</AppText>
                  </View>
                </View>
              </AppStack>
            </AppCard>
            <AppText variant="caption" color="secondary" style={{ alignSelf: 'center' }}>
              Última actualización: {new Date().toLocaleTimeString()}
            </AppText>
          </AppStack>
        </AppStack>
      </ScrollView>
    </AppContainer>
  );
}