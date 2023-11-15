import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

function MotorOil() {
    const [selected, setSelected] = useState([]);
    const [selectedViscosity, setSelectedViscosity] = useState([]);

    const types = [
        { key: '1', value: 'Conventional Motor Oil' },
        { key: '2', value: 'Synthetic Motor Oil' },
        { key: '3', value: 'High Mileage Oil' },
        { key: '4', value: 'Blend Motor Oil' },
        { key: '5', value: 'Viscosity-Grade Motor Oil' },
        { key: '6', value: 'Diesel Motor Oil' },
        { key: '7', value: 'Racing Oil' },
    ]

    const ViscosityClass = [
        { key: '1', value: '0W-20' },
        { key: '2', value: '5W-20' },
        { key: '3', value: '5W-30' },
        { key: '4', value: '10W-30' },
        { key: '5', value: '10W-40' },
        { key: '6', value: '15W-40' },
        { key: '7', value: '20W-50' },
        { key: '8', value: '5W-40' },
        { key: '9', value: '0W-40' },
        { key: '10', value: '10W-60' },
    ]

    return (
        <View>
            <MultipleSelectList
                setSelected={(val) => setSelected(val)}
                data={types}
                save="value"
                onSelect={() => Alert(selected)}
                label='Categories'
            />


            <MultipleSelectList
                setSelected={(val) => setSelectedViscosity(val)}
                data={ViscosityClass}
                save="value"
                onSelect={() => Alert.alert('Selected Viscosity Class', JSON.stringify(selectedViscosity))}
                label='Viscosity Class'
            />
        </View>
    )
};

export default MotorOil;

