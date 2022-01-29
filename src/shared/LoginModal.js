import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import React from 'react';
import { compact } from 'lodash';
import { bindActionCreators } from 'redux';
import * as userActions from '../+store/user.actions';
import { connect } from 'react-redux';
import { Span } from './components/text-components';
import { colors } from './style-variables';
import Button from './components/Button';


class LoginModal extends React.PureComponent {

    logout = () => {
        const { actions } = this.props;
        actions.toggleLoginModal(false);
        actions.logout();
    };
    cancel = () => {
        const { actions } = this.props;
        actions.toggleLoginModal(false);
    };

    render() {
        return (
            <View style={styles.container}>
                <Span style={styles.message}>
                    Dodawania nowych zdjęć oraz dodawanie zdjęć do ulubionych jest funkcją dostępną tylko dla zalogowanych użytkownikow.
                </Span>

                <View style={styles.actions}>
                    <Button
                        icon={{ name: 'times', type: 'font-awesome' }}
                        containerViewStyle={{ width: 'auto', flex: 1 }}
                        backgroundColor={colors.backgroundDark}
                        buttonStyle={[styles.buttonStyle]}
                        title="Anuluj"
                        onPress={this.cancel}
                    />
                    <Button
                        icon={{ name: 'sign-in', type: 'font-awesome' }}
                        containerViewStyle={{ width: 'auto', flex: 1 }}
                        backgroundColor={colors.buttonDark}
                        buttonStyle={[styles.buttonStyle]}
                        title="Zaloguj sie"
                        onPress={this.logout}
                    />
                </View>

            </View>
        )

    }
}

const mapDispatch = (dispatch) => {
    return { actions: bindActionCreators(userActions, dispatch) }
};

export default connect(null, mapDispatch)(LoginModal);


const styles = StyleSheet.create({
    message: {
        fontSize: 13,
        color: 'white'
    },
    container: {
        backgroundColor: colors.backgroundLight,
        padding: 20,
        borderRadius: 10,
    },
    actions: {
        flexDirection: 'row',
        marginTop: 20,
    }
});