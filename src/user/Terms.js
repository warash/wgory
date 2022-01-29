import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import images from '../../assets/images';
import { Span } from '../shared/components/text-components';
import { colors } from '../shared/style-variables';
import { CircleCloseButton } from '../shared/components/CircleCloseButton';


const termsAndCondition = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi eius explicabo impedit minima. Assumenda commodi, consequuntur distinctio dolore dolores eligendi et explicabo id iste libero magni, numquam omnis quisquam sed soluta tenetur unde voluptates? Aliquid quaerat quo reprehenderit suscipit totam.';

export const Terms = (props) => {
    const { navigation } = props;

    const onClose = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container} source={images.primaryBackground}>
            <CircleCloseButton style={styles.closeButton} onPress={onClose}/>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Span style={styles.text}>{termsAndCondition}</Span>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        zIndex:2,
        top: 20,
        right: 20,
    },
    container: {
        flex: 1,
        width:'100%'
    },
    text: {
        fontSize: 14,
        color: colors.textLightest
    }
});


