// export const LOAD_POSTS = 'home/LOAD_POSTS';
// export const LOAD_MORE_POSTS = 'home/LOAD_MORE_POSTS';
// export const REFRESH_POSTS = 'home/REFRESH_POSTS';

export const GET_POSTS = 'home/GET_POSTS';
export const GET_POSTS_ERROR = 'home/GET_POSTS_ERROR';
export const GET_POSTS_SUCCESS = 'home/GET_POSTS_SUCCESS';
export const GET_POSTS_CANCELED = 'home/GET_POSTS_CANCELED';


export const TRY_REFRESH_POSTS = 'home/TRY_REFRESH_POSTS';
export const REFRESH_POSTS = 'home/REFRESH_POSTS';
export const REFRESH_POSTS_ERROR = 'home/REFRESH_POSTS_ERROR';
export const REFRESH_POSTS_SUCCESS = 'home/REFRESH_POSTS_SUCCESS';

export const tryRefreshPosts = () => ({ type: TRY_REFRESH_POSTS });
export const refreshPosts = () => ({ type: REFRESH_POSTS });
export const refreshPostsSuccess = (posts) => ({ type: REFRESH_POSTS_SUCCESS, posts });
export const refreshPostsError = (err) => ({ type: REFRESH_POSTS_ERROR, err });


export const REGION_CHANGED = 'home/REGION_CHANGED';

export const regionChanged = (region) => ({ type: REGION_CHANGED, region });
export const getPosts = (mode = 'load') => ({ type: GET_POSTS, mode });
export const getPostsSuccess = (payload) => ({ type: GET_POSTS_SUCCESS, payload });
export const getPostsCanceled = () => ({ type: GET_POSTS_CANCELED });
export const getPostsError = (error) => ({
    type: GET_POSTS_ERROR, error,

    message: { value: 'Problem podczas pobierania zdjęć, spróbuj później', type: 'error' }
});

