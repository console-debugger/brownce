import * as TYPES from './type'

export const loaderAction = payload => ({
    type: TYPES['LOADER'], payload
})

export const SearchloaderAction = payload => ({
    type: TYPES['SEARCHLOADER'], payload
})
export const popupAction = (payload, message) => ({
    type: TYPES['POPUP'], payload, message
})

export const refreshDataAction = payload => ({
    type: TYPES['REFRESH_DATA_ACTION'], payload
})

export const modalAction = payload => ({
    type: TYPES['MODAL_ACTION'], payload
})

export const logoutAction = () => ({
    type: TYPES['LOGOUT_ACTION']
})

export const languageAction = payload => ({
    type: TYPES['LANGUAGE'], payload
})

export const registrationAction = payload => ({
    type: TYPES['REGISTRATION_ACTION'], payload
})

export const otpViewAction = payload => ({
    type: TYPES['OTP_VIEW_ACTION'], payload
})

export const otpVerificationAction = (payload, status, isPhone) => ({
    type: TYPES['OTP_VERIFICATION_ACTION'], payload, status, isPhone
})

export const profileSetupOneAction = payload => ({
    type: TYPES['PROFILE_SETUP_ONE_ACTION'], payload
})

export const profileSetupTwoAction = payload => ({
    type: TYPES['PROFILE_SETUP_TWO_ACTION'], payload
})

export const getCountryListAction = () => ({
    type: TYPES['GET_COUNTRY_LIST_ACTION']
})

export const getCountryListSuccessAction = payload => ({
    type: TYPES['GET_COUNTRY_LIST_SUCCESS_ACTION'], payload
})

export const getStateListAction = payload => ({
    type: TYPES['GET_STATE_LIST_BY_COUNTRY_ACTION'], payload
})

export const getStateListSuccessAction = payload => ({
    type: TYPES['GET_STATE_LIST_BY_COUNTRY_SUCCESS_ACTION'], payload
})

export const getCityListAction = payload => ({
    type: TYPES['GET_CITY_LIST_BY_STATE_ACTION'], payload
})

export const getCityListSuccessAction = payload => ({
    type: TYPES['GET_CITY_LIST_BY_STATE_SUCCESS_ACTION'], payload
})

export const saveLocationAction = payload => ({
    type: TYPES['SAVE_LOCATION_ACTION'], payload
})

export const getHairTypeAction = (payload) => ({
    type: TYPES['GET_HAIR_TYPES_ACTION'], payload
})

export const getHairTypeSuccessAction = payload => ({
    type: TYPES['GET_HAIR_TYPES_SUCCESS_ACTION'], payload
})

export const updateHairTypeAction = payload => ({
    type: TYPES['UPDATE_HAIR_TYPES_ACTION'], payload
})

export const saveHairTypeAction = (payload) => ({
    type: TYPES['SAVE_HAIR_TYPE_ACTION'], payload
})

export const saveGenderAction = payload => ({
    type: TYPES['SAVE_GENDER_ACTION'], payload
})

export const getProfileQuestionAction = () => ({
    type: TYPES['GET_PROFILE_QUESTIONS_ACTION']
})

export const getProfileQuestionSuccessAction = payload => ({
    type: TYPES['GET_PROFILE_QUESTIONS_SUCCESS_ACTION'], payload
})

export const updateProfileQuestionAction = payload => ({
    type: TYPES['UPDATE_PROFILE_QIUESTION_ACTION'], payload
})

export const profileQuestionAnswerListAction = payload => ({
    type: TYPES['PROFILE_QUESTION_ANSWER_LIST'], payload
})

export const updateProfileQuestionAnswerListAction = payload => ({
    type: TYPES['UPDATE_PROFILE_QUESTION_ANSWER_LIST'], payload
})

export const saveQuestionAnswerAction = payload => ({
    type: TYPES['SAVE_QUESTION_ANSWER_ACTION'], payload
})

export const loginAction = (payload, isRemember) => ({
    type: TYPES['LOGIN_ACTION'], payload, isRemember
})

export const forgotPasswordAction = (payload, EmailOrPhone) => ({
    type: TYPES['FORGOT_PASSWORD_ACTION'], payload, EmailOrPhone
})

export const getProfileAction = () => ({
    type: TYPES['GET_PROFILE_ACTION']
})

export const getProfileSuccessAction = payload => ({
    type: TYPES['GET_PROFILE_SUCCESS_ACTION'], payload
})

