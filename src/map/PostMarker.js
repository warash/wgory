import React from 'react';
import { AnimatedRegion, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../shared/style-variables';

import { Animated, Easing, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

export class PostMarker extends React.PureComponent {

    state = {
        initialRender: 0
    };

    constructor(props) {
        super(props);
        this.scale = new Animated.Value(0);

    }


    focusAnimation = (isFocused) => {
        Animated.spring(
            this.scale,
            {
                toValue: isFocused ? 1.2 : 1,
                friction: 5,
                duration: 3000
            }
        ).start()
    };


    componentDidUpdate() {
        // const { isFocused } = this.props;
        // this.focusAnimation(isFocused);
    }


    onPress = (e) => {
        // e.preventDefault();
        // e.stopPropagation();
        const { post, onPress } = this.props;
        onPress && onPress(post)
    };

    render() {

        const { post, onPress, onPressStart, onPressEnd, isFocused } = this.props;
        const { initialRender } = this.state;
        const { images, location: { coordinates } } = post;
        const [lng, lat] = coordinates;
        const [mainImage] = images;
        const focusStyle = isFocused ? { backgroundColor: 'white' } : {};

        return (

            <Marker
                style={isFocused ? styles.focusedMarker : null}
                key={`${post.clusterId}${initialRender}${isFocused}`}
                ref={ref => this.marker = ref}
                // onSelect={() => onPressStart && onPressStart()}
                // onTouchEnd={() => onPressEnd && onPressEnd()}
                centerOffset={{ x: 0, y: -((Math.sqrt(2) * 34) / 2) }}
                // anchor={{x:0.5, y:1}}
                // delayPressIn={0}
                onPress={this.onPress}
                coordinate={{
                    longitude: lng,
                    latitude: lat
                }}>
                <View style={[styles.pinWrapper]}>
                    <View style={[styles.aurelia, focusStyle]}/>
                    <Icon style={styles.icon} name="image" size={16} color={colors.textLight}/>
                    {mainImage && <Image
                        onLoad={() => this.setState({ initialRender: 11 })}
                        style={styles.thumbnail}
                        source={{ uri: mainImage.microImageUrl }}
                    />}


                </View>

            </Marker>
        )
    }
}

const styles = StyleSheet.create({
    focusedMarker: {
        zIndex: 10
    },
    pinWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Math.sqrt(2) * 34,
        width: 34,

        backgroundColor: 'transparent'
    },

    aurelia: {
        width: 34,
        height: 34,
        // borderRadius: 20,

        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
        borderBottomRightRadius: 17,
        transform: [{ rotate: '-45deg' }],
        // backgroundColor: Color(colors.primaryLighter),
        backgroundColor: colors.highlight,
        position: 'absolute'
    },
    icon: {
        position: 'absolute'
    },

    thumbnail: {
        height: 30,
        width: 30,
        borderRadius: 15,
    }

});