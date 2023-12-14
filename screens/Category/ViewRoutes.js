import { t } from 'i18next';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function ViewRoutes({ route }) {
    const {
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
    } = route.params;

    const handleButtonClick = () => {
        // Log or display all the route data when the button is clicked
        console.log('Route Data:', route.params);
        // You can also display the data in an alert, modal, or any other UI element
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
                <Text style={styles.buttonText}>{t('Route')}: {departureCity}-{arrivalCity}</Text>
            </TouchableOpacity>

            {/* Add more Text components to display other data */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ecf0f1',
    },
    button: {
        backgroundColor: '#3498db', // Button color
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff', // Text color
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#34495e',
    },
});

export default ViewRoutes;
