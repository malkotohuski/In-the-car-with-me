import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../Authentication/AuthContext';
import { useRouteContext } from '../Category/RouteContext';
import axios from 'axios';

function RouteRequestApprovalScreen({ route }) {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { user } = useAuth();
    const { routes } = useRouteContext();
    const { requestingUser } = route.params;
    console.log('???', routes);

    const handleApproveRequest = async () => {
        try {
            // Implement the logic to approve the route request
            // You may want to send a notification or update the database accordingly
            // After handling the request, you can navigate back to the previous screen
            navigation.navigate('RouteDetails');

            // Save requestingUser data to AsyncStorage
            const storedRequests = await AsyncStorage.getItem('routeRequests');
            const parsedRequests = storedRequests ? JSON.parse(storedRequests) : [];
            const updatedRequests = [...parsedRequests, requestingUser];
            AsyncStorage.setItem('routeRequests', JSON.stringify(updatedRequests));
        } catch (error) {
            // Handle any errors
            console.error('Error handling route request:', error);
        }
    };

    const handleRejectRequest = () => {
        // Implement the logic to reject the route request
        // You may want to send a notification or update the database accordingly
        // After handling the request, you can navigate back to the previous screen
        navigation.navigate('RouteDetails');
    };

    return (
        <View style={styles.container}>
            {/* Display user details who wants to use the route */}
            <Text style={styles.headerText}>{t('Route Request Details')}:</Text>
            <Text style={styles.text}>{t('Nick name')}: {requestingUser.username}</Text>
            <Text style={styles.text}>{t('Names')}: {requestingUser.userFname} {requestingUser.userLname}</Text>
            <Text style={styles.text}>{t('Email')}: {requestingUser.userEmail}</Text>

            {/* Add buttons to approve or reject the route request */}
            <TouchableOpacity style={styles.buttonConfirm} onPress={handleApproveRequest}>
                <Text style={styles.buttonText}>{t('Approve Request')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonConfirm} onPress={handleRejectRequest}>
                <Text style={styles.buttonText}>{t('Reject Request')}</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    const { username, userFname, userLname, userEmail, departureCity, arrivalCity, routeId, user_id } = route.params;
    const { routes } = useRouteContext();
    console.log('USER', loggedInUser);
    // request user data :
    const requesterUsername = user?.user?.username;
    const requestUserFirstName = user?.user?.fName;
    const requestUserLastName = user?.user?.lName;
    const departureCityEmail = route.params.departureCity;
    const arrivalCityEmail = route.params.arrivalCity;

    const handlerTripRequest = async () => {
        try {
            // Ensure that you have the correct user data

            console.log('Sending trip request to:', route);

            Alert.alert(
                'Confirm',
                'Do you want to approve requests for your route?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            const emailResponse = await api.post('/send-request-to-email', {
                                email: userEmail,
                                text: t(`You have a new request for your route.From : ${requesterUsername} ${requestUserFirstName} ${requestUserLastName}.About the route : ${departureCityEmail}-${arrivalCityEmail}`),
                            });

                            // Handle the response from the Email server if needed
                            console.log('Email Response:', emailResponse);
                            Alert.alert('Success', 'Trip request sent successfully.');
                        },
                    },
                ],
                { cancelable: false }
            );
            navigation.navigate('Route request', {
                requestingUser: {
                    username: requesterUsername,
                    userFname: requestUserFirstName,
                    userLname: requestUserLastName,
                    departureCity: departureCityEmail,
                    arrivalCity: arrivalCityEmail,
                    userRequestInfo: loggedInUser,
                }
            });

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
            <Text style={styles.text}> {t('Route ID')} : {routeId} </Text>
            <Text style={styles.text}> {t('User ID')} : {user_id} </Text>

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

export { RouteDetails, RouteRequestApprovalScreen };
