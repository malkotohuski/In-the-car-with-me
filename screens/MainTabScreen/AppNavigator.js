
import React from 'react';
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../Home/Home';
import TiresSearchMenu from '../Category/Tires';
import Login from '../Login';
import Register from '../Register';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
     <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="Register" component={Register} />
     <Stack.Screen name="Home" component={HomePage} />
     <Stack.Screen name="Tires" component={TiresSearchMenu} />
    </Stack.Navigator>
  );
};

export default createAppContainer(AppNavigator);
