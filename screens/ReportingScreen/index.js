import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportingScreen = ({ navigation }) => {
    const [problemDescription, setProblemDescription] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [isValidVehicleNumber, setValidVehicleNumber] = useState(true);
    const { t } = useTranslation();
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
            console.warn(t('Please choose a photo or video.'));
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
                console.log(t('Report sent successfully:'), data);
                // You can perform any additional actions here, such as showing a confirmation message
            })
            .catch(error => {
                console.error('Error sending report:', error);
                // Handle errors, e.g., show an error message to the user
            });
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/road-wallpapers-reporting.jpg')}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    position: 'absolute',
                }}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                <View style={styles.header}  >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                        {t('Reporting')}
                    </Text>
                    <View style={{ width: 60 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        {/* Кастомизирайте бутона за връщане според вашите изисквания */}
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder={t("Describe the problem")}
                        placeholderTextColor={'#F1F1F1'}
                        multiline
                        value={problemDescription}
                        onChangeText={(text) => setProblemDescription(text)}
                    />
                    <TextInput
                        style={[styles.inputVehicle, !isValidVehicleNumber && styles.invalidInput]}
                        placeholder={t("Enter the vehicle number")}
                        placeholderTextColor={'#F1F1F1'}
                        value={vehicleNumber}
                        onChangeText={validateVehicleNumber}
                    />
                    <TouchableOpacity onPress={chooseImage} style={styles.imagePicker}>
                        <Text
                            style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
                        >{t('Choose Photo or Video')}</Text>
                    </TouchableOpacity>
                    {attachment && <Image source={{ uri: attachment.uri }} style={styles.attachmentPreview} />}
                    <TouchableOpacity
                        onPress={sendReport}
                        style={styles.imagePicker}
                    >
                        <Text
                            style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
                        >
                            {t("Send the Signal")}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        padding: 16,
        backgroundColor: '#f4511e',
    },
    input: {
        height: 120,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 16,
        padding: 8,
        borderColor: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputVehicle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 16,
        padding: 8,
        borderColor: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    imagePicker: {
        backgroundColor: '#f4511e',
        padding: 15,
        borderRadius: 5,
        marginBottom: 56,
        alignItems: 'center',
        borderColor: '#f1f1f1',
        borderWidth: 2,
    },
    attachmentPreview: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
        borderRadius: 5,
        padding: 10
    },
    invalidInput: {
        borderColor: 'red', // Customize the style for invalid input
    },
});

export default ReportingScreen;
