import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, GET_SUBSCRIPTION_PLAN_URL, SAVE_SUBSCRIPTION_URL, CANCEL_PLAN_URL } from '../../services/serviceConstant'
import { cancelSubscriptionSuccessAction, getSubscriptionPlanSuccessAction, loaderAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { navigateToScreen } from '../../navigation/rootNav'

export function* GetSubscriptionPlanSaga() {
    try {
        yield takeLatest(TYPES.GET_SUBSCRIPTION_PLAN_ACTION, getSubscription)
    }
    catch (err) {
        showToast('Error in get sebscription observer')
    }
}

function* getSubscription() {
    try {
        yield put(loaderAction(true))
        const subscriptionRes = yield apiRequest({}, GET_SUBSCRIPTION_PLAN_URL, method['GET'])
        if (subscriptionRes['status'] === 200) {
            const newResult = subscriptionRes['result'].map((item, index) => {
                if (index === 0) { item['status'] = false }
                else { item['status'] = false }
                return item
            })
            yield put(getSubscriptionPlanSuccessAction(newResult))
            yield put(loaderAction(false))
            yield delay(600)
            showToast(subscriptionRes['message'])
        }
        else {
            yield put(loaderAction(false))
            showToast(subscriptionRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SaveSubscriptionPlanSaga() {
    try {
        yield takeLatest(TYPES.SAVE_SUBSCRIPTION_ACTION, saveSubscription)
    }
    catch (err) {
        showToast('Error in save subscription observer')
    }
}

function* saveSubscription(param) {
    try {
        const saveSubsRes = yield apiRequest(param['payload'], SAVE_SUBSCRIPTION_URL, method['POST'])
        if (saveSubsRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(saveSubsRes['message'])
            param['status'] ? navigateToScreen('tabZero') : navigateToScreen('providerProfileSetupSeven')
        }
        else {
            yield put(loaderAction(false))
            showToast(saveSubsRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    } finally {
        yield put(loaderAction(false))
    }
}


export function* CancelPlanSaga() {
    try {
        yield takeLatest(TYPES.CANCEL_SUBSCRIPTION_ACTION, cancelplan)
    }
    catch (err) {
        showToast('Error in save subscription observer')
    }
}

function* cancelplan(param) {
    try {
        yield put(loaderAction(true))
        const saveSubsRes = yield apiRequest(param['payload'], CANCEL_PLAN_URL, method['POST'], true)
        if (saveSubsRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(cancelSubscriptionSuccessAction())
            yield delay(600)
            showToast(saveSubsRes['message'])
        }
        else {
            yield put(loaderAction(false))
            showToast(saveSubsRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}
