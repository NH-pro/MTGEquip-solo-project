import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* createCommJunc(action) {
    try {
        console.log(`In createCommDamageJuncSaga, this is the action`, action.payload);
        yield axios.post('/api/commJunc', action.payload);
        // yield
    }
    catch (err) {
        console.log(`Error in createCommJunc`, err);
    }
}

function* createCommDamageJuncSaga() {
    yield takeEvery('CREATE_COMMANDER_DMG_JUNCTIONS', createCommJunc);
}
export default createCommDamageJuncSaga;