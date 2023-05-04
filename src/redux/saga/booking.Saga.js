import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, FUND_LIST_URL, MAKE_PAYMENT_URL, REQUEST_FUND_URL, SAVE_BOOKING_URL, GET_SUPPORT_URL, BROWNCE_STATS_URL } from '../../services/serviceConstant'
import { loaderAction, getSupportSuccessAction, requestFundSuccessAction, getFundListSuccessAction, makePaymentSuccessAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { navigateToScreen } from '../../navigation/rootNav'

export function* BookingSaga() {
    try {
        yield takeLatest(TYPES.SAVE_BOOKING_ACTION, saveBooking)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* saveBooking(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], SAVE_BOOKING_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(profileRes['message'])
            navigateToScreen('tabOne')
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(profileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield delay(600)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SupportSaga() {
    try {
        yield takeLatest(TYPES.GET_SUPPORT_INFO_ACTION, getSupport)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getSupport(param) {
    try {
        const profileRes = yield apiRequest({}, GET_SUPPORT_URL, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getSupportSuccessAction(profileRes['result']))
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


export function* PaymentSaga() {
    try {
        yield takeLatest(TYPES.MAKE_PAYMENT_ACTION, payment)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* payment(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], MAKE_PAYMENT_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(profileRes['message'])
            yield put(makePaymentSuccessAction(profileRes['result']))

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



export function* RequestFundSaga() {
    try {
        yield takeLatest(TYPES.REQUEST_FUNDS_ACTION, requestfund)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* requestfund(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], REQUEST_FUND_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(requestFundSuccessAction(profileRes['result']))
            yield delay(600)
            showToast(profileRes['message'])
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


export function* FundListSaga() {
    try {
        yield takeLatest(TYPES.GET_FUNDS_LIST_ACTION, fundlist)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* fundlist(param) {
    try {
        const profileRes = yield apiRequest(param['payload'], FUND_LIST_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(profileRes['message'])
            yield put(getFundListSuccessAction(profileRes['result']['Data']))

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

export function* GetBrownceStatsSaga() {
    try {
        yield takeLatest(TYPES.GET_BROWNCE_STATS_ACTION, getBrownceStats)
    }
    catch (err) {
        showToast('Error in get brownce stat observer')
    }
}

function* getBrownceStats(param) {
    try {
        const statsResp = yield apiRequest({}, BROWNCE_STATS_URL, method['GET'])
        if (statsResp['status'] === 200) {
            if (param?.callBack) param?.callBack(statsResp?.data?.result || {})
            yield put(loaderAction(false))
        }
        else {
            if (param?.callBack) param?.callBack(false)
            yield put(loaderAction(false))
            yield delay(600)
            yield showToast(statsResp['message'])
        }
    } catch (err) {
        if (param?.callBack) param?.callBack(false)
        yield put(loaderAction(false))
        yield delay(600)
        yield showToast(serviceError['CATCH_ERROR'])
    }
}