import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Header from "./Header";
import Body from "./Body";

const Home = () => {

    return (
        <View style={styles.container}>
            <Header/>
            <Body/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#333',
    }
})

export default Home;