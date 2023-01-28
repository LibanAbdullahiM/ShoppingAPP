import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";

const CustomerSupport = () => {
    return (
        <View style={{
            width: '95%',
            height: 111,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',

            backgroundColor: 'rgba(11, 183, 152, 0.15)',

            borderRadius: 12,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image style={{
                    width: 24,
                    height: 24,
                    resizeMode: 'contain',
                    marginRight: 10,
                }} source={require("../../assets/icons/shippping.png")}/>
                <View>
                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontWeight: '400'
                    }}>Free Shipping</Text>
                    <Text style={{
                        color: '#8A8A8A',
                        fontSize: 14,
                        fontWeight: '400'
                    }}>On All Orders</Text>
                </View>
            </View>

            <View style={{
                borderWidth: 0.5,
                height: 100,
                opacity: 0.3
            }}></View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 5,
            }}>
                <Image style={{
                    width: 24,
                    height: 24,
                    resizeMode: 'contain',
                    marginRight: 10,
                }} source={require("../../assets/icons/shippping.png")}/>
                <View>
                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontWeight: '400'
                    }}>Online Support</Text>
                    <Text style={{
                        color: '#8A8A8A',
                        fontSize: 14,
                        fontWeight: '400'
                    }}>Technical 24/7</Text>
                </View>
            </View>
        </View>
    )
}

export default CustomerSupport;