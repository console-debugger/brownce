import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, SEARCH_SERVICES_URL, SEARCH_PROVIDER_URL } from '../../services/serviceConstant'
import { loaderAction, getSearchServiceSuccessAction, SearchProviderSuccessAction, getSearchMaintainanceSuccessAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { navigateToScreen } from '../../navigation/rootNav'

export function* SearchServicesSaga() {
    try {
        yield takeLatest(TYPES.GET_SEARCH_SERVICES_ACTION, searchservices)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* searchservices(param) {
    try {
        const profileRes = yield apiRequest({}, `${SEARCH_SERVICES_URL}${param['payload']}`, method['GET'])

        let newResult = []
        for (let i = 0; i < profileRes['result'].length; i++) {
            newResult.push(profileRes['result'][i].map(item => { return { ...item, status: false } }))
        }
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            param['payload'] == 1 ?
                yield put(getSearchServiceSuccessAction(newResult))
                :
                yield put(getSearchMaintainanceSuccessAction(newResult))

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

export function* SearchProviderSaga() {
    try {
        yield takeLatest(TYPES.SAVE_SEARCH_PROVIDER_ACTION, searchprovider)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* searchprovider(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], SEARCH_PROVIDER_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(SearchProviderSuccessAction(profileRes['result']))
            if (profileRes['result'].length == 0) {
                yield delay(600)
                showToast("No provider found in your area")
            }
            else {
                yield delay(600)
                showToast(profileRes['message'])
                navigateToScreen('discovery')
            }
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
