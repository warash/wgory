import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Clipboard,
    View
} from 'react-native';
import React from 'react';
import { colors } from '../shared/style-variables';
import { H1, SmallSpan, Span } from '../shared/components/text-components';
import { Avatar } from '../shared/components/avatar';
import { toKilometers } from '../shared/formaters';
import { compact } from 'lodash';
import { LazyImage } from '../shared/components/LazyImage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import * as postActions from '../+store/post.actions';
import * as ua from '../+store/user.actions';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';


const moment = require('moment');
const { width } = Dimensions.get('window');

class PostItem extends React.PureComponent {


    // shouldComponentUpdate(nextProps, nextState){
    //     const should = nextProps.post !== this.props.post;
    //     return should;
    // }

    onLikePress = () => {
        const { actions, post, incognito } = this.props;
        if (incognito) {
            actions.toggleLoginModal(true);
            return;
        }
        actions.toggleLike(post);
    };

    onDelete = () => {
        Alert.alert(
            'Uwaga',
            'Czy pewno usunąc to zdjęcie?',
            [
                {
                    text: 'NIE', onPress: () => {
                    }, style: 'cancel'
                },
                {
                    text: 'TAK', onPress: () => {
                        const { actions, post } = this.props;
                        actions.deletePost(post);
                    }
                },
            ],
            { cancelable: true }
        );


    };

    onShowOnMap = () => {
        const { navigation, post } = this.props;
        navigation.navigate('map', { post, callId: Math.random() });
    };

    onSave = () => {

        Linking.openURL(this.props.post.imageUrl)
    };

    render() {
        const { post, incognito, profile = {} } = this.props;
        const {
            author, createdAt, distance, images, city, streetName,
            country, liked, loading, description, title,
            timestamp, likesCount, postType
        } = post;

        const [mainImage] = images;
        const published = moment(createdAt).fromNow();
        const taken = moment(timestamp).format('LL');
        const canDelete = !incognito && (post.author.id === profile.id || profile.role === 'admin');


        let imageStyle = {};
        if (mainImage) {
            const { bigSize } = mainImage;
            const ratio = bigSize.height / bigSize.width;
            const imageHeight = ratio * width;
            imageStyle = { width, height: imageHeight };
        }

        const address = compact([city, streetName, country]).join(', ');

        const likeIcon = liked ? 'heart' : 'heart-o';

        return (
            <View key={post.id}>

                <View style={styles.feedContainer}>
                    {loading && <View style={styles.loaderContainer}>
                        <ActivityIndicator></ActivityIndicator>
                    </View>}

                    <H1 style={styles.title}>{title}</H1>

                    <View style={styles.imageContainer}>
                        {!!mainImage && <LazyImage style={[styles.image, imageStyle]} source={{ uri: post.imageUrl }}/>}
                    </View>
                    <View style={styles.meta}>
                        <View style={styles.author}>
                            <Avatar source={{ uri: author.imageUrl }}/>
                            <View style={styles.authorText}>
                                <Span style={styles.authorName}>{author.firstName} {author.lastName}</Span>
                            </View>

                        </View>

                        <View style={styles.metaRight}>
                            <View style={styles.floatLeft}>
                                <Icon style={styles.icon} name="clock-o" size={10}
                                      color={colors.textLightest}/>
                                <SmallSpan>wysłano: {published}</SmallSpan>
                            </View>
                            {postType === 'conditions' && <View style={styles.floatLeft}>
                                <Icon style={styles.icon} name="clock-o" size={10}
                                      color={colors.textLightest}/>
                                <SmallSpan>zrobiono: {taken}</SmallSpan>
                            </View>}
                            {distance !== undefined && <View style={styles.floatLeft}>
                                <Icon style={styles.icon} name="map-signs" size={8}
                                      color={colors.textLightest}/>
                                <SmallSpan style={styles.distance}>{toKilometers(distance)}</SmallSpan>
                            </View>}
                        </View>
                    </View>

                    {postType === 'conditions' && <Span style={styles.address}>{address}</Span>}
                    {!!description && <View style={styles.description}>
                        <Span selectable>
                              {description}
                        </Span>
                    </View>}
                    <View style={styles.separator}/>
                    <View style={styles.actionFooter}>
                        <View style={styles.actionsLeft}>
                            <TouchableOpacity onPress={this.onLikePress}>
                                <View style={[styles.iconWrapper, styles.likeSection]}>
                                    <Icon style={styles.icon} name={likeIcon} size={18}
                                          color={colors.highlight}/>
                                    <Text style={styles.likesCount}>{likesCount}</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionsRight}>
                            {canDelete && <TouchableOpacity onPress={this.onDelete}>
                                <View style={styles.iconWrapper}>
                                    <Icon style={styles.actionIcons} name="trash-o" size={20}
                                          color={colors.highlight}/>
                                </View>

                            </TouchableOpacity>}

                            {profile.role === 'admin' && <TouchableOpacity onPress={this.onSave}>
                                <View style={styles.iconWrapper}>
                                    <Icon style={styles.actionIcons} name="save" size={20}
                                          color={colors.highlight}/>
                                </View>

                            </TouchableOpacity>}
                            {postType === 'conditions' && <TouchableOpacity onPress={this.onShowOnMap}>
                                <View style={styles.iconWrapper}>
                                    <Icon style={styles.actionIcons} name="map-o" size={18}
                                          color={colors.highlight}/>
                                </View>

                            </TouchableOpacity>}
                        </View>


                    </View>
                </View>
            </View>);
    }
}

