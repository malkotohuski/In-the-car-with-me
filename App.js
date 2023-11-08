import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './screens/Home/Home';
import {SafeAreaView} from 'react-native-safe-area-context';
import Login from './screens/Login';
import Register from './screens/Register';
import TiresSearchMenu from './screens/Category/Tires';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Tires" component={TiresSearchMenu} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
