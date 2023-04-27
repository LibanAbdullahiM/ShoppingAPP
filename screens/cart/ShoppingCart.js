import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ShoppingCart = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.statusBar}>
               <TouchableOpacity style={styles.logo}>
                <Text style={styles.txt}>RL</Text>
               </TouchableOpacity>
            </View>
            <View style={{
                width: '100%',
                height: 57,
                justifyContent: 'center',
                backgroundColor: '#202B3F',

                borderBottomRightRadius: 36,
                borderBottomLeftRadius: 36,
            }}>
                <Text style={[styles.large_txt, {
                    color: 'white',
                    marginTop: 8,
                    marginLeft: 16,
                }]}>КОРЗИНА</Text>
            </View>
            <View style={
                {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }>
                <Text style={styles.large_txt}>Ваша Корзина пуста</Text>
                <Text style={styles.small_txt}>Воспользуйтесь каталогом, чтобы добавить товар</Text>
                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("Category")}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 16,
                    }}>ПЕРЕЙТИ В КОТОЛОГ</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    small_txt:{
        fontSize: 14,
        fontFamily: 'InterLight',
        marginBottom: 16,
    },
    large_txt: {
        fontSize: 16,
        letterSpacing: 0.2,
        fontFamily: 'InterSemiBold',
        marginBottom: 16,
    },

    btn: {
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,

        backgroundColor: '#0BB798'
    },
    statusBar: {
        width: '100%',
        height: 57,
        alignItems: 'center',
        justifyContent: 'center',

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

export default ShoppingCart;