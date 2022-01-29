import { AsyncStorage } from 'react-native';


export const loadData = (key) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key)
            .then(res => resolve(res && JSON.parse(res)))
            .catch(err => resolve(undefined));
    });
};

export const saveData = (key, data) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(key, JSON.stringify(data))
            .then(res => resolve())
            .catch(err => reject(err));
    });
};