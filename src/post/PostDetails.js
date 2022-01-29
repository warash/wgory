import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { colors } from '../shared/style-variables';
import { H1, SmallSpan, Span } from '../shared/components/text-components';
import { Avatar } from '../shared/components/avatar';
import { toKilometers } from '../shared/formaters';
import { compact } from 'lodash';
import { LazyImage } from '../shared/components/LazyImage';

const moment = require('moment');
const { width } = Dimensions.get('window');

export class PostDetails extends React.Component {

    render() {
        const { onPress, navigation } = this.props;
        const post = navigation.state.params;
        const { author, createdAt, distance, images, city, streetName, country } = post;
        const [mainImage] = images;
        const published = moment(createdAt).fromNow();
        let imageStyle = {};
        if (mainImage) {
            const { bigSize } = mainImage;
            const ratio = bigSize.height / bigSize.width;
            const imageHeight = ratio * width;
            imageStyle = { width, height: imageHeight };
        }

        const address = compact([city, streetName, country]).join(', ');

        return (

            <View style={styles.feedContainer}>
                {!!post.title && <H1 style={styles.title}>{address.toUpperCase()}</H1>}
                {!!mainImage && <LazyImage style={[styles.image, imageStyle]} source={{ uri: post.imageUrl }}/>}
                <View style={styles.meta}>
                    <View style={styles.author}>
                        <Avatar source={{ uri: author.imageUrl }}/>
                        <View>
                            <Span style={styles.authorName}>{author.firstName} {author.lastName}</Span>
                        </View>
                    </View>

                    <View style={styles.metaRight}>
                        <SmallSpan>{published}</SmallSpan>
                        <SmallSpan style={styles.distance}>{toKilometers(distance)}</SmallSpan>
                    </View>
                </View>
            </View>);
    }
}


const styles = StyleSheet.create({

    feedContainer: {
        flex: 1,
        alignSelf: 'stretch',
        paddingVertical: 20,
        backgroundColor: colors.backgroundPrimary,
        // borderBottomColor: colors.borderPrimary,
        // borderBottomWidth: 0.3,
        flexDirection: 'column',
        alignItems: 'center'
    },

    image: {
        marginBottom: 15
    },

    title: {
        marginBottom: 8,
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
    },

    meta: {
        paddingHorizontal: 20,
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    author: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    distance: {
        fontWeight: '600'
    },

    authorName: {
        paddingHorizontal: 10,
        color: colors.textDark,
        fontStyle: 'italic'
    },
    excerpt: {
        paddingTop: 10,
    },
    right: {
        paddingHorizontal: 10,
        flex: 1
    },
    metaRight: {
        alignContent: 'space-between'
    }
});