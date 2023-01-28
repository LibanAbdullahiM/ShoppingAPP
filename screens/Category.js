import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Category = () => {

    return (
        <View style={styles.container}>
             <Text style={styles.text}>Sorry! Not Implemented Yet the Category page</Text>
            <Text style={{
                fontSize: 42,
            }}>😢</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: '200',
        fontFamily: 'InterSemiBold',
        textAlign: 'center',
    }
})

export default Category;