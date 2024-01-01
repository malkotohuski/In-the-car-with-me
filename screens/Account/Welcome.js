import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
    const route = useRoute(); // Define route here
    const captionAnim = useRef(new Animated.Value(-width)).current;

    const userNickName = route.params?.name
    const userEmail = route.params?.email
    const userFirstName = route.params?.firstName
    const userLastName = route.params?.lastName
    const userImage = route.params?.profilePicture

    const animateCaption = () => {
        Animated.timing(captionAnim, {
            toValue: width / 2 - 120, // Adjust the final position as needed
            duration: 300, // Adjust the duration as needed
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        animateCaption();
    }, []);

    const handlerButtonCont = () => {
        navigation.navigate('AccountManager', {
            userNickName,
            userEmail,
            userFirstName,
            userLastName,
            userImage
        });
        console.log('go next clicked');
    }

    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <Image
                source={require('../../images/welocme.webp')}
                style={styles.backgroundImage}
            />

            {/* Caption */}
            <Animated.View
                style={[styles.captionContainer, { left: captionAnim }]}
                onLayout={animateCaption}
            >
                <Text style={styles.captionText}>{t('Welcome')} , {userNickName}</Text>
            </Animated.View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlerButtonCont}
                >
                    <Text style={styles.text}>{t('Go next step')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    captionContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the background color and opacity
        padding: 20,
        borderRadius: 10,
        top: 100
    },
    captionText: {
        color: 'black',
        fontSize: 24,
    },
    buttonContainer: {
        top: 150
    },
    button: {
        backgroundColor: 'coral',
        padding: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
