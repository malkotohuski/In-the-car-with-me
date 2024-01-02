// Inside LogoutScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../Authentication/AuthContext'; // Update the path based on your project structure
import { useTranslation } from 'react-i18next';

const LogoutScreen = ({ navigation }) => {
    const { logout } = useAuth();
    const { t } = useTranslation();

    // Handle the logout action
    const handleLogout = () => {
        logout();
        // Optionally, navigate to the login screen or any other screen after logout
        navigation.navigate('Login');
    };


    return (
        <View style={styles.container}
        >
            <Text
                style={styles.mainText}
            >{t('Are you sure you want to logout?')}</Text>
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleLogout}>
                <Text
                    style={styles.sumbitText}
                >{t('Yes')}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LogoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'grey',
    },
    mainText: {
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20
    },
    submitButton: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 1,
        borderWidth: 1,
    },
    sumbitText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
}) 
