import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from './screens/Home/Home'
import CategoryNativeStack from './screens/category/CategoryNativeStack';
import Account from './screens/user/Account';
import ShoppingCart from './screens/cart/ShoppingCart';
import CartNativeStack from './screens/cart/CartNativeStack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const {width} = Dimensions.get("window");

const Tap = createBottomTabNavigator();

export default function App() {

  const [badgeCount, setBadgeCount] = useState(0);
  const [userdetails, setUserdetails] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  const [loaded] = useFonts({
    RobotoThin: require('./assets/fonts/Inter-Bold.ttf'),
    RobotoLight: require('./assets/fonts/Inter-Bold.ttf'),
    RobotoRegular: require('./assets/fonts/Inter-Regular.ttf'),
    RobotoMedium: require('./assets/fonts/Inter-Medium.ttf'),
    RobotoBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    RobotoBlack: require('./assets/fonts/Inter-Light.ttf'),
  })

  const  getUserDetails = async () => {

    try {
        const _userdetails = await AsyncStorage.getItem('UserDetails');
        if(_userdetails !== null){
          setIsLogged(true)
          setUserdetails(JSON.parse(_userdetails));

        }
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {

    getUserDetails();
    
  }, [isLogged]);

  if(!loaded) return null;

  return (
    <NavigationContainer>
      <Tap.Navigator initialRouteName='Home' screenOptions={
          { 
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: width < 500 ? '#3b3c3d' : 'rgba(205, 194, 194, 0.52)',
            tabBarInactiveBackgroundColor: width < 500 ? '#3b3c3d' : 'rgba(205, 194, 194, 0.52)',
            tabBarActiveTintColor: '#0BB798',
            tabBarInactiveTintColor: '#f5f5f5',
            tabBarHideOnKeyboard: true,
          }
        }
        tabBarActiveTintColor = '#0BB798'>
        <Tap.Screen name='Home' component={Home} options={{tabBarIcon: ({focused, size, color}) => {
            return (
              <FontAwesome
                name='home'
                size={32}
                color={focused ? '#0BB798' : 'rgba(0, 0, 0, 0.9)'}
              />
            )
        }}}/>
        <Tap.Screen name='CategoryNativeStack' component={CategoryNativeStack} options={{tabBarIcon: ({focused, size, color}) => {
          return (
            <FontAwesome
            name='list'
            size={32}
            color={focused ? '#0BB798' : 'rgba(0, 0, 0, 0.9)'}/>
          )
        }}}/>
        <Tap.Screen name='CartNativeStack' component={CartNativeStack} options={{
          tabBarBadge: badgeCount ? badgeCount : 0,
          tabBarIcon: ({focused, size, color}) => {
          return (
            <FontAwesome
            name='shopping-cart'
            size={32}
            color={focused ? '#0BB798' : 'rgba(0, 0, 0, 0.9)'}/>
          )
        }}}
        initialParams={{
          userdetails: userdetails,
          setBadgeCount: setBadgeCount,
        }}/>
        <Tap.Screen name='Account' component={Account} options={{tabBarIcon: ({focused, size, color}) => {
          return (
            <FontAwesome
            name='user'
            size={32}
            color={focused ? '#0BB798' : 'rgba(0, 0, 0, 0.9)'}/>
          )
        }}}  
        initialParams={{
          userdetails: userdetails,
          isLogged: isLogged,
        }}/>
      </Tap.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
