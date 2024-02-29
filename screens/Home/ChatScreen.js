import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../Authentication/AuthContext';
import { useRouteContext } from '../Category/RouteContext';

const ChatScreen = ({ navigation }) => {
    const { user } = useAuth();
    const username = user?.user?.username;
    const userAllName = `${user?.user?.fName} ${user?.user?.lName}`;
    const [searchTerm, setSearchTerm] = useState('');
    const { routes, requests } = useRouteContext();
    const [recentChats, setRecentChats] = useState([/* Запълни с последните чатове */]);
    console.log('USER', requests);

    const handleApproveFriendRequest = (friend) => {
        const userId = user.id;
        const friendId = friend.id;

        // Изпрати заявка за одобрение на сървъра
        axios.post('http://localhost:3000/approve-friend-request', { userId, friendId })
            .then((response) => {
                // Обработи успешния отговор
                console.log(response.data.message);
            })
            .catch((error) => {
                // Обработи грешката
                console.error('Error approving friend request:', error);
            });
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/messa.jpg')}
                style={styles.backgroundImage}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={styles.header}  >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                        Chats
                    </Text>
                    <View style={{ width: 35 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
                            {/* Кастомизирайте бутона за връщане според вашите изисквания */}
                            <Icons name="facebook-messenger" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 35 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
                            {/* Кастомизирайте бутона за връщане според вашите изисквания */}
                            <Icon name="people" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 35 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
                            {/* Кастомизирайте бутона за връщане според вашите изисквания */}
                            <Icon name="person-add" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 60 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        {/* Кастомизирайте бутона за връщане според вашите изисквания */}
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                    <Icon name='person-search' size={24} color={"white"} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Търсене..."
                        placeholderTextColor="white"
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                    />
                </View>
            </View>
            <FlatList
                data={recentChats}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={styles.chatItem}>
                            <Text style={styles.chatItemText}>{item.title}</Text>
                            <TouchableOpacity onPress={() => handleApproveFriendRequest(item)}>
                                <Text style={styles.approveButton}>Approve</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        padding: 16,
        backgroundColor: '#f4511e',
    },
    searchContainer: {
        flex: 1,
        alignItems: 'center',
    },
    searchIcon: {
        marginTop: 43,
        marginRight: 350
    },
    searchInput: {
        flex: 1,
        position: 'absolute',
        marginTop: 30,
        width: '100%',
        borderColor: '#010101',
        borderWidth: 1,
        borderRadius: 5,
        color: '#f1f1f1',
        paddingLeft: 50,  // Отстъп за иконата отдясно
    },
    chatItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    chatItemText: {
        color: 'white',
        fontSize: 16,
    },
})

export default ChatScreen;



