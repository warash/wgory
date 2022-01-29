import { loadData, saveData } from './storage';

export const STATE_KEY = 'wgory-state';

export const persistState = (storage) => {
    storage.subscribe((state) => {
        saveData(STATE_KEY, { user: state.user });
    })
};


export const restoreState = () => {
    return loadData(STATE_KEY);
};