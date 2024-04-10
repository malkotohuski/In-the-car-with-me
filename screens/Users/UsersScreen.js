import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useAuth } from "../Authentication/AuthContext";
import { useTranslation } from 'react-i18next';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

function UsersScreen({ navigation }) {
    const { user } = useAuth();
    const { t } = useTranslation();
    const { profilePicture } = useAuth();
    const defaultProfilePicture = user?.user?.userImage;

    return (
        <View style={styles.container}>
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
            <View style={styles.header}  >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    {t('User info')}:
                </Text>
                <View style={{ width: 60 }} />
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icons name="keyboard-backspace" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View>
                <View style={[styles.profilePictureContainer, styles.topRight]}>
                    <Image
                        source={{ uri: profilePicture || defaultProfilePicture }}
                        style={styles.profilePicture}
                    />
                </View>
                <View>
                    <Text style={[styles.userInfoContainer, styles.topLeftUserNames]}>
                        {t('Username')} : {user?.user?.username}
                    </Text>
                    <Text style={[styles.userInfoContainer, styles.topLeftNames]}>
                        {t('Names')} :  {user?.user?.fName} {user?.user?.lName}
                    </Text>
                    <Text style={[styles.userInfoContainer, styles.topLeftEmail]}>
                        {t('Еmail')} : {user?.user?.email}
                    </Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={[styles.userInfoContainer, styles.center]}>
                        {t('Your rating')}
                    </Text>
                    <View style={styles.ratingStars}>
                        <Icons name="star" size={54} color="gold" />
                        <Icons name="star" size={54} color="gold" />
                        <Icons name="star" size={54} color="gold" />
                        <Icons name="star-half" size={54} color="gold" />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
        fontWeight: 'bold',
        color: '#010101'
    },
    ratingContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topLeftNames: {
        position: 'absolute',
        top: 55,
        left: 0,
        marginBottom: 15, // Adjust this value as needed for spacing
        marginLeft: 20, // Adjust this value as needed for spacing
        zIndex: 1, // To ensure it appears on top of other elements
        fontSize: 16,
        fontWeight: 'bold',
        color: '#010101'
    },
    topLeftEmail: {
        position: 'absolute',
        top: 95,
        left: 0,
        marginBottom: 15, // Adjust this value as needed for spacing
        marginLeft: 20, // Adjust this value as needed for spacing
        zIndex: 1, // To ensure it appears on top of other elements
        fontSize: 16,
        fontWeight: 'bold',
        color: '#010101'
    },
    center: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 135,
        marginBottom: 15, // Adjust this value as needed for spacing
        marginLeft: 20, // Adjust this value as needed for spacing
        zIndex: 1, // To ensure it appears on top of other elements
        fontSize: 26,
        fontWeight: 'bold',
        color: '#010101'
    },
    topRight: {
        position: 'absolute',
        top: 3,
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
        borderColor: '#010101',
        borderWidth: 2,
        padding: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    userVehicle: {
        alignItems: 'center',
        backgroundColor: '#f4511e',
        padding: 10,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#010101'
    },
    usernameChangeButton: {
        alignItems: 'center',
        backgroundColor: '#f4511e',
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#010101'
    },
    usernameText: {
        color: '#010101',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    ratingStars: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        top: 220,
    },
});

export default UsersScreen;