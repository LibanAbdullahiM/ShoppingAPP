import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import {POPULARS }from '../../constants/Data';

const Featured = () => {

    return (
        <View style={styles.featured_section}>
            <View style={styles.featured_section_header}>

                <Text style={styles.title}>Our Featured Offers</Text>
                <View style={styles.horizontal_line}></View>

                <TouchableOpacity style={styles.btn}>
                    <Text style={[styles.small_txt, {color: '#fff'}]}>View All</Text>
                </TouchableOpacity>

            </View>
            <ScrollView style={{
                width: '100%',

            }} contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
                {
                    POPULARS.map(item => {
                        return (
                            <View  key={item.id} style={styles.featured_section_body}>
                                <View style={[styles.column_product, {marginLeft: item.id == 0 ? 4 : 0}]}>
                                    <View style={{width: '100%', paddingLeft: 10,}}>
                                        <View style={styles.btn_sale}>
                                            <Text style={[styles.small_txt, {color: '#fff'}]}>SALE!</Text>
                                        </View>
                                    </View>
                                    <View style={styles.product_image}>
                                        <Image style={styles.image}
                                                source={item.image}/>
                                    </View>
                                    <View style={styles.product_info}>
                                        <Text style={styles.lasrge_txt}>Extra Thock Super Absorbent...</Text>
                                        <Text style={[styles.small_txt, {color: '#8A8A8A', marginTop: 8,}]}>{item.name}</Text>
                                        <View style={styles.product_info_col}>
                                            <View>
                                                <Image style={styles.rating_icon} source={require("../../assets/images/rating.png")}/>
                                                <Text style={[styles.lasrge_txt, {color: '#0BB798'}]}>${item.price}</Text>
                                            </View>
                                            <TouchableOpacity style={[styles.btn, {  marginTop: 8,marginRight: 32,}]}>
                                                <Text style={[styles.small_txt, {color: '#FFF', textAlign: 'center'}]}>Add To Cart</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.vertical_line}></View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    featured_section: {
        width: '95%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,

        backgroundColor: 'rgba(157, 255, 213, 0.4)',
        borderRadius: 16,
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
    title: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'InterSemiBold',
    },
    btn: {
        width: 100,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,

        backgroundColor: '#0BB798'
    },
    featured_section_header: {
        width: '100%',
        height: 58,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    featured_section_body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    column_product: {
        width: 280,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_sale: {
        width: 55,
        height: 35,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C90404',
        borderRadius: 8,
    },
    product_image: {
        width: '100%',
        height: 229,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {width: '100%', height: '100%', resizeMode: 'center'},
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
    rating_icon: {
        width: 100,
        height: 20, 
    },
    vertical_line: {borderWidth: 0.5, opacity: 0.2, height: 410,},
    horizontal_line: {
        flex: 1,
        borderWidth: 0.4,
        margin: 10,
    }
})
export default Featured;