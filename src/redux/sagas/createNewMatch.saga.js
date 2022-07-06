import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createNewMatch(action) {
    console.log(action.payload);
    try {
        yield axios.post('/api/match', action.payload);
    }
    catch (err) {
        console.log(`Error in createMatch`, err);
    }
}

function* newMatchSaga() {
    yield takeEvery('CREATE_MATCH_DB', createNewMatch);
}

export default newMatchSaga;