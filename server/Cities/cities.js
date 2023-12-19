import { useTranslation } from 'react-i18next';

const CitySelector = () => {
    const { t } = useTranslation();

    const cities = [
        { label: t('Sofia'), value: t('Sofia') },
        { label: t('Plovdiv'), value: t('Plovdiv') },
        { label: t('Varna'), value: t('Varna') },
        { label: t('Burgas'), value: t('Burgas') },
        { label: t('Ruse'), value: t('Ruse') },
        { label: t('Stara Zagora'), value: t('Stara Zagora') },
        { label: t('Pleven'), value: t('Pleven') },
        { label: t('Sliven'), value: t('Sliven') },
    ];

    return cities;
};

export default CitySelector;
