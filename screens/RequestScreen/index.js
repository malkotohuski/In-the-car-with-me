import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../Authentication/AuthContext';
import { useRouteContext } from '../Category/RouteContext';
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
    const { username, userFname, userLname, userEmail, departureCity, arrivalCity, } = route.params;
    // request user data :
    const requesterUsername = user?.user?.username;
    const requestUserFirstName = user?.user?.fName;
    const requestUserLastName = user?.user?.lName;
    const requestUserEmail = user?.user?.email;
    const departureCityEmail = route.params.departureCity;
    const arrivalCityEmail = route.params.arrivalCity;

    const handlerTripRequest = async () => {
        try {
            // Ensure that you have the correct user data
            console.log('Sending trip request to:', route);

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
                            const emailResponse = await api.post('/send-request-to-email', {
                                email: userEmail,
                                text: t(`You have a new request for your route. From: ${requesterUsername} ${requestUserFirstName} ${requestUserLastName}. About the route: ${departureCityEmail}-${arrivalCityEmail}`),
                            });

                            // Handle the response from the Email server if needed
                            console.log('Email Response:', emailResponse);
                            Alert.alert('Success', 'Trip request sent successfully.');

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
                            });
                            ;

                            // Handle the response from the server if needed
                            console.log('Route Approval Response:', response);

                            // After handling the request, you can navigate back to the previous screen
                            navigation.navigate('Home');
                        },
                    },
                ],
                { cancelable: false }
            );

        } catch (emailError) {
            // Handle any error that occurred during the Email server request
            console.error('Email Server Error:', emailError);
            Alert.alert('Error', 'Failed to send trip request.');
            // You can show an alert or handle the error in a way that fits your application
        }
    };

    const handlerBackToViewRoute = () => {
        navigation.navigate('View routes')
    }

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

            {/* Display other route details here based on your requirements */}

            {/* Add a button to navigate back to the Confirm screen */}
            <TouchableOpacity style={styles.buttonConfirm} onPress={handlerTripRequest}>
                <Text style={styles.buttonText}>{t('Trip request')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonConfirm} onPress={handlerBackToViewRoute}>
                <Text style={styles.buttonText}>{t('Back')}</Text>
            </TouchableOpacity>
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
    buttonText: {
        color: '#F1F1F1',
        fontSize: 16,
    },
});

export { RouteDetails };
