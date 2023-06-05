import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";

const width = Dimensions.get("window");

const TableHeaderComponent = ({RowData, styles}) => {

    return (
        <View style={styles}>
            
        </View>
    )
}


const styles = StyleSheet.create({
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


export default TableHeaderComponent;