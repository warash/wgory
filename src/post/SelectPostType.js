import React, { Component } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as photoActions from '../+store/addPost.actions'
import Button from '../shared/components/Button';
import { colors } from '../shared/style-variables';

type Props = {};

export class SelectPostType extends Component<Props> {
    openCamera = () => {
        const { actions } = this.props;
        actions.closeAddPhotoModal();
        actions.openCamera();
    };


    cancel = () => {
        const { actions } = this.props;
        actions.closeAddPhotoModal();
    };

    openGallery = () => {
        const { actions } = this.props;
        actions.closeAddPhotoModal();
        actions.openGallery();
    };

    render() {
        const buttonStyle = {
            margin: 10,
        };
        return (
            <View style={styles.container}>
                <Button

                    buttonStyle={buttonStyle}
                    backgroundColor={colors.backgroundLight}
                    onPress={this.openCamera}
                    icon={{ name: 'camera', type: 'font-awesome' }}
                    title='ZRÓB ZDJĘCIE'/>
                <Button

                    buttonStyle={buttonStyle}
                    onPress={this.openGallery}
                    backgroundColor={colors.backgroundLight}
                    icon={{ name: 'image', type: 'font-awesome' }}
                    title='WYBIERZ Z GALERII'/>
                <Button

                    onPress={this.cancel}
                    buttonStyle={buttonStyle}
                    backgroundColor={colors.backgroundLight}
                    icon={{ name: 'window-close', type: 'font-awesome' }}
                    title='ANULUJ'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: colors.backgroundDark
    },

});


const mapDispatch = (dispatch) => {
    return { actions: bindActionCreators(photoActions, dispatch) }
};
export const AddNewPostModalContainer = connect(null, mapDispatch)(SelectPostType);
