import images from '../../../assets/images';
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';


export default (props) => {
    return (
        <ImageBackground
            resizeMethod={'resize'}
            source={images.secondaryBackground}
            {...props}
            style={[styles.background, props.style]}>
        </ImageBackground>)
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%'
    }
});