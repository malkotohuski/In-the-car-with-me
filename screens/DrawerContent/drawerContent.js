import React from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Register from '../Register';
import Login from '../Login';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../Home/Home';
import MyTabs from './tabsNavigator';
import MarkSeatsScreen from '../Category/MarkSeatsScreen';
import Vehicle from '../Category/Vehicle';
import SelectRouteScreen from '../Category/SelectRoute';
import { useTranslation } from 'react-i18next';
import Confirm from '../Category/Confirm';
import ViewRoutes from '../Category/ViewRoutes';
import ReportingScreen from '../ReportingScreen';
import RouteRequestScreen from '../RouteRequest';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountManager from '../Account/AccountManager';
import AccountSettings from '../Account/AccountSettings';
import WelcomeScreen from '../Account/Welcome';
import LogoutScreen from '../Logout';
import SettingsScreen from '../Settings/SettingsScreen';
import { RouteDetails } from '../RequestScreen/index'
import ChatScreen from '../Home/ChatScreen';
import AddFriendScreen from '../Chats/AddFriendScreen';
import Messages from '../Chats/Messages';
import CustomerDrawer from './customDrawer';
import RouteHistory from '../Category/RouteHistory';
import UsersScreen from '../Users/UsersScreen';
import Notifications from '../Home/Notifications';
import Comments from '../Category/Comments';

const Drawer = createDrawerNavigator();

const screenStyles = {
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#F1F1F1',
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        opacity: 0.8, // Настройка на прозрачността на картината
    },
});

