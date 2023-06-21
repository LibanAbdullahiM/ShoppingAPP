import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import Header from '../../components/Header'
import { LISTPRODUCTS } from "../../constants/Data";
import Products from "../../components/Home/Products";

const {width} = Dimensions.get("window");

const ListProducts = ({navigation, route}) => {

    const [listProducts, setListProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {title, categoryId} = route.params;

    const getProductsFromAPI = async () =>{

        try {
            //const response = await fetch('http://172.20.10.12:8080/api/v1/categories/' + categoryId + '/products');
            const response = await fetch('http://192.168.1.104:8080/api/v1/categories/' + categoryId + '/products');
            if(response.ok){
                const data = await response.json();
                setListProducts(data);
                setLoading(false);
            }

        } catch (error) {
            setError("Ошибка соединения");
            console.log(error);
        }
    }

    useEffect(() => {

        getProductsFromAPI();
        
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
        <View style={styles.container}>
            <Header  navigation={navigation} route={route}/>
            <TouchableOpacity style={styles.back_button} onPress={() => navigation.navigate("ListCategories")}>
                <Image style={styles.back_Icon} source={width < 450 ? require("../../assets/icons/back-white.png") : require("../../assets/icons/back.png")}/>
            </TouchableOpacity>
            <ScrollView style={styles.container} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
        }} refreshControl={
            <RefreshControl refreshing={false}/>
        }
        showsVerticalScrollIndicator={false}>
                <Products products={listProducts} title={title} navigation={navigation} route={route}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',

        backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#f2f2f2',
    },
    back_button: {
        width: 30,
        height: 40,
        position: 'absolute',
        top: width < 450 ? '16.3%' : '12.3%',
        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 1,
    },
    back_Icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    txt: {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium',
        textAlign: 'center',
        color: width < 450 ? '#fff' : '#000',
    },
})
export default ListProducts;