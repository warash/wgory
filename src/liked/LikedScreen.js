import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import MyStatusBar from '../shared/components/MyStatusBar';

import { PostList } from '../gallery/PostList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as likedActions from '../+store/liked.actions';
import { colors } from '../shared/style-variables';

class LikedScreen extends React.Component {


    componentDidMount() {
        this.load();
    }

    load = () => {
        const { actions } = this.props;
        actions.getLikedPosts('load');
    };

    loadMore = () => {
        const { actions } = this.props;
        actions.getLikedPosts('loadMore');
    };

    onRefresh = () => {
        const { actions } = this.props;
        actions.getLikedPosts('refresh');
    };


    renderEmpty = () => {
        return <View style={styles.emptyWrapper}>
            <Text style={styles.emptyText}>
                Nie masz żadnych zdjęć w ulubionych.
            </Text>
        </View>
    };

    render() {
        const { loading, posts, refreshing } = this.props;

        return (<View style={{ flex: 1 }}>
            <MyStatusBar/>
            <PostList
                ListEmptyComponent={this.renderEmpty}
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
    emptyWrapper: {
        flex: 1,
        paddingVertical: 100,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 19,
        color: colors.textLight
    }
});


const mapDispatch = (dispatch) => {
    return { actions: bindActionCreators(likedActions, dispatch) }
};

const mapProps = (state) => state.liked;

export default connect(mapProps, mapDispatch)(LikedScreen)