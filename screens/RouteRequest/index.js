import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Authentication/AuthContext';
import { useRouteContext } from '../Category/RouteContext';

function RouteRequestScreen({ route, navigation }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { routes } = useRouteContext();
    const [routeRequests, setRouteRequests] = useState([]);

    const readRouteRequestsFromStorage = async () => {
        try {
            const storedRequests = await AsyncStorage.getItem('routeRequests');
            if (storedRequests) {
                setRouteRequests(JSON.parse(storedRequests));
            }
        } catch (error) {
            console.error('Error reading data from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        readRouteRequestsFromStorage();

        const routeId = routes && routes.length > 0 ? routes[0].id : null;
        const requestsForRoute = routeId ? getRequestsForRoute(routeId) : [];
        setRouteRequests(requestsForRoute);
    }, [routes]);

    useEffect(() => {
        // Read from AsyncStorage every time the component re-renders
        readRouteRequestsFromStorage();
    }, []);


    const getRequestsForRoute = (routeId) => {
        return routes.filter(route => route.id === routeId && route.requests);
    };

    const renderItem = ({ item }) => {
        const isRouteCreator = user.user.id === item.user_id;

        return (
            <TouchableOpacity
                style={styles.requestContainer}
                onPress={() => navigation.navigate('RouteRequestDetails', { requestingUser: item.requestingUser })}
            >
                <Text>{item.requestingUser.username}</Text>
                {isRouteCreator && (
                    <View>
                        <Text style={styles.text}>{t('Nick name')}: {item.requestingUser.username}</Text>
                        <Text style={styles.text}>{t('Names')}: {item.requestingUser.userFname}</Text>
                    </View>
                )}
                <Text>{item.requestingUser.userEmail}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{t('Route Requests')}:</Text>
            {route.params && route.params.requestingUser ? (
                <View>
                    <Text>{t('Nick name')}: {route.params.requestingUser.username}</Text>
                    <Text>{t('Names')}: {route.params.requestingUser.userFname}</Text>
                </View>
            ) : null}
            {routeRequests.length > 0 ? (
                <FlatList
                    data={routeRequests}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            ) : (
                <Text>{t('No requests for this route.')}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#1b1c1e',
        borderBottomWidth: 1,
        borderBottomColor: '#1b1c1e',
    },
});

export default RouteRequestScreen;
