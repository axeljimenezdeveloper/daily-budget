// ============================================================================
// PANTALLA PROTOCOLOS – TÉRMINOS Y CONDICIONES (ACORDEONES)
//
// Muestra la información legal y de privacidad organizada en 9 acordeones,
// reutilizando el componente AccordionItem de la sección Guía.
// ============================================================================

import React, { useState, useCallback } from 'react';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ProtocolsLayout } from '@/components/templates/protocols/components/layout/ProtocolsLayout';
import { AccordionItem } from '@/components/molecules/lists/AccordionItem';
import AppSpacer from '@/components/atoms/structure/AppSpacer';

// Habilitar LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type ProtocolSection = {
  id: string;
  titleKey: string;
  textKey: string;
  iconName: string;
};

const SECTIONS: ProtocolSection[] = [
  {
    id: 'data_storage',
    titleKey: 'protocols.data_storage_title',
    textKey: 'protocols.data_storage_text',
    iconName: 'server-outline',
  },
  {
    id: 'privacy',
    titleKey: 'protocols.privacy_title',
    textKey: 'protocols.privacy_text',
    iconName: 'shield-outline',
  },
  {
    id: 'security',
    titleKey: 'protocols.security_title',
    textKey: 'protocols.security_text',
    iconName: 'lock-closed-outline',
  },
  {
    id: 'liability',
    titleKey: 'protocols.liability_title',
    textKey: 'protocols.liability_text',
    iconName: 'warning-outline',
  },
  {
    id: 'license',
    titleKey: 'protocols.license_title',
    textKey: 'protocols.license_text',
    iconName: 'document-text-outline',
  },
  {
    id: 'contact',
    titleKey: 'protocols.contact_title',
    textKey: 'protocols.contact_text',
    iconName: 'mail-outline',
  },
  {
    id: 'updates',
    titleKey: 'protocols.updates_title',
    textKey: 'protocols.updates_text',
    iconName: 'sync-outline',
  },
  {
    id: 'third_party',
    titleKey: 'protocols.third_party_title',
    textKey: 'protocols.third_party_text',
    iconName: 'extension-puzzle-outline',
  },
  {
    id: 'data_export',
    titleKey: 'protocols.data_export_title',
    textKey: 'protocols.data_export_text',
    iconName: 'download-outline',
  },
];

export default function ProtocolsScreen() {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId(prev => (prev === id ? null : id));
  }, []);

  return (
    <ProtocolsLayout>
      {SECTIONS.map((section, index) => {
        const isOpen = openId === section.id;
        const isLast = index === SECTIONS.length - 1;
        return (
          <React.Fragment key={section.id}>
            <AccordionItem
              iconName={section.iconName}
              question={t(section.titleKey)}
              answer={t(section.textKey)}
              isOpen={isOpen}
              onPress={() => toggleItem(section.id)}
              isLast={isLast}
            />
            {!isLast && <AppSpacer size="m" />}
          </React.Fragment>
        );
      })}
    </ProtocolsLayout>
  );
}