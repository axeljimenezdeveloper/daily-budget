import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import es from './es.json';
import en from './en.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
};

// Detectar el idioma del dispositivo
const deviceLanguage = Localization.getLocales()[0].languageCode ?? 'es';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage, // Idioma inicial detectado
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React ya protege de XSS
    },
  });

export default i18n;