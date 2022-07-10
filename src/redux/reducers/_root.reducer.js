import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import fetchNextMatchNumber from './nextMatchNum.reducer';
import userMatchReducer from './user_match.reducer';
import commDamageReducer from './commDamage.reducer';
import matchReducer from './match.reducer';
import notesReducers from './notes.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  fetchNextMatchNumber,
  userMatchReducer,
  commDamageReducer,
  matchReducer,
  notesReducers
});

export default rootReducer;
