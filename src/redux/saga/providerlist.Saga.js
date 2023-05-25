import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, GET_PROVIDER_PROFILE_URL, GET_PROVIDER_LIST_URL, GET_COMPLETE_PROVIDER_DETAIL_URL, GET_FILTER_PRICE_LIST_URL, APP_REMOVE_FAVOURITE_URl, FAV_PROVIDER_LIST_URL } from '../../services/serviceConstant'
import { getProviderProfileSuccessAction, getProviderListSuccesAction, loaderAction, getProviderCompleteDetailSuccesAction, getProviderCompleteServices, SearchloaderAction, getProviderCompleteProducts } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'

export function* GetProviderListSaga() {
    try {
        yield takeLatest(TYPES.GET_PROVIDER_LIST_ACTION, getProviderList)
    }
    catch (err) {
        showToast('Error in get provider list observer')
    }
}

function* getProviderList(param) {
    try {
        const profileRes = yield apiRequest(param['payload'], GET_PROVIDER_LIST_URL, method['POST'], true)
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            if (param?.callBack) param?.callBack(profileRes['result'])
            // yield put(getProviderListSuccesAction(profileRes['result']))
        }
        else {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            if (param?.callBack) param?.callBack()
            showToast(profileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(SearchloaderAction(false))
        if (param?.callBack) param?.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetProviderProfileSaga() {
    try {
        yield takeLatest(TYPES.GET_PROVIDER_PROFILE_ACTION, getProviderProfile)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getProviderProfile(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest({}, GET_PROVIDER_PROFILE_URL, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getProviderProfileSuccessAction(profileRes['result']))
        }
        else {
            yield put(loaderAction(false))
            showToast(profileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    } finally {
        yield put(loaderAction(false))
    }
}


export function* GetCompleteProviderDetailSaga() {
    try {
        yield takeLatest(TYPES.GET_COMPLETE_PROVIDER_DETAIL_ACTION, getCompleteProvider)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getCompleteProvider(param) {
    try {
        const profileRes = yield apiRequest({}, `${GET_COMPLETE_PROVIDER_DETAIL_URL}${param['payload']}`, method['GET'])
        console.log('profileRes===>', JSON.stringify(profileRes))
        if (profileRes['status'] === 200) {
            let newResult = []
            if (profileRes['result']['spProfile']['Services']) {
                for (let i = 0; i < profileRes['result']['spProfile']['Services'].length; i++) {
                    newResult.push(profileRes['result']['spProfile']['Services'][i].map(item => { return { ...item, status: false } }))
                }
            }
            yield put(loaderAction(false))
            yield put(getProviderCompleteDetailSuccesAction(profileRes['result']['spProfile']))
            yield put(getProviderCompleteServices(newResult))
            yield put(getProviderCompleteProducts(profileRes['result']['Products']))
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(profileRes['message'] || profileRes['Message'])
        }
    } catch (err) {
        console.log('====>>>', JSON.stringify(err))
        yield put(loaderAction(false))
        yield delay(600)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetFiltePriceListSaga() {
    try {
        yield takeLatest(TYPES.GET_FILTER_PRICE_LIST_ACTION, getPriceFilterListSaga)
    }
    catch (err) {
        showToast('Error in get filter price list observer')
    }
}

function* getPriceFilterListSaga(param) {
    try {
        const priceListResp = yield apiRequest({}, `${GET_FILTER_PRICE_LIST_URL}`, method['GET'])
        if (priceListResp.status == 200) {
            if (param?.callBack) param?.callBack(priceListResp?.result)
        }
        else {
            if (param?.callBack) param?.callBack()
            showToast(priceListResp.message)
        }
    } catch (error) {
        if (param?.callBack) param?.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* AddRemoveToFavouriteSaga() {
    try {
        yield takeLatest(TYPES.ADD_REMOVE_PROFILE_TO_FAVOURITE, addRemoveProfileToFav)
    }
    catch (err) {
        showToast('Error in add remove profile to observer')
    }
}

function* addRemoveProfileToFav(param) {
    try {
        const response = yield apiRequest(param.payload, APP_REMOVE_FAVOURITE_URl, method['POST'])
        if (response.status == 200) {
            if (param?.callBack) param?.callBack(true)
        }
        else {
            if (param?.callBack) param?.callBack()
            showToast(response.message)
        }
    } catch (error) {
        if (param?.callBack) param?.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetFavProviderListSaga() {
    try {
        yield takeLatest(TYPES.GET_FAV_PROVIDER_LIST_ACTION, getFavProviderCall)
    }
    catch (err) {
        showToast('Error in get Fav provider observer')
    }
}

function* getFavProviderCall(param) {
    try {
        const response = yield apiRequest({}, FAV_PROVIDER_LIST_URL(param.payload), method['GET'])
        if (response.status == 200) {
            if (param?.callBack) param?.callBack(response?.result)
        }
        else {
            if (param?.callBack) param?.callBack()
            showToast(response.message)
        }
    } catch (error) {
        if (param?.callBack) param?.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}