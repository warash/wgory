import config from 'react-native-config';

export default {


    facebookLogin: (token) => {
        const headers = {
            'Authorization': 'Bearer ' + token,
        };
        const url = `${config.API_URL}/auth/facebook`;
        return fetch(url, { headers }).then(res => {
            if (!res.ok) return Promise.reject({ status: res.status });
            return res.json()
        });
    }

}