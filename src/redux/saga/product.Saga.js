import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, MY_PRODUCT_URL, ADD_PRODUCT_URL, DELETE_PRODUCT_URL, CUSTOMER_PRODUCT_URL, GET_CATEGORY_SEARCH_URL, GET_BRAND_SEARCH_URL, ADD_BRAND_NAME_URL, GET_BRAND_CATEGORY_URL } from '../../services/serviceConstant'
import { loaderAction, SearchloaderAction, getBrandSuccessAction, getCategorySuccessAction, getMyProductListSuccessAction, deleteProductSuccessAction, customerProductSuccessAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { navigateToScreen } from '../../navigation/rootNav'


export function* BrandCategorySaga() {
    try {
        yield takeLatest(TYPES.GET_BRAND_CATEGORY_ACTION, brandcategory)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* brandcategory(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], GET_BRAND_CATEGORY_URL, method['GET'])
        const brandResult = profileRes['result']['productbrand'].map(item => { return { ...item, Name: item['BrandName'], searchStr: item['BrandName'] } })
        const categoryResult = profileRes['result']['productCategory'].map(item => { return { ...item, Name: item['CategoryName'] } })
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getBrandSuccessAction(brandResult))
            yield put(getCategorySuccessAction(categoryResult))
            delay(500)
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

export function* AddBrandNameSaga() {
    try {
        yield takeLatest(TYPES.ADD_BRAND_NAME_ACTION, addbrandname)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* addbrandname(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], ADD_BRAND_NAME_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(profileRes['message'])
            navigateToScreen('addproducts')
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


export function* CategorySearchSaga() {
    try {
        yield takeLatest(TYPES.GET_CATEGORY_SEARCH_ACTION, categorysearch)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* categorysearch(param) {
    try {
        const profileRes = yield apiRequest(param['payload'], GET_CATEGORY_SEARCH_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            yield put(getCategorySuccessAction(profileRes['result']['productCategory']))
        }
        else {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            showToast(profileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(SearchloaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}


export function* BrandSearchSaga() {
    try {
        yield takeLatest(TYPES.GET_BRAND_SEARCH_ACTION, brandsearch)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* brandsearch(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], GET_BRAND_SEARCH_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            yield put(getBrandSuccessAction(profileRes['result']['productbrand']))
        }
        else {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            showToast(profileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(SearchloaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}


export function* AddProductSaga() {
    try {
        yield takeLatest(TYPES.ADD_PRODUCT_ACTION, addproduct)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* addproduct(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], ADD_PRODUCT_URL, method['POST'], true)
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            delay(500)
            showToast(profileRes['message'])
            navigateToScreen('currentProducts')
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


export function* MyProductListSaga() {
    try {
        yield takeLatest(TYPES.GET_MY_PRODUCT_LIST_ACTION, myproduct)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* myproduct(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], MY_PRODUCT_URL, method['POST'])
        const newResult = profileRes['result']['List'].map(item => { return { ...item, status: false } })
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            delay(500)
            yield put(getMyProductListSuccessAction(newResult))
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


export function* DeleteProductSaga() {
    try {
        yield takeLatest(TYPES.DELETE_PRODUCT_ACTION, deleteproduct)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* deleteproduct(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest({}, `${DELETE_PRODUCT_URL}${param['payload']}`, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            delay(500)
            yield put(deleteProductSuccessAction())
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

export function* CustomerProductSaga() {
    try {
        yield takeLatest(TYPES.CUSTOMER_PRODUCTS_ACTION, customerproduct)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* customerproduct(param) {
    try {  //yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], CUSTOMER_PRODUCT_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            //delay(500)
            //showToast(profileRes['message'])
            yield put(customerProductSuccessAction(profileRes['result']))
        }
        else {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            showToast(profileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(SearchloaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}



