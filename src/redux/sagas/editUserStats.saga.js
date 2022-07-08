import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* editHp(action) {
    console.log('in editHp this is action', action.payload.matchId);
    try {
        yield axios.put('/api/userStats/addHp', action.payload);
        yield put({
            type: 'FETCH_MATCH_USERS',
            payload: action.payload
        })
    }
    catch (err) {
        console.log('Error in editHp', err)
    }
}


function* editUserStatsSaga() {
    yield takeEvery('EDIT_USER_HP', editHp);
}
export default editUserStatsSaga;