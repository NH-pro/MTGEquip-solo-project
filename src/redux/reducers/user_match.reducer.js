const userMatchReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_MATCH_PLAYER_INFO':
            return action.payload;
        default:
            return state;
    }
};
export default userMatchReducer;