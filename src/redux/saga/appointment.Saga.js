import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, GET_PROVIDER_APPOINTMENT_URL, GET_CUSTOMER_INPROGRESS_APT, CANCEL_APPOINTMENT, SAVE_AVAILABILITY_URL, APPROVE_REJECT_URL, APPOINTMENT_COMPLETE_URL, APPOINTMENT_HISTORY_URL, APPOINTMENT_DETAIL_URL, START_SERVICE_URL, UPDATE_SERVICE_PRICE_URL } from '../../services/serviceConstant'
import { loaderAction, getCustomerAppointementsSuccessAction, getProviderAppointmentSuccessAction, getHistoryAppointmentSuccessAction, getProviderAppointmentInprogressAction, getCustomerAppointementsPastAction, appointmentDetailSuccessAction, getProviderAppointmentUpcomingAction, getCustomerAppointementsUpcomingAction, getProfileAction, getProviderProfileAction, updateServicePriceSuccessAction, getProviderAppointmentAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'


export function* CustomerAppointmentSaga() {
    try {
        yield takeLatest(TYPES.GET_CUSTOMER_APPOINTMENTS_ACTION, getAppointments)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getAppointments(param) {
    try {
        const profileRes = yield apiRequest({}, `${GET_CUSTOMER_INPROGRESS_APT}${param['payload']}`, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))

            if (param['payload'] == 1) {
                yield put(getCustomerAppointementsSuccessAction(profileRes['result']))
            }

            else if (param['payload'] == 4) {
                yield put(getCustomerAppointementsPastAction(profileRes['result']))
            }
            else {
                yield put(getCustomerAppointementsUpcomingAction(profileRes['result']))
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


export function* CancelAppointmentSaga() {
    try {
        yield takeLatest(TYPES.CANCEL_APPOINTMENT, cancelAppointment)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* cancelAppointment(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], CANCEL_APPOINTMENT, method['POST'], true)
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


export function* ProviderAppointmentSaga() {
    try {
        yield takeLatest(TYPES.GET_PROVIDER_APPOINTMENT_ACTION, getProviderAppointments)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getProviderAppointments(param) {
    try {
        const profileRes = yield apiRequest({}, `${GET_PROVIDER_APPOINTMENT_URL}${param['payload']}`, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            if (param['payload'] == 2) {
                yield put(getProviderAppointmentSuccessAction(profileRes['result']))
            }
            else if (param['payload'] == 1) {
                yield put(getProviderAppointmentInprogressAction(profileRes['result']))
            }
            else {
                yield put(getProviderAppointmentUpcomingAction(profileRes['result']))
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

export function* AvailabilitySaga() {
    try {
        yield takeLatest(TYPES.GET_PROVIDER_AVAILAIBILITY_ACTION, getAvailability)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getAvailability(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], SAVE_AVAILABILITY_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(getProviderProfileAction())
        }
        else {
            yield put(loaderAction(false))
            setTimeout(() => {
                showToast(profileRes['message'])
            }, 1000);
        }
    } catch (err) {
        yield put(loaderAction(false))
        setTimeout(() => {
            showToast(serviceError['CATCH_ERROR'])
        }, 2000);
    }
}

export function* ApproveRejectSaga() {
    try {
        yield takeLatest(TYPES.APPROVE_REJECT_APPOINTMENT_ACTION, approvereject)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* approvereject(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], APPROVE_REJECT_URL, method['POST'])
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



export function* AppointmentCompleteSaga() {
    try {
        yield takeLatest(TYPES.MARK_APPOINTMENT_COMPLETE_ACTION, appointmentcomplete)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* appointmentcomplete(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], APPOINTMENT_COMPLETE_URL, method['POST'])
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

export function* AppointmentHistorySaga() {
    try {
        yield takeLatest(TYPES.GET_HISTORY_APPOINTMENT_ACTION, appointmenthistory)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* appointmenthistory(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest({}, APPOINTMENT_HISTORY_URL, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getHistoryAppointmentSuccessAction(profileRes['result']))

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



export function* AppointmentDetailSaga() {
    try {
        yield takeLatest(TYPES.APPOINTMENT_DETAIL_ACTION, appointmentdetail)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* appointmentdetail(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest({}, `${APPOINTMENT_DETAIL_URL}${param['payload']}`, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(appointmentDetailSuccessAction(profileRes['result']))
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


export function* StartServiceSaga() {
    try {
        yield takeLatest(TYPES.START_SERVICE_ACTION, startservice)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* startservice(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], START_SERVICE_URL, method['POST'], true)
        if (profileRes['status'] === 201) {
            yield put(loaderAction(false))
            //yield put(appointmentDetailSuccessAction(profileRes['result']))
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

export function* UpdateServicePriceSaga() {
    try {
        yield takeLatest(TYPES.UPDATE_SERVICE_PRICE_ACTION, updateServicePrice)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* updateServicePrice(param) {
    try {
        yield put(loaderAction(true))
        const serviceRes = yield apiRequest(param['payload'], UPDATE_SERVICE_PRICE_URL, method['POST'])
        if (serviceRes['status'] === 200) {
            yield put(getProviderAppointmentAction(1))
        }
        else {
            yield put(loaderAction(false))
            showToast(serviceRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}