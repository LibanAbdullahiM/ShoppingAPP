import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import Header from '../../components/Header'
//import { CATEGORIES } from '../../constants/Data'

const {width} = Dimensions.get("window");

const ListCategories = ({navigation, route}) => {
    
    const {CATEGORIES} = route.params;

    const _renderItem = (data) => {
     return (
        <View style={styles.category} key={data.id}>
            <TouchableOpacity style={styles.image_view} onPress={() => navigation.navigate("ListProducts", {title:data.name})}>
                        <Image style={styles.img} source={{
                            uri: 'http://192.168.1.104:8080/api/v1/categories/'+data.id+'/image'
                        }}/>
            </TouchableOpacity>
            <Text style={styles.txt}>{data.name}</Text>
        </View>
     )
    }

    return (
        <View style={styles.container}>
            <Header/>
            <ScrollView style={styles.scrollview} contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
            }} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    {
                        CATEGORIES.map(data => _renderItem(data))
                    }
                </View>
            </ScrollView>
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
    scrollview: {
        flex: 1,
        width: '100%',
    },
    section: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    category: {
        width: width < 500 ? '48%' : '31%',
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        margin: 4,
        marginBottom: 40,
    },
    txt: {
        fontSize: 14,
        fontFamily: 'InterMedium',
        textAlign: 'center',
        color: width < 500 ? '#fff' : '#000',
    },
    image_view: {
        width: '100%',
        height: '100%',
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: 'rgba(205, 194, 194, 0.52)',
        borderRadius: 16,

        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
})

export default ListCategories;