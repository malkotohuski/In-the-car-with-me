import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CitySelector from '../../server/Cities/cities';

const RouteRequestScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const [fromLocation, setFromLocation] = useState(null);
    const [toLocation, setToLocation] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const cities = CitySelector();
    console.log(cities);

    const submitRouteRequest = () => {
        if (!fromLocation || !toLocation) {
            Alert.alert(t('Error'), t('Please select a city!'));
            return
        }
        console.log('From:', fromLocation);
        console.log('To:', toLocation);

        // Navigate to another screen or perform any other navigation action
        // For example, navigate to a confirmation screen
        navigation.navigate('Home', {
            fromLocation,
            toLocation,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, marginLeft: 30, fontSize: 30, fontWeight: 'bold' }}>{t('Enter a route')}</Text>
            <View style={{ flex: 1, marginRight: 10 }}>
                <Text >{t('')}</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={cities}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? t('Select City') : '...'}
                    searchPlaceholder={t("Search...")}
                    value={fromLocation}  // Use departureCity for Departure dropdown
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setFromLocation(item.value);
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
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={cities}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? t('Select City') : '...'}
                    searchPlaceholder={t("Search...")}
                    value={toLocation}  // Use departureCity for Departure dropdown
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setToLocation(item.value);
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
            <TouchableOpacity title="Submit Route Request"
                onPress={submitRouteRequest}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
});

export default RouteRequestScreen;
