import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* addPlayer(action) {
    console.log(`in add player`, action.payload);
    try {
        const matchId = yield axios.get(`/api/match/${action.payload.matchCode}`);
        yield axios.post('/api/user_match/join', {id:matchId.data.id});
        console.log(`this is matchId.data.id`, matchId.data.id);
        yield put ({
            type: 'SET_NEXT_MATCH_NUM',
            payload: matchId.data.id
        })
    }
    catch (err) {
        console.log(`Error in addPlayer`, err);
    }
}

function* addPlayerSaga() {
    yield takeEvery('ADD_PLAYER', addPlayer);
}
export default addPlayerSaga;