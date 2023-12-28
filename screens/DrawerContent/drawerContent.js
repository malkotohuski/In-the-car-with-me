import React from 'react';
import { TouchableOpacity } from 'react-native';
import Register from '../Register';
import Login from '../Login';
import { DrawerContent } from '../DrawerContent/drawerContent';
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
import AccountManager from '../Account/AccountManager';
import AccountSettings from '../Account/AccountSettings';
import WelcomeScreen from '../Account/Welcome';

const Drawer = createDrawerNavigator();

const screenStyles = {
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
};



export const Navigator = ({ isLoggedIn }) => {
    const { t } = useTranslation();
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


    return (
        <Drawer.Navigator>
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
                name='Home'
                component={HomePage}
                options={{
                    title: t('Home'),
                    ...screenStyles,
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
            />
            <Drawer.Screen
                name="Mark Seats"
                component={MarkSeatsScreen}
                options={{
                    title: t('Mark Seats'),
                    ...screenStyles,
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

                }}
            />
            <Drawer.Screen
                name="Reporting"
                component={ReportingScreen}
                options={{
                    title: t('Reporting'),
                    ...screenStyles,
                }}
            />
            <Drawer.Screen
                name="Route request"
                component={RouteRequestScreen}
                options={{
                    title: t('Route request'),
                    ...screenStyles,
                }}
            />
            <Drawer.Screen
                name="AccountManager"
                component={AccountManager}
                key="AccountManager"
                options={{
                    title: t('Information about your account'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
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
                name="WelcomeScreen"
                component={WelcomeScreen}
                key="WelcomeScreen"
                options={{
                    title: t('Welcome'),
                    ...screenStyles,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            {/*  <Drawer.Screen
                name="Tabs"
                component={MyTabs}
                options={{
                    title: t('Tabs'),
                    ...screenStyles,
                    headerShown: false,
                }}
            /> */}
            {isLoggedIn ? dynamicScreens : null}
        </Drawer.Navigator>
    );
};