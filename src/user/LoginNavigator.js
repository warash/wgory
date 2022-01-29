import { StackNavigator } from 'react-navigation';
import { Register } from './Register';
import Login from './Login';
import React from 'react';
import { colors } from '../shared/style-variables';
import { TermsAndCondition } from '../shared/TermsAndConditions';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import { PrivacyPolicy } from '../shared/PrivacyPolicy';


export const LoginNavigator = StackNavigator({
    Login: {
        screen: Login
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Rejestracja'
        }
    },
    Terms: {
        screen: TermsAndCondition
    },
    Policy: {
        screen: PrivacyPolicy
    }
}, {
    headerMode: 'none',
    cardStyle: {
        backgroundColor: colors.backgroundGreen
    },
    navigationOptions: {
        headerStyle: {
            backgroundColor: colors.backgroundDark,
            elevation: 0,
            borderBottomWidth: 0,
        }
    },
    transitionConfig: () => ({
        screenInterpolator: sceneProps => {
            return CardStackStyleInterpolator.forHorizontal(sceneProps);
        }
    })
});