import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import {NewProductsData }from '../../constants/Data';

const NewProducts = () => {

    return (
        <View style={{
            width: '95%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            flexWrap: 'wrap',
        }}>
            {
                NewProductsData.map((item, index) => {
                    return (
                        <View key={index} style={{
                            width: '43%',
                            height: 170,
                            margin: 8,
            
                            backgroundColor: item.backgroundColor,
                            borderRadius: 24,
                        }}>
                            <View style={{
                                height: 100,
                                justifyContent: 'center',
                                flexWrap: 'nowrap',
                                paddingLeft: 10,

                                position: 'absolute',
                                top: 24,
            
                            }}>
                                <Text style={{fontSize: 16, fontWeight: '300', color: '#fff'}}>{item.name}</Text>
                                <Text style={{fontSize: 18, fontWeight: '600', color: '#ffF'}}>{item.text}</Text>
                                <TouchableOpacity style={
                                    {
                                        width: 82,
                                        height: 30,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderColor: "#FFF",
                                        borderRadius: 32,}}>
                                    <Text style={{fontSize: 14, color: '#fff', fontWeight: '300'}}>Shop</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                height: 110,

                                zIndex: -1,

                                position: 'relative',
                                top: '16%',
                                right: -12,
                            }}>
                                <Image style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'contain'
                                }} source={item.image}/>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default NewProducts;