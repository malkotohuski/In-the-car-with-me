import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Authentication/AuthContext';
import { useRouteContext } from '../Category/RouteContext';

function RouteRequestScreen({ route, navigation }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { routes, requests } = useRouteContext();
    const [routeRequests, setRouteRequests] = useState([]);
    console.log("reqest", requests);

    const getRequestsForCurrentUser = () => {
        return requests.filter(request => request.requestingUser?.userRouteId === user?.user?.id);
    };


    useEffect(() => {
        const requestsForCurrentUser = getRequestsForCurrentUser();
        setRouteRequests(requestsForCurrentUser);
    }, [requests]);


    const renderRoutes = () => {
        const requestsForCurrentUser = getRequestsForCurrentUser();

        const renderedRoutes = requestsForCurrentUser.map((request) => (
            <TouchableOpacity
                key={request.id}
                style={[
                    styles.requestContainer,
                    request.requestingUser ? styles.greenBorder : null
                ]}
                onPress={() => {
                    Alert.alert(
                        t('Selected route'),
                        ` ${request.requestingUser.departureCity}-${request.requestingUser.arrivalCity}`
                    );
                }}
            >
                <Text style={styles.text}>{t('Direction')}: {t(`${request.requestingUser.departureCity}-${request.requestingUser.arrivalCity}`)}</Text>
            </TouchableOpacity>
        ));

        return renderedRoutes.length > 0 ? renderedRoutes : <Text>{t('No new requests.')}</Text>;
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
                        <Text>{t('There are no requests for this route.')}</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        position: 'relative',
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
        zIndex: -1,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10,
        color: '#1b1c1e',
        alignSelf: 'center'
    },
    greenBorder: {
        borderColor: 'green',
        borderWidth: 2,
    },
});

export default RouteRequestScreen;
