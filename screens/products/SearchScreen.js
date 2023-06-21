import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import Header from '../../components/Header'
import Products from "../../components/Home/Products";

const {width} = Dimensions.get("window");

const SearchScreen = ({navigation, route}) => {
    
    let str = route?.params.str;

    const [listProducts, setListProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [find, changeFind] = useState(str);

    console.log("products: ", listProducts);

    const getProductsFromAPI = async () =>{

        setLoading(true);
        setListProducts([]);
        setError();

        console.log("STRING FROM SEARCH SCREEN IS: " + find);

        try {
            // const response = await fetch('http://172.20.10.12:8080/api/v1/products/find', {
            //     method: "POST",
            //     body: str,
            // });
            const response = await fetch('http://192.168.1.104:8080/api/v1/products/find', {
                method: "POST",
                body: find,
            });
            if(response.ok){
                console.log("THE API GET CALLED!")
                const data = await response.json();
                //console.log("PRODUCTS FOUNDED: ", data);
                setListProducts(data);
                setLoading(false);
            }

        } catch (error) {
            setError("Ошибка соединения");
            console.log(error);
        }
    }

    const navigateToCategories = () => {

        navigation.navigate("ListCategories")
    }

    useFocusEffect(

        React.useCallback(() => {

            getProductsFromAPI();
            console.log("THE SEARCH SCREEN WAS FOCUSED!")
           

            return () => {
                // Do something when the screen is unfocused
                console.log("THE SEARCH SCREEN WAS UNFOCUSED!")
                 };

        }, [navigation])
      );

    if (loading) {
        return (
            <View style={styles.container}>
                 <Header  navigation={navigation} route={route}/>
                <Text style={styles.txt}>Загрузка...</Text>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    if(error) {
        return (
            <View style={styles.container}>
                 <Header  navigation={navigation} route={route}/>
                <Text style={styles.txt}>{error}</Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, {alignItems: 'center',
        justifyContent: 'center',}]}>
            {/* <Header  navigation={navigation} route={route}/> */}
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
                <View style={styles.cart_header}>
                    <View style={styles.search_form}>
                        <View style={styles.input_group}>
                            <Image style={styles.icon} source={require("../../assets/icons/search_icon.png")}/>
                            <TextInput style={styles.text_input} placeholder='Type here name, brand description' value={find} onChangeText={changeFind}/>
                        </View>
                        <TouchableOpacity style={styles.btn}  onPress={getProductsFromAPI}>
                                <Text style={styles.text}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.back_button} onPress={navigateToCategories}>
                <Image style={styles.back_Icon} source={width < 450 ? require("../../assets/icons/back-white.png") : require("../../assets/icons/back.png")}/>
            </TouchableOpacity>
            <ScrollView style={styles.container} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
        }} refreshControl={
            <RefreshControl refreshing={false}/>
        }
        showsVerticalScrollIndicator={false}>
                <Products products={listProducts} title="" navigation={navigation} route={route}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',

        backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#f2f2f2',
    },
    header: {
        width: '100%',
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        top: 0,

        backgroundColor: width < 500 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },
    cart_header: {
        width: '100%',
        height: 70,
        justifyContent: 'center',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
   

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    back_button: {
        width: 30,
        height: 40,
        position: 'relative',
        top: width < 450 ? '16.3%' : '6%',
        left: '-48%',
        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 1,
    },
    back_Icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    txt: {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium',
        textAlign: 'center',
        color: width < 450 ? '#fff' : '#000',
    },
    search_form: {
        width: '90%',
        height: 45,
        position: 'relative',
        left: 24,
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: '#8A8A8A',

        borderRadius: 24,
    },
    input_group: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,

        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
    },
    btn: {
        width: 142,
        height: 44,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#0BB798',
        color: '#FFFFFF',

        borderRadius: 24,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium',
        color: '#fff',

    },
    text_input: {
        width: '100%',
        height: '100%',
        fontSize: 14,
        color: '#f5f5f5',
    },
    icon: {
        height: 18,
        width: 18,
        marginRight: 8,
        opacity: 0.3,

        color: "#FFFFFF",
    }
})
export default SearchScreen;