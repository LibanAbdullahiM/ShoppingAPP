import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Image, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import Header from '../components/Header'
import { CATEGORIES } from '../constants/Data'

const Category = () => {

    _renderItem = (data) => {
     return (
        <View style={styles.category} key={data.id}>
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
        marginTop: 32,
    },
    category: {
        width: '31%',
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        margin: 2,
        marginBottom: 40,
    },
    txt: {
        fontSize: 14,
        fontFamily: 'InterMedium',
        textAlign: 'center',
    },
    image_view: {
        width: '100%',
        height: '100%',
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',

        borderWidth: 1,
        borderColor: 'rgba(205, 194, 194, 0.52)',
        borderRadius: 32,
    },
    img: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain'
    },
})

export default Category;