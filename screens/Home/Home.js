import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Header from "../../components/Header";
import Body from "../../components/Home/Body";

const {width} = Dimensions.get("window");

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
        backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#fff',
    }
})

export default Home;