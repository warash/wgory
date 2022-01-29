import 'rxjs';
import ImagePicker from 'react-native-image-picker';
import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { postsApi } from '../shared/api/posts.api';
import * as pa from './addPost.actions';
import * as ha from './home.actions';

const initialState = {
    addPhotoOpened: false,
    formattedAddress: '',
};

//
// import { PermissionsAndroid } from 'react-native';
//
// async function requestCameraPermission() {
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//             {
//                 'title': 'Cool Photo App Camera Permission',
//                 'message': 'Cool Photo App needs access to your camera ' +
//                 'so you can take awesome pictures.'
//             }
//         )
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log("You can use the camera")
//         } else {
//             console.log("Camera permission denied")
//         }
//     } catch (err) {
//         console.warn(err)
//     }
// }
//
// requestCameraPermission();

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case pa.OPEN_ADD_PHOTO_MODAL:
            return { ...state, addPhotoOpened: true };
        case pa.CLOSE_ADD_PHOTO_MODAL:
            return { ...state, addPhotoOpened: false };
        case pa.TOGGLE_EDIT_PHOTO_MODAL:
            return { ...state, editPhotoOpened: action.open };
        case pa.PHOTO_SELECTED:
            return { ...state, current: action.photo };
        case pa.SAVE_POST:
            return { ...state, saving: true };
        case pa.SAVE_POST_SUCCESS:
            return { ...state, saving: false,  current: {} };
        case pa.SAVE_POST_ERROR:
            return { ...state, saving: false,  current: {} };
        default:
            return state;
    }
}

//epics
const options = {
    title: 'WYBIERZ ZDJĘCIE',
    // storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    // },
    noData: true
};

const openCameraEpic = (action$) => {
    return action$
        .ofType(pa.OPEN_CAMERA).switchMap(() => {
            return Observable.create(observer => {
                ImagePicker.launchCamera(options, (response) => {
                    if (!response.didCancel) {
                        observer.next(pa.photoSelected(response));
                    }
                    observer.complete();
                });
            });
        });
};

const openGalleryEpic = (action$) => {
    return action$
        .ofType(pa.OPEN_GALLERY).switchMap(() => {
            return Observable.create(observer => {
                ImagePicker.launchImageLibrary(options, (response) => {
                    if (!response.didCancel) {
                        observer.next(pa.photoSelected(response));
                    }
                    observer.complete();
                });
            });
        });
};
const openPhotoEditEpic = (action$) => {
    return action$
        .ofType(pa.PHOTO_SELECTED).mapTo(pa.toggleEditPhotoModal(true))
};


const savePhotoEpic = (action$) => {
    return action$
        .ofType(pa.SAVE_POST).switchMap(({ post }) => {
            const { photo, latitude, longitude, description, mountain, mountainRange, timestamp, authorSignature, postType } = post;
            return postsApi.create(photo, latitude, longitude, mountain, mountainRange, description, timestamp, authorSignature, postType)
                .mergeMap((res) => {

                    if (!!res.message) {
                        return Observable.from([pa.savePostError(res.message), pa.toggleEditPhotoModal()])
                    }

                    return Observable.from([pa.savePostSuccess(), pa.toggleEditPhotoModal(), ha.tryRefreshPosts()])
                })
                .catch((e) => {
                    return Observable.from([pa.savePostError(), pa.toggleEditPhotoModal()])
                });
        })
};


export const photoEpics = combineEpics(
    openCameraEpic,
    openGalleryEpic,
    openPhotoEditEpic,
    savePhotoEpic
);