const mapDispatch = (dispatch) => {
    return {
        actions: bindActionCreators({
            toggleLike: postActions.toggleLike,
            deletePost: postActions.deletePost,
            toggleLoginModal: ua.toggleLoginModal

        }, dispatch)
    }
};
const mapProps = (state) => {
    return { profile: state.user.profile, incognito: state.user.incognito };
};

export default withNavigation(connect(mapProps, mapDispatch)(PostItem));


const styles = StyleSheet.create({
    likeSection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    likesCount: {
        marginHorizontal: 6,
        color: colors.textLight,
        fontSize: 12
    },
    iconWrapper: {
        padding: 10,
        paddingHorizontal: 20
    },
    description: {
        alignSelf: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    address: {
        alignSelf: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: colors.textDarkest,
    },
    loaderContainer: {
        zIndex: 2,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    separator: {
        // marginHorizontal: 20,
        marginVertical: 4,
        width: width - 40,
        height: 0.5,
        backgroundColor: colors.textLightest,
    },
    actionIcons: {
        // marginRight: 20
    },
    actionsRight: {
        flexDirection: 'row',
    },
    actionsLeft: {},
    actionFooter: {
        paddingHorizontal: 20,
        paddingBottom: 8,

        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },

    actionIcon: {
        marginRight: 8
    },

    floatLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 8
    },
    imageContainer: {
        position: 'relative'
    },
    // favourite: {
    //     position: 'absolute',
    //     right: 10,
    //     top: 10,
    //     shadowColor: 'black',
    //     borderRadius: 15,
    //     width: 30,
    //     height: 30,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: Color('black').alpha(0.3),
    //     shadowOpacity: 0.25,
    //     shadowOffset: { width: 0, height: 10 },
    //     shadowRadius: 10,
    // },
    // favouriteIcon: {},
    feedContainer: {
        position: 'relative',
        // flex: 1,
        alignSelf: 'stretch',
        paddingVertical: 20,
        // backgroundColor: colors.backgroundPrimary,
        flexDirection: 'column',
        alignItems: 'center'
    },

    image: {
        marginBottom: 15
    },

    title: {
        marginBottom: 8,
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight: '600',
        color: colors.textDarkest,
        paddingHorizontal: 20,
    },

    meta: {
        paddingHorizontal: 20,
        // flex: 1,
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

    authorText: {
        flex: 1,
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