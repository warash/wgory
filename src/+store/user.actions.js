export const LOGIN_WITH_FACEBOOK = 'user/LOGIN_WITH_FACEBOOK';
export const LOGIN_INCOGNITO = 'user/LOGIN_INCOGNITO';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'user/LOGIN_FAILED';
export const LOGOUT = 'user/LOGOUT';

export const TOGGLE_LOGIN_MODAL = 'user/TOGGLE_LOGIN_MODAL';




export const logout = () => ({ type: LOGOUT });
export const loginFailed = () => ({
    type: LOGIN_FAILED,
    message: { value: 'Logowanie nie powiodło się, spróbuj ponownie później', type: 'error' }});
export const loginSuccess = (profile, token) => ({ type: LOGIN_SUCCESS, profile, token });
export const loginWithFacebook = () => ({ type: LOGIN_WITH_FACEBOOK });
export const loginIncognito = () => ({ type: LOGIN_INCOGNITO });
export const toggleLoginModal = (opened) => ({ type: TOGGLE_LOGIN_MODAL, opened });


