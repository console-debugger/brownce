import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, GET_FUNDS_URL, EARNINGS_URL, RATING_TYPE_URL, RATING_SAVE_URL } from '../../services/serviceConstant'
import { loaderAction, getRatingTypeSuccessAction, saveRatingSuccessAction, getMyFundsSuccessAction, getEarningsSuccessAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'

export function* RatingTypeSaga() {
    try {
        yield takeLatest(TYPES.GET_RATING_TYPES_ACTION, getratingtype)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getratingtype(param) {
    try {
        const profileRes = yield apiRequest({}, RATING_TYPE_URL, method['GET'])
        if (profileRes['status'] === 200) {
            const newResult = profileRes['result'].map(item => { return { ...item, UserRating: 0, status: false } })
            yield put(loaderAction(false))
            yield put(getRatingTypeSuccessAction(newResult))
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


export function* RatingSaga() {
    try {
        yield takeLatest(TYPES.SAVE_RATING_ACTION, rating)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* rating(param) {
    try {
        const profileRes = yield apiRequest(param['payload'], RATING_SAVE_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            yield put(saveRatingSuccessAction(profileRes['result']))
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(profileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}



export function* FundSaga() {
    try {
        yield takeLatest(TYPES.GET_MY_FUNDS_ACTION, funds)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* funds(param) {
    try {
        const profileRes = yield apiRequest({}, GET_FUNDS_URL, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getMyFundsSuccessAction(profileRes['result']))
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

export function* EarningsSaga() {
    try {
        yield takeLatest(TYPES.GET_EARNINGS_ACTION, earnings)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* earnings(param) {
    try {
        const profileRes = yield apiRequest({}, EARNINGS_URL, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getEarningsSuccessAction(profileRes['result']))
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