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

const Notifications = ({ navigation, route }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get(`/notifications?recipient=${user?.user?.username}`);
                // Сортиране на нотификациите по дата (от най-новата към най-старата)
                const sortedNotifications = response.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setNotifications(sortedNotifications);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
    }, [user]);

    useEffect(() => {
        if (route.params?.resetNotificationCount) {
            setNotificationCount(0);
        }
    }, [route.params]);

    // Функция за форматиране на датата
    const formatDate = (dateString) => {
        const now = new Date();
        const notificationDate = new Date(dateString);
        const diffInMilliseconds = now - notificationDate;
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays >= 1) {
            return `${diffInDays}d`; // Показва дни, ако е над 24 часа
        } else if (diffInHours >= 1) {
            return `${diffInHours}h`; // Показва часове, ако е над 1 час
        } else {
            return `${diffInMinutes}min`; // Показва минути, ако е под 1 час
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/user-background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{t('Notifications')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {notifications.length > 0 ? (
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.notificationList}
                        renderItem={({ item, index }) => (
                            <View
                                style={[
                                    styles.notification,
                                    index === 0 && styles.newNotification,
                                ]}
                            >
                                {index === 0 && <Text style={styles.newLabel}>{t('New')}</Text>}
                                <Text style={styles.message}>{item.message}</Text>
                                <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
                            </View>
                        )}
                    />
                ) : (
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
    newLabel: {
        position: 'absolute',
        top: -10,
        left: 10,
        backgroundColor: '#cce7ff',
        color: '#005fcb',
        fontWeight: 'bold',
        paddingHorizontal: 5,
        borderRadius: 3,
        fontSize: 12,
    },
    newNotification: {
        backgroundColor: '#cce7ff',
    },
    newLabelText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },

});

export default Notifications;
