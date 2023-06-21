import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';

const base64 = require('base-64');

const width = Dimensions.get("window");

const options =  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
}

const UploadProductImage = ({navigation, route}) => {

    const {productId, userData, categoryId} = route.params;

    const userName = userData.userName;
    const password = userData.password;

    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

    const formData = new FormData();

    
    const uploadImageToAPI = async () => {

        try {
           // const response = await fetch('http://172.20.10.12:8080/api/v1/categories/' + categoryId + '/products');
            const response = await fetch('http://192.168.1.104:8080/api/v1/products/' + productId + '/uploadImage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Basic " + base64.encode(userName+":"+password),
                },
                body: formData
            });
            if(response.ok){
                Alert.alert('Image Uploaded', 'Do you want to upload another image ?', [
                    {
                      text: 'Cancel',
                      onPress: () => navigation.navigate("ProductsTableScreen", {categoryId: categoryId, userData: userData}),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
                console.log("Product Image uploaded........................!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
    
        console.log(response);

        //const fileName = response.assets[0].uri.substring(response.assets[0].uri.lastIndexOf('/') + 1);
        
        const imageUri = response.assets[0].uri;
        const fileName = imageUri.split("/").pop();
        const type = mime.getType(imageUri);

        const newImageUri = "file:///" + imageUri.split("file:/").join("");

        console.log("OLD IMAGE URI " + imageUri);
        console.log("NEW IMAGE URI " + newImageUri);
        console.log(fileName);
        console.log(type);

        formData.append('file', {
            uri: imageUri,
            type: type,
            name: fileName
        })

        uploadImageToAPI();

      };


    console.log("PRODUCT WE NEED TO UPLOAD AN IMAGE IS: " + productId);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.header_body}>
                    <Text style={[styles.large_txt, {marginTop: 8, marginLeft: 16, marginBottom: 16,}]}>Загрузка изображения товара</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cross_icon}>
                    <Image style={styles.icon} source={width < 500 ? require("../../../assets/icons/back-white.png") : require("../../../assets/icons/back.png")}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableOpacity} onPress={pickImage}>
                <Text style={[styles.large_txt, {color: '#fff', fontSize: 22,  fontFamily: 'RobotoBold',}]}>UploadImage</Text>
            </TouchableOpacity>
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
        textAlign: 'center',
        color: width < 500 ? '#fff' : '#000',
    },
    touchableOpacity:{
        width: '50%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0BB798',
        borderRadius: 32,
    },
    icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
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

})

export default UploadProductImage;