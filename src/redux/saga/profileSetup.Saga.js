import { takeLatest, put, delay } from 'redux-saga/effects';
import { isCustomer, showToast, storeData } from '../../components/helper'
import { method, OPEN_TIME_URL, serviceError, MY_SP_CUSTOM_SERVICE_URL, ADD_CUSTOM_SERVICE_URL, SP_CUSTOM_SERVICES_URL, PROVIDER_BIO_URL, GET_CUSTOMER_DETAIL_URL, PROFILE_SETUP_ONE_URL, DELETE_PROVIDER_PORTFOLIO_URL, SAVE_PROVIDER_PROFILE_URL, SAVE_PROVIDER_PORTFOLIO_URL, SAVE_USER_PROFILE_URL, PROFILE_SETUP_TWO_URL, SAVE_GENDER_URL, GET_ALL_PROFILE_QUESTION_URL, SAVE_ALL_QUESTIONS_URL, GET_PROFILE_URL, PROVIDER_PROFILE_SETUP_ONE, PROVIDER_PROFILE_SETUP_THREE_URL, PROVIDER_PROFILE_SETUP_FOUR_URL, GET_HAIR_SERVICES_URL, SAVE_SERVICES_URL, GET_SAVED_SERVICES_URL, SAVE_SERVICES_PRICE_URL, SAVE_LICENSE, GET_SP_DETAIL_URL, serviceConst, NOTIFICATION_LIST_URL, NOTIFICATION_COUNT_URL, GET_PROFESSIONS_LIST_URL, GET_SERVICES_BY_PROFESSION_URL, ADD_PROVIDER_PROFESSION_URL, DELETE_ACCOUNT_URL, GET_GENDERS_URL } from '../../services/serviceConstant'
import { getAllServicesSuccessAction, getCustomServicesSuccessAction, getNotificationCountSuccessAction, getOtherProfileDetailSuccessAction, getProfessionsListSuccessAction, getProfileQuestionSuccessAction, getProfileSuccessAction, getProviderCompleteProducts, getProviderProfileSuccessAction, getSavedServicesSuccessAction, getServicesByProfessionSuccessAction, getSpCustomServiceSuccessAction, loaderAction, logoutAction, popupAction, SearchloaderAction, updateProfileQuestionAnswerListAction, updateSavedServicesAction, updateServicesAction } from '../action'
import * as TYPES from '../action/type'
import apiRequest from '../../services'
import { logout, navigateToScreen, reset } from '../../navigation/rootNav'
import localKey from '../../utils/localKey';

export function* ProfileOneSetup() {
    try {
        yield takeLatest(TYPES.PROFILE_SETUP_ONE_ACTION, profileOne)
    }
    catch (err) {
        showToast('Error in profile one setup observer')
    }
}

