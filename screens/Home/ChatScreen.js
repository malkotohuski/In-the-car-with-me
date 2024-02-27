import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/earth_message.jpg')}
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
            </View>
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
    }
})

export default ChatScreen;



