import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../Authentication/AuthContext';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000'; // JSON server
const api = axios.create({
    baseURL: API_BASE_URL,
});


function RouteDetails() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useAuth();
    console.log('dfsdf', user);


    const handlerTripRequest = async () => {
        try {
            // Ensure that you have the correct user data
            const routeCreatorEmail = user?.user?.email; // Replace with the actual email of the route creator

            console.log('Sending trip request to:', routeCreatorEmail);

            const emailResponse = await api.post('/send-request-to-email', {
                email: routeCreatorEmail,
                text: 'Your desired text here', // Replace with the actual text you want to send
            });

            // Handle the response from the Email server if needed
            console.log('Email Response:', emailResponse);
            Alert.alert('Success', 'Trip request sent successfully.');
        } catch (emailError) {
            // Handle any error that occurred during the Email server request
            console.error('Email Server Error:', emailError);
            Alert.alert('Error', 'Failed to send trip request.');
            // You can show an alert or handle the error in a way that fits your application
        }
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
            <Text style={styles.text}> {t('Nick name')} : {user?.user?.username}</Text>
            <Text style={styles.text}> {t('Names')} :  {user?.user?.fName} {user?.user?.lName}</Text>
            <Text style={styles.text}> {t('Names')} :  {user?.user?.email} </Text>


            {/* Display other route details here based on your requirements */}

            {/* Add a button to navigate back to the Confirm screen */}
            <TouchableOpacity style={styles.buttonConfirm} onPress={handlerTripRequest}>
                <Text style={styles.buttonText}>{t('Trip request')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonConfirm} onPress={() => navigation.goBack()}>
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

export default RouteDetails;
