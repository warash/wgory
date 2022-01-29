export const OPEN_ADD_PHOTO_MODAL = 'add post/OPEN_ADD_PHOTO_MODAL';
export const CLOSE_ADD_PHOTO_MODAL = 'add post/CLOSE_ADD_PHOTO_MODAL';
export const TOGGLE_EDIT_PHOTO_MODAL = 'add post/TOGGLE_EDIT_PHOTO_MODAL';

export const OPEN_CAMERA = 'add post/OPEN_CAMERA';
export const OPEN_GALLERY = 'add post/OPEN_GALLERY';
export const PHOTO_SELECTED = 'add post/PHOTO_SELECTED';


export const SAVE_POST = 'add post/SAVE_POST';
export const SAVE_POST_SUCCESS = 'add post/SAVE_POST_SUCCESS';
export const SAVE_POST_ERROR = 'add post/SAVE_POST_ERROR';


export const savePost = (post) => ({ type: SAVE_POST, post });
export const savePostSuccess = () => ({
    type: SAVE_POST_SUCCESS,
    message: { value: 'Zdjęcie zostało wysłane', type: 'info' }
});
export const savePostError = (message) => ({
    type: SAVE_POST_ERROR,
    message: { value: message || 'Błąd podczas wysyłania zdjęcia, spróbuje później', type: 'info' }
});


export const openAddPhotoModal = () => ({ type: OPEN_ADD_PHOTO_MODAL });
export const closeAddPhotoModal = () => ({ type: CLOSE_ADD_PHOTO_MODAL });
export const toggleEditPhotoModal = (open) => ({ type: TOGGLE_EDIT_PHOTO_MODAL, open });

export const openCamera = () => ({ type: OPEN_CAMERA });
export const openGallery = () => ({ type: OPEN_GALLERY });
export const photoSelected = (photo) => ({ type: PHOTO_SELECTED, photo });