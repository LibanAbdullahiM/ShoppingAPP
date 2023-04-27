import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListCategories from './ListCategories';
import ListProducts from '../products/ListProducts';
import ProductDetails from '../products/ProductDetails';

const tab = createNativeStackNavigator();

const Category = () => {

    return (
        <tab.Navigator initialRouteName='ListCategories'>

            <tab.Screen name="ListCategories" component={ListCategories} options={{
            headerShown: false,
        }} />
            <tab.Screen name="ListProducts" component={ListProducts} options={{
            headerShown: false,
        }} />
           <tab.Screen name="ProductDetails" component={ProductDetails} options={{
            headerShown: false,
        }} />
        </tab.Navigator>
    )
}

export default Category;