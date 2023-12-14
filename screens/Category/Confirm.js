import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';


function Confirm() {
    const { t } = useTranslation();

    const route = useRoute();
    const selectedVehicle = route.params.selectedVehicle;
    const markedSeats = route.params.markedSeats;
    const registrationNumber = route.params.registrationNumber;
    // Use the data as markedSeats

    return (
        // Your Confirm component JSX here
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 20 }}>
                {t('Vehicle')}:{selectedVehicle}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 20 }}>
                {t('Free seats')}: {markedSeats}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 20 }}>
                {t('Registration Number')}:{registrationNumber}
            </Text>
        </View>
    );
}

export default Confirm;
