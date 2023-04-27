import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Header from "../../components/Header";
import Body from "../../components/Home/Body";

const Home = ({navigation, route}) => {

    return (
        <View style={styles.container}>
            <Header/>
            <Body navigation={navigation} route={route}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
})

export default Home;