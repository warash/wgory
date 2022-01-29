import React from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { colors } from '../style-variables';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from 'color';

export const CircleCloseButton = (props) => {
    const { onPress, style } = props;

    return (
        <TouchableOpacity style={style} onPress={() => onPress && onPress()}>
            <View style={styles.circle}>
                <Icon style={styles.closeButton} name="close" size={18} color={colors.textDarkest}/>
            </View>
        </TouchableOpacity>

    )
};


const styles = StyleSheet.create({

        circle: {
            width: 30,
            height: 30,
            borderRadius: 4,
            backgroundColor: Color(colors.textLightest).alpha(0.5),
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
;