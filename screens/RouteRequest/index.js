import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Authentication/AuthContext';
import { useRouteContext } from '../Category/RouteContext';

function RouteRequestScreen({ route, navigation }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { routes } = useRouteContext();
    const [routeRequests, setRouteRequests] = useState([]);
    console.log('ROUTES', routes);
    console.log('USER', user);

    const getRequestsForCurrentUser = () => {
        return routes.filter(route => route.userId === user?.user?.id && route.markedSeats && route.markedSeats.length > 0);
    };

    useEffect(() => {
        const requestsForCurrentUser = getRequestsForCurrentUser();
        setRouteRequests(requestsForCurrentUser);
    }, [routes]);

    const renderRoutes = () => {
        const renderedRoutes = [];

        routes.forEach((route) => {
            if (user?.user?.id === route.userId) {
                renderedRoutes.push(
                    <TouchableOpacity
                        key={route.id}
                        style={styles.requestContainer}
                        onPress={() => {
                            Alert.alert(`Избран маршрут: ${route.departureCity} to ${route.arrivalCity}`);
                        }}
                    >
                        <Text style={styles.text}>{`Direction: ${route.departureCity}-${route.arrivalCity}`}</Text>
                    </TouchableOpacity>
                );
            }
        });

        return renderedRoutes.length > 0 ? renderedRoutes : <Text>No new requests.</Text>;
    };
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/routes2-background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.container}>
                <Text style={styles.headerText}>{t('Route Requests')}:</Text>
                {routeRequests.length > 0 ? (
                    <View>
                        {renderRoutes()}
                    </View>
                ) : (
                    <Text>{t('Няма заявки за този маршрут.')}</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 10,
    },
    requestContainer: {
        margin: 10,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
        elevation: 3,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#1b1c1e',
        alignSelf: 'center'
    },
});

export default RouteRequestScreen;
