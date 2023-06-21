import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView, RefreshControl } from "react-native";
import Input from "../../components/Input";

const {width} = Dimensions.get("window");

const CustomerDetails = ({customerDetails}) => {
    
    return (

        <View style={{width: '95%', padding: 4,  backgroundColor: width < 500 ? '#3b3c3d' : '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 8,}}>

        <View style={{width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginLeft: 8,}}>
            <Text style={[styles.large_txt, {fontFamily: 'RobotoBold', fontSize: 22, lineHeight: 28, letterSpacing: 0, textAlign: 'left'}]}>
                Доставка в Адресе
            </Text>
        </View>
        <View style={{width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: 8,}}>
            <Text style={styles.small_txt}>{customerDetails?.country}, {customerDetails?.city}, улица {customerDetails?.address}</Text>
        </View>

        <View style={{width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: 8,  marginTop: 32,}}>
            <Text style={[styles.large_txt, {fontFamily: 'RobotoBold', fontSize: 22, lineHeight: 28, letterSpacing: 0, textAlign: 'left'}]}>Получатель</Text>
        </View>
        <View style={{width: '90%', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', marginLeft: 8,}}>
            <Text style={styles.small_txt}>{customerDetails?.firstName + ' ' + customerDetails?.lastName}</Text>
            <Text style={styles.small_txt}>{customerDetails?.phoneNumber}</Text>
            <Text style={styles.small_txt}>{customerDetails?.email}</Text>
        </View>

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

export default CustomerDetails;