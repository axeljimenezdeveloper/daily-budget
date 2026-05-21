import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import es from './es.json';
import en from './en.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
};

const locales = Localization.getLocales();
const deviceLanguage = locales[0]?.languageCode || 'es';
const isSpanish = deviceLanguage.startsWith('es');

// DEBUG: Ver qué está pasando
// console.log('🔍 DEBUG i18n:');
// console.log('  - Locales:', locales.map(l => l.languageCode));
// console.log('  - Idioma dispositivo:', deviceLanguage);
// console.log('  - ¿Es español?:', isSpanish);

// SOLUCIÓN: Siempre comenzar en español si el dispositivo es español
// Ignorar cualquier valor persistido al inicio
const initialLanguage = isSpanish ? 'es' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
    debug: false, // Desactivar debug de i18next para menos ruido
  });

// Verificar que se inicializó correctamente
// console.log('✅ i18n inicializado con idioma:', i18n.language);

export default i18n;