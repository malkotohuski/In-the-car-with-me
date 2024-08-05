import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, SafeAreaView, TextInput } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../Authentication/AuthContext';
import { useRouteContext } from './RouteContext';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000';

const RouteHistory = ({ navigation }) => {
    const { user } = useAuth();
    const { requests } = useRouteContext();
    const { t } = useTranslation();
    const [originalRoutesState, setOriginalRoutesState] = useState([]);
    const [filteredRoutesState, setFilteredRoutesState] = useState([]);
    const [completedRoutes, setCompletedRoutes] = useState([]);
    const [searchDepartureText, setSearchDepartureText] = useState('');
    const [searchArrivalText, setSearchArrivalText] = useState('');

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/routes`);
                if (response.status === 200) {
                    const routes = response.data.filter(route => {
                        return route.userId === user?.user?.id &&
                            !route.isDeleted &&
                            route.userRouteId !== "deleted" &&
                            route.userRouteId !== "completed";
                    });
                    setOriginalRoutesState(routes);
                    setFilteredRoutesState(routes);
                } else {
                    throw new Error('Failed to fetch routes');
                }
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        };

        fetchRoutes();
    }, [user]);

    useEffect(() => {
        // Филтрирай маршрути на база на текста за търсене
        const filteredRoutes = originalRoutesState.filter(route => {
            const matchesDeparture = route.departureCity?.toLowerCase().includes(searchDepartureText.toLowerCase());
            const matchesArrival = route.arrivalCity?.toLowerCase().includes(searchArrivalText.toLowerCase());
            return matchesDeparture && matchesArrival;
        });
        setFilteredRoutesState(filteredRoutes);
    }, [searchDepartureText, searchArrivalText, originalRoutesState]);

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
                                    const updatedRoutes = originalRoutesState.filter(route => route.id !== routeId);
                                    setOriginalRoutesState(updatedRoutes);
                                    setFilteredRoutesState(updatedRoutes);
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
        const completedRoute = originalRoutesState.find(route => route.id === routeId);
        setCompletedRoutes(prevRoutes => [...prevRoutes, completedRoute]);
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
                                        const updatedRoutes = originalRoutesState.filter(route => route.id !== routeId);
                                        setOriginalRoutesState(updatedRoutes);
                                        setFilteredRoutesState(updatedRoutes);
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
            <View style={styles.mainContent}>
                <View style={styles.header}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                        {t('Routes History')}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={t('Search by Departure City')}
                        value={searchDepartureText}
                        onChangeText={setSearchDepartureText}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={t('Search by Arrival City')}
                        value={searchArrivalText}
                        onChangeText={setSearchArrivalText}
                    />
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
                                        style={styles.button_delete}
                                        onPress={() => handleDeleteRoute(route.id)}>
                                        <Text style={styles.buttonText}>{t('Delete Route')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button_completed}
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
    mainContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    searchContainer: {
        width: '90%',
        marginVertical: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#000',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    routeContainer: {
        width: 380,
        height: 180,
        margin: 10,
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    routeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#010101',
        textAlign: 'center',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    button_delete: {
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#D12121',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',
        width: '45%',
    },
    button_completed: {
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#16B638',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',
        width: '45%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#010101',
    },
});

export default RouteHistory;