export const Navigator = ({ isLoggedIn }) => {
    const { t } = useTranslation();

    const backgroundImage = require('../../images/drawer.jpg');

    const dynamicScreens = [
        // ... other screens
        <Drawer.Screen
            name="Tabs"
            component={MyTabs}
            key="Tabs"
            options={{
                title: 'Tabs',
                ...screenStyles,
                headerShown: false,
            }}
        />,
    ];

    const renderLogoutIcon = ({ navigation }) => (
        <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => {
                // Handle the press event, navigate to the 'LogoutScreen'
                navigation.navigate('LogoutScreen');
            }}
        >
            <Icon name="logout" size={24} color="white" />
        </TouchableOpacity>
    );

    const renderManageAccountsIcon = ({ navigation }) => (
        <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => {
                // Handle the press event, navigate to the 'AccountManager' screen
                navigation.navigate('AccountManager');
            }}
        >
            <Icon name="manage-accounts" size={24} color="white" />
        </TouchableOpacity>
    );

    const renderBackButtonIcon = ({ navigation }) => (
        <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => {
                navigation.navigate('Home');
            }}
        >
            <Icons name="keyboard-backspace" size={24} color="white" />
        </TouchableOpacity>
    );

    const renderBackButtonVehicle = ({ navigation }) => (
        <TouchableOpacity
            style={{
                marginRight: 16
            }}
            onPress={() => {
                navigation.navigate('Home');
            }}
        >
            <Icons name="keyboard-backspace" size={24} color="white" />
        </TouchableOpacity>
    );

    const renderBackButtonIcons = ({ navigation }) => (
        <TouchableOpacity
            style={{
                marginRight: 16
            }}
            onPress={() => {
                navigation.navigate('Vehicle');
            }}
        >
            <Icons name="keyboard-backspace" size={24} color="white" />
        </TouchableOpacity>
    );

    const BackButtonRouteRequests = ({ navigation }) => (
        <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => {
                navigation.navigate('Home');
            }}
        >
            <Icons name="keyboard-backspace" size={24} color="white" />
        </TouchableOpacity>
    );

    return (
        <Drawer.Navigator
            drawerContent={CustomerDrawer}
        >
            <Drawer.Screen
                name="Login"
                component={Login}
                options={{
                    title: t('Login'),
                    ...screenStyles,
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="Register"
                component={Register}
                options={{
                    title: t('Register'),
                    ...screenStyles,
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="Messages"
                component={Messages}
                options={{
                    title: t('Messages'),
                    ...screenStyles,
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name='Home'
                component={HomePage}
                options={{
                    title: t('Home'),
                    ...screenStyles,
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setOptions({
                            headerRight: () => renderManageAccountsIcon({ navigation }),
                        });
                    },
                })}
            />
            <Drawer.Screen
                name="Vehicle"
                component={Vehicle}
                options={{
                    title: t('Vehicle'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setOptions({
                            headerRight: () => renderBackButtonIcon({ navigation }),
                        });
                    },
                })}
            />
            <Drawer.Screen
                name="Mark Seats"
                component={MarkSeatsScreen}
                options={{
                    title: t('Mark Seats'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setOptions({
                            headerRight: () => renderBackButtonIcons({ navigation }),
                        });
                    },
                })}
            />
            <Drawer.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    title: t('Chat'),
                    ...screenStyles,
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="AddFriendScreen"
                component={AddFriendScreen}
                options={{
                    title: t('AddFriendScreen'),
                    ...screenStyles,
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="SelectRoute"
                component={SelectRouteScreen}
                options={{
                    title: t('SelectRoute'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setOptions({
                            headerRight: () => renderBackButtonIcons({ navigation }),
                        });
                    },
                })}
            />
            <Drawer.Screen
                name="Confirm"
                component={Confirm}
                options={{
                    title: t('Confirm'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="View routes"
                component={ViewRoutes}
                options={{
                    title: t('View routes'),
                    ...screenStyles,
                    drawerIcon: ({ color, size }) => (
                        <Icon name="streetview" size={size} color={color} />
                    ),
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setOptions({
                            headerRight: () => renderBackButtonVehicle({ navigation }),
                        });
                    },
                })}
            />
            <Drawer.Screen
                name="Reporting"
                component={ReportingScreen}
                options={{
                    title: t('Reporting'),
                    ...screenStyles,
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <Icon name="report" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="UsersScreen"
                component={UsersScreen}
                options={{
                    title: t('UsersScreen'),
                    ...screenStyles,
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <Icon name="report" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Route request"
                component={RouteRequestScreen}
                options={{
                    title: t('Route request'),
                    ...screenStyles,
                    drawerIcon: ({ color, size }) => (
                        <Icons name="routes" size={size} color={color} />
                    ),
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setOptions({
                            headerRight: () => BackButtonRouteRequests({ navigation }),
                        });
                    },
                })}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: t('Settings'),
                    ...screenStyles,
                    drawerIcon: ({ color, size }) => (
                        <Icon name="settings" size={size} color={color} />
                    ),
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setOptions({
                            headerRight: () => BackButtonRouteRequests({ navigation }),
                        });
                    },
                })}
            />
            <Drawer.Screen
                name="AccountManager"
                component={AccountManager}
                options={{
                    title: t('Information about your account'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' },
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setOptions({
                            headerRight: () => renderLogoutIcon({ navigation }),
                        });
                    },
                })}
            />
            <Drawer.Screen
                name="LogoutScreen"
                component={LogoutScreen}
                options={{
                    title: t('Logout'),
                    ...screenStyles,
                    drawerIcon: ({ color, size }) => (
                        <Icons name="logout" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="AccountSettings"
                component={AccountSettings}
                key="AccountSettings"
                options={{
                    title: t('Create an account'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="Comments"
                component={Comments}
                key="Comments"
                options={{
                    title: t('Create an account'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="RouteDetails"
                component={RouteDetails}
                options={{
                    title: t('Route Details'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="RoutesHistory"
                component={RouteHistory}
                options={{
                    title: t('Routes History'),
                    ...screenStyles,
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    title: t('Notifications'),
                    ...screenStyles,
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                key="WelcomeScreen"
                options={{
                    title: t('Welcome'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            {isLoggedIn ? dynamicScreens : null}
        </Drawer.Navigator>
    );
};