import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';


function SelectRouteScreen({ route, navigation }) {
    const { t } = useTranslation();
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
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isFocuses, setIsFocuses] = useState(false);

    const [arrivalStreet, setArrivalStreet] = useState('');
    const [arrivalNumber, setArrivalNumber] = useState('');

    const data = [
        { label: t('Sofia'), value: t('Sofia') },
        { label: t('Plovdiv'), value: t('Plovdiv') },
        { label: t('Varna'), value: t('Varna') },
        { label: t('Burgas'), value: t('Burgas') },
        // Add more cities as needed
    ];


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
        // Handle the continue action with the selected route data
        console.log(
            t(`Selected Vehicle: ${selectedVehicle},
             Marked Seats: ${markedSeats},
              Registration Number: ${registrationNumber},
               Departure Date: ${date},
                Departure: ${departureCountry},
                 ${departureCities.join(', ')},
                  ${departureStreet}, ${departureNumber},
                   Arrival: ${arrivalCountry},
                    ${arrivalCities.join(', ')},
                     ${arrivalStreet},
                      ${arrivalNumber}`)
        );
        // You can navigate back or perform other actions as needed
    };



    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t(`Selected Vehicle: ${selectedVehicle}`)}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t(`Marked Seats: ${markedSeats}`)}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {t(`Registration Number: ${registrationNumber}`)}
            </Text>

            {/* Departure Information */}
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
                {t('Departure:')}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? t('Select City') : '...'}
                        searchPlaceholder={t("Search...")}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
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
                            height: 60,
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
                        height: 60,
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
                Arrival:
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocuses && { borderColor: 'red' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocuses ? t('Select City') : '...'}
                        searchPlaceholder={t("Search...")}
                        value={value}
                        onFocus={() => setIsFocuses(true)}
                        onBlur={() => setIsFocuses(false)}
                        onChange={item => {
                            setValue(item.value);
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
                            height: 60,
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
                        height: 60,
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
                        backgroundColor: '#f4511e',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 'bold',
                        width: '80%', // Adjust the width as needed
                    }}
                >
                    <Text style={{ color: '#333' }}>{t('Continue')}</Text>
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
        height: 60,
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
});
