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
import EditCategoryForm from "./EditCategoryForm";
import CreateCategoryForm from "./CreateCategoryForm";
import UploadProductImage from "./UploadProductImage";
import UploadCategoryImage from "./UploadCategoryImage";

const tab = createNativeStackNavigator();

const AdminNativeStack = ({navigation, route}) => {

    const {userData} = route.params;

    return (
        <tab.Navigator initialRouteName="AdminScreen">
            <tab.Screen name="AdminScreen" component={AdminScreen} options={{
                headerShown: false,
            }}
            initialParams={{
                userData: userData,
            }}
            />
             <tab.Screen name="CategoriesTableScreen" component={CategoriesTableScreen} options={{
                headerShown: false,
            }}
            initialParams={{
                userData: userData,
            }}/>
            <tab.Screen name="OrdersTableScreen" component={OrdersTableScreen} options={{
                headerShown: false,
            }}
            initialParams={{
                userData: userData,
            }}/>
             <tab.Screen name="EditOrderForm" component={EditOrderForm} options={{
                headerShown: false,
            }}/>
            <tab.Screen name="ProductsTableScreen" component={ProductsTableScreen} options={{
                headerShown: false,
            }}
            initialParams={{
                userData: userData,
            }}/>
             <tab.Screen name="CreateProductForm" component={CreateProductForm} options={{
                headerShown: false,
            }}/>
            <tab.Screen name="EditProductForm" component={EditProductForm} options={{
                headerShown: false,
            }}/>
            <tab.Screen name="EditCategoryForm" component={EditCategoryForm} options={{
                headerShown: false,
            }}/>
             <tab.Screen name="CreateCategoryForm" component={CreateCategoryForm} options={{
                headerShown: false,
            }}/>
            <tab.Screen name="UploadProductImage" component={UploadProductImage} options={{
                headerShown: false,
            }}/>
            <tab.Screen name="UploadCategoryImage" component={UploadCategoryImage} options={{
                headerShown: false,
            }}/>
        </tab.Navigator>
    )
}

export default AdminNativeStack