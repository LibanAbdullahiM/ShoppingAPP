import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, ToastAndroid} from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import Input from '../../../components/Input';
import SelectDropdown from 'react-native-select-dropdown';

const base64 = require('base-64');

const {width} = Dimensions.get("window");

const orderStatus = ["NEW", "SHIPPED", "DELIVERED", "CLOSE"]

const EditOrderForm = ({navigation, route}) => {

    const {order, userData} = route.params;

    const [OrderNumber, changeOrderNumber] = useState(order.orderNumber);
    const [DateOrdered, changeDateOrdered] = useState(order.dateOrdered);
    const [quantities, changeQuantities] = useState(order.orderNumber);
    const [price, changeTotalPrice] = useState(order.totalPrice);
    const [orderStatus, changeOrderStatus] = useState(order.orderStatus);

    const userName = userData.userName;
    const password = userData.password;

    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

    const changeStatus = async (orderId) => {

        try {
            // const response = await fetch('http://172.20.10.12:8080/api/v1/register', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({
            //             firstName: firstName,
            //             lastName: lastName,
            //             email: email,
            //             phoneNumber: phoneNumber,
            //             userName: userName,
            //             password: password,
            //         }),
            // })

            const response = await fetch('http://192.168.1.104:8080/api/v1/orders/' + orderId + '/change-status', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Basic " + base64.encode(userName+":"+password)
                    },
                    body: orderStatus,
            })
            if(response.ok){
                const data = await response.json();
                navigation.navigate("OrdersTableScreen", {userData: userData})
                alert("Order Status of the Order " + orderId + " Changed")
            }else{
                ToastAndroid.showWithGravityAndOffset("The User name already exist. please use another one!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
            }
            
            
        } catch (error) {
            console.log("Error" + error);
        }

           
    }

    return (
        <View style={[styles.container, {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        }]}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
            </View>
           <ScrollView style={[styles.container, {height: '100%', position: 'absolute', top: 30,}]} contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
           }}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cross_icon}>
                    <Image style={styles.icon} source={width < 500 ? require("../../../assets/icons/back-white.png") : require("../../../assets/icons/back.png")}/>
                </TouchableOpacity>

                <View style={styles.card}>
                    <Text style={styles.large_txt}>изменить статус заказа</Text>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="OrderNumber" value={OrderNumber} onChangeText={changeOrderNumber} type="off" capitalize='none'  editable={false}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="Date Ordered" value={DateOrdered} onChangeText={changeDateOrdered} type="off" capitalize='none'  editable={false}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="Quantities" value={`${quantities}`} onChangeText={changeQuantities} type="off" capitalize='none'  editable={false}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="TotalPrice" value={`${price}`} onChangeText={changeTotalPrice} type="off" capitalize='none' editable={false}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="Order Status" value={orderStatus} onChangeText={changeOrderStatus} type="off" capitalize='word' editable={true}/>
                    <TouchableOpacity style={styles.btn} onPress={() => changeStatus(order?.id)}>
                        <Text style={[styles.large_txt, {color: '#fff',  marginTop: 10,}]}>Сохрани</Text>
                    </TouchableOpacity>
                </View>  
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
    header: {
        width: '100%',
        height: 30,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 0,

        backgroundColor: width < 500 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',
    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card:{
        flex: 1,
        width: '95%',
        height: 550,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: width < 500 ? '#3b3c3d' : '#fff',
        borderRadius: 8,
        marginTop: '18%',
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
    btn: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,

        backgroundColor: '#0BB798'
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
        borderRadius: 4,
        marginLeft: 10,
        borderColor: width < 500 ? "#347" : 'rgba(0, 0, 0, 0.1)',
        color: '#000',
        padding: 8,
        backgroundColor: '#fff'
    },
    login_icon: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: width < 450 ? '22%' : '10%',
        top: width < 450 ? '45%' : '10%',
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
})

export default EditOrderForm;