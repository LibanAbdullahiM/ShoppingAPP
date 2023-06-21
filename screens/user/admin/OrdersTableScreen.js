import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import EditOrderForm from "./EditOrderForm";

const base64 = require('base-64');

const {width} = Dimensions.get("window");

const OrdersTableScreen = ({navigation, route}) => {

 
    const {userData} = route.params;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const userName = userData.userName;
    const password = userData.password;

    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

    const getOredrsFromApi = async () => {

        setLoading(true);
        setOrders([]);

        try {
            //const response = await fetch('http://172.20.10.12:8080/api/v1/orders');
            const response = await fetch('http://192.168.1.104:8080/api/v1/orders');
            if(response.ok){
                const data = await response.json();
                setOrders(data);
                setLoading(false);
                console.log("Orders are Loaded........................!")
                //console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteOrder = async (orderId) => {
        try {
            await fetch('http://192.168.1.104:8080/api/v1/orders/' + orderId + '/delete',{
                method: 'DELETE',
                headers: headers,
            })
            getOredrsFromApi();
            alert("Order " + orderId + " deleted.");
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(

        React.useCallback(() => {

    
            getOredrsFromApi();
            console.log("THE SCREEN OF ORDERSTABLE WAS FOCUSED!")
           

            return () => {
                // Do something when the screen is unfocused
                   console.log("THE SCREEN OF ORDERSTABLE  WAS UNFOCUSED!")
                 };

        }, [navigation])
      );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.header_body}>
                    <Text style={[styles.large_txt, {marginTop: 8, marginLeft: 16, marginBottom: 16,}]}>Список Заказов</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cross_icon}>
                    <Image style={styles.icon} source={width < 500 ? require("../../../assets/icons/back-white.png") : require("../../../assets/icons/back.png")}/>
            </TouchableOpacity>
            <View style={{marginTop: '15%', width: '100%',}}>
                    <TableHeader/>
                    {
                        loading ?
                        <ActivityIndicator size={'large'}/>
                        :
                        <ScrollView style={{ marginBottom: '30%'}}>
                            {
                                orders.map((order, index) => {
                                   
                                    return <TableRow key={index} order={order} navigation={navigation} userData={userData} deleteOrder={deleteOrder}/>
                                })
                            }
                        </ScrollView>
                    }
            </View>
        </View>
    )
}

export const TableHeader = () => {

    return (
        <View style={styles.table_header}>
            <View style={[styles.cel, {width: '10%',}]}>
                <Text style={styles.large_txt}>ID</Text>
            </View>
            <View style={[styles.cel, {width: '35%',}]}>
                <Text style={styles.large_txt}>ORDER NUMBER</Text>
            </View>
            <View style={[styles.cel, {width: '18.3%',}]}>
                <Text style={styles.large_txt}>STATUS</Text>
            </View>
            <View style={[styles.cel, {width: '18.3%',}]}>
                <Text style={styles.large_txt}>ACTION</Text>
            </View>
            <View style={[styles.cel, {width: '18.3%',}]}>
                <Text style={styles.large_txt}>ACTION</Text>
            </View>
        </View>
    )
    
}

export const TableRow = ({order, navigation, userData, deleteOrder}) => {
 
    return (
        <View style={styles.row}>
            <TouchableOpacity style={[styles.cel, {width: '10%',}]}>
                <Text  style={[styles.small_txt, {color: '#126'}]}>{order?.id}</Text>
            </TouchableOpacity>
            <View style={[styles.cel, {width: '35%',}]}>
                <Text style={styles.small_txt}>{order?.orderNumber}</Text>
            </View>
            <View style={[styles.cel, {width: '18.3%',}]}>
                <Text style={styles.small_txt}>{order?.orderStatus}</Text>
            </View>
            <TouchableOpacity style={[styles.cel, {width: '18.3%',}]} onPress={() => navigation.navigate("EditOrderForm", {order: order, userData: userData,})}>
                <Text style={[styles.small_txt, {color: '#126'}]}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cel, {width: '18.3%',}]} onPress={() => deleteOrder(order?.id)}>
                <Text style={[styles.small_txt, {color: '#126'}]}>DELETE</Text>
            </TouchableOpacity>
        </View>
    )
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
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
        left: '5%',

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
        height: 50,
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
    }
})

export default OrdersTableScreen;