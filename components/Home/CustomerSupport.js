import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";

const CustomerSupport = () => {
    return (
        <View style={styles.section}>

            <View style={styles.column}>
                <Image style={styles.icon} source={require("../../assets/icons/shippping.png")}/>
                <View>
                    <Text style={styles.large_text}>Free Shipping</Text>
                    <Text style={styles.small_text}>On All Orders</Text>
                </View>
            </View>

            <View style={styles.line}></View>

            <View style={styles.column}>
                <Image style={styles.icon} source={require("../../assets/icons/call-icon.png")}/>
                <View>
                    <Text style={styles.large_text}>Online Support</Text>
                    <Text style={styles.small_text}>Technical 24/7</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        width: '95%',
        height: 111,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

        backgroundColor: 'rgba(11, 183, 152, 0.15)',

        borderRadius: 12,
    },
    column: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginRight: 10,
    },
    large_text: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'InterMedium',
    },
    small_text: {
        color: '#8A8A8A',
        fontSize: 14,
        fontFamily: 'InterRegular',
    },
    
    line: {
        borderWidth: 0.5,
        height: 100,
        opacity: 0.3
    }
})

export default CustomerSupport;