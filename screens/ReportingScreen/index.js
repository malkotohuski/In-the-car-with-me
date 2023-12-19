import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ReportingScreen = () => {
    const [problemDescription, setProblemDescription] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [isValidVehicleNumber, setValidVehicleNumber] = useState(true);

    const validateVehicleNumber = (text) => {
        const regex = /^([A-ZА-Я]{1,2})([0-9]{4})([A-ZА-Я]{2})$/;
        const isValid = regex.test(text);
        setValidVehicleNumber(isValid);
        setVehicleNumber(text);
    };

    const chooseImage = async () => {
        try {
            const response = await ImagePicker.openPicker({
                multiple: false,
                cropping: true,
                cropperCircleOverlay: true,
                mediaType: 'photo',
            });

            setAttachment(response);
        } catch (error) {
            console.warn('Image picker error:', error);
        }
    };

    const sendReport = () => {
        if (!attachment) {
            // Handle the case where no attachment is selected
            console.warn('Please choose a photo or video.');
            return;
        }
        const serverEndpoint = 'https://your-backend-server.com/report';
        const reportData = {
            problemDescription,
            vehicleNumber,
            attachment: {
                uri: attachment.uri,
                type: attachment.type,
                name: attachment.fileName,
            },
        };

        // Make a POST request to the server
        fetch(serverEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log('Report sent successfully:', data);
                // You can perform any additional actions here, such as showing a confirmation message
            })
            .catch(error => {
                console.error('Error sending report:', error);
                // Handle errors, e.g., show an error message to the user
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Describe the problem"
                multiline
                value={problemDescription}
                onChangeText={(text) => setProblemDescription(text)}
            />
            <TextInput
                style={[styles.input, !isValidVehicleNumber && styles.invalidInput]}
                placeholder="Enter the vehicle number"
                value={vehicleNumber}
                onChangeText={validateVehicleNumber}
            />
            <TouchableOpacity onPress={chooseImage} style={styles.imagePicker}>
                <Text>Choose Photo or Video</Text>
            </TouchableOpacity>
            {attachment && <Image source={{ uri: attachment.uri }} style={styles.attachmentPreview} />}
            <Button title="Send the Signal" onPress={sendReport} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    imagePicker: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
        alignItems: 'center',
    },
    attachmentPreview: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    invalidInput: {
        borderColor: 'red', // Customize the style for invalid input
    },
});

export default ReportingScreen;
