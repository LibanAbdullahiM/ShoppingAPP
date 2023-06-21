import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, Image, ToastAndroid} from 'react-native';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from '../../components/Input';
import { LogBox } from 'react-native';
import * as Updates from 'expo-updates';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const {width} = Dimensions.get("window");

const base64 = require('base-64');

const Loging = ({navigation, route}) => {

    const [userName, changeUserName] = useState('');
    const [password, changePassword] = useState('');
    const [userData, setUserData] = useState({});
    
    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(userName+":"+password));

    const login = async () => {

        if (!userName)  ToastAndroid.showWithGravityAndOffset("Username is required", ToastAndroid.LONG, ToastAndroid.TOP, 10,260);
        else if (!password || password.length < 8)  ToastAndroid.showWithGravityAndOffset("Password is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,260);

        else {

            try {
                // const response = await fetch('http://172.20.10.12:8080/api/v1/login', {
                //     method: 'POST',
                //     headers: headers,
                // })

                const response = await fetch('http://192.168.1.104:8080/api/v1/login', {
                    method: 'POST',
                    headers: headers,
                })
                if(response.ok){

                    const data = await response.json();
                    const newData = {
                        ...data,
                        password: password
                    }

                    await AsyncStorage.setItem('UserDetails', JSON.stringify(newData));
                    //setIsLogged(true);
                    //Updates.reloadAsync();
                    navigation.navigate("Account", {screen: "Profile", params: {_userdetails: newData}});
                    console.log("You have Logged!");

                }else{
                    ToastAndroid.showWithGravityAndOffset("Invalid Credentials", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
                }
                
            } catch (error) {
                console.log(error);
            }
        }

    }

    const getUserData = async () => {

        try {
            const data = await AsyncStorage.getItem("UserDetails");
            if(data !== null){
                console.log(data);
                setUserData(JSON.stringify(data));
                navigation.navigate("Account", {screen: "Profile", params: {_userdetails: userData}});
            }
        } catch (error) {
            
        }
    }

    useFocusEffect(

        React.useCallback(() => {

            getUserData();

            console.log("THE LOGING SCREEN WAS FOCUSED!")
           

            return () => {
                // Do something when the screen is unfocused
                   console.log("THE LOGING SCREEN WAS UNFOCUSED!")
                 };

        }, [navigation])
      );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cross_icon}>
                 <Image style={styles.icon} source={width < 500 ? require("../../assets/icons/cross-symbol-white.png") : require("../../assets/icons/cross-symbol.png")}/>
            </TouchableOpacity>
            <View style={styles.card}>
                <Text style={styles.large_txt}>Login</Text>
                <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="UserName" value={userName} onChangeText={changeUserName} type="username" capitalize='none'  editable={true}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="Password" value={password} onChangeText={changePassword} type="password" capitalize='none'  editable={true}/>
                <TouchableOpacity style={styles.btn} onPress={login}>
                    <Text style={[styles.large_txt, {color: '#fff',  marginTop: 10,}]}>войдите</Text>
                </TouchableOpacity>
                <View style={styles.form_row}>
                    <Text style={[styles.large_txt, {width: '70%', flexWrap: 'wrap', height: 45,}]}>если у вас нет учетной записи, зарегистрируйтесь</Text>
                    <TouchableOpacity
                        style={styles.login_icon}
                        onPress={() => navigation.navigate('Registring')}
                        >
                        <Image style={styles.icon} source={require("../../assets/icons/login-icon.png")}/>
                    </TouchableOpacity>
                </View>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

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
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        height: 320,
        backgroundColor: width < 500 ? '#3b3c3d' : '#fff',
        borderRadius: 8,
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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16,
        flexWrap: 'wrap',
    },
    input: {
        width: '70%',
        height: '70%',
        borderWidth: 2,
        borderRadius: 4,
        marginLeft: 10,
        borderColor: width < 500 ? "#fff" : '#000',
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
        right: width < 450 ? '19%': '28.5%',
        top: '45%',
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

export default Loging;