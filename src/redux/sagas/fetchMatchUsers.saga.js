import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';




function* fetchUsers(action) {
    try{
        const matchUsers = yield axios.get(`/api/user_match/${action.payload.matchId}`);
        yield put({
            type: 'SET_MATCH_PLAYER_INFO',
            payload: matchUsers.data
        })
    }
    catch (err) {
        console.log(`Error in fetchUsers`, err);
    }

}

function* fetchMatchUsersSaga() {
    yield takeEvery('FETCH_MATCH_USERS', fetchUsers);
}
export default fetchMatchUsersSaga;