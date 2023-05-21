import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";

const {width} = Dimensions.get("window");

const ShoppingCart = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.cart_header}>
                    <Text style={[styles.large_txt, {marginTop: 8, marginLeft: 16,}]}>КОРЗИНА</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.image_View}>
                    <Image style={styles.image} source={require("../../assets/icons/shopping-cart.png")}/>
                </View>
                <Text style={styles.large_txt}>Ваша Корзина пуста</Text>
                <Text style={styles.small_txt}>Воспользуйтесь каталогом, чтобы добавить товар</Text>
                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Category")}>
                    <Text style={[styles.large_txt, {color: '#fff',  marginTop: 16,}]}>ПЕРЕЙТИ В КОТОЛОГ</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#fff',
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 0,

        backgroundColor: width < 500 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },
    cart_header: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        //backgroundColor: '#202B3F',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 250,
        backgroundColor: width < 500 ? '#3b3c3d' : '#fff',
        borderRadius: 8,
    },
    small_txt:{
        fontSize: 14,
        fontFamily: 'InterLight',
        marginBottom: 16,
        color: width < 500 ? '#fff' : '#000',
    },
    large_txt: {
        fontSize: 16,
        letterSpacing: 0.5,
        fontFamily: 'InterSemiBold',
        marginBottom: 16,
        textAlign: 'center',
        color: width < 500 ? '#fff' : '#000',
    },

    btn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,

        backgroundColor: '#0BB798'
    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    },
    image_View: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }

})

export default ShoppingCart;