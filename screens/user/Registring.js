import * as React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, ToastAndroid} from 'react-native';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import Input from '../../components/Input';

const {width} = Dimensions.get("window");

const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const Registring = ({navigation}) => {

    const [firstName, changeFirstName] = useState('');
    const [lastName, changeLastName] = useState('');
    const [email, changeEmail] = useState('');
    const [phoneNumber, changePhoneNumber] = useState('');
    const [userName, changeUserName] = useState('');
    const [password, changePassword] = useState('');

    const registring = async () => {

        if(!firstName)  ToastAndroid.showWithGravityAndOffset("First name is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!lastName)  ToastAndroid.showWithGravityAndOffset("Last name is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!email)  ToastAndroid.showWithGravityAndOffset("Email is required!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!email.match(regex))  ToastAndroid.showWithGravityAndOffset("Invalid Email", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!userName)  ToastAndroid.showWithGravityAndOffset("Username is required", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
        else if (!password || password.length < 8)  ToastAndroid.showWithGravityAndOffset("The password must be at least 8 characters", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);

        else {

            try {

                const response = await fetch('http://192.168.1.104:8080/api/v1/register', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            phoneNumber: phoneNumber,
                            userName: userName,
                            password: password,
                        }),
                })
                if(response.ok){
                    const data = await response.json();
                    navigation.navigate("Loging")
                    console.log("You have registred successfully!");
                }else{
                    ToastAndroid.showWithGravityAndOffset("The User name already exist. please use another one!", ToastAndroid.LONG, ToastAndroid.TOP, 10,60);
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
                    <Image style={styles.icon} source={width < 500 ? require("../../assets/icons/cross-symbol-white.png") : require("../../assets/icons/cross-symbol.png")}/>
                </TouchableOpacity>
                <View style={styles.card}>
                    <Text style={styles.large_txt}>Создай Новый аккунт</Text>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="FirstName" value={firstName} onChangeText={changeFirstName} type="name" capitalize='sentences'  editable={true}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="LastName" value={lastName} onChangeText={changeLastName} type="name" capitalize='sentences'  editable={true}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="Email" value={email} onChangeText={changeEmail} type="email" capitalize='none'  editable={true}/>
                    <Input styles={{
                        form_row: styles.form_row,
                        input: styles.input,
                        large_txt: styles.large_txt
                    }} label="Phone Nmber" value={phoneNumber} onChangeText={changePhoneNumber} type="tel" capitalize='none'  editable={true}/>
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
                    <TouchableOpacity style={styles.btn} onPress={registring}>
                        <Text style={[styles.large_txt, {color: '#fff',  marginTop: 10,}]}>Зарегистрируйтесь</Text>
                    </TouchableOpacity>
                    <View style={styles.form_row}>
                        <Text style={[styles.large_txt, {width: '70%', flexWrap: 'wrap', height: 45, marginLeft: '20%',}]}>если у вас есть учетной записи, Зайди</Text>
                        <TouchableOpacity
                            style={styles.login_icon}
                            onPress={() => navigation.navigate('Loging')}
                            >
                            <Image style={styles.icon} source={require("../../assets/icons/login-icon.png")}/>
                        </TouchableOpacity>
                    </View>
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

export default Registring;