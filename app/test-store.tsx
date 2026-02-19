import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useVaultStore } from '@/store/useVaultStore';
import { formatMoney } from '@/store/useVaultStore/index.utils';
import { useExportCSV } from '@/hooks/useExportCSV';

// Átomos
import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import AppInput from '@/components/atoms/action/AppInput';
import AppButton from '@/components/atoms/action/AppButton';
import AppCard from '@/components/atoms/surface/AppCard';
import AppDivider from '@/components/atoms/structure/AppDivider';
import AppText from '@/components/atoms/content/AppText';
import AppSpinner from '@/components/atoms/visual/AppSpinner';

export default function TestStoreScreen() {
  const { t } = useTranslation();

  // --------------------------------------------------------------------------
  // STORE – Estado completo y acciones
  // --------------------------------------------------------------------------
  const state = useVaultStore();
  const {
    totalBudget,
    remainingBudget,
    isExtremeMode,
    transactions,
    daysDuration,
    startDate,
    isConfigured,
    hasFinishedOnboarding,
    currency,
    initVault,
    addTransaction,
    resetVault,
    getSummary,
  } = state;

  // --------------------------------------------------------------------------
  // HOOK DE EXPORTACIÓN CSV
  // --------------------------------------------------------------------------
  const { exportCSV, isExporting, error: exportError } = useExportCSV();

  // Mostrar error de exportación si ocurre
  React.useEffect(() => {
    if (exportError) {
      Alert.alert(t('common.error'), exportError);
    }
  }, [exportError, t]);

  // --------------------------------------------------------------------------
  // Estado local para inputs
  // --------------------------------------------------------------------------
  const [amountInput, setAmountInput] = useState('');
  const [daysInput, setDaysInput] = useState('7');
  const [currencyInput, setCurrencyInput] = useState(currency || '$');
  const [quickAmount, setQuickAmount] = useState('50');
  const [batchSize, setBatchSize] = useState('10');

  // --------------------------------------------------------------------------
  // Resumen calculado
  // --------------------------------------------------------------------------
  const summary = getSummary?.() || {
    totalSpent: 0,
    daysPassed: 0,
    isOverBudget: false,
    dailyAverage: 0,
  };

  // --------------------------------------------------------------------------
  // Manejadores
  // --------------------------------------------------------------------------
  const handleInit = () => {
    const amt = parseFloat(amountInput);
    const dys = parseInt(daysInput);
    if (isNaN(amt) || amt <= 0 || isNaN(dys) || dys <= 0 || !currencyInput) {
      return Alert.alert('Error', 'Parámetros inválidos');
    }
    initVault(amt, dys, currencyInput);
    setAmountInput('');
  };

  const handleQuickSpend = (isVital: boolean) => {
    const val = parseFloat(quickAmount);
    if (isNaN(val) || val <= 0) {
      return Alert.alert('Error', 'Monto inválido');
    }
    const category = isVital ? 'Vital' : 'Lujo';
    addTransaction(val, category, 'Gasto rápido');
  };

  const handleGenerateBatch = () => {
    const count = parseInt(batchSize);
    if (isNaN(count) || count <= 0 || count > 500) {
      return Alert.alert('Error', 'Cantidad inválida (máx 500)');
    }

    const categories = ['Vital', 'Lujo', 'Alimentación', 'Transporte', 'Ocio', 'Salud', 'Educación'];
    for (let i = 0; i < count; i++) {
      const amount = Math.floor(Math.random() * 200) + 10; // 10-210
      const category = categories[Math.floor(Math.random() * categories.length)];
      const note = `Aleatorio #${i+1}`;
      addTransaction(amount, category, note);
    }
    Alert.alert('Éxito', `${count} transacciones generadas`);
  };

  const handleExport = async () => {
    await exportCSV();
    // Sin mensaje de éxito, solo se abre el diálogo
  };

  const handleReset = () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de reiniciar toda la bóveda?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Reiniciar', 
          style: 'destructive',
          onPress: () => resetVault()
        }
      ]
    );
  };

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <AppContainer>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <AppStack gap="l" style={{ paddingHorizontal: 16 }}>
          {/* ====================================================================
               CABECERA
          ==================================================================== */}
          <AppText variant="h2" color="primary" style={{ marginTop: 20 }}>
            🧪 Laboratorio de Pruebas
          </AppText>
          <AppText variant="caption" color="secondary">
            Herramienta para generar datos y probar exportación CSV
          </AppText>

          <AppDivider />

          {/* ====================================================================
               MONITOR PRINCIPAL
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
                STATUS: {isExtremeMode ? '⚠️ MODO CUIDADO' : '✅ ESTABLE'}
              </AppText>

              <AppText variant="h1" color="primary" style={{ marginVertical: 8 }}>
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
                Total: {formatMoney(totalBudget, currency)} · Días: {daysDuration} · 
                Transcurridos: {summary.daysPassed} · Gastado: {formatMoney(summary.totalSpent, currency)}
              </AppText>
            </AppStack>
          </AppCard>

          {/* ====================================================================
               CONFIGURACIÓN DE MISIÓN
          ==================================================================== */}
          <AppStack gap="m">
            <AppText variant="h3" color="primary">⚙️ Configurar misión</AppText>
            <AppInput
              label="Moneda (símbolo)"
              placeholder="Ej: $, Bs, €"
              value={currencyInput}
              onChangeText={setCurrencyInput}
            />
            <AppInput
              label="Presupuesto total"
              keyboardType="numeric"
              value={amountInput}
              onChangeText={setAmountInput}
              placeholder="Ej: 1000"
            />
            <AppInput
              label="Días"
              keyboardType="numeric"
              value={daysInput}
              onChangeText={setDaysInput}
              placeholder="Ej: 30"
            />
            <AppButton status="success" onPress={handleInit}>
              Inicializar bóveda
            </AppButton>
          </AppStack>

          <AppDivider />

          {/* ====================================================================
               GENERACIÓN DE DATOS DE PRUEBA
          ==================================================================== */}
          <AppStack gap="m">
            <AppText variant="h3" color="primary">🧪 Generar datos de prueba</AppText>

            {/* Gasto rápido con monto configurable */}
            <AppInput
              label="Monto para gasto rápido"
              keyboardType="numeric"
              value={quickAmount}
              onChangeText={setQuickAmount}
            />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <AppButton
                  status="info"
                  variant="outline"
                  onPress={() => handleQuickSpend(true)}
                >
                  + Vital ({quickAmount})
                </AppButton>
              </View>
              <View style={{ flex: 1 }}>
                <AppButton
                  status="error"
                  variant="outline"
                  onPress={() => handleQuickSpend(false)}
                >
                  + Lujo ({quickAmount})
                </AppButton>
              </View>
            </View>

            {/* Generación por lotes */}
            <AppInput
              label="Cantidad de transacciones aleatorias (máx 500)"
              keyboardType="numeric"
              value={batchSize}
              onChangeText={setBatchSize}
            />
            <AppButton status="warning" variant="filled" onPress={handleGenerateBatch}>
              Generar lote aleatorio
            </AppButton>

            <AppText variant="caption" color="secondary">
              Las transacciones se crean con montos entre 10 y 210, y categorías variadas.
            </AppText>
          </AppStack>

          <AppDivider />

          {/* ====================================================================
               ACCIONES DE EXPORTACIÓN Y RESET
          ==================================================================== */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <AppButton
                variant="outline"
                onPress={handleReset}
                disabled={isExporting}
              >
                Reiniciar todo
              </AppButton>
            </View>
            <View style={{ flex: 1 }}>
              <AppButton
                status="info"
                variant="filled"
                onPress={handleExport}
                disabled={isExporting || transactions.length === 0}
              >
                {isExporting ? <AppSpinner size="s" color="primary" /> : 'Exportar CSV'}
              </AppButton>
            </View>
          </View>

          <AppDivider />

          {/* ====================================================================
               HISTORIAL RECIENTE (últimas 5)
          ==================================================================== */}
          <AppStack gap="s">
            <AppText variant="h3" color="primary">
              📋 Últimas transacciones ({transactions.length})
            </AppText>
            {transactions.length === 0 ? (
              <AppText variant="body" color="secondary" style={{ fontStyle: 'italic' }}>
                No hay movimientos aún.
              </AppText>
            ) : (
              transactions.slice(0, 5).map((t) => (
                <AppCard key={t.id} style={{ padding: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <AppText variant="body" color="primary" style={{ fontWeight: 'bold' }}>
                        {t.category}
                      </AppText>
                      <AppText variant="caption" color="secondary">
                        {new Date(t.date).toLocaleString()} · {t.note}
                      </AppText>
                    </View>
                    <AppText
                      variant="body"
                      color={t.category === 'Vital' ? 'success' : 'error'}
                      style={{ fontWeight: 'bold' }}
                    >
                      -{formatMoney(t.amount, currency)}
                    </AppText>
                  </View>
                </AppCard>
              ))
            )}
            {transactions.length > 5 && (
              <AppText variant="caption" color="secondary" style={{ textAlign: 'center' }}>
                ... y {transactions.length - 5} más
              </AppText>
            )}
          </AppStack>

          <AppDivider />

          {/* ====================================================================
               DEBUG: ESTADO COMPLETO (resumido)
          ==================================================================== */}
          <AppStack gap="s">
            <AppText variant="h3" color="primary">📊 Estado interno</AppText>
            <AppCard style={{ padding: 16, backgroundColor: '#0a0f1c' }}>
              <AppStack gap="xs">
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ width: '50%' }}>
                    <AppText variant="caption" color="secondary">hasFinishedOnboarding:</AppText>
                    <AppText variant="caption" color="primary">{String(hasFinishedOnboarding)}</AppText>
                  </View>
                  <View style={{ width: '50%' }}>
                    <AppText variant="caption" color="secondary">isConfigured:</AppText>
                    <AppText variant="caption" color="primary">{String(isConfigured)}</AppText>
                  </View>
                  <View style={{ width: '50%' }}>
                    <AppText variant="caption" color="secondary">startDate:</AppText>
                    <AppText variant="caption" color="primary">{startDate ? new Date(startDate).toLocaleDateString() : 'null'}</AppText>
                  </View>
                  <View style={{ width: '50%' }}>
                    <AppText variant="caption" color="secondary">daysDuration:</AppText>
                    <AppText variant="caption" color="primary">{daysDuration}</AppText>
                  </View>
                  <View style={{ width: '50%' }}>
                    <AppText variant="caption" color="secondary">totalBudget:</AppText>
                    <AppText variant="caption" color="primary">{formatMoney(totalBudget, currency)}</AppText>
                  </View>
                  <View style={{ width: '50%' }}>
                    <AppText variant="caption" color="secondary">remainingBudget:</AppText>
                    <AppText variant="caption" color="primary">{formatMoney(remainingBudget, currency)}</AppText>
                  </View>
                </View>
              </AppStack>
            </AppCard>
          </AppStack>
        </AppStack>
      </ScrollView>
    </AppContainer>
  );
}