import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";

const Products = ({products}) => {
    return (
        <View style={styles.popular_section}>

            <View style={styles.popular_section_header}> 
                <Text style={styles.title}>Most Popular</Text>
                <View style={styles.line_separator}></View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={[styles.small_txt, {color: '#fff'}]}>View All</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.popular_section_body}>
                {
                    products?.map((item, index) => {
                        return (
                            <View key={index} style={[styles.column_product, { marginLeft: index == 0 || 2 ? 10 : 0}]}>
                                <View style={styles.product_image}>
                                    <Image style={styles.image}
                                            source={item.image}/>
                                </View>
                                <View style={styles.product_info}>
                                    <Text style={styles.lasrge_txt}>Extra Thock Super Absorbent...</Text>
                                    <Text style={[styles.small_txt, {color: '#8A8A8A',}]}>{item.name}</Text>
                                    <View style={styles.product_info_col}>
                                        <View>
                                            <Image style={styles.rating_icon} source={require("../../assets/images/rating.png")}/>
                                            <Text style={[styles.lasrge_txt, {color: '#0BB798'}]}>${item.price}</Text>
                                        </View>
                                        <TouchableOpacity style={[styles.btn, { marginTop: 8, marginRight: 32,}]}>
                                            <Text style={[styles.small_txt, {color: '#FFF'}]}>Add To Cart</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    popular_section: {
        width: '95%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    popular_section_header: {
        width: '100%',
        height: 58,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        borderRadius: 32,

        backgroundColor: '#0BB798'
    },
    title: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'InterSemiBold',
    },
    small_txt:{
        fontSize: 14,
        fontFamily: 'InterLight',
    },
    lasrge_txt: {
        fontSize: 18,
        letterSpacing: 0.2,
        fontFamily: 'InterMedium',
    },
    popular_section_body: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    column_product:{
        width: "45%",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    product_image: {
        width: '100%',
        height: 229,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'center',
    },
    product_info:  {
        width: '100%',
        height: 181,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    product_info_col: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    rating_icon: {width: 100, height: 20, },
})

export default Products;