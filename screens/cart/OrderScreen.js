import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, RefreshControl, ToastAndroid } from "react-native";
import Input from "../../components/Input";

const {width} = Dimensions.get("window");

const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const OrderScreen = ({navigation, route}) => {

    const inputRef = useRef();

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

    const {totalPrice, totalQuantity, userdetails, listCarts} = route.params;

    const [firstName, changeFirstName] = useState(userdetails?.firstName);
    const [lastName, changeLastName] = useState(userdetails?.lastName);
    const [email, changeEmail] = useState(userdetails?.email);
    const [phoneNumber, changePhoneNumber] = useState(userdetails?.phoneNumber);

    const [address, changeAddress] = useState('');
    const [country, changeCountry] = useState('СОМАЛИ');
    const [city, changeCity] = useState('');
    const [zipcode, changeZipcode] = useState('');

    const confimrOrder = () => {

        if(!firstName)  ToastAndroid.showWithGravityAndOffset("First name is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!lastName)  ToastAndroid.showWithGravityAndOffset("Last name is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!email)  ToastAndroid.showWithGravityAndOffset("Email is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!email.match(regex))  ToastAndroid.showWithGravityAndOffset("Invalid Email", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!address)  ToastAndroid.showWithGravityAndOffset("Username is required", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!city)  ToastAndroid.showWithGravityAndOffset("The password must be at least 8 characters", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);

        else {

            const orderDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                country: country,
                city: city,
                zipcode: zipcode,
            }

            if (orderDetails !== null){
                navigation.navigate("ConfirmationScreen", {totalPrice: totalPrice, totalQuantity: totalQuantity, userdetails: userdetails, orderDetails: orderDetails, listCarts: listCarts})
            }
        }
    }

    
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.header_content}>
                    <Text style={[styles.large_txt,]}>Оформление Заказа</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.back_button} onPress={() => navigation.navigate("ShoppingCart")}>
                <Image style={styles.back_Icon} source={width < 450 ? require("../../assets/icons/back-white.png") : require("../../assets/icons/back.png")}/>
            </TouchableOpacity>
            <ScrollView style={styles.scroll} contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
            }} >
                
                <View style={{width: '95%', padding: 4, marginTop: 10,  backgroundColor: width < 500 ? '#3b3c3d' : '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 12,}}>
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
                <View style={{width: '95%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', margin: 8,}}>
                    <View style={{flex: 1, borderWidth: 2, borderColor: '#441', padding: 8, borderTopLeftRadius: 8, borderBottomLeftRadius: 8,}}>
                        <Text style={[styles.large_txt, {color: '#991'}]}>Способ Получение</Text>
                    </View>
                    <View style={{flex: 1, backgroundColor: width < 450 ?  '#3b3c3d' : 'rgba(1, 1, 1, 0.3)', padding: 8, borderWidth: 2,  borderColor: 'rgba(1, 1, 1, 0.3)', borderTopRightRadius: 8, borderBottomRightRadius: 8,}}>
                        <Text style={[styles.large_txt, {color: 'rgba(255, 255, 255, 0.3)'}]}>Куръером</Text>
                    </View>
                </View>
                <View style={{width: '95%', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    
                    <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start',}}>
                        <Text style={[styles.large_txt, {fontFamily: 'RobotoBold', fontSize: 22, lineHeight: 28, letterSpacing: 0, textAlign: 'left'}]}>Получатель</Text>
                    </View>

                    <View style={{width: '100%', marginTop: 10,  backgroundColor: width < 500 ? '#3b3c3d' : '#fff', borderRadius: 12, paddingTop: 8,}}>
                        <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                        }} label="FirstName" value={firstName} onChangeText={changeFirstName} type="name" capitalize='sentences' editable={true} />
                        <Input styles={{
                            form_row: styles.form_row,
                            input: styles.input,
                            large_txt: styles.large_txt
                        }} label="LastName" value={lastName} onChangeText={changeLastName} type="name" capitalize='sentences' editable={true} />
                        <Input styles={{
                            form_row: styles.form_row,
                            input: styles.input,
                            large_txt: styles.large_txt
                        }} label="Email" value={email} onChangeText={changeEmail} type="email" capitalize='none'editable={true} />
                        <Input styles={{
                            form_row: styles.form_row,
                            input: styles.input,
                            large_txt: styles.large_txt
                        }} label="Phone Nmber" value={phoneNumber} onChangeText={changePhoneNumber} type="tel" capitalize='sentences' editable={true} />
        
                    </View>
                </View>

                <View style={{width: '95%', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 8,}}>
                    
                    <View style={{width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start',}}>
                        <Text style={[styles.large_txt, {fontFamily: 'RobotoBold', fontSize: 22, lineHeight: 28, letterSpacing: 0, textAlign: 'left'}]}>Адрес Получателя</Text>
                    </View>

                    <View style={{width: '100%', marginTop: 10,  backgroundColor: width < 500 ? '#3b3c3d' : '#fff', borderRadius: 12, paddingTop: 8,}}>
                        <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                        }} label="Страна" value={country} onChangeText={changeCountry} type="name" capitalize='sentences' editable={false} />
                        <Input styles={{
                            form_row: styles.form_row,
                            input: styles.input,
                            large_txt: styles.large_txt
                        }} label="Город" value={city} onChangeText={changeCity} type="postal-address-region" capitalize='sentences' editable={true} />
                        <Input styles={{
                            form_row: styles.form_row,
                            input: styles.input,
                            large_txt: styles.large_txt
                        }} label="Адрес" value={address} onChangeText={changeAddress} type="postal-address" capitalize='sentences' editable={true} />
                        <Input styles={{
                            form_row: styles.form_row,
                            input: styles.input,
                            large_txt: styles.large_txt
                        }} label="Индекс" value={zipcode} onChangeText={changeZipcode} type="tel-country-code" capitalize='sentences' editable={true} />
        
                    </View>
                </View>
               <View style={{marginBottom: '20%', width: '100%', justifyContent: 'center', alignItems: 'center', padding: 8,}}>
                <TouchableOpacity style={styles.btn} onPress={() => confimrOrder()}>
                                <Text style={[styles.large_txt, {color: '#fff'}]}>Подтвердите и завершите</Text>
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

export default OrderScreen;