const userMatchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MATCH_USER_INFO':
            return action.payload;
        default:
            return state;
    }
};
export default userMatchReducer;