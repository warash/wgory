// Actions
import * as fromFacebook from '../shared/services/facebookService';
import userApi from '../shared/api/user.api';
import * as la from './user.actions';
import { Observable } from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';

const initialState =
    {
        profile: {},
        loggedIn: false,
        incognito: false,
        loading: false,
        loginModalOpened: false
    };

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case la.LOGIN_WITH_FACEBOOK:
            return { ...state, loading: true };
        case la.LOGIN_FAILED:
            return { ...state, loading: false };
        case la.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.profile,
                token: action.token,
                loggedIn: true,
                incognito: false
            };
        case la.LOGIN_INCOGNITO:
            return { ...state, profile: {}, token: '', loggedIn: true, incognito: true };
        case la.LOGOUT:
            return { ...state, loggedIn: false, profile: {} };
        case la.TOGGLE_LOGIN_MODAL:
            return { ...state, loginModalOpened: action.opened };
        default:
            return state;
    }
}

const loginWithFacebookEpic = (action$, { getState }) => {
    return action$
        .ofType(la.LOGIN_WITH_FACEBOOK).switchMap(() => {
            return Observable.create(observer => {
                fromFacebook.loginWithFacebook().then(({ token }) => {
                    const { accessToken } = token;
                    userApi.facebookLogin(accessToken).then(({ user, token }) => {
                        observer.next({ user, token });
                        observer.complete();
                    }, err => observer.error(err))
                }, err => observer.error(err));
            }).map(({ user, token }) => la.loginSuccess(user, token))
                .catch(error => Observable.of(la.loginFailed(error)))
        });
};

export const userEpic = combineEpics(
    loginWithFacebookEpic,
);


