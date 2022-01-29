import { Animated, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import { H1 } from './components/text-components';
import { colors } from './style-variables';
import { STATUS_BAR_HEIGHT } from './components/MyStatusBar';
import { bindActionCreators } from 'redux';
import * as messageActions from '../+store/messages.actions';
import Color from 'color';

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.visible = new Animated.Value(0)
    }

    toggleVisiblityAnimation = (show) => {
        Animated.timing(
            this.visible,
            {
                toValue: show ? 1 : 0,
                duration: 500
            }
        ).start()
    };

    clearMessage = () => {
        const { actions: { clearMessage } } = this.props;
        clearMessage();

    };

    componentDidUpdate() {

        const { value } = this.props;
        this.toggleVisiblityAnimation(!!value);
        if (!value) return;

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(this.clearMessage, 2000)
    }

    render() {
        const { type, value } = this.props;

        const translate = this.visible.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 10]
        });
        const animatedStyle = { transform: [{ translateY: translate }] };
        return (
            <Animated.View style={[styles.container, animatedStyle]}>
                <View style={styles.messageBox}>
                    <H1 style={styles.message}>{value}</H1>
                </View>
            </Animated.View>
        );
    }
}

// const mapDispatch = (dispatch) => {
//     return { actions: bindActionCreators(mes, dispatch) }
// };


const styles = StyleSheet.create({
    container: {
        top: STATUS_BAR_HEIGHT,
        // marginHorizontal: 10,
        position: 'absolute',
        zIndex: 2,
        alignSelf: 'stretch',
        flexDirection: 'row',
    },

    message: {
        color: colors.textDarkest,
        fontWeight: '600'
    },
    messageBox: {
        alignSelf: 'stretch',
        flex: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        padding: 20,
        backgroundColor: Color(colors.backgroundLight).lighten(0.3),
        borderWidth:0.5,
        borderColor: colors.borderPrimary
    }
});

const mapProps = (state) => state.messages;
const mapDispatch = (dispatch) => {
    return { actions: bindActionCreators(messageActions, dispatch) }
};


export default connect(mapProps, mapDispatch)(MessageBox)
