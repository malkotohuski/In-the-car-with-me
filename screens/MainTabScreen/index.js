import React from "react";
import Login from "../Login";
import {DrawerContent} from '../DrawerContent/drawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Register from "../Register";
import TiresSearchMenu from "../Category/Tires";

const screenStyles = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  };


export const Navigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <drawerContent {...props} />}>
            <Drawer.Screen
            name="Login"
            component={Login}
            option={{
                title: 'Login',
                ...screenStyles,
                headerShown:false,
            }}
            >
            </Drawer.Screen>
            <Drawer.Screen
            name="Register"
            component={Register}
            option={{
                title: 'Register',
                ...screenStyles,
                headerShown:false,
            }}
            >
            </Drawer.Screen>
            <Drawer.Screen
            name="Tires"
            component={TiresSearchMenu}
            option={{
                title: 'Tires',
                ...screenStyles,
                headerShown:false,
            }}
            >
            </Drawer.Screen>
        </Drawer.Navigator>
    );
} ;