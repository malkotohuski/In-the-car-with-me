import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Home/styles';


export default function Register() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle registration logic when the "Register" button is pressed
  const handleRegister = () => {
    if (email === 'user@example.com' && password === 'password') {
      // Navigate to the HomeScreen upon successful login
      navigation.navigate('Home');
    } else {
      alert('Registration completed. Name: ' + name + ', Email: ' + email + ', Password: ' + password);
    }
    // Implement your registration logic here

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Submit" onPress={handleRegister} />
    </View>
  );
}

