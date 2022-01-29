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
import Icon from 'react-native-vector-icons/FontAwesome';
import { Span } from './text-components';
import RNGooglePlaces from 'react-native-google-places';

export const SearchBar = (props) => {
    const { address, onPlaceChange, onBack } = props;


    const openAutoComplete = () => {
        RNGooglePlaces.openAutocompleteModal({
            language: 'PL',
        }).then((place) => {


            const { east, west, north, south } = place;
            const latitudeDelta = Math.abs(south - north);
            const longitudeDelta = Math.abs(west - east);

            onPlaceChange && onPlaceChange({ ...place, longitudeDelta, latitudeDelta });
        });
    };


    return (

        <TouchableWithoutFeedback onPressIn={openAutoComplete}>

            <View style={styles.container}>
                {(!address || !onBack) && <Icon name="search" size={16} color={colors.textDark}/>}
                {!!address && onBack &&

                <TouchableOpacity style={styles.backIcon} onPress={() => onBack && onBack()}>
                    <Icon name='chevron-left' size={16}
                          color={colors.textDark}/>
                </TouchableOpacity>

                }


                <Span placeholder={'Wyszukaj lokalizację...'} numberOfLines={1} ellipsizeMode={'tail'}
                      style={styles.text}>{address || 'Wyszukaj lokalizację...'}</Span>
            </View>


        </TouchableWithoutFeedback>

    )
};


const styles = StyleSheet.create({

    backIcon: {
        width: 35, height: 35,
        alignItems: 'center',
        marginRight: -20,
        marginLeft: -10,
        justifyContent: 'center',
        // alignItems: 'center'
    },

    container: {

        backgroundColor: 'white',
        height: 35,
        // backgroundColor: colors.backgroundPrimary,
        borderRadius: 2,
        borderColor: colors.borderPrimary,
        borderWidth: 0.5,
        padding: 10,
        // shadowColor: colors.borderPrimary,
        // shadowOffset: {
        //     width: 0,
        //     height: 1
        // },
        // shadowRadius: 5,
        // shadowOpacity: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    text: {
        marginHorizontal: 20,
        fontSize: 15,
        color: colors.textDark
    }
});