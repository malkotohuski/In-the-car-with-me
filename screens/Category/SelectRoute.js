import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import CitySelector from '../../server/Cities/cities';

function SelectRouteScreen({ route, navigation }) {
    const { t } = useTranslation();
    const {
        selectedVehicle,
        markedSeats,
        registrationNumber,
    } = route.params;

    const cities = CitySelector();

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const [departureCity, setdepartureCity] = useState(null);
    const [departureStreet, setDepartureStreet] = useState('');
    const [departureNumber, setDepartureNumber] = useState('');

    const [arrivalCity, setarrivalCity] = useState(null);
    const [arrivalStreet, setArrivalStreet] = useState('');
    const [arrivalNumber, setArrivalNumber] = useState('');

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isFocuses, setIsFocuses] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    const handleContinue = () => {
        // Validate that a city is selected
        if (!departureCity) {
            Alert.alert(t('Error'), t('Please select a city!'));
            return
        }

        // Validate that departure street is entered
        if (!departureStreet.trim()) {
            Alert.alert(t('Error'), t('Please select a street!'));
            return;
        }

        // Validate that departure number is entered
        if (!departureNumber.trim()) {
            Alert.alert(t('Error'), t('Please enter a number!'));
            return;
        }

        if (!arrivalCity) {
            Alert.alert(t('Error'), t('Please select a city!'));
            return;
        }

        // Validate that arrival street is entered
        if (!arrivalStreet.trim()) {
            Alert.alert(t('Error'), t('Please select a street!'));
            return;
        }

        // Validate that arrival number is entered
        if (!arrivalNumber.trim()) {
            Alert.alert(t('Error'), t('Please enter a number!'));
            return;
        }

        // Validate that a valid date and time are selected
        if (!selectedDateTime || isNaN(selectedDateTime.getTime())) {
            Alert.alert(t('Error'), t('Please select a date and time!'));
            return;
        }

        // If all validations pass, proceed to the next screen
        console.log(
            // ... (previous log code)
        );

        // Navigate to the "Confirm" screen and pass the necessary parameters
        navigation.navigate('Confirm', {
            selectedVehicle,
            markedSeats,
            registrationNumber,
            selectedDateTime,
            departureCity,
            departureStreet,
            departureNumber,
            arrivalCity,
            arrivalStreet,
            arrivalNumber,
        });
    };




    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20 }}>
            {/* <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t('Selected Vehicle:', { selectedVehicle })}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t('Marked Seats:', { markedSeats })}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t('Registration Number:', { registrationNumber })}
            </Text> */}

            {/* Departure Information */}
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
                {t('Departure:', {})}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={cities}
                        search
                        maxHeight={165}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? t('Select City') : '...'}
                        searchPlaceholder={t("Search...")}
                        value={departureCity}  // Use departureCity for Departure dropdown
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setdepartureCity(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <Icon
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="departure-board"
                                size={20}
                            />
                        )}
                    />
                </View>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <TextInput
                        placeholder={t("Street")}
                        value={departureStreet}
                        onChangeText={(text) => setDepartureStreet(text)}
                        style={{
                            height: 70,
                            width: 140,
                            borderColor: 'gray',
                            borderWidth: 1.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            fontSize: 16
                        }}
                    />
                </View>
                <TextInput
                    placeholder={t("Number")}
                    value={departureNumber}
                    onChangeText={(text) => setDepartureNumber(text)}
                    keyboardType="numeric" // Restrict to numeric input
                    style={{
                        height: 70,
                        width: 80,
                        borderColor: 'gray',
                        borderWidth: 1.5,
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        fontSize: 16
                    }}
                />
            </View>
            {/*  <TextInput
                placeholder="Phone number"
                value={contactTelefon}
                onChangeText={(text) => setContactTelefon(text)}
                keyboardType="numeric" // Restrict to numeric input
                style={{
                    height: 60,
                    width: 180,
                    borderColor: 'gray',
                    borderWidth: 1.5,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    fontSize: 16
                }}
            /> */}
            <Icon
                style={styles.icon}
                color="black"
                name="route" // "route" icon from MaterialIcons
                size={100}
            />

            {/* Arrival Information */}
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
                {t('Arrival:')}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocuses && { borderColor: 'red' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={cities}
                        search
                        maxHeight={165}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocuses ? t('Select City') : '...'}
                        searchPlaceholder={t("Search...")}
                        value={arrivalCity}  // Use arrivalCity for Arrival dropdown
                        onFocus={() => setIsFocuses(true)}
                        onBlur={() => setIsFocuses(false)}
                        onChange={item => {
                            setarrivalCity(item.value);
                            setIsFocuses(false);
                        }}
                        renderLeftIcon={() => (
                            <Icon
                                style={styles.icon}
                                color={isFocuses ? 'red' : 'black'}
                                name="departure-board"
                                size={20}
                            />
                        )}
                    />
                </View>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <TextInput
                        placeholder={t("Street")}
                        value={arrivalStreet}
                        onChangeText={(text) => setArrivalStreet(text)}
                        style={{
                            height: 70,
                            width: 140,
                            borderColor: 'gray',
                            borderWidth: 1.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            fontSize: 16
                        }}
                    />
                </View>
                <TextInput
                    placeholder={t("Number")}
                    value={arrivalNumber}
                    onChangeText={(text) => setArrivalNumber(text)}
                    keyboardType="numeric" // Restrict to numeric input
                    style={{
                        height: 70,
                        width: 80,
                        borderColor: 'gray',
                        borderWidth: 1.5,
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        fontSize: 16
                    }}
                />
            </View>

            {/* Centered Date and Continue Button */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    style={styles.button}
                    title={t("Date and time of departure")}
                    onPress={() => setOpen(true)}
                    color="#f4511e"
                    titleStyle={{ marginHorizontal: 20, color: 'black' }}
                />
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(selectedDate) => {
                        setOpen(false);
                        setDate(selectedDate);
                        // Update the selectedDateTime state
                        setSelectedDateTime(selectedDate);
                    }}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
                {selectedDateTime && (
                    <View style={{ marginTop: 10, }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>
                            {t('Selected Date and Time:')} {selectedDateTime.toString()}
                        </Text>
                    </View>
                )}
                <TouchableOpacity
                    onPress={handleContinue}
                    style={{
                        marginTop: 20,
                        padding: 10,
                        backgroundColor: '#f4511e',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        width: '90%', // Adjust the width as needed
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 16 }}>{t('Continue')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default SelectRouteScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    dropdown: {
        height: 70,
        width: 140,
        borderColor: 'gray',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: '#f0f0f0',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    }
});