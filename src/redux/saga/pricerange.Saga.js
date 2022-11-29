import { takeLatest, put } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, PRICE_RANGE_URL } from '../../services/serviceConstant'
import { loaderAction, getPriceRangeSuccessAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'

export function* PriceRangeSaga() {
    try {
        yield takeLatest(TYPES.GET_PRICE_RANGE_ACTION, pricerange)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* pricerange() {
    try {
        const profileRes = yield apiRequest({}, PRICE_RANGE_URL, method['GET'])
        const newResult = profileRes['result'].map(item => { return { ...item, status: false } })
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getPriceRangeSuccessAction(newResult))

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