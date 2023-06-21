import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window");

const AdminScreen = ({navigation, route}) => {

    const {userData} = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.header_body}>
                    <Text style={[styles.large_txt, {marginTop: 8, marginLeft: 16, marginBottom: 16,}]}>Административный раздел</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cross_icon}>
                    <Image style={styles.icon} source={width < 500 ? require("../../../assets/icons/back-white.png") : require("../../../assets/icons/back.png")}/>
            </TouchableOpacity>

            <View style={styles.card}>
                <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate("CategoriesTableScreen", {userData: userData})}>
                    <Text style={[styles.large_txt]}>Список категорий</Text>
                    <View style={styles.icon_view}>
                        <Image style={styles.icon} source={width < 450 ? require('../../../assets/icons/forward-arrow-white.png'): require('../../../assets/icons/forward-arrow.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate("OrdersTableScreen", {userData: userData})}>
                    <Text style={[styles.large_txt]}>Список Заказов</Text>
                    <View style={styles.icon_view}>
                        <Image style={styles.icon} source={width < 450 ? require('../../../assets/icons/forward-arrow-white.png'): require('../../../assets/icons/forward-arrow.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        backgroundColor: width < 450 ? '#3b3c3d' : '#fff',
        borderRadius: 8,
        marginTop: '15%',
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
    touchableOpacity:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        padding: 8,
    },
    icon_view: {
        width: '5%',
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
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

export default AdminScreen;