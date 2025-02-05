import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Modal, Image, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Authentication/AuthContext';
import { DarkModeContext } from '../DrawerContent/DarkModeContext';

const API_BASE_URL = 'http://10.0.2.2:3000';

const AddFriendScreen = ({ navigation }) => {
    const { darkMode } = useContext(DarkModeContext);
    const { user } = useAuth();
    const currentUserId = user?.user?.username;
    const noImage = require('../../images/no_image.png');

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
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

    const getHeaderStyles = () => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        backgroundColor: darkMode ? '#333232FF' : '#f4511e',
    });

    const filteredUsers = users.filter(user =>
        user.username !== currentUserId && user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUserPress = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const handleAddFriend = () => {
        axios.post(`${API_BASE_URL}/approve-friend-request`, {
            userId: currentUserId,
            friendId: selectedUser.id,
        })
            .then(response => {
                console.log('Friend request approved successfully:', response.data);
            })
            .catch(error => {
                console.error('Error approving friend request:', error);
            });
        setModalVisible(false);
    };

    const handleIgnore = () => {
        setModalVisible(false);
    };

    const handleBackButton = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/d2.png')}
                style={styles.backgroundImage}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <View style={getHeaderStyles()}>
                    <Text style={styles.headerText}>
                        {t("Find Friends")}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
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
                            <TouchableOpacity onPress={() => handleUserPress(item)}>
                                <View style={styles.userItem}>
                                    <Text style={styles.username}>{item.username}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>
            </KeyboardAvoidingView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{t("Username")}: {selectedUser?.username}</Text>
                        {selectedUser?.userImage ? (
                            <Image
                                source={{ uri: selectedUser.userImage }}
                                style={styles.userImage}
                            />
                        ) : (
                            <Image
                                source={noImage}
                                style={styles.userImage}
                            />
                        )}
                        <TouchableOpacity style={styles.modalButton} onPress={handleAddFriend}>
                            <Text style={styles.buttonText}>{t("Add as Friend")}</Text>
                        </TouchableOpacity>
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.modalButton, styles.halfButton]} onPress={handleIgnore}>
                                <Text style={styles.buttonText}>{t("Block")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.halfButton]} onPress={handleBackButton}>
                                <Text style={styles.buttonText}>{t("Back")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f4511e',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchInput: {
        borderWidth: 2,
        borderColor: '#010101',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    userItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#010101',
    },
    username: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 3,
    },
    modalText: {
        color: '#010101',
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    modalButton: {
        backgroundColor: '#f4511e',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    halfButton: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default AddFriendScreen;
