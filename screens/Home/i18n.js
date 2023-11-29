import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translations
import enTranslations from './translations/en.json';
import itTranslations from './translations/it.json';

i18n
    .use(initReactI18next)
    .init({
        lng: 'en', // Set your default language here
        fallbackLng: 'en',
        resources: {
            en: {
                translation: enTranslations,
            },
            it: {
                translation: itTranslations,
            },
        },
    });

export default i18n;
