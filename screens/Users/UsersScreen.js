import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useAuth } from "../Authentication/AuthContext";
import { useTranslation } from 'react-i18next';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

function UsersScreen({ navigation }) {
    const { user } = useAuth();
    const { t } = useTranslation();
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
            <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                <Text style={[styles.userTextContainer, styles.topLeftUsername]}>
                    {t('Username')} : {user?.user?.username}
                </Text>
                <Text style={[styles.userTextContainer, styles.topLeftFullName]}>
                    {t('Full Name')} : {user?.user?.fName} {user?.user?.lName}
                </Text>
                <Text style={[styles.userTextContainer, styles.topLeftEmail]}>
                    {user?.user?.email}
                </Text>
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
});

export default UsersScreen;