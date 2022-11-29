import { takeLatest, put } from 'redux-saga/effects';
import { showToast } from '../../components/helper'
import { method, serviceError, NOTIFICATION_READ_URL, GET_CHAT_LIST_URL, GET_CHAT_MESSAGES_URL, CHAT_ROOM_URL, SAVE_CHAT_URL } from '../../services/serviceConstant'
import { loaderAction, chatRoomSuccessAction, getChatMessagessuccessAction, getChatListSuccessAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'

export function* ChatSaga() {
    try {
        yield takeLatest(TYPES.CHAT_ROOM_ACTION, chatroom)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* chatroom(param) {
    try {
        const profileRes = yield apiRequest(param['payload'], CHAT_ROOM_URL, method['POST'])
        if (profileRes['status'] === 201) {
            yield put(chatRoomSuccessAction(profileRes['result']))
            const param = {
                "RoomId": profileRes['result']['RoomId'],
                "pageNo": '1',
                "pageSize": '20'

            }
            const profileRess = yield apiRequest(param, GET_CHAT_MESSAGES_URL, method['POST'])
            if (profileRes['status'] === 201) {
                yield put(loaderAction(false))
                yield put(getChatMessagessuccessAction(profileRess['result']['Data']))
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

export function* SaveChatSaga() {
    try {
        yield takeLatest(TYPES.SAVE_CHAT_ACTION, savechat)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* savechat(param) {
    try {
        const profileRes = yield apiRequest(param['payload'], SAVE_CHAT_URL, method['POST'])
        if (profileRes['status'] === 201) {
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

export function* GetChatMessagesSaga() {
    try {
        yield takeLatest(TYPES.GET_CHAT_MESSAGE_ACTION, chatmessages)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* chatmessages(param) {
    try {
        const profileRes = yield apiRequest(param['payload'], GET_CHAT_MESSAGES_URL, method['POST'])
        if (profileRes['status'] === 201) {
            yield put(loaderAction(false))
            yield put(getChatMessagessuccessAction(profileRes['result']['Data']))
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


export function* GetChatListSaga() {
    try {
        yield takeLatest(TYPES.GET_CHAT_LIST_ACTION, chatList)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* chatList(param) {

    try {
        const profileRes = yield apiRequest({}, GET_CHAT_LIST_URL, method['GET'])
        if (profileRes['status'] === 201) {
            yield put(loaderAction(false))
            yield put(getChatListSuccessAction(profileRes['result']['Data']))
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

export function* NotificationReadSaga() {
    try {
        yield takeLatest(TYPES.MARK_NOTIFICATION_AS_READ_ACTION, read)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* read(param) {
    try {
        const profileRes = yield apiRequest({}, NOTIFICATION_READ_URL, method['POST'])
        if (profileRes['status'] === 201) {
            yield put(loaderAction(false))
        }
        else {
            yield put(loaderAction(false))
        }
    } catch (err) {
        yield put(loaderAction(false))
    }
}