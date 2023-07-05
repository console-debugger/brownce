import { takeLatest, put, delay } from 'redux-saga/effects';
import { isCustomer, multiRemoveData, showToast, storeData } from '../../components/helper'
import { method, serviceError, VALIDATE_EMAIL_OTP_URL, UPDATE_EMAIL_URL, RESET_PASSWORD_URL, REGISTRATION_URL, OTP_VERIFICATION_URL, serviceConst, LOGIN_URL, FORGOT_PASSWORD_URL, CHANGE_PASSWORD_URL, apiKey, REGISTER_WITH_PHONE_URL, PHONE_OTP_VERIFICATION_URL, LOGIN_WITH_PHONE_URL, VALIDATE_PHONE_LOGIN_URL } from '../../services/serviceConstant'
import { loaderAction, otpViewAction, popupAction, signupUserDataAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { navigateToScreen, reset } from '../../navigation/rootNav'
import localKey from '../../utils/localKey';
import crashlytics from '@react-native-firebase/crashlytics';

export function* Registration() {
    try {
        yield takeLatest(TYPES.REGISTRATION_ACTION, registration)
    }
    catch (err) {
        showToast('Error in registration observer')
    }
}

function* registration(param) {
    try {
        yield put(loaderAction(true))
        const isPhone = !!param?.payload?.[apiKey.PHONE] && !!param?.payload?.[apiKey.COUNTRY_CODE]
        const apiUrl = isPhone ? REGISTER_WITH_PHONE_URL : REGISTRATION_URL
        const registrationRes = yield apiRequest(param['payload'], apiUrl, method['POST'])
        if (registrationRes['status'] === 201) {
            const saveData = {
                [apiKey.PHONE]: param?.payload?.[apiKey.PHONE] || '',
                [apiKey.COUNTRY_CODE]: param?.payload?.[apiKey.COUNTRY_CODE] || ''
            }
            yield put(signupUserDataAction(saveData))
            yield put(loaderAction(false))
            yield put(otpViewAction(registrationRes['result']['OTP']))
            showToast(registrationRes['message'])
            navigateToScreen('otpVerification', isPhone ? [`${param?.payload?.[apiKey.COUNTRY_CODE]} ${param?.payload?.[apiKey.PHONE]}`, false, true] : [param['payload']['Email'], false])
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(registrationRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* OTPVerification() {
    try {
        yield takeLatest(TYPES.OTP_VERIFICATION_ACTION, otpVerification)
    }
    catch (err) {
        showToast('Error in otp verification observer')
    }
}

function* otpVerification(param) {
    try {
        yield put(loaderAction(true))
        const apiUrl = param['isPhone'] ? PHONE_OTP_VERIFICATION_URL : OTP_VERIFICATION_URL
        const verifyRes = yield apiRequest(param['payload'], apiUrl, method['POST'])
        if (verifyRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(verifyRes['message'])
            serviceConst['token'] = verifyRes['result']['Token']
            param['status'] ? navigateToScreen('resetpassword', verifyRes['result']['Email']) : navigateToScreen('profileSetupOne')
        }
        else {
            showToast(verifyRes['message'])
        }
        yield put(loaderAction(false))
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* PhoneOTPVerification() {
    try {
        yield takeLatest(TYPES.PHONE_LOGIN_VERIFICATION_ACTION, phoneLoginOtpVerification)
    }
    catch (err) {
        showToast('Error in otp verification observer')
    }
}

function* phoneLoginOtpVerification(param) {
    try {
        yield put(loaderAction(true))
        console.log('params==>', param.payload)
        const loginRes = yield apiRequest(param['payload'], VALIDATE_PHONE_LOGIN_URL, method['POST'])
        console.log('loginRes==>', JSON.stringify(loginRes))
        if (loginRes['status'] === 200) {
            yield crashlytics().setUserId(loginRes?.result?.UserId?.toString() || '')
            yield crashlytics().setAttributes({
                role: isCustomer() ? 'Customer' : 'Provider',
                email: loginRes?.result?.Email || '',
                username: loginRes?.result?.FirstName || '',
            })
            yield put(loaderAction(false))
            serviceConst['token'] = loginRes['result']['Token']
            if (loginRes['result']['UserStatus'] === 1) {
                yield storeData(localKey['ROLE'], serviceConst['role'])
                yield storeData(localKey['LOGIN_TOKEN'], loginRes['result']['Token'])
                reset('bottomTab')
            }
            else if (loginRes['result']['UserStatus'] === 14) showToast("Waiting for Approval")
            else if (loginRes['result']['UserStatus'] === 15) showToast("Account Rejected")
            showToast(loginRes['message'])
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            loginRes['message'] == "Log-in Successful!" || loginRes['message'] == "Username/Password is Incorrect" || loginRes['message'] == "An Unexpected Error Has Occured!" ? showToast(loginRes['message']) : yield put(popupAction(true, loginRes['message']))
        }
        yield put(loaderAction(false))
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* LoginSaga() {
    try {
        yield takeLatest(TYPES.LOGIN_ACTION, loginSaga)
    }
    catch (err) {
        showToast('Error in login observer')
    }
}

function* loginSaga(param) {
    try {
        yield put(loaderAction(true))
        const loginRes = yield apiRequest(param['payload'], LOGIN_URL, method['POST'])
        if (loginRes['status'] === 200) {
            yield crashlytics().setUserId(loginRes?.result?.UserId?.toString() || '')
            yield crashlytics().setAttributes({
                role: isCustomer() ? 'Customer' : 'Provider',
                email: loginRes?.result?.Email || '',
                username: loginRes?.result?.FirstName || '',
            })
            if (param['isRemember']) {
                storeData(localKey['IS_REMEMBER'], 'true')
                storeData(localKey['EMAIL'], param['payload']['Email'])
                storeData(localKey['PASSWORD'], param['payload']['Password'])
            }
            else multiRemoveData([localKey['IS_REMEMBER'], localKey['EMAIL'], localKey['PASSWORD']])
            yield put(loaderAction(false))
            serviceConst['token'] = loginRes['result']['Token']
            if (loginRes['result']['UserStatus'] === 1) {
                yield storeData(localKey['ROLE'], serviceConst['role'])
                yield storeData(localKey['LOGIN_TOKEN'], loginRes['result']['Token'])
                reset('bottomTab')
            }
            // else if (loginRes['result']['UserStatus'] === 5) navigateToScreen('profileSetupOne')
            // else if (loginRes['result']['UserStatus'] === 6) isCustomer() ? navigateToScreen('profileSetupTwo') : navigateToScreen('providerBio')
            // else if (loginRes['result']['UserStatus'] === 7) isCustomer() ? navigateToScreen('profileSetupThree') : navigateToScreen('profileSetupThree')
            // else if (loginRes['result']['UserStatus'] === 8) isCustomer() ? navigateToScreen('profileSetupFive') : navigateToScreen('providerProfileSetupThree')
            // else if (loginRes['result']['UserStatus'] === 9) isCustomer() ? navigateToScreen('profileSetupFour') : navigateToScreen('providerProfileSetupFour')
            // else if (loginRes['result']['UserStatus'] === 10) isCustomer() ? navigateToScreen('profileSetupSix') : navigateToScreen('providerProfileSetupFive')
            // else if (loginRes['result']['UserStatus'] === 11) navigateToScreen('providerProfileSetupSix')
            // else if (loginRes['result']['UserStatus'] === 12) navigateToScreen('providerProfileSetupSeven')
            // else if (loginRes['result']['UserStatus'] === 16) navigateToScreen('websitelink')
            // else if (loginRes['result']['UserStatus'] === 13) navigateToScreen('uploadLicense')
            else if (loginRes['result']['UserStatus'] === 14) showToast("Waiting for Approval")
            else if (loginRes['result']['UserStatus'] === 15) showToast("Account Rejected")
            // yield storeData(localKey['LOGIN_TOKEN'], loginRes['result']['Token'])
            // else if (loginRes['result']['UserStatus'] === 12)
            // else if (loginRes['result']['UserStatus'] === 13)
            showToast(loginRes['message'])
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            loginRes['message'] == "Log-in Successful!" || loginRes['message'] == "Username/Password is Incorrect" || loginRes['message'] == "An Unexpected Error Has Occured!" ? showToast(loginRes['message']) : yield put(popupAction(true, loginRes['message']))

        }
    } catch (err) {
        console.log('error==>', err)
        yield put(loaderAction(false))
        yield delay(600)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* LoginWithPhoneSaga() {
    try {
        yield takeLatest(TYPES.LOGIN_WITH_PHONE_ACTION, loginWithPhoneSaga)
    }
    catch (err) {
        showToast('Error in login with phone observer')
    }
}

function* loginWithPhoneSaga(param) {
    try {
        yield put(loaderAction(true))
        console.log('params==>', param['payload'])
        const loginResp = yield apiRequest(param['payload'], LOGIN_WITH_PHONE_URL, method['POST'])
        console.log('loginResp==>', loginResp)
        if (loginResp['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(loginResp['message'])
            navigateToScreen('otpVerification', [`${param?.payload?.[apiKey.COUNTRY_CODE]} ${param?.payload?.[apiKey.PHONE]}`, false, true, true])
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(loginResp['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* ForgotSaga() {
    try {
        yield takeLatest(TYPES.FORGOT_PASSWORD_ACTION, forgotSaga)
    }
    catch (err) {
        showToast('Error in forgot password observer')
    }
}

function* forgotSaga(param) {
    try {
        yield put(loaderAction(true))
        const forgotRes = yield apiRequest(param['payload'], FORGOT_PASSWORD_URL, method['POST'])
        if (forgotRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(forgotRes['message'])
            navigateToScreen('otpVerification', [param['payload']['EmailOrPhone'], true, param?.isPhone ? true : false])
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(forgotRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* ResetPasswordSaga() {
    try {
        yield takeLatest(TYPES.RESET_PASSWORD_ACTION, resetpassword)
    }
    catch (err) {
        showToast('Error in forgot password observer')
    }
}

function* resetpassword(param) {
    try {
        yield put(loaderAction(true))
        const forgotRes = yield apiRequest(param['payload'], RESET_PASSWORD_URL, method['POST'])
        if (forgotRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(forgotRes['message'])
            navigateToScreen('login')
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(forgotRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* ChangePasswordSaga() {
    try {
        yield takeLatest(TYPES.CHANGE_PASSWORD_ACTION, changepassword)
    }
    catch (err) {
        showToast('Error in forgot password observer')
    }
}

function* changepassword(param) {
    try {
        yield put(loaderAction(true))
        const forgotRes = yield apiRequest(param['payload'], CHANGE_PASSWORD_URL, method['POST'])
        if (forgotRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(forgotRes['message'])
            navigateToScreen('tabFour')
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(forgotRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* UpdateEmailSaga() {
    try {
        yield takeLatest(TYPES.UPDATE_EMAIL_ACTION, updateEmail)
    }
    catch (err) {
        showToast('Error in forgot password observer')
    }
}

function* updateEmail(param) {
    try {
        yield put(loaderAction(true))
        const forgotRes = yield apiRequest(param['payload'], UPDATE_EMAIL_URL, method['POST'])
        if (forgotRes['status'] === 200) {
            yield put(loaderAction(false))
            navigateToScreen('validateOTP', param['payload']['Email'])
            yield delay(600)
            showToast(forgotRes['message'])
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(forgotRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}


export function* validateEmailOtpSaga() {
    try {
        yield takeLatest(TYPES.VALIDATE_EMAIL_OTP_ACTION, valdiateEmailotp)
    }
    catch (err) {
        showToast('Error in forgot password observer')
    }
}

function* valdiateEmailotp(param) {
    try {
        yield put(loaderAction(true))
        const forgotRes = yield apiRequest(param['payload'], VALIDATE_EMAIL_OTP_URL, method['POST'])
        if (forgotRes['status'] === 200) {
            yield put(loaderAction(false))
            isCustomer() ? navigateToScreen('editProfile') : navigateToScreen('editProviderProfile')
            yield delay(600)
            showToast(forgotRes['message'])

        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(forgotRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}
