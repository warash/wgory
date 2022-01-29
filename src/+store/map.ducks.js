import * as ma from './map.actions';
import { postsApi } from '../shared/api/posts.api';
import { Observable } from 'rxjs';
import 'rxjs';
import geoViewport from 'geo-viewport';
import { Dimensions } from 'react-native';
import { singlePostAction } from './home.ducks';
import * as pa from './post.actions';

const { height, width } = Dimensions.get('window')
const initialState = {
    region: {},
    loading: false,
    posts: []
};

// Reducer
export default (state = initialState, action = {}) => {
    if (!!action.postId) {
        state = singlePostAction(state, action);
    }
    switch (action.type) {

        case ma.REGION_CHANGED:
            return { ...state, region: action.region };
        case ma.MAP_LOAD_POSTS:
            return { ...state, loading: true };
        case ma.MAP_LOAD_POSTS_SUCCESS:
            return { ...state, loading: false, posts: action.posts };
        case ma.MAP_LOAD_POSTS_ERROR:
            return { ...state, loading: false };
        case pa.DELETE_SUCCESS:
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) };
        default:
            return state;
    }
}

const contains = function (x, y, { left, top, height, width }) {
    return left <= x && x <= left + width &&
        top <= y && y <= top + height;
};


const toRect = ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
    const left = longitude - longitudeDelta / 2;
    const top = latitude - latitudeDelta / 2;
    return { left, top, width: longitudeDelta, height: latitudeDelta };
};

const doubleRegion = ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {

    let dblLatitudeDelta = latitudeDelta * 2;
    if (dblLatitudeDelta < -180) dblLatitudeDelta = -180;
    if (dblLatitudeDelta > 180) dblLatitudeDelta = 180;

    let dblLongitudeDelta = longitudeDelta * 2;
    if (dblLongitudeDelta < -360) dblLongitudeDelta = -360;
    if (dblLongitudeDelta > 360) dblLongitudeDelta = 360;
    return { latitude, longitude, latitudeDelta: dblLatitudeDelta, longitudeDelta: dblLongitudeDelta }
};

//epics
export const loadPinsOnRegionChange = (action$) => {
    return action$.ofType(ma.REGION_CHANGED)
        .debounceTime(400)
        // .distinctUntilChanged((prev, next) => {
        //     if (Math.abs((prev.region.longitudeDelta / next.region.longitudeDelta) - 1) > 0.2
        //         || Math.abs((prev.region.latitudeDelta / next.region.latitudeDelta) - 1) > 0.2
        //     ) return false;
        //
        //     const prevRct = toRect(doubleRegion(prev.region));
        //     const nextRct = toRect(next.region);
        //
        //     return contains(nextRct.left, nextRct.top, prevRct)
        //         && contains(nextRct.left + nextRct.width, nextRct.top + nextRct.height, prevRct)
        // })

        .switchMap(({ region }) => {

            const { longitudeDelta, latitudeDelta, longitude, latitude } = region;
            const bounds = [
                longitude - (longitudeDelta / 2),
                latitude - (latitudeDelta / 2),
                longitude + (longitudeDelta / 2),
                latitude + (latitudeDelta / 2),
            ];

            const { zoom } = geoViewport.viewport(bounds, [height, width]);
            // alert(zoom);

            return Observable.fromPromise(postsApi.fetch({ ...region, zoom }))
                .map(ma.mapLoadPostsSuccess)
                .catch(error => Observable.of(ma.mapLoadPostsError(error)))
                .startWith(ma.mapLoadPosts())
        });
};




