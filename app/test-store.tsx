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

export default function TestStoreScreen() {
  const { t } = useTranslation();
  
  // Store State & Actions
  const { 
    remainingBudget, 
    totalBudget, 
    isExtremeMode, 
    transactions,
    currency, 
    language,
    initVault, 
    addTransaction, 
    resetVault,
    setLanguage 
  } = useVaultStore();

  // Local State para inputs
  const [amountInput, setAmountInput] = useState('');
  const [daysInput, setDaysInput] = useState('7');
  const [currencyInput, setCurrencyInput] = useState(currency || '$'); 

  const handleInit = () => {
    const amt = parseFloat(amountInput);
    const dys = parseInt(daysInput);
    
    if (isNaN(amt) || isNaN(dys) || !currencyInput) {
      return Alert.alert("Error", "Completa los parámetros de la misión");
    }
    
    initVault(amt, dys, currencyInput);
    setAmountInput('');
  };

  const handleQuickSpend = (val: number, isVital: boolean) => {
    // Usando el sistema binario del Documento Conceptual
    const category = isVital ? t('common.vital_supply') : t('common.leak_luxury');
    addTransaction(val, category, "Gasto de prueba");
  };

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <AppStack gap="l">
          <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 20 }}>
            🧪 Survival Console
          </Text>

          {/* SELECTOR DE IDIOMA (PRUEBA DE I18N) */}
          <AppStack gap="s">
             <Text style={{ color: '#94A3B8', fontSize: 12, fontWeight: 'bold' }}>SISTEMA DE LENGUAJE</Text>
             <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <AppButton 
                        status={language === 'es' ? "info" : "neutral"} 
                        variant={language === 'es' ? "filled" : "outline"}
                        onPress={() => setLanguage('es')}
                    >
                        Español 🇪🇸
                    </AppButton>
                </View>
                <View style={{ flex: 1 }}>
                    <AppButton 
                        status={language === 'en' ? "info" : "neutral"} 
                        variant={language === 'en' ? "filled" : "outline"}
                        onPress={() => setLanguage('en')}
                    >
                        English 🇺🇸
                    </AppButton>
                </View>
             </View>
          </AppStack>

          <AppDivider />

          {/* MONITOR DEL TANQUE DE OXÍGENO */}
          <AppCard style={{ 
            borderColor: isExtremeMode ? '#EF4444' : '#1E293B', 
            borderWidth: 2,
            backgroundColor: isExtremeMode ? '#1a0505' : '#0f172a'
          }}>
            <AppStack gap="xs">
                <Text style={{ color: isExtremeMode ? '#EF4444' : '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5 }}>
                  STATUS: {isExtremeMode ? t('common.extreme_mode').toUpperCase() : 'ESTABLE'}
                </Text>
                
                <Text style={{ color: 'white', fontSize: 42, fontWeight: '900', marginVertical: 8 }}>
                  {formatMoney(remainingBudget, currency)}
                </Text>

                <View style={{ height: 8, backgroundColor: '#1E293B', borderRadius: 4, overflow: 'hidden' }}>
                    <View style={{ 
                        width: `${Math.min(Math.max((remainingBudget/totalBudget)*100, 0), 100)}%`, 
                        height: '100%', 
                        backgroundColor: isExtremeMode ? '#EF4444' : '#22C55E' 
                    }} />
                </View>

                <Text style={{ color: '#64748B', fontSize: 13, marginTop: 8 }}>
                   {t('common.oxygen_tank')}: <Text style={{ color: '#94A3B8' }}>{formatMoney(totalBudget, currency)}</Text>
                </Text>
            </AppStack>
          </AppCard>

          {/* CONFIGURACIÓN DE MISIÓN */}
          <AppStack gap="m">
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{t('setup.title')}</Text>
            <AppInput 
              label={t('setup.currency_label')}
              placeholder="Ej: Bs, $, ARS"
              value={currencyInput}
              onChangeText={setCurrencyInput}
            />
            <AppInput label={t('setup.budget_label')} keyboardType="numeric" value={amountInput} onChangeText={setAmountInput} />
            <AppInput label={t('setup.days_label')} keyboardType="numeric" value={daysInput} onChangeText={setDaysInput} />
            <AppButton status="success" onPress={handleInit}>
                Cargar Suministros
            </AppButton>
          </AppStack>

          {/* SIMULACIÓN DE GASTOS BINARIOS */}
          <AppStack gap="m">
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Simular Fuga</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <AppButton status="info" variant="outline" onPress={() => handleQuickSpend(50, true)}>
                      Vital -50
                    </AppButton>
                </View>
                <View style={{ flex: 1 }}>
                    <AppButton status="error" variant="outline" onPress={() => handleQuickSpend(150, false)}>
                      Lujo -150
                    </AppButton>
                </View>
            </View>
          </AppStack>

          <AppButton status="neutral" variant="outline" onPress={resetVault}>
             Abortar Misión (Reset)
          </AppButton>

          {/* HISTORIAL */}
          <AppStack gap="s">
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Registros del Tanque</Text>
            {transactions.length === 0 ? (
              <Text style={{ color: '#64748B', fontStyle: 'italic' }}>No hay movimientos en esta misión.</Text>
            ) : (
              transactions.map(t => (
                <AppCard key={t.id} style={{ padding: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>{t.category}</Text>
                      <Text style={{ color: '#64748B', fontSize: 11 }}>{new Date(t.date).toLocaleTimeString()}</Text>
                    </View>
                    <Text style={{ color: t.category === "Vital" ? '#22C55E' : '#EF4444', fontWeight: 'bold' }}>
                      -{formatMoney(t.amount, currency)}
                    </Text>
                  </View>
                </AppCard>
              ))
            )}
          </AppStack>
        </AppStack>
      </ScrollView>
    </AppContainer>
  );
}