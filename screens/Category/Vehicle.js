import React, { useState, useCallback } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Vehicle = () => {
    const { t } = useTranslation();
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const navigation = useNavigation();

    const vehicleTypes = [
        { label: t('Car'), value: t('Car') },
        { label: t('Motorcycle'), value: t('Motorcycle') },
        { label: t('A minibus'), value: t('A minibus') },
        { label: t('A bus'), value: t('A bus') },
    ];

    const handleVehicleSelect = (value) => {
        setSelectedVehicle(value);
    };

    const handleContinue = () => {
        if (selectedVehicle !== null) {
            // Navigate to the MarkSeats screen and pass the selected vehicle information
            navigation.navigate('Mark Seats', {
                selectedVehicle: selectedVehicle,  // Pass the selected value directly
                vehicleTypes: vehicleTypes,
            });
        } else {
            // Handle the case where no vehicle is selected
            Alert.alert(t('Error'), t('Please select a vehicle before continuing!'));
        }
    };

    const handlerBackHome = () => {
        navigation.navigate('Home')
        console.log('back to Home');
    }

    useFocusEffect(
        useCallback(() => {
            // Reset the selectedVehicle when the component gains focus
            setSelectedVehicle(null);
        }, [])
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'grey' }}>
            <Image
                source={require('../../images/car-background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.container}>
                <RNPickerSelect
                    items={vehicleTypes}
                    placeholder={{ label: t('Select vehicle'), value: null }}
                    placeholderTextColor="white"
                    onValueChange={(value) => handleVehicleSelect(value)}
                    value={selectedVehicle}
                    style={{
                        inputIOS: {
                            color: 'white', // Text color for selected item
                            fontSize: 20,   // Font size for selected item
                        },
                        inputAndroid: {
                            color: 'white', // Text color for selected item
                            fontSize: 20,   // Font size for selected item
                        },
                    }}
                    textInputProps={{ underlineColorAndroid: 'transparent' }}
                />
            </View>
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
            >
                <TouchableOpacity
                    onPress={handleContinue}
                    style={styles.buttons}
                >
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>{t('Continue')}</Text>
                </TouchableOpacity>
                <View
                    style={styles.betweenButtons}
                ></View>
                <TouchableOpacity
                    onPress={handlerBackHome}
                    style={styles.buttons}
                >
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>{t('Back')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Vehicle;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    typeVehicle: {
        color: '#F1F1F1',
    },
    container: {

    },
    buttons: {
        height: 60,
        backgroundColor: '#f4511e',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 200,
        borderWidth: 2,
        borderColor: '#f1f1f1'
    },
    betweenButtons: {
        padding: 10
    }
})

