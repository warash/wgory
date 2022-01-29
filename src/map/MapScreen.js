import React from 'react';
import MapView from 'react-native-maps';
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { PostMarker } from './PostMarker';
import { BottomDrawer } from './BottomDrawer';
import { PostsCarousel } from './PostsCarousel';
import { colors } from '../shared/style-variables';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mapActions from '../+store/map.actions'
import { SearchBar } from '../shared/components/SearchBar';
import MyStatusBar, { STATUS_BAR_HEIGHT } from '../shared/components/MyStatusBar';
import ModalBox from 'react-native-modalbox';
import PostItem from '../gallery/PostItem';
import { CircleCloseButton } from '../shared/components/CircleCloseButton';
import Color from 'color';

type Props = {};
const { height, width } = Dimensions.get('window');

class PatchedScrollView extends React.PureComponent {
    componentDidMount() {
        this._scrollView.scrollResponderHandleStartShouldSetResponder = (e, gestureState) => {
            return true;
        };
        this.setState({ a: true })
    }

    render() {
        return (
            <ScrollView ref={x => this._scrollView = x} {...this.props}>
                {this.props.children}
            </ScrollView>
        )
    }
}


const polandRegion = {
    latitude: 51.77996988861809,
    latitudeDelta: 9.219037601037527,


    longitude: 19.14513621479273,
    longitudeDelta: 10.023024827241898
};


const polandup = {
    longitude: polandRegion.longitude - polandRegion.longitudeDelta / 2,
    latitude: polandRegion.latitude - polandRegion.latitudeDelta / 2,
};
const polanddown = {
    longitude: polandRegion.longitude + polandRegion.longitudeDelta / 2,
    latitude: polandRegion.latitude + polandRegion.latitudeDelta / 2,
};

export class MapScreen extends React.PureComponent<Props> {


    constructor(props) {
        super(props);

        this.state = {
            place: {},
            isLoading: false,
            isImageCarouselOpen: true,
            currentId: null
        };

        const { width } = Dimensions.get('window');
        this.carouselWidth = width;
        this.slideWidth = width * 0.7;
    }

    setScollResponder = (scroll) => {

        scroll.scrollResponderHandleStartShouldSetResponder = () => true;
        scroll.scrollResponderHandleStartShouldSetResponderCapture = () => true;
    };

    hackPanResponder(modal) {
        modal.state.pan.panHandlers.onStartShouldSetResponder = () => {
            debugger
            return this.offset = 0;
        }
    };

    onScroll = (s) => {
        this.offset = this.scroll.getOffset()
    };

