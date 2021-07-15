import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import home from './pages/home';
import login from './pages/login';
import register from './pages/register';
import profile from './pages/profile';
import sendlocation from './pages/sendlocation';
import postcardlocation from './pages/postcardlocation';
import auth from '@react-native-firebase/auth';
import Splash from './components/Splash/splash.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const homeTab = () => {
  const customTabBarStyle = {
    activeTintColor: '#FFAB73',
    inactiveTintColor: 'gray',
    showLabel: false,
    style: {backgroundColor: 'white'},
  };
  return (
    <Tab.Navigator
      activeColor="#fff"
      tabBarOptions={customTabBarStyle}
      shifting={false}>
      <Tab.Screen
        name="Home"
        component={home}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="SendLocation"
        component={sendlocation}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="map-marker" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const onAuthStateChanged = userData => {
    setUser(userData);
    const wait = time => new Promise(resolve => setTimeout(resolve, time));
    return wait(2000).then(() => setLoading(false));
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (loading) {
    return <Splash />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user === null ? (
          <>
            <Stack.Screen
              name="Login"
              component={login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={register}
              options={{headerTitle: 'Kayıt Ol'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeTab"
              component={homeTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Postcardlocation"
              component={postcardlocation}
              options={({route}) => ({
                title: route.params.location_name,
                headerStyle: {
                  backgroundColor: '#FFAB73',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
