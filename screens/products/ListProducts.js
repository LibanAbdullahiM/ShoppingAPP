import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Image, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import Header from '../../components/Header'
import { LISTPRODUCTS } from "../../constants/Data";
import Products from "../../components/Home/Products";

const ListProducts = ({navigation, route}) => {

    const {title} = route.params;

    return (
        <View style={styles.container}>
            <Header/>
            <TouchableOpacity style={styles.back_button} onPress={() => navigation.navigate("ListCategories")}>
                <Image style={styles.back_Icon} source={require("../../assets/icons/back.png")}/>
            </TouchableOpacity>
            <ScrollView style={styles.container} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
        }} refreshControl={
            <RefreshControl refreshing={false}/>
        }
        showsVerticalScrollIndicator={false}>
                <Products products={LISTPRODUCTS} title={title} navigation={navigation} route={route}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    back_button: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: '2.5%',
        left: '1%',
        
        backgroundColor: '#345'
    },
    back_Icon: {
        width: '100%',
        height: '100%',
    }
})
export default ListProducts;