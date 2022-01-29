import { fetchApi, futchApi } from './fetchApi';
import { Observable } from 'rxjs/Rx';
import moment from 'moment';
import { Platform } from 'react-native';

export const postsApi = {
    fetch: (query) => {
        return fetchApi({ endPoint: 'posts', query });
    },

    fetchList({ offset, nearBy }) {
        let query = { offset };
        if (!!nearBy) {
            query = { ...query, ...nearBy };
        }
        return fetchApi({ endPoint: 'posts/near-me', query });
    },

    like(postId) {
        return fetchApi({ endPoint: 'posts/like/' + postId, method: 'PUT' });
    },

    deletePost(postId) {
        return fetchApi({ endPoint: 'posts/' + postId, method: 'DELETE' });
    },

    fetchLikes(query) {
        return fetchApi({ endPoint: 'likes' }, query);
    },
//"content://media/external/images/media/6505" -dziala
    // "content://com.sec.android.gallery3d.provider/union/image/item/3041"

    create: (photo, latitude, longitude, mountain, mountainRange, description, timestamp, authorSignature, postType) => {

        const url = Platform.OS === 'android' ? 'file://' + photo.path : photo.uri;
        const data = new FormData();
        data.append('photos', {
            uri: url,
            type: 'image/jpeg',
            name: 'image'
        });
        data.append('latitude', latitude);
        data.append('longitude', longitude);
        authorSignature && authorSignature.length && data.append('authorSignature', authorSignature);
        data.append('mountain', mountain);
        data.append('mountainRange', mountainRange);
        data.append('description', description);
        data.append('postType', postType);
        timestamp && data.append('timestamp', moment(timestamp).format());


        return Observable.fromPromise(
            fetchApi({
                endPoint: 'posts',
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'multipart/form-data' }
            }));
    }
};