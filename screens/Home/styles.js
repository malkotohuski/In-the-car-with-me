import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    homepage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    adBox: {
        flex: 1,
        width: '20%',
        padding: 5,
        height: '80%',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden', // Add this line to hide overflowing content
    },
    adImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Add this line to ensure the entire image is visible
    },
    content: {
        flex: 2,
        width: '60%',
        padding: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
    },
    moto: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignItems: 'center',
    },
    searchField: {
        height: 40,
        width: 400,
        borderWidth: 2,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    searchButton: {
        height: 40,
        backgroundColor: 'coral',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 100,
    },
    searchButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    tiresButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 5,
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonSeparator: {
        height: 10,
    },
    languageSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
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
});

