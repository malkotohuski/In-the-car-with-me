import { useTranslation } from 'react-i18next';
import React, { useState, useContext } from 'react';
import { View, TextInput, Alert, Image, TouchableOpacity, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../Authentication/AuthContext';
import { DarkModeContext } from '../DrawerContent/DarkModeContext';

const ReportingScreen = ({ navigation }) => {
    const { darkMode } = useContext(DarkModeContext);
    const [problemDescription, setProblemDescription] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [isValidVehicleNumber, setValidVehicleNumber] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Добавено състояние
    const { t } = useTranslation();

    const { user } = useAuth();
    const userEmail = user?.user?.email;
    const userName = user?.user?.username;
    const userId = user?.user?.id;

    const getHeaderStyles = () => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        backgroundColor: darkMode ? '#333232FF' : '#f4511e',
    })

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
                setProfilePicture(image.path);
            } else if (image.uri) {
                setProfilePicture(image.uri);
            }
        } catch (error) {
            console.warn('Image picker error:', error);
        }
    };

    const sendReport = async () => {
        if (isButtonDisabled) return; // Бутонът не е активен

        if (!problemDescription.trim() || !vehicleNumber.trim()) {
            Alert.alert(
                t('Missing Fields'),
                t('Please fill out all fields!')
            );
            return;
        }

        try {
            setIsButtonDisabled(true); // Деактивиране на бутона
            const serverEndpoint = 'http://10.0.2.2:3000/send-request-to-email';
            const emailBody = `
                ${t('Problem Description')}: ${problemDescription}
                ${t('Vehicle Number')}: ${vehicleNumber}
                ${t('User email:')}: ${userEmail || 'N/A'} ${t('Username:')}: ${userName} with ID: ${userId}
            `;

            await fetch(serverEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'malkotohuski@gmail.com', text: emailBody }),
            });

            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
                setProblemDescription(''); // Изчистване на полето
                setVehicleNumber(''); // Изчистване на полето
                setIsButtonDisabled(false); // Активиране на бутона отново, ако е нужно
                navigation.navigate('Home');
            }, 5000);
        } catch (error) {
            console.error('Error sending report:', error);
            setIsButtonDisabled(false); // Активиране на бутона при грешка
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Image
                    source={require('../../images/road-wallpapers-reporting.jpg')}
                    style={styles.backgroundImage}
                />
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <View style={getHeaderStyles()}>
                        <Text style={styles.headerText}>{t('Reporting')}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Icons name="keyboard-backspace" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        {showSuccessMessage && (
                            <Animatable.Text
                                animation="pulse"
                                iterationCount="infinite"
                                style={styles.successMessage}
                            >
                                {t('The signal has been sent!')}
                            </Animatable.Text>
                        )}
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
                            placeholder={t("Enter your vehicle registration number or username!")}
                            placeholderTextColor={'#F1F1F1'}
                            value={vehicleNumber}
                            onChangeText={validateVehicleNumber}
                            multiline
                            textAlignVertical="center"
                        />
                        <TouchableOpacity onPress={chooseImage} style={styles.imagePicker}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                {t('Choose Photo or Video')}
                            </Text>
                        </TouchableOpacity>
                        {profilePicture && (
                            <View style={styles.show_image}>
                                <Image source={{ uri: profilePicture }} style={styles.attachmentPreview} />
                            </View>
                        )}
                    </View>
                    <View style={styles.footer_container}>
                        <TouchableOpacity
                            onPress={sendReport}
                            style={[styles.send_button, isButtonDisabled && styles.disabledButton]} // Стил за деактивиран бутон
                            disabled={isButtonDisabled} // Деактивиране на бутона
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                {t("Send the Signal")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        padding: 16,
        backgroundColor: '#f4511e',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 120,
        borderColor: 'white',
        borderWidth: 2,
        marginBottom: 16,
        padding: 8,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center', // Центриране на текста
    },
    inputVehicle: {
        height: 100,
        borderColor: 'white',
        borderWidth: 2,
        marginBottom: 16,
        padding: 8,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center', // Центриране на текста
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
    show_image: {},
    invalidInput: {
        borderColor: 'red',
    },
    send_button: {
        backgroundColor: '#f4511e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#f1f1f1',
        borderWidth: 2,
    },
    disabledButton: {
        backgroundColor: 'gray', // Стил за неактивен бутон
    },
    footer_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        padding: 10,
        marginTop: 'auto',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successMessage: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default ReportingScreen;
