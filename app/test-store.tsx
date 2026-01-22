import React, { useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { useVaultStore } from '@/store/useVaultStore';
import { formatMoney } from '@/store/useVaultStore/index.utils'; 
import AppContainer from '@/components/atoms/structure/AppContainer';
import AppStack from '@/components/atoms/structure/AppStack';
import AppInput from '@/components/atoms/action/AppInput';
import AppButton from '@/components/atoms/action/AppButton';

export default function TestStoreScreen() {
  const { 
    remainingBudget, 
    totalBudget, 
    isExtremeMode, 
    transactions,
    currency, 
    initVault, 
    addTransaction, 
    resetVault 
  } = useVaultStore();

  const [amountInput, setAmountInput] = useState('');
  const [daysInput, setDaysInput] = useState('7');
  const [currencyInput, setCurrencyInput] = useState('Bs'); 

  const handleInit = () => {
    const amt = parseFloat(amountInput);
    const dys = parseInt(daysInput);
    
    if (isNaN(amt) || isNaN(dys) || !currencyInput) {
      return Alert.alert("Error", "Completa todos los campos");
    }
    
    // Si aquí te da error, revisa que en index.types.ts dice: 
    // initVault: (amount: number, days: number, currency: string) => void;
    initVault(amt, dys, currencyInput);
    setAmountInput('');
  };

  const handleQuickSpend = (val: number) => {
    addTransaction(val, 'Gasto Rápido', 'Prueba de consola');
  };

  return (
    <AppContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <AppStack gap="l">
          <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>🧪 Store Console</Text>
          
          {/* MONITOR VISUAL TOTALMENTE DINÁMICO */}
          <View style={{ 
            backgroundColor: isExtremeMode ? '#2D0A0A' : '#0F172A', 
            padding: 24, 
            borderRadius: 20, 
            borderWidth: 2,
            borderColor: isExtremeMode ? '#EF4444' : '#1E293B'
          }}>
            <Text style={{ color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }}>
               STATUS: {isExtremeMode ? 'MODO EXTREMO 🚨' : 'ESTABLE'}
            </Text>
            
            {/* AQUÍ YA NO HAY $ FIJO, TODO VIENE DE LA UTILIDAD */}
            <Text style={{ color: 'white', fontSize: 38, fontWeight: '900', marginVertical: 10 }}>
              {formatMoney(remainingBudget, currency)}
            </Text>

            <View style={{ height: 6, backgroundColor: '#1E293B', borderRadius: 3, overflow: 'hidden' }}>
                <View style={{ 
                    width: `${Math.min(Math.max((remainingBudget/totalBudget)*100, 0), 100)}%`, 
                    height: '100%', 
                    backgroundColor: isExtremeMode ? '#EF4444' : '#22C55E' 
                }} />
            </View>

            <Text style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>
               Presupuesto Inicial: <Text style={{ color: '#94A3B8' }}>{formatMoney(totalBudget, currency)}</Text>
            </Text>
          </View>

          {/* CONFIGURACIÓN */}
          <AppStack gap="m">
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Configurar Nueva Misión</Text>
            <AppInput 
              label="Moneda (Símbolo)"
              placeholder="Ej: Bs, $, ARS"
              value={currencyInput}
              onChangeText={setCurrencyInput}
            />
            <AppInput label="Monto Total" keyboardType="numeric" value={amountInput} onChangeText={setAmountInput} />
            <AppInput label="Días de Duración" keyboardType="numeric" value={daysInput} onChangeText={setDaysInput} />
            <AppButton status="info" onPress={handleInit}>Cargar Tanque</AppButton>
          </AppStack>

          {/* SIMULACIÓN DE GASTOS */}
          <AppStack gap="m">
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Simular Gastos rápidos</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                    <AppButton status="success" variant="outline" onPress={() => handleQuickSpend(50)}>
                      -50 {currency}
                    </AppButton>
                </View>
                <View style={{ flex: 1 }}>
                    <AppButton status="error" variant="outline" onPress={() => handleQuickSpend(500)}>
                      -500 {currency}
                    </AppButton>
                </View>
            </View>
          </AppStack>

          <AppButton status="neutral" variant="outline" onPress={resetVault}>Resetear Store</AppButton>

          {/* HISTORIAL DINÁMICO */}
          <AppStack gap="s">
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Historial de Transacciones</Text>
            {transactions.length === 0 ? (
              <Text style={{ color: '#64748B', fontStyle: 'italic' }}>No hay movimientos registrados.</Text>
            ) : (
              transactions.map(t => (
                <View key={t.id} style={{ 
                  backgroundColor: '#111827', 
                  padding: 16, 
                  borderRadius: 16, 
                  flexDirection: 'row', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeftWidth: 4,
                  borderLeftColor: t.amount > (totalBudget * 0.1) ? '#EF4444' : '#22C55E'
                }}>
                  <View>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{t.category}</Text>
                    <Text style={{ color: '#64748B', fontSize: 12 }}>{new Date(t.date).toLocaleTimeString()}</Text>
                  </View>
                  <Text style={{ color: '#EF4444', fontWeight: 'bold', fontSize: 16 }}>
                    -{formatMoney(t.amount, currency)}
                  </Text>
                </View>
              ))
            )}
          </AppStack>
        </AppStack>
      </ScrollView>
    </AppContainer>
  );
}