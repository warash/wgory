import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { colors } from '../style-variables';
import React from 'react';

export const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default (props) => {

    const { backgroundColor, barStyle } = props;


    const finalBackgroundColor =  colors.backgroundDark;
    const styles = StyleSheet.create({
        statusBar: {
            height: STATUS_BAR_HEIGHT,
            backgroundColor: finalBackgroundColor
        }
    });
    return (
        <View style={styles.statusBar}>
            <StatusBar barStyle={ 'light-content'} backgroundColor={backgroundColor} {...props} />
        </View>
    );
}




