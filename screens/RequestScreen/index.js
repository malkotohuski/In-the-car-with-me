import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../Authentication/AuthContext';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000'; // JSON server
const api = axios.create({
    baseURL: API_BASE_URL,
});

function RouteDetails({ route }) {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { user } = useAuth();
    const routeInfo = useRoute();
    const loggedInUser = route.params.loggedInUser;
    const { username, userFname, userLname, userEmail, departureCity, arrivalCity, routeId } = route.params;
    const loginUser = user?.user?.username;

    const requesterUsername = user?.user?.username;
    const requestUserFirstName = user?.user?.fName;
    const requestUserLastName = user?.user?.lName;
    const requestUserEmail = user?.user?.email;
    const departureCityEmail = route.params.departureCity;
    const arrivalCityEmail = route.params.arrivalCity;

    const routeDateTime = route.params.selectedDateTime;
    const dataTime = routeDateTime.replace('T', ' ').replace('.000Z', '');

    const [tripRequestText, setTripRequestText] = useState('');
    const [notificationCount, setNotificationCount] = useState(0);
    const [hasRequested, setHasRequested] = useState(false);

    // Проверка за съществуваща заявка
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
                    notification => notification.requester.username === loginUser && !notification.read
                );

                // Актуализация на броя нотификации
                setNotificationCount(userNotifications.length > 9 ? '9+' : userNotifications.length);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
    }, [loginUser]);


    const handlerTripRequest = async () => {
        try {
            if (hasRequested) {
                Alert.alert(t('Error'), t('You have already submitted a request for this route.'));
                return;
            }

            Alert.alert(
                t('Confirm'),
                t('Would you like to submit a request for this route?'),
                [
                    {
                        text: t('Cancel'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            const message = tripRequestText
                                ? `${tripRequestText}\n\n${t(`You have a new request for your route. From: ${requesterUsername} ${requestUserFirstName} ${requestUserLastName}. About the route: ${departureCity}-${arrivalCity}`)}`
                                : t(`You have a new request for your route. From: ${requesterUsername} ${requestUserFirstName} ${requestUserLastName}. About the route: ${departureCity}-${arrivalCity}`);

                            // Съхранение на заявката
                            const response = await api.post('/send-request-to-user', {
                                requestingUser: {
                                    username: user?.user?.username,
                                    userFname: user?.user?.fName,
                                    userLname: user?.user?.lName,
                                    userEmail: requestUserEmail,
                                    userID: user?.user?.id,
                                    userRouteId: route.params.userId,
                                    departureCity: route.params.departureCity,
                                    arrivalCity: route.params.arrivalCity,
                                    routeId: route.params.routeId,
                                    dataTime: route.params.selectedDateTime
                                },
                            });;

                            // Съхранение на нотификация
                            await api.post('/notifications', {
                                recipient: username, // Потребител, който е създал маршрута
                                message: t(`You have a new request for your route from: ${requesterUsername}.
                                            About the route: ${departureCity}-${arrivalCity}.
                                            For date: ${dataTime}`),
                                routeId,
                                routeChecker: true,
                                status: 'active',
                                requester: {
                                    username: requesterUsername,
                                    userFname: requestUserFirstName,
                                    userLname: requestUserLastName,
                                    email: requestUserEmail,
                                },
                                createdAt: new Date().toISOString(),
                            });

                            Alert.alert('Success', 'Trip request sent successfully.');
                            setHasRequested(true);
                            navigation.navigate('Home');
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to send trip request.');
        }
    };

    const handlerBackToViewRoute = () => {
        navigation.navigate('View routes');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../images/confirm2-background.jpg')}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    position: 'absolute',
                }}
            />

            <Text style={styles.headerText}>{t('Route Details')}:</Text>
            <Text style={styles.text}> {t('Nick name')} : {username}</Text>
            <Text style={styles.text}> {t('Names')} :  {userFname} {userLname}</Text>
            <Text style={styles.text}> {t('Route')} :  {departureCity}-{arrivalCity} </Text>

            <TextInput
                style={styles.input}
                onChangeText={text => setTripRequestText(text)}
                value={tripRequestText}
                placeholder={t('Enter your travel request comment here :')}
                multiline={true}
                numberOfLines={4}
            />

            <TouchableOpacity style={styles.buttonConfirm} onPress={handlerTripRequest}>
                <Text style={styles.buttonText}>{t('Trip request')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBack} onPress={handlerBackToViewRoute}>
                <Text style={styles.buttonText}>{t('Back')}</Text>
            </TouchableOpacity>

            {requesterUsername === username && (
                <Text style={styles.warningText}>
                    {t('This route was created by you, and you cannot request it!')}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 10,
        color: '#1b1c1e',
        borderBottomWidth: 3,
        borderBottomColor: '#1b1c1e',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#1b1c1e',
        borderBottomWidth: 1,
        borderBottomColor: '#1b1c1e',
    },
    buttonConfirm: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#27ae60',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        width: '90%',
        borderRadius: 10,
    },
    buttonBack: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#AE2727FF',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        width: '90%',
        borderRadius: 10,
    },
    buttonText: {
        color: '#F1F1F1',
        fontSize: 16,
    },
    input: {
        marginTop: 10,
        padding: 10,
        width: '90%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    warningText: {
        marginTop: 10,
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export { RouteDetails };
