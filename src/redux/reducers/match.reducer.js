const matchReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_MATCH_INFO':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default matchReducer;