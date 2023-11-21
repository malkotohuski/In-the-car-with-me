import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Home/styles';

export default function Login({ navigation, route }) {
    /* const navigation = useNavigation(); */

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Add your login logic here
        if (email === 'user@example.com' && password === 'password') {
            // Navigate to the HomeScreen upon successful login
            navigation.navigate('Home');
        } else {
            alert('Login failed. Please check your credentials.');
        }

    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.title}>Login</Text>
            </TouchableOpacity>
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
            <Button title="Submit" onPress={handleLogin} />
            <View style={styles.buttonSeparator} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}
