import i18n from './i18n';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles';


/* const images = [
    require('../../images/suspension.jpg'), // Replace with your image file paths
    require('../../images/images3.jpg'),
    require('../../images/tires.jpg'),
    require('../../images/gearbox.jpg'),
    require('../../images/motorOil.jpg'),
]; */


function HomePage({ navigation }) {
    const { t } = useTranslation();
    /*     const [currentImageIndex, setCurrentImageIndex] = useState(0); */
    const [isBulgaria, setisBulgaria] = useState(false);

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
        setisBulgaria(lng === 'bg');
    };

    /*    useEffect(() => {
           const changeImageInterval = setInterval(() => {
               setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
           }, 3000); // Change image every 3 seconds
   
           return () => {
               clearInterval(changeImageInterval);
           };
       }, []); */

    const handlerVehicle = () => {
        navigation.navigate('Vehicle');
        console.log('Vehicle clicked !!!');
    }

    const handlerRouteRequest = () => {
        navigation.navigate('Route request')
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
            <View >
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
                        <TouchableOpacity style={styles.vehicleButton} onPress={handlerVehicle} >
                            <Text
                                style={styles.textButtons}
                            >{t('Register your vehicle')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.routeRequestButton} onPress={handlerRouteRequest} >
                            <Text
                                style={styles.textButtons}
                            >{t('Route request')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.routeViewerButton} onPress={handlerRouteViewer} >
                            <Text
                                style={styles.textButtons}
                            >{t('View routes')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.reportingButton} onPress={handlerReporting} >
                            <Text
                                style={styles.textButtons}
                            >{t('Reporting')}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.centeredTextContainer}>
                    {/* Your content goes here */}
                    <Text style={styles.heading}>{t('In the car with me')}</Text>
                    <Text style={styles.moto}>{t('We travel freely')}</Text>
                </View>
                <View>
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
            </View>
            {/*  <View style={styles.adBox}>
                <Image source={images[currentImageIndex]} style={styles.adImage} />
              
            </View> */}
            {/* Footer goes here */}
        </View>
    );
}

export default HomePage;
