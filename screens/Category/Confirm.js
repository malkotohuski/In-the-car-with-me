import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';

function Confirm() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const route = useRoute();
    const selectedVehicle = route.params.selectedVehicle;
    const markedSeats = route.params.markedSeats;
    const registrationNumber = route.params.registrationNumber;
    const { selectedDateTime } = route.params;

    const handleGoBack = () => {
        navigation.navigate('Vehicle'); // Go back to the previous screen
    };

    const handleConfirm = () => {
        navigation.navigate('ViewRoutes'); // Navigate to the ViewRoutes screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{t('Confirmation Details')}</Text>
            <Text style={styles.text}>{t('Vehicle')}: {selectedVehicle}</Text>
            <Text style={styles.text}>{t('Free seats')}: {markedSeats.length}</Text>
            <Text style={styles.text}>{t('Registration Number')}: {registrationNumber}</Text>
            <Text style={styles.text}>{t('Selected Date and Time')}: {selectedDateTime.toString()}</Text>

            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                <Text style={styles.buttonText}>{t('Change')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
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
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f4511e',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        width: '90%', // Adjust the width as needed
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Confirm;
