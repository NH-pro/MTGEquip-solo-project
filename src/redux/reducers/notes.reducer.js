import { combineReducers } from "redux";

const matchHistory = (state = null, action) => {
    switch (action.type) {
        case 'SET_MATCH_HISTORY':
            return action.payload;
        default:
            return state;
    }
};

const matchNotes = (state = null, action) => {
    switch (action.type) {
        case 'SET_MATCH_NOTES':
            return action.payload;
        default:
            return state;
    }
};

const allUsers = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_USERS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    matchHistory,
    matchNotes,
    allUsers
});