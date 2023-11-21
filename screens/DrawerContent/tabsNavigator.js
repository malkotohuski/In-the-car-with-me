import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomePage from '../Home/Home';
import Login from '../Login';
import MyAccount from '../Account';
import Basket from '../Basket';
import Video from '../Video';
import Garage from '../Garage';


const Tab = createBottomTabNavigator();

function MyTabs() {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Update isLoggedIn state based on user login status
    const onLogin = () => {
        setIsLoggedIn(true);
        navigation.navigate('Garage');
    };

    useEffect(() => {
        // If the user is logged in, navigate to the Home screen
        if (isLoggedIn) {
            navigation.navigate('Home');
        }
    }, [isLoggedIn, navigation]);

    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 60,
                },
            }}
        >
            <Tab.Screen
                name="Login"
                component={Login}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        // Prevent navigation to Home if not logged in
                        if (!isLoggedIn) {
                            e.preventDefault();
                        }
                    },
                })}
                options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('Garage')}>
                            <Icon
                                name="directions-car"
                                size={30}
                                color={isLoggedIn ? '#e32f45' : '#748c94'}
                            />
                            <Text
                                style={{
                                    color: isLoggedIn ? '#000' : '#748c94',
                                    fontSize: 16,
                                }}>
                                Garage
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomePage}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        // Prevent navigation to Home if not logged in
                        if (!isLoggedIn) {
                            e.preventDefault();
                        }
                    },
                })}
                options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('Home')}>
                            <Icon
                                name="home"
                                size={30}
                                color={isLoggedIn ? '#e32f45' : '#748c94'}
                            />
                            <Text
                                style={{
                                    color: isLoggedIn ? '#000' : '#748c94',
                                    fontSize: 16,
                                }}>
                                Home
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
            {/*  <Tab.Screen
                name="Garage"
                component={Garage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('Garage')}>
                            <Icon
                                name="settings" // Replace with your icon for Garage
                                size={30}
                                color={focused ? '#e32f45' : '#748c94'}
                            />
                            <Text
                                style={{
                                    color: focused ? '#000' : '#748c94',
                                    fontSize: 16,
                                }}>
                                Garage
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Account"
                component={MyAccount}
                options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('Account')}>
                            <Icon
                                name="manage-accounts"
                                size={30}
                                color={focused ? '#e32f45' : '#748c94'}
                            />
                            <Text
                                style={{
                                    color: focused ? '#000' : '#748c94',
                                    fontSize: 16,
                                }}>
                                Account
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />

            <Tab.Screen
                name="Basket"
                component={Basket}
                options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('Basket')}>
                            <Icon
                                name="shopping-basket"
                                size={30}
                                color={focused ? '#e32f45' : '#748c94'}
                            />
                            <Text
                                style={{
                                    color: focused ? '#000' : '#748c94',
                                    fontSize: 16,
                                }}>
                                Basket
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <Tab.Screen
                name="Video"
                component={Video}
                options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('Video')}>
                            <Icon
                                name="video-collection"
                                size={30}
                                color={focused ? '#e32f45' : '#748c94'}
                            />
                            <Text
                                style={{
                                    color: focused ? '#000' : '#748c94',
                                    fontSize: 16,
                                }}>
                                Video
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;