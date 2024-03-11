import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet, Alert, Image, FlatList, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
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

    const [modalVisibleDeparture, setModalVisibleDeparture] = useState(false);
    const [modalVisibleArrival, setModalVisibleArrival] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showAllCities, setShowAllCities] = useState(false);
    const [filteredCities, setFilteredCities] = useState(cities.slice(0, 7));

    const continueButtonStyle = {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f4511e',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        width: 150, // Adjust the width as needed
        height: 60,
        borderWidth: 2,
        borderColor: '#f1f1f1',
        borderRadius: 8,
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

    const renderCityItem = ({ item, setModalVisible }) => (
        item && (
            <TouchableOpacity
                style={styles.cityItem}
                onPress={() => {
                    setdepartureCity(item.label);
                    setModalVisible(false);
                    setSearchText('');
                }}
            >
                <Text style={styles.cityItemText}>{item.label}</Text>
            </TouchableOpacity>
        )
    );


    const renderArrivalCityItem = ({ item, setModalVisible: setModalVisibleArrival }) => (
        item && (
            <TouchableOpacity
                style={styles.cityItem}
                onPress={() => {
                    setarrivalCity(item.label);
                    setModalVisibleArrival(false);
                    setSearchText('');
                }}
            >
                <Text style={styles.cityItemText}>{item.label}</Text>
            </TouchableOpacity>
        )
    );


    const filterCities = (text) => {
        // Филтриране на градовете спрямо въведения текст
        const filteredCities = cities.filter(city => city.label.toLowerCase().includes(text.toLowerCase()));
        setFilteredCities(filteredCities.slice(0, 7)); // Ограничаваме резултатите до първите 7 града
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Image
                source={require('../../images/routes2-background.jpg')}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    position: 'absolute',
                }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, color: 'black' }}>
                {t('Departure:', {})}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25, }}>
                <View style={{ flex: 1, marginRight: 10, color: 'black' }}>
                    <TouchableOpacity
                        style={styles.citySelectButton}
                        onPress={() => setModalVisibleDeparture(true)}
                    >
                        <Text style={styles.citySelectButtonText}>
                            {departureCity ? departureCity : t('Select City')}
                        </Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisibleDeparture}
                        onRequestClose={() => {
                            setModalVisibleDeparture(false);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <TextInput
                                placeholder="Search City"
                                placeholderTextColor={'#010101'}
                                value={searchText}
                                onChangeText={(text) => {
                                    setSearchText(text);
                                    filterCities(text);
                                }}
                                style={{
                                    height: 40,
                                    borderColor: 'black',
                                    borderWidth: 1.5,
                                    borderRadius: 8,
                                    paddingHorizontal: 8,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}
                            />
                            <FlatList
                                data={filteredCities}
                                renderItem={({ item }) => renderCityItem({ item, setModalVisible: setModalVisibleDeparture })}
                                keyExtractor={(item) => item.value}
                            />
                            {/*  {searchText.length >= 2 && (
                                <Button
                                    title={showAllCities ? 'Show Top 7' : 'Show All Cities'}
                                    onPress={() => setShowAllCities(!showAllCities)}
                                    color="#f4511e"
                                />
                            )} */}
                        </View>
                    </Modal>
                </View>
                <View style={{ flex: 1, marginLeft: 40 }}>
                    <TextInput
                        placeholder={t("Street")}
                        placeholderTextColor={'#010101'}
                        value={departureStreet}
                        onChangeText={(text) => setDepartureStreet(text)}
                        style={{
                            height: 70,
                            width: 130,
                            borderColor: 'black',
                            borderWidth: 1.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}
                    />
                </View>
                <TextInput
                    placeholder={t("Number")}
                    placeholderTextColor={'#010101'}
                    value={departureNumber}
                    onChangeText={(text) => setDepartureNumber(text)}
                    keyboardType="numeric" // Restrict to numeric input
                    style={{
                        height: 70,
                        width: 50,
                        borderColor: 'black',
                        borderWidth: 1.5,
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                />
            </View>
            {/*  <Icons
                style={styles.icon}
                color="black"
                name="routes-clock" // "route" icon from MaterialIcons
                size={100}
            /> */}
            <View style={{ padding: 20 }}></View>
            {/* Arrival Information */}
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20, color: 'black' }}>
                {t('Arrival:')}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <TouchableOpacity
                        style={styles.citySelectButton}
                        onPress={() => setModalVisibleArrival(true)}
                    >
                        <Text style={styles.citySelectButtonText}>
                            {arrivalCity ? arrivalCity : t('Select City')}
                        </Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisibleArrival}
                        onRequestClose={() => {
                            setModalVisibleArrival(false);
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <TextInput
                                placeholder="Search City"
                                placeholderTextColor={'#010101'}
                                value={searchText}
                                onChangeText={(text) => {
                                    setSearchText(text);
                                    filterCities(text);
                                }}
                                style={{
                                    height: 40,
                                    borderColor: 'black',
                                    borderWidth: 1.5,
                                    borderRadius: 8,
                                    paddingHorizontal: 8,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}
                            />
                            <FlatList
                                data={filteredCities}
                                renderItem={({ item }) => renderArrivalCityItem({ item, setModalVisible: setModalVisibleArrival })}
                                keyExtractor={(item) => item.value}
                            />
                            {/*  {searchText.length >= 2 && (
                                <Button
                                    title={showAllCities ? 'Show Top 7' : 'Show All Cities'}
                                    onPress={() => setShowAllCities(!showAllCities)}
                                    color="#f4511e"
                                />
                            )} */}
                        </View>
                    </Modal>
                </View>
                <View style={{ flex: 1, marginLeft: 40 }}>
                    <TextInput
                        placeholder={t("Street")}
                        placeholderTextColor={'#010101'}
                        value={arrivalStreet}
                        onChangeText={(text) => setArrivalStreet(text)}
                        style={{
                            height: 70,
                            width: 130,
                            borderColor: 'black',
                            borderWidth: 1.5,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'black'
                        }}
                    />
                </View>
                <TextInput
                    placeholder={t("Number")}
                    placeholderTextColor={'#010101'}
                    value={arrivalNumber}
                    onChangeText={(text) => setArrivalNumber(text)}
                    keyboardType="numeric" // Restrict to numeric input
                    style={{
                        height: 70,
                        width: 50,
                        borderColor: 'black',
                        borderWidth: 1.5,
                        borderRadius: 8,
                        paddingHorizontal: 8,
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                />
            </View>

            {/* Centered Date and Continue Button */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    style={[styles.button, { marginTop: 10 }]}
                    title={t("Select date and time of departure")}
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
                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                            {t('Selected Date and Time:')} {selectedDateTime.toString()}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    onPress={handleContinue}
                    style={continueButtonStyle} // Използвай новата променлива за стиловете
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{t('Continue')}</Text>
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
        width: 180,
        borderColor: 'black',
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
        fontSize: 14,
        fontWeight: 900,
        color: 'black',
    },
    selectedTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
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
        borderRadius: 8,
        elevation: 3,
        backgroundColor: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#f1f1f1'
    },
    modalContainer: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        marginTop: 100,
    },

    citySelectButton: {
        height: 70,
        width: 180,
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        justifyContent: 'center',
    },

    citySelectButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },

    cityItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },

    cityItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});