import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer, { rootEpic } from './+store'
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



export const store = createStore(rootReducer, composeEnhancers(
    // applyMiddleware(thunk),
    applyMiddleware(epicMiddleware)
));
export const persistor = persistStore(store);
