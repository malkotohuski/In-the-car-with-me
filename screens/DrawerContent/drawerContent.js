import React from 'react';
import Register from '../Register';
import Login from '../Login';
import { DrawerContent } from '../DrawerContent/drawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../Home/Home';
import MyTabs from './tabsNavigator';

const Drawer = createDrawerNavigator();

const screenStyles = {
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
};

export const Navigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen
                name="Login"
                component={Login}
                options={{
                    title: 'Login',
                    ...screenStyles,
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Register',
                    ...screenStyles,
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="Home"
                component={HomePage}
                options={{
                    title: 'Home',
                    ...screenStyles,
                }}
            />
            <Drawer.Screen
                name="Tabs"
                component={MyTabs}
                options={{
                    title: 'Tabs',
                    ...screenStyles,
                    headerShown: false,
                }}
            />
        </Drawer.Navigator>
    );
};
