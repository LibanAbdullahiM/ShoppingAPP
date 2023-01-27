import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { PRODUCTSDATA }from '../../constants/Data';

const OurProducts = () => {
    return (
        <View style={{
            width: '95%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        }}>
            <View style={{
                width: '100%',
                height: 58,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}> 
                <View >
                    <Text style={{fontSize: 16, fontWeight: '300', color: '#000',}}>Our Products May be You Will Like It</Text>
                </View>
                <TouchableOpacity style={{
                    width: 90,
                    height: 32,
                    alignItems: 'center',
                    justifyContent: 'center',

                    backgroundColor: '#0BB798',

                    borderRadius: 32,
                }}>
                    <Text>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                {
                    PRODUCTSDATA.map((item, index) => {
                        return (
                            <View key={index} style={{
                                width: "45%",
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: index == 0 || 2 ? 10 : 0,
                                marginBottom: 10,

                                //backgroundColor: '#fff'
                            }}>
                                <View style={{
                                    width: '100%',
                                    height: 229,
                                    justifyContent: 'center',
                                    alignItems: 'center',
            
                                }}>
                                    <Image style={{width: '100%', height: '100%', resizeMode: 'center'}}
                                            source={item.image}/>
                                </View>
                                <View style={
                                    {
                                        width: '100%',
                                        height: 181,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        paddingLeft: 10,
                                    }}>
                                    <Text style={{fontSize: 18, fontWeight: '500', letterSpacing: 3,}}>Extra Thock Super Absorbent...</Text>
                                    <Text style={{fontSize: 12, color: '#8A8A8A', marginTop: 8,}}>{item.name}</Text>
                                    <View style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        marginTop: 8,
                                    }}>
                                        <View>
                                            <Image style={{width: 100, height: 20, }} source={require("../../assets/images/rating.png")}/>
                                            <Text style={{fontSize: 24, fontWeight: '600', color: '#0BB798'}}>${item.price}</Text>
                                        </View>
                                        <TouchableOpacity style={{
                                            width: 100,
                                            height: 35,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 32,
                                            marginTop: 8,
                                            marginRight: 32,
            
                                            backgroundColor: '#0BB798'
                                        }}>
                                            <Text style={{fontSize: 12, textAlign: 'center', fontWeight: '200', color: '#FFF'}}>Add To Cart</Text>
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

export default OurProducts;