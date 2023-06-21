import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loging from './Loging';
import Profile from './Profile';
import Registring from './Registring';
import { LogBox } from 'react-native';
import Help from './Help';
import AdminNativeStack from './admin/AdminNativeStack';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const tab = createNativeStackNavigator();

function Account({navigation, route}) {

    const {userdetails, isLogged} = route.params;

    const [_isLogged, set_IsLogged] = useState(isLogged);
    const [userData, setUserData] = useState(userdetails === null ? {} : userdetails)

    const getUserData = async () => {

        try {
            const data = await AsyncStorage.getItem("UserDetails");
            if(data !== null){
                setUserData(JSON.stringify(data));
                set_IsLogged(true);
            }
        } catch (error) {
            
        }
    }

    useFocusEffect(

        React.useCallback(() => {

            getUserData();

            console.log("THE ACCOUNT SCREEN WAS FOCUSED!")
           

            return () => {
                // Do something when the screen is unfocused
                   console.log("THE ACCOUNT SCREEN WAS UNFOCUSED!")
                 };

        }, [navigation])
      );

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //       // The screen is focused
    //       getUserData();
    //     });
    
    //     // Return the function to unsubscribe from the event so it gets removed on unmount
    //     return unsubscribe;
    //   }, [navigation]);

    return (
        <tab.Navigator initialRouteName='Loging'>
             <tab.Screen name="Loging" component={Loging} options={{
                    headerShown: false,
                }}/>
            <tab.Screen name="Profile" component={Profile} options={{
                    headerShown: false,
                }}
                initialParams={{
                    _userdetails: userData,
                }}/>
            
            <tab.Screen name="Registring" component={Registring} options={{
                headerShown: false,
            }}/>
             <tab.Screen name="Help" component={Help} options={{
                headerShown: false,
            }}/>
              <tab.Screen name="AdminNativeStack" component={AdminNativeStack} options={{
                headerShown: false,
            }}/>
        </tab.Navigator>
    )
}

export default Account;

/**
 * 
 *             {
                _isLogged ?
                <tab.Screen name="Profile" component={Profile} options={{
                    headerShown: false,
                }}
                initialParams={{
                    _userdetails: userData,
                }}/>
                :
                <tab.Screen name="Loging" component={Loging} options={{
                    headerShown: false,
                }}/>
              

            }
               <tab.Screen name="Registring" component={Registring} options={{
                headerShown: false,
            }}/>
             <tab.Screen name="Help" component={Help} options={{
                headerShown: false,
            }}/>
              <tab.Screen name="AdminNativeStack" component={AdminNativeStack} options={{
                headerShown: false,
            }}/>
 */