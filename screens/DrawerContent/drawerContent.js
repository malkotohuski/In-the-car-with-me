import React from 'react';
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

    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Login"
                component={Login}
                options={{
                    title: t('Login'),
                    ...screenStyles,
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="Register"
                component={Register}
                options={{
                    title: t('Register'),
                    ...screenStyles,
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name='Home'
                component={HomePage}
                options={{
                    title: t('Home'),
                    ...screenStyles,
                }}
            />
            <Drawer.Screen
                name="Vehicle"
                component={Vehicle}
                options={{
                    title: t('Vehicle'),
                    ...screenStyles,
                }}
            />
            <Drawer.Screen
                name="MarkSeats"
                component={MarkSeatsScreen}
                options={{
                    title: t('MarkSeats'),
                    ...screenStyles,
                }}
            />
            <Drawer.Screen
                name="SelectRoute"
                component={SelectRouteScreen}
                options={{
                    title: t('SelectRoute'),
                    ...screenStyles,
                }}
            />
            <Drawer.Screen
                name="Tabs"
                component={MyTabs}
                options={{
                    title: t('Tabs'),
                    ...screenStyles,
                    headerShown: false,
                }}
            />
            {isLoggedIn ? dynamicScreens : null}
        </Drawer.Navigator>
    );
};
