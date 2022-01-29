import React from 'react';
import { StackNavigator } from 'react-navigation';
import { MapScreenContainer } from './MapScreen';
import { PostDetails } from '../post/PostDetails';


export const MapNavigator = StackNavigator({
    map: {
        screen: MapScreenContainer,
    },
    details: {
        screen: PostDetails
    }
}, {
    headerMode: 'none',
});
