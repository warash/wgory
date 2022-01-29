import 'rxjs';
import { postsApi } from '../shared/api/posts.api';
import { Observable } from 'rxjs';
import * as la from './liked.actions';
import postReducer from './post.ducks';
import { combineEpics } from 'redux-observable';
import * as pa from './post.actions';
import { uniqBy } from 'lodash';

const PAGE_SIZE = 20;

const initialState = {
    loading: false,
    refreshing: false,
    posts: []
};
const getPosts = (state, action) => {
    const { mode } = action;
    switch (mode) {
        case 'refresh':
            return { ...state, refreshing: true };
        case 'loadMore':
            return { ...state };
        default:
            return { ...state, loading: true };
    }
};

const getPostsSuccess = (state, action) => {
    const { mode, posts, endReached } = action.payload;
    switch (mode) {
        case 'loadMore':
            return { ...state, loading: false, posts: uniqBy([...state.posts, ...posts], p => p.id), endReached };
        default:
            return { ...state, refreshing: false, loading: false, posts, endReached };
    }
};


function singlePostAction(state, action) {
    const { postId } = action;
    const posts = state.posts.map(post => {
        if (post.id !== postId) return post;
        return postReducer(post, action);
    });
    return { ...state, posts };
}

// Reducer
export default (state = initialState, action = {}) => {

    if (!!action.postId) {
        state = singlePostAction(state, action);
    }

    switch (action.type) {
        case la.GET_LIKED_POSTS:
            return getPosts(state, action);
        case  la.GET_LIKED_POSTS_SUCCESS:
            return getPostsSuccess(state, action);
        case la.GET_LIKED_POSTS_CANCELED:
        case la.GET_LIKED_POSTS_ERROR:
            return { ...state, loading: false, refreshing: false };
        case pa.TOGGLE_LIKE_SUCCESS:
            if (action.post.liked) {
                return { ...state, posts: uniqBy([action.post, ...state.posts], p => p.id) }
            } else {
                return { ...state, posts: state.posts.filter(p => p.id !== action.post.id) }
            }
        case pa.DELETE_SUCCESS:
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) };
        default:
            return state;
    }
}


const getPostEpic = (action$, { getState }) => {
    return action$
        .ofType(la.GET_LIKED_POSTS).mergeMap(({ mode }) => {
            const { liked: { posts, endReached } } = getState();
            if (endReached && mode === 'loadMore') return Observable.of(la.getLikedPostsCanceled());
            const offset = mode === 'loadMore' ? posts.length : 0;
            const query = { offset };
            return Observable.fromPromise(postsApi.fetchLikes(query))
                .map(posts => {
                    const endReached = posts.length < PAGE_SIZE;
                    return la.getLikedPostsSuccess({ posts, endReached, mode })
                })
                .catch(error => Observable.of(la.getLikedPostsError(error)))
        });

};

export const likedEpic = combineEpics(
    getPostEpic,
);
