import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../Authentication/AuthContext';

const { width, height } = Dimensions.get('window'); // За адаптивност на различни екрани

function CustomerDrawer({ navigation }) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const noImage = require('../../images/emptyUserImage.png');
    const profilePicture = user?.user?.userImage;

    const handlerAccountScreen = () => {
        navigation.navigate('AccountManager');
        console.log('AccountManager clicked !!!');
    }

    const handlerHomeScreen = () => {
        navigation.navigate('Home');
        console.log('Home clicked !!!');
    }

    const handlerRouteViewer = () => {
        navigation.navigate('RoutesHistory')
        console.log('Routes History clicked !!!');
    }

    const handlerUsersScreen = () => {
        navigation.navigate('UsersScreen')
        console.log('Users Screen clicked !!!');
    }

    const handlerReporting = () => {
        navigation.navigate('Reporting')
        console.log('Reporting clicked !!!');
    }

    const handlerRequest = () => {
        navigation.navigate('Route request')
        console.log('Route request clicked !!!');
    }

    const handlerSettings = () => {
        navigation.navigate('Settings')
        console.log('Settings clicked !!!');
    }

    const handlerLogout = () => {
        navigation.navigate('LogoutScreen')
        console.log('Logout clicked !!!');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flex: 1, backgroundColor: 'grey' }}
                showsVerticalScrollIndicator={false} // Скрива скрол индикатора (по желание)
            >
                <View style={styles.mainContainer}>
                    <Image
                        source={require('../../images/d6.png')}
                        style={styles.backgroundImage}
                    />
                    <View style={styles.drawerContainer}>
                        <TouchableOpacity style={styles.userInfoContainer} onPress={handlerAccountScreen}>
                            <Image source={profilePicture ? { uri: profilePicture } : noImage} style={styles.userImage} />
                            <Text style={styles.userInfo}>
                                {user?.user?.username}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.topLeft}>
                            <TouchableOpacity style={styles.drawerScreen} onPress={handlerHomeScreen} >

                                <Icon name="home" size={30} color="#0721B6" />

                                <Text
                                    style={styles.textButtons}
                                >{t('Home')}
                                </Text>
                            </TouchableOpacity>
                        </View >
                        <View style={styles.topLeft}>
                            <TouchableOpacity style={styles.drawerScreen} onPress={handlerRouteViewer} >
                                <Icon name="streetview" size={30} color="#0721B6" />
                                <Text
                                    style={styles.textButtons}
                                >{t('Routes History')}</Text>
                            </TouchableOpacity>
                        </View>
                        {/*     <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerUsersScreen} >
                        <Icon name="streetview" size={30} color="#0721B6" />
                        <Text
                            style={styles.textButtons}
                        >{t('Users')}</Text>
                    </TouchableOpacity>
                </View> */}
                        <View style={styles.topLeft}>
                            <TouchableOpacity style={styles.drawerScreen} onPress={handlerReporting} >
                                <Icon name="report" size={30} color="#0721B6" />
                                <Text
                                    style={styles.textButtons}
                                >{t('Reporting')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topLeft}>
                            <TouchableOpacity style={styles.drawerScreen} onPress={handlerRequest} >
                                <Icons name="routes" size={30} color="#0721B6" />
                                <Text
                                    style={styles.textButtons}
                                >{t('Route request')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topLeft}>
                            <TouchableOpacity style={styles.drawerScreen} onPress={handlerSettings} >
                                <Icon name="settings" size={30} color="#0721B6" />
                                <Text
                                    style={styles.textButtons}
                                >{t('Settings')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topLeft}>
                            <TouchableOpacity style={styles.drawerScreen} onPress={handlerLogout} >
                                <Icons name="logout" size={30} color="#0721B6" />
                                <Text
                                    style={styles.textButtons}
                                >{t('Logout')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    drawerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: '100%',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0721B6',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
        width: '100%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'hidden', // предотвратява излизането на съдържание
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 50,
    },
    userIcon: {
        marginRight: 10,
    },
    userInfo: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        flexShrink: 1, // ограничава размера на текста
        flexWrap: 'wrap', // пренася текста на нов ред, ако е нужно
        maxWidth: '75%', // задава максимална ширина за текста
    },
    topLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        borderRadius: 10,
    },
    drawerScreen: {
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 2, // Премахване на границата
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '100%',
        flexDirection: 'row',
        borderRadius: 15, // Закръглени ръбове
    },
    textButtons: {
        marginLeft: 5, // adjust as needed
        color: '#0F0F0FFF', // text color
        fontSize: 20, // text size
        fontWeight: 'bold', // text weight
    },
});

export default CustomerDrawer;