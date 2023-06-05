import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesTableScreen from "./CategoriesTableScreen";
import AdminScreen from "./AdminScreen";
import CreateProductForm from "./CreateProductForm";
import ProductsTableScreen from "./ProductsTableScreen";
import EditProductForm from "./EditProductForm";
import OrdersTableScreen from "./OrdersTableScreen";
import EditOrderForm from "./EditOrderForm";

const tab = createNativeStackNavigator();

const AdminNativeStack = () => {
    return (
        <tab.Navigator initialRouteName="AdminScreen">
            <tab.Screen name="AdminScreen" component={AdminScreen} options={{
                headerShown: false,
            }}/>
             <tab.Screen name="CategoriesTableScreen" component={CategoriesTableScreen} options={{
                headerShown: false,
            }}/>
            <tab.Screen name="OrdersTableScreen" component={OrdersTableScreen} options={{
                headerShown: false,
            }}/>
             <tab.Screen name="EditOrderForm" component={EditOrderForm} options={{
                headerShown: false,
            }}/>
            <tab.Screen name="ProductsTableScreen" component={ProductsTableScreen} options={{
                headerShown: false,
            }}/>
             <tab.Screen name="CreateProductForm" component={CreateProductForm} options={{
                headerShown: false,
            }}/>
            <tab.Screen name="EditProductForm" component={EditProductForm} options={{
                headerShown: false,
            }}/>
        </tab.Navigator>
    )
}

export default AdminNativeStack