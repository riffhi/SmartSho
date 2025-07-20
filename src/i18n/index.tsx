// i18n/index.tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 1. Import your translation files
// Adjust these paths if your i18n/index.tsx file is at a different level relative to 'locales'
import bngTranslation from './locales/bng/translation.json';
import deTranslation from './locales/de/translation.json';
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import frTranslation from './locales/fr/translation.json';
import hiTranslation from './locales/hi/translation.json';
import knTranslation from './locales/kn/translation.json';
import mlTranslation from './locales/ml/translation.json';
import mrTranslation from './locales/mr/translation.json';
import pbTranslation from './locales/pb/translation.json';
import taTranslation from './locales/ta/translation.json';
import teTranslation from './locales/te/translation.json';
import urdTranslation from './locales/urd/translation.json';

// 2. Define your resources object
const resources = {
    bng: {
        translation: bngTranslation,
    },
    de: {
        translation: deTranslation,
    },
    en: {
        translation: enTranslation,
    },
    es: {
        translation: esTranslation,
    },
    fr: {
        translation: frTranslation,
    },
    hi: {
        translation: hiTranslation,
    },
    kn: {
        translation: knTranslation,
    },
    ml: {
        translation: mlTranslation,
    },
    mr: {
        translation: mrTranslation,
    },
    pb: {
        translation: pbTranslation,
    },
    ta: {
        translation: taTranslation,
    },
    te: {
        translation: teTranslation,
    },
    urd: {
        translation: urdTranslation,
    },
};

// 3. Initialize i18next
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources, // the object containing all your imported translations
        lng: 'en', // default language to use if no language is detected or set
        fallbackLng: 'en', // language to use if a translation key is missing in the current language
        debug: true, // Set to true during development to see useful logs in the console
        interpolation: {
            escapeValue: false, // React already protects against XSS attacks
        },
        // Optional: Add more configuration here like keySeparator, nsSeparator etc.
    });

export default i18n; // Export the initialized i18n instance