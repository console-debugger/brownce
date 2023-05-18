import { takeLatest, put, delay } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, COMMENT_HISTORY_URL, COMMENT_URL, DELETE_COMMENT_URL, GET_SUGGESTIONS_URL, SAVE_APP_FEEDBACK_URL } from '../../services/serviceConstant'
import { getCommentsHistorySuccessAction, getSuggestionsSuccessAction, loaderAction, updateCommentsHistoryAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'


export function* CommentSaga() {
    try {
        yield takeLatest(TYPES.COMMENT_ACTION, comment)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* comment(param) {
    try {
        const updateCommentResp = yield apiRequest(param['payload'], COMMENT_URL, method['POST'])
        if ((updateCommentResp['status'] === 200) || (updateCommentResp['status'] === 201)) {
            param.callBack(updateCommentResp.result)
        }
        else {
            param.callBack()
            showToast(updateCommentResp['message'])
        }
    } catch (err) {
        param.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* CommentHistorySaga() {
    try {
        yield takeLatest(TYPES.GET_COMMENTS_HISTORY_ACTION, commenthistory)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* commenthistory(param) {
    try {
        yield put(loaderAction(true))
        const profileRes = yield apiRequest({}, `${COMMENT_HISTORY_URL}QuestionId=${param['payload'].id}&PageNo=${param['payload'].pageNo}&RecordsPerPage=${param['payload'].pageSize}`, method['GET'])
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getCommentsHistorySuccessAction(profileRes['result']['List']))
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

export function* DeleteCommentSaga() {
    try {
        yield takeLatest(TYPES.DELETE_COMMENT_ACTION, deleteCommentId)
    }
    catch (err) {
        showToast('Error in delete comment observer')
    }
}

function* deleteCommentId(param) {
    try {
        const deleteCommentResp = yield apiRequest({}, `${DELETE_COMMENT_URL}${param['payload']?.QuestionCommentId}`, method['GET'])
        if (deleteCommentResp['status'] === 200) {
            param.callBack(true)
        }
        else {
            param.callBack(false)
            showToast(deleteCommentResp['message'])
        }
    } catch (err) {
        param.callBack(false)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetSuggestionsSaga() {
    try {
        yield takeLatest(TYPES.GET_SUGGESTIONS_ACTION, getSuggestions)
    }
    catch (err) {
        showToast('Error in delete comment observer')
    }
}

function* getSuggestions(param) {
    try {
        const getsuggestionsResp = yield apiRequest({}, `${GET_SUGGESTIONS_URL}PageNo=1&RecordsPerPage=20000&Search=${param['payload'].Search}`, method['GET'])
        if (getsuggestionsResp['status'] === 200) {
            yield put(getSuggestionsSuccessAction(getsuggestionsResp['result']['List']))
        }
        else {
            showToast(getsuggestionsResp['message'])
        }
    } catch (err) {
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SaveAppFeedbackSaga() {
    try {
        yield takeLatest(TYPES.SAVE_APP_FEEDBACK_ACTION, saveAppFeedback)
    }
    catch (err) {
        showToast('Error in save app feedback observer')
    }
}

function* saveAppFeedback(param) {
    try {
        const feedbackResp = yield apiRequest(param.payload, SAVE_APP_FEEDBACK_URL, method['POST'])
        if (feedbackResp['status'] === 200) {
            if(param?.callBack) param?.callBack(true)
            yield put(loaderAction(false))
            yield delay(500)
            yield showToast(feedbackResp['message'])
        }
        else {
            if(param?.callBack) param?.callBack(false)
            yield put(loaderAction(false))
            yield delay(500)
            yield showToast(feedbackResp['message'])
        }
    } catch (err) {
        if(param?.callBack) param?.callBack(false)
        yield put(loaderAction(false))
        yield delay(500)
        yield showToast(serviceError['CATCH_ERROR'])
    }
}