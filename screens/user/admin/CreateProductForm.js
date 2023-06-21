import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, ToastAndroid} from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import Input from '../../../components/Input';

const base64 = require('base-64');

const {width} = Dimensions.get("window");

const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const CreateProductForm = ({navigation, route}) => {

    const {categoryId, userData} = route.params;

    const [name, changeName] = useState('');
    const [brand, changeBrand] = useState('');
    const [price, changePrice] = useState('');
    const [inStock, changeInStock] = useState('');
    const [description, changeDescription] = useState('');

    const userName = userData.userName;
    const password = userData.password;

    console.log(userName);
    console.log(password);

    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

    const createNewProduct = async () => {

        if(!name)  ToastAndroid.showWithGravityAndOffset("Product name is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!brand)  ToastAndroid.showWithGravityAndOffset("Brand name is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!price)  ToastAndroid.showWithGravityAndOffset("Price is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!inStock)  ToastAndroid.showWithGravityAndOffset("InStock is required", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
       
        else {

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

                const response = await fetch('http://192.168.1.104:8080/api/v1/categories/' + categoryId + '/products/new', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Basic " + base64.encode(userName+":"+password)
                    },
                    body: JSON.stringify({
                            name: name,
                            description: description,
                            brand: brand,
                            price: price,
                            inStock: inStock,

                        }),
                })
                if(response.ok){
                    const data = await response.json();
                    navigation.navigate("ProductsTableScreen", {categoryId: categoryId, userData: userData})
                   alert("Product " + data.id + " added to the DB.")
                }else{
                    ToastAndroid.showWithGravityAndOffset("There is some thing wrong. please try again!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
                }
                
                
            } catch (error) {
                console.log("Error" + error);
            }

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
                    <Text style={styles.large_txt}>Создай Новый товар</Text>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="Name" value={name} onChangeText={changeName} type="name" capitalize='sentences'  editable={true}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="Brand" value={brand} onChangeText={changeBrand} type="name" capitalize='sentences'  editable={true}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="Price" value={price} onChangeText={changePrice} type="off" capitalize='none'  editable={true}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="InStock" value={inStock} onChangeText={changeInStock} type="off" capitalize='none'  editable={true}/>
                    <View style={styles.form_row}>
                        <Text style={[styles.large_txt, {marginTop: 12,}]}>Description</Text>
                        <TextInput
                        style={[styles.input, {height: 150, justifyContent: 'flex-start', alignItems: 'flex-start', textAlignVertical: 'top'}]}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="Описание"
                        value={description}
                        onChangeText={changeDescription}
                        autoCapitalize="sentences" 
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.btn} onPress={createNewProduct}>
                        <Text style={[styles.large_txt, {color: '#fff',  marginTop: 10,}]}>Сохранить</Text>
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
        backgroundColor: '#0BB798',
        marginTop: 12,
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
        borderColor: width < 500 ? "#347" : '#000',
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

export default CreateProductForm;