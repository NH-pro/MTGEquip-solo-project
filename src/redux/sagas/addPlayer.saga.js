import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* addPlayer(action) {
    console.log(`in add player`, action.payload);
    try {
        yield axios.post('/api/user_match', action.payload);
    }
    catch (err) {
        console.log(`Error in addPlayer`, err);
    }
}

function* addPlayerSaga() {
    yield takeEvery('ADD_PLAYER', addPlayer);
}
export default addPlayerSaga;