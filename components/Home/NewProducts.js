import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import {NewProductsData }from '../../constants/Data';

const NewProducts = () => {

    return (
        <View style={styles.section}>
            {
                NewProductsData.map((item, index) => {
                    return (
                        <View key={index} style={[styles.col, { backgroundColor: item.backgroundColor}]}>
                            <View style={styles.col_content}>
                                <Text style={styles.small_text}>{item.name}</Text>
                                <Text style={styles.large_text}>{item.text}</Text>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.small_text}>Shop</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.col_image}>
                                <Image style={styles.img} source={item.image}/>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        flexWrap: 'wrap',
    },
    col: {
        width: '45%',
        height: 170,
        margin: 8,

        borderRadius: 24,
    },
    col_content: {
        height: 100,
        justifyContent: 'center',
        flexWrap: 'nowrap',
        paddingLeft: 10,

        position: 'absolute',
        top: 24,
    },
    col_image: {
        height: 110,

        zIndex: -1,

        position: 'relative',
        top: '16%',
        right: -12,
    },
    btn: {
        width: 82,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 32,
    },
    small_text: {
        fontSize: 18,
        fontWeight: '300',
        fontFamily: 'InterLight', 
        color: "#fff",
    },
    large_text: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 0.2,
        fontFamily: 'InterMedium',
        color: '#fff',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})

export default NewProducts;