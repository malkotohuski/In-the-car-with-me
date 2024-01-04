// ViewRoutes.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouteContext } from './RouteContext'; // Import your RouteContext



function ViewRoutes({ navigation }) {
    const { routes } = useRouteContext(); // Use the RouteContext

    const handlerSeeView = (routeParams) => {
        navigation.navigate('Confirm', { ...routeParams, showConfirmButton: false, showChangesButton: false, showBackButton: true });
        console.log('Route view clicked !!!');
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../images/view-routes-backgroud.jpg')}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    position: 'absolute',
                }}
            />
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
                        <Text
                            style={styles.routeText}
                        >{route.departureCity}-{route.arrivalCity}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'grey',
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
});

export default ViewRoutes;
