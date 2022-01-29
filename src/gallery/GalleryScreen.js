import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from '../+store/home.actions';
import MyStatusBar from '../shared/components/MyStatusBar';
import { SearchBar } from '../shared/components/SearchBar';
import { colors } from '../shared/style-variables';
import { PostList } from './PostList';
import { withNavigationFocus } from 'react-navigation';


class GalleryScreen extends React.PureComponent {

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarOnPress: ({ scene, jumpToIndex }) => {

                if (scene.focused) {
                    navigation.state.params.onFocus()
                } else {
                    jumpToIndex(scene.index);
                }
            },
        }
    };

    componentDidMount() {
        // this.props.navigation.setupEvents(this.onNavigatorEvent.bind(this));
        this.load();
        this.props.navigation.setParams({
            onFocus: () => {

                if (this.list.getOffset() > 0) {
                    this.list.scrollTop()
                } else {
                    this.onRefresh();
                }

            }
        });

        // this.props.navigation.setParams({
        //     onFocus: () => console.log('Asdasd')
        // })
    }

    load = () => {
        const { actions } = this.props;
        actions.getPosts('load');
    };

    loadMore = () => {
        const { actions } = this.props;
        actions.getPosts('loadMore');
    };

    onRefresh = () => {
        const { actions } = this.props;
        actions.getPosts('refresh');
    };

    componentDidFocus(event) {
        if (event.id === 'bottomTabSelected') {

        }
        if (event.id === 'bottomTabReselected') {
            // this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
        }
    }

    onPlaceSearchChanged = ({ longitude, latitude, address }) => {
        const { actions } = this.props;
        actions.regionChanged({ longitude, latitude, address });

        this.list.scrollTop();
    };

    clearNearBy = () => {
        const { actions } = this.props;
        actions.regionChanged({});

        this.list.scrollTop();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.isFocused && this.props.isFocused) {
            const { actions } = this.props;

            actions.tryRefreshPosts();
        }
    }

    render() {
        const { loading, posts, region, refreshing, isFocused } = this.props;

        const { address } = region;

        return (<View style={{ flex: 1 }}>
            <MyStatusBar/>

            <View style={styles.header}>
                <SearchBar address={address} onBack={this.clearNearBy} onPlaceChange={this.onPlaceSearchChanged}/>
            </View>
            <PostList
                ref={ref => this.list = ref}
                onRefresh={this.onRefresh}
                loadMore={this.loadMore}
                loading={loading}
                refreshing={refreshing}
                lading={loading}
                posts={posts}/>
        </View>)
    }
}


const styles = StyleSheet.create({
    button: {
        marginVertical: 20
    },
    container: {
        alignItems: 'center'
    },

    header: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: colors.backgroundPrimary
    },
});


const mapDispatch = (dispatch) => {
    return { actions: bindActionCreators(homeActions, dispatch) }
};

const mapProps = (state) => state.home;

export default withNavigationFocus(connect(mapProps, mapDispatch)(GalleryScreen))