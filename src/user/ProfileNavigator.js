import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import React from 'react';
import Profile from './Profile';
import { Info } from './Info';
import { colors } from '../shared/style-variables';
import { TermsAndCondition } from '../shared/TermsAndConditions';
import { PrivacyPolicy } from '../shared/PrivacyPolicy';


export const ProfileNavigator = StackNavigator({
        Profile: {
            screen: Profile
        },
        Info: {
            screen: Info
        },
        Terms: {
            screen: TermsAndCondition
        },
        Policy: {
            screen: PrivacyPolicy
        }
    },
    {
        headerMode: 'none',
        cardStyle: {
            backgroundColor: colors.backgroundDark
        },
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                return CardStackStyleInterpolator.forHorizontal(sceneProps);
            }
        }),
    });