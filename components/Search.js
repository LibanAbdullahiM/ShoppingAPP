import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity, TextInput } from "react-native";

const Search = ({navigation}) => {

    const [find, changeFind] = useState('');

    return (
        <View style={styles.search_form}>
            <View style={styles.input_group}>
                <Image style={styles.icon} source={require("../assets/icons/search_icon.png")}/>
                <TextInput style={styles.text_input} placeholder='Type Here...' value={find} onChangeText={changeFind}/>
            </View>
           <TouchableOpacity style={styles.btn}  onPress={() => navigation.navigate("CategoryNativeStack", {screen: 'SearchScreen', params: {str: find}})}>
                <Text style={styles.text}>Search</Text>
           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    search_form: {
        width: '90%',
        height: 45,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: '#8A8A8A',

        borderRadius: 24,
    },
    input_group: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,

        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
    },
    btn: {
        width: 142,
        height: 44,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#0BB798',
        color: '#FFFFFF',

        borderRadius: 24,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium',
        color: '#fff',

    },
    text_input: {
        width: '100%',
        height: '100%',
        fontSize: 14,
        color: '#f5f5f5',
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