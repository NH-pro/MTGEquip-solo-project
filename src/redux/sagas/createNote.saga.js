import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* createNote(action) {
    try{
        yield axios.post(`/api/notes`, action.payload)
    }
    catch (err) {
        console.log(`Error in createNote`, err);
    }
}

function* createNoteSaga() {
    yield takeEvery('CREATE_MATCH_NOTE', createNote);
}

export default createNoteSaga;