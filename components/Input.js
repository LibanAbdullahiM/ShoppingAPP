import * as React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({styles, label, value, onChangeText, type, capitalize, editable}) => {

    return (
        <View style={styles.form_row}>
            <Text style={[styles.large_txt, {marginTop: 12,}]}>{label}</Text>
            {
                label === 'Password' ?
                <TextInput
                style={styles.input}
                placeholder=" "
                value={value}
                onChangeText={onChangeText}
                secureTextEntry
                autoComplete={type}
                autoCapitalize={capitalize}
                
                />
                :
                <TextInput
                style={styles.input}
                placeholder=" "
                value={value}
                onChangeText={onChangeText}
                autoComplete={type}
                autoCapitalize={capitalize}
                editable={editable}
                />
            }
        </View>
    )
}

export default Input;