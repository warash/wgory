export const REGION_CHANGED = 'map/REGION_CHANGED';
export const MAP_LOAD_POSTS = 'map/MAP_POSTS_LOAD';
export const MAP_LOAD_POSTS_ERROR = 'map/MAP_LOAD_POSTS_ERROR';
export const MAP_LOAD_POSTS_SUCCESS = 'map/MAP_LOAD_POSTS_SUCCESS';

export const regionChanged = (region) => ({ type: REGION_CHANGED, region });
export const mapLoadPosts = () => ({ type: MAP_LOAD_POSTS });
export const mapLoadPostsError = (error) => ({
    type: MAP_LOAD_POSTS_ERROR, error,
    message: { value: 'Problem podczas pobierania zdjęć, spróbuj później', type: 'error' }
});
export const mapLoadPostsSuccess = (posts) => ({ type: MAP_LOAD_POSTS_SUCCESS, posts });
