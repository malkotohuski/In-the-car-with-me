// MarkSeatsScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

function MarkSeatsScreen({ route, navigation }) {
    const { selectedVehicle } = route.params;
    const [freeSeats, setFreeSeats] = useState('');

    const handleContinue = () => {
        // Handle the continue action with the selected vehicle and number of free seats
        console.log(`Selected Vehicle: ${selectedVehicle}, Free Seats: ${freeSeats}`);
        // You can navigate back or perform other actions as needed
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{`Selected Vehicle: ${selectedVehicle}`}</Text>
            <Text>Enter the number of free seats:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                keyboardType="numeric"
                value={freeSeats}
                onChangeText={(text) => setFreeSeats(text)}
            />
            <TouchableOpacity
                onPress={handleContinue}
                style={{
                    padding: 10,
                    backgroundColor: 'coral',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                }}
            >
                <Text style={{ color: 'white' }}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MarkSeatsScreen;
