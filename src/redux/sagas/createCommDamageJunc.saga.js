import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* createCommJunc(action) {
    try {
        yield axios.post('/api/commJunc', action.payload);
    }
    catch (err) {
        console.log(`Error in createCommJunc`, err);
    }
}

function* fetchCommJunc(action) {
    try {
        const commJuncInfo = yield axios.get(`/api/commJunc/${action.payload.matchId}`);
        yield put({
            type: 'SET_COMM_DMG_JUNC_INFO',
            payload: commJuncInfo.data
        })
    }
    catch (err) {
        console.log('Error in fetchCommJunc', err);
    }
} 

function* createCommDamageJuncSaga() {
    yield takeEvery('CREATE_COMMANDER_DMG_JUNCTIONS', createCommJunc);
    yield takeEvery('FETCH_COMMANDER_DMG_INFO', fetchCommJunc);
}
export default createCommDamageJuncSaga;