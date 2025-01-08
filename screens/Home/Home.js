import i18n from './i18n';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useAuth } from '../Authentication/AuthContext';

const API_BASE_URL = 'http://10.0.2.2:3000'; // JSON server
const api = axios.create({
    baseURL: API_BASE_URL,
});

function HomePage({ navigation }) {
    const route = useRoute();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [isBulgaria, setisBulgaria] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    const loginUser = user?.user?.username;

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

    const handlerNotificationScreen = () => {
        navigation.navigate('Notifications', { resetNotificationCount: true });
        console.log('View routes clicked !!!');
        setNotificationCount(0); // Зануляваме броя на нотификациите
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
                <View style={styles.homepage}>
                    <Image
                        source={require('../../images/home2-background.jpg')}
                        style={styles.backgroundImage}
                    />
                    <View style={styles.overlay} />
                    <View style={styles.centeredTextContainer}>
                        <Text style={styles.heading}>{t('In the car with me')}</Text>
                        <Text style={styles.moto}>{t('We travel freely')}</Text>
                    </View>
                    <View style={{ flex: 1, }}>
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
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerIcon} onPress={handlerNotificationScreen}>
                    <Icons name="routes" size={34} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerIcon} onPress={handlerChatScreen}>
                    <Icons name="chat" size={34} color="#080808" />
                </TouchableOpacity>
                <View style={styles.notificationWrapper}>
                    <TouchableOpacity style={styles.footerIcon} onPress={handlerNotificationScreen}>
                        <Icons name="bell" size={34} color="#000000" />
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
