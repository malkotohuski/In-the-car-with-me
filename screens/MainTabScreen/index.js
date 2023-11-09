import React from "react";
import Login from "../Login";
import Register from "../Register";

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
        </Drawer.Navigator>
    );
};