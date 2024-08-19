import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../Authentication/AuthContext';

function CustomerDrawer({ navigation }) {
    const { t } = useTranslation();
    const { user } = useAuth();

    const handlerHomeScreen = () => {
        navigation.navigate('Home');
        console.log('Home clicked !!!');
        console.log('dfsdf', user);
    }

    const handlerRouteViewer = () => {
        navigation.navigate('View routes')
        console.log('Route viewer clicked !!!');
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
        <View style={styles.mainContainer}>
            <Image
                source={require('../../images/d6.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.drawerContainer}>
                <View style={styles.userInfoContainer}>
                    <Icons name="account-circle" size={30} color="#fff" style={styles.userIcon} />
                    <Text style={styles.userInfo}>
                        {user?.user?.username}
                    </Text>
                </View>
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
                        <Icon name="streetview" size={30} color="#DBF023" />
                        <Text
                            style={styles.textButtons}
                        >{t('View routes')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerUsersScreen} >
                        <Icon name="streetview" size={30} color="#14B351" />
                        <Text
                            style={styles.textButtons}
                        >{t('Users')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerReporting} >
                        <Icon name="report" size={30} color="#960D0D" />
                        <Text
                            style={styles.textButtons}
                        >{t('Reporting')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerRequest} >
                        <Icons name="routes" size={30} color="#010101" />
                        <Text
                            style={styles.textButtons}
                        >{t('Route request')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerSettings} >
                        <Icon name="settings" size={30} color="#CAC8C8" />
                        <Text
                            style={styles.textButtons}
                        >{t('Settings')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerLogout} >
                        <Icons name="logout" size={30} color="#FF7B00" />
                        <Text
                            style={styles.textButtons}
                        >{t('Logout')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
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
    drawerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0,
        alignItems: 'flex-start',
        marginTop: 15, // adjust as needed
        width: '100%', // Ensure drawerContainer takes the full width of the screen
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0721B6', // Фон за по-индивидуално излъчване
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
        width: '100%',
        alignSelf: 'center', // Центриране
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    userIcon: {
        marginRight: 10, // Разстояние между иконата и текста
    },
    userInfo: {
        color: '#fff', // Бял цвят за текста
        fontSize: 18, // По-голям шрифт
        fontWeight: 'bold',
    },
    topLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20, // adjust as needed
        width: '100%', // Ensure topLeft takes the full width of the screen
        borderRadius: 10,
    },
    drawerScreen: {
        alignItems: 'center',
        padding: 20, // Increased padding for larger buttons
        marginBottom: 10, // Increased margin for spacing
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '100%', // Make button full width
        flexDirection: 'row', // To ensure icon and text are aligned correctly
    },
    textButtons: {
        marginLeft: 20, // Increased margin for better spacing
        color: '#010101', // text color
        fontSize: 24, // Increased text size
        fontWeight: 'bold', // text weight
    },
});

export default CustomerDrawer;