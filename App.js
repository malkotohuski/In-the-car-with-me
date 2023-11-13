import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigator from './screens/MainTabScreen/AppNavigator';


export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Navigator />
        </SafeAreaView>
    );
}
