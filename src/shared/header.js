import React from 'react';
import { H1 } from './components/text-components';
import { colors } from './style-variables';
import { StyleSheet, View } from 'react-native';

export const Header = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.spacer}/>
            <H1 style={styles.title}>{title}</H1>
            <View style={styles.spacer}/>
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: colors.backgroundDark
    },
    logo: {
        width: 35,
        height: 35
    },
    title: {},
    spacer: {
        width: 35,
        height: 35
    }
});