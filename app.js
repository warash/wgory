import React, { Component } from 'react';
import { MainNavigator } from './src/main-navigator';
import { connect } from 'react-redux';
import { AppState, Modal, Platform, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from './src/shared/style-variables';
import { LoginNavigator } from './src/user/LoginNavigator';
// import Modal from 'react-native-modal';
import { bindActionCreators } from 'redux';
import { closeAddPhotoModal, toggleEditPhotoModal } from './src/+store/addPost.actions';
import { toggleLoginModal } from './src/+store/user.actions';
import { AddNewPostModalContainer } from './src/post/SelectPostType';
import ModalBox from 'react-native-modalbox';
import NavigatorService from './src/shared/services/navigator';
import { EditPostNavigator } from './src/post/EditPostNavigator';
import { tryRefreshPosts } from './src/+store/home.actions'
import SplashScreen from 'react-native-splash-screen'
import 'rxjs';
import MessageBox from './src/shared/MessageBox';
import LoginModal from './src/shared/LoginModal';

class App extends Component {
    state = {
        appState: AppState.currentState
    };

    closeAddPhotoModal = () => {
        const { closeAddPhotoModal } = this.props.actions;
        closeAddPhotoModal();
    };

    closeEditPhotoModal = () => {
        const { toggleEditPhotoModal } = this.props.actions;
        toggleEditPhotoModal(false);
    };

    closeLoginModal = () => {
        const { toggleLoginModal } = this.props.actions;
        toggleLoginModal(false);
    };


    componentDidMount() {
        SplashScreen.hide();
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            const { tryRefreshPosts } = this.props.actions;
            tryRefreshPosts();
        }
        this.setState({ appState: nextAppState });
    };


    render() {
        const { loggedIn, addPhotoOpened, editPhotoOpened, loginModalOpened } = this.props;


        return (

            <View style={styles.container}>

                <View style={styles.content}>

                    <MessageBox/>

                    {loggedIn
                        ? <MainNavigator
                            ref={navigatorRef => {
                                NavigatorService.setContainer(navigatorRef);
                            }}/>
                        : <LoginNavigator/>}
                </View>


                <ModalBox onClosed={this.closeAddPhotoModal} style={styles.smallModal}
                          isOpen={addPhotoOpened}
                          backdrop={true}
                          backButtonClose={true}
                          position={'center'}>
                    <AddNewPostModalContainer/>
                </ModalBox>

                <ModalBox onClosed={this.closeLoginModal} style={styles.smallModal}
                          isOpen={loginModalOpened}
                          backdrop={true}
                          backButtonClose={true}
                          position={'center'}>
                    <LoginModal/>
                </ModalBox>

                <Modal animationType="none"

                       transparent={false}
                       visible={!!editPhotoOpened}
                       onRequestClose={this.closeEditPhotoModal}>

                    <EditPostNavigator/>
                </Modal>
            </View>)
    }
}

const styles = StyleSheet.create({
    messageBox: {
        bottom: 50,
        position: 'absolute',
        zIndex: 999
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
        position: 'relative'
    },
    content: {
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
    },

    smallModal: {
        width: null,
        height: null,
        backgroundColor: 'transparent'
    },
});
const mapDispatch = (dispatch) => {
    return {
        actions: bindActionCreators({
            closeAddPhotoModal,
            toggleEditPhotoModal,
            tryRefreshPosts,
            toggleLoginModal
        }, dispatch)
    }
};
const mapState = (state) => {
    const { user: { loggedIn, loginModalOpened }, photo: { addPhotoOpened, editPhotoOpened } } = state;
    return { loggedIn, addPhotoOpened, editPhotoOpened, loginModalOpened };
};

export default connect(mapState, mapDispatch)(App);
