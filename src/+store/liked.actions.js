export const GET_LIKED_POSTS = 'liked/GET_POSTS';
export const GET_LIKED_POSTS_ERROR = 'liked/GET_POSTS_ERROR';
export const GET_LIKED_POSTS_SUCCESS = 'liked/GET_POSTS_SUCCESS';
export const GET_LIKED_POSTS_CANCELED = 'liked/GET_POSTS_CANCELED';

export const getLikedPosts = (mode = 'load') => ({ type: GET_LIKED_POSTS, mode });
export const getLikedPostsSuccess = (payload) => ({ type: GET_LIKED_POSTS_SUCCESS, payload });
export const getLikedPostsError = (error) => ({ type: GET_LIKED_POSTS_ERROR, error });
export const getLikedPostsCanceled = () => ({ type: GET_LIKED_POSTS_CANCELED });

