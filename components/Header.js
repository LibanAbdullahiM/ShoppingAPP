import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Search from "./Search";

const {width} = Dimensions.get('window');

const Header = ({navigation, route}) => {

    return (
        <View style={styles.container}>
            <View style={styles.statusBar}>
            </View>
            <Search navigation={navigation} route={route}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',

        backgroundColor: width < 500 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',

        borderBottomRightRadius: 36,
        borderBottomLeftRadius: 36,
    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    logo: {
        width: 80,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,

        borderWidth: 1,
        borderColor: '#0BB798',
        borderRadius: 16,
    },
    txt: {
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: 0,
        fontFamily: 'RobotoMedium',
        color: '#0BB798',
    }
})

export default Header;