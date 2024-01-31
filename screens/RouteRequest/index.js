import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Authentication/AuthContext';
import { useRouteContext } from '../Category/RouteContext';

function RouteRequestScreen({ navigation }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { routes } = useRouteContext();
    const [routeRequests, setRouteRequests] = useState([]);

    useEffect(() => {
        // Заменете 'routeId' с уникален идентификатор на маршрута, за който искате да получите заявките
        const requestsForRoute = getRequestsForRoute('id');
        setRouteRequests(requestsForRoute);
    }, []);

    const getRequestsForRoute = (routeId) => {
        // Предполагаме, че имате функция в контекста, която връща заявките за даден маршрут
        // Променете този код според структурата на вашите данни
        return routes.filter(route => route.id === routeId && route.requests);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.requestContainer}
            onPress={() => navigation.navigate('RouteRequestDetails', { requestingUser: item.requestingUser })}
        >
            <Text>{item.requestingUser.username}</Text>
            <Text>{item.requestingUser.userFname} {item.requestingUser.userLname}</Text>
            <Text>{item.requestingUser.userEmail}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{t('Route Requests')}:</Text>
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
});

export default RouteRequestScreen;
