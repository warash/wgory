import user, { userEpic } from './user.ducks';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import photo, { photoEpics } from './addPost.ducks';
import map, { loadPinsOnRegionChange } from './map.ducks';
import home, { homeEpics } from './home.ducks'
import liked, { likedEpic } from './liked.ducks'
import { postEpic } from './post.ducks';
import messages from './messages.ducks';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'user',
    storage,
    blacklist: ['loading', 'loginModalOpened']
};


const rootReducer = combineReducers({
    user: persistReducer(persistConfig, user),
    photo,
    home,
    liked,
    messages,
    map
});
export default rootReducer;


export const rootEpic = combineEpics(
    homeEpics,
    photoEpics,
    postEpic,
    likedEpic,
    userEpic,
    loadPinsOnRegionChange
);
