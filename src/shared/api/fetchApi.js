import config from 'react-native-config';
import { store } from './../../store';
import * as la from '../../+store/user.actions';

const esc = encodeURIComponent;
const toQueryString = (params) => {
    return Object.keys(params)
        .map(k => `${esc(k)}=${esc(params[k])}`)
        .join('&');
};

export const fetchApi = ({ endPoint, body, json, method = 'GET', headers = {}, query = {} }) => {

    const params = toQueryString(query);
    const url = `${config.API_URL}/${endPoint}?${params}`;
    const token = store.getState().user.token;

    const payload = body || (json && JSON.stringify(json));
    return fetch(url, {
        method,
        body: payload,
        headers: {
            'Authorization': 'Bearer ' + token,
            // 'content-type': 'application/json',
            ...headers
        }
    }).then(res => {
        if (!res.ok) {
            if (res.status === 401) {
                store.dispatch(la.logout())
            }
            return Promise.reject({ status: res.status })
        }
        return (res.json && res.json()) || {};
    });

};


// export const futchApi = ({ endPoint, body, json, method = 'GET', headers = {}, query = {} }, onProgress) => {
//
//     const params = toQueryString(query);
//     const url = `${config.API_URL}/${endPoint}?${params}`;
//     const token = store.getState().user.token;
//
//     const payload = body || (json && JSON.stringify(json));
//     return futch(url, {
//         method,
//         body: payload,
//         headers: {
//             'Authorization': 'Bearer ' + token,
//             'content-type': 'application/json',
//             ...headers
//         }
//     }, ({ total, loaded }) => {
//         const percent = (loaded / total) * 100;
//         onProgress && onProgress(percent);
//     }).then(r => {
//         return JSON.parse(r.response)
//     });
//
// };