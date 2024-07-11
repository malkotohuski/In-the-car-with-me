import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = 'http://10.0.2.2:3000';

const AddFriendScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/users`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}  >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    {t("Find Friends")}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    {/* Кастомизирайте бутона за връщане според вашите изисквания */}
                    <Icons name="keyboard-backspace" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search users..."
                    value={searchTerm}
                    onChangeText={text => setSearchTerm(text)}
                />
                <FlatList
                    data={filteredUsers}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <Text style={styles.username}>{item.username}</Text>
                        </View>
                    )}
                />
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
        padding: 20,
        backgroundColor: '#fff',
        width: '100%',
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
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    userItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    username: {
        fontSize: 18,
    },
});

export default AddFriendScreen;
