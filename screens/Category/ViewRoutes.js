import { t } from 'i18next';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';

function ViewRoutes({ route }) {
    const [modalVisible, setModalVisible] = useState(false);
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
        // Show the modal when the button is clicked
        setModalVisible(true);
    };

    const handlerRequestModal = () => {

    }

    const handleCloseModal = () => {
        // Close the modal
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
                <Text style={styles.buttonText}>{t('Route')}: {departureCity}-{arrivalCity}</Text>
            </TouchableOpacity>

            {/* Modal for displaying route data */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.departureContent}>
                        {/* Display route data in the modal */}
                        <Text style={styles.departureText}>{t('Departure address')}:</Text>
                        <Text style={styles.departureText}>{departureCity} {departureStreet}-{departureNumber}</Text>
                        <Text style={styles.text}>{t('Time and date of departure')}:</Text>
                        <Text style={styles.text}>{selectedDateTime.toString()}</Text>
                        <Text style={styles.text}>{t('Vehicle')}:</Text>
                        <Text style={styles.text}>{selectedVehicle} : {registrationNumber}</Text>
                        <Text style={styles.text}>{t('Free seats')}:{markedSeats.length}</Text>
                        <Text style={styles.arrivalText}>{t('Arrival address')}:</Text>
                        <Text style={styles.arrivalText}>{arrivalCity} {arrivalStreet}-{arrivalNumber}</Text>
                    </View>
                    <Button title='Travel request' onPress={handlerRequestModal} />
                </View>
                <Button title="Close" onPress={handleCloseModal} />
            </Modal>
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
    departureText: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#34495e',
        borderBottomWidth: 1, // Border bottom for regular text
        borderBottomColor: '#EB1010', // Border color
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#34495e',
        borderBottomWidth: 1, // Border bottom for regular text
        borderBottomColor: '#4E4E4E', // Border color
    },
    arrivalText: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#34495e',
        borderBottomWidth: 1, // Border bottom for regular text
        borderBottomColor: '#083EF0', // Border color
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    departureContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    arrivalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    lineContent: {
        padding: 10
    }
});

export default ViewRoutes;