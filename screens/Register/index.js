// Register.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import styles from '../Home/styles';
import { useTranslation } from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import { useAuth } from '../Authentication/AuthContext';

const API_BASE_URL = 'http://10.0.2.2:3000'; // Update with your JSON server URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

export default function Register({ navigation }) {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showConfirmationCodeInput, setShowConfirmationCodeInput] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });

      if (image.path) {
        // Local image
        setProfilePicture(image.path);
      } else if (image.uri) {
        // Remote image
        setProfilePicture(image.uri);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const handleRegister = async () => {
    if (!showConfirmationCodeInput) {
      // Continue with the registration process up to sending the confirmation code
      if (password === confirmPassword) {
        if (email.includes('@') && email.includes('.') && email.length >= 5) {
          try {
            // Make a POST request to the registration endpoint
            const response = await api.post('/register', {
              username: name,
              useremail: email,
              userpassword: password,
              fName: firstName,
              lName: lastName,
              img: profilePicture,
            });

            console.log('Registration Response:', response);

            if (response.status === 201) {
              // Registration successful, update the global state with user data
              login(response.data);
              // Show the confirmation code input field
              setShowConfirmationCodeInput(true);
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
    } else {
      // Continue with the confirmation code verification step
      try {
        // Make a request to the server to verify the confirmation code
        const verificationResponse = await api.post('/verify-confirmation-code', {
          email,
          confirmationCode,
        });

        if (verificationResponse.status === 200) {
          // Confirmation code verified, navigate to the welcome screen
          navigation.navigate('WelcomeScreen', {
            name,
            email,
            password,
            firstName,
            lastName
          });
        } else {
          // Handle verification failure
          Alert.alert(t('Verification Error'), t('Invalid confirmation code. Please try again.'));
        }
      } catch (error) {
        // Handle any error that occurred during the API call
        console.error('Verification Error:', error);
        Alert.alert(t('Verification Error'), t('Failed to verify confirmation code. Please try again.'));
      }
    }
  };

  const handlerBackLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleImagePicker}
        style={[styles.profilePictureContainer, styles.topRight]}
      >
        {profilePicture ? (
          <Image
            source={{ uri: profilePicture }}
            style={styles.profilePicture}
          />
        ) : (
          <Text style={styles.addPhotoText}>
            {t('Add Profile Picture')}
          </Text>
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{t('Register here')}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t('User name')}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={t('First name')}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={t('Last name')}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
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
      {showConfirmationCodeInput && (
        <TextInput
          style={styles.input}
          placeholder={t('Confirmation Code')}
          value={confirmationCode}
          onChangeText={(text) => setConfirmationCode(text)}
        />
      )}
      <TouchableOpacity style={styles.loginButtons} onPress={handleRegister}>
        <Text style={styles.textButtons}>
          {!showConfirmationCodeInput ? t('Continue') : t('Verify Confirmation Code')}
        </Text>
      </TouchableOpacity>
      <View style={{ padding: 10 }}></View>
      <TouchableOpacity style={styles.loginButtons} onPress={handlerBackLogin}>
        <Text style={styles.textButtons}>{t('I have an account')}</Text>
      </TouchableOpacity>
    </View>
  );
}
