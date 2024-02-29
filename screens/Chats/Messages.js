import React from "react";
import { Pressable, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from "../Authentication/AuthContext";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Messages = ({ navigation }) => {
    const { user } = useAuth();
    console.log("ssss", user);
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <View style={styles.header} >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                        Messages
                    </Text>
                    <View style={{ width: 60 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                        {/* Кастомизирайте бутона за връщане според вашите изисквания */}
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Pressable style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                    <View>
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                resizeMode: 'cover',
                            }}
                            source={{ uri: user?.user?.userImage }}
                        />
                    </View>

                    <View style={{ paddingLeft: 10 }}>
                        <Text>{user?.user?.username}</Text>
                        <Text>{user?.user?.fName} {user?.user?.lName}</Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Messages;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        padding: 16,
        backgroundColor: '#f4511e',
    },
})