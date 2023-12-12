import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

function MarkSeatsScreen({ route }) {
    const { t } = useTranslation();
    const selectedVehicle = route?.params?.selectedVehicle;
    const [markedSeats, setMarkedSeats] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState('');



    const navigation = useNavigation();

    const isValidRegistrationNumber = () => {
        const regex = /^([A-ZA-ZА-ЯА-Я]{1,2})([3-6]{2})([0-9]{2})([A-ZA-ZА-ЯА-Я]{2})$/
        return regex.test(registrationNumber);
    };

    const handleSeatPress = (seatNumber) => {
        // Allow marking/unmarking only for seats other than seat 1
        if (seatNumber !== 1) {
            const updatedSeats = markedSeats.includes(seatNumber)
                ? markedSeats.filter((seat) => seat !== seatNumber)
                : [...markedSeats, seatNumber];

            setMarkedSeats(updatedSeats);
        }
    };

    const handleContinue = () => {
        // Validate the registration number
        if (!isValidRegistrationNumber()) {
            // Show an alert if the registration number is invalid
            Alert.alert(t('Invalid Registration Number'), t('Please enter a valid registration number.'));
            return;
        }

        // Navigate to the "SelectRoute" screen
        navigation.navigate(('SelectRoute'), {
            selectedVehicle,
            markedSeats,
            registrationNumber,
        });
    };


    // ... (existing code for renderSeats and renderTires)

    // Generate two rows of seats
    const renderSeats = () => {
        const seats = [];

        // First row: Seats 1 and 2
        seats.push(
            <View key={1} style={{ flexDirection: 'row' }}>
                {[1, 2].map((seatNumber) => (
                    <TouchableOpacity
                        key={seatNumber}
                        onPress={() => handleSeatPress(seatNumber)}
                        style={{
                            width: 30,
                            height: 30,
                            margin: 5,
                            backgroundColor: seatNumber === 1 ? 'red' : markedSeats.includes(seatNumber) ? 'green' : 'gray',
                            justifyContent: 'center',
                            alignItems: 'center',
                            opacity: seatNumber === 1 ? 1 : 1, // Make the first seat not clickable
                            top: 20
                        }}
                        disabled={seatNumber === 1} // Disable onPress for the first seat
                    >
                        <Text style={{ color: 'white' }}>{seatNumber}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );

        // Second row: Seats 3, 4, and 5
        seats.push(
            <View key={2} style={{ flexDirection: 'row' }}>
                {[3, 4, 5].map((seatNumber) => (
                    <TouchableOpacity
                        key={seatNumber}
                        onPress={() => handleSeatPress(seatNumber)}
                        style={{
                            width: 30,
                            height: 30,
                            margin: 5,
                            backgroundColor: markedSeats.includes(seatNumber) ? 'green' : 'gray',
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: 70
                        }}
                    >
                        <Text style={{ color: 'white' }}>{seatNumber}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );

        return seats;
    };

    // Generate multiple rows of tires on each side
    const renderTires = (numberOfRows, side) => {
        const tires = [];

        for (let row = 1; row <= numberOfRows; row++) {
            tires.push(
                <View
                    key={`tire-${side}-${row}`}
                    style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        left: side === 'left' ? -30 : undefined,
                        right: side === 'right' ? -30 : undefined,
                        top: -30 + (row * 90), // Adjust the spacing between rows
                    }}
                >
                    {[1, 2].map((tireNumber) => (
                        <View
                            key={tireNumber}
                            style={{
                                width: 15,
                                height: 50,
                                backgroundColor: 'black',
                                borderRadius: 5,
                                marginLeft: 1,
                            }}
                        />
                    ))}
                </View>
            );
        }

        return tires;
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{t(`Selected Vehicle: ${selectedVehicle?.value || ''}`)}</Text>
            {/* Add a TextInput for the registration number */}
            <TextInput
                placeholder={t('Enter Registration Number')}
                value={registrationNumber}
                onChangeText={(text) => setRegistrationNumber(text)}
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    margin: 10,
                    padding: 5,
                    textAlign: 'center',
                }}
            />
            {/* Display the registration number if available */}
            {registrationNumber && <Text>{`Registration Number: ${registrationNumber}`}</Text>}

            {/* Validate the registration number */}
            {!isValidRegistrationNumber() && <Text style={{ color: 'red' }}>
                {t('Invalid registration number format')}
            </Text>}

            {/* Add a new text for choosing free places */}
            <Text>{t('Choose how many free places you have:')}</Text>


            {/* Wrap renderSeats and renderTires in a View with styling for the car shape */}
            <View
                style={{
                    flexDirection: 'column', // Arrange the rows, seats, and tires vertically
                    alignItems: 'center', // Center the rows, seats, and tires horizontally
                    position: 'relative', // Make sure the absolute positioning works
                }}
            >
                <View
                    style={{
                        borderColor: 'black',
                        borderTopWidth: 8, // Wider top border
                        borderBottomWidth: 8, // Wider bottom border
                        borderLeftWidth: 4, // Default left border width
                        borderRightWidth: 4, // Default right border width
                        borderRadius: 10,
                        padding: 15, // Increased padding for height
                        marginVertical: 20, // Increased vertical margin for height
                        flexDirection: 'column', // Arrange the rows vertically
                        alignItems: 'center', // Center the rows horizontally
                        height: 230
                    }}
                >
                    {renderSeats()}
                </View>
                {/* Add tires on the sides */}
                {renderTires(2, 'left')}
                {renderTires(2, 'right')}
            </View>
            <TouchableOpacity
                onPress={handleContinue}
                style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: isValidRegistrationNumber() ? 'coral' : 'gray', // Change color based on registrationNumber validity
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                }}
                disabled={!isValidRegistrationNumber()} // Disable button if registrationNumber is invalid
            >
                <Text style={{ color: 'white' }}>{t('Continue')}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MarkSeatsScreen;
