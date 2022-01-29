import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../style-variables';


export const BusyIndicator = (props) => {
    return (<ActivityIndicator style={styles.busy} {...props} size="small" color={colors.primaryLighter}/>)
};


const styles = StyleSheet.create({
    busy: {
        flex: 1,
        alignSelf: 'stretch'
    }
});