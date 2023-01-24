import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

const Body = () => {

    return (
        <ScrollView style={styles.container} contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
})

export default Body;