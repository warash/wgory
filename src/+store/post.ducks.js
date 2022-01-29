import 'rxjs';
import { postsApi } from '../shared/api/posts.api';
import { Observable } from 'rxjs';
import * as pa from './post.actions';
import { combineEpics } from 'redux-observable';

const initialState = {};


// Reducer

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case pa.TOGGLE_LIKE:
            return { ...state, liked: !state.liked };
        case pa.TOGGLE_LIKE_ERROR:
            return { ...state, liked: action.beforeLiked };
        case  pa.TOGGLE_LIKE_SUCCESS:
            return { ...state, ...action.post };
        case  pa.DELETE:
            return { ...state, loading: true };
        case  pa.DELETE_SUCCESS:
            return { ...state, loading: false };
        case  pa.DELETE_ERROR:
            return { ...state, loading: false };
        default:
            return state;
    }
}


const likePostEpic = (action$, { getState }) => {
    return action$
        .ofType(pa.TOGGLE_LIKE).switchMap(({ postId, liked }) => {
            return Observable.fromPromise(postsApi.like(postId))
                .map(post => pa.toggleLikeSuccess(post))
                .catch(error => Observable.of(pa.toggleLikeError(error, postId, liked)))
        });
};


const deletePostEpic = (action$, { getState }) => {
    return action$
        .ofType(pa.DELETE).switchMap(({ postId }) => {

            return Observable.fromPromise(postsApi.deletePost(postId))
                .map(() => pa.deletePostSuccess(postId))
                .catch(error => Observable.of(pa.deletePostError(postId)))
        });
};


export const postEpic = combineEpics(
    likePostEpic,
    deletePostEpic
);
