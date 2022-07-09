const commDamageReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMM_DMG_JUNC_INFO':
            return action.payload;
        default:
            return state;
    }
};

export default commDamageReducer;