import { takeLatest, put } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, CMS_URL } from '../../services/serviceConstant'
import { loaderAction, getCmsSuccessAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'


export function* CMSSaga() {
    try {
        yield takeLatest(TYPES.GET_CMS_ACTION, cms)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* cms(param) {
    try {
        const profileRes = yield apiRequest({}, `${CMS_URL}${param['payload']}`, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))

            if (param['payload'] === 5) {
                yield put(getCmsSuccessAction(profileRes['result']))
            }

            else if (param['payload'] == 1) {
                yield put(getCmsSuccessAction(profileRes['result']))
            }

            else if (param['payload'] == 2) {
                yield put(getCmsSuccessAction(profileRes['result']))
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
