import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    homepage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'grey',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Леко затъмняване
    },
    centeredTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    heading: {
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    moto: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center',
        color: '#FFFFFF'
    },
    languageSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    languageButton: {
        alignItems: 'center',
    },
    flagImage: {
        width: 50, // Adjust the size as needed
        height: 50, // Adjust the size as needed
        borderRadius: 25, // Half of the width and height to make it round
        marginBottom: 5, // Adjust the spacing as needed
    },
    languageText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#FAFAFA'
    },
    languageButton: {
        alignItems: 'center',
    },
    menuImages: {
        paddingVertical: 20,
        paddingBottom: 20,
    },
    vehicleButton: {
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    textButtons: {
        fontSize: 20,
        color: '#010101',
        fontWeight: '800',
    },
    routeRequestButton: {
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#000000',
        width: 420,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    routeViewerButton: {
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    reportingButton: {
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        fontSize: 24,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',  // Центриране на иконите вертикално
        paddingVertical: 10,
        backgroundColor: '#f4511e',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10,
        paddingHorizontal: 0,
    },
    footerIcon: {
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f1f1f1', // Цветът на иконките, промени го според нуждите си
        justifyContent: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
