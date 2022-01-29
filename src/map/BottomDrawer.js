import React, { Component } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../shared/style-variables';
import Icon from 'react-native-vector-icons/FontAwesome';

const paddingBottom = 0;
const toggleHeight = 50;

export class BottomDrawer extends Component {

    constructor(props) {
        super(props);
        this.height = new Animated.Value(1)
    }


    animate = (isOpen, callback) => {
        Animated.timing(
            this.height,
            {
                toValue: isOpen ? 1 : 0,
                duration: 200,
                useNativeDriver: true
            }
        ).start(() => callback && callback())
    };

    componentDidUpdate(prev) {
        const wasClosed = !(prev.isOpen && !prev.hide);
        this.slidInOut(wasClosed);
    }

    componentDidMount() {
        this.slidInOut(false);
    }

    slidInOut(wasClosed) {
        const { isOpen, hide, onOpened } = this.props;
        const willOpen = isOpen && !hide;

        this.animate(willOpen, () => {
            if (willOpen && wasClosed) {
                onOpened && onOpened();
            }
        });
    }


    render() {
        const { height, children, openRequest, isOpen, hide } = this.props;

        const showToggle = !isOpen && !hide;
        const totalHeight = height + paddingBottom + toggleHeight;
        const translateY = this.height.interpolate({
            inputRange: [0, 1],
            outputRange: [totalHeight - toggleHeight, 0],
        });

        const toggleOpacity = this.height.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        });


        const panelStyle = { transform: [{ translateY: translateY }], height: totalHeight };

        const toggleStyle = { opacity: toggleOpacity };
        // const chevronName = isOpen ? 'angle-double-down' : 'angle-double-up';
        return (
            <Animated.View style={[panelStyle, styles.container]} pointerEvents="box-none">


                {!hide && <TouchableWithoutFeedback
                    onPress={() => openRequest && openRequest()}>
                    <Animated.View pointerEvents={showToggle ? 'auto' : 'box-none'}
                                   style={[styles.toggle, toggleStyle]}>
                        <Icon name={'angle-double-up'} size={30} color={'white'}/>
                    </Animated.View>
                </TouchableWithoutFeedback>}


                {children}

            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 0,
        // backgroundColor: colors.backgroundPrimary,
        paddingBottom: paddingBottom,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggle: {
        // position: 'absolute',
        backgroundColor: colors.backgroundLight,
        // backgroundColor:  colors.backgroundLight,
        // top: -60 + paddingBottom,
        height: toggleHeight,
        width: 70,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,


        alignItems: 'center',
        justifyContent: 'center'
    },

});