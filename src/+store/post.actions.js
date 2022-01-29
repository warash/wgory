export const TOGGLE_LIKE = 'post/TOGGLE_LIKE';
export const TOGGLE_LIKE_ERROR = 'post/TOGGLE_LIKE_ERROR';
export const TOGGLE_LIKE_SUCCESS = 'post/TOGGLE_LIKE_SUCCESS';


export const DELETE = 'post/DELETE';
export const DELETE_SUCCESS = 'post/DELETE_SUCCESS';
export const DELETE_ERROR = 'post/DELETE_ERROR';

export const deletePost = ({ id }) => ({ type: DELETE, postId: id });
export const deletePostSuccess = (id) => ({ type: DELETE_SUCCESS, postId: id });
export const deletePostError = (id) => ({
    type: DELETE_ERROR, postId: id,
    message: { value: 'Problem podczas usuwania zdjęcia, spróbuj później', type: 'error' }
});


export const toggleLike = (post) => ({ type: TOGGLE_LIKE, postId: post.id, post });
export const toggleLikeSuccess = (post) => ({ type: TOGGLE_LIKE_SUCCESS, post, postId: post.id });
export const toggleLikeError = (error, postId, beforeLiked) => ({
    type: TOGGLE_LIKE_ERROR,
    error,
    postId,
    beforeLiked
});

