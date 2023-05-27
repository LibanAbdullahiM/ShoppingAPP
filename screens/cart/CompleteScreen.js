import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, RefreshControl } from "react-native";
import OrderDetails from "./OrderDetails";

const {width} = Dimensions.get("window");

const CompleteScreen = ({navigation}) => {


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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
            </View>
            <View>
                <Text style={styles.large_txt}>ваш заказ успешно завершенно</Text>
            </View>
            <TouchableOpacity style={styles.cancle_btn} onPress={() => navigation.navigate("ShoppingCart")}>
                    <Image style={styles.cancle_icon} source={width < 450 ? require("../../assets/icons/cross-symbol-white.png") : require("../../assets/icons/cross-symbol.png")}/>
            </TouchableOpacity>
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
    cancle_btn: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        position: 'absolute',
        top: 30,
        right: 0,
    },
    cancle_icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})

export default CompleteScreen;