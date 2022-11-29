import { takeLatest, put, delay } from 'redux-saga/effects';
import { isCustomer, showToast } from '../../components/helper'
import { GET_ALL_CITY_LIST_URL, GET_CITY_LIST_URL, GET_COUNTRY_LIST_URL, GET_STATE_LIST_URL, method, PROVIDER_SAVE_LOCATION_URL, serviceError, SETUP_LOCAION_URL } from '../../services/serviceConstant'
import { getCityListSuccessAction, getCountryListSuccessAction, getStateListSuccessAction, loaderAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { navigateToScreen } from '../../navigation/rootNav'

export function* CountryListSaga() {
    try {
        yield takeLatest(TYPES.GET_COUNTRY_LIST_ACTION, countryList)
    }
    catch (err) {
        yield put(showToast('Error in country list observer'))
    }
}

function* countryList() {
    try {
        yield put(loaderAction(true))
        const countryRes = yield apiRequest({}, GET_COUNTRY_LIST_URL, method['GET'])
        if (countryRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getCountryListSuccessAction(countryRes['result']))
        }
        else {
            yield put(loaderAction(false))
            showToast(countryRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(showToast(serviceError['CATCH_ERROR']))
    }
}

export function* StateListSaga() {
    try {
        yield takeLatest(TYPES.GET_STATE_LIST_BY_COUNTRY_ACTION, stateList)
    }
    catch (err) {
        yield put(showToast('Error in country list observer'))
    }
}

function* stateList(param) {
    try {
        yield put(loaderAction(true))
        const stateRes = yield apiRequest({}, `${GET_STATE_LIST_URL}${param['payload']}`, method['GET'])
        if (stateRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getStateListSuccessAction(stateRes['result']))
        }
        else {
            yield put(loaderAction(false))
            showToast(stateRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(showToast(serviceError['CATCH_ERROR']))
    }
}

export function* CityListSaga() {
    try {
        yield takeLatest(TYPES.GET_CITY_LIST_BY_STATE_ACTION, cityList)
    }
    catch (err) {
        yield put(showToast('Error in city list observer'))
    }
}

function* cityList(param) {
    try {
        yield put(loaderAction(true))
        const cityRes = yield apiRequest({}, `${GET_CITY_LIST_URL}${param['payload']}`, method['GET'])
        if (cityRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getCityListSuccessAction(cityRes['result']))
        }
        else {
            yield put(loaderAction(false))
            showToast(cityRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(showToast(serviceError['CATCH_ERROR']))
    }
}

export function* SaveLocationSaga() {
    try {
        yield takeLatest(TYPES.SAVE_LOCATION_ACTION, saveLocation)
    }
    catch (err) {
        yield put(showToast('Error in save location observer'))
    }
}

function* saveLocation(param) {
    try {
        yield put(loaderAction(true))
        const saveLocationRes = yield apiRequest(param['payload'], isCustomer() ? SETUP_LOCAION_URL : PROVIDER_SAVE_LOCATION_URL, method['POST'])
        if (saveLocationRes['status'] === 200) {
            yield put(loaderAction(false))
            showToast(saveLocationRes['message'])
            isCustomer() ? navigateToScreen('profileSetupFive') : navigateToScreen('providerProfileSetupThree')
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(saveLocationRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(showToast(serviceError['CATCH_ERROR']))
    }
}

export function* getAllCityListSaga() {
    try {
        yield takeLatest(TYPES.GET_ALL_CITY_LIST_ACTION, getAllCityList)
    }
    catch (err) {
        yield put(showToast('Error in save location observer'))
    }
}

function* getAllCityList(param) {
    try {
        const allCityResp = yield apiRequest({}, GET_ALL_CITY_LIST_URL(param.search), method['GET'])
        if (allCityResp['status'] === 200) {
            const newResult = allCityResp?.result?.map(item => { return { ...item, value: item?.Name } })
            if (param?.callBack) param?.callBack(newResult)
        }
        else {
            if (param?.callBack) param?.callBack()
            showToast(allCityResp['message'])
        }
    } catch (err) {
        if (param?.callBack) param?.callBack()
        yield put(showToast(serviceError['CATCH_ERROR']))
    }
}