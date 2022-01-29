import React from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { backgroundPalette } from '../style-variables';

let idx = 0;


export class LazyImage extends React.Component {

    constructor(props){
        super(props);
        this.color = backgroundPalette[idx];
        idx = (idx + 1) % 5;
    }

    render() {
        const { style, imgStyle, ...others } = this.props;

        const imageStyle = {
            backgroundColor: this.color
        };
        return (
            <View style={[imageStyle, style]}>
                <Image resizeMethod={'resize'} style={[styles.image, imgStyle]} {...others}/>
            </View>

        )
    }
}


const styles = StyleSheet.create({

    image: {
        width: '100%',
        height: '100%'
    }
});