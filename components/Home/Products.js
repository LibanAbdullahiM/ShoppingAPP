import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, TouchableHighlight, FlatList, RefreshControl, TouchableWithoutFeedback } from "react-native";

const Products = ({products, title, navigation, route}) => {

    return (
        <View style={styles.product_section}>

            <View style={styles.product_section_header}> 
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.product_section_body}>
                {
                    products?.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={{width: '33.3%', height: 360,}}
                                            onPress={()=> navigation.navigate("Category", {screen: 'ProductDetails', params: {item: item}})}>
                                <View style={[styles.column_product]}>
                                    <View style={styles.image_view}>
                                        <Image style={styles.image}
                                                source={item.image}/>
                                    </View>
                                    <View style={styles.product_info}>
                                        <Text style={[styles.lasrge_txt, {color: '#0BB798'}]}>${item.price}</Text>
                                        <Text style={[styles.lasrge_txt, {color: '#000',}]}>Brand</Text>
                                        <Text style={[styles.small_txt, {color: '#8A8A8A'}]}>{item.name} {item.name} {item.name}</Text>
                                        <TouchableOpacity style={[styles.btn, { marginTop: 8, }]}>
                                                <Text style={[styles.lasrge_txt, {color: '#FFF'}]}>В корзину</Text>
                                        </TouchableOpacity>
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
        borderRadius: 8,

        backgroundColor: '#0BB798'
    },
    title: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'InterSemiBold',
    },
    small_txt:{
        fontSize: 12,
        fontFamily: 'InterLight',
    },
    lasrge_txt: {
        fontSize: 16,
        fontFamily: 'InterMedium',
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
        width: '100%',
        height: '48%',
        alignItems: 'center',

    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    product_info:  {
        width: '100%',
        height: '52%',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
    },
})

export default Products;