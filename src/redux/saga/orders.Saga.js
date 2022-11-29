import { takeLatest, put, delay } from 'redux-saga/effects';
import { isCustomer, showToast } from '../../components/helper'
import { method, serviceError, ADD_ORDER_URL, MY_ADDRESS_URL, CUSTOMER_ORDERS_URL, PROVIDER_ORDERS_URL, PAYMENT_SAVE_URL, MARK_AS_DELIVERED_URL, CANCEL_ORDER_URL, ORDER_STATUS_URL, NEW_ORDER_URL } from '../../services/serviceConstant'
import { loaderAction, cancelOrderSuccessAction, myAddressSuccessAction, customerOrderSuccessAction, providerOrderSuccessAction, addOrderSuccessAction, orderStatusSuccessAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { navigateToScreen } from '../../navigation/rootNav'


export function* AddOrderSaga() {
    try {
        yield takeLatest(TYPES.ADD_ORDER_ACTION, addorder)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* addorder(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], ADD_ORDER_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(delay(600))
            showToast(profileRes['message'])
            param['status'] ? null : yield put(addOrderSuccessAction(profileRes['result']))
            param['status'] ? navigateToScreen('myorders') : null
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


export function* MyAddressSaga() {
    try {
        yield takeLatest(TYPES.MY_ADDRESS_ACTION, myaddress)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* myaddress(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], MY_ADDRESS_URL, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(delay(600))
            yield put(myAddressSuccessAction(profileRes['result']['Adress']))
        }
        else {
            yield put(loaderAction(false))
            showToast(profileRes['message'])
        }
    } catch (err) {
        console.log('err=>', err)
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* CustomerOrderSaga() {
    try {
        yield takeLatest(TYPES.CUSTOMER_ORDERS_ACTION, customerorder)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* customerorder(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], CUSTOMER_ORDERS_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(delay(600))
            yield put(customerOrderSuccessAction(profileRes['result']['orders']))
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

export function* ProviderOrderSaga() {
    try {
        yield takeLatest(TYPES.PROVIDER_ORDERS_ACTION, providerrorder)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* providerrorder(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], param['status'] ? NEW_ORDER_URL : PROVIDER_ORDERS_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(delay(600))
            const newResult = profileRes['result']['orders']?.List.map(item => { return { ...item, selected: false } })
            const newObejct = { ...profileRes['result']['orders'], List: newResult }
            yield put(providerOrderSuccessAction(newObejct))
        }
        else {
            yield put(loaderAction(false))
            showToast(profileRes['message'])
        }
    } catch (err) {
        console.log('err=>', err)
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* PaymentSaveSaga() {
    try {
        yield takeLatest(TYPES.PAYMENT_SAVE_ACTION, paymentsave)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* paymentsave(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], PAYMENT_SAVE_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(delay(600))
            showToast(profileRes['message'])
            isCustomer() ? navigateToScreen('myorders') : navigateToScreen('pastorders')
        }
        else {
            yield put(loaderAction(false))
            showToast(profileRes['message'])
        }
    } catch (err) {
        console.log('err=>', err)
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}



export function* MarkAsDeliveredSaga() {
    try {
        yield takeLatest(TYPES.MARK_PRODUCT_DELEVERED_ACTION, markasdelivered)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* markasdelivered(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], MARK_AS_DELIVERED_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(delay(600))
            showToast(profileRes['message'])
            navigateToScreen('pastorders')
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



export function* CancelOrderSaga() {
    try {
        yield takeLatest(TYPES.CANCEL_ORDER_ACTION, cancelorder)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* cancelorder(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], CANCEL_ORDER_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(cancelOrderSuccessAction())
            yield put(delay(600))
            showToast(profileRes['message'])
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


export function* OrderStatusSaga() {
    try {
        yield takeLatest(TYPES.ORDER_STATUS_ACTION, orderstatus)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* orderstatus(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], ORDER_STATUS_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(orderStatusSuccessAction())
            yield put(delay(600))
            showToast(profileRes['message'])
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


