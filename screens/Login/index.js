import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import styles from '../Home/styles';
import i18next from 'i18next';
import { useAuth } from '../Authentication/AuthContext';

const API_BASE_URL = 'http://192.168.1.2:3000';

const LoadingText = () => {
    const [dotCount, setDotCount] = useState(0);
    const { t } = useTranslation();  // Add this line to use t function

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prevCount) => (prevCount + 1) % 4);
        }, 500); // Променяме точките на всеки 500 ms

        return () => clearInterval(interval);
    }, []);

    const dots = '.'.repeat(dotCount);

    return (
        <Text style={styles.loadingText}>{t('loading')}{dots}</Text>
    );
};

export default function Login({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(true); // Започваме с isLoading=true, за да покажем изображението за 3 секунди

    const [isBulgaria, setisBulgaria] = useState(false);

    const changeLanguage = (lng) => {
        i18next.changeLanguage(lng);
        setisBulgaria(lng === 'bg');
    };

    useEffect(() => {
        // Изчакайте 3 секунди преди да смените isLoading на false
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        // Очистете таймера, за да избегнете изтичане на памет
        return () => clearTimeout(timer);
    }, []); // Празен масив означава, че този useEffect ще се изпълни само веднъж, след като компонентът се монтира

    const handleLogin = async () => {
        try {
            setIsLoading(true); // Започваме зареждането
            const response = await axios.post(`${API_BASE_URL}/login`, {
                useremail: email,
                userpassword: password,
            });

            if (response.status === 200) {
                // Successful login, update the global state with user data
                login(response.data);
                // Navigate to the HomeScreen
                navigation.navigate('Home');
            } else {
                // Handle login failure (e.g., display an error message)
                alert(t('Login failed. Please check your credentials.'));
            }
        } catch (error) {
            // Handle any error that occurred during the API call
            console.error('Login Error:', error);
            alert(t('Login failed.Invalid email or password.'));
        } finally {
            setIsLoading(false); // Приключваме зареждането
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                // Покажете изображението за 3 секунди
                <View style={styles.loadingContainer}>
                    <Image
                        source={require('../../images/loading_image.png')}
                        style={styles.backgroundImage}
                    />
                    <LoadingText />
                </View>
            ) : (
                <>
                    <Image
                        source={require('../../images/login-background.jpg')}
                        style={styles.backgroundImage}
                    />
                    <View >
                        <View style={styles.languageSwitchContainer}>
                            <TouchableOpacity
                                style={styles.languageButton}
                                onPress={() => changeLanguage('en')}
                            >
                                <Image
                                    source={require('../../images/eng1-flag.png')}
                                    style={styles.flagImage}
                                />
                                <Text
                                    style={styles.languageText}
                                >{t('English')}</Text>
                            </TouchableOpacity>
                            <View style={{ margin: 60 }}>

                            </View>
                            <TouchableOpacity
                                style={styles.languageButton}
                                onPress={() => changeLanguage('bg')}
                            >
                                <Image
                                    source={require('../../images/bulg-flag.png')}
                                    style={styles.flagImage}
                                />
                                <Text
                                    style={styles.languageText}
                                >{t('Bulgarian')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.title}>{t('Login')}</Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholderTextColor={'white'}
                        style={styles.input}
                        placeholder={t("Email")}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        placeholderTextColor={'white'}
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
                                {t("Create your account")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}