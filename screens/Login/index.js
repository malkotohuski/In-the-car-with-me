import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useTranslation } from 'react-i18next';
import styles from '../Home/styles';
import i18next from 'i18next';


export default function Login({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();

    const [isBulgaria, setisBulgaria] = useState(false);

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
        setisBulgaria(lng === 'bg');
    };

    const handleLogin = async () => {
        // Add your login logic here
        if (email === 'malkoto' && password === 'password') {
            // Simulate user authentication (replace with your server logic)
            const userId = '123'; // Replace with the actual user ID
            try {
                // Save user ID to AsyncStorage
                await AsyncStorage.setItem('userId', userId);
                // Navigate to the HomeScreen upon successful login
                navigation.navigate('Home');
            } catch (error) {
                console.error('Error saving user ID:', error);
                // Handle error (e.g., show an error message to the user)
            }
        } else {
            alert(t('Login failed. Please check your credentials.'));
        }
    };

    return (
        <View style={styles.container}>
            <View >
                <View style={styles.languageSwitchContainer}>
                    <TouchableOpacity
                        style={styles.languageButton}
                        onPress={() => changeLanguage('en')}
                    >
                        <Image
                            source={require('../../images/engl-flag.png')} // Replace with the path to your English flag image
                            style={styles.flagImage}
                        />
                        <Text>{t('English')}</Text>
                    </TouchableOpacity>
                    <View style={{ margin: 60 }}>

                    </View>
                    <TouchableOpacity
                        style={styles.languageButton}
                        onPress={() => changeLanguage('bg')}
                    >
                        <Image
                            source={require('../../images/bulg-flag.png')} // Replace with the path to your Italian flag image
                            style={styles.flagImage}
                        />
                        <Text>{t('Bulgarian')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.title}>{t('Login')}</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder={t("Email")}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder={t("Password")}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonsContent}>
                <TouchableOpacity
                    style={styles.loginButtons}
                    onPress={handleLogin}>
                    <Text style={styles.textButtons}>
                        {t("Log in")}
                    </Text>
                </TouchableOpacity>
                <View style={styles.buttonSeparator} />
                <TouchableOpacity
                    style={styles.loginButtons}
                    onPress={() => navigation.navigate('Register')} >
                    <Text style={styles.textButtons}>
                        {t("Register")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
