import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import deTranslation from './locales/de.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  de: {
    translation: deTranslation,
  },
  
};

i18n
  .use(initReactI18next) // Verwendung von initReactI18next
  .init({
    resources,
    lng: 'en', // Standard Sprache
    fallbackLng: 'en', // Fallback Sprache
    interpolation: {
      escapeValue: false, // React ist bereits vor XSS geschützt
    },
  });

export default i18n;
