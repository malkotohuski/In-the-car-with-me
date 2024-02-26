import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Video from '../Video';
import Vehicle from '../Category/Vehicle';
import HomePage from '../Home/Home';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Video" component={Video} />
            <Tab.Screen name="Vehicle" component={Vehicle} />
        </Tab.Navigator>
    );
}
export default BottomTabNavigator;