import i18n from '../i18n';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useAuth } from '../../Authentication/AuthContext';
import { DarkModeContext } from '../../DrawerContent/DarkModeContext';

const API_BASE_URL = 'http://10.0.2.2:3000'; // JSON server
const api = axios.create({
    baseURL: API_BASE_URL,
});

function HomePage({ navigation }) {
    const { darkMode } = useContext(DarkModeContext);
    const route = useRoute();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [isBulgaria, setisBulgaria] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    const loginUser = user?.user?.username;

    const getContainerStyle = () => ({
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: darkMode ? '#121212' : '#fff', // Поставяме условие за тъмен/светъл фон
    });

    const getBackgroundImage = () => {
        return darkMode
            ? require('../../../images/roadHistory2.png')
            : require('../../../images/home2-background.jpg');
    };

    const getTextStyle = () => ({
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: darkMode ? '#FFFDFDFF' : '#010101', // Текстовият цвят ще бъде по-светъл в тъмния режим
    });

    const getButtonStyle = (color = '#000') => ({
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: darkMode ? '#444' : '#000', // Тъмни и светли цветове за бордерите
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)', // Променяме фона за бутоните
    });

    const getTextButtonStyles = () => ({
        fontSize: 20,
        fontWeight: '800',
        color: darkMode ? '#f1f1f1' : '#010101',
    })

    const getFooterStyle = () => ({
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',  // Центриране на иконите вертикално
        paddingVertical: 10,
        backgroundColor: darkMode ? '#333232FF' : '#f4511e',  // По-тъмно оранжево за тъмен режим
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10,
        paddingHorizontal: 0,
    });

    const getNotificationIconBackground = () => ({
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: darkMode ? '#010101' : '#f1f1f1',// Цветът на иконките, промени го според нуждите си
        justifyContent: 'center',
    });

    const getNotificationIconColor = () => ({
        color: darkMode ? '#f1f1f1' : '#010101',
        size: 34,
    })

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                if (!loginUser) {
                    console.error('No logged-in username found.');
                    return;
                }

                // Извличане на всички нотификации
                const response = await api.get('/notifications');

                // Филтриране на нотификациите за логнатия потребител
                const userNotifications = response.data.filter(
                    notification =>
                        notification.recipient === loginUser &&         // Проверка дали recipient съвпада
                        !notification.read                              // Проверка дали нотификацията е непрочетена
                );

                // Актуализация на броя нотификации
                setNotificationCount(userNotifications.length > 9 ? '9+' : userNotifications.length);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
    }, [loginUser]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Проверка за параметри от Notifications, които показват, че броят на нотификациите трябва да бъде занулен
            if (route.params?.resetNotificationCount) {
                setNotificationCount(0);
            }
        });

        return unsubscribe;
    }, [navigation, route.params]);

    const changeLanguage = async (lng) => {
        await i18next.changeLanguage(lng);
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
        navigation.navigate('View routes')
        console.log('Routes history !!!');
    }

    const handlerReporting = () => {
        navigation.navigate('Reporting')
        console.log('Reporting clicked !!!');
    }

    const handlerChatScreen = () => {
        navigation.navigate('Chat');
        console.log('Chats screen clicked !!!');
    }

    const handlerNotificationScreen = async () => {
        try {
            // Актуализиране на нотификациите на сървъра
            const response = await api.get('/notifications');
            const userNotifications = response.data.filter(
                notification =>
                    notification.recipient === loginUser &&
                    !notification.read
            );

            for (const notification of userNotifications) {
                await api.patch(`/notifications/${notification.id}`, { read: true });
            }

            // Пренасочване към екрана с нотификациите
            navigation.navigate('Notifications', { resetNotificationCount: true });
            console.log('Notifications screen clicked!');
            setNotificationCount(0); // Зануляваме броя на нотификациите на клиента
        } catch (error) {
            console.error('Failed to mark notifications as read:', error);
            Alert.alert('Error', 'Failed to update notifications.');
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
                <View style={getContainerStyle()}>
                    <Image
                        source={getBackgroundImage()}
                        style={styles.backgroundImage}
                    />
                    <View style={styles.overlay} />
                    <View style={styles.centeredTextContainer}>
                        <Text style={getTextStyle()}>{t('In the car with me')}</Text>
                        <Text style={getTextStyle()}>{t('We travel freely')}</Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <View style={styles.languageSwitchContainer}>
                            <TouchableOpacity
                                style={styles.languageButton}
                                onPress={() => changeLanguage('en')}
                            >
                                <Image
                                    source={require('../../../images/eng1-flag.png')}
                                    style={styles.flagImage}
                                />
                                <Text style={getTextStyle()}>{t('English')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.languageButton}
                                onPress={() => changeLanguage('bg')}
                            >
                                <Image
                                    source={require('../../../images/bulg-flag.png')}
                                    style={styles.flagImage}
                                />
                                <Text style={getTextStyle()}>{t('Bulgarian')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuImages}>
                            <TouchableOpacity style={getButtonStyle()} onPress={handlerVehicle}>
                                <Text style={getTextButtonStyles()}>{t('Create a route')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={getButtonStyle()} onPress={handlerRouteRequest}>
                                <Text style={getTextButtonStyles()}>{t('Route request')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={getButtonStyle()} onPress={handlerRouteViewer}>
                                <Text style={getTextButtonStyles()}>{t('View routes')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={getButtonStyle()} onPress={handlerReporting}>
                                <Text style={getTextButtonStyles()}>{t('Reporting')}</Text>
                            </TouchableOpacity>
                        </View>
                        {/*  <View style={styles.searchBox}>
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
                </View> */}
                    </View>
                </View>
            </ScrollView>
            <View style={getFooterStyle()}>
                <TouchableOpacity style={getNotificationIconBackground()} onPress={handlerNotificationScreen}>
                    <Icons name="routes" {...getNotificationIconColor()} />
                </TouchableOpacity>
                <TouchableOpacity style={getNotificationIconBackground()} onPress={handlerChatScreen}>
                    <Icons name="chat" {...getNotificationIconColor()} />
                </TouchableOpacity>
                <View style={styles.notificationWrapper}>
                    <TouchableOpacity style={getNotificationIconBackground()} onPress={handlerNotificationScreen}>
                        <Icons name="bell" {...getNotificationIconColor()} />
                        {notificationCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.notificationText}>{notificationCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default HomePage;
