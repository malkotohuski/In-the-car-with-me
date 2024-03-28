import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet, Alert, Image, FlatList, Modal, ScrollView } from 'react-native';
import { useAuth } from '../Authentication/AuthContext';
import { useRoute } from '@react-navigation/native';
import { useRouteContext } from './RouteContext';

const RouteHistory = () => {
    const { user } = useAuth();
    const { routes } = useRouteContext();
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);

    const [data, setData] = useState([
        { id: '1', route: 'Route 1' },
        { id: '2', route: 'Route 2' },
        { id: '3', route: 'Route 3' },
        { id: '4', route: 'Route 4' },
        { id: '5', route: 'Route 5' },
    ]);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.route}</Text>
        </View>
    );

    const filteredRoutesState = routes.filter(route => route.userId === user?.user?.id);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('Routes History')}</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.link}>Add Route</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Add New Route</Text>
                        <TextInput style={styles.input} placeholder="Enter route" />
                        <Button title="Save" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
