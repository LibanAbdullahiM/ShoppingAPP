import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Dimensions } from 'react-native';
import ShoppingCart from './ShoppingCart';
import OrderScreen from './OrderScreen';
import ConfirmationScreen from './ConfirmationScreen';
import CompleteScreen from './CompleteScreen';

const tab = createNativeStackNavigator();

const {width} = Dimensions.get("window");

const CartNativeStack = ({navigation, route}) => {

    const {userdetails, setBadgeCount} = route.params;

    return (
        <tab.Navigator initialRouteName='ShoppingCart'>

            <tab.Screen name="ShoppingCart" component={ShoppingCart} options={{
            headerShown: false,
        }}
        initialParams={{
            userdetails: userdetails,
        }}/>
            <tab.Screen name="OrderScreen" component={OrderScreen} options={{
            headerShown: false,
        }} 
        initialParams={{
            userdetails: userdetails,
        }}/>
         <tab.Screen name="ConfirmationScreen" component={ConfirmationScreen} options={{
            headerShown: false,
        }} 
        initialParams={{
            userdetails: userdetails,
        }}/>
        <tab.Screen name="CompleteScreen" component={CompleteScreen} options={{
            headerShown: false,
        }}/>
        </tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: width < 450 ? 'rgba(0, 0, 0, 1)' : '#f2f2f2',
    },
})

export default CartNativeStack;