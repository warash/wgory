import React from 'react';
import {
    Dimensions,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { colors } from '../shared/style-variables';
import Color from 'color';
import moment from 'moment';
import { LazyImage } from '../shared/components/LazyImage';
import { SmallSpan, Span } from '../shared/components/text-components';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    posts: any[],
    onFocus: Function,
    focusedPostId: any
};

const { width } = Dimensions.get('window');
const carouselWidth = width;
const slideWidth = width * 0.7;


export class PostCarouselItem extends React.PureComponent {

    render() {
        const { item, onPress } = this.props;
        const [mainImage] = item.images;
        const { description, id, timestamp } = item;
        const published = moment(timestamp).fromNow();

        return (<TouchableOpacity
            key={id}
            activeOpacity={1}
            style={styles.slideInnerContainer}
            onPress={() => onPress && onPress(item)}>

            {/*<View style={styles.shadow}/>*/}
            <View style={[styles.imageContainer]}>
                {mainImage && <LazyImage
                    style={styles.image}
                    imgStyle={{ borderRadius: entryBorderRadius }}
                    source={{ uri: mainImage.miniImageUrl }}/>}
            </View>

            <View style={styles.metaWrapper}>
                    <Span style={styles.metaText} numberOfLines={1}
                          ellipsizeMode={'tail'}>{description.toUpperCase()}</Span>
                <View style={styles.publishedContainer}>
                    <Icon style={styles.clockIcon} name="clock-o" size={11} color={colors.textDark}/>
                    <SmallSpan style={{ color: colors.textDarkest }}>{published}</SmallSpan>
                </View>
            </View>


        </TouchableOpacity>);
    }
}


export class PostsCarousel extends React.PureComponent<Props> {


    constructor(props) {
        super(props);
        const { width } = Dimensions.get('window');
        this.carouselWidth = width;
        this.slideWidth = width * 0.7;
    }


    onPostPress = (post) => {
        const { onPostPress } = this.props;
        onPostPress && onPostPress(post);
    };

    renderPostSlide = ({ item }) => {

        // const [mainImage] = item.images;
        // const { description, id, timestamp } = item;
        // const published = moment(timestamp).fromNow();


        return (
            <PostCarouselItem key={item.id} item={item} onPress={this.onPostPress}/>
        );
    };


    onSnapTopPost = (idx) => {
        const { posts } = this.props;
        const post = posts[idx];
        if (!post) return;
        this.focusedId = post.id;

        // let idx = posts.findIndex(p => p.id === post.id);
        if (idx < 0) {
            idx = 0;
        }
        this.focusedIdx = idx;

        if (this.selfSnap) {
            this.selfSnap = false;
            return;
        }
        const { onFocus } = this.props;
        onFocus && onFocus(post);
    };

    focusMe = (postId) => {
        const { posts } = this.props;
        if (posts.length === 0) return;
        let idx = posts.findIndex(p => p.id === postId);
        if (idx < 0) {
            idx = 0;
        }
        if (this.focusedId === postId
            && this.focusedIdx === idx) {
            return;
        }


        this.selfSnap = true;
        setTimeout(() => this.carousel.snapToItem(idx), 0);
        this.focusedId = postId;
        this.focusedIdx = idx;
    };

    refresh = () => {
        // this.carousel.triggerRenderingHack();
    };

    onCarouselLayout = () => {
        this.focusMe(this.props.focusedPostId);
    };

    componentDidUpdate() {
        this.focusMe(this.props.focusedPostId);
    }

    render() {
        const { posts, focusedPostId } = this.props;
        // const idx = posts.findIndex(p => p.id === focusedPostId);
        return (

            <Carousel
                ref={carousel => this.carousel = carousel}
                data={posts}
                onLayout={this.onCarouselLayout}
                // useScrollView={true}
                // apparitionDelay={0}
                renderItem={this.renderPostSlide}
                sliderWidth={this.carouselWidth}
                itemWidth={this.slideWidth}
                keyExtractor={post => {
                    return `${post.id}`
                }}
                // initialScrollIndex={idx}
                // firstItem={idx}
                // inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                onSnapToItem={this.onSnapTopPost}
            />
        );
    }
}


const slideHeight = 180;
const itemHorizontalMargin = 10;
const IS_IOS = Platform.OS === 'ios';
const entryBorderRadius = 5;
const shadowPadding = 10;

const styles = StyleSheet.create({
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: shadowPadding,
        shadowColor: 'black',
        backgroundColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },


    slideInnerContainer: {
        width: slideWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: shadowPadding, // needed for shadow,
        borderRadius: 5
    },

    imageContainer: {
        flex: 1,
        borderRadius: 5,
        // marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',

    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    metaWrapper: {
        position: 'absolute',
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: shadowPadding,
        height: 45,
        width: '100%',
        backgroundColor: Color('white').alpha(0.8),
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: entryBorderRadius,
        borderBottomLeftRadius: entryBorderRadius,
    },
    metaText: {
        color: colors.textDark
    },
    publishedContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    clockIcon: {
        marginRight: 5
    }
});
