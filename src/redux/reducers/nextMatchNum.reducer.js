const fetchNextMatchNumReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NEXT_MATCH_NUM':
            return action.payload;
        default:
            return state;
    }
};
export default fetchNextMatchNumReducer;