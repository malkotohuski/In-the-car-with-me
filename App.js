import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from './screens/DrawerContent/tabsNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './screens/MainTabScreen/AppNavigator';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>
        </SafeAreaView>
    );
}
