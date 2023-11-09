import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login';
import Register from '../Register';
import HomePage from '../Home/Home';
import Tires from '../Category/Tires';

const Stack = createStackNavigator();


export default function Navigator() {
  return(
  <NavigationContainer>
  <Stack.Navigator initialRouteName="Apps">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Home" component={HomePage} />
    <Stack.Screen name="Tires" component={Tires} />
  </Stack.Navigator>
</NavigationContainer>
  )
}


