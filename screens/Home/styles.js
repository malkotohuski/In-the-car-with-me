import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    homepage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50%',
    },
    adBox: {
        flex: 1,
        width: '20%',
        padding: 5,
        height: '50%',
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
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 16,
        padding: 10,
    },
    searchField: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 10,
        paddingHorizontal: 10,
    },
    searchButton: {
        fontSize: 16,
        padding: 2,
        backgroundColor: 'blue',
        color: '#f0f0f0',
        borderRadius: 3,
    },
    menuImages: {
    },
    tiresButton: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 5,
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10, // Add padding for spacing
    },
    languageSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