export const getOtherProfileDetailSuccessAction = payload => ({
    type: TYPES.GET_OTHER_PROFILE_DETAIL_SUCCESS_ACTION, payload
})

export const getProviderProfileAction = () => ({
    type: TYPES['GET_PROVIDER_PROFILE_ACTION']
})

export const getProviderProfileSuccessAction = payload => ({
    type: TYPES['GET_PROVIDER_PROFILE_SUCCESS_ACTION'], payload
})

export const saveProfileAction = (payload, callBack) => ({
    type: TYPES['SAVE_PROFILE_ACTION'], payload, callBack
})

export const saveProviderPortfolioAction = payload => ({
    type: TYPES['UPDATE_PORTFOLIO'], payload
})
export const saveProviderProfileAction = payload => ({
    type: TYPES['SAVE_PROVIDER_PROFILE_ACTION'], payload
})
export const deleteProviderPortfolio = payload => ({
    type: TYPES['DELETE_PORTFOLIO'], payload
})

export const updateMyProfileQuestionAnswer = payload => ({
    type: TYPES['UPDATE_MY_QUESTION_ANSWER'], payload
})

export const saveContactDetailAction = payload => ({
    type: TYPES['SAVE_CONTACT_DETAIL_ACTION'], payload
})

export const saveDepositeFeesAction = payload => ({
    type: TYPES['SAVE_DEPOSIT_FEES_ACTION'], payload
})

export const getAllServicesAction = callBack => ({
    type: TYPES['GET_ALL_SERVIES_ACTION'], callBack
})

export const getAllServicesSuccessAction = payload => ({
    type: TYPES['GET_ALL_SERVIES_SUCCESS_ACTION'], payload
})

export const updateProfileSetupervicesAction = payload => ({
    type: TYPES['UPDATE_PROFILE_SETUP_SERVICES_ACTION'], payload
})

export const updateServicesAction = payload => ({
    type: TYPES['UPDATE_SERVICES_ACTION'], payload
})

export const updateProfileSetupCustomServicesAction = payload => ({
    type: TYPES['UPDATE_PROFILE_SETUP_CUSTOM_SERVICES_ACTION'], payload
})

export const updateCustomServicesAction = payload => ({
    type: TYPES['UPDATE_CUSTOM_SERVICES_ACTION'], payload
})

export const updateMaintainanceAction = payload => ({
    type: TYPES['UPDATE_MAINTAINANCE_ACTION'], payload
})

export const updatePriceRangeAction = payload => ({
    type: TYPES['UPDATE_PRICE_RANGE_ACTION'], payload
})

export const saveServiceAction = payload => ({
    type: TYPES['SAVE_SERVICE_ACTION'], payload
})

export const changeServiceAction = payload => ({
    type: TYPES['CHANGE_SERVICE_ACTION'], payload
})

export const getSubscriptionPlanAction = () => ({
    type: TYPES['GET_SUBSCRIPTION_PLAN_ACTION']
})

export const getSubscriptionPlanSuccessAction = payload => ({
    type: TYPES['GET_SUBSCRIPTION_PLAN_SUCCESS_ACTION'], payload
})

export const saveSubscriptionAction = (payload, status) => ({
    type: TYPES['SAVE_SUBSCRIPTION_ACTION'], payload, status
})

export const updateSubscriptionAction = payload => ({
    type: TYPES['UPDATE_SUBSCRIPTION_ACTION'], payload
})

export const getSavedServicesAction = () => ({
    type: TYPES['GET_SAVES_SERVICES_ACTION']
})

export const getSavedServicesSuccessAction = payload => ({
    type: TYPES['GET_SAVES_SERVICES_SUCCESS_ACTION'], payload
})

export const updateSavedServicesAction = payload => ({
    type: TYPES['UPDATE_SAVED_SERVICES_ACTION'], payload
})

export const saveServicesPriceAction = payload => ({
    type: TYPES['SAVE_SERVICES_PRICE_ACTION'], payload
})

export const saveEditServicesPriceAction = payload => ({
    type: TYPES['SAVE_EDIT_SERVICES_PRICE_ACTION'], payload
})

export const getProviderListAction = (payload, callBack) => ({
    type: TYPES['GET_PROVIDER_LIST_ACTION'], payload, callBack
})
export const getProviderListSuccesAction = payload => ({
    type: TYPES['GET_PROVIDER_LIST_SUCCESS_ACTION'], payload
})

export const getProviderCompleteDetailSuccesAction = payload => ({
    type: TYPES['GET_COMPLETE_PROVIDER_DETAIL_SUCCESS_ACTION'], payload
})

export const getProviderCompleteServices = payload => ({
    type: TYPES['GET_COMPLETE_PROVIDER_SERVICES'], payload
})

export const getProviderCompleteProducts = payload => ({
    type: TYPES['GET_COMPLETE_PROVIDER_PRODUCTS'], payload
})

export const saveBooking = payload => ({
    type: TYPES['SAVE_BOOKING_ACTION'], payload
})

export const getSupportAction = () => ({
    type: TYPES['GET_SUPPORT_INFO_ACTION'],
})

export const getSupportSuccessAction = payload => ({
    type: TYPES['GET_SUPPORT_INFO_SUCCESS_ACTION'], payload
})

export const getCustomerAppointementsAction = payload => ({
    type: TYPES['GET_CUSTOMER_APPOINTMENTS_ACTION'], payload
})

export const getCustomerAppointementsSuccessAction = payload => ({
    type: TYPES['GET_CUSTOMER_APPOINTMENTS_SUCCESS_ACTION'], payload
})

export const getCustomerAppointementsPastAction = payload => ({
    type: TYPES['GET_CUSTOMER_APPOINTMENTS_PAST_ACTION'], payload
})
export const getCustomerAppointementsUpcomingAction = payload => ({
    type: TYPES['GET_CUSTOMER_APPOINTMENTS_UPCOMING_ACTION'], payload
})
export const cancelAppointment = payload => ({
    type: TYPES['CANCEL_APPOINTMENT'], payload
})

export const getAllQuestionAction = (payload, callBack) => ({
    type: TYPES['GET_ALL_QUESTION_ACTION'], payload, callBack
})

export const getAllQuestionSuccessAction = payload => ({
    type: TYPES['GET_ALL_QUESTION_SUCCESSTION_ACTION'], payload
})

export const getProviderAppointmentAction = payload => ({
    type: TYPES['GET_PROVIDER_APPOINTMENT_ACTION'], payload
})

export const getProviderAppointmentSuccessAction = payload => ({
    type: TYPES['GET_PROVIDER_APPOINTMENT_SUCCESS_ACTION'], payload
})

export const getProviderAppointmentInprogressAction = payload => ({
    type: TYPES['GET_PROVIDER_APPOINTMENT_INPROGRESS_ACTION'], payload
})

export const getProviderAppointmentUpcomingAction = payload => ({
    type: TYPES['GET_PROVIDER_APPOINTMENT_UPCOMING_ACTION'], payload
})

export const getProviderAvailaibilityAction = payload => ({
    type: TYPES['GET_PROVIDER_AVAILAIBILITY_ACTION'], payload
})

export const saveLicenseAction = (payload, status, callBack) => ({
    type: TYPES['SAVE_UPLOAD_LICENSE'], payload, status, callBack
})

export const approverejectAction = payload => ({
    type: TYPES['APPROVE_REJECT_APPOINTMENT_ACTION'], payload
})

export const getSearchServiceAction = payload => ({
    type: TYPES['GET_SEARCH_SERVICES_ACTION'], payload
})

export const getSearchServiceSuccessAction = payload => ({
    type: TYPES['GET_SEARCH_SERVICES_SUCCESS_ACTION'], payload
})

export const getSearchMaintainanceSuccessAction = payload => ({
    type: TYPES['GET_SEARCH_MAINTAINANCE_SUCCESS_ACTION'], payload
})

export const getPriceRangeAction = () => ({
    type: TYPES['GET_PRICE_RANGE_ACTION'],
})

export const getPriceRangeSuccessAction = payload => ({
    type: TYPES['GET_PRICE_RANGE_SUCCESS_ACTION'], payload
})

export const SearchProviderAction = payload => ({
    type: TYPES['SAVE_SEARCH_PROVIDER_ACTION'], payload
})

export const SearchProviderSuccessAction = payload => ({
    type: TYPES['SAVE_SEARCH_PROVIDER_SUCCESS_ACTION'], payload
})

export const addQuestionAction = payload => ({
    type: TYPES['ADD_QUESTION_ACTION'], payload
})

export const deleteQuestionAction = (payload, callBack) => ({
    type: TYPES['DELETE_QUESTION_ACTION'], payload, callBack
})

export const deleteQuestionSuccessAction = payload => ({
    type: TYPES['DELETE_QUESTION_SUCCESS_ACTION'], payload
})

export const likeDislikeQuestionAction = (payload, callBack) => ({
    type: TYPES['LIKE_DISLIKE_QUESTION_ACTION'], payload, callBack
})

export const likeDislikeCommentAction = (payload, callBack) => ({
    type: TYPES['LIKE_DISLIKE_COMMENT_ACTION'], payload, callBack
})

export const likeDislikeQuestionSuccessAction = (payload) => ({
    type: TYPES['LIKE_DISLIKE_QUESTION_SUCCESS_ACTION'], payload
})

export const commonQuestionAction = () => ({
    type: TYPES['GET_COMMON_QUESTION_ACTION'],
})

export const commonQuestionSuccessAction = payload => ({
    type: TYPES['GET_COMMON_QUESTION_SUCCESS_ACTION'], payload
})

export const appointmentCompleteAction = payload => ({
    type: TYPES['MARK_APPOINTMENT_COMPLETE_ACTION'], payload
})


export const getHistoryAppointmentAction = () => ({
    type: TYPES['GET_HISTORY_APPOINTMENT_ACTION'],
})

export const getHistoryAppointmentSuccessAction = payload => ({
    type: TYPES['GET_HISTORY_APPOINTMENT_SUCCESS_ACTION'], payload
})

export const chatRoomAction = payload => ({
    type: TYPES['CHAT_ROOM_ACTION'], payload
})

export const chatRoomSuccessAction = payload => ({
    type: TYPES['CHAT_ROOM_SUCCESS_ACTION'], payload
})

export const providerBioAction = payload => ({
    type: TYPES['PROVIDER_BIO_ACTION'], payload
})

export const getSpDataStepAction = payload => ({
    type: TYPES['SP_DATA_STEP_ACTION'], payload
})

export const getSpDataStepSuccessAction = payload => ({
    type: TYPES['SP_DATA_STEP_SUCCESS_ACTION'], payload
})

export const getCsDataStepAction = payload => ({
    type: TYPES['CS_DATA_STEP_ACTION'], payload
})

export const getCsDataStepSuccessAction = payload => ({
    type: TYPES['CS_DATA_STEP_SUCCESS_ACTION'], payload
})

export const saveChatAction = payload => ({
    type: TYPES['SAVE_CHAT_ACTION'], payload
})

export const getChatMessagesAction = payload => ({
    type: TYPES['GET_CHAT_MESSAGE_ACTION'], payload
})

export const getChatMessagessuccessAction = payload => ({
    type: TYPES['GET_CHAT_MESSAGE_SUCCESS_ACTION'], payload
})

export const getChatListAction = () => ({
    type: TYPES['GET_CHAT_LIST_ACTION'],
})

export const getChatListSuccessAction = payload => ({
    type: TYPES['GET_CHAT_LIST_SUCCESS_ACTION'], payload
})

export const updateChatHistory = payload => ({
    type: TYPES['UPDATE_CHAT_MESSAGE_HISTORY_ACTION'], payload
})

export const clearMessageCase = () => ({
    type: TYPES['CLEAR_MSG_CASE']
})

export const commentAction = (payload, callBack) => ({
    type: TYPES['COMMENT_ACTION'], payload, callBack
})

export const appointmentDetailAction = payload => ({
    type: TYPES['APPOINTMENT_DETAIL_ACTION'], payload
})

export const appointmentDetailSuccessAction = payload => ({
    type: TYPES['APPOINTMENT_DETAIL_SUCCESS_ACTION'], payload
})

export const startServiceAction = payload => ({
    type: TYPES['START_SERVICE_ACTION'], payload
})

export const getRatingTypeAction = () => ({
    type: TYPES['GET_RATING_TYPES_ACTION'],
})

export const getRatingTypeSuccessAction = payload => ({
    type: TYPES['GET_RATING_TYPES_SUCCESS_ACTION'], payload
})


export const saveRatingAction = payload => ({
    type: TYPES['SAVE_RATING_ACTION'], payload
})

export const saveRatingSuccessAction = payload => ({
    type: TYPES['SAVE_RATING_SUCCESS_ACTION'], payload
})


export const getCommentsHistoryAction = payload => ({
    type: TYPES['GET_COMMENTS_HISTORY_ACTION'], payload
})

export const getCommentsHistorySuccessAction = payload => ({
    type: TYPES['GET_COMMENTS_HISTORY_SUCCESS_ACTION'], payload
})

export const updateCommentsHistoryAction = payload => ({
    type: TYPES['UPDATE_COMMENTS_HISTORY_ACTION'], payload
})


export const getMyFundsAction = () => ({
    type: TYPES['GET_MY_FUNDS_ACTION'],
})

export const getMyFundsSuccessAction = payload => ({
    type: TYPES['GET_MY_FUNDS_SUCCESS_ACTION'], payload
})


export const makePaymentAction = payload => ({
    type: TYPES['MAKE_PAYMENT_ACTION'], payload
})

export const makePaymentSuccessAction = payload => ({
    type: TYPES['MAKE_PAYMENT_SUCCESS_ACTION'], payload
})

export const getEarningsAction = payload => ({
    type: TYPES['GET_EARNINGS_ACTION'], payload
})

export const getEarningsSuccessAction = payload => ({
    type: TYPES['GET_EARNINGS_SUCCESS_ACTION'], payload
})


export const requestFundAction = payload => ({
    type: TYPES['REQUEST_FUNDS_ACTION'], payload
})

export const requestFundSuccessAction = payload => ({
    type: TYPES['REQUEST_FUND_SUCCESS_ACTION'], payload
})

export const resetPasswordAction = payload => ({
    type: TYPES['RESET_PASSWORD_ACTION'], payload
})

export const changePasswordAction = payload => ({
    type: TYPES['CHANGE_PASSWORD_ACTION'], payload
})

export const getFundListAction = payload => ({
    type: TYPES['GET_FUNDS_LIST_ACTION'], payload
})

export const getFundListSuccessAction = payload => ({
    type: TYPES['GET_FUNDS_LIST_SUCCESS_ACTION'], payload
})


export const markNotificationAsReadAction = () => ({
    type: TYPES['MARK_NOTIFICATION_AS_READ_ACTION']
})

export const getCmsAction = payload => ({
    type: TYPES['GET_CMS_ACTION'], payload
})


export const getCmsSuccessAction = payload => ({
    type: TYPES['GET_CMS_SUCCESS_ACTION'], payload
})

export const cancelSubscriptionAction = payload => ({
    type: TYPES['CANCEL_SUBSCRIPTION_ACTION'], payload
})

export const cancelSubscriptionSuccessAction = () => ({
    type: TYPES['CANCEL_SUBSCRIPTION_SUCCESS_ACTION'],
})


export const getCustomerDetailAction = payload => ({
    type: TYPES['GET_CUSTOMER_DETAIL_ACTION'], payload
})

export const getCustomerDetailSuccessAction = payload => ({
    type: TYPES['GET_CUSTOMER_DETAIL_SUCCESS_ACTION'], payload
})


export const getSpDetailAction = payload => ({
    type: TYPES['GET_SP_DETAIL_ACTION'], payload
})

export const getSpDetailSuccessAction = payload => ({
    type: TYPES['GET_SP_DETAIL_SUCCESS_ACTION'], payload
})

export const updateEmailAction = payload => ({
    type: TYPES['UPDATE_EMAIL_ACTION'], payload
})

export const validateEmailOtpAction = payload => ({
    type: TYPES['VALIDATE_EMAIL_OTP_ACTION'], payload
})

export const updateTenderHeadLevelAction = payload => ({
    type: TYPES['UPDATE_TENDER_HEAD_LEVEL_ACTION'], payload
})

export const getCustomServicesAction = payload => ({
    type: TYPES['GET_CUSTOM_SERVICES_ACTION'], payload
})

export const getCustomServicesSuccessAction = payload => ({
    type: TYPES['GET_CUSTOM_SERVICES_SUCCESS_ACTION'], payload
})

export const addCustomServiceAction = (payload, status) => ({
    type: TYPES['ADD_CUSTOM_SERVICE_ACTION'], payload, status
})

export const getSpCustomServicesAction = payload => ({
    type: TYPES['GET_SP_CUSTOM_SERVICES_ACTION'], payload
})

export const getSpCustomServiceSuccessAction = payload => ({
    type: TYPES['GET_SP_CUSTOM_SERVICES_SUCCESS_ACTION'], payload
})

export const addProductAction = payload => ({
    type: TYPES['ADD_PRODUCT_ACTION'], payload
})

export const getBrandCategoryAction = () => ({
    type: TYPES['GET_BRAND_CATEGORY_ACTION'],
})


export const getBrandSuccessAction = payload => ({
    type: TYPES['GET_BRAND_SUCCESS_ACTION'], payload
})

export const getCategorySuccessAction = payload => ({
    type: TYPES['GET_CATEGORY_SUCCESS_ACTION'], payload
})

export const getMyProductListAction = payload => ({
    type: TYPES['GET_MY_PRODUCT_LIST_ACTION'], payload
})

export const getMyProductListSuccessAction = payload => ({
    type: TYPES['GET_MY_PRODUCT_LIST_SUCCESS_ACTION'], payload
})

export const deleteProductAction = payload => ({
    type: TYPES['DELETE_PRODUCT_ACTION'], payload
})


export const deleteProductSuccessAction = payload => ({
    type: TYPES['DELETE_PRODUCT_SUCCESS_ACTION'], payload
})


export const customerProductAction = payload => ({
    type: TYPES['CUSTOMER_PRODUCTS_ACTION'], payload
})


export const customerProductSuccessAction = payload => ({
    type: TYPES['CUSTOMER_PRODUCTS_SUCCESS_ACTION'], payload
})


export const getCategorySearchAction = payload => ({
    type: TYPES['GET_CATEGORY_SEARCH_ACTION'], payload
})

export const getBrandSearchAction = payload => ({
    type: TYPES['GET_BRAND_SEARCH_ACTION'], payload
})

export const addOrderAction = (payload, status) => ({
    type: TYPES['ADD_ORDER_ACTION'], payload, status
})

export const addOrderSuccessAction = payload => ({
    type: TYPES['ADD_ORDER_SUCCESS_ACTION'], payload
})

export const myAddressAction = () => ({
    type: TYPES['MY_ADDRESS_ACTION'],
})

export const myAddressSuccessAction = payload => ({
    type: TYPES['MY_ADDRESS_SUCCESS_ACTION'], payload
})


export const customerOrderAction = payload => ({
    type: TYPES['CUSTOMER_ORDERS_ACTION'], payload
})

export const customerOrderSuccessAction = payload => ({
    type: TYPES['CUSTOMER_ORDERS_SUCCESS_ACTION'], payload
})

export const providerOrderAction = (payload, status) => ({
    type: TYPES['PROVIDER_ORDERS_ACTION'], payload, status
})

export const providerOrderSuccessAction = payload => ({
    type: TYPES['PROVIDER_ORDERS_SUCCESS_ACTION'], payload
})

export const paymentSaveAction = payload => ({
    type: TYPES['PAYMENT_SAVE_ACTION'], payload
})

export const markAsDeliveredAction = payload => ({
    type: TYPES['MARK_PRODUCT_DELEVERED_ACTION'], payload
})

export const cancelOrderAction = payload => ({
    type: TYPES['CANCEL_ORDER_ACTION'], payload
})

export const cancelOrderSuccessAction = () => ({
    type: TYPES['CANCEL_ORDER_SUCCESS_ACTION'],
})


export const addBrandNameAction = payload => ({
    type: TYPES['ADD_BRAND_NAME_ACTION'], payload
})

export const orderStatusAction = payload => ({
    type: TYPES['ORDER_STATUS_ACTION'], payload
})

export const orderStatusSuccessAction = () => ({
    type: TYPES['ORDER_STATUS_SUCCESS_ACTION'],
})


export const opentimeAction = payload => ({
    type: TYPES['OPENTIME_ACTION'], payload
})

export const deleteCommentAction = (payload, callBack) => ({
    type: TYPES.DELETE_COMMENT_ACTION, payload, callBack
})

export const getSuggestionsAction = payload => ({
    type: TYPES['GET_SUGGESTIONS_ACTION'], payload
})

export const getSuggestionsSuccessAction = (payload) => ({
    type: TYPES['GET_SUGGESTIONS_SUCCESS_ACTION'], payload
})

export const getNotificationListAction = (payload, callBack) => ({
    type: TYPES.GET_NOTIFICATION_LIST_ACTION, payload, callBack
})

export const getNotificationCountAction = () => ({
    type: TYPES.GET_NOTIFICATION_COUNT_ACTION
})

export const getNotificationCountSuccessAction = payload => ({
    type: TYPES.GET_NOTIFICATION_COUNT_SUCCESS_ACTION, payload
})

export const getQuestionByQuestionIdAction = (payload, callBack) => ({
    type: TYPES.GET_QUESTION_BY_ID_ACTION, payload, callBack
})

export const getProfessionsListAction = (payload, callBack) => ({
    type: TYPES.GET_PROFESSIONS_LIST_ACTION, payload, callBack
})

export const getProfessionsListSuccessAction = (payload, callBack) => ({
    type: TYPES.GET_PROFESSIONS_LIST_SUCCESS_ACTION, payload, callBack
})

export const updateServicePriceAction = (payload, callBack) => ({
    type: TYPES.UPDATE_SERVICE_PRICE_ACTION, payload, callBack
})

export const updateServicePriceSuccessAction = (payload, callBack) => ({
    type: TYPES.UPDATE_SERVICE_PRICE_SUCCESS_ACTION, payload, callBack
})

export const getServicesByProfessionAction = (payload, callBack) => ({
    type: TYPES.GET_SERVICES_BY_PROFESSION_ACTION, payload, callBack
})

export const getServicesByProfessionSuccessAction = (payload, callBack) => ({
    type: TYPES.GET_SERVICES_BY_PROFESSION_SUCCESS_ACTION, payload, callBack
})

export const addProviderProfessionAction = (payload, callBack) => ({
    type: TYPES.ADD_PROVIDER_PROFESSION_ACTION, payload, callBack
})

export const addProviderProfessionSuccessAction = (payload, callBack) => ({
    type: TYPES.ADD_PROVIDER_PROFESSION_ACTION_SUCCESS, payload, callBack
})

export const deleteAccountAction = (callBack) => ({
    type: TYPES.DELETE_ACCOUNT_ACTION, callBack
})

export const getFilterPriceListAction = (callBack) => ({
    type: TYPES.GET_FILTER_PRICE_LIST_ACTION, callBack
})

export const getAllCityListAction = (payload, callBack) => ({
    type: TYPES.GET_ALL_CITY_LIST_ACTION, payload, callBack
})

export const addRemoveProfileToFavourite = (payload, callBack) => ({
    type: TYPES.ADD_REMOVE_PROFILE_TO_FAVOURITE, payload, callBack
})

export const getfavProviderListAction = (payload, callBack) => ({
    type: TYPES.GET_FAV_PROVIDER_LIST_ACTION, payload, callBack
})

export const saveAppFeedbackAction = (payload, callBack) => ({
    type: TYPES.SAVE_APP_FEEDBACK_ACTION, payload, callBack
})

export const getBrownceStatsAction = (payload, callBack) => ({
    type: TYPES.GET_BROWNCE_STATS_ACTION, payload, callBack
})

export const checkSignupTypeAction = payload => ({
    type: TYPES.CHECK_SIGNUP_TYPE_ACTION, payload
})

export const signupUserDataAction = payload => ({
    type: TYPES.SIGNUP_USER_DATA_ACTION, payload
})

export const loginWithPhoneAction = (payload) => ({
    type: TYPES.LOGIN_WITH_PHONE_ACTION, payload
})

export const phoneLoginVerificationAction = (payload) => ({
    type: TYPES.PHONE_LOGIN_VERIFICATION_ACTION, payload
})

export const updateProviderSettingAction = (payload) => ({
    type: TYPES.UPDATE_PROVIDER_SETTINGS_ACTION, payload
})

export const updateServiceProviderProfilePicAction = (payload) => ({
    type: TYPES.UPDATE_SERVICE_PROVIDER_PROFILE_PIC_ACTION, payload
})

export const updateCustomerProfilePicAction = (payload, callBack) => ({
    type: TYPES.UPDATE_CUSTOMER_PROFILE_PIC_ACTION, payload, callBack
})

export const getGenderAction = (callBack) => ({
    type: TYPES.GET_GENDER_ACTION, callBack
})

export const getServicesListAction = (payload, callBack) => ({
    type: TYPES.GET_SERVICES_LIST_ACTION, payload, callBack
})

export const getProviderAllServicesListAction = (payload, callBack) => ({
    type: TYPES.GET_PROVIDER_ALL_SERVICES_ACTION, payload, callBack
})

export const getProviderAllProductsAction = (payload) => ({
    type: TYPES.GET_PROVIDER_PRODUCT_LIST_ACTION, payload
})