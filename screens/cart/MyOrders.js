import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, RefreshControl } from "react-native";


const base64 = require('base-64');

const {width} = Dimensions.get("window");

const MyOrders = ({navigation, route}) => {

    const {userData} = route.params;

    const [orders, setOredrs] = useState([]);
    const [status, setStatus] = useState(null);
    const [Refreshing, setRefreshing] = useState(false);

    const userName = userData.userName;
    const password = userData.password;

    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

    const getOrdersFromAPI = async () => {

        setOredrs([]);

        try {
            // const response = await fetch("http://172.20.10.12:8080/api/v1/user/orders", {
            //     method: "GET",
            //     headers: headers,
            // });
            const response = await fetch("http://192.168.1.104:8080/api/v1/user/orders", {
                method: "GET",
                headers: headers,
            });
            if(response.ok){
                const data = await response.json();
                
                setOredrs(data.filter(order => order.orderStatus === "CLOSE"));
                setRefreshing(false);
                //console.log("ORDER ", data, " ARE LOADED");
            }

        } catch (error) {
            console.log(error);
        }

    }
  
    useFocusEffect(

        React.useCallback(() => {

            getOrdersFromAPI();

            console.log("THE MYORDERS SCREEN WAS FOCUSED!")
           

            return () => {
                // Do something when the screen is unfocused
                   console.log("THE MYORDERS SCREEN WAS UNFOCUSED!")
                 };

        }, [navigation])
      );

    const handleRefresh = () => {
        setRefreshing(true);
        getOrdersFromAPI();
       
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.cart_header}>
                    <Text style={[styles.large_txt, {marginTop: 8, marginLeft: 16, marginBottom: 16,}]}>МОИ ЗАКАЗЫ</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Account", {screen: 'Profile', params: {_userdetails: userData}})} style={styles.cross_icon}>
                        <Image style={styles.icon} source={width < 500 ? require("../../assets/icons/back-white.png") : require("../../assets/icons/back.png")}/>
            </TouchableOpacity>

            <ScrollView style={styles.scroll} contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
            }} 
            refreshControl={
                <RefreshControl refreshing={Refreshing}
                                onRefresh={handleRefresh}/>
            }>
                {
                    orders.map((order, index) => {
                        return (
                            <TouchableOpacity key={index}
                                    onPress={() => navigation.navigate("OrderDetailsScreen", {order: order, userData:userData})}
                                    style={{width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', marginTop: 16,}}>
                                <View style={styles.card}>
                                    <View style={styles.card_header}>
                                        <Text style={styles.small_txt}>Заказ от {order.dateOrdered}</Text>
                                        <Text style={[styles.small_txt, {color: 'rgba(0, 0, 255, 0.6)'}]}>{order?.orderNumber}</Text>
                                    </View>
                                    <View style={{width: '100%', borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', marginTop: 12,}}></View>
                                    <View style={styles.card_body}>
                                        <View style={{width: 90, height: 25, backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 22,}}>
                                            <Text style={styles.small_txt}>Получено</Text>
                                        </View>
                                        <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                                            {
                                                order.products.map((product, index)=> {
                                                    return (
                                                        <View key={index} style={styles.image_View}>
                                                                <Image style={styles.image} source={{                                                                                                                                   
                                                                        uri: 'http://192.168.1.104:8080/api/v1/products/'+ product.id +'/images/' + 0
                                                                        //uri: 'http://172.20.10.12:8080/api/v1/products/'+ product.id +'/images/' + 0
                                                                    }}/>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
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
        backgroundColor: width < 450 ? '#3b3c3d' : '#fff',
        borderRadius: 8,
        flexDirection: 'column',
    },
    card_header: {
        width: '100%',
        height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 12,
    },
    card_body: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 12,
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
    cross_icon: {
        width: 23,
        height: 23,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'absolute',
        top: '6%',
        left: '5%',

    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    image_View: {
        width: 50,
        height: 50,
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

})

export default MyOrders;