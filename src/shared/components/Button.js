import React from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '../style-variables';


export default (props) => {

    return (
        <Button
            fontSize={12}
            fontWeight="800"
            backgroundColor={colors.buttonPrimary}

            containerViewStyle={{ marginRight: 0, marginLeft: 0, width: '100%' }}
            {...props}
            buttonStyle={[styles.buttonStyle, props.buttonStyle]}
        />)
}


const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 5,
        paddingHorizontal: 30,

        // margin:10,
    },
});