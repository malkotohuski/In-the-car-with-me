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
                >{t('Are you sure you want to logout?')}
                </Text>
                <View style={styles.containerYesNo}>
                    <TouchableOpacity
                        style={styles.submitButtonYes}
                        onPress={handleLogout}>
                        <Text
                            style={styles.sumbitTextYes}
                        >{t('Yes')}</Text>
                    </TouchableOpacity>
                    <View style={styles.submitPadding}></View>
                    <TouchableOpacity
                        style={styles.submitButtonNo}
                        onPress={handleHome}>
                        <Text
                            style={styles.sumbitTextYes}
                        >{t('No')}</Text>
                    </TouchableOpacity>
                </View>
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
    containerYesNo: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 10,

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
    submitButtonYes: {
        padding: 20,
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        margin: 10,
        backgroundColor: '#27ae60',
    },
    submitButtonNo: {
        padding: 20,
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 2,
        margin: 10,
        backgroundColor: '#AE2727FF',
    },
    sumbitTextYes: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
}) 
