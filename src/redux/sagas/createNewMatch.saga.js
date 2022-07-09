import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* createNewMatch(action) {
    try {
        yield axios.post('/api/match', action.payload);
        yield put({
            type: 'ADD_PLAYER',
            payload: {
                matchCode: action.payload.code
            }
        })
    }
    catch (err) {
        console.log(`Error in createMatch`, err);
    }
}

function* fetchNextMatchNumber() {
    try {
        const highestNum = yield axios.get('/api/match');
        const nextNum = highestNum.data.id;
        yield put({
            type: 'SET_NEXT_MATCH_NUM',
            payload: nextNum
        })
    }
    catch (err) {
        console.log('Error in fetchNextMatchNumber', err);
    }
}

function* fetchMatchInfo(action) {
    try {
        const matchInfo = yield axios.get(`/api/match/id/${action.payload.matchId}`)
        yield put({
            type: "SET_MATCH_INFO",
            payload: matchInfo.data
        })
    }
    catch (err) {
        console.log('Error in fetchMatchInfo', err);
    }
}

function* newMatchSaga() {
    yield takeEvery('CREATE_MATCH_DB', createNewMatch);
    yield takeEvery('FETCH_NEXT_MATCH_NUMBER', fetchNextMatchNumber)
    yield takeEvery('FETCH_MATCH_INFO', fetchMatchInfo);
}

export default newMatchSaga;