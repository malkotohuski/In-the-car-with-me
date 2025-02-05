import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, FlatList, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from "../Authentication/AuthContext";
import axios from 'axios';
import { DarkModeContext } from '../DrawerContent/DarkModeContext';

const API_BASE_URL = 'http://10.0.2.2:3000'; // JSON server
const api = axios.create({
    baseURL: API_BASE_URL,
});

const Notifications = ({ navigation, route }) => {
    const { user } = useAuth();
    const { darkMode } = useContext(DarkModeContext);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get(`/notifications?recipient=${user?.user?.username}`);
                // Филтриране само на нотификациите със статус 'active'
                const activeNotifications = response.data.filter((notification) => notification.status === 'active');
                // Сортиране на нотификациите по дата (от най-новата към най-старата)
                const sortedNotifications = activeNotifications.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setNotifications(sortedNotifications);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
    }, [user]);

    const getHeaderStyles = () => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        backgroundColor: darkMode ? '#333232FF' : '#f4511e',
    });

    const deleteNotification = async (id) => {
        try {
            // Актуализиране на статуса в базата данни
            await api.patch(`/notifications/${id}`, { status: 'deleted' });

            // Обновяване на списъка с нотификации в state
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification.id !== id)
            );

            setModalVisible(false);
            console.log(`Notification ${id} marked as deleted.`);
        } catch (error) {
            console.error(`Failed to delete notification ${id}:`, error);
        }
    };


    useEffect(() => {
        if (route.params?.resetNotificationCount) {
            setNotificationCount(0);
        }
    }, [route.params]);

    const formatDate = (dateString) => {
        const now = new Date();
        const notificationDate = new Date(dateString);
        const diffInMilliseconds = now - notificationDate;
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays >= 1) {
            return `${diffInDays}d`;
        } else if (diffInHours >= 1) {
            return `${diffInHours}h`;
        } else {
            return `${diffInMinutes}min`;
        }
    };

    const handleDotsPress = (item) => {
        setSelectedNotification(item);
        setModalVisible(true);
    };

    const isNewNotification = (createdAt) => {
        const now = new Date();
        const notificationDate = new Date(createdAt);
        const diffInMilliseconds = now - notificationDate;
        const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
        return diffInHours < 24; // Проверява дали са минали по-малко от 24 часа
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/user-background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={getHeaderStyles()}>
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
                                    isNewNotification(item.createdAt) && styles.newNotification,
                                ]}
                            >
                                <Text style={styles.newLabel}>
                                    {isNewNotification(item.createdAt) ? t('New') : t('Earlier')}
                                </Text>
                                <TouchableOpacity style={styles.dotsButton} onPress={() => handleDotsPress(item)}>
                                    <Icons name="dots-vertical" size={25} color="#000" />
                                </TouchableOpacity>
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

                {/* Modal for notification actions */}
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{t('Notification Options')}</Text>
                            <Text style={styles.modalMessage}>{selectedNotification?.message}</Text>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => deleteNotification(selectedNotification.id)}
                            >
                                <Text style={styles.modalButtonText}>{t('Delete')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>{t('Cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        paddingHorizontal: 10,
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
    dotsButton: {
        position: 'absolute',
        top: 10,
        right: -30,
        zIndex: 1,
        padding: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Затъмнен фон
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalMessage: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#f4511e',
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Notifications;
