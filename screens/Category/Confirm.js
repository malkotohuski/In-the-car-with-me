import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

    const handleGoBack = () => {
        navigation.navigate('Vehicle'); // Go back to the previous screen
    };

    const handleConfirm = () => {
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

        addRoute(newRoute); // Save the route using the context

        navigation.navigate('View routes'); // Navigate to ViewRoutes
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{t('Review')}:</Text>
            <Text style={styles.text}>{t('Vehicle')}: {selectedVehicle}</Text>
            <Text style={styles.text}>{t('Free seats')}: {markedSeats.length}</Text>
            <Text style={styles.text}>{t('Registration Number')}: {registrationNumber}</Text>
            <Text style={styles.text}>{t('Time and date of departure')}: {selectedDateTime.toString()}</Text>
            <Text style={styles.text}>{t('Departure')}: {t('Town/Village')} : {departureCity}</Text>
            <Text style={styles.text}>{t('Street')}: {departureStreet}  {departureNumber}</Text>

            <Text style={styles.text}>{t('Arrival')}: {t('Town/Village')} : {arrivalCity}</Text>
            <Text style={styles.text}>{t('Street')}: {arrivalStreet}  {arrivalNumber}</Text>

            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                <Text style={styles.buttonText}>{t('Make changes')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirm}>
                <Text style={styles.buttonText}>{t('Confirm')}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
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
});

export default Confirm;
