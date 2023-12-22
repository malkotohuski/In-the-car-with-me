import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';

const AccountManager = ({ navigation }) => {
    const [profilePicture, setProfilePicture] = useState(null);

    // User information states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const { t } = useTranslation();

    const handleImagePicker = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 300,
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
            console.log('ImagePicker Error: ', error);
        }
    };

    const handlerAddVehicles = () => {
        navigation.navigate('Vehicle');
        console.log('add vehiclesClick !!!');
    }

    const handleSaveChanges = () => {
        // Add logic for saving changes here
        console.log('Changes saved');
    };

    return (
        <View style={styles.container}>
            {/* Profile picture */}
            <TouchableOpacity
                onPress={handleImagePicker}
                style={[styles.profilePictureContainer, styles.topRight]}
            >
                {profilePicture ? (
                    <Image
                        source={{ uri: profilePicture }}
                        style={styles.profilePicture}
                    />
                ) : (
                    <Text style={styles.addPhotoText}>
                        {t('Add Profile Picture')}
                    </Text>
                )}
            </TouchableOpacity>
            <View style={styles.profileInfoContainer}>
                {/* User information */}
                <View style={styles.userInfoContainer}>
                    <Text style={styles.label}>{t('First Name')}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t('Enter first name *')}
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                    />
                    <Text style={styles.label}>{t('Last Name')}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t('Enter last name *')}
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                    />
                    <Text style={styles.label}>{t('Phone Number')}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={t('Enter phone number')}
                        onChangeText={(text) => setPhoneNumber(text)}
                        keyboardType="number-pad"
                        value={phoneNumber}
                    />
                    {/*   <Text style={styles.label}>{t('Yours vehicles')}</Text> */}
                    <TouchableOpacity
                        style={styles.userVehicle}
                        onPress={handlerAddVehicles}
                    >
                        <Text style={styles.usernameText}>
                            {t('Add your vehicle')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={styles.usernameChangeButton}
                onPress={handleSaveChanges}
            >
                <Text style={styles.usernameText}>{t('Save changes')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    profileInfoContainer: {
        flexDirection: 'row', // Arrange profile picture and user info side by side
        alignItems: 'center',
    },
    userInfoContainer: {
        marginLeft: 16,
        flex: 1,
        paddingBottom: 10,
        marginTop: 10
    },
    label: {
        fontSize: 24,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    topRight: {
        position: 'absolute',
        top: 15,
        right: 0,
        marginBottom: 15, // Adjust this value as needed for spacing
        marginRight: 20, // Adjust this value as needed for spacing
        zIndex: 1, // To ensure it appears on top of other elements
    },
    title: {
        fontSize: 30,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    addPhotoText: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'black',
        borderWidth: 2,
        padding: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    userVehicle: {
        alignItems: 'center',
        backgroundColor: 'coral',
        padding: 10,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black'
    },
    usernameChangeButton: {
        alignItems: 'center',
        backgroundColor: 'coral',
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black'
    },
    usernameText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AccountManager;
