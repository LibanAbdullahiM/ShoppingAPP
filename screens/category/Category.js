import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import ListCategories from './ListCategories';
import ListProducts from '../products/ListProducts';
import ProductDetails from '../products/ProductDetails';

const tab = createNativeStackNavigator();

const {width} = Dimensions.get("window");

const Category = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCategoriesFromApi = async () => {

        setCategories([]);
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://192.168.1.104:8080/api/v1/categories');
            if(response.ok){
                const data = await response.json();
                setCategories(data);
                console.log("Categories are Loaded........................!")
                setLoading(false);
                //console.log(data);
            }
        } catch (error) {
            console.log(error);
            setError("Ошибка соединения");
        }
    }

    useEffect(() => {
        getCategoriesFromApi();
        
    }, [0]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.txt}>Загрузка...</Text>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    if(error) {
        return (
            <View style={styles.container}>
                <Text style={styles.txt}>{error}</Text>
            </View>
        )
    }

    return (
        <tab.Navigator initialRouteName='ListCategories'>

            <tab.Screen name="ListCategories" component={ListCategories} options={{
            headerShown: false,
        }} initialParams={
            {
                CATEGORIES: categories,
            }
        }/>
            <tab.Screen name="ListProducts" component={ListProducts} options={{
            headerShown: false,
        }} />
           <tab.Screen name="ProductDetails" component={ProductDetails} options={{
            headerShown: false,
        }} />
        </tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#fff',
    },
    txt: {
        fontSize: 16,
        fontFamily: 'InterMedium',
        textAlign: 'center',
        color: width < 500 ? '#fff' : '#000',
    },
})

export default Category;