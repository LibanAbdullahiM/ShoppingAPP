import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loging from './Loging';
import Profile from './Profile';
import Registring from './Registring';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const tab = createNativeStackNavigator();

function Account() {

    const [isLogged, setIsLogged] = useState(false);

    const getData = async () => {

        try {
            const userdetails = await AsyncStorage.getItem('UserDetails');
            if(userdetails !== null){
                setIsLogged(true);
            }else {
                setIsLogged(false);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        getData();

    }, [setIsLogged])

    return (
        <tab.Navigator>
            {
                isLogged ?
                <tab.Screen name="Profile" component={Profile} options={{
                    headerShown: false,
                }} initialParams={{
                    setIsLogged: setIsLogged
                }}/>
                :
                <tab.Screen name="Loging" component={Loging} options={{
                    headerShown: false,
                }}  initialParams={{
                    setIsLogged: setIsLogged
                }}/>
              

            }
               <tab.Screen name="Registring" component={Registring} options={{
            headerShown: false,
        }}/>
        </tab.Navigator>
    )
}

export default Account;