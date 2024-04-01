import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../Authentication/AuthContext';
import { useRoute } from '@react-navigation/native';
import { useRouteContext } from './RouteContext';

const RouteHistory = () => {
    const { user } = useAuth();
    const { routes } = useRouteContext();
    const { t } = useTranslation();

    const filteredRoutesState = routes.filter(route => route.userId === user?.user?.id);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../images/roadHistory2.png')}
                style={styles.backgroundImage}
            />
            <Text style={styles.title}>{t('Routes History')}</Text>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {filteredRoutesState.map((route, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.routeContainer}
                        >
                            <Text style={styles.routeText}>
                                {new Date(route.selectedDateTime).toLocaleString()} {/* Displaying date without time */}
                            </Text>
                            <Text style={styles.routeText}>
                                {route.departureCity}-{route.arrivalCity}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        width: '80%',
    },
    routeContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f4511e',
        borderRadius: 10,
    },
    routeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default RouteHistory;
