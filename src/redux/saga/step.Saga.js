import { takeLatest, put } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, SP_DATA_STEP_URL, CS_DATA_STEP_URL } from '../../services/serviceConstant'
import { loaderAction, getSpDataStepSuccessAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'


export function* SPDataStepSaga() {
    try {
        yield takeLatest(TYPES.SP_DATA_STEP_ACTION, spdatastep)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* spdatastep(param) {
    try {
        const profileRes = yield apiRequest({}, `${SP_DATA_STEP_URL}${param['payload']}`, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getSpDataStepSuccessAction(profileRes['result']))
        }
        else {
            yield put(loaderAction(false))
            showToast(profileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* CSDataStepSaga() {
    try {
        yield takeLatest(TYPES.CS_DATA_STEP_ACTION, csdatastep)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* csdatastep(param) {
    try {
        const profileRes = yield apiRequest({}, `${CS_DATA_STEP_URL}${param['payload']}`, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
        }
        else {
            yield put(loaderAction(false))
            showToast(profileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}


