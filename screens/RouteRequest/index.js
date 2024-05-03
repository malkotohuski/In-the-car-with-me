import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Authentication/AuthContext';
import { useRouteContext } from '../Category/RouteContext';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000'; // JSON server
const api = axios.create({
    baseURL: API_BASE_URL,
});

function RouteRequestScreen({ route, navigation }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { requests, refreshUserData } = useRouteContext();
    const [routeRequests, setRouteRequests] = useState([]);
    const requestUserFirstName = user?.user?.fName;
    const requestUserLastName = user?.user?.lName;
    console.log("IA", requests);

    const getRequestsForCurrentUser = () => {

        return requests.filter(request => {

            if (request.userRouteId === user?.user?.id) {
                const currentDate = new Date();
                return new Date(request.dataTime) >= currentDate;
            }
            return false;
        });
    };

    useFocusEffect(
        useCallback(() => {
            const requestsForCurrentUser = getRequestsForCurrentUser();
            setRouteRequests(requestsForCurrentUser);
            refreshUserData();
        }, []),
    );


    const [isMigrating, setIsMigrating] = useState(false);

    useEffect(() => {
        let interval;

        if (isMigrating) {
            interval = setInterval(() => {
                setIsMigrating((prev) => !prev);
            }, 500); // Промяна на стиловете на всеки 500 милисекунди
        }

        return () => {
            clearInterval(interval);
        };
    }, [isMigrating]);

    const handlePress = async (request) => {
        setIsMigrating(true);
        Alert.alert(
            `${t('There is a request from:')} ${request.userFname} ${request.userLname}`,
            t('Do you want to approve the request?'),
            [
                {
                    text: t('Yes'), onPress: async () => {
                        try {
                            const emailResponse = await api.post('/send-request-to-email', {
                                email: request.userEmail,
                                text: t(`Your request has been approved by: ${requestUserFirstName} ${requestUserLastName}.`),
                            });
                            console.log('Email Response:', emailResponse);
                            Alert.alert('Success', 'Trip request sent successfully.');

                            /* const response = await api.post('/send-request-to-user', {
                                // Тук можеш да използваш request.requestingUser.userEmail за да направиш заявката
                            });
                            // Handle the response from the server if needed
                            console.log('Route Approval Response:', response); */

                            // After handling the request, you can navigate back to the previous screen
                            navigation.navigate('Home');
                        } catch (error) {
                            console.error('Error while handling request:', error);
                            Alert.alert('Error', 'An error occurred while handling the request.');
                        } finally {
                            setIsMigrating(false);
                        }
                    },
                },
                { text: t('No'), onPress: () => setIsMigrating(false), style: 'cancel' }
            ],
            { cancelable: false }
        );
    };

    const renderRoutes = () => {
        const requestsForCurrentUser = getRequestsForCurrentUser();

        const renderedRoutes = requestsForCurrentUser.map((request) => (
            <TouchableOpacity
                key={request.id}
                style={[
                    styles.requestContainer,
                    request.requestingUser ? (isMigrating ? styles.migratingGreenBorder : styles.greenBorder) : null
                ]}
                onPress={() => handlePress(request)}
            >
                <View style={styles.userContainer}>
                    <Image source={{ uri: user?.user?.userImage }} style={styles.userImage} />
                    <Text style={styles.userName}>{request.username}</Text>
                </View>
                <Text style={styles.text}>
                    {t('Direction')}: {t(`${request.departureCity}-${request.arrivalCity}`)}
                </Text>
            </TouchableOpacity>
        ));

        return renderedRoutes.length > 0 ? renderedRoutes : <Text>{t('No new requests.')}</Text>;
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Image
                    source={require('../../images/routes2-background.jpg')}
                    style={styles.backgroundImage}
                />
                <View style={styles.container}>
                    <Text style={styles.headerText}>{t('Route Requests')}:</Text>
                    {routeRequests.length > 0 ? (
                        <View>
                            {renderRoutes()}
                        </View>
                    ) : (
                        <Text>{t('There are no requests for this route.')}</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        position: 'relative',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 10,
    },
    requestContainer: {
        margin: 10,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
        elevation: 3,
    },
    migratingGreenBorder: {
        borderColor: 'red',
        borderWidth: 2,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        zIndex: -1,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#1b1c1e',
        alignSelf: 'center'
    },
    greenBorder: {
        borderColor: 'green',
        borderWidth: 2,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
    },
});

export default RouteRequestScreen;
