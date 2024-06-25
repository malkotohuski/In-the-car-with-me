import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

function CustomerDrawer({ navigation }) {
    const { t } = useTranslation();

    const handlerHomeScreen = () => {
        navigation.navigate('Home');
        console.log('Home clicked !!!');
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
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerHomeScreen} >
                        <Icon name="home" size={40} color="#800505" />
                        <Text
                            style={styles.textButtons}
                        >{t('Home')}</Text>
                    </TouchableOpacity>
                </View >
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerRouteViewer} >
                        <Icon name="streetview" size={40} color="#43B30F" />
                        <Text
                            style={styles.textButtons}
                        >{t('View routes')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerUsersScreen} >
                        <Icon name="emoji-people" size={40} color="#081486" />
                        <Text
                            style={styles.textButtons}
                        >{t('Users')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerReporting} >
                        <Icon name="report" size={40} color="#FFFFFF" />
                        <Text
                            style={styles.textButtons}
                        >{t('Reporting')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerRequest} >
                        <Icons name="routes" size={40} color="#010101" />
                        <Text
                            style={styles.textButtons}
                        >{t('Route request')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerSettings} >
                        <Icon name="settings" size={40} color="#AAB82E" />
                        <Text
                            style={styles.textButtons}
                        >{t('Settings')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topLeft}>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerLogout} >
                        <Icons name="logout" size={40} color="#010101" />
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
        paddingHorizontal: 20, // добавено за подравняване наляво
    },
    topLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20, // adjust as needed
    },
    textButtons: {
        marginLeft: 10, // adjust as needed
        color: '#FFFFFF', // text color
        fontSize: 20, // text size
        fontWeight: 'bold', // text weight
    },
})

export default CustomerDrawer;