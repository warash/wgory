import React from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { colors } from '../style-variables';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CloseButton = (props) => {
    const { onPress, style } = props;

    return (
        <TouchableWithoutFeedback style={style} onPress={() => onPress && onPress()}>
            <Icon style={styles.closeButton} name="close" size={22} color={colors.textDark}/>
        </TouchableWithoutFeedback>
    )
};


const styles = StyleSheet.create({});