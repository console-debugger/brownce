import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, ALL_QUESTION_URL, ADD_QUESTION_URL, COMMON_QUESTION_URL, ALL_QUESTION_SEARCH_URL, DELETE_QUESTION_URL, LIKE_DISLIKE_QUESTION_URL, LIKE_DISLIKE_COMMENT_URL } from '../../services/serviceConstant'
import { loaderAction, commonQuestionSuccessAction, deleteQuestionSuccessAction, } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { navigateToScreen } from '../../navigation/rootNav'

export function* AddQuestionSaga() {
    try {
        yield takeLatest(TYPES.ADD_QUESTION_ACTION, addquestion)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* addquestion(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest(param['payload'], ADD_QUESTION_URL, method['POST'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            showToast(profileRes['message'])
            delay(500)
            navigateToScreen('tabThree')
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

export function* AllQuestionSaga() {
    try {
        yield takeLatest(TYPES.GET_ALL_QUESTION_ACTION, getallquestion)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getallquestion(param) {
    try {
        const resp = yield apiRequest({}, param['payload'] ? `${ALL_QUESTION_SEARCH_URL}${param['payload']}` : ALL_QUESTION_URL, method['GET'])
        if (resp['status'] === 200) {
            param.callBack(resp['result'])
        }
        else {
            param.callBack()
            showToast(resp['message'])
        }
    } catch (err) {
        param.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* CommonQuestionSaga() {
    try {
        yield takeLatest(TYPES.GET_COMMON_QUESTION_ACTION, commonquestion)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* commonquestion(param) {
    try {
        const profileRes = yield apiRequest({}, COMMON_QUESTION_URL, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(commonQuestionSuccessAction(profileRes['result']))

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

export function* DeleteQuestionSaga() {
    try {
        yield takeLatest(TYPES.DELETE_QUESTION_ACTION, deleteQuestion)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* deleteQuestion(param) {
    try {
        const profileRes = yield apiRequest({}, `${DELETE_QUESTION_URL}${param['payload']}`, method['GET'])
        if (profileRes['status'] === 200) {
            param.callBack(true)
            showToast(profileRes['message'])
        }
        else {
            param.callBack()
            showToast(profileRes['message'])
        }
    } catch (err) {
        param.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* LikeDislikeQuestionSaga() {
    try {
        yield takeLatest(TYPES.LIKE_DISLIKE_QUESTION_ACTION, LikeDislikeQuestion)
    }
    catch (err) {
        showToast('Error in like dislike observer')
    }
}

function* LikeDislikeQuestion(param) {
    try {
        console.log('like param=>', param)
        const resp = yield apiRequest(param['payload'], `${LIKE_DISLIKE_QUESTION_URL}`, method['POST'])
        console.log('like resp=>', resp)
        if (resp['status'] === 200) {
            param.callBack(true)
            // showToast(resp['message'])
            // yield put(likeDislikeQuestionSuccessAction(param['payload']))
            // yield put(getAllQuestionAction(''))
        }
        else {
            param.callBack(false)
            showToast(resp['message'])
        }
    } catch (err) {
        param.callBack(false)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* LikeDislikeCommentSaga() {
    try {
        yield takeLatest(TYPES.LIKE_DISLIKE_COMMENT_ACTION, likeDislikeCommentSaga)
    }
    catch (err) {
        showToast('Error in like dislike observer')
    }
}

function* likeDislikeCommentSaga(param) {
    try {
        const profileRes = yield apiRequest(param['payload'], `${LIKE_DISLIKE_COMMENT_URL}`, method['POST'])
        if (profileRes['status'] === 200) {
            param.callBack(true)
        }
        else {
            param.callBack(false)
            showToast(profileRes['message'])
        }
    } catch (err) {
        param.callBack(false)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* QuestionByQuestionIdSaga() {
    try {
        yield takeLatest(TYPES.GET_QUESTION_BY_ID_ACTION, getQuestionById)
    }
    catch (err) {
        showToast('Error in get question by question id observer')
    }
}

function* getQuestionById(param) {
    try {
        const resp = yield apiRequest({}, `${ALL_QUESTION_URL}QuestionId=${param.payload}`, method['GET'])
        console.log('resut=>', resp)
        if (resp['status'] === 200) {
            param.callBack(resp['result'])
        }
        else {
            param.callBack()
            showToast(resp['message'])
        }
    } catch (err) {
        param.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}