import React, { Component } from 'react';
import { ActivityIndicator, Image, ImageBackground, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { bindActionCreators } from 'redux';
import * as userActions from '../+store/user.actions'
import { connect } from 'react-redux';
import images from '../../assets/images';
import { colors } from '../shared/style-variables';
import Button from '../shared/components/Button'
import { Span } from '../shared/components/text-components';
import { CheckBox } from 'react-native-elements';

class Login extends Component {
    constructor(props) {
        super(props);
        const { navigation = { state: {} } } = props;
        const { params: { readAndAcceptedTerms, readAndAcceptedPolicy } = {} } = navigation.state;

        this.state = {
            acceptedTerms: readAndAcceptedTerms,
            acceptedPolicy: readAndAcceptedPolicy
        }
    }


    login = () => {
        const { email, password } = this.state;
        const { actions } = this.props;
        if (email.length && password.length) {
            actions.login({ email, password })
        }
    };


    facebookLogin = () => {
        const { acceptedTerms } = this.state;
        if (!acceptedTerms) return;

        const { actions } = this.props;
        actions.loginWithFacebook();
    };

    icongnitoLogin = () => {
        const { actions } = this.props;
        actions.loginIncognito();
    };


    toggleTermsAndConditions = () => {
        this.setState(s => ({ acceptedTerms: !s.acceptedTerms }));
    };

    togglePrivacyPolicy = () => {
        this.setState(s => ({ acceptedPolicy: !s.acceptedPolicy }));
    };

    acceptPrivacy = () => {
        this.setState({ acceptedPolicy: true });
    };

    acceptConditions = () => {
        this.setState({ acceptedTerms: true });
    };
    showPrivacyPolicy = () => {
        const { navigation } = this.props;
        navigation.navigate('Policy', { onAccept: this.acceptPrivacy })
    };

    showTermsAndConditions = () => {
        const { navigation } = this.props;
        navigation.navigate('Terms', { onAccept: this.acceptConditions })
    };

    render() {
        const { userLoading, navigation } = this.props;
        const { acceptedTerms, acceptedPolicy } = this.state;
        // const { readAndAcceptedTerms } = navigation.state.params;
        // const accepted = readAndAcceptedTerms ||

        // const activeStyle = acceptedTerms && acceptedPolicy ? {} : { opacity: 0.5 };
        const allAccepted = acceptedPolicy && acceptedTerms;
        return (
            <ImageBackground style={styles.background} source={images.primaryBackground}>
                <View style={styles.loginContainer}>
                    {userLoading
                        ? <ActivityIndicator style={styles.spinner} color={'white'}/>
                        : <View style={styles.container}>
                            <Image style={styles.logo} source={images.logo}/>
                            <Button
                                icon={{ name: 'user-secret', type: 'font-awesome' }}
                                backgroundColor={'transparent'}
                                buttonStyle={[styles.buttonStyle, styles.incognitoButton]}
                                title="KONTYNUUJ BEZ LOGOWANIA"
                                onPress={this.icongnitoLogin}
                            />


                            <View style={styles.loginContainer}>

                                <View>

                                    <Button
                                        disabled={!allAccepted}
                                        disabledStyle={{ opacity: 0.5, backgroundColor: colors.buttonDark }}
                                        icon={{ name: 'facebook', type: 'font-awesome' }}
                                        backgroundColor={colors.buttonDark}
                                        buttonStyle={[styles.buttonStyle]}
                                        title="KONTYNUUJ Z FACEBOOK"
                                        onPress={this.facebookLogin}
                                    />

                                    <View style={styles.termsContainer}>

                                        <View style={styles.checkboxSection}>
                                            <CheckBox
                                                containerStyle={{
                                                    backgroundColor: 'transparent',
                                                    borderWidth: 0,
                                                    padding: 0
                                                }}
                                                size={22}
                                                iconType='font-awesome'
                                                uncheckedIcon='square-o'
                                                checkedIcon='check-square'
                                                textStyle={styles.checkboxTextStyle}
                                                onPress={this.toggleTermsAndConditions.bind(this)}
                                                checkedColor={colors.backgroundDark}
                                                title='Akceptuję'
                                                checked={acceptedTerms}
                                            />
                                            <TouchableWithoutFeedback onPress={this.showTermsAndConditions}>
                                            <Span
                                                style={styles.termsText}>nasz regulamin</Span>
                                            </TouchableWithoutFeedback>
                                        </View>


                                        <View style={styles.checkboxSection} k>
                                            <CheckBox
                                                containerStyle={{
                                                    backgroundColor: 'transparent',
                                                    borderWidth: 0,
                                                    padding: 0
                                                }}
                                                iconType='font-awesome'
                                                uncheckedIcon='square-o'
                                                checkedIcon='check-square'
                                                size={22}
                                                textStyle={styles.checkboxTextStyle}
                                                onPress={this.togglePrivacyPolicy}
                                                checkedColor={colors.backgroundDark}
                                                title='Akceptuję'
                                                checked={acceptedPolicy}
                                            />
                                            <TouchableWithoutFeedback onPress={this.showPrivacyPolicy}>
                                            <Span
                                                style={styles.termsText}>politykę prywatności</Span>
                                            </TouchableWithoutFeedback>
                                        </View>


                                    </View>
                                </View>


                            </View>


                        </View>}
                </View>
            </ImageBackground>

        );
    }
}


const styles = StyleSheet.create({

    checkboxSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    checkboxTextStyle: {
        color: colors.textDarkest,
        fontSize: 13,
    },
    termsText: {
        color: colors.textDarkest,
        textDecorationLine: 'underline',
        fontSize: 13,
        paddingVertical: 4,
        fontWeight: '500'
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    incognitoButton: {
        borderWidth: 1,
        borderColor: colors.textLightest,
        marginBottom: 30
    },
    spinner: {
        marginTop: 20,
    },

    logo: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },

    termsContainer: {
        paddingTop: 20,
    },

    background: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 100
    },

    buttonStyle: {
        marginTop: 15,
    },

    inputContainer: {
        borderBottomWidth: 2,
        borderColor: colors.borderPrimary
    }
});

const mapDispatch = (dispatch) => {
    return { actions: bindActionCreators(userActions, dispatch) }
};


const mapProps = (state) => ({ userLoading: state.user.loading });
export default connect(mapProps, mapDispatch)(Login)

