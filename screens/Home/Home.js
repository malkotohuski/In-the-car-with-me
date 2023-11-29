import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, TouchableOpacity, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles';


const images = [
    require('../../images/suspension.jpg'), // Replace with your image file paths
    require('../../images/images3.jpg'),
    require('../../images/tires.jpg'),
    require('../../images/gearbox.jpg'),
    require('../../images/motorOil.jpg'),
];


function HomePage({ navigation }) {
    const { t } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isItalian, setIsItalian] = useState(false);

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
        setIsItalian(lng === 'it');
    };



    useEffect(() => {
        const changeImageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => {
            clearInterval(changeImageInterval);
        };
    }, []);

    const handlerTires = () => {
        navigation.navigate('Tires')
        console.log('Tires clicked !!!');
    }

    const handlerMotorOil = () => {
        navigation.navigate('Motor Oil')
        console.log('Motor oil clicked !!!');
    }

    const handlerSuspension = () => {
        navigation.navigate('Suspension')
        console.log('Suspension clicked !!!');
    }

    const handlerCarBody = () => {
        navigation.navigate('Car body')
        console.log('Car body clicked !!!');
    }

    return (
        <View style={styles.homepage}>
            <View style={styles.adBox}>
                <Image source={images[currentImageIndex]} style={styles.adImage} />
            </View>
            <View style={styles.content}>
                <View style={styles.languageSwitch}>
                    <Text>English</Text>
                    <Switch
                        value={isItalian}
                        onValueChange={(value) => changeLanguage(value ? 'it' : 'en')}
                    />
                    <Text>Italian</Text>
                </View>
                <View style={styles.menuImages}>
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerTires} >
                            <Text>{t('Tires')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerMotorOil} >
                            <Text>{t('Motor Oil')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerSuspension} >
                            <Text>{t('Suspension')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerCarBody} >
                            <Text>{t('Car body')}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* Your content goes here */}
                <Text style={styles.heading}>{t('AUTO GARAGE')}</Text>
                <Text>{t('Everything for your car')}</Text>
                <View style={styles.searchBox}>
                    <TextInput
                        style={styles.searchField}
                        placeholder={t('Search here')}
                    />
                    <Button title={t('Search')} style={styles.searchButton} />
                </View>
            </View>
            <View style={styles.adBox}>
                <Image source={images[currentImageIndex]} style={styles.adImage} />
                {/* Right Ad Content */}
            </View>
            {/* Footer goes here */}
        </View>
    );
}

export default HomePage;

i18next.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {

        en: {
            translation: {
                'Tires': 'Tires',
                'Motor Oil': 'Motor Oil',
                'Suspension': 'Suspension',
                'Car body': 'Car body',
                'AUTO GARAGE': 'AUTO GARAGE',
                'Everything for your car': 'Everything for your car',
                'Search here': 'Search here',
                'Search': 'Search',
            }
        },
        it: {
            translation: {
                'Tires': 'Pneumatici',
                'Motor Oil': 'Olio motore',
                'Suspension': 'Sospensione',
                'Car body': 'Carrozzeria',
                'AUTO GARAGE': 'GARAGE AUTOMATICO',
                'Everything for your car': 'Tutto per la tua auto',
                'Search here': 'Cerca qui',
                'Search': 'Ricerca',
            }
        },
        fr: {
            translation: {
                // French translations go here
            }
        }
    }
});