import React from 'react';
import { StackNavigator } from 'react-navigation';
import { EditNewPostDescriptionContainer } from './EditPostDescription';
import { EditNewPostLocationContainer } from './EditPostLocation';
import { TouchableWithoutFeedback, Animated, Easing } from 'react-native';


export const EditPostNavigator = StackNavigator({
    editDescription: {
        screen: EditNewPostDescriptionContainer,
    },
    editLocation: {
        screen: EditNewPostLocationContainer
    }
}, {
    headerMode: 'none',
    navigationOptions:{
        gesturesEnabled:false,

    },
    transitionConfig : () => ({
        transitionSpec: {
            duration: 0,
            timing: Animated.timing,
            easing: Easing.step0,
        },
    }),
});
