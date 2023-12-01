import i18next from 'i18next';
import React, { useState } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

function Vehicle() {
    const { t } = useTranslation();
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);


    const vehicleTypes = [
        { key: '1', value: 'Car' },
        { key: '2', value: 'Motorcycle' },
        { key: '3', value: 'A minibus' },
        { key: '4', value: 'A bus' },
    ];


    const translatedVehicleTypes = vehicleTypes.map((type) => ({
        ...type,
        value: t(type.value),
    }));


    const handleVehicleSelect = (value) => {
        setSelectedVehicle(value);
        setSelectedCategories([]); // Reset selected categories when a new vehicle is selected
    };

    const handleCategorySelect = (categories) => {
        setSelectedCategories(categories);
    };

    const handleContinue = () => {
        // Handle the continue action
        Alert.alert('Continue button clicked');
    };

    return (
        <View style={{ flex: 1 }}>
            <MultipleSelectList
                setSelected={(val) => handleVehicleSelect(val[0])}
                data={translatedVehicleTypes}
                save={t('value')}
                onSelect={() => Alert.alert(selectedVehicle)}
                label={t('Categories')}
                placeholder={t('Select vehicle')}
                searchable={false}
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
}

export default Vehicle;
