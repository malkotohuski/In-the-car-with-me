import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
    ScrollView,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

function MarkSeatsScreen() {
    const { t } = useTranslation();
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [showInvalidRegistrationAlert, setShowInvalidRegistrationAlert] = useState(false);
    const [carNumber, setCarNumber] = useState(null);

    const route = useRoute();
    const selectedVehicle = route.params.selectedVehicle;
    const navigation = useNavigation();

    const handleCarNumber = (value) => {
        setCarNumber(value);
    };

    const isValidRegistrationNumber = () => {
        const regex = /^([A-ZA-ZА-ЯА-Я]{1,2})([0-9]{4})([A-ZA-ZА-ЯА-Я]{2})$/;
        return regex.test(registrationNumber);
    };

    const handleContinue = () => {
        if (!isValidRegistrationNumber()) {
            Alert.alert(t('Invalid Registration Number'), t('Please enter a valid registration number.'));
            return;
        }
        setShowInvalidRegistrationAlert(false);
        navigation.navigate('SelectRoute', {
            selectedVehicle,
            registrationNumber,
        });
    };

    const handlerBackToVehicle = () => {
        navigation.navigate('Vehicle');
    };

    // Изчистване на полето при връщане към екрана
    useFocusEffect(
        React.useCallback(() => {
            setRegistrationNumber(''); // Нулиране на регистрационния номер
            setShowInvalidRegistrationAlert(false); // Скриване на съобщението за грешка
        }, [])
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image
                    source={require('../../images/register-number-background.jpg')}
                    style={styles.backgroundImage}
                />
                <Text style={styles.title}>
                    {t('Type')}: {selectedVehicle}
                </Text>

                <TextInput
                    placeholder={t('Enter Registration Number')}
                    placeholderTextColor="#F1F1F1"
                    onValueChange={(value) => handleCarNumber(value)}
                    onChangeText={setRegistrationNumber}
                    value={registrationNumber} // Свързване на стойността с полето за въвеждане
                    style={styles.input}
                    autoFocus
                />

                {registrationNumber && <Text style={styles.label}>{t('Registration Number')}:</Text>}
                <Text style={styles.value}>{registrationNumber}</Text>

                {showInvalidRegistrationAlert && (
                    <Text style={styles.alertText}>{t('Invalid registration number format')}</Text>
                )}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleContinue}
                        style={[
                            styles.button,
                            { backgroundColor: isValidRegistrationNumber() ? '#f4511e' : 'black' },
                        ]}
                    >
                        <Text style={styles.buttonText}>{t('Continue')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlerBackToVehicle} style={styles.backButton}>
                        <Text style={styles.buttonText}>{t('Back to Vehicle')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    scrollContent: { flexGrow: 1, alignItems: 'center' },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    title: { fontSize: 20, fontWeight: 'bold', color: '#F1F1F1', marginTop: 40 },
    input: {
        height: 50,
        borderColor: '#F1F1F1',
        borderWidth: 2,
        margin: 10,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#000000',
        borderRadius: 8,
        width: '80%',
        marginTop: 50,
    },
    label: { color: '#F1F1F1', fontSize: 20, fontWeight: 'bold' },
    value: { fontSize: 20, fontWeight: 'bold', color: '#F1F1F1' },
    alertText: { color: '#FF4500', fontSize: 20, fontWeight: 'bold' },
    buttonContainer: {
        marginTop: 250, // Преместете бутоните надолу към желаната позиция
        alignItems: 'center',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#f4511e',
        height: 70,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 250,
        borderWidth: 2,
        borderColor: '#f1f1f1',
    },
    backButton: {
        marginTop: 10,
        backgroundColor: '#f4511e',
        height: 70,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 250,
        borderWidth: 2,
        borderColor: '#f1f1f1',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MarkSeatsScreen;
