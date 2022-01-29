import React from 'react';
import { Image, StyleSheet } from 'react-native';


export const Avatar = (props) => {
    return (<Image style={styles.avatar} {...props}></Image>);
};


const styles = StyleSheet.create({
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14
    }
});