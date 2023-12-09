import i18next from 'i18next';
import React, { useState, useCallback } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Vehicle = () => {
    const { t } = useTranslation();
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const navigation = useNavigation();

    const vehicleTypes = [
        { key: '1', value: t('Car') },
        { key: '2', value: t('Motorcycle') },
        { key: '3', value: t('A minibus') },
        { key: '4', value: t('A bus') },
    ];

    const handleVehicleSelect = (value) => {
        setSelectedVehicle(value);
    };

    const handleContinue = () => {
        if (selectedVehicle !== null) {
            // Navigate to the MarkSeats screen and pass the selected vehicle information
            navigation.navigate('Mark Seats', { selectedVehicle });
        } else {
            // Handle the case where no vehicle is selected
            Alert.alert(t('Error'), t('Please select a vehicle before continuing'));
        }
    };

    useFocusEffect(
        useCallback(() => {
            // Reset the selectedVehicle when the component gains focus
            setSelectedVehicle(null);
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <MultipleSelectList
                setSelected={(val) => handleVehicleSelect(val[0])}
                data={vehicleTypes}
                save={t('value')}
                onSelect={() => {
                    console.log('You tapped the button!');
                }}
                placeholder={t('Select vehicle')}
                searchable={false}
                selectedLabel={t('Selected')}
            />
            <View>
                <TouchableOpacity
                    onPress={handleContinue}
                    style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: 'coral',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 'bold',
                    }}
                >
                    <Text style={{ color: 'white' }}>{t('Continue')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Vehicle;
