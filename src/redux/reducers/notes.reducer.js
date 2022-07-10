import { combineReducers } from "redux";

const matchHistory = (state = null, action) => {
    switch (action.type) {
        case 'SET_MATCH_HISTORY':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    matchHistory
});