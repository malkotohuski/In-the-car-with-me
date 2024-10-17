import React, { useContext, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { DarkModeContext } from '../Authentication/DarkModeContext';

const SettingsScreen = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [toggleValues, setToggleValues] = useState({});
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
            toggleDarkMode();
        }
    };

    const getContainerStyle = () => {
        return {
            ...styles.container,
            backgroundColor: darkMode ? '#5A5A5AFF' : '#fff',
        };
    };

    const getSectionHeaderStyle = () => {
        return {
            ...styles.sectionHeader,
            color: darkMode ? '#fff' : '#000',
        };
    };

    const getListItemContainerStyle = () => {
        return {
            ...styles.listItemContainer,
            backgroundColor: darkMode ? '#1D1D1DFF' : '#fff',  // Adjust background color for dark mode
            borderColor: darkMode ? '#404040' : '#ddd',
        };
    };

    const getTextStyle = () => {
        return {
            color: darkMode ? '#fff' : '#000',
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
                        <ListItem.Content>
                            <ListItem.Title style={getTextStyle()}>
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
                            <ListItem.Title style={getTextStyle()}>
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
        backgroundColor: '#f4f4f4',
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
        borderColor: '#f6f5f2',
    },
});

export default SettingsScreen;
