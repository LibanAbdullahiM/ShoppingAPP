import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, RefreshControl } from "react-native";
import OrderDetails from "./OrderDetails";

const base64 = require('base-64');

const {width} = Dimensions.get("window");

const ConfirmationScreen = ({navigation, route}) => {

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          navigation.getParent()?.setOptions({
            tabBarStyle: {
              display: "none"
            }
          });

        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => {

            navigation.getParent()?.setOptions({
                tabBarStyle: undefined
              });

            return unsubscribe;
        }
      }, [navigation]);

    const {totalPrice, totalQuantity, userdetails, orderDetails, listCarts} = route.params;

    const completeOrder = async () => {
        if(listCarts !== null && userdetails !== null & orderDetails !== null){

            try {
                const userName = userdetails.userName;
                const password = userdetails.password;
            
                let headers = new Headers();
                headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

                const response = await fetch('http://192.168.1.104:8080/api/v1/orders',{
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Basic " + base64.encode(userName+":"+password)
                    },
                    body: JSON.stringify(orderDetails)
                });
    
                if(response.ok){
                    const data = await response.json();
                    console.log("ORDER COMPLETED SUCCESSFULLY.....................!");
                    navigation.navigate("CompleteScreen");

                }
                
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.header_content}>
                    <Text style={[styles.large_txt,]}>Подтверждение заказа</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.back_button} onPress={() => navigation.navigate("OrderScreen")}>
                <Image style={styles.back_Icon} source={width < 450 ? require("../../assets/icons/back-white.png") : require("../../assets/icons/back.png")}/>
            </TouchableOpacity>
            <ScrollView style={styles.scroll} contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
            }} >
                <View style={{width: '95%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 8,}}>
                    <View style={{flex: 1, borderWidth: 2, borderColor: '#441', padding: 8, borderTopLeftRadius: 8, borderBottomLeftRadius: 8,}}>
                        <Text style={[styles.large_txt, {color: '#991'}]}>Способ Получение</Text>
                    </View>
                    <View style={{flex: 1, backgroundColor: width < 450 ?  '#3b3c3d' : 'rgba(1, 1, 1, 0.3)', padding: 8, borderWidth: 2,  borderColor: 'rgba(1, 1, 1, 0.3)', borderTopRightRadius: 8, borderBottomRightRadius: 8,}}>
                        <Text style={[styles.large_txt, {color: 'rgba(255, 255, 255, 0.3)'}]}>Куръером</Text>
                    </View>
                </View>

                <OrderDetails orderDetails={orderDetails}/>

                <View style={{width: '95%', height: 120, padding: 4,  backgroundColor: width < 500 ? '#3b3c3d' : '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 16,}}>

                    <View style={{width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', margin: 8,}}>
                        <Text style={[styles.large_txt, {fontFamily: 'RobotoBold', fontSize: 22, lineHeight: 28, letterSpacing: 0, textAlign: 'left'}]}>Оспособ оплаты</Text>
                    </View>
                    <View style={{width: '90%', height: '50%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 8, backgroundColor: 'rgba(0, 255, 0, 0.1)', borderRadius: 16,}}>
                        <Text style={styles.large_txt}>Наложенный платеж</Text>
                    </View>

                </View>

                <View style={{width: '95%', padding: 4, marginTop: 16,  backgroundColor: width < 500 ? '#3b3c3d' : '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 8,}}>
                    <View style={{width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: 8,}}>
                        <Text style={styles.large_txt}>Ваша Заказа</Text>
                    </View>
                    <View style={{width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: 8, marginTop: 8,}}>
                        <Text style={styles.small_txt}>Товары ({totalQuantity})</Text>
                        <Text style={styles.large_txt}>${totalPrice}</Text>
                    </View>
                    <View style={{width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: 8, marginTop: 8,}}>
                        <Text style={styles.small_txt}>Скидка</Text>
                        <Text style={styles.large_txt}>0</Text>
                    </View>
                    <View style={{width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: 8, marginTop: 8,}}>
                        <Text style={styles.small_txt}>Доставка</Text>
                        <Text style={[styles.large_txt, {color: '#4BB543',}]}>Бесплаьно</Text>
                    </View>
                    <View style={{width: '100%', borderBottomWidth: 0.5, borderBottomColor: '#000', marginTop: 8, }}></View>
                    <View style={{width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: 8, marginTop: 8,}}>
                        <Text style={styles.small_txt}>ИТОГО</Text> 
                        <Text style={styles.large_txt}>${totalPrice}</Text>
                    </View>
                </View>

                <View style={{marginBottom: '20%', width: '100%', justifyContent: 'center', alignItems: 'center', padding: 8,}}>
                    <TouchableOpacity style={styles.btn} onPress={() => completeOrder()}>
                        <Text style={[styles.large_txt, {color: '#fff'}]}>завершите</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: width < 450 ? 'rgba(0, 0, 0, 1)' : '#f2f2f2',
    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    header: {
        width: '100%',
        height: 70,
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 0,
        backgroundColor: width < 450 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',
    },
    header_content: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: '20%',
    },
    scroll: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: 70,
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
    back_button: {
        width: 30,
        height: 40,
        position: 'absolute',
        top: 28,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 1,
    },
    back_Icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    form_row: {
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16,
        flexWrap: 'wrap',
        paddingLeft: 4,
        paddingRight: 8,
    },
    input: {
        width: '65%',
        height: '70%',
        borderWidth: 2,
        borderRadius: 8,
        marginLeft: 10,
        borderColor: width < 500 ? "#347" : '#000',
        color: '#000',
        padding: 8,
        backgroundColor: '#fff'
    },
})

export default ConfirmationScreen;