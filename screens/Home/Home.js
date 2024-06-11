import i18n from './i18n';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

function HomePage({ navigation }) {
    const { t } = useTranslation();
    const [isBulgaria, setisBulgaria] = useState(false);

    const changeLanguage = async (lng) => {
        await i18next.changeLanguage(lng);
        setisBulgaria(lng === 'bg');
    };

    const handlerVehicle = () => {
        navigation.navigate('Vehicle');
    }

    const handlerRouteRequest = () => {
        navigation.navigate('Route request');
    }

    const handlerRouteViewer = () => {
        navigation.navigate('RoutesHistory');
    }

    const handlerReporting = () => {
        navigation.navigate('Reporting');
    }

    const handlerChatScreen = () => {
        navigation.navigate('Chat');
    }

    const handlerNotificationScreen = () => {
        navigation.navigate('Notifications');
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
                            source={require('../../images/eng1-flag.png')}
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
                            >{t('Create a route')}</Text>
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
                            >{t('Routes history')}</Text>
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
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerIcon} onPress={handlerNotificationScreen}>
                        <Icons name="routes" size={34} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerIcon} onPress={handlerChatScreen}>
                        <Icons name="chat" size={34} color="#080808" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerIcon} onPress={handlerNotificationScreen}>
                        <Icons name="bell" size={34} color="#000000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default HomePage;
