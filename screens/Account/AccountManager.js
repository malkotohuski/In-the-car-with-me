import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    ScrollView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Authentication/AuthContext';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window'); // За адаптивност на различни екрани

const AccountManager = ({ navigation }) => {
    const { user } = useAuth();
    const { profilePicture } = useAuth();
    const defaultProfilePicture = require('../../images/emptyUserImage.png')
    const { t } = useTranslation();

    const handlerCommendSection = () => navigation.navigate('Comments');
    const handlerChangeAcountSettings = () => navigation.navigate('AccountSettings');
    const handlerHomeScreen = () => navigation.navigate('Home');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}  >
                <Image
                    source={require('../../images/user-background.jpg')}
                    style={styles.backgroundImage}
                />
                <View style={styles.mainContainer}>
                    <View style={styles.overlay} />
                    {/* Profile Picture Section */}

                    <View style={styles.profilePictureContainer}>
                        <Image
                            source={
                                user?.user?.userImage
                                    ? { uri: user.user.userImage } // Използва снимката от userImage, ако съществува
                                    : defaultProfilePicture // В противен случай, използва снимката по подразбиране
                            }
                            style={styles.profilePicture}
                        />
                    </View>

                    {/* User Info */}
                    <View style={styles.userInfoSection}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>{t('Username')}:</Text>
                            <Text style={styles.infoText}>{user?.user?.username}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>{t('Names')}:</Text>
                            <Text style={styles.infoText}>{user?.user?.fName} {user?.user?.lName}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>{t('Email')}:</Text>
                            <Text style={styles.infoText}>{user?.user?.email}</Text>
                        </View>
                    </View>

                    {/* Rating Section */}
                    <View style={styles.ratingSection}>
                        <Text style={styles.ratingTitle}>{t('Your rating')}</Text>
                        <View style={styles.ratingStars}>
                            <Icons name="star" size={54} color="gold" />
                            <Icons name="star" size={54} color="gold" />
                            <Icons name="star" size={54} color="gold" />
                            <Icons name="star-half" size={54} color="gold" />
                        </View>
                    </View>

                    {/* Buttons Section */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={handlerCommendSection}>
                            <Text style={styles.buttonText}>{t('Comments')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handlerChangeAcountSettings}>
                            <Text style={styles.buttonText}>{t('Change user settings')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handlerHomeScreen}>
                            <Text style={styles.buttonText}>{t('Lets travel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'space-between', // Прави подравняване на секциите по вертикала
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Добавя лек тъмен слой върху изображението
    },
    profilePictureContainer: {
        marginTop: height * 0.05,
        marginBottom: 20,
        alignItems: 'center',
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
    },
    userInfoSection: {
        width: '90%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#010101',
    },
    infoText: {
        fontSize: 16,
        color: '#010101',
    },
    userInfoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 4,
    },
    ratingSection: {
        alignItems: 'center',
    },
    ratingTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    ratingStars: {
        flexDirection: 'row',
    },
    buttonsContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: height * 0.05,
    },
    button: {
        backgroundColor: '#f4511e',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AccountManager;
