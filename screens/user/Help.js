import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const {width} = Dimensions.get("window");

const Help = ({navigation, route}) => {

    useFocusEffect(

        React.useCallback(() => {

            console.log("THE HELP SCREEN WAS FOCUSED!")
           

            return () => {
                // Do something when the screen is unfocused
                   console.log("THE PROFILE SCREEN WAS UNFOCUSED!")
                 };

        }, [navigation])
      );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.statusBar}></View>
            </View>
            <View style={[styles.profile_card, {marginTop: 12,}]}>
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.large_txt]}>Любимые Товары</Text>
                    <View style={{width: '5%', height: 18, justifyContent: 'center', alignItems: 'center', marginTop: 10,}}>
                            <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={width < 450 ? require('../../assets/icons/forward-arrow-white.png'): require('../../assets/icons/forward-arrow.png')}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: width < 500 ? 'rgba(0, 0, 0, 1)' : '#f2f2f2',
    },
    header: {
        width: '100%',
        height: 30,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        top: 0,

        backgroundColor: width < 500 ? '#202B3F' : 'rgba(205, 194, 194, 0.52)',
    },
    profile_card:{
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: width < 500 ? '#3b3c3d' : '#fff',
        borderRadius: 8,
        top: 0,
        padding: 8,
    },
    small_txt:{
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.25,
        fontFamily: 'RobotoRegular', 
        marginBottom: 16,
        color: width < 500 ? '#fff' : '#000',
    },
    large_txt: {
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium',
        marginBottom: 16,
        textAlign: 'center',
        color: width < 500 ? '#fff' : '#000',
    },

    btn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,

        backgroundColor: '#0BB798'
    },
    statusBar: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    txt: {
        fontSize: 22,
        lineHeight: 24,
        letterSpacing: 0.15,
        fontFamily: 'RobotoMedium', 
        color: '#0BB798',
    },
    profile_logo: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        borderRadius: 48,
    },
    profile_name: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    }

})

export default Help;