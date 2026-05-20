// ============================================================================
// PANTALLA GUÍA - PREGUNTAS FRECUENTES (FAQ)
//
// Muestra una lista de preguntas frecuentes utilizando el componente molecular
// AccordionItem y el layout GuideLayout. Gestiona el estado de apertura/cierre
// y la animación global.
// ============================================================================

import React, { useState, useCallback } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTranslation } from 'react-i18next';

// Layout específico para la guía
import { GuideLayout } from '@/components/templates/guide/components/layout/GuideLayout';

// Componente molecular
import { AccordionItem } from '@/components/molecules/lists/AccordionItem';

// Utilidades
import AppSpacer from '@/components/atoms/structure/AppSpacer';

// Habilitar LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FaqItem = {
  question: string;
  answer: string;
  icon: string;
};

export default function GuideScreen() {
  const { t } = useTranslation();
  const faqEntries = t('guide.faq', { returnObjects: true }) as Record<string, FaqItem>;
  const faqList = Object.entries(faqEntries).map(([key, value]) => ({ id: key, ...value }));
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleItem = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(prev => (prev === id ? null : id));
  }, []);

  return (
    <GuideLayout>
      {faqList.map((item, index) => {
        const isOpen = openIndex === item.id;
        const isLast = index === faqList.length - 1;
        return (
          <React.Fragment key={item.id}>
            <AccordionItem
              iconName={item.icon}
              question={item.question}
              answer={item.answer}
              isOpen={isOpen}
              onPress={() => toggleItem(item.id)}
              isLast={isLast}
            />
            {!isLast && <AppSpacer size="m" />}
          </React.Fragment>
        );
      })}
    </GuideLayout>
  );
}