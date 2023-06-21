import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from 'react-native';
import * as Updates from 'expo-updates';
import AdminNativeStack from "./admin/AdminNativeStack";

const base64 = require('base-64');

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const {width} = Dimensions.get("window");

const Profile = ({navigation, route}) => {

    const {_userdetails} = route.params;

    const [userData, setUserData] = useState(_userdetails === null ? {} : _userdetails);
    const [orders, setOredrs] = useState([]);
    const [status, setStatus] = useState(null);
    const [Refreshing, setRefreshing] = useState(false);

    const userName = userData.userName;
    const password = userData.password;

    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

    const getOrderFromAPI = async () => {

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
                
                setOredrs(data.filter(order => order.orderStatus !== "CLOSE"));
                console.log(data);
                setRefreshing(false);
                //console.log("ORDER ", data, " ARE LOADED");
            }

        } catch (error) {
            console.log(error);
        }

    }

    const role = userData?.roles === undefined  ? '' : userData?.roles[0]?.role;

    useFocusEffect(

        React.useCallback(() => {
            getUserData();
            getOrderFromAPI();

            console.log("THE PROFILE SCREEN WAS FOCUSED!")
           

            return () => {
                // Do something when the screen is unfocused
                   console.log("THE PROFILE SCREEN WAS UNFOCUSED!")
                 };

        }, [navigation])
      );

    const getUserData = async () => {

        try {
            const data = await AsyncStorage.getItem("UserDetails");
            if(data !== null){
                setUserData(JSON.parse(data));
            }
        } catch (error) {
            
        }
    }

    const handleRefresh = () => {
        setRefreshing(true);
        getOrderFromAPI();
       
    }

    //console.log(role)
   

    const logout = async () => {

        try {
            await AsyncStorage.removeItem('UserDetails');
            //Updates.reloadAsync();
            navigation.navigate('Loging');
        } catch (error) {
            
        }
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
            </View>
            <ScrollView style={styles.container} contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
            }} 
            refreshControl={
                <RefreshControl refreshing={Refreshing}
                                onRefresh={handleRefresh}/>
            }>
                <View style={[styles.profile_card, { flexDirection: 'row', justifyContent: 'space-between'}]}>
                    <TouchableOpacity style={{width: '95%', height: '100%', flexDirection: 'row', justifyContent: 'center', }}>
                        <View style={styles.profile_logo}>
                            <Text style={[styles.large_txt, {fontFamily: 'RobotoBold', fontSize: 28, lineHeight: 40, color:'#fff', marginTop: 10,}]}>{userData.firstName !== undefined ? userData?.firstName.slice(0, 1) : ''}{userData.firstName !== undefined ? userData?.lastName.slice(0, 1) : ''}</Text>
                        </View>
                        <View style={styles.profile_name}>
                            <Text style={[styles.large_txt, {fontFamily: 'RobotoBold', fontSize: 28, lineHeight: 40,}]}>{userData.firstName !== undefined ? userData?.firstName : ''}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{width: '5%', height: 18, justifyContent: 'center', alignItems: 'center', marginTop: 10,}}>
                        <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={width < 450 ? require('../../assets/icons/forward-arrow-white.png'): require('../../assets/icons/forward-arrow.png')}/>
                    </View>
                </View>
                {
                    orders.length > 0 ?
                    <ScrollView style={{width: '100%', borderWidth: 1, margin: 8, backgroundColor: width < 500 ? '#3b3c3d' : '#fff',}} contentContainerStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        }} horizontal showsHorizontalScrollIndicator={false}>
                          {
                            orders.map(order => {
                                return order?.products.map((product, index) => {
                                    console.log(order.orderStatus);
                                return (
                                    <View key={index} style={{width: '55%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', margin: 8, }}>
                                            <View style={styles.order_image_view}>
                                                <Image style={styles.image} source={{                                                                                                                                   
                                                                    uri: 'http://192.168.1.104:8080/api/v1/products/'+ product.id +'/images/' + 0
                                                                    //uri: 'http://172.20.10.12:8080/api/v1/products/'+ product.id +'/images/' + 0
                                                                }}/>
                                            </View>
                                            <View style={{width: '70%',}}>
                                                <Text style={[styles.small_txt, {marginBottom: 0,}]}>{product.name.slice(0, 50)}</Text>
                                                <Text style={[styles.large_txt, {marginBottom: 0,}]}>${product.price}</Text>
                                                <Text style={[styles.large_txt, {marginBottom: 0,}]}>{order.orderStatus}</Text>
                                            </View>
                                    </View>
                                )
                            })})
                          }
                    </ScrollView>
                    : ''
                }
                {
                    role === "ADMIN" ? 
                        <View style={[styles.profile_card, {marginTop: 12,}]}>
                            <TouchableOpacity
                                    onPress={() => navigation.navigate("AdminNativeStack", {userData: userData})} 
                                    style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={[styles.large_txt]}>Административный раздел</Text>
                                <View style={{width: '5%', height: 18, justifyContent: 'center', alignItems: 'center', marginTop: 10,}}>
                                    <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={width < 450 ? require('../../assets/icons/forward-arrow-white.png'): require('../../assets/icons/forward-arrow.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : 
                        ''
                }
                <View style={[styles.profile_card, {marginTop: 12,}]}>
                    <TouchableOpacity
                            onPress={() => navigation.navigate("CartNativeStack", {screen: 'MyOrders', params: {userData: userData}})}
                            style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[styles.large_txt]}>Мои Заказы</Text>
                        <View style={{width: '5%', height: 18, justifyContent: 'center', alignItems: 'center', marginTop: 10,}}>
                            <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={width < 450 ? require('../../assets/icons/forward-arrow-white.png'): require('../../assets/icons/forward-arrow.png')}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[styles.large_txt]}>Любимые Товары</Text>
                        <View style={{width: '5%', height: 18, justifyContent: 'center', alignItems: 'center', marginTop: 10,}}>
                             <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={width < 450 ? require('../../assets/icons/forward-arrow-white.png'): require('../../assets/icons/forward-arrow.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start', marginTop: 12, padding: 8,}}>
                    <Text style={styles.small_txt}>ПРИЛОЖЕНИЕ</Text>
                </View>
                <View style={[styles.profile_card, {marginTop: -22,}]}>
                    <TouchableOpacity 
                                style={
                                    {
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }
                                } onPress={() => navigation.navigate("Help")}>
                            <Text style={[styles.large_txt]}>Помощь</Text>
                            <View style={{width: '5%', height: 18, justifyContent: 'center', alignItems: 'center', marginTop: 10,}}>
                                <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={width < 450 ? require('../../assets/icons/forward-arrow-white.png'): require('../../assets/icons/forward-arrow.png')}/>
                            </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => logout()}>
                    <Text style={[styles.large_txt, {color: '#fff', fontSize: 22, marginTop:12,}]}>Выйти</Text>
                </TouchableOpacity>
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
        position: 'relative',
        top: 0,

        backgroundColor: width < 500 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',
    },
    profile_card:{
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: width < 500 ? '#3b3c3d' : '#fff',
        borderRadius: 8,
        top: 0,
        padding: 8,
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
        textAlign: 'left',
        color: width < 450 ? '#fff' : '#000',
    },

    btn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,

        backgroundColor: '#c22f2f'
    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    txt: {
        fontSize: 22,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium', 
        color: '#0BB798',
    },
    profile_logo: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        borderRadius: 48,
    },
    profile_name: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    order_image_view: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }

})

export default Profile;