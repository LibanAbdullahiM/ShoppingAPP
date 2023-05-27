import React from "react";
import { useState, useEffect } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import Header from '../../components/Header'

const {width} = Dimensions.get("window");

const ListCategories = ({navigation, route}) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCategoriesFromApi = async () => {

        setCategories([]);
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://192.168.1.104:8080/api/v1/categories');
            if(response.ok){
                const data = await response.json();
                setCategories(data);
                console.log("Categories are Loaded........................!")
                setLoading(false);
                //console.log(data);
            }
        } catch (error) {
            console.log(error);
            setError("Ошибка соединения");
        }
    }

    useEffect(() => {

        getCategoriesFromApi();
        
    }, [0]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.txt}>Загрузка...</Text>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    if(error) {
        return (
            <View style={styles.container}>
                <Text style={styles.txt}>{error}</Text>
            </View>
        )
    }

    const _renderItem = (data) => {
     return (
        <View style={styles.category} key={data.id}>
            <TouchableOpacity style={styles.image_view} onPress={() => navigation.navigate("ListProducts", {title:data.name, categoryId:data.id})}>
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
                        categories.map(data => _renderItem(data))
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

        backgroundColor: width < 450 ? 'rgba(0, 0, 0, 1)' : '#fff',
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
        lineHeight: 20,
        letterSpacing: 0.25,
        fontFamily: 'RobotoRegular', 
        textAlign: 'center',
        color: width < 450 ? '#fff' : '#000',
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