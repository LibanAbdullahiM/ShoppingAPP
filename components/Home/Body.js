import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import {NewProductsData, POPULARS }from '../../constants/Data';
import SmartTvScreen from "./SmartTvScreen";
import CustomerSupport from "./CustomerSupport";
import NewProducts from "./NewProducts";
import Popular from "./Popular";
import Featured from "./Featured";
import OurProducts from "./OurProducts";
import { NewProductsData2 } from "../../constants/Data";

const NEWPRODS = () => {

    return (
        <View style={{
            width: '95%',
            marginTop: 10,
        }}>
            {
                NewProductsData2.map(item => {
                    return (
                        <View key={item.id} style={{
                            width: '100%',
                            height: 210,
                            marginTop: 10,
            
                            borderRadius: 16,
                            backgroundColor:  item.backgroundColor
                        }}>
                            <View style={{
                                width: '60%',
                                margin: 12,
                                padding: 32,
                            }}>
                                <Text style={{fontSize: 12, fontWeight: '200', textAlign: 'left', color: item.id == 0 ? '#000' : '#fff'}}>{item.name}</Text>
                                <Text style={{fontSize: 18, fontWeight: '600', letterSpacing: 0.2, textAlign: 'left', color: item.id == 0 ? '#000' : '#fff', marginTop: 10, }}>{item.description}</Text>
                                <TouchableOpacity style={{
                                    width: 97, 
                                    height: 42,
                                    marginTop: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
            
                                    paddingHorizontal: 14,
            
                                    borderRadius: 32,
                                    borderWidth: 1,
                                    borderColor: item.id == 0 ? '#000' : '#fff'
                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: '300',
                                        color: item.id == 0 ? '#000' : '#fff' 
                                    }}>Shop</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: 200,
                                height: 150,
            
                                position: 'absolute',
                                top: '10%',
                                left: '50%',
                            }}>
                                <Image style={{
                                    width: '100%',
                                    height: '100%',
                                
                                }} source={item.image}/>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

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
            <Popular />
            <Featured />
            <NEWPRODS />
            <OurProducts />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
})

export default Body;