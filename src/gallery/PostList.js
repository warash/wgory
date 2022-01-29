import React from 'react';
import { FlatList, Image, StyleSheet, Text, View, WebView } from 'react-native';

import { colors } from '../shared/style-variables';
import { BusyIndicator } from '../shared/components/busy-indicator';
import PostItem from './PostItem';

export class PostList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    onPressed = (item) => {
        const { onFeedPress: onPostPressed } = this.props;
        !!onPostPressed && onPostPressed(item);
    };

    renderItem({ item }) {
        const { onFeedPress: onPostPressed } = this.props;
        return (<PostItem post={item} onPress={this.onPressed}/>);
    }


    scrollTop() {


        this.list.scrollToOffset(0);
    }

    getOffset = () => {
        return this.scroll || 0;
    };

    handleScroll = (e) => {
        this.scroll = e.nativeEvent.contentOffset.y
    };

    render() {
        const { posts, loading, refreshing, loadMore, onRefresh, ListEmptyComponent } = this.props;
        return (
            <View style={styles.list}>
                {loading && <BusyIndicator/>}
                {!!posts && <FlatList style={styles.list}
                                      ListEmptyComponent={ListEmptyComponent}
                                      onScroll={this.handleScroll}
                                      ref={ref => this.list = ref}
                                      data={posts}
                                      refreshing={refreshing}
                                      onEndReached={loadMore}
                                      onRefresh={onRefresh}
                                      keyExtractor={post => `${post.id}`}
                                      renderItem={this.renderItem}/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        alignSelf: 'stretch',
        flex: 1,
        backgroundColor: colors.backgroundLightest
    }
});