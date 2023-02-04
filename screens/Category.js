import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Image, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import Header from '../components/Header'
import { CATEGORIES } from '../constants/Data'

const Category = () => {

    _renderItem = (data) => {
     return (
        <View style={styles.category} key={data.id}>
            <View style={styles.imgBackground}>
                <Image style={{
                    width: '100%',
                    height: '100%',

                    borderRadius: 32,
                    
                }} resizeMode='cover' source={require("../assets/images/image-background.jpg")}/>
            </View>
              <TouchableOpacity style={styles.image_view} onPress={() => alert(data.name)}>
                        <Image style={styles.img} source={data.image}/>
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
    },
    category: {
        width: '48%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: 16,
    },
    txt: {
        fontSize: 14,
        fontFamily: 'InterMedium',
        textAlign: 'center',
    },
    image_view: {
        width: '98%',
        height: '85%',
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(205, 194, 194, 0.52)',
        borderRadius: 32,
    },
    img: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain'
    },
    imgBackground: {
        width: '98%',
        height: '85%',

        borderRadius: 32,
        position: 'absolute',
        top: 10,
        left: 3,
        right: 0,
        zIndex: 0,
},
})

export default Category;