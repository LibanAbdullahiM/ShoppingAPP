import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Dimensions } from 'react-native';
import ListCategories from './ListCategories';
import ListProducts from '../products/ListProducts';
import ProductDetails from '../products/ProductDetails';

const tab = createNativeStackNavigator();

const {width} = Dimensions.get("window");

const CategoryNativeStack = ({navigation, route}) => {

    return (
        <tab.Navigator initialRouteName='ListCategories'>

            <tab.Screen name="ListCategories" component={ListCategories} options={{
            headerShown: false,
        }}/>
            <tab.Screen name="ListProducts" component={ListProducts} options={{
            headerShown: false,
        }} />
           <tab.Screen name="ProductDetails" component={ProductDetails} options={{
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

export default CategoryNativeStack;