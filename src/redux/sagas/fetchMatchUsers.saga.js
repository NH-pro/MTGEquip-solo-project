import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';




function* fetchUsers(action) {
    console.log(`in fetchUsers, this is action.payload`, action.payload.matchId);
    const matchUsers = yield axios.get(`/api/user_match/${action.payload.matchId}`);
    console.log(`this is matchUsers`, matchUsers);
}

function* fetchMatchUsersSaga() {
    yield takeEvery('FETCH_MATCH_USERS', fetchUsers);
}
export default fetchMatchUsersSaga;