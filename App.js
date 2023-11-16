import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigator from './screens/MainTabScreen/AppNavigator';
import Nav from './screens/DrawerContent/drawerContent';
import MyTabs from './screens/DrawerContent/tabsNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <MyTabs />
            </NavigationContainer>
        </SafeAreaView>
    );
}
