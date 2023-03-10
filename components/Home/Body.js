import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import SmartTvScreen from "./SmartTvScreen";
import CustomerSupport from "./CustomerSupport";
import NewProducts from "./NewProducts";
import Products from "./Products";
import Featured from "./Featured";
import { POPULARS, LISTPRODUCTS, NewProductsData2  } from "../../constants/Data";

const Body = () => {

    return (
        <ScrollView style={styles.container} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
        }} refreshControl={
            <RefreshControl refreshing={false}/>
        }
        showsVerticalScrollIndicator={false}>
            <SmartTvScreen />
            <CustomerSupport />
            <NewProducts/>
            <Products products={POPULARS}/>
            <Featured />
            <View style={styles.section}>
                {
                    NewProductsData2.map(item => {
                        return (
                            <View key={item.id} style={[styles.row, {backgroundColor:  item.backgroundColor}]}>
                                <View style={styles.left_side}>
                                    <Text style={[styles.small_txt, {color: item.id == 0 ? '#000' : '#fff'}]}>{item.name}</Text>
                                    <Text style={[styles.lasrge_txt, {color: item.id == 0 ? '#000' : '#fff'}]}>{item.description}</Text>
                                    <TouchableOpacity style={[styles.btn, {borderColor: item.id == 0 ? '#000' : '#fff'}]}>
                                        <Text style={[styles.small_txt, { color: item.id == 0 ? '#000' : '#fff'}]}>Shop</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.right_side}>
                                    <Image style={styles.img} source={item.image}/>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
            <Products products={LISTPRODUCTS}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    section: {
        width: '95%',
        marginTop: 10,
    },
    row:{
        width: '100%',
        height: 210,
        marginTop: 10,
        position: 'relative',

        borderRadius: 16,
    },
    left_side: {
        width: '60%',
        margin: 12,
        padding: 32,
    },
    right_side: {
        width: 200,
        height: 150,

        position: 'absolute',
        top: '10%',
        right: 5,
    },
    btn: {
        width: 97, 
        height: 42,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 14,

        borderRadius: 32,
        borderWidth: 1,
    },
    small_txt:{
        fontSize: 16,
        fontWeight: '300',
        fontFamily: 'InterLight', 
    },
    lasrge_txt: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 0.2,
        fontFamily: 'InterMedium',
        marginTop: 8,
    },
    img: {
        width: '100%',
        height: '100%',
    },
})

export default Body;