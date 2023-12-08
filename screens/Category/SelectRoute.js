import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

function SelectRouteScreen({ route, navigation }) {
    const {
        selectedVehicle,
        markedSeats,
        registrationNumber,
    } = route.params;

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);


    const [departureStreet, setDepartureStreet] = useState('');
    const [departureNumber, setDepartureNumber] = useState('');
    const [contactTelefon, setContactTelefon] = useState('')
    const [selectedCity, setSelectedCity] = useState(null);

    const [arrivalStreet, setArrivalStreet] = useState('');
    const [arrivalNumber, setArrivalNumber] = useState('');

    const handleContinue = () => {
        // Handle the continue action with the selected route data
        console.log(
            `Selected Vehicle: ${selectedVehicle}, Marked Seats: ${markedSeats}, Registration Number: ${registrationNumber}, Departure Date: ${date}, Departure: ${departureCountry}, ${departureCities.join(', ')}, ${departureStreet}, ${departureNumber}, Arrival: ${arrivalCountry}, ${arrivalCities.join(', ')}, ${arrivalStreet}, ${arrivalNumber}`
        );
        // You can navigate back or perform other actions as needed
    };

    const cities = [
        { label: 'Sofia', value: 'Sofia' },
        { label: 'Plovdiv', value: 'Plovdiv' },
        { label: 'Varna', value: 'Varna' },
        { label: 'Burgas', value: 'Burgas' },
        // Add more cities as needed
    ];

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {`Selected Vehicle: ${selectedVehicle}`}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {`Marked Seats: ${markedSeats}`}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {`Registration Number: ${registrationNumber}`}
            </Text>

            {/* Departure Information */}
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
                Departure:
            </Text>
            <MultipleSelectList
                setSelected={(val) => setSelectedCity(val[0])}
                data={cities}
                save='value'
                onSelect={() => {
                    console.log('You tapped the button!');
                }}
                placeholder='Select City'
                searchable={false}
                selectedLabel='Selected'
                selectedItems={selectedCity}
            />
            <TextInput
                placeholder="Street"
                value={departureStreet}
                onChangeText={(text) => setDepartureStreet(text)}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Number"
                value={departureNumber}
                onChangeText={(text) => setDepartureNumber(text)}
                keyboardType="numeric" // Restrict to numeric input
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
            />
            <TextInput
                placeholder="Phone number"
                value={contactTelefon}
                onChangeText={(text) => setContactTelefon(text)}
                keyboardType="numeric"  // Restrict to numeric input
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
            />

            {/* Arrival Information */}
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
                Arrival:
            </Text>
            <MultipleSelectList
                setSelected={(val) => setSelectedCity(val[0])}
                data={cities}
                save='value'
                onSelect={() => {
                    console.log('You tapped the button!');
                }}
                placeholder='Select City'
                searchable={false}
                selectedLabel='Selected'
                selectedItems={selectedCity}
            />
            <TextInput
                placeholder="Street"
                value={arrivalStreet}
                onChangeText={(text) => setArrivalStreet(text)}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Number"
                value={arrivalNumber}
                onChangeText={(text) => setArrivalNumber(text)}
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
            />

            <Button
                title="Date and time of departure"
                onPress={() => setOpen(true)}
            />
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                }}
                onCancel={() => {
                    setOpen(false);
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
