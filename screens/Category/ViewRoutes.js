// ViewRoutes.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    TextInput
} from 'react-native';
import { useRouteContext } from './RouteContext';

function ViewRoutes({ navigation }) {
    const [enteredDepartureCity, setEnteredDepartureCity] = useState('');
    const [enteredArrivalCity, setEnteredArrivalCity] = useState('');
    const { routes } = useRouteContext();
    console.log('dfsdf', routes);



    const handlerSeeView = (routeParams) => {
        navigation.navigate('Confirm', {
            ...routeParams,
            showConfirmButton: false,
            showChangesButton: false,
            showBackButton: true
        });
        console.log('Route view clicked !!!');
    }

    const filteredRoutes = routes.filter(
        (route) =>
            route.departureCity.toLowerCase().includes(enteredDepartureCity.toLowerCase()) &&
            route.arrivalCity.toLowerCase().includes(enteredArrivalCity.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/view-routes-backgroud.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Departure City"
                    value={enteredDepartureCity}
                    onChangeText={(text) => setEnteredDepartureCity(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Arrival City"
                    value={enteredArrivalCity}
                    onChangeText={(text) => setEnteredArrivalCity(text)}
                />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {filteredRoutes.map((route, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.routeContainer}
                            onPress={() =>
                                handlerSeeView({
                                    selectedVehicle: route.selectedVehicle,
                                    markedSeats: route.markedSeats,
                                    registrationNumber: route.registrationNumber,
                                    selectedDateTime: route.selectedDateTime,
                                    departureCity: route.departureCity,
                                    departureStreet: route.departureStreet,
                                    departureNumber: route.departureNumber,
                                    arrivalCity: route.arrivalCity,
                                    arrivalStreet: route.arrivalStreet,
                                    arrivalNumber: route.arrivalNumber,
                                })
                            }
                        >
                            <Text style={styles.routeText}>
                                {route.departureCity}-{route.arrivalCity}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    routeContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: 'coral',
        borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        backgroundColor: '#fff',
    },
    routeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    section: {
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
    },
    routeContainer: {
        margin: 10,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Use a semi-transparent background
        borderRadius: 15,
        elevation: 3, // Add elevation for a subtle shadow effect on Android
    },
    routeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1b1c1e',
    },
});

export default ViewRoutes;
