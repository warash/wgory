import React from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { Icon } from 'react-native-elements';

import RNGooglePlaces from 'react-native-google-places';
import { Span } from '../shared/components/text-components';
import { colors } from '../shared/style-variables';

export const GallerySearchBar = (props) => {
    const { address, onPlaceChange } = props;


    const openAutoComplete = () => {
        RNGooglePlaces.openAutocompleteModal({
            country: 'PL',
            language: 'PL',
        }).then((place) => {
            onPlaceChange && onPlaceChange(place);
        });
    };


    return (

        <TouchableWithoutFeedback onPress={openAutoComplete}>
            <View style={styles.container}>
                <Icon name="search" size={20} color={colors.textLightest}/>
                <Span style={styles.text}>{address}</Span>
            </View>
        </TouchableWithoutFeedback>

    )
};


const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.backgroundDark
    },
    text: {
        marginLeft: 20,
        fontSize: 15,
    }
});