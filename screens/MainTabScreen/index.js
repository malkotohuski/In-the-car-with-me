import React from "react";


const Drawer = creteDrawerNavigation();

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
        </Drawer.Navigator>
    );
} ;