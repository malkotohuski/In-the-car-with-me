import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../Home/Home';
import Login from '../Login';
import Register from '../Register';
import MyAccount from '../Account';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Basket from '../Basket';
import Video from '../Video';


const Tab = createBottomTabNavigator();

function MyTabs() {
    const navigation = useNavigation();
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
                name="Home"
                component={HomePage}
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
                                color={focused ? '#e32f45' : '#748c94'}
                            />
                            <Text
                                style={{
                                    color: focused ? '#000' : '#748c94',
                                    fontSize: 16,
                                }}>
                                Home
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
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
                name="Register"
                component={Register}
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
                            onPress={() => navigation.navigate('Register')}>
                            <Icon
                                name="app-registration"
                                size={30}
                                color={focused ? '#e32f45' : '#748c94'}
                            />
                            <Text
                                style={{
                                    color: focused ? '#000' : '#748c94',
                                    fontSize: 16,
                                }}>
                                Register
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