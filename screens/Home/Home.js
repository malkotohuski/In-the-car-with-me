import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DarkModeContext } from '../Authentication/DarkModeContext';

function HomePage({ navigation }) {
    const { t } = useTranslation();
    const { darkMode, backgroundImage } = useContext(DarkModeContext);

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

    const getTextStyle = () => {
        return {
            color: darkMode ? '#fff' : '#000',
        };
    };

    const getIconColor = () => {
        return darkMode ? '#fff' : '#000';
    };

    return (
        <View style={styles.homepage}>
            <Image
                source={backgroundImage}
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
                        <Text style={styles.languageText}>{t('English')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.languageButton}
                        onPress={() => changeLanguage('bg')}
                    >
                        <Image
                            source={require('../../images/bulg-flag.png')}
                            style={styles.flagImage}
                        />
                        <Text style={styles.languageText}>{t('Bulgarian')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuImages}>
                    <View>
                        <TouchableOpacity style={styles.vehicleButton} onPress={handlerVehicle}>
                            <Text style={[styles.textButtons, getTextStyle()]}>{t('Create a route')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.routeRequestButton} onPress={handlerRouteRequest}>
                            <Text style={[styles.textButtons, getTextStyle()]}>{t('Route request')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.routeViewerButton} onPress={handlerRouteViewer}>
                            <Text style={[styles.textButtons, getTextStyle()]}>{t('Routes history')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.reportingButton} onPress={handlerReporting}>
                            <Text style={[styles.textButtons, getTextStyle()]}>{t('Reporting')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.centeredTextContainer}>
                    <Text style={[styles.heading, getTextStyle()]}>{t('In the car with me')}</Text>
                    <Text style={[styles.moto, getTextStyle()]}>{t('We travel freely')}</Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerIcon} onPress={handlerNotificationScreen}>
                        <Icons name="routes" size={34} color={getIconColor()} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerIcon} onPress={handlerChatScreen}>
                        <Icons name="chat" size={34} color={getIconColor()} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerIcon} onPress={handlerNotificationScreen}>
                        <Icons name="bell" size={34} color={getIconColor()} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default HomePage;
