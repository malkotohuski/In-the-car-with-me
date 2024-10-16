import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

function MarkSeatsScreen() {
    const { t } = useTranslation();

    const [markedSeats, setMarkedSeats] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [selectedFreePlaces, setSelectedFreePlaces] = useState(0);
    const [showInvalidRegistrationAlert, setShowInvalidRegistrationAlert] = useState(false);

    const route = useRoute();
    /*     console.log('Route Params:', route.params); // Log the entire route parameters */

    const selectedVehicle = route.params.selectedVehicle;
    /*  console.log('Selected Vehicle:', selectedVehicle); // Log the selected vehicle */

    const navigation = useNavigation();

    const isValidRegistrationNumber = () => {
        const regex = /^([A-ZA-ZА-ЯА-Я]{1,2})([0-9]{4})([A-ZA-ZА-ЯА-Я]{2})$/
        return regex.test(registrationNumber);
    };

    const handleSeatPress = (seatNumber) => {
        // Allow marking/unmarking only for seats other than seat 1
        if (seatNumber !== 1) {
            const updatedSeats = markedSeats.includes(seatNumber)
                ? markedSeats.filter((seat) => seat !== seatNumber)
                : [...markedSeats, seatNumber];

            setMarkedSeats(updatedSeats);

            // Update the selected free places count as the total number of marked seats
            setSelectedFreePlaces(updatedSeats.join('').length);
        }
    };

    const handleContinue = () => {
        // Validate the registration number and the selected free places count
        if (!isValidRegistrationNumber()) {
            // Show an alert if the registration number is invalid
            Alert.alert(t('Invalid Registration Number'), t('Please enter a valid registration number.'));
            return;
        } else {
            // Reset the state when the registration number is valid
            setShowInvalidRegistrationAlert(false);
        }

        /*    if (selectedFreePlaces === 0) {
               // Show an alert if no free places are selected
               Alert.alert(t('No place selected!'), t('Please choose how many seats you have available!'));
               return;
           } */

        // Navigate to the "SelectRoute" screen and pass the necessary parameters
        navigation.navigate('SelectRoute', {
            selectedVehicle,
            markedSeats,
            registrationNumber,
            selectedFreePlaces,
        });
    };

    const handlerBackToVehicle = () => {
        navigation.navigate('Vehicle')
    }

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
                            backgroundColor: seatNumber === 1 ? 'red' : markedSeats.includes(seatNumber) ? 'green' : 'black',
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
                            backgroundColor: markedSeats.includes(seatNumber) ? 'green' : 'black',
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: 70
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{seatNumber}</Text>
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Image
                source={require('../../images/register-number-background.jpg')}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    position: 'absolute',
                }}
            />
            <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: '#F1F1F1', }}
            >
                {t('Type')}: {selectedVehicle}
            </Text>

            {/*  <Text>
                Available Vehicle Types: {JSON.stringify(vehicleTypes)}
            </Text> */}

            {/*  <Text>{t('Selected Vehicle:')}</Text> */}
            {/* Add a TextInput for the registration number */}
            <TextInput
                placeholder={t('Enter Registration Number')}
                placeholderTextColor={'#F1F1F1'}
                value={registrationNumber}
                onChangeText={(text) => setRegistrationNumber(text)}
                style={{
                    height: 50, // Увеличена височина за по-добра видимост
                    borderColor: '#F1F1F1',
                    borderWidth: 2,
                    margin: 10, // Допълнителен марджин за повече пространство
                    textAlign: 'center',
                    color: '#FFFFFFFF', // Ярък цвят за текста
                    fontSize: 18, // По-голям шрифт
                    fontWeight: 'bold', // По-дебел шрифт
                    backgroundColor: '#000000', // Контрастен черен фон
                    borderRadius: 8, // Закръглени ъгли
                    width: '80%', // Ширината на полето за въвеждане
                }}
                autoFocus={true} // Автоматичен фокус при зареждане на екрана
            />
            {/* Display the registration number if available */}
            {registrationNumber &&
                <Text
                    style={{ color: '#F1F1F1', fontSize: 20, fontWeight: 'bold', }}
                >{t('Registration Number:')}</Text>}
            <Text
                style={{ color: '#F1F1F1', fontSize: 20, fontWeight: 'bold' }}
            >{`${registrationNumber}`}</Text>


            {/* Validate the registration number */}
            {showInvalidRegistrationAlert && (
                <Text style={{ color: '#FF4500', fontSize: 20, fontWeight: 'bold' }}>
                    {t('Invalid registration number format')}
                </Text>
            )}
            {/* Add a new text for choosing free places */}
            <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: '#F1F1F1' }}
            >{t('Choose how many free places you have:')}</Text>
            <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: '#F1F1F1' }}
            >{`${selectedFreePlaces}`}</Text>
            {/* Wrap renderSeats and renderTires in a View with styling for the car shape */}
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    transform: [{ scale: 0.8 }],
                }}
            >
                <View
                    style={{
                        borderColor: 'black',
                        borderTopWidth: 6, // Намалени размери на борда
                        borderBottomWidth: 6,
                        borderLeftWidth: 3,
                        borderRightWidth: 3,
                        borderRadius: 10,
                        padding: 10, // Намален padding
                        marginVertical: 5, // Намален марджин
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: 200, // Намалена височина
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
                    marginTop: 10,
                    backgroundColor: isValidRegistrationNumber() ? '#f4511e' : 'black', // Change color based on registrationNumber validity
                    height: 50,
                    backgroundColor: '#f4511e',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    width: 180,
                    borderWidth: 2,
                    borderColor: '#f1f1f1'
                }}

            >
                <Text
                    style={{
                        color: 'white',
                        backgroundColor: '#f4511e',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>
                    {t('Continue')}</Text>
            </TouchableOpacity>
            <View
                style={{
                    padding: 5
                }}
            >
            </View>
            <TouchableOpacity
                onPress={handlerBackToVehicle}
                style={{
                    marginTop: 0,
                    backgroundColor: isValidRegistrationNumber() ? '#f4511e' : 'black', // Change color based on registrationNumber validity
                    height: 60,
                    backgroundColor: '#f4511e',
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    width: 200,
                    borderWidth: 2,
                    borderColor: '#f1f1f1'
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        backgroundColor: '#f4511e',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>
                    {t('Back to Vehicle')}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MarkSeatsScreen;
