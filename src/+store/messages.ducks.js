export default (state = {}, action = {}) => {
    if (!action.message) {
        return state;
    }
    return action.message;
}