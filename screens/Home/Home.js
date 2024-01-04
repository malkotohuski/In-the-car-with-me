import i18n from './i18n';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles';


function HomePage({ navigation }) {
    const { t } = useTranslation();
    const [isBulgaria, setisBulgaria] = useState(false);

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
        setisBulgaria(lng === 'bg');
    };

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
            <Image
                source={require('../../images/home2-background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={styles.languageSwitchContainer}>
                    <TouchableOpacity
                        style={styles.languageButton}
                        onPress={() => changeLanguage('en')}
                    >
                        <Image
                            source={require('../../images/engl-flag.png')}
                            style={styles.flagImage}
                        />
                        <Text
                            style={styles.languageText}
                        >{t('English')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.languageButton}
                        onPress={() => changeLanguage('bg')}
                    >
                        <Image
                            source={require('../../images/bulg-flag.png')}
                            style={styles.flagImage}
                        />
                        <Text
                            style={styles.languageText}
                        >{t('Bulgarian')}</Text>
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

                <View style={styles.searchBox}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchField}
                            placeholderTextColor={'#F5FDFE'}
                            placeholder={t('Search here')}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => {

                        }}
                    >
                        <Text style={styles.searchButtonText}>{t('Search')}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

export default HomePage;
