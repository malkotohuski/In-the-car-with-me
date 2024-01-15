import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useRouteContext } from './RouteContext';

function Confirm() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { addRoute } = useRouteContext();

    const route = useRoute();
    const selectedVehicle = route.params.selectedVehicle;
    const markedSeats = route.params.markedSeats;
    const registrationNumber = route.params.registrationNumber;
    const { selectedDateTime } = route.params;
    const departureCity = route.params.departureCity;
    const departureStreet = route.params.departureStreet;
    const departureNumber = route.params.departureNumber;
    const arrivalCity = route.params.arrivalCity;
    const arrivalStreet = route.params.arrivalStreet;
    const arrivalNumber = route.params.arrivalNumber;

    const showConfirmButton = route.params.showConfirmButton !== undefined ? route.params.showConfirmButton : true;
    const showChangesButton = route.params.showChangesButton !== undefined ? route.params.showChangesButton : true;
    const showBackButton = route.params.showBackButton !== undefined ? route.params.showBackButton : false;
    const routeRequestButton = route.params.showBackButton !== undefined ? route.params.showBackButton : false;

    const handleGoBack = () => {
        navigation.navigate('Vehicle'); // Go back to the previous screen
    };

    const handleConfirm = async () => {
        const newRoute = {
            selectedVehicle,
            markedSeats,
            registrationNumber,
            selectedDateTime,
            departureCity,
            departureStreet,
            departureNumber,
            arrivalCity,
            arrivalStreet,
            arrivalNumber,
        };
        try {
            // Make a POST request to the server to create a new route
            const response = await fetch('http://10.0.2.2:3000/create-route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    route: newRoute,
                }),
            });

            if (response.ok) {
                // Route created successfully
                console.log('Route created successfully');
                navigation.navigate('View routes'); // Navigate to ViewRoutes
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error('Failed to create route:', errorData.error);
            }
        } catch (error) {
            console.error('Error creating route:', error);
        }

        addRoute(newRoute); // Save the route using the context

        navigation.navigate('View routes'); // Navigate to ViewRoutes
    };

    const handlerBackRoutes = () => {
        navigation.navigate('View routes');
    }

    const handlerRouteRequest = () => {
        navigation.navigate('RouteDetails', { markedSeats });
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
            <Text style={styles.headerText}>{t('Review')}:</Text>
            <Text style={styles.text}>{t('Vehicle')}: {selectedVehicle}</Text>
            <Text style={styles.text}>{t('Free seats')}: {markedSeats.length}</Text>
            <Text style={styles.text}>{t('Registration Number')}: {registrationNumber}</Text>
            <Text style={styles.text}>{t('Time and date of departure')}: {selectedDateTime.toLocaleString()}</Text>

            {/* Departure Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeaderText}>{t('Departure')}:</Text>
                <Text style={styles.text}>{t('Town/Village')}: {departureCity}</Text>
                <Text style={styles.text}>{t('Street')}: {departureStreet}  {departureNumber}</Text>
            </View>

            {/* Arrival Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeaderText}>{t('Arrival')}:</Text>
                <Text style={styles.text}>{t('Town/Village')}: {arrivalCity}</Text>
                <Text style={styles.text}>{t('Street')}: {arrivalStreet}  {arrivalNumber}</Text>
            </View>

            {showChangesButton && (
                <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                    <Text style={styles.buttonText}>{t('Make changes')}</Text>
                </TouchableOpacity>
            )}
            {showConfirmButton && (
                <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>{t('Confirm')}</Text>
                </TouchableOpacity>
            )}
            {showBackButton && (
                <TouchableOpacity style={styles.buttonConfirm} onPress={handlerBackRoutes}>
                    <Text style={styles.buttonText}>{t('Back')}</Text>
                </TouchableOpacity>
            )}
            {routeRequestButton && (
                <TouchableOpacity style={styles.buttonConfirm} onPress={handlerRouteRequest}>
                    <Text style={styles.buttonText}>{t('Route request')}</Text>
                </TouchableOpacity>
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
        borderBottomWidth: 3, // Border bottom for header text
        borderBottomColor: '#1b1c1e', // Border color
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#1b1c1e',
        borderBottomWidth: 1, // Border bottom for regular text
        borderBottomColor: '#1b1c1e', // Border color
    },
    button: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e74c3c',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        width: '90%',
        borderRadius: 10,
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
    sectionContainer: {
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        width: '90%',
    },
    sectionHeaderText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1b1c1e',
        marginBottom: 5,
    },
});

export default Confirm;
