import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useTranslation } from 'react-i18next';
import styles from '../Home/styles';
import i18next from 'i18next';

const API_BASE_URL = 'http://10.0.2.2:3000';

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
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                useremail: email,
                userpassword: password,
            });

            if (response.status === 200) {
                // Successful login, navigate to the HomeScreen
                navigation.navigate('Home');
            } else {
                // Handle login failure (e.g., display an error message)
                alert(t('Login failed. Please check your credentials.'));
            }
        } catch (error) {
            // Handle any error that occurred during the API call
            console.error('Login Error:', error);
            alert(t('Login failed.Invalid email or password.'));
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
                        {t("Create your account")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}