import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* editHp(action) {
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
function* editPoison(action) {
    try {
        yield axios.put('/api/userStats/addPoison', action.payload);
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
    yield takeEvery('EDIT_USER_POISON', editPoison);
}
export default editUserStatsSaga;