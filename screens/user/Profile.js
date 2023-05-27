import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from 'react-native';
import * as Updates from 'expo-updates';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const {width} = Dimensions.get("window");

const Profile = ({navigation, route}) => {

    const {_userdetails} = route.params;

    const [userData, setUserData] = useState(_userdetails); 

    // useEffect(() => {

    //     getUserData()

    //  }, [userData])

     useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          getUserData();
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation, userData]);

    const getUserData = async () => {

        //setUserData({})

        try {
            const data = await AsyncStorage.getItem("UserDetails");
            if(data !== null){
                setUserData(JSON.parse(data));
            }
        } catch (error) {
            
        }
    }

    //console.log("USER DETAILS FROM PROFILE SCREEN: ", userData)

    const logout = async () => {

        try {
            await AsyncStorage.removeItem('UserDetails');
            Updates.reloadAsync();
            //setIsLogged(false)
           //navigation.navigate("Account", {screen: 'Loging'});
        } catch (error) {
            
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
            </View>

            <View style={styles.profile_card}>
                <View style={styles.image_View}>
                    <Image style={styles.image} source={require("../../assets/icons/prifle-icon.png")}/>
                    <View>
                        <Text style={styles.large_txt}>{userData?.firstName}</Text>
                        {/* <Text style={styles.large_txt}>{userdetails?.roles[0]?.role}</Text> */}
                    </View>
                </View>
                <Text style={styles.large_txt}>свой профиль</Text>
                <Text style={styles.small_txt}>начните делать покупки прямо сейчас</Text>
                <TouchableOpacity style={styles.btn} onPress={logout}>
                    <Text style={[styles.large_txt, {color: '#fff',  marginTop: 10,}]}>Logout</Text>
                </TouchableOpacity>
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
    profile_card:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 250,
        backgroundColor: width < 500 ? '#3b3c3d' : '#fff',
        borderRadius: 8,
        top: 0,
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
    txt: {
        fontSize: 22,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium', 
        color: '#0BB798',
    },
    image_View: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        width: '80%',
        height: '80%',
        resizeMode: 'cover',
    }

})

export default Profile;