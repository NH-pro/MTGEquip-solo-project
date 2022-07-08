import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';




function* fetchUsers(action) {
    try{
        console.log(`in fetchUsers, this is action.payload`, action.payload.matchId);
        const matchUsers = yield axios.get(`/api/user_match/${action.payload.matchId}`);
        console.log('this is matchUsers', matchUsers.data);
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