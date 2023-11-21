import React from "react";
import Login from "../Login";
import Register from "../Register";
import { DrawerContent } from '../DrawerContent/drawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from "../DrawerContent/tabsNavigator";
import Garage from "../Garage";

const screenStyles = {
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
};


export const Drawer = () => {
    return (
        <Drawer.Navigator drawerContent={props => <drawerContent {...props} />}>
            <Drawer.Screen
                name="Login"
                component={Login}
                option={{
                    title: 'Login',
                    ...screenStyles,
                    headerShown: false,
                }}
            >
            </Drawer.Screen>
            <Drawer.Screen
                name="Register"
                component={Register}
                option={{
                    title: 'Register',
                    ...screenStyles,
                    headerShown: false,
                }}
            >
            </Drawer.Screen>
            <Drawer.Screen
                name="MyTabs"
                component={MyTabs}
                option={{
                    title: 'MyTabs',
                    ...screenStyles,
                    headerShown: false,
                }}
            >
            </Drawer.Screen>
            <Drawer.Screen
                name="Garage"
                component={Garage}
                option={{
                    title: 'Garage',
                    ...screenStyles,
                    headerShown: false,
                }}
            >
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};