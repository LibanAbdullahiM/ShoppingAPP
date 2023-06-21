import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";

const base64 = require('base-64');

const {width} = Dimensions.get("window");

const ProductsTableScreen = ({navigation, route}) => {

    const [products, setProducts] = useState([]);

    const {categoryId, userData} = route.params;

    const userName = userData.userName;
    const password = userData.password;

    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));


    const getProductsFromApi = async () => {

        setProducts([]);

        try {
           // const response = await fetch('http://172.20.10.12:8080/api/v1/categories/' + categoryId + '/products');
            const response = await fetch('http://192.168.1.104:8080/api/v1/categories/' + categoryId + '/products');
            if(response.ok){
                const data = await response.json();
                setProducts(data);
                console.log("Products are Loaded........................!")
                //console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async (productId) => {
        try {
            await fetch('http://192.168.1.104:8080/api/v1/products/' + productId,{
                method: 'DELETE',
                headers: headers,
            })
            getProductsFromApi();
            alert("Product " + productId + " deleted.");
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(

        React.useCallback(() => {

            getProductsFromApi();
            console.log("THE PRODUCT TABLE'S SCREEN WAS FOCUSED!")
           

            return () => {
                // Do something when the screen is unfocused
                   console.log("THE PRODUCT TABLE'S SCREEN WAS UNFOCUSED!")
                 };

        }, [navigation])
      );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.header_body}>
                    <Text style={[styles.large_txt, {marginTop: 8, marginLeft: 16, marginBottom: 16,}]}>Список Товаров</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cross_icon}>
                    <Image style={styles.icon} source={width < 500 ? require("../../../assets/icons/back-white.png") : require("../../../assets/icons/back.png")}/>
            </TouchableOpacity>

            <View style={{marginTop: '15%', width: '100%'}}>
                <TableHeader />
                <ScrollView style={{ marginBottom: '30%'}}>
                    {
                        products.map((product, index) => {
                            return <TableRow key={index} product={product} navigation={navigation} deleteProduct={deleteProduct} categoryId={categoryId} userData={userData}/>
                        })
                    }
                </ScrollView>
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("CreateProductForm", {categoryId: categoryId, userData:userData})}>
                <Text style={[styles.large_txt, {color: '#fff', marginTop: 14,}]}>Add New Product</Text>
            </TouchableOpacity>

        </View>
    )
}

export const TableHeader = () => {

    return (
        <View style={styles.table_header}>
            <View style={[styles.cel, {width: '9%',}]}>
                <Text style={styles.large_txt}>ID</Text>
            </View>
            <View style={[styles.cel, {width: '45%',}]}>
                <Text style={styles.large_txt}>NAME</Text>
            </View>
            <View style={[styles.cel, {width: '15%',}]}>
                <Text style={styles.large_txt}>ACTION</Text>
            </View>
            <View style={[styles.cel, {width: '15%',}]}>
                <Text style={styles.large_txt}>ACTION</Text>
            </View>
            <View style={[styles.cel, {width: '15%',}]}>
                <Text style={styles.large_txt}>ACTION</Text>
            </View>
        </View>
    )
    
}

export const TableRow = ({product, navigation, deleteProduct, categoryId, userData}) => {

    return (
        <View style={styles.row}>
            <View style={[styles.cel, {width: '9%',}]}>
                <Text style={styles.small_txt}>{product?.id}</Text>
            </View>
            <View style={[styles.cel, {width: '45%',}]}>
                <Text style={styles.small_txt}>{product?.name}</Text>
            </View>
            <TouchableOpacity style={[styles.cel, {width: '15%',}]} onPress={() => navigation.navigate("EditProductForm", {categoryId: categoryId, userData:userData, product: product})}>
                <Text style={[styles.small_txt, {color: '#126'}]}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cel, {width: '15%',}]} onPress={() => deleteProduct(product?.id)}>
                <Text style={[styles.small_txt, {color: '#126'}]}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cel, {width: '15%',}]} onPress={() => navigation.navigate("UploadProductImage", {productId: product?.id, userData: userData, categoryId: categoryId})}>
                <Text style={[styles.small_txt, {color: '#126'}]}>ADD IMAGE</Text>
            </TouchableOpacity>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#f2f2f2',
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        top: 0,

        backgroundColor: width < 500 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    header_body: {
        width: '100%',
        height: 70,
        justifyContent: 'center',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },

    small_txt:{
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.25,
        fontFamily: 'RobotoRegular', 
        marginBottom: 16,
        color: width < 500 ? '#fff' : '#000',
    },
    large_txt: {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium',
        marginBottom: 16,
        textAlign: 'center',
        color: width < 500 ? '#fff' : '#000',
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cross_icon: {
        width: 23,
        height: 23,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        top: '6%',
        left: '2%',

    },
    table_header: {
        height: 50,
        backgroundColor: '#537791',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    row: {
        width: '100%',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: 4,
        flexWrap: 'wrap',

        borderWidth: 1,
        borderColor: '#000',
    },
    btn: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#0BB798',
        position: 'absolute',
        top: '13.5%',
        right: '2%',
    },
})

export default ProductsTableScreen;