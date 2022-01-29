import React from 'react';
import config from 'react-native-config';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import Geocoder from 'react-native-geocoder';
import Button from '../shared/components/Button'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as photoActions from '../+store/addPost.actions';
import { Span } from '../shared/components/text-components';
import MapView from 'react-native-maps';
import { SearchBar } from '../shared/components/SearchBar';
import { colors } from '../shared/style-variables';
import { CloseButton } from '../shared/components/CloseButton';
import images from '../../assets/images';
import Background from '../shared/components/Background';
import { BackButton } from '../shared/components/BackButton';
import Color from 'color';
import Icon from 'react-native-vector-icons/FontAwesome';

Geocoder.fallbackToGoogle(config.GOOGLE_API_KEY);

type Props = {};

export class EditNewPostLocation extends React.Component<Props> {


    state = {
        percent: 0,
        isProgressModalOpened: false
    };

    saveImage = () => {
        const { photo, actions, navigation } = this.props;
        const { description, mountain, mountainRange, timestamp, authorSignature, postType } = navigation.state.params;
        const location = this.getFinalLocation();
        const { longitude, latitude } = location;
        actions.savePost({ photo, longitude, latitude, description, timestamp, mountainRange, mountain, authorSignature, postType });
    };


    onRegionChange = (location) => {
        this.setState({ adjustedLocation: location });
    };

    getFinalLocation() {
        const { location } = this.props;
        const { adjustedLocation } = this.state;
        if (!!adjustedLocation) {
            return adjustedLocation;
        } else if (!!location.longitude) {
            return location;
        } else {
            return {
                longitude: 19.9449799,
                latitude: 50.0646501,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            }
        }
    }

    getInitialRegion() {
        const { location } = this.props;

        if (!location.longitude)
            return {
                longitude: 19.9449799,
                latitude: 50.0646501,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            };

        return {
            ...location,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
        };
    }

    onPlaceSearchChanged = (place) => {
        const { longitude, latitude, latitudeDelta, longitudeDelta } = place;
        this.map.animateToRegion({ longitude, latitude, latitudeDelta, longitudeDelta });
        this.setState({ address: place.address });
    };
    close = () => {
        const { actions } = this.props;
        actions.toggleEditPhotoModal(false);
    };

    render() {

        const { address, percent } = this.state;
        const { photo, navigation, saving } = this.props;
        const finalLocation = this.getFinalLocation();

        const initialRegion = this.getInitialRegion();

        const lngLat = finalLocation && `${finalLocation.longitude.toFixed(4)}, ${finalLocation.latitude.toFixed(4)}`;

        return (<View style={styles.mainWrapper}>
                {/*<MyStatusBar/>*/}


                <View style={styles.header}>
                    <BackButton onPress={() => navigation.goBack()}/>

                    <View style={styles.searchBar}>
                        <SearchBar noBack={true} address={address} onPlaceChange={this.onPlaceSearchChanged}/>
                    </View>

                    <CloseButton onPress={this.close}/>
                </View>

                <View style={styles.wrapper}>
                    <View style={styles.mapWrapper}>

                        <MapView
                            ref={map => this.map = map}
                            onRegionChange={this.onRegionChange}
                            initialRegion={initialRegion}
                            // showsUserLocation={true}
                            showsPointsOfInterest={false}
                            style={styles.map}>

                        </MapView>

                        <View style={styles.markerWrapper} pointerEvents={'none'}>
                            <View style={styles.markerDrop}></View>
                            <Image
                                pointerEvents={'none'}
                                style={styles.marker}
                                source={{ uri: photo.uri }}
                            />

                        </View>

                    </View>
                    <View style={styles.controls}>
                        <View style={styles.disclaimer}>
                            <Icon style={{ marginRight: 10 }} name="user-secret" size={18} color={colors.textDark}/>
                            <Span style={styles.text}>Przesuń mapę by skorygowac lokalizację</Span>
                        </View>
                        <View style={styles.lngLat}>
                            <Icon style={{ marginRight: 10 }} name="map-pin" size={13} color={colors.textDark}/>
                            <Span>{lngLat}</Span>
                        </View>
                        <Button buttonStyle={{ borderRadius: 0 }} style={styles.button} title={'WYŚLIJ'}
                                onPress={this.saveImage}>
                        </Button>
                    </View>
                </View>


                {saving &&
                <Background style={styles.progressContainer} source={images.primaryBackground}>

                    <ActivityIndicator color={'white'}/>
                </Background>}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    map: {
        flex: 1,
        alignSelf: 'stretch'
    },

    button: {
        marginTop: 15,
        marginHorizontal: 0
        // width: '100%'
    },

    marker: {
        width: 60,
        height: 60,
        borderRadius: 30,

    },
    markerWrapper: {
        opacity: 0.8,
        // width: 66,
        // height: 66,
        // backgroundColor: colors.backgroundLight,
        // borderRadius: 33,
        // borderTopRightRadius: 33,
        // borderTopLeftRadius: 33,
        // borderBottomRightRadius: 33,

        width: 66,
        height: (Math.sqrt(2) * 66),
        position: 'absolute',
        transform: [{ translateY: -(Math.sqrt(2) * 66) / 2 }],
        alignItems: 'center',
        justifyContent: 'center'
    },
    markerDrop: {
        opacity: 0.8,
        width: 66,
        height: 66,
        backgroundColor: colors.backgroundLight,
        // borderRadius: 33,
        borderTopRightRadius: 33,
        borderTopLeftRadius: 33,
        borderBottomRightRadius: 33,

        transform: [{ rotate: '-45deg' }],
        position: 'absolute',


    },
    mapWrapper: {
        flex: 1,
        width: '100%',
        // marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lngLat: {
        marginBottom: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    controls: {
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    wrapper: {
        alignItems: 'center',
        flex: 1
    },
    mainWrapper: {
        backgroundColor: colors.backgroundPrimary,
        flex: 1
    },
    topControls: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        width: '100%',
        padding: 10
    },
    disclaimer: {
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: Color(colors.backgroundLight).alpha(0.2)
    },
    text: {
        color: colors.textDarkest,
        fontSize: 14,
    },
    header: {
        flexDirection: 'row',
        padding: 8,

        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.backgroundPrimary
    },
    searchBar: {
        flex: 1,
        marginHorizontal: 8
    },
    progressContainer: {

        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'


    }
});


const mapDispatch = (dispatch) => {
    return { actions: bindActionCreators(photoActions, dispatch) }
};

const mapProps = ({ photo: { current = {}, saving } }) => {

    return {
        photo: current,
        saving,
        location: current
    }
};

export const EditNewPostLocationContainer = connect(mapProps, mapDispatch)(EditNewPostLocation);