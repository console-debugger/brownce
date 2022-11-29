import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { GET_HAIR_TYPE_URL, method, serviceError, SAVE_HAIR_TYPES_URL, UPDATE_TENDER_HEAD_LEVEL_URL } from '../../services/serviceConstant'
import { getHairTypeSuccessAction, loaderAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { navigateToScreen } from '../../navigation/rootNav'

export function* GetHairTypes() {
    try {
        yield takeLatest(TYPES.GET_HAIR_TYPES_ACTION, hairTypes)
    }
    catch (err) {
        yield put(showToast('Error in hair types observer'))
    }
}

function* hairTypes(param) {
    try {
        yield put(loaderAction(true))
        const hairRes = yield apiRequest({}, GET_HAIR_TYPE_URL, method['GET'])
        if (hairRes['status'] === 200) {
            if (param['payload']) {
                const newResult = yield hairRes['result'].map(item => { return { ...item, status: param['payload'] == item['HairTypeName'] ? true : false } })
                yield put(getHairTypeSuccessAction(newResult))
                yield put(loaderAction(false))
            }
            else {
                const newResult = yield hairRes['result'].map(item => { return { ...item, status: false } })
                yield put(getHairTypeSuccessAction(newResult))
                yield put(loaderAction(false))
            }
        }
        else {
            yield put(loaderAction(false))
            showToast(hairRes['message'])
        }

    } catch (err) {
        yield put(loaderAction(false))
        yield put(showToast(serviceError['CATCH_ERROR']))
    }
}

export function* SaveHairTypeSaga() {
    try {
        yield takeLatest(TYPES.SAVE_HAIR_TYPE_ACTION, saveHair)
    }
    catch (err) {
        yield put(showToast('Error in save hair types observer'))
    }
}

function* saveHair(param) {
    try {
        yield put(loaderAction(true))
        const saveHairRes = yield apiRequest(param['payload'], SAVE_HAIR_TYPES_URL, method['POST'])
        if (saveHairRes['status'] === 200) {
            yield put(loaderAction(false))
            if (!param?.['payload']?.['IsUpdate']) navigateToScreen('profileSetupFour')
            delay(600)
            if (!param?.['payload']?.['IsUpdate']) showToast('Update Successfully')
        }
        else {
            yield put(loaderAction(false))
        }

    } catch (err) {
        yield put(loaderAction(false))
        yield put(showToast(serviceError['CATCH_ERROR']))
    }
}

export function* UpdateTenderHeadLevelSaga() {
    try {
        yield takeLatest(TYPES.UPDATE_TENDER_HEAD_LEVEL_ACTION, updatetenderhead)
    }
    catch (err) {
        yield put(showToast('Error in head level types observer'))
    }
}

function* updatetenderhead(param) {
    try {
        yield put(loaderAction(true))
        const saveHairRes = yield apiRequest(param['payload'], UPDATE_TENDER_HEAD_LEVEL_URL, method['POST'])
        if (saveHairRes['status'] === 200) {
            yield put(loaderAction(false))
            navigateToScreen('tabFour')
        }
        else {
            yield put(loaderAction(false))
            showToast(saveHairRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(showToast(serviceError['CATCH_ERROR']))
    }
}



