import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";

const SmartTvScreen = () => {
    return (
        <View style={styles.tv_section}>
            <View >
                <Text style={styles.txt}>TV</Text>
                <Text style={styles.txt}>Shop</Text>
            </View>
            <View style={styles.tv_screen}>
                <Image style={styles.img}  source={require("../../assets/images/smart-tv-screen.png")}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tv_section: {
        width: '95%',
        height: 250,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 12,
    },
    tv_screen: {
        width: 300,
        height: 220,
    },
    txt: {
        fontSize: 32,
        color: '#fff',
        fontFamily: 'InterBold',
    },
    img: {
        height: '100%',
        width: '100%',
    }
})

export default SmartTvScreen;