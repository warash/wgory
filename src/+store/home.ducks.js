import 'rxjs';
import { postsApi } from '../shared/api/posts.api';
import { Observable } from 'rxjs';
import * as ha from './home.actions';
import * as pa from './post.actions';
import postReducer from './post.ducks';
import { combineEpics } from 'redux-observable';
import { unionBy, uniqBy } from 'lodash';

const PAGE_SIZE = 20;

const initialState = {
    region: {},
    loading: false,
    refreshing: false,
    posts: []
};
const getPosts = (state, action) => {
    const { mode } = action;
    switch (mode) {
        case 'load':
            return { ...state, posts: [], loading: true, refreshing: false };
        case 'refresh':
            return { ...state, refreshing: true, loading: false };
        case 'loadMore':
            return { ...state };
        case 'silentRefresh':
            return state;
        default:
            return { ...state, loading: true, refreshing: false };
    }
};

const getPostsSuccess = (state, action) => {
    const { mode, posts, endReached } = action.payload;
    switch (mode) {
        case 'silentRefresh':
            return silentRefreshSuccess(state, action);
        case 'loadMore':
            return { ...state, loading: false, posts: uniqBy([...state.posts, ...posts], p => p.id), endReached };
        default:
            return { ...state, refreshing: false, loading: false, posts, endReached };
    }
};


const silentRefreshSuccess = (state, action) => {
    const { posts } = action.payload;
    const currPosts = state.posts;
    return { ...state, posts: unionBy(posts, currPosts, 'id') };
};


export function singlePostAction(state, action) {
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
        case ha.REGION_CHANGED:
            return { ...state, region: action.region };
        case ha.GET_POSTS:
            return getPosts(state, action);
        case  ha.GET_POSTS_SUCCESS:
            return getPostsSuccess(state, action);
        case ha.GET_POSTS_ERROR:
        case ha.GET_POSTS_CANCELED:
            return { ...state, loading: false, refreshing: false };
        case pa.DELETE_SUCCESS:
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) };
        default:
            return state;
    }
}


const loadMoreEpic = (action$, { getState }) => {
    return action$
        .ofType(ha.GET_POSTS)
        .filter(({ mode }) => mode === 'loadMore')
        .filter(() => {
            const { home: { endReached } } = getState();
            return !endReached;
        })
        .switchMap(({ mode }) => {
            const { home: { posts, region } } = getState();
            const offset = posts.length;
            const query = { offset, nearBy: region };
            return Observable.fromPromise(postsApi.fetchList(query))
                .map(posts => {
                    const endReached = posts.length < PAGE_SIZE;
                    return ha.getPostsSuccess({ posts, endReached, mode })
                })
                .catch(error => Observable.of(ha.getPostsError(error)))
        });

};

const getPostEpic = (action$, { getState }) => {
    return action$
        .ofType(ha.GET_POSTS)
        .filter(({ mode }) => mode !== 'loadMore')
        .switchMap(({ mode }) => {
            const { home: { region } } = getState();
            const offset = 0;
            const query = { offset, nearBy: region };
            return Observable.fromPromise(postsApi.fetchList(query))
                .map(posts => {
                    const endReached = posts.length < PAGE_SIZE;
                    return ha.getPostsSuccess({ posts, endReached, mode })
                })
                .catch(error => Observable.of(ha.getPostsError(error)))
        });
};


const getPostsWhenRegionChangedEpic = (action$) => {
    return action$
        .ofType(ha.REGION_CHANGED).mapTo(ha.getPosts());
};


const refreshPostEpic = (action$, { getState }) => {
    return action$
        .ofType(ha.TRY_REFRESH_POSTS)
        .filter(() => {
            const { home, user } = getState();
            return user.loggedIn && !home.loading && !home.refreshing;
        })
        .map(() => ha.getPosts('silentRefresh'))
};

export const homeEpics = combineEpics(
    getPostEpic,
    loadMoreEpic,
    refreshPostEpic,
    getPostsWhenRegionChangedEpic
);
