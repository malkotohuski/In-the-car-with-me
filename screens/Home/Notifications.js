import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from "../Authentication/AuthContext";
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3000'; // JSON server
const api = axios.create({
    baseURL: API_BASE_URL,
});

const Notifications = ({ navigation }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const routeData = useRoute();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get(`/notifications?recipient=${user?.user?.username}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
    }, [user]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/user-background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{t('Notifications')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Notifications List */}
                {notifications.length > 0 ? (
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.notificationList}
                        renderItem={({ item }) => (
                            <View style={styles.notification}>
                                <Text style={styles.message}>{item.message}</Text>
                                <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
                            </View>
                        )}
                    />
                ) : (
                    // No notifications message
                    <View style={styles.emptyState}>
                        <Icons name="bell-off-outline" size={80} color="#010101" />
                        <Text style={styles.emptyMessage}>{t('No new notifications')}</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9',
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
        alignItems: 'center',
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#f4511e',
        elevation: 3,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    notificationList: {
        padding: 16,
    },
    notification: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    message: {
        fontSize: 16,
        color: '#010101',
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: '#202020FF',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyMessage: {
        marginTop: 10,
        fontSize: 18,
        color: '#010101',
        textAlign: 'center',
    },
});

export default Notifications;
