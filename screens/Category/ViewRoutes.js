import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    TextInput,
    Modal,
    Pressable,
} from 'react-native';
import { useRouteContext } from './RouteContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Authentication/AuthContext';

function ViewRoutes({ navigation }) {
    const { t } = useTranslation();
    const [enteredDepartureCity, setEnteredDepartureCity] = useState('');
    const [enteredArrivalCity, setEnteredArrivalCity] = useState('');
    const { routes, deleteRoute } = useRouteContext();
    const { user } = useAuth();
    const [loggingUser, setLoggingUser] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [sortByDate, setSortByDate] = useState(false);
    const [filteredRoutes, setFilteredRoutes] = useState([]);

    const usernameRequest = user?.user?.username;
    const userFnameRequest = user?.user?.fName;
    const userLnameRequest = user?.user?.lName;

    const fullUserInfo = { usernameRequest, userFnameRequest, userLnameRequest }

    const toggleFilterModal = () => {
        setShowFilterModal(!showFilterModal);
    };

    const clearFilters = () => {
        setEnteredDepartureCity('');
        setEnteredArrivalCity('');
        toggleFilterModal();
    };

    const applyFilters = () => {
        toggleFilterModal();

        // Създай нов списък с филтрирани маршрути без сортиране
        const filteredRoutesWithoutSort = routes.filter((route) =>
            route.departureCity.toLowerCase().includes(enteredDepartureCity.toLowerCase()) &&
            route.arrivalCity.toLowerCase().includes(enteredArrivalCity.toLowerCase())
        );

        // Създай нов списък със сортирани маршрути
        const sortedRoutes = filteredRoutesWithoutSort.slice().sort((a, b) => {
            const dateA = new Date(a.selectedDateTime);
            const dateB = new Date(b.selectedDateTime);

            // Зависи от това дали трябва да сортираш във възходящ или низходящ ред
            return sortByDate ? dateA - dateB : dateB - dateA;
        });

        // Замени текущия филтриран списък със сортирания
        setFilteredRoutes(sortedRoutes);
    };



    const handlerSeeView = (routeParams) => {
        navigation.navigate('RouteDetails', {
            ...routeParams,
            showConfirmButton: false,
            showChangesButton: false,
            showBackButton: true,
            routeRequestButton: true,
            loggedInUser: fullUserInfo,
        });
        console.log('Route view clicked !');
    };

    const filterAndDeleteExpiredRoutes = () => {
        const currentDate = new Date();

        routes.forEach((route) => {
            const routeDate = new Date(route.selectedDateTime);
            if (routeDate <= currentDate) {
                // Assuming each route has a unique identifier (like an 'id' field)
                // Call the deleteRoute function from your context to delete the expired route
                deleteRoute(route.id);
            }
        });
    };


    useEffect(() => {
        const intervalId = setInterval(filterAndDeleteExpiredRoutes, 60000); // 1 minute interval

        return () => clearInterval(intervalId); // Cleanup the interval when unmounted
    });

    const filteredRoutesState = routes
        .filter(
            (route) =>
                route.departureCity &&
                route.arrivalCity &&
                route.departureCity.toLowerCase().includes(enteredDepartureCity.toLowerCase()) &&
                route.arrivalCity.toLowerCase().includes(enteredArrivalCity.toLowerCase())
        )
        .filter((route) => {
            const routeDate = new Date(route.selectedDateTime);
            return routeDate >= new Date();
        });


    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/view-routes-backgroud.jpg')}
                style={styles.backgroundImage}
            />
            <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
                <Text style={styles.filterButtonText}>{t('Filter')}</Text>
            </TouchableOpacity>

            {/* Filter Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFilterModal}
                onRequestClose={toggleFilterModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>{t('Filter Options')}</Text>

                        {/* Search Inputs */}
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder={t('Enter Departure City')}
                                value={enteredDepartureCity}
                                onChangeText={(text) => setEnteredDepartureCity(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={t('Enter Arrival City')}
                                value={enteredArrivalCity}
                                onChangeText={(text) => setEnteredArrivalCity(text)}
                            />
                        </View>

                        {/* Add additional filter options here */}

                        {/* Buttons */}
                        <Pressable style={styles.applyFiltersButton} onPress={applyFilters}>
                            <Text style={styles.applyFiltersButtonText}>{t('Apply Filters')}</Text>
                        </Pressable>
                        <Pressable
                            style={styles.sortByDateButton}
                            onPress={() => setSortByDate(!sortByDate)}
                        >
                            <Text style={styles.sortByDateButtonText}>
                                {sortByDate ? t('Sort by Oldest') : t('Sort by Newest')}
                            </Text>
                        </Pressable>
                        <Pressable style={styles.clearFiltersButton} onPress={clearFilters}>
                            <Text style={styles.clearFiltersButtonText}>{t('Clear Filters')}</Text>
                        </Pressable>
                        <Pressable style={styles.closeModalButton} onPress={toggleFilterModal}>
                            <Text style={styles.closeModalButtonText}>{t('Close')}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {filteredRoutesState
                        .filter(route => route.userRouteId !== "deleted") // Проверка за userRouteId
                        .map((route, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.routeContainer}
                                onPress={() =>
                                    handlerSeeView({
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
                                        userId: route.userId,
                                        username: route.username,
                                        userFname: route.userFname,
                                        userLname: route.userLname,
                                        userEmail: route.userEmail,
                                        routeId: route.id,
                                        user_id: route.userId,
                                    })
                                }
                            >
                                <Text style={styles.routeText}>
                                    {new Date(route.selectedDateTime).toLocaleString()} {/* Displaying date without time */}
                                </Text>
                                <Text style={styles.routeText}>
                                    {route.departureCity}-{route.arrivalCity}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
    },
    routeContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f4511e',
        borderRadius: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    input: {
        flex: 1,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        backgroundColor: '#fff',
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
    section: {
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
    },
    routeContainer: {
        margin: 10,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Use a semi-transparent background
        borderRadius: 15,
        elevation: 3, // Add elevation for a subtle shadow effect on Android
    },
    routeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1b1c1e',
    },
    filterButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignSelf: 'center',
        width: '75%'
    },
    filterButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start', // Align to the top
        marginTop: 60, // Adjust based on your navigation bar height
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '100%', // Adjust the width as needed
        alignSelf: 'center', // Center the modal horizontally
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    clearFiltersButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    clearFiltersButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeModalButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    closeModalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sortByDateButton: {
        backgroundColor: '#2ecc71',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    sortByDateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default ViewRoutes;
