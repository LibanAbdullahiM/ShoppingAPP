import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Dimensions } from "react-native";
import Header from "../../components/Header";
import Body from "../../components/Home/Body";

const {width} = Dimensions.get("window");

const Home = ({navigation, route}) => {

    return (
        <View style={styles.container}>
            <Header navigation={navigation} route={route}/>
            <Body navigation={navigation} route={route}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#f2f2f2',
    }
})

export default Home;