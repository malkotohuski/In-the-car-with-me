import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

export default function MyAccount() {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    const handleProfilePicSelect = () => {
        // Implement logic to choose a profile picture
        // This could involve using a library like react-native-image-picker
        // For simplicity, let's assume the user selects a local image file
        /*     setProfilePic(require('./path/to/defaultProfilePic.jpg')); */
    };
    return (
        <View style={styles.container}>
            {/* Container for profile picture at top right */}
            <View style={styles.profileContainer}>
                {profilePic && <Image source={profilePic} style={styles.profilePic} />}
                <Button title="Select Profile Picture" onPress={handleProfilePicSelect} />
            </View>

            {/* Name Input */}
            <Text>Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
            />

            {/* Lastname Input */}
            <Text>Lastname:</Text>
            <TextInput
                style={styles.input}
                value={lastname}
                onChangeText={(text) => setLastname(text)}
            />

            {/* Email Input */}
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
    profileContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
        alignItems: 'center',
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 8,
    },
});