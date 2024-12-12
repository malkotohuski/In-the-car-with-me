import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    SafeAreaView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { useAuth } from '../Authentication/AuthContext';

const API_BASE_URL = 'http://10.0.2.2:3000';
const api = axios.create({
    baseURL: API_BASE_URL,
});

const AccountSettings = ({ navigation }) => {
    const { user, updateProfilePicture } = useAuth();
    const [profilePicture, setProfilePicture] = useState(null);
    const { t } = useTranslation();
    const noImage = require('../../images/emptyUserImage.png')

    const handleImagePicker = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
            });
            if (image?.path || image?.uri) {
                setProfilePicture(image.path || image.uri);
            }
        } catch (error) {
            console.log('ImagePicker Error: ', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            // Актуализиране на профилната снимка в контекста
            updateProfilePicture(profilePicture);

            // Изпращане на промените към сървъра
            await api.patch('/user-changes', {
                userId: user.user.id,
                userImage: profilePicture,
            });

            // Навигация към екрана AccountManager
            navigation.navigate('AccountManager');
        } catch (error) {
            Alert.alert(
                t('Profile picture change error'),
                t('There was an error while changing the profile picture')
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../images/acountSettings.png')} style={styles.backgroundImage} />
            <View style={styles.userInfoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>{t('Username')}:</Text>
                    <Text style={styles.value}>{user?.user?.username}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>{t('Full Name')}:</Text>
                    <Text style={styles.value}>{user?.user?.fName} {user?.user?.lName}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>{t('Email')}:</Text>
                    <Text style={styles.value}>{user?.user?.email}</Text>
                </View>
            </View>
            <View style={styles.userInfoContainerPhoto}>
                <TouchableOpacity onPress={handleImagePicker} style={styles.profilePictureContainer}>
                    <Image
                        source={profilePicture ? { uri: profilePicture } : noImage}
                        style={styles.profilePicture}
                    />
                </TouchableOpacity>
                <Text style={styles.photoText}>{t('Change Photo')}</Text>
            </View>
            <View style={styles.userInfoContainerChanges}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>{t('Save changes')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    userInfoContainer: {
        width: '90%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginTop: 30
    },
    userInfoContainerPhoto: {
        justifyContent: 'center',
        paddingBottom: 10,
        marginBottom: 30
    },
    userInfoContainerChanges: {
        position: 'absolute',
        bottom: 30,
        width: '90%',
        alignItems: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#010101',
        marginRight: 10,
    },
    value: {
        fontSize: 16,
        color: '#010101',
        flexShrink: 1, // За да се гарантира правилно подравняване при дълги стойности
    },
    userInfoText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#010101',
        marginVertical: 4,
    },
    profilePictureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#fff',
    },
    profilePicture: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    photoText: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#010101',
        fontWeight: 'bold'
    },
    addPhotoText: {
        fontSize: 16,
        color: '#007aff',
        textDecorationLine: 'underline',
    },
    saveButton: {
        backgroundColor: '#f4511e',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AccountSettings;
