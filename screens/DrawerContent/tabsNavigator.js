import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../Home/Home';
import Login from '../Login';
import Register from '../Register';
import MyAccount from '../Account';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePage}
                options={{
                    title: 'Home',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Tab.Screen name="Account" component={MyAccount}
                options={{
                    title: 'MyAccount',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Tab.Screen name="Register" component={Register}
                options={{
                    title: 'Register',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;