import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
