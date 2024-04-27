import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../Authentication/AuthContext';
import { useRoute } from '@react-navigation/native';
import { useRouteContext } from './RouteContext';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000';

const RouteHistory = ({ navigation }) => {
    const { user } = useAuth();
    const { routes, removeRoute, deletedRoute, markRouteAsCompleted, requests } = useRouteContext();
    const { t } = useTranslation();
    const [filteredRoutesState, setFilteredRoutesState] = useState(routes.filter(route => route.userId === user?.user?.id));
    const [completedRoutes, setCompletedRoutes] = useState([]);


    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/routes`);
                if (response.status === 200) {
                    const filteredRoutes = response.data.filter(route => {
                        return route.userId === user?.user?.id &&
                            !route.isDeleted &&
                            route.userRouteId !== "deleted" &&
                            route.userRouteId !== "completed";
                    });
                    setFilteredRoutesState(filteredRoutes);
                } else {
                    throw new Error('Failed to fetch routes');
                }
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        };

        fetchRoutes();
    }, [user, routes]);

    const handleDeleteRoute = (routeId) => {
        Alert.alert(
            t('Delete Route'),
            t('Are you sure you want to delete this route?'),
            [
                {
                    text: t('Cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: t('Delete'), onPress: () => {
                        fetch(`http://10.0.2.2:3000/routes/${routeId}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ userRouteId: 'deleted' }),
                        })
                            .then(response => {
                                if (response.ok) {
                                    setFilteredRoutesState(filteredRoutesState.filter(route => route.id !== routeId));
                                } else {
                                    throw new Error('Failed to delete route');
                                }
                            })
                            .catch(error => console.error('Error deleting route:', error));
                    }
                },
            ],
            { cancelable: false }
        );
    };

    const handleMarkAsCompleted = (routeId) => {
        const matchingRequest = requests.find(request => request.routeId === routeId);
        const completedRoute = filteredRoutesState.find(route => route.id === routeId);
        setCompletedRoutes(prevRoutes => [...prevRoutes, completedRoute]);
        console.log('match', matchingRequest);
        if (matchingRequest) {
            Alert.alert(
                t('Complete the route'),
                `${t('Are you sure you want to mark this route as completed?')} ${t('Users')}: ${matchingRequest.username}${matchingRequest.userEmail}`,
                [
                    {
                        text: t('Cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: t('Mark as Completed'), onPress: () => {
                            fetch(`http://10.0.2.2:3000/routes/${routeId}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ userRouteId: 'completed' }),
                            })
                                .then(response => {
                                    if (response.ok) {
                                        setFilteredRoutesState(filteredRoutesState.filter(route => route.id !== routeId));
                                        // Предаване на данните на екрана "Notifications"
                                        navigation.navigate('Notifications', { matchingRequest });
                                    } else {
                                        throw new Error('Failed to delete route');
                                    }
                                })
                                .catch(error => console.error('Error deleting route:', error));
                        }
                    },
                ],
                { cancelable: false }
            );
        } else {
            // Handle case when no matching request is found
            console.log("No matching request found. Cannot mark as completed.");
        }
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/roadHistory2.png')}
                style={styles.backgroundImage}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={styles.header}  >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                        {t('Routes History')}
                    </Text>
                    <View style={{ width: 60 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        {/* Кастомизирайте бутона за връщане според вашите изисквания */}
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>
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
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => handleDeleteRoute(route.id)}>
                                        <Text style={styles.buttonText}>{t('Delete Route')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => handleMarkAsCompleted(route.id)}>
                                        <Text style={styles.buttonText}>{t('Mark as Completed')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        padding: 16,
        backgroundColor: '#f4511e',
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
        color: '#010101'
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
        width: 380,
        height: 180,
        margin: 10,
        padding: 10,
        backgroundColor: '#f4511e',
        borderRadius: 10,
    },
    routeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#010101'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',
        width: '40%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#010101'
    },
});

export default RouteHistory;
