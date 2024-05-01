import React from "react";
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from "../Authentication/AuthContext";

const Notifications = ({ navigation }) => {
    const { user } = useAuth();
    const routeData = useRoute();
    const matchingRequest = routeData?.params?.matchingRequest; // Проверяваме дали routeData, params и matchingRequest са дефинирани
    const userID = routeData?.params?.userID;
    const { t } = useTranslation();
    console.log('wortk!!!', matchingRequest);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/user-background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={styles.header}  >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                        {t('Notifications')}
                    </Text>
                    <View style={{ width: 60 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {/* Проверка дали matchingRequest е дефиниран преди да се опитаме да го използваме */}
                {matchingRequest && (
                    <Text>
                        ???  {matchingRequest.departureCity}-{matchingRequest.arrivalCity}-{matchingRequest.id}
                    </Text>
                )}
            </View>
        </SafeAreaView>
    )
}

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
});

export default Notifications;