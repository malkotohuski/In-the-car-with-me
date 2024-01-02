import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from './screens/DrawerContent/tabsNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './screens/DrawerContent/drawerContent';
import { RouteProvider } from './screens/Category/RouteContext'
import { AuthProvider } from './screens/Authentication/AuthContext';


const Drawer = createDrawerNavigator();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                < AuthProvider>
                    <Navigator isLoggedIn={isLoggedIn} />
                </AuthProvider>
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default App;
