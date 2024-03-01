import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import { useAuth } from '../Authentication/AuthContext';

const AccountSettings = ({ navigation }) => {
    const { user } = useAuth();
    const [profilePicture, setProfilePicture] = useState('');
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

    const handleSaveChanges = () => {
        if (firstName.length < 1 && lastName.length < 1) {
            Alert.alert(t('Please fill in the fields with *'));
        } else {
            navigation.navigate('AccountManager', {
            });
            console.log('Changes saved');
        };
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../images/Passport-photo-5-1024x683.jpg')}
                style={styles.backgroundImage}
            />
            <Text style={[styles.userTextContainer, styles.topLeft]}>
                {t('Username')} : {user?.user?.username}
            </Text>
            <Text>
                {user?.user?.fName} {user?.user?.lName}
            </Text>
            <Text style={styles.emailContainer}>
                {user?.user?.email}
            </Text>
            {/* Profile picture */}
            <TouchableOpacity
                onPress={handleImagePicker}
                style={[styles.profilePictureContainer, styles.topRight]}
            >
                {profilePicture ? (
                    <Image
                        source={{ uri: user?.user?.userImage }}
                        style={styles.profilePicture}
                    />
                ) : (
                    <Text style={styles.addPhotoText}>
                        {t('Add Profile Picture')}
                    </Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.usernameChangeButton}
                onPress={handleSaveChanges}
            >
                <Text style={styles.usernameText}>{t('Save changes')}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
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
    topLeft: {
        position: 'absolute',
        top: 15,
        left: 0,
        marginBottom: 15, // Adjust this value as needed for spacing
        marginLeft: 20, // Adjust this value as needed for spacing
        zIndex: 1, // To ensure it appears on top of other elements
        fontSize: 16,
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    userTextContainer: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emailContainer: {
        fontSize: 16,
        fontWeight: 'bold',
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
        borderColor: 'black',
        margin: 16
    },
    usernameText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default AccountSettings