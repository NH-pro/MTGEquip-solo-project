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

function* editCommDmg(action) {
    try {
        yield axios.put('/api/commJunc', action.payload);
        yield put({
            type: 'FETCH_COMMANDER_DMG_INFO',
            payload: action.payload
        })
    }
    catch (err) {
        console.log('Error in editCommDmg', err);
    }
}

function* createCommDamageJuncSaga() {
    yield takeEvery('CREATE_COMMANDER_DMG_JUNCTIONS', createCommJunc);
    yield takeEvery('FETCH_COMMANDER_DMG_INFO', fetchCommJunc);
    yield takeEvery('EDIT_COMM_DMG', editCommDmg);
}
export default createCommDamageJuncSaga;