// ViewRoutes.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouteContext } from './RouteContext'; // Import your RouteContext

function ViewRoutes() {
    const { routes } = useRouteContext(); // Use the RouteContext

    return (
        <View style={styles.container}>
            {routes.map((route, index) => (
                <View key={index} style={styles.routeContainer}>
                    {/* Display route data here */}
                    <Text>{route.departureCity}-{route.arrivalCity}</Text>
                    {/* Add more Text components to display other route data */}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ecf0f1',
    },
    routeContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
});

export default ViewRoutes;
