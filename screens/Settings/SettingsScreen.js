import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'; // You may need to install these components if not already done



const SECTIONS = [
    {
        header: 'preferences',
        icon: 'settings',
        items: [
            {
                id: 'language',
                icon: 'map',
                color: '#fe9488',
                label: 'Language',
                type: 'language'
            },
            {
                id: 'darkMode',
                icon: 'dark-mode',
                color: '#007afe',
                label: 'Dark Mode',
                type: 'toggle',
            },
            {
                id: 'wifi',
                icon: 'wifi',
                color: '#007afe',
                label: 'Use Wi-Fi',
                type: 'toggle',
            },
            {
                id: 'navigation',
                color: '#32c759',
                label: 'Location',
                type: 'link',
            },
            {
                id: 'showCollaborators',
                icon: 'manage-accounts',
                color: '#32c759',
                label: 'Show Collaborators',
                type: 'toggle',
            },
            {
                id: 'accessibilityMode',
                icon: 'airplanemode-on',
                color: '#32c759',
                label: 'Accessibility Mode',
                type: 'toggle',
            },
            { icon: 'library-music', color: '#fd2d54', label: 'Sounds', type: 'link' },
            { icon: 'home-repair-service', color: '#fd2d54', label: 'Tools', type: 'link' },
        ],
    },
    {
        header: 'help',
        icon: 'help',
        items: [
            { icon: 'save', color: '#8c8d91', label: 'Report Bug', type: 'link' },
            { icon: 'mail', color: '#007afe', label: 'Contact Us', type: 'link' },
        ],
    },
    {
        header: 'content',
        icon: 'format-align-center',
        items: [
            { icon: 'save', color: '#32c759', label: 'Saved', type: 'link' },
            { icon: 'download', color: '#fd2d54', label: 'Download', type: 'link' },
            { icon: 'insert-drive-file', color: '#007afe', label: 'Storage', type: 'link' },
            { icon: 'info', color: '#fe9488', label: 'Info', type: 'link' },
        ],
    },
];

const SettingsScreen = () => {
    const [toggleValues, setToggleValues] = useState({});
    const handleToggleSwitch = (id) => {
        setToggleValues((prevValues) => ({
            ...prevValues,
            [id]: !prevValues[id],
        }));
    };

    const renderItem = (item) => {
        switch (item.type) {
            case 'language':
            case 'link':
                return (
                    <ListItem
                        key={item.id}
                        containerStyle={styles.listItemContainer}
                        onPress={() => console.log(`Pressed ${item.label}`)} // You can replace this with your action
                    >
                        <Icon name={item.icon} color={item.color} />
                        <ListItem.Content>
                            <ListItem.Title>{item.label}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                );

            case 'toggle':
                return (
                    <ListItem
                        key={item.id}
                        containerStyle={styles.listItemContainer}
                    >
                        <Icon name={item.icon} color={item.color} />
                        <ListItem.Content>
                            <ListItem.Title>{item.label}</ListItem.Title>
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
            <View style={styles.container}>
                {SECTIONS.map((section) => (
                    <View key={section.header}>
                        <Text style={styles.sectionHeader}>{section.header}</Text>
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