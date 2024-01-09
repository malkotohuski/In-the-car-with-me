import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';




const SettingsScreen = () => {
    const [toggleValues, setToggleValues] = useState({});
    const [darkMode, setDarkMode] = useState(false);
    const { t } = useTranslation();

    const SECTIONS = [
        {
            header: t('Preferences'),
            icon: 'settings',
            items: [
                {
                    id: 'language',
                    icon: 'map',
                    color: '#fe9488',
                    label: t('Language'),
                    type: 'language'
                },
                {
                    id: 'darkMode',
                    icon: 'dark-mode',
                    color: '#007afe',
                    label: t('Dark mode'),
                    type: 'toggle',
                },
                {
                    id: 'wifi',
                    icon: 'wifi',
                    color: '#007afe',
                    label: t('Use Wi-Fi'),
                    type: 'toggle',
                },
                {
                    id: 'navigation',
                    icon: 'navigation',
                    color: '#191A19',
                    label: t('Location'),
                    type: 'link',
                },
                {
                    id: 'showCollaborators',
                    icon: 'manage-accounts',
                    color: '#32c759',
                    label: t('Show Collaborators'),
                    type: 'toggle',
                },
                {
                    id: 'accessibilityMode',
                    icon: 'airplanemode-on',
                    color: '#32c759',
                    label: t('Accessibility Mode'),
                    type: 'toggle',
                },
                { icon: 'library-music', color: '#fd2d54', label: t('Sounds'), type: 'link' },
                { icon: 'home-repair-service', color: '#fd2d54', label: t('Tools'), type: 'link' },
            ],
        },
        {
            header: t('Help'),
            icon: 'help',
            items: [
                { icon: 'save', color: '#8c8d91', label: t('Report Bug'), type: 'link' },
                { icon: 'mail', color: '#007afe', label: t('Contact Us'), type: 'link' },
            ],
        },
        {
            header: t('Content'),
            icon: 'format-align-center',
            items: [
                { icon: 'save', color: '#32c759', label: t('Saved'), type: 'link' },
                { icon: 'download', color: '#fd2d54', label: t('Download'), type: 'link' },
                { icon: 'insert-drive-file', color: '#007afe', label: t('Storage'), type: 'link' },
                { icon: 'info', color: '#fe9488', label: t('Info'), type: 'link' },
            ],
        },
    ];

    const handleToggleSwitch = (id) => {
        setToggleValues((prevValues) => ({
            ...prevValues,
            [id]: !prevValues[id],
        }));

        if (id === 'darkMode') {
            setDarkMode(!toggleValues[id]);
        }
    };

    const getContainerStyle = () => {
        return {
            flex: 1,
            backgroundColor: darkMode ? '#101010' : '#fff', // Adjust background color for dark mode
            padding: 15,
        };
    };

    const getSectionHeaderStyle = () => {
        return {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 15,
            marginBottom: 10,
            color: darkMode ? '#fff' : '#000', // Adjust text color for dark mode
        };
    };

    const getListItemContainerStyle = () => {
        return {
            borderBottomWidth: 1,
            borderColor: darkMode ? '#101010' : '#ddd', // Adjust border color for dark mode
        };
    };

    const renderItem = (item) => {
        switch (item.type) {
            case 'language':
            case 'link':
                return (
                    <ListItem
                        key={item.id}
                        containerStyle={getListItemContainerStyle()}
                        onPress={() => console.log(`Pressed ${item.label}`)}
                    >
                        <Icon name={item.icon} color={item.color} />
                        <ListItem.Content >
                            <ListItem.Title style={{ color: darkMode ? '#000' : '#000' }}>
                                {item.label}
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                );

            case 'toggle':
                return (
                    <ListItem
                        key={item.id}
                        containerStyle={getListItemContainerStyle()}
                    >
                        <Icon name={item.icon} color={item.color} />
                        <ListItem.Content>
                            <ListItem.Title style={{ color: darkMode ? '#000' : '#000' }}>
                                {item.label}
                            </ListItem.Title>
                        </ListItem.Content>
                        <Switch
                            value={toggleValues[item.id] || false}
                            onValueChange={() => handleToggleSwitch(item.id)}
                        />
                    </ListItem>
                );

            default:
                return null;
        }
    };

    return (
        <ScrollView>
            <View style={getContainerStyle()}>
                {SECTIONS.map((section) => (
                    <View key={section.header}>
                        <Text style={getSectionHeaderStyle()}>{section.header}</Text>
                        {section.items.map((item) => renderItem(item))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },
    listItemContainer: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
});

export default SettingsScreen;