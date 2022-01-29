import React from 'react';
import { TabBarBottom, TabNavigator, } from 'react-navigation';
import { colors } from './shared/style-variables';
import { MapScreenContainer } from './map/MapScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import GalleryScreen from './gallery/GalleryScreen';
import LikedScreen from './liked/LikedScreen';
import { StyleSheet, View } from 'react-native';
import { store } from './store';
import { openAddPhotoModal } from './+store/addPost.actions';
import { toggleLoginModal } from './+store/user.actions';
import { ProfileNavigator } from './user/ProfileNavigator';


const menuIcon = (name) => ({ tintColor, focused }) => {
    return (
        <View style={styles.iconContainer}>
            <Icon fontWeight="100" name={name} size={22} color={tintColor}/>
            {focused && <View style={styles.underline}/>}
        </View>
    )
};

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            });

            return { transform: [{ translateX }] }
        },
    }
};

export const MainNavigator = TabNavigator({
    gallery: {
        screen: GalleryScreen,
        navigationOptions: {
            tabBarIcon: menuIcon('newspaper-o')
        }
    },
    map: {
        screen: MapScreenContainer,
        navigationOptions: {
            tabBarIcon: menuIcon('map-o')
        }
    },
    add: {
        screen: () => null,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return (
                    <View style={styles.plusWrapper}>
                        <Icon name="camera" size={22} color={colors.backgroundDark}/>
                    </View>
                )
            }
        }
    },
    favorites: {
        screen: LikedScreen,
        navigationOptions: {
            tabBarIcon: menuIcon('heart-o')
        }
    },
    profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            tabBarIcon: menuIcon('user-o')
        }
    }
}, {
    tabBarPosition: 'bottom',
    tabBarComponent: ({ jumpToIndex, ...props, navigation }) => (
        <TabBarBottom
            {...props}
            jumpToIndex={index => {
                if (index === 2) {
                    const { user } = store.getState();
                    if (user.incognito) {
                        store.dispatch(toggleLoginModal(true));
                    } else {
                        store.dispatch(openAddPhotoModal());
                    }
                }
                else {
                    navigation.state.params && navigation.state.params.onFocus && navigation.state.params.onFocus()
                    jumpToIndex(index)

                }
            }}
        />

    ),
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        // iconStyle: {
        //     width: 30,
        //     height: 30,
        //     margin: 0
        // },
        activeTintColor: colors.backgroundLightest,
        inactiveTintColor: colors.backgroundLight,
        style: {
            backgroundColor: colors.backgroundDark,
            height: 45,
            margin: 0,
            padding: 0,
            zIndex: 999
        },
    },
    // lazy:false,
    animationEnabled: false,
    swipeEnabled: false
});


const styles = StyleSheet.create({
    plusWrapper: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.backgroundLight,
    },

    iconContainer: {
        // paddingHorizontal:15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flex: 1
        // alignSelf: 'stretch'
    },
    underline: {

        bottom: 5,
        position: 'absolute',
        height: 2,
        backgroundColor: colors.backgroundLightest,
        width: 18,
    }
});