import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import DatePicker from 'react-native-date-picker'

function SelectRouteScreen({ route, navigation }) {
    /*     const { selectedVehicle, markedSeats, registrationNumber, freePlaces } = route.params;
        const [departureDate, setDepartureDate] = useState(''); */
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const handleContinue = () => {
        // Handle the continue action with the selected route data
        console.log(`Selected Vehicle: ${selectedVehicle}, Marked Seats: ${markedSeats}, Registration Number: ${registrationNumber}, Free Places: ${freePlaces}, Departure Date: ${departureDate}`);
        // You can navigate back or perform other actions as needed
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/*  <Text>{`Selected Vehicle: ${selectedVehicle}`}</Text>
            <Text>{`Marked Seats: ${markedSeats}`}</Text>
            <Text>{`Registration Number: ${registrationNumber}`}</Text>
            <Text>{`Free Places: ${freePlaces}`}</Text> */}

            <Button title="Open" onPress={() => setOpen(true)} />
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            <TouchableOpacity
                onPress={handleContinue}
                style={{
                    marginTop: 20,
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

export default SelectRouteScreen;
