import React, { useState, useContext } from "react";
import { Pressable, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useAuth } from "../Authentication/AuthContext";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DarkModeContext } from "../DrawerContent/DarkModeContext";

const Messages = ({ navigation }) => {
    const { user } = useAuth();
    const { darkMode } = useContext(DarkModeContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const currentTime = new Date().toLocaleTimeString();
            const newMessage = {
                text: message,
                sender: 'me',
                time: currentTime,
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    const getHeaderStyles = () => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        backgroundColor: darkMode ? '#333232FF' : '#f4511e',
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/confirm_test.jpeg')}
                style={styles.backgroundImage}
            />
            <View style={{ flex: 1 }}>
                <View style={getHeaderStyles()}>
                    <Text style={styles.headerText}>Messages</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    onContentSizeChange={() => { this.scrollView.scrollToEnd({ animated: true }) }}
                >
                    {messages.map((msg, index) => (
                        <View key={index} style={styles.messageContainer}>
                            <View style={styles.userContainer}>
                                <Image source={{ uri: user?.user?.userImage }} style={styles.userImage} />
                                <Text style={styles.userName}>{user?.user?.username}</Text>
                            </View>
                            <View style={[styles.messageContent, { alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start' }]}>
                                <Text style={styles.messageText}>{msg.text}</Text>
                                <Text style={styles.timeText}>{msg.time}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={message}
                        onChangeText={text => setMessage(text)}
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Icons name="send" size={24} color="#f4511e" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Messages;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'grey'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'grey'
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
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 4,
        paddingHorizontal: 8,
    },
    userContainer: {
        marginRight: 8,
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 50,
    },
    userName: {
        fontWeight: 'bold',
        marginLeft: 4,
        color: '#050505FF',
        fontSize: 17,
        fontWeight: 'bold',
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 8,
        margin: 10
    },
    messageContent: {
        backgroundColor: '#D8D5D5FF',
        borderRadius: 8,
        padding: 8,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 16,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        color: '#010101',
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 14,
        color: '#010101',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
});
