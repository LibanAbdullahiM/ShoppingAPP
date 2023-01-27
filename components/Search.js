import React from "react";
import { View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity, TextInput } from "react-native";

const Search = () => {
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 18,
            }}>
                <Image style={styles.icon} source={require("../assets/images/search_icon.png")}/>
                <TextInput style={{
                    fontSize: 14,
                    color: '#f5f5f5',
                }} placeholder='Type Here...'/>
            </View>
           <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Search</Text>
           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: '#8A8A8A',

        borderRadius: 24,
    },
    btn: {
        width: 142,
        height: 44,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#0BB798',
        color: '#FFFFFF',

        borderRadius: 24,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',

    },
    icon: {
        height: 18,
        width: 18,
        marginRight: 8,
        opacity: 0.3,

        color: "#FFFFFF",
    }
})

export default Search;