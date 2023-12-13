import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';


function Confirm({ route }) {
    const {
        selectedVehicle,
        markedSeats,
        registrationNumber,
    } = route.params;
    const { t } = useTranslation();

    // Use the data as needed

    return (
        // Your Confirm component JSX here
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t('Selected Vehicle:', { selectedVehicle })}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t('Marked Seats:', { markedSeats })}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t('Registration Number:', { registrationNumber })}
            </Text>
        </View>
    );
}

export default Confirm;
