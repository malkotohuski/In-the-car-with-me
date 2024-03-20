import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

    const handlerReporting = () => {
        navigation.navigate('Reporting')
        console.log('Reporting clicked !!!');
    }

    return (
        <View style={styles.mainContainer}>
            <Image
                source={require('../../images/drawer3.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.drawerContainer}>
                <View>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerHomeScreen} >
                        <Icon name="home" />
                        <Text
                            style={styles.textButtons}
                        >{t('Home')}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerRouteViewer} >
                        <Icon name="streetview" />
                        <Text
                            style={styles.textButtons}
                        >{t('View routes')}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.drawerScreen} onPress={handlerReporting} >
                        <Icon name="report" />
                        <Text
                            style={styles.textButtons}
                        >{t('Reporting')}</Text>
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
        justifyContent: 'center'
    },
    color: '#010101',
    fontSize: 20,
    fontWeight: 'bold',
})


export default CustomerDrawer;