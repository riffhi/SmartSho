import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import frTranslation from './locales/fr/translation.json';
import deTranslation from './locales/de/translation.json';

import hi from './locales/hi/translation.json';
import mr from './locales/mr/translation.json';
import ta from './locales/ta/translation.json';
import te from './locales/te/translation.json';
import kn from './locales/kn/translation.json';
import ml from './locales/ml/translation.json';
import urd from './locales/urd/translation.json';
import pb from './locales/pb/translation.json';
import bng from './locales/bng/translation.json';



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
      fr: { translation: frTranslation },
      de: { translation: deTranslation },
        hi: { translation: hi },
        mr: { translation: mr },
        ta: { translation: ta },
        te: { translation: te },
        kn: { translation: kn },
        ml: { translation: ml },
        ur: { translation: urd },
        pa: { translation: pb },
        bn: { translation: bng },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;













