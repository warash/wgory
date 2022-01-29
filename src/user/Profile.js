import React, { Component } from 'react';
import { Image, Linking, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { bindActionCreators } from 'redux';
import * as userActions from '../+store/user.actions'
import { connect } from 'react-redux';
import Button from '../shared/components/Button';
import MyStatusBar from '../shared/components/MyStatusBar';
import images from '../../assets/images';
import { Span } from '../shared/components/text-components';
import { List, ListItem } from 'react-native-elements'
import Rate, { AndroidMarket } from 'react-native-rate'
import { colors } from '../shared/style-variables';
import Icon from 'react-native-vector-icons/FontAwesome';

class Profile extends Component {

    rate = () => {
        let options = {
            GooglePackageName: 'com.wgory',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: false,
        };
        Rate.rate(options, (success)=>{

        })
    };

    sendFeedback = () => {
        Linking.openURL('mailto:mobile@aktualnewarunki.pl?subject=ulepszenie')
    };


    openTerms = () => {
        const { navigation } = this.props;
        navigation.navigate('Terms')
    };

    openPolicy = () => {
        const { navigation } = this.props;
        navigation.navigate('Policy')
    };


    openInfo = () => {
        const { navigation } = this.props;
        navigation.navigate('Info')
    };

    render() {
        const { actions, profile = {}, incognito } = this.props;
        return (
            <View style={styles.host}>
                <MyStatusBar/>
                <View style={styles.container} source={images.primaryBackground}>
                    <Span style={styles.userName}>{profile.firstName} {profile.lastName}</Span>
                    {!incognito && profile.imageUrl &&
                    <Image style={styles.avatar} source={{ uri: profile.imageUrl }}/>}

                    {incognito &&
                    <Icon style={styles.icon} name="user-secret" size={40} color={colors.textLightest}/>}

                    <List containerStyle={{ width: '100%', marginBottom: 20, backgroundColor: 'transparent' }}>

                        <ListItem
                            titleStyle={{ color: colors.textLight }}
                            containerStyle={styles.listItem}
                            underlayColor={colors.backgroundLight}
                            onPress={this.rate}
                            title={'Oceń aplikację'}
                            leftIcon={{ name: 'star' }}
                        />
                        <ListItem
                            titleStyle={{ color: colors.textLight }}
                            underlayColor={colors.backgroundLight}
                            onPress={this.sendFeedback}
                            title={'Zaproponuj usprawnienie'}
                            leftIcon={{ name: 'contact-mail' }}
                        />
                        <ListItem
                            titleStyle={{ color: colors.textLight }}
                            underlayColor={colors.backgroundLight}
                            onPress={this.openInfo}
                            title={'O Autorze'}
                            leftIcon={{ name: 'info' }}
                        />
                        <ListItem
                            titleStyle={{ color: colors.textLight }}
                            underlayColor={colors.backgroundLight}
                            onPress={this.openTerms}
                            title={'Regulamin'}
                            leftIcon={{ name: 'book', type: 'font-awesome' }}
                        />
                        <ListItem
                            titleStyle={{ color: colors.textLight }}
                            underlayColor={colors.backgroundLight}
                            onPress={this.openPolicy}
                            title={'Polityka Prywatności'}
                            leftIcon={{ name: 'book', type: 'font-awesome' }}
                        />
                    </List>

                    {!incognito && <Button style={styles.button} onPress={actions.logout} title="WYLOGUJ"/>}
                    {incognito && <Button style={styles.button} onPress={actions.logout} title="ZALOGUJ SIĘ"/>}
                </View>
            </View>

        );
    }
}

const mapDispatch = (dispatch) => {
    return { actions: bindActionCreators(userActions, dispatch) }
};

const mapProps = (state) => ({ profile: state.user.profile, incognito: state.user.incognito });
export default connect(mapProps, mapDispatch)(Profile)

const styles = StyleSheet.create({
    userName: {
        color: colors.textLight
    },
    listItem: {
        backgroundColor: 'transparent'
    },
    container: {
        padding: 50,
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    host: {
        flex: 1,
        width: '100%'
    },
    avatar: {
        margin: 20,
        width: 80,
        height: 80,
        borderRadius: 40
    }
});