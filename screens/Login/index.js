import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import styles from '../Home/styles';
import i18next from 'i18next';
import { useAuth } from '../Authentication/AuthContext'; // Коментирай това, ако не се използва

const API_BASE_URL = 'http://192.168.1.2:3000';

export default function Login({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useTranslation();
    const { login } = useAuth(); // Закоментирай, ако вече не използваш
    const [isLoading, setIsLoading] = useState(true);

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
    }, []);

    // Закоментирай логиката за логване
    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_BASE_URL}/login`, {
                useremail: email,
                userpassword: password,
            });

            if (response.status === 200) {
                login(response.data);
                navigation.navigate('Home');
            } else {
                alert(t('Login failed. Please check your credentials.'));
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert(t('Login failed.Invalid email or password.'));
        } finally {
            setIsLoading(false);
        }
    };

    // Добави нова функция, която да прескача логването
    const skipLogin = () => {
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    {isLoading ? (
                        <Image
                            source={require('../../images/loading_image.png')}
                            style={styles.backgroundImage}
                        />
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
                            {/* Променяме onPress на новата функция skipLogin */}
                            <TouchableOpacity onPress={skipLogin}>
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
                                    onPress={handleLogin} /* Използваме skipLogin вместо handleLogin */
                                >
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
            </ScrollView>
        </SafeAreaView>
    );
}
