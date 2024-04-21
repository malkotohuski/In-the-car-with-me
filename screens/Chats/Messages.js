import React, { useState } from "react";
import { Pressable, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useAuth } from "../Authentication/AuthContext";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Messages = ({ navigation }) => {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const currentTime = new Date().toLocaleTimeString();
            const newMessage = {
                text: message,
                sender: 'me', // Предполагаме, че вие сте изпращачът
                time: currentTime,
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
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
        width: 75,
        height: 75,
        borderRadius: 50,
    },
    userName: {
        fontWeight: 'bold',
        marginLeft: 4,
    },
    messageContent: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 8,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 16,
    },
    timeText: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-end',
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
});
