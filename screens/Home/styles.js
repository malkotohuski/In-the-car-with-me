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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'grey'
    },
    adBox: {
        flex: 1,
        width: '20%',
        padding: 5,
        height: '80%',
        backgroundColor: '#F1F1F1',
        overflow: 'hidden', // Add this line to hide overflowing content
    },
    adImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Add this line to ensure the entire image is visible
    },
    /*  content: {
         flex: 2,
         width: '60%',
         padding: 10,
     }, */
    heading: {
        fontSize: 30,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    searchBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'column',
        marginHorizontal: 10, // Adjust the margin as needed
        marginBottom: 10,
    },
    centeredTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    moto: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center',
        color: '#FFFFFF'
    },
    searchField: {
        height: 40,
        width: 200,
        borderWidth: 2,
        borderColor: '#F1F1F1',
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#F1F1F1'
    },
    menuImages: {
        paddingVertical: 20,
        paddingBottom: 20,
    },
    searchButton: {
        height: 60,
        backgroundColor: '#f4511e',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#F1F1F1',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 200,
    },
    searchButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
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
    textButtons: {
        fontSize: 20,
        color: '#010101',
        fontWeight: '800',
    },
    loginBars: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonSeparator: {
        height: 5,
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
    loginButtons: {
        alignItems: 'center',
        backgroundColor: '#f4511e',
        padding: 10,
        marginBottom: 1,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        borderRadius: 8,
    },
    buttonsContent: {
        margin: 50,
        width: 250,
    },




    profileInfoContainer: {
        flexDirection: 'row', // Arrange profile picture and user info side by side
        alignItems: 'center',
    },
    userInfoContainer: {
        marginLeft: 16,
        flex: 1,
        paddingBottom: 10,
        marginTop: 10
    },
    label: {
        fontSize: 24,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    topLeft: {
        position: 'absolute',
        top: 15,
        left: 0,
        marginBottom: 15, // Adjust this value as needed for spacing
        marginLeft: 20, // Adjust this value as needed for spacing
        zIndex: 1, // To ensure it appears on top of other elements
        fontSize: 16,
        fontWeight: 'bold'
    },
    topRight: {
        position: 'absolute',
        top: 15,
        right: 0,
        marginBottom: 15, // Adjust this value as needed for spacing
        marginRight: 20, // Adjust this value as needed for spacing
        zIndex: 1, // To ensure it appears on top of other elements
    },
    title: {
        fontSize: 34,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#f1f1f1'
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 16,
        fontSize: 20,
        fontWeight: 'bold',
    },
    userTextContainer: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    emailContainer: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    addPhotoText: {
        fontSize: 16,
        color: '#F5FDFE',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    userVehicle: {
        alignItems: 'center',
        backgroundColor: '#f4511e',
        padding: 10,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black'
    },
    usernameChangeButton: {
        alignItems: 'center',
        backgroundColor: '#f4511e',
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'black'
    },
    usernameText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    //login styles
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    languageText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#FAFAFA'
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
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Леко затъмняване
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        position: 'absolute',
        top: '50%',
        textAlign: 'center',
        fontSize: 38,
        color: '#010101',
    },
});



   