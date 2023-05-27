import React, { useState, useEffect } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, RefreshControl } from "react-native";


const base64 = require('base-64');

const {width} = Dimensions.get("window");

const ShoppingCart = ({navigation, route}) => {

    const [listCarts, setListCarts] = useState([]);
    const [count, setCount] = useState(0);
    const [Refreshing, setRefreshing] = useState(false);

    const {userdetails} = route.params;

    const [userData, setUserData] = useState(userdetails === null ? {} : userdetails); 

    const getUserData = async () => {

        try {
            const data = await AsyncStorage.getItem("UserDetails");
            if(data !== null){
                console.log("USER DETAILS FROM SHOPPINGCART SCREEN: ", data)
                setUserData(JSON.parse(data));
            }
        } catch (error) {
            
        }
    }

    const initialValue = 0;
    const totalPrice = listCarts.map(cart => cart?.subtotalPrice).reduce((acc, cur) => acc + cur, initialValue);
    const totalQuantity = listCarts.map(cart => cart?.quantity).reduce((acc, cur) => acc + cur, initialValue);

    const userName = userData.userName;
    const password = userData.password;

    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

    const  getCartsFromApi = async () => {

        setListCarts([])

        try {
            const response = await fetch('http://192.168.1.104:8080/api/v1/shopping-carts',{
                headers: headers,
            });

            if(response.ok){
                const data = await response.json();
                //console.log(data); 
                setListCarts(data);
                console.log("SHOPPING CARTS ARE LOADED SUCCESSFULLY.....................!");
            }

        } catch (error) {
            console.log(error); 
        }
    };

        
    const increase_count = async (cartId) => {

        try {
            await fetch('http://192.168.1.104:8080/api/v1/shopping-carts/' + cartId + '/increase-quantity',{
                method: 'PUT',
                headers: headers,
            });
            setCount(prev => prev + 1);
            console.log("Carts are Updated by Adding one........................!")
        } catch (error) {
            console.log(error);
        }
    }

    const decrease_count = async (cartId) => {

        try {
            await fetch('http://192.168.1.104:8080/api/v1/shopping-carts/' + cartId + '/decrease-quantity',{
                method: 'DELETE',
                headers: headers,
            });
            setCount(prev => prev - 1);
            console.log("Carts are Updated by subtracting one........................!")
        } catch (error) {
            console.log(error);
        }
    }

    const delete_cart = async (cartId) => {

        try {

            await fetch('http://192.168.1.104:8080/api/v1/shopping-carts/' + cartId + '/delete-cart',{
                method: 'DELETE',
                headers: headers,
            });
            const newCartList = listCarts.filter(cart => cart?.id !== cartId);
            setListCarts(newCartList);
            setCount(0);
            console.log("Cart removed succesfully........................!")
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(

        React.useCallback(() => {

            getUserData();
            getCartsFromApi();
            console.log("THE SCREEN WAS FOCUSED!")
           

            return () => {
                // Do something when the screen is unfocused
                   console.log("THE SCREEN WAS UNFOCUSED!")
                 };

        }, [navigation, count])
      );

    const handleRefresh = () => {
        //setRefreshing(true);
        //getCartsFromApi();
        //setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.cart_header}>
                    <Text style={[styles.large_txt, {marginTop: 8, marginLeft: 16, marginBottom: 16,}]}>КОРЗИНА</Text>
                </View>
            </View>
            <ScrollView style={styles.scroll} contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
            }} 
            refreshControl={
                <RefreshControl refreshing={Refreshing}
                                onRefresh={handleRefresh}/>
            }>
            {
                listCarts.length > 0 ?
                <View style={{width: '100%', marginBottom: '20%', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        listCarts.map((cart, index) => {
                            return (
                                <View style={[styles.card, {marginTop: 10,}]} key={index}>
                                    <View style={{width: '100%', height: '70%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 8,}}>
                                            <View style={styles.image_View}>
                                                <Image style={styles.image} source={{                                                                                                                                   
                                                    uri: 'http://192.168.1.104:8080/api/v1/products/'+ cart?.product?.id +'/images/' + 0
                                                }}/>
                                            </View>
                                            <View style={styles.cart_text_view}>
                                                <Text style={styles.large_txt}>${cart?.subtotalPrice}</Text>
                                                <Text style={[styles.large_txt, {textAlign: 'justify'}]}>{cart?.product?.name}</Text>
                                            </View>
                                    </View>
                                    <View style={{width: '100%', borderBottomWidth: 0.5, borderBottomColor: '#000'}}></View>
                                        <View style={{width: '100%', height: '30%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                            <TouchableOpacity style={styles.fav_view}>
                                                <View style={[styles.icon_view, {marginRight: 4,}]}>
                                                    <Image style={styles.icon} source={width < 450 ? require("../../assets/icons/fav-icon-white.png") : require("../../assets/icons/fav-icon.png")}/>
                                                </View>
                                                <Text style={styles.small_txt}>В избранное</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.del_view} onPress={() => delete_cart(cart?.id)}>
                                                <View style={[styles.icon_view, {marginRight: 4,}]}>
                                                    <Image style={styles.icon} source={width < 450 ? require("../../assets/icons/delete-icon-white.png") : require("../../assets/icons/delete-icon.png")}/>
                                                </View>
                                                <Text style={styles.small_txt}>Удалить</Text>
                                            </TouchableOpacity>
                                            <View style={[styles.update_view]}>
                                                <TouchableOpacity
                                                        onPress={() => decrease_count(cart?.id)}
                                                        style={[styles.icon_view, {borderWidth: 1, borderColor: width < 450 ? "#fff" : "#111",  padding: 8, borderRadius: 32, marginRight: 4,}]}>
                                                    <Image style={styles.icon}
                                                        source={width < 450 ? require("../../assets/icons/minus-white.png") : require("../../assets/icons/minus.png")} />
                                                </TouchableOpacity>
                                                <View style={{width: '30%', height: '30%', borderRadius: 8, borderWidth: 1, borderColor: width < 450 ? "#fff" : "#111", marginRight: 4, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Text style={styles.small_txt}>{cart?.quantity}</Text>
                                                </View>
                                                <TouchableOpacity 
                                                        onPress={() => increase_count(cart?.id)}
                                                        style={[styles.icon_view, {borderWidth: 1, borderColor: width < 450 ? "#fff" : "#111",  padding: 8, borderRadius: 32,}]}>
                                                    <Image style={styles.icon}
                                                    source={width < 450 ? require("../../assets/icons/plus-white.png") : require("../../assets/icons/plus.png")}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                            )
                        })
                    }
                    <View style={{width: '95%', height: 200, marginTop: 10,  backgroundColor: width < 500 ? '#3b3c3d' : '#fff', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: 8,}}>
                            <Text style={styles.large_txt}>Ваша Корзина</Text>
                            <Text style={styles.large_txt}>Итого</Text>
                        </View>
                        <View style={{width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: 8, marginTop: 8,}}>
                            <Text style={styles.small_txt}>Товары ({totalQuantity})</Text>
                            <Text style={styles.large_txt}>${totalPrice}</Text>
                        </View>
                        <View style={{width: '100%', borderBottomWidth: 0.5, borderBottomColor: '#000', marginTop: 16, marginBottom: 16,}}></View>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("OrderScreen", {totalPrice: totalPrice, totalQuantity: totalQuantity, userdetails: userData, listCarts: listCarts})}>
                            <Text style={[styles.large_txt, {color: '#fff'}]}>К оформлению</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                :
                <View style={[styles.card, {marginTop: '30%'}]}>
                    <View style={styles.shopping_cart_icon}>
                        <Image style={styles.icon} source={require("../../assets/icons/shopping-cart.png")}/>
                    </View>
                    <Text style={[styles.large_txt, {marginBottom: 16,}]}>Ваша Корзина пуста</Text>
                    <Text style={[styles.small_txt, {marginBottom: 16,}]}>Воспользуйтесь каталогом, чтобы добавить товар</Text>
                    <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("CategoryNativeStack")}>
                        <Text style={[styles.large_txt, {color: '#fff', }]}>ПЕРЕЙТИ В КОТОЛОГ</Text>
                    </TouchableOpacity>
                </View>
            }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#f2f2f2',
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 0,

        backgroundColor: width < 500 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },
    cart_header: {
        width: '100%',
        height: 70,
        justifyContent: 'center',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        height: 250,
        backgroundColor: width < 500 ? '#3b3c3d' : '#fff',
        borderRadius: 8,
    },
    small_txt:{
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.25,
        fontFamily: 'RobotoRegular', 
        color: width < 500 ? '#fff' : '#000',
    },
    large_txt: {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium',
        textAlign: 'center',
        color: width < 500 ? '#fff' : '#000',
    },

    btn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,

        backgroundColor: '#0BB798'
    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    logo: {
        width: 80,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,

        borderWidth: 1,
        borderColor: '#0BB798',
        borderRadius: 16,
    },
    shopping_cart_icon: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    image_View: {
        width: '35%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    scroll: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: 100,
    },
    cart_text_view: {
        width: '60%',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',  
    },
    icon_view: {
        width: 33,
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fav_view: {
        width: '33%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    del_view: {
        width: '33%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    update_view: {
        width: '33%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },

})

export default ShoppingCart;