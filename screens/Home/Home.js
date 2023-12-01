import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
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
    const [isBulgaria, setisBulgaria] = useState(false);

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
        setisBulgaria(lng === 'bg');
    };



    useEffect(() => {
        const changeImageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => {
            clearInterval(changeImageInterval);
        };
    }, []);

    const handlerVehicle = () => {
        navigation.navigate('Vehicle');
        console.log('Vehicle clicked !!!');
    }

    const handlerRouteRequest = () => {
        navigation.navigate('RouteRequest')
        console.log('RouteRequest clicked !!!');
    }

    const handlerRouteViewer = () => {
        navigation.navigate('RouteViewer')
        console.log('RouteViewer !!!');
    }

    const handlerReporting = () => {
        navigation.navigate('Reporting')
        console.log('Reporting clicked !!!');
    }

    return (
        <View style={styles.homepage}>
            <View style={styles.adBox}>
                <Image source={images[currentImageIndex]} style={styles.adImage} />
            </View>
            <View style={styles.content}>
                <View style={styles.languageSwitchContainer}>
                    <TouchableOpacity
                        style={styles.languageButton}
                        onPress={() => changeLanguage('en')}
                    >
                        <Image
                            source={require('../../images/engl-flag.png')} // Replace with the path to your English flag image
                            style={styles.flagImage}
                        />
                        <Text>{t('English')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.languageButton}
                        onPress={() => changeLanguage('bg')}
                    >
                        <Image
                            source={require('../../images/bulg-flag.png')} // Replace with the path to your Italian flag image
                            style={styles.flagImage}
                        />
                        <Text>{t('Bulgarian')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuImages}>
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerVehicle} >
                            <Text>{t('Register your vehicle')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerRouteRequest} >
                            <Text>{t('Route request')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerRouteViewer} >
                            <Text>{t('View routes')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.tiresButton} onPress={handlerReporting} >
                            <Text>{t('Reporting')}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* Your content goes here */}
                <Text style={styles.heading}>{t('The Car with ME')}</Text>
                <Text style={styles.moto}>{t('We travel freely')}</Text>
                <View style={styles.searchBox}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchField}
                            placeholder={t('Search here')}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => {
                            // Handle search button press
                        }}
                    >
                        <Text style={styles.searchButtonText}>{t('Search')}</Text>
                    </TouchableOpacity>
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
                'Register your vehicle': 'Register your vehicle',
                'Route request': 'Route request',
                'View routes': 'View routes',
                'Reporting': 'Reporting',
                'The Car with ME': 'The Car with ME',
                'We travel freely': 'We travel freely',
                'Search here': 'Search here',
                'Search': 'Search',
                'Categories': 'Categories',
                'Car': 'Car',
                'Vehicle': 'Vehicle',
                'Garage': 'Garage',
                'Home': 'Home',
                'Account': 'Account',
                'Video': 'Video',
                'Motorcycle': 'Motorcycle',
                'A minibus': 'A minibus',
                'A bus': 'A bus',
                'Select vehicle': 'Select vehicle',
                'English': 'English',
                'Bulgarian': 'Bulgarian',
            }
        },
        bg: {
            translation: {
                'Register your vehicle': 'Регистрирай автомобила си ',
                'Route request': 'Запитване за маршрут',
                'View routes': 'Преглед на маршрутите',
                'Reporting': 'Подаване на сигнал',
                'The Car with ME': 'Koлaтa c мен ',
                'We travel freely': 'Пътуваме свободно',
                'Search here': 'Търсете тук',
                'Search': 'Търсене ',
                'Categories': 'Категории',
                'Car': 'Лек автомобил',
                'Vehicle': 'Автомобил',
                'Garage': 'Гараж',
                'Home': 'Дом',
                'Account': 'Акаунт',
                'Video': 'Видео',
                'Motorcycle': 'Мотоциклет',
                'A minibus': 'Микробус',
                'A bus': 'Автобус',
                'Select vehicle': 'Изберете превозно средство',
                'English': 'Английски',
                'Bulgarian': 'Български',
            }
        },
    }
});