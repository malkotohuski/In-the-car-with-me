import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../Authentication/AuthContext';

const ReportingScreen = ({ navigation }) => {
    const [problemDescription, setProblemDescription] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [isValidVehicleNumber, setValidVehicleNumber] = useState(true);
    const { t } = useTranslation();
    const { user } = useAuth();
    const userEmail = user?.user?.email;

    const validateVehicleNumber = (text) => {
        const regex = /^([A-ZА-Я]{1,2})([0-9]{4})([A-ZА-Я]{2})$/;
        const isValid = regex.test(text);
        setValidVehicleNumber(isValid);
        setVehicleNumber(text);
    };

    const chooseImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
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
            console.warn('Image picker error:', error);
        }
    };


    const sendReport = async () => {
        try {
            const serverEndpoint = 'http://10.0.2.2:3000/send-request-to-email';
            const reportData = {
                problemDescription,
                vehicleNumber,
                attachment: {
                    uri: attachment?.uri,
                    type: attachment?.type,
                    name: attachment?.fileName,
                },
            };

            const emailBody = `
                ${t('Problem Description')}: ${reportData.problemDescription}
                ${t('Vehicle Number')}: ${reportData.vehicleNumber}
                ${t('User Email')}: ${userEmail || 'N/A'}
                ${attachment ? '' : t('Please choose a photo or video')}
            `;

            const options = {
                subject: t('Reporting Issue'),
                body: emailBody,
                recipients: ['malkotohuski@gmail.com'],
                attachment: attachment
                    ? {
                        path: reportData.attachment.uri,
                        type: reportData.attachment.type,
                        name: reportData.attachment.name,
                    }
                    : null,
            };

            // fetch за изпращане на заявка към сървъра
            const response = await fetch(serverEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'malkotohuski@gmail.com',
                    text: emailBody, //  изпраща целият текст
                }),
            })
                .then(response => response.json())
                .catch(error => {
                    console.error('Error:', error);
                    throw error;
                });

            console.log(t('Report sent successfully:'), response);
        } catch (error) {
            console.error('Error sending report:', error);
        }
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
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            {t('Choose Photo or Video')}
                        </Text>
                    </TouchableOpacity>
                    {profilePicture &&
                        <View style={styles.show_image}>
                            <Image source={{ uri: profilePicture }} style={styles.attachmentPreview} />
                        </View>
                    }
                </View>

                <View style={styles.footer_container}>
                    <TouchableOpacity
                        onPress={sendReport}
                        style={styles.send_button}
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
        marginTop: 56,
        alignItems: 'center',
        borderColor: '#f1f1f1',
        borderWidth: 2,
    },
    attachmentPreview: {
        width: '100%',
        height: 300,
        borderRadius: 2,
        borderColor: '#f1f1f1',
        borderWidth: 2,
    },
    show_image: {

    },
    invalidInput: {
        borderColor: 'red', // Customize the style for invalid input
    },
    send_button: {
        backgroundColor: '#f4511e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#f1f1f1',
        borderWidth: 2,
    },
    footer_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        padding: 10,
        marginTop: 'auto',
    }
});

export default ReportingScreen;
