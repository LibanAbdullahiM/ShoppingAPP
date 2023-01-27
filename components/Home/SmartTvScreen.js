import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";

const SmartTvScreen = () => {
    return (
        <View style={{
            width: '95%',
            height: 250,
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#000',
            borderRadius: 12,
        }}>
            <View >
                <Text style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#fff',
                }}>TV</Text>
                   <Text style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#fff',
                }}>Shop</Text>
            </View>
            <View style={{
                    width: 300,
                    height: 220,
                }}>
                <Image style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'stretch'
                }}  source={require("../../assets/images/smart-tv-screen.png")}/>
            </View>
        </View>
    )
}

export default SmartTvScreen;