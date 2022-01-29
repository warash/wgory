import { AppRegistry } from 'react-native';
import App from './app';
import { Provider } from 'react-redux';
import React from 'react'
import { store, persistor }  from './src/store';
import { PersistGate } from 'redux-persist/integration/react'
import 'moment/locale/pl'
import moment from 'moment';
moment.locale('pl');


const AppRedux = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
);

AppRegistry.registerComponent('WGory', () => AppRedux);



