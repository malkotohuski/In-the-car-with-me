import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import styles from '../Home/styles';
import { useTranslation } from 'react-i18next';


const API_BASE_URL = 'http://10.0.2.2:3000'; // Update with your JSON server URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

export default function Register({ navigation }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password === confirmPassword) {
      if (email.includes('@') && email.includes('.') && email.length >= 5) {
        try {
          // Make a POST request to the registration endpoint
          const response = await api.post('/users', {
            username: name,
            useremail: email,
            userpassword: password,
          });

          console.log('Registration Response:', response);

          if (response.status === 201) {
            // Registration successful, navigate to the welcome screen
            navigation.navigate('WelcomeScreen', {
              name,
              email,
              password,
            });
          } else {
            // Handle registration failure
            Alert.alert(t('Registration Error'), t('Failed to register. Please try again.'));
          }

        } catch (error) {
          // Handle any error that occurred during the API call
          console.error('Registration Error:', error);
          Alert.alert(t('Registration Error'), t('Email or username is already taken'));
        }
      } else {
        // Invalid email address
        Alert.alert(t('Invalid email address'), t('Please enter a valid email address.'));
      }
    } else {
      // Passwords do not match
      Alert.alert(t('Password mismatch'), t('Password and confirm password do not match.'));
    }
  };

  const handlerBackLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Register here')}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t('User name')}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={t('Email')}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder={t('Password')}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={t('Confirm Password')}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.loginButtons} onPress={handleRegister}>
        <Text style={styles.textButtons}>{t('Continue')}</Text>
      </TouchableOpacity>
      <View style={{ padding: 10 }}></View>
      <TouchableOpacity style={styles.loginButtons} onPress={handlerBackLogin}>
        <Text style={styles.textButtons}>{t('I have an account')}</Text>
      </TouchableOpacity>
    </View>
  );
}
