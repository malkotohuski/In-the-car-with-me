import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Authentication/AuthContext';

const AccountManager = ({ navigation }) => {
    const { user } = useAuth();
    console.log('dfsdf', user);

    const { t } = useTranslation();

    const handlerChangeAcountSettings = () => {
        navigation.navigate('AccountSettings', {
        });
    }

    const handlerHomeScreen = () => {
        navigation.navigate('Home');
        console.log('Home Click !!!');
    }

    return (
        <View style={styles.container}>
            {/* Profile picture */}
            <View style={[styles.profilePictureContainer, styles.topRight]}>
                <Image source={{ uri: user?.user?.userImage }} style={styles.profilePicture} />
            </View>
            {/*User info */}
            <Text style={[styles.userInfoContainer, styles.topLeftUserNames]}>
                {t('Nick name')} : {user?.user?.username}
            </Text>
            <Text style={[styles.userInfoContainer, styles.topLeftNames]}>
                {t('Names')} :  {user?.user?.fName} {user?.user?.lName}
            </Text>
            <Text style={[styles.userInfoContainer, styles.topLeftEmail]}>
                {t('Еmail')} : {user?.user?.email}
            </Text>
            <TouchableOpacity
                style={styles.usernameChangeButton}
                onPress={handlerChangeAcountSettings}
            >
                <Text style={styles.usernameText}>{t('Change user settings')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.userVehicle}
                onPress={handlerHomeScreen}
            >
                <Text style={styles.usernameText}>
                    {t('Lets travel')}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'grey',
    },
    profileInfoContainer: {
        flexDirection: 'row', // Arrange profile picture and user info side by side
        alignItems: 'center',
    },
    userInfoContainer: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 24,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    topLeftUserNames: {
        position: 'absolute',
        top: 15,
        left: 0,
        marginBottom: 15, // Adjust this value as needed for spacing
        marginLeft: 20, // Adjust this value as needed for spacing
        zIndex: 1, // To ensure it appears on top of other elements
        fontSize: 16,
        fontWeight: 'bold'
    },
    topLeftNames: {
        position: 'absolute',
        top: 55,
        left: 0,
        marginBottom: 15, // Adjust this value as needed for spacing
        marginLeft: 20, // Adjust this value as needed for spacing
        zIndex: 1, // To ensure it appears on top of other elements
        fontSize: 16,
        fontWeight: 'bold'
    },
    topLeftEmail: {
        position: 'absolute',
        top: 95,
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