    componentDidUpdate(nextProps) {

        const { navigation } = this.props;
        // if (!navigation.state || !navigation.state.params) return;
        // const { params: { post } = {} } = navigation.state;
        // if (this.postId === post.id) return;

        const post = navigation.getParam('post', null);
        const callId = navigation.getParam('callId', null);
        if (!post && !callId) return;
        if (this.callId === callId) return;

        const { location: { coordinates } } = post;
        const [longitude, latitude] = coordinates;
        this.callId = callId;
        this.setState({ focusedPostId: post.id, isImageCarouselOpen: true, detailsOpened: false });
        // this.carousel.focus(post);
        this.map.animateToRegion({ longitude, latitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 0);

    }


    onRegionChange = (region) => {
        if (this.stopRefresh) {
            this.stopRefresh = false;
            return;
        }
        const { actions: { map } } = this.props;
        map.regionChanged(region);
    };


    onPostPress = (post) => {
        //todo open details view
        this.setState({ currentId: post.id, detailsOpened: true })
    };

    getFocusedId = () => {
        const { focusedPostId } = this.state;
        const { posts } = this.props;
        const focused = posts.find(p => p.id === focusedPostId) || (posts.length && posts[0]);
        return focused && focused.id;
    };


    closingCarouselTimer;
    onOutsideCarouselPress = (event) => {
        if (!this.state.isImageCarouselOpen) return;
        this.setState({ isImageCarouselOpen: false });
    };

    openCarousel = () => {
        this.setState({ isImageCarouselOpen: true });
    };

    onPlaceSearchChanged = (place) => {
        const { longitude, latitude, latitudeDelta, longitudeDelta } = place;
        this.map.animateToRegion({ longitude, latitude, latitudeDelta, longitudeDelta });
        this.setState({ place });
    };


    onMarkerPress = (post) => {
        clearTimeout(this.closingCarouselTimer);

        if (this.state.focusedPostId === post.id && this.state.isImageCarouselOpen) return;
        this.setState({ focusedPostId: post.id, isImageCarouselOpen: true });
        // this.carousel.focus(post);
    };

    onCarouselSlideToPost = (post) => {
        const [longitude, latitude] = post.location.coordinates;
        this.setState({ focusedPostId: post.id });
        this.stopRefresh = true;
        this.map.animateToCoordinate({ longitude, latitude }, 200);

    };


    handleDrawerOpened = () => {

        this.carousel.refresh();
    };

    closeDetailsModal = () => {
        this.setState({ detailsOpened: false });
    };

    render() {
        const { isImageCarouselOpen, place, currentId, detailsOpened } = this.state;
        const focusedPostId = this.getFocusedId();
        const { address } = place;
        const { posts, loading } = this.props;
        const current = (posts || []).find(p => p.id === currentId);

        return (
            <View style={styles.container}>
                <MyStatusBar/>
                {/*<ScrollView contentContainerStyle={{height:300}}>*/}
                {/*<View style={{height:800}}>*/}
                {/*{!!current &&<PostItem post={current}/>}*/}
                {/*</View>*/}

                {/*</ScrollView>*/}

                <ModalBox onClosed={this.closeDetailsModal} style={styles.smallModal}
                          isOpen={!!current && detailsOpened}
                          swipeToClose={true}
                          backButtonClose={true}
                          coverScreen={false}
                    // backdrop={true}
                          position={'center'}>

                    <View style={styles.detailsWrapper}>
                        {/*<MyStatusBar/>*/}
                        <CircleCloseButton onPress={this.closeDetailsModal} style={styles.closeButton}/>
                        <PatchedScrollView bounces={false}
                                           contentContainerStyle={{ height: null }}>

                            {!!current && <PostItem post={current}/>}


                        </PatchedScrollView>
                    </View>


                </ModalBox>
                <View style={styles.pageContainer}>

                    <View style={styles.topControls} pointerEvents={'box-none'}>
                        <SearchBar address={address} onPlaceChange={this.onPlaceSearchChanged}/>
                        {loading && <View style={styles.spinner}>
                            <ActivityIndicator color={'white'} size={'small'}/>
                        </View>}

                    </View>


                    <MapView

                        moveOnMarkerPress={false}
                        onPress={this.onOutsideCarouselPress}
                        onPanDrag={this.onOutsideCarouselPress}
                        ref={map => this.map = map}
                        showsUserLocation={true}
                        zoomControlEnabled={false}
                        showsMyLocationButton={false}
                        showsPointsOfInterest={false}
                        onRegionChangeComplete={this.onRegionChange}
                        onLayout={() => this.map.fitToCoordinates([polandup, polanddown], {
                            edgePadding: {
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10
                            }, animated: false
                        })}
                        style={styles.map}>
                        {
                            posts.map((post) => (

                                <PostMarker
                                    // onPressStart={() => this.markerPressed = true}
                                    // onPressEnd={() => this.markerPressed = false}
                                    onPress={this.onMarkerPress}
                                    isFocused={post.id === focusedPostId}
                                    key={post.clusterId} post={post}/>

                            ))
                        }
                    </MapView>

                    <BottomDrawer height={180}
                                  onOpened={this.handleDrawerOpened}
                                  hide={!posts.length}
                                  isOpen={isImageCarouselOpen}
                                  openRequest={this.openCarousel}>
                        <PostsCarousel posts={posts}

                                       focusedPostId={focusedPostId}
                                       onPostPress={this.onPostPress}
                                       ref={carousel => this.carousel = carousel}
                                       onFocus={this.onCarouselSlideToPost}/>
                    </BottomDrawer>

                </View>
            </View>
        );
    }
}

// const STATUS_BAR_HEIGHT = 6;

const styles = StyleSheet.create({

    detailsWrapper: {
        position: 'relative',
        // width: 300,
        // alignSelf:'center',
        backgroundColor: 'white',
        // height:100
        borderRadius: 6,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: STATUS_BAR_HEIGHT + 15,
        zIndex: 1
    },
    container: {
        flex: 1,
        alignSelf: 'stretch'
    },
    pageContainer: {
        position: 'relative',
        flex: 1,
        alignSelf: 'stretch'
    },

    carousel: {
        position: 'absolute',
        bottom: 0
    },

    map: {
        flex: 1,
        alignSelf: 'stretch'
    },
    smallModal: {

        // marginTop: STATUS_BAR_HEIGHT,
        width: null,
        padding: 10,
        paddingTop: 10 + STATUS_BAR_HEIGHT,
        height: null,
        backgroundColor: 'transparent'
    },
    topControls: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        width: '100%',
        padding: 20,

    },
    spinner: {
        marginTop: 10,
        width: 36,
        height: 36,
        borderRadius: 6,
        backgroundColor: Color(colors.backgroundLight).alpha(0.8),
        alignItems: 'center',
        justifyContent: 'center'
    }
});


const mapDispatch = (dispatch) => {
    return {
        actions: {
            map: bindActionCreators(mapActions, dispatch)
        }
    }
};
const mapProps = (state) => state.map;
export const MapScreenContainer = connect(mapProps, mapDispatch)(MapScreen);
