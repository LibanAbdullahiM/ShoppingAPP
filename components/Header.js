import React from "react";
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import Search from "./Search";

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.statusBar}>
               <TouchableOpacity style={styles.logo}>
                <Text style={styles.txt}>RL</Text>
               </TouchableOpacity>
            </View>
            <Search />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 125,
        flexDirection: 'column',
        alignItems: 'center',

        backgroundColor: '#202B3F',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },
    statusBar: {
        width: '100%',
        height: 57,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,

        backgroundColor: '#000',
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
        fontSize: 18,
        color: '#0BB798',
        fontFamily: 'InterSemiBold'
    }
})

export default Header;