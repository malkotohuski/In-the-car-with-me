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
            <RNPickerSelect
                style={styles.typeVehicle}
                items={vehicleTypes}
                placeholder={{ label: t('Select vehicle'), value: null }}
                onValueChange={(value) => handleVehicleSelect(value)}
                value={selectedVehicle}
            />
            <View>
                <TouchableOpacity
                    onPress={handleContinue}
                    style={{
                        marginTop: 100,
                        padding: 10,
                        backgroundColor: 'coral',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>{t('Continue')}</Text>
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
        color: '#F1F1F1'
    }
})