function* profileOne(param) {
    try {
        yield put(loaderAction(true))
        const setupOneRes = yield apiRequest(param['payload'], isCustomer() ? PROFILE_SETUP_ONE_URL : PROVIDER_PROFILE_SETUP_ONE, method['POST'], true)

        if (setupOneRes['status'] === 200) {
            showToast(setupOneRes['message'])
            isCustomer() ? navigateToScreen('profileSetupTwo') : navigateToScreen('providerBio')
        }
        else {
            showToast(setupOneRes['message'])
        }
        yield put(loaderAction(false))

    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* ProviderBioSaga() {
    try {
        yield takeLatest(TYPES.PROVIDER_BIO_ACTION, providerbio)
    }
    catch (err) {
        showToast('Error in profile one setup observer')
    }
}

function* providerbio(param) {
    try {
        yield put(loaderAction(true))
        const setupOneRes = yield apiRequest(param['payload'], PROVIDER_BIO_URL, method['POST'], true)

        if (setupOneRes['status'] === 200) {
            showToast(setupOneRes['message'])
            navigateToScreen('profileSetupThree')
        }
        else {
            showToast(setupOneRes['message'])
        }
        yield put(loaderAction(false))

    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}


export function* ProfileTwoSetup() {
    try {
        yield takeLatest(TYPES.PROFILE_SETUP_TWO_ACTION, profileTwo)
    }
    catch (err) {
        showToast('Error in profile two setup observer')
    }
}

function* profileTwo(param) {
    try {
        yield put(loaderAction(true))
        const setupTwoRes = yield apiRequest(param['payload'], PROFILE_SETUP_TWO_URL, method['POST'])

        if (setupTwoRes['status'] === 200) {
            yield put(loaderAction(false))
            showToast(setupTwoRes['message'])
            navigateToScreen('profileSetupThree')
        }
        else {
            yield put(loaderAction(false))
            showToast(setupTwoRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SaveGenderSaga() {
    try {
        yield takeLatest(TYPES.SAVE_GENDER_ACTION, saveGender)
    }
    catch (err) {
        showToast('Error in save gender observer')
    }
}

function* saveGender(param) {
    try {
        yield put(loaderAction(true))
        const saveGenderRes = yield apiRequest(param['payload'], SAVE_GENDER_URL, method['POST'])

        if (saveGenderRes['status'] === 200) {
            yield put(loaderAction(false))
            showToast(saveGenderRes['message'])
            navigateToScreen('profileSetupSix')
        }
        else {
            yield put(loaderAction(false))
            showToast(saveGenderRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetProfileQuestionSaga() {
    try {
        yield takeLatest(TYPES.GET_PROFILE_QUESTIONS_ACTION, getProfileQuestion)
    }
    catch (err) {
        showToast('Error in get profile question observer')
    }
}

function* getProfileQuestion() {
    try {
        const getQuestionRes = yield apiRequest({}, GET_ALL_PROFILE_QUESTION_URL, method['GET'])

        if (getQuestionRes['status'] === 200) {
            const newResult = yield getQuestionRes['result'].map(item => { return { ...item, status: false } })
            yield put(loaderAction(false))
            yield put(getProfileQuestionSuccessAction(newResult))
        }
        else {
            yield put(loaderAction(false))
            showToast(getQuestionRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SaveQuestionAnswerSaga() {
    try {
        yield takeLatest(TYPES.SAVE_QUESTION_ANSWER_ACTION, saveQuestions)
    }
    catch (err) {
        showToast('Error in save question observer')
    }
}

function* saveQuestions(param) {
    try {
        yield put(loaderAction(true))
        const saveQuesRes = yield apiRequest(param['payload'], SAVE_ALL_QUESTIONS_URL, method['POST'])

        if (saveQuesRes['status'] === 200) {
            yield put(loaderAction(false))
            if (param['payload']?.['IsUpdate']) navigateToScreen('tabFour')
            else {
                const appliedQuestion = [
                    {
                        question: 'Select a prompt',
                        ProfileQuestionMasterId: '',
                        AnswerText: ''
                    },
                    {
                        question: 'Select a prompt',
                        ProfileQuestionMasterId: '',
                        AnswerText: ''
                    },
                    {
                        question: 'Select a prompt',
                        ProfileQuestionMasterId: '',
                        AnswerText: ''
                    },
                ]
                yield put(updateProfileQuestionAnswerListAction(appliedQuestion))
                yield delay(600)
                showToast(saveQuesRes['message'])

                yield put(logoutAction())
                logout()

                // reset('bottomTab')
                //navigateToScreen('bottomTab')
            }
        }
        else {
            yield put(loaderAction(false))
            showToast(saveQuesRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetProfileSaga() {
    try {
        yield takeLatest(TYPES.GET_PROFILE_ACTION, getProfile)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getProfile(param) {
    try {
        // yield put(loaderAction(true))
        const profileRes = yield apiRequest({}, GET_PROFILE_URL, method['GET'])

        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getProfileSuccessAction(profileRes['result']))
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

export function* GetCustomerDetailSaga() {
    try {
        yield takeLatest(TYPES.GET_CUSTOMER_DETAIL_ACTION, getCustomerDetail)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getCustomerDetail(param) {
    try {
        const profileRes = yield apiRequest({}, `${GET_CUSTOMER_DETAIL_URL}${param['payload']} `, method['GET'])

        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getOtherProfileDetailSuccessAction(profileRes['result']))
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

export function* GetSpDetailSaga() {
    try {
        yield takeLatest(TYPES.GET_SP_DETAIL_ACTION, getspDetail)
    }
    catch (err) {
        showToast('Error in get profile observer')
    }
}

function* getspDetail(param) {
    try {
        const profileRes = yield apiRequest({}, `${GET_SP_DETAIL_URL}${param['payload']} `, method['GET'])
        console.log('spprofilerespppp==>', JSON.stringify(profileRes['result']))
        if (profileRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(getProviderProfileSuccessAction(profileRes['result']['lstPortfolio']))
            yield put(getProviderCompleteProducts(profileRes['result']['Products']))
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


export function* SaveProfileSaga() {
    try {
        yield takeLatest(TYPES.SAVE_PROFILE_ACTION, saveProfile)
    }
    catch (err) {
        showToast('Error in save profile observer')
    }
}

function* saveProfile(param) {
    try {
        const saveProfileRes = yield apiRequest(param['payload'], SAVE_USER_PROFILE_URL, method['POST'], true)
        console.log('saveProfileRes==>', JSON.stringify(saveProfileRes))
        if (saveProfileRes['status'] === 200) {
            yield put(loaderAction(false))
            if (param?.callBack) param?.callBack()
            else navigateToScreen('tabZero')
        }
        else {
            yield put(loaderAction(false))
            showToast(saveProfileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}
export function* SaveProviderProfileSaga() {
    try {
        yield takeLatest(TYPES.SAVE_PROVIDER_PROFILE_ACTION, saveProviderProfile)
    }
    catch (err) {
        showToast('Error in save profile observer')
    }
}

function* saveProviderProfile(param) {
    try {
        yield put(loaderAction(true))
        const saveProfileRes = yield apiRequest(param['payload'], SAVE_PROVIDER_PROFILE_URL, method['POST'], true)

        if (saveProfileRes['status'] === 200) {
            yield put(loaderAction(false))
            navigateToScreen('tabZero')
        }
        else {
            yield put(loaderAction(false))
            showToast(saveProfileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SaveProviderPortfolioSaga() {
    try {
        yield takeLatest(TYPES.UPDATE_PORTFOLIO, saveProviderPortfolio)
    }
    catch (err) {
        showToast('Error in save profile observer')
    }
}

function* saveProviderPortfolio(param) {
    try {
        yield put(loaderAction(true))
        const saveProfileRes = yield apiRequest(param['payload'], SAVE_PROVIDER_PORTFOLIO_URL, method['POST'], true)

        if (saveProfileRes['status'] === 201) {
            yield put(loaderAction(false))
            showToast(saveProfileRes['message'])
            navigateToScreen('tabFour')

        }
        else {
            yield put(loaderAction(false))
            showToast(saveProfileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        //showToast(serviceError['CATCH_ERROR'])
    }
}

export function* DeleteProviderPortfolioSaga() {
    try {
        yield takeLatest(TYPES.DELETE_PORTFOLIO, deleteProviderPortfolio)
    }
    catch (err) {
        showToast('Error in save profile observer')
    }
}

function* deleteProviderPortfolio(param) {
    try {
        yield put(loaderAction(true))
        const saveProfileRes = yield apiRequest(param['payload'], DELETE_PROVIDER_PORTFOLIO_URL, method['POST'])

        if (saveProfileRes['status'] === 200) {
            yield put(loaderAction(false))
            navigateToScreen('tabFour')
        }
        else {
            yield put(loaderAction(false))
            showToast(saveProfileRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* ProviderProfileSetupThree() {
    try {
        yield takeLatest(TYPES.SAVE_CONTACT_DETAIL_ACTION, saveContactDetail)
    }
    catch (err) {
        showToast('Error in provider profile setup three observer')
    }
}

function* saveContactDetail(param) {
    try {
        yield put(loaderAction(true))
        const saveContactDetailRes = yield apiRequest(param['payload'], PROVIDER_PROFILE_SETUP_THREE_URL, method['POST'])

        if (saveContactDetailRes['status'] === 200) {
            yield put(loaderAction(false))
            showToast(saveContactDetailRes['message'])
            navigateToScreen('providerProfileSetupFour')
        }
        else {
            yield put(loaderAction(false))
            showToast(saveContactDetailRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* ProviderSaveDepositeFeesSaga() {
    try {
        yield takeLatest(TYPES.SAVE_DEPOSIT_FEES_ACTION, saveDepositeFees)
    }
    catch (err) {
        showToast('Error in profile two setup observer')
    }
}

function* saveDepositeFees(param) {
    try {
        yield put(loaderAction(true))
        const saveFeesRes = yield apiRequest(param['payload'], PROVIDER_PROFILE_SETUP_FOUR_URL, method['POST'])

        if (saveFeesRes['status'] === 200) {
            yield put(loaderAction(false))
            showToast(saveFeesRes['message'])
            navigateToScreen('providerProfessionSelection')
        }
        else {
            yield put(loaderAction(false))
            showToast(saveFeesRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetAllServicesSaga() {
    try {
        yield takeLatest(TYPES.GET_ALL_SERVIES_ACTION, getAllServices)
    }
    catch (err) {
        showToast('Error in profile two setup observer')
    }
}

function* getAllServices(param) {

    try {
        yield put(loaderAction(true))
        const getServicesRes = yield apiRequest({}, GET_HAIR_SERVICES_URL, method['GET'])

        if (getServicesRes['status'] === 200) {
            const newResult = getServicesRes['result'].map((item, index) => {
                if (index === 0) {
                    item['status'] = false
                }
                else {
                    item['status'] = false
                }
                return { ...item, value: item.ServiceName }
            })
            if (param?.callBack) param?.callBack(newResult)
            yield put(getAllServicesSuccessAction(newResult))
            yield put(loaderAction(false))

        }
        else {
            if (param?.callBack) param?.callBack()
            yield put(loaderAction(false))
            delay(500)
            showToast(getServicesRes['message'])
        }
    } catch (err) {
        if (param?.callBack) param?.callBack()
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}


export function* GetCustomServicesSaga() {
    try {
        yield takeLatest(TYPES.GET_CUSTOM_SERVICES_ACTION, getCustomServices)
    }
    catch (err) {
        showToast('Error in get saved services observer')
    }
}

function* getCustomServices(param) {
    try {

        const getServicesRes = yield apiRequest(param['payload'], SP_CUSTOM_SERVICES_URL, method['POST'])

        if (getServicesRes['status'] === 200) {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            const newResult = getServicesRes['result'].map((item, index) => {
                if (index === 0) {
                    item['status'] = false
                }
                else {
                    item['status'] = false
                }
                return item
            })
            yield put(getCustomServicesSuccessAction(newResult))
        }
        else {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            yield delay(600)
            showToast(getServicesRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(SearchloaderAction(false))
        yield delay(600)
        showToast(serviceError['CATCH_ERROR'])
    }
}

//SP Custtom Services

export function* GetSpCustomServicesSaga() {
    try {
        yield takeLatest(TYPES.GET_SP_CUSTOM_SERVICES_ACTION, getSpCustomServices)
    }
    catch (err) {
        showToast('Error in get saved services observer')
    }
}

function* getSpCustomServices(param) {
    try {
        yield put(loaderAction(true))
        yield put(loaderAction(true))
        const getServicesRes = yield apiRequest(param['payload'], MY_SP_CUSTOM_SERVICE_URL, method['POST'])
        if (getServicesRes['status'] === 200) {
            yield put(loaderAction(false))
            const newResult = getServicesRes['result'].map((item, index) => {
                if (index === 0) {
                    item['status'] = false
                }
                else {
                    item['status'] = false
                }
                return item
            })
            yield put(getSpCustomServiceSuccessAction(newResult))
        }
        else {
            yield put(loaderAction(false))
            yield put(SearchloaderAction(false))
            yield delay(600)
            showToast(getServicesRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield put(SearchloaderAction(false))
        yield delay(600)
        showToast(serviceError['CATCH_ERROR'])
    } finally {
        yield put(loaderAction(false))
    }
}

export function* AddCustomServicesSaga() {
    try {
        yield takeLatest(TYPES.ADD_CUSTOM_SERVICE_ACTION, addCustomService)
    }
    catch (err) {
        showToast('Error in get saved services observer')
    }
}

function* addCustomService(param) {
    try {
        yield put(loaderAction(true))
        const savePriceRes = yield apiRequest(param['payload'], ADD_CUSTOM_SERVICE_URL, method['POST'])

        if (savePriceRes['status'] === 200) {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(savePriceRes['message'], 2500)
            param['status'] ? navigateToScreen('customServiceList') : navigateToScreen('providerSetting')
        }
        else {
            yield put(loaderAction(false))
            yield delay(600)
            showToast(savePriceRes['message'], 2500)
        }
    } catch (err) {
        yield put(loaderAction(false))
        yield delay(600)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SaveServicesSaga() {
    try {
        yield takeLatest(TYPES.SAVE_SERVICE_ACTION, saveAllServices)
    }
    catch (err) {
        showToast('Error in save services setup observer')
    }
}

function* saveAllServices(param) {
    try {
        yield put(loaderAction(true))
        const saveServicesRes = yield apiRequest(param['payload'], SAVE_SERVICES_URL, method['POST'])

        if (saveServicesRes['status'] === 200) {
            yield put(loaderAction(false))
            delay(500)
            showToast(saveServicesRes['message'])
            navigateToScreen('providerProfileSetupSix')
        }
        else {
            yield put(loaderAction(false))
            delay(500)
            showToast(saveServicesRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* UpdateServicesSaga() {
    try {
        yield takeLatest(TYPES.CHANGE_SERVICE_ACTION, updateAllServices)
    }
    catch (err) {
        showToast('Error in save services setup observer')
    }
}

function* updateAllServices(param) {
    try {
        yield put(loaderAction(true))
        const saveServicesRes = yield apiRequest(param['payload'], SAVE_SERVICES_URL, method['POST'])

        if (saveServicesRes['status'] === 200) {
            yield put(loaderAction(false))
            delay(500)
            showToast(saveServicesRes['message'])
            navigateToScreen('updatePrice')
        }
        else {
            yield put(loaderAction(false))
            delay(500)
            showToast(saveServicesRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetSavedServicesSaga() {
    try {
        yield takeLatest(TYPES.GET_SAVES_SERVICES_ACTION, getSavedServices)
    }
    catch (err) {
        showToast('Error in get saved services observer')
    }
}

function* getSavedServices() {
    try {
        yield put(loaderAction(true))
        const getSavedRes = yield apiRequest({}, GET_SAVED_SERVICES_URL, method['GET'])

        if (getSavedRes['status'] === 200) {
            const newResult = getSavedRes['result'].map((item, index) => { return { ...item, status: false } })
            yield put(getSavedServicesSuccessAction(newResult))
            yield put(loaderAction(false))
            delay(500)
            showToast(getSavedRes['message'])
        }
        else {
            yield put(loaderAction(false))
            delay(500)
            showToast(getSavedRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SaveServicesPriceSaga() {
    try {
        yield takeLatest(TYPES.SAVE_SERVICES_PRICE_ACTION, saveServicesPrice)
    }
    catch (err) {
        showToast('Error in get saved services observer')
    }
}

function* saveServicesPrice(param) {
    try {
        yield put(loaderAction(true))
        const savePriceRes = yield apiRequest(param['payload'], SAVE_SERVICES_PRICE_URL, method['POST'])

        if (savePriceRes['status'] === 200) {
            yield put(updateSavedServicesAction([]))
            yield put(updateServicesAction([]))
            yield put(loaderAction(false))
            delay(500)
            showToast(savePriceRes['message'])
            navigateToScreen('websitelink')
        }
        else {
            yield put(loaderAction(false))
            delay(500)
            showToast(savePriceRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SaveLicenseSaga() {
    try {
        yield takeLatest(TYPES.SAVE_UPLOAD_LICENSE, saveLicense)
    }
    catch (err) {
        showToast('Error in get saved services observer')
    }
}

function* saveLicense(param) {
    try {
        yield put(loaderAction(true))
        const savePriceRes = yield apiRequest(param['payload'], SAVE_LICENSE, method['POST'], true)

        if (savePriceRes['status'] === 200) {
            yield put(loaderAction(false))
            delay(600)
            showToast(savePriceRes['message'])
            if (param['status']) {
                if (param?.callBack) param?.callBack(true)
            } else {
                navigateToScreen('tabZero')
            }
        }
        else {
            yield put(loaderAction(false))
            delay(500)
            showToast(savePriceRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* SaveEditServicesPriceSaga() {
    try {
        yield takeLatest(TYPES.SAVE_EDIT_SERVICES_PRICE_ACTION, saveEditServicesPrice)
    }
    catch (err) {
        showToast('Error in get saved services observer')
    }
}

function* saveEditServicesPrice(param) {
    try {
        yield put(loaderAction(true))
        const savePriceRes = yield apiRequest(param['payload'], SAVE_SERVICES_PRICE_URL, method['POST'])

        if (savePriceRes['status'] === 200) {
            yield put(updateSavedServicesAction([]))
            yield put(updateServicesAction([]))
            yield put(loaderAction(false))
            delay(200)
            showToast(savePriceRes['message'])
            navigateToScreen('tabFour')
        }
        else {
            yield put(loaderAction(false))
            delay(500)
            showToast(savePriceRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* OpenTimeSaga() {
    try {
        yield takeLatest(TYPES.OPENTIME_ACTION, opentime)
    }
    catch (err) {
        showToast('Error in get saved services observer')
    }
}

function* opentime(param) {
    try {
        yield put(loaderAction(true))
        const savePriceRes = yield apiRequest(param['payload'], OPEN_TIME_URL, method['POST'])

        if (savePriceRes['status'] === 200) {
            yield put(loaderAction(false))
            delay(500)
            showToast(savePriceRes['message'])
            navigateToScreen('uploadLicense')
        }
        else {
            yield put(loaderAction(false))
            delay(500)
            showToast(savePriceRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* NotificationListSaga() {
    try {
        yield takeLatest(TYPES.GET_NOTIFICATION_LIST_ACTION, notificaitonListCall)
    }
    catch (err) {
        showToast('Error in get notification list observer')
    }
}

function* notificaitonListCall(param) {
    try {
        const { payload, callBack } = param
        const notificationListResp = yield apiRequest({}, NOTIFICATION_LIST_URL(payload), method['GET'])
        if (notificationListResp['status'] === 200) {
            callBack(notificationListResp?.result?.Notificationlist)
        }
        else {
            showToast(notificationListResp['message'])
            callBack()
        }
    } catch (err) {
        showToast(serviceError['CATCH_ERROR'])
        callBack()
    }
}

export function* NotificationCountSaga() {
    try {
        yield takeLatest(TYPES.GET_NOTIFICATION_COUNT_ACTION, notificaitonCountCall)
    }
    catch (err) {
        showToast('Error in get notification count observer')
    }
}

function* notificaitonCountCall() {
    try {
        const notificationCountResp = yield apiRequest({}, NOTIFICATION_COUNT_URL, method['GET'])
        if (notificationCountResp['status'] === 200) {
            yield put(getNotificationCountSuccessAction(notificationCountResp.result.UnreadNotificationCount))
        }
        else {
            showToast(notificationCountResp['message'])
        }
    } catch (err) {
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetProfessionsListSaga() {
    try {
        yield takeLatest(TYPES.GET_PROFESSIONS_LIST_ACTION, getProfessionsList)
    }
    catch (err) {
        showToast('Error in profile two setup observer')
    }
}

function* getProfessionsList() {
    try {
        yield put(loaderAction(true))
        const professionsRes = yield apiRequest({}, GET_PROFESSIONS_LIST_URL, method['GET'])
        console.log('response proffes==>', JSON.stringify(professionsRes))
        if (professionsRes['status'] === 200) {
            yield put(getProfessionsListSuccessAction(professionsRes['result']['ProfessionalList']))
            yield put(loaderAction(false))
        } else {
            yield put(loaderAction(false))
            delay(500)
            showToast(professionsRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetServicesByProfessionSaga() {
    try {
        yield takeLatest(TYPES.GET_SERVICES_BY_PROFESSION_ACTION, getServicesByProfession)
    }
    catch (err) {
        showToast('Error in profile two setup observer')
    }
}

function* getServicesByProfession(param) {
    try {
        const { payload } = param
        yield put(loaderAction(true))
        const getServicesRes = yield apiRequest({}, GET_SERVICES_BY_PROFESSION_URL(payload), method['GET'])

        if (getServicesRes['status'] === 200) {
            const newResult = getServicesRes['result'].map((item, index) => {
                if (index === 0) {
                    item['status'] = false
                }
                else {
                    item['status'] = false
                }
                return item
            })
            yield put(getServicesByProfessionSuccessAction(newResult))
            yield put(loaderAction(false))

        }
        else {
            yield put(loaderAction(false))
            delay(500)
            showToast(getServicesRes['message'])
        }
    } catch (err) {
        yield put(loaderAction(false))
        delay(500)
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* AddProviderProfessionSaga() {
    try {
        yield takeLatest(TYPES.ADD_PROVIDER_PROFESSION_ACTION, addProviderProfession)
    }
    catch (err) {
        showToast('Error in get notification list observer')
    }
}

function* addProviderProfession(param) {
    try {
        const { payload } = param
        const professionResp = yield apiRequest({ "ProfessionalIds": payload.services }, ADD_PROVIDER_PROFESSION_URL, method['POST'])
        if (professionResp['status'] === 200) {
            if (payload.isSetupComplete) {
                navigateToScreen('allServices', { selectedServices: payload.services })
            } else {
                navigateToScreen('providerProfileSetupFive', { selectedServices: payload.services })
            }
        } else {
            showToast(professionResp['message'])
        }
    } catch (err) {
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* DeleteAccountSaga() {
    try {
        yield takeLatest(TYPES.DELETE_ACCOUNT_ACTION, deleteAccount)
    }
    catch (err) {
        showToast('Error in delete account observer')
    }
}

export function* deleteAccount(param) {
    try {
        const resp = yield apiRequest({}, DELETE_ACCOUNT_URL, method['POST'])
        if (resp['status'] === 200) {
            if (param?.callBack) param?.callBack(resp)
        } else {
            if (param?.callBack) param?.callBack()
            showToast(resp['message'])
        }
    } catch (error) {
        if (param?.callBack) param?.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}

export function* GetGenderSaga() {
    try {
        yield takeLatest(TYPES.GET_GENDER_ACTION, getGender)
    }
    catch (err) {
        showToast('Error in get gender observer')
    }
}

export function* getGender(param) {
    try {
        const resp = yield apiRequest({}, GET_GENDERS_URL, method['GET'])
        if (resp['status'] === 200) {
            if (param?.callBack) param?.callBack(resp)
        } else {
            if (param?.callBack) param?.callBack()
            showToast(resp['message'])
        }
    } catch (error) {
        if (param?.callBack) param?.callBack()
        showToast(serviceError['CATCH_ERROR'])
    }
}