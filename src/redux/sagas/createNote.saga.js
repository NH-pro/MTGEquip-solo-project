import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* createNote(action) {
    try {
        yield axios.post(`/api/notes`, action.payload)
    }
    catch (err) {
        console.log(`Error in createNote`, err);
    }
}

function* fetchMatchNotes(action) {
    try {
        const notes = yield axios.get(`/api/notes/${action.payload.matchId}`);
        yield put({
            type: 'SET_MATCH_NOTES',
            payload: notes.data
        })
    }
    catch (err) {
        console.log('Error in fetchMatchHistory', err);
    }
}

function* fetchMatchHistory(action) {
    try {
        const matchHistory = yield axios.get(`/api/notes/userHistory/${action.payload.user}`)
        yield put({
            type: 'SET_MATCH_HISTORY',
            payload: {
                matchHistory: matchHistory.data
            }
        })
    }
    catch (err) {
        console.log(`Error in fetchMatchHistory`, err);
    }
}

// function* deleteNote(action) {
//     try {
//         const
//     }
// }

function* createNoteSaga() {
    yield takeEvery('CREATE_MATCH_NOTE', createNote);
    yield takeEvery('FETCH_MATCH_NOTES', fetchMatchNotes);
    yield takeEvery('FETCH_MATCH_HISTORY', fetchMatchHistory);
    // yield takeEvery('DELETE_NOTE', deleteNote);
}

export default createNoteSaga;