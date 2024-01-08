// ViewRoutes.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useRouteContext } from './RouteContext';

function ViewRoutes({ navigation }) {

    const { routes } = useRouteContext();
    console.log('dfsdf', routes);

    const handlerSeeView = (routeParams) => {
        navigation.navigate('Confirm', { ...routeParams, showConfirmButton: false, showChangesButton: false, showBackButton: true });
        console.log('Route view clicked !!!');
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/view-routes-backgroud.jpg')}
                style={styles.backgroundImage}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {routes.map((route, index) => (
                        <View key={index} style={styles.routeContainer}>
                            {/* Display route data here */}
                            <TouchableOpacity
                                onPress={() => handlerSeeView({
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
                                })}
                            >
                                <Text style={styles.routeText}>{route.departureCity}-{route.arrivalCity}</Text>
                            </TouchableOpacity>
                        </View>
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
    scrollView: {
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
});

export default ViewRoutes;
