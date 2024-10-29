// Inside LogoutScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
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

    const handleHome = () => {
        logout();
        // Optionally, navigate to the login screen or any other screen after logout
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/register-number-background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.container}
            >
                <Text
                    style={styles.mainText}
                >{t('Are you sure you want to logout?')}</Text>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleLogout}>
                    <Text
                        style={styles.sumbitTextYes}
                    >{t('Yes')}</Text>
                </TouchableOpacity>
                <View style={styles.submitPadding}></View>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleHome}>
                    <Text
                        style={styles.sumbitTextYes}
                    >{t('No')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LogoutScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
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
        borderRadius: 50,
        borderWidth: 2,
    },
    sumbitTextYes: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    submitPadding: {
        padding: 5,
    },
    sumbitTextNo: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    }
}) 
