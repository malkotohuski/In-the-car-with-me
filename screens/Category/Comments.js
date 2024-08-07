
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Comments = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={require('../../images/user-background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.mainContent}>
                <View style={styles.header}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                        {t('Routes History')}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icons name="keyboard-backspace" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>{t('Comments')}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        backgroundColor: '#f4511e',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default Comments;
