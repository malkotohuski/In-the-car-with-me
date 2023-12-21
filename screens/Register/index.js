import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Home/styles';
import { useTranslation } from 'react-i18next';


export default function Register() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassowrd, setConfirmPassowrd] = useState('');

  const handleRegister = () => {
    if (email === 'user@example.com' && password === 'password' && confirmPassowrd === 'password') {
      alert('Registration completed.')
      navigation.navigate('Home');
    } else if (password !== confirmPassowrd) {
      alert(t('password and confirm passowrd do not match'))
    }
  };
  /* alert('Registration completed. Name: ' + name + ', Email: ' + email + ', Password: ' + password); */
  const handlerBackLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Register here')}:</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Name")}
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      <TextInput
        style={styles.input}
        placeholder={t("Confirm Password")}
        secureTextEntry={true}
        value={confirmPassowrd}
        onChangeText={(text) => setConfirmPassowrd(text)}
      />
      <TouchableOpacity
        style={styles.loginButtons}
        onPress={handleRegister}
      >
        <Text style={styles.textButtons}>
          {t("Register")}
        </Text>
      </TouchableOpacity>
      <View
        style={{ padding: 10 }}>
      </View>
      <TouchableOpacity
        style={styles.loginButtons}
        onPress={handlerBackLogin}
      >
        <Text style={styles.textButtons}>
          {t("Log in")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

