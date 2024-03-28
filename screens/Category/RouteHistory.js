import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, TextInput, StyleSheet, Alert, Image, FlatList, Modal } from 'react-native';

const RouteHistory = () => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Route History</Text>
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
});

export default RouteHistory;
