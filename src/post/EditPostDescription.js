import React from 'react';
import ReactNative, {
    ActivityIndicator,
    Dimensions,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from '../shared/components/Button'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as photoActions from '../+store/addPost.actions';
import { CircleCloseButton } from '../shared/components/CircleCloseButton';
import { STATUS_BAR_HEIGHT } from '../shared/components/MyStatusBar';
import { colors } from '../shared/style-variables';
import Color from 'color';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import images from '../../assets/images';
import Background from '../shared/components/Background';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';

type Props = {};

export class EditNewPost extends React.Component<Props> {

    constructor(props) {
        super(props);

        const { photo = {} } = this.props;
        const timestamp = moment(photo.timestamp).isValid() && moment(photo.timestamp).toDate();

        this.state = {
            description: '',
            mountain: '',
            mountainRange: '',
            saving: false,
            timestamp,
            trail: '',
            postType: 'conditions',
            isDateTimePickerVisible: false,
        };
    }


    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (timestamp) => {
        this.setState({ timestamp });
        this._hideDateTimePicker();
    };

    onClose = () => {
        const { actions } = this.props;
        actions.toggleEditPhotoModal(false);
    };

    onNext = () => {
        if (!this.isValid()) return;
        Keyboard.dismiss();
        const { navigation, photo } = this.props;
        const { description, mountain, mountainRange, timestamp, authorSignature, postType } = this.state;

        if (postType !== 'conditions') {
            this.saveImage();
            return;
        }

        if (!!photo.longitude && !!photo.latitude) {
            this.saveImage();
            return;
        }

        navigation.navigate('editLocation', { description, mountain, mountainRange, timestamp, authorSignature, postType });
    };

    isValid = () => {
        const { mountain, mountainRange, timestamp, postType } = this.state;
        return (!!mountain && mountain.length && !!mountainRange && mountainRange.length && timestamp) || postType !== 'conditions';
    };

    saveImage = () => {

        let { description, mountain, mountainRange, timestamp, authorSignature, postType } = this.state;


        const { photo, actions } = this.props;

        let longitude;
        let latitude;
        if (postType === 'conditions') {
            longitude = photo.longitude;
            latitude = photo.latitude;
        } else {
            longitude = 0;
            latitude = 0;
            mountain = '';
            mountainRange = '';
            timestamp = undefined;
            authorSignature = undefined;
        }

        actions.savePost({
            photo,
            longitude,
            latitude,
            mountain,
            mountainRange,
            description,
            timestamp,
            postType,
            authorSignature
        });
    };


    renderLocationInputs() {
        const mountainRangePlaceholder = 'Pasmo górskie';
        const mountainPlaceholder = 'Szczyt';
        const { profile: { role } } = this.props;
        const { mountain, mountainRange, timestamp, authorSignature } = this.state;

        return (
            <View>
                <DateTimePicker
                    // mode={'datetime'}
                    maximumDate={new Date()}
                    date={timestamp}
                    confirmTextIOS={'OK'}
                    cancelTextIOS={'Anuluj'}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                />
                {role === 'admin' && <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={'Podpis autora'}
                    style={[styles.input]}
                    onChangeText={(authorSignature) => this.setState({ authorSignature })}
                    value={authorSignature}
                />}
                <TextInput
                    underlineColorAndroid="transparent"
                    onFocus={(event) => {
                        let node = ReactNative.findNodeHandle(event.target);
                        this.scroll.scrollToFocusedInput(node, 190)
                    }}
                    placeholder={mountainRangePlaceholder}
                    style={[styles.input]}
                    onChangeText={(mountainRange) => this.setState({ mountainRange })}
                    value={mountainRange}
                />
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={mountainPlaceholder}
                    onFocus={(event) => {
                        let node = ReactNative.findNodeHandle(event.target);
                        this.scroll.scrollToFocusedInput(node, 130)
                    }}
                    style={[styles.input]}
                    onChangeText={(mountain) => this.setState({ mountain })}
                    value={mountain}
                />
            </View>
        )
    }


    render() {


        const { photo, saving, profile: { role } } = this.props;

        const { description, timestamp, postType } = this.state;
        const formattedTimestamp = !!timestamp ? moment(timestamp).format('LL') : 'Data wykonania zdjęcia';

        const buttonStyle = !this.isValid() ? { backgroundColor: colors.textLight } : {};
        const buttonColor = !this.isValid() ? { color: colors.textLightest } : {};


        const descriptionPlaceholder = 'Napisz kilka zdań o tym co przedstawia zdjęcie...';
        return <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <CircleCloseButton style={styles.closeButton} onPress={this.onClose}/>
                <KeyboardAwareScrollView ref={(ref) => this.scroll = ref} style={styles.scrollContent}
                                         keyboardShouldPersistTaps={'always'}>


                    <Image source={{ uri: photo.uri }} style={styles.image}/>

                    {role === 'admin' && <CheckBox
                        containerStyle={{
                            backgroundColor: 'transparent',
                            borderWidth: 0,
                            padding: 10
                        }}
                        iconType='font-awesome'
                        uncheckedIcon='square-o'
                        checkedIcon='check-square'
                        size={22}
                        onPress={() => this.setState(s => {
                            if (s.postType === 'conditions')
                                return { postType: 'other' };
                            else {
                                return { postType: 'conditions' };
                            }
                        })}
                        checkedColor={colors.backgroundDark}
                        title='Post z lokalizacją'
                        checked={postType === 'conditions'}
                    />}


                    {postType === 'conditions' && this.renderLocationInputs()}

                    <TextInput
                        ref='description'
                        multiline={true}
                        onFocus={(event) => {
                            let node = ReactNative.findNodeHandle(event.target);
                            this.scroll.scrollToFocusedInput(node, 200)
                        }}
                        underlineColorAndroid="transparent"
                        placeholder={descriptionPlaceholder}
                        style={[styles.description, styles.input]}
                        onChangeText={(description) => this.setState({ description })}
                        value={description}
                    />

                    {postType === 'conditions' &&
                    <TouchableOpacity style={{ alignSelf: 'stretch', borderRadius: 5, marginBottom: 20 }}
                                      onPress={this._showDateTimePicker}>
                        <Text style={[styles.dateInput, styles.input]}>{formattedTimestamp}</Text>
                    </TouchableOpacity>}

                </KeyboardAwareScrollView>

            </View>
            <Button {...buttonColor}
                    buttonStyle={{ borderRadius: 0, ...buttonStyle }} style={[styles.button]}
                    title={'DALEJ'}
                    onPress={this.onNext}>
            </Button>

            {saving &&
            <Background style={styles.progressContainer} source={images.primaryBackground}>
                <ActivityIndicator color={'white'}/>
            </Background>}
        </View>
    }
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        right: 10,
        top: STATUS_BAR_HEIGHT + 5,
        zIndex: 1
    },


    dateInput: {},

    progressContainer: {

        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'


    },
    input: {
        padding: 8,
        borderRadius: 5,
        alignSelf: 'stretch',
        color: colors.textRegular,
        fontSize: 13,
        marginTop: 10,
        marginHorizontal: 20,
        // backgroundColor: Color(colors.backgroundLight).alpha(0.5),
        borderWidth: 1,
        borderColor: colors.backgroundLight
    },

    description: {
        height: 100,
    },
    trail: {},

    image: {
        // flex: 1,
        height: 200,
        alignSelf: 'stretch'
    },
    button: {
        marginHorizontal: 0,
        marginTop: 10,
        borderRadius: 0,

    },
    container: {
        alignItems: 'center',
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: Color(colors.textLightest).lighten(0.8)
    },
    scrollContent: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%'
    }
});


const mapDispatch = (dispatch) => {
    return { actions: bindActionCreators(photoActions, dispatch) }
};

const mapProps = ({ photo: { current = {}, saving }, user: { profile } }) => {

    return {
        photo: current,
        saving,
        profile,
        location: current
    }
};

export const EditNewPostDescriptionContainer = connect(mapProps, mapDispatch)(EditNewPost);