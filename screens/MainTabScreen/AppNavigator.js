import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login';
import Register from '../Register';
import HomePage from '../Home/Home';
import Tires from '../Category/Vehicle';
import MotorOil from '../Category/MotorOil';

const Stack = createStackNavigator();


export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Apps">
                <Stack.Screen name="Login" component={Login}
                    options={{
                        title: 'Login',
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen name="Register" component={Register} options={{
                    title: 'Register',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
                <Stack.Screen name="Home" component={HomePage} options={{
                    title: 'My home',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} />
                <Stack.Screen name="Tires" component={Tires}
                    options={{
                        title: 'Tires',
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen name="Motor Oil" component={MotorOil}
                    options={{
                        title: 'Motor Oil',
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

