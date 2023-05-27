import React from "react";
import { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from "react-native";


const {width} = Dimensions.get("window");

const Products = ({products, title, categoryId, navigation, route}) => {

    return (
        <View style={styles.product_section}>

            <View style={styles.product_section_header}> 
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.product_section_body}>
                {
                    products?.map((product, index) => {

                        return (
                            <TouchableOpacity key={index} style={{width: width < 450 ? '48%' : '33.3%', height: 350,}}
                                            onPress={()=> navigation.navigate("CategoryNativeStack", {screen: 'ProductDetails', params: {product: product,title: title, categoryId: categoryId}})}>
                                <View style={[styles.column_product]}>
                                    <View style={styles.image_view}>
                                        <Image style={styles.image}
                                                source={{                                                                                                                                   
                                                    uri: 'http://192.168.1.104:8080/api/v1/products/'+ product?.id +'/images/' + 0
                                                }}/>
                                    </View>
                                    <View style={styles.product_info}>
                                        <Text style={[styles.large_txt, {color: '#0BB798'}]}>${product?.price}</Text>
                                        <Text style={[styles.large_txt, ]}>{product?.brand}</Text>
                                        <Text style={[styles.small_txt]}>{product?.name.slice(0, 35)}...</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product_section: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    product_section_header: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        borderWidth: 0.2,
        borderRadius: 2,
        borderColor: width < 500 ? '#fff' : '#000',
        
        shadowColor: "#74858C",

        shadowOpacity: 0.5,
        shadowRadius: 9.11,

        elevation: 2,

    },
    line_separator: {
        flex: 1,
        borderWidth: 0.4,
        margin: 10,
    },
    btn: {
        width: 100,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,

        backgroundColor: '#0BB798'
    },
    title: {
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: 0,
        fontFamily: 'RobotoMedium',
        color: width < 500 ? '#fff' : '#000',
        textAlign: 'center',
        marginLeft: 20,
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
        color: width < 500 ? '#fff' : '#000',
    },
    product_section_body: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    column_product:{
        width: "100%",
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        borderBottomWidth: 0.4,
        borderRightWidth: 0.4,
        borderTopWidth: 0.4,
        borderColor: '#8A8A8A',

    },
    image_view: {
        width: '99.3%',
        height: '60%',
        alignItems: 'center',

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    product_info:  {
        width: '100%',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
    },
})

export default Products;