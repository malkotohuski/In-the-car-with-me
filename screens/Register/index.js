import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';


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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    buttonSeparator: {
      height: 10,
    },
  });