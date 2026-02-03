// app/welcome/setup.tsx
import React from "react";
import { ScrollView } from "react-native";
import AppContainer from "@/components/atoms/structure/AppContainer";
import AppKeyboardAvoidingView from "@/components/atoms/structure/AppKeyboardAvoidingView";
import AppStack from "@/components/atoms/structure/AppStack";
import AppSpacer from "@/components/atoms/structure/AppSpacer";
import AppCard from "@/components/atoms/surface/AppCard";

// Componentes moleculares
import SetupHeader from "@/components/templates/setup/SetupHeader"; 
import SetupProgress from "@/components/templates/setup/SetupProgress"; 
import CurrencySection from "@/components/templates/setup/CurrencySection";
import BudgetSection from "@/components/templates/setup/BudgetSection"; 
import ActionSection from "@/components/templates/setup/ActionSection"; 
import CurrencyModal from "@/components/templates/setup/CurrencyModal";
import PeriodModal from "@/components/templates/setup/PeriodModal"; 


import ConfirmationModal from "@/components/templates/setup/ConfirmationModal"; 

// Hook personalizado
import { useSetupForm } from "@/components/templates/setup/hooks/useSetupForm"; 
import { SPACING } from "@/constants/metrics";

export default function SetupScreen() {
  const form = useSetupForm();

  return (
    <AppContainer>
      <AppKeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppStack flex={1} style={{ padding: SPACING.xs }}>
            <SetupHeader />
            <AppSpacer size="l" />
            
            <SetupProgress formCompletion={form.formCompletion} />
            
            <AppCard padding="l">
              <AppStack gap="m">
                <CurrencySection
                  currency={form.currency}
                  onPressCurrency={() => form.setShowCurrencyModal(true)}
                />
                
                <BudgetSection
                  budget={form.budget}
                  setBudget={form.setBudget}
                  currency={form.currency}
                  selectedPeriod={form.selectedPeriod}
                  customDays={form.customDays}
                  setCustomDays={form.setCustomDays}
                  errors={form.errors}
                  onPressPeriod={() => form.setShowPeriodModal(true)}
                  numericBudget={form.numericBudget}
                  actualDays={form.actualDays}
                  dailyBudget={form.dailyBudget}
                />
              </AppStack>
            </AppCard>

            <AppSpacer size="xl" />
            
            <ActionSection
              formCompletion={form.formCompletion}
              isProcessing={form.isProcessing}
              validateForm={form.validateForm}
              setShowConfirmation={form.setShowConfirmation}
            />
          </AppStack>
        </ScrollView>
      </AppKeyboardAvoidingView>

      <CurrencyModal
        isOpen={form.showCurrencyModal}
        onClose={() => form.setShowCurrencyModal(false)}
        currency={form.currency}
        setCurrency={form.setCurrency}
      />
      
      <PeriodModal
        isOpen={form.showPeriodModal}
        onClose={() => form.setShowPeriodModal(false)}
        selectedPeriod={form.selectedPeriod}
        setSelectedPeriod={form.setSelectedPeriod}
      />
      
      <ConfirmationModal
        isOpen={form.showConfirmation}
        onClose={() => form.setShowConfirmation(false)}
        numericBudget={form.numericBudget}
        actualDays={form.actualDays}
        dailyBudget={form.dailyBudget}
        currency={form.currency}
        executeSetup={form.executeSetup}
      />
    </AppContainer>
  );
}