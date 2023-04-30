import { Platform } from 'react-native'
import { BASE_URL } from './serviceConfig'

export const STATIC_URLS = {
    DYNAMIC_LINK_URL: 'https://brownceapp.page.link',
    BUNDLE_ID: Platform.select({ ios: 'com.brownceapp.brownce', android: 'com.browncecustomer' }),
    APP_STORE_ID: '1539118657'
}

export const serviceConst = {
    token: '',
    deviceToken: '',
    role: ''
}

export const method = {
    POST: 'POST',
    GET: 'GET',
    DELETE: "DELETE",
}

export const serviceError = {
    NETWORK_ERROR: 'Sorry, something went wrong, please try again in sometime.',
    CATCH_ERROR: 'Something went wrong, please try again'
}
export const token = "production_pghqn67m_w5y3myhv64sjgpz2" //production token
//export  const token = "sandbox_hcbk4ftm_wc53n2v46zgrss5n" // sandbox token

export const apiKey = {
    DESCRIPTION: "Description",
    USERNAME: 'Username',
    user_name: "UserName",
    FIRSTNAME: 'FirstName',
    LASTNAME: 'LastName',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    ROLE_ID: 'RoleId',
    OTP: 'OTP',
    DEVICE_TOKEN: 'DeviceToken',
    DEVICE_TYPE: 'DeviceType',
    PROFILE_PIC: 'ProfilePic',
    DOB: 'DOB',
    CITY_ID: 'CityId',
    CITY_NAME: 'CityName',
    COUNTRY_NAME: 'CountryName',
    LATITUDE: "Latitude",
    LONGITUDE: "Longitude",
    HAIR_TYPE_ID: 'HairTypeIds',
    TENDER_HEAD_LEVEL: 'TenderHeadLevel',
    GENDER: 'Gender',
    PROFILE_QUESTION_MASTER_ID: 'ProfileQuestionMasterId',
    ANSWER_TEXT: 'AnswerText',
    IS_UPDATE: 'IsUpdate',
    PROFILE_ANSWERS: 'ProfileAnswers',
    CONTACT_NUMVER: 'ContactNo',
    PAYPALID: 'PaypalId',
    DEPOSIT_FEES: 'DepositFee',
    SERVICE_ID: 'ServiceIds',
    SUBSCRIPTION_MASTER_ID: 'SubscriptionMasterId',
    SERVICE_MASTER_ID: 'ServiceMasterId',
    PRICE: 'Price',
    SP_SERVICE_MAPS: 'SpServiceMaps',
    SPId: "SPId",
    BookingDate: "BookingDate",
    BookingTime: "BookingTime",
    DepositFee: "DepositFee",
    Notes: "Notes",
    AppointmentId: "AppointmentId",
    SPPortfolioId: 'SPPortfolioId',
    DocName: "DocName",
    IsUpdate: "IsUpdate",
    SPServiceMapId: "SPServiceMapId",
    IsAvailable: "IsAvailable",
    AppointmentId: "AppointmentId",
    IsAccepted: "IsAccepted",
    CustomerId: "CustomerId",
    Lat: "Lat",
    Lng: "Lng",
    Distance: "Distance",
    PriceRange: "PriceRange",
    Hairstyles: "Hairstyles",
    Maintenance: "Maintenance",
    QuestionText: "QuestionText",
    searchString: "searchString",
    pageNo: "pageNo",
    pageSize: "pageSize",
    Description: "Description",
    Bio: "Bio",
    NounceId: "NounceId",
    SubsNouceId: "NonceId",
    SubsAmount: "SubsAmount",
    PlanId: 'PlanId',
    SubscriptionId: "SubscriptionId",
    isUpdate: "IsUpdate",
    Amount: "Amount"

}

export const REGISTRATION_URL = `${BASE_URL}/api/account/RegisterCustomer`
export const OTP_VERIFICATION_URL = `${BASE_URL}/api/account/validateotp`
export const PROFILE_SETUP_ONE_URL = `${BASE_URL}/api/customer/ProfileStep_Name`
export const PROFILE_SETUP_TWO_URL = `${BASE_URL}/api/customer/ProfileStep_DOB`
export const GET_COUNTRY_LIST_URL = `${BASE_URL}/api/common/GetCountires`
export const GET_STATE_LIST_URL = `${BASE_URL}/api/common/GetStatesByCountryId/`
export const GET_CITY_LIST_URL = `${BASE_URL}/api/common/GetCitiesByStateId/`
export const SETUP_LOCAION_URL = `${BASE_URL}/api/customer/ProfileStep_Location`
export const GET_HAIR_TYPE_URL = `${BASE_URL}/api/common/GetHairTypes`
export const SAVE_HAIR_TYPES_URL = `${BASE_URL}/api/customer/ProfileStep_HairType`
export const SAVE_GENDER_URL = `${BASE_URL}/api/customer/ProfileStep_Gender`
export const GET_ALL_PROFILE_QUESTION_URL = `${BASE_URL}/api/common/GetProfileQuestions`
export const SAVE_ALL_QUESTIONS_URL = `${BASE_URL}/api/customer/ProfileStep_FillProfileAns`
export const LOGIN_URL = `${BASE_URL}/api/account/login`
export const FORGOT_PASSWORD_URL = `${BASE_URL}/api/account/forgotpassword`
export const RESET_PASSWORD_URL = `${BASE_URL}/api/account/ResetPassword`
export const CHANGE_PASSWORD_URL = `${BASE_URL}/api/account/ChangePassword`
export const UPDATE_EMAIL_URL = `${BASE_URL}/api/account/UpdateEmailRequest`
export const APP_REMOVE_FAVOURITE_URl = `${BASE_URL}/api/FavoriteProvider/add-remove-favorite`

export const VALIDATE_EMAIL_OTP_URL = `${BASE_URL}/api/account/ValidateUpdateEmailRequest`

export const GET_PROFILE_URL = `${BASE_URL}/api/customer/GetUserProfile?`
export const GET_CUSTOMER_DETAIL_URL = `${BASE_URL}/api/SP/GetUserProfileByUserId?UserID=`
export const GET_SP_DETAIL_URL = `${BASE_URL}/api/customer/GetSPByUserId?UserId=`

export const GET_PROVIDER_PROFILE_URL = `${BASE_URL}/api/sp/GetProfile`

export const SAVE_BOOKING_URL = `${BASE_URL}/api/customer/BookAppointment`

export const GET_COMPLETE_PROVIDER_DETAIL_URL = `${BASE_URL}/api/customer/GetSPCompleteProfile/`
export const GET_FILTER_PRICE_LIST_URL = `${BASE_URL}/api/customer/GetPriceFilter`
export const GET_ALL_CITY_LIST_URL = (searchText) => `${BASE_URL}/api/common/GetCityBySearch?search=${searchText || ''}`

export const GET_PROVIDER_LIST_URL = `${BASE_URL}/api/customer/getsplist`

export const SAVE_USER_PROFILE_URL = `${BASE_URL}/api/customer/EditUserProfile`
export const SAVE_PROVIDER_PROFILE_URL = `${BASE_URL}/api/sp/EditProfile`
export const GET_REFERAL_CODE_URL = `${BASE_URL}/api/customer/GetMyReferral`
export const GET_SAVED_SERVICES_URL = `${BASE_URL}/api/common/GetServicesProvidedByUserId`

export const SAVE_PROVIDER_PORTFOLIO_URL = `${BASE_URL}/api/sp/AddPortfolioData`

export const DELETE_PROVIDER_PORTFOLIO_URL = `${BASE_URL}/api/sp/DeletePortfolioById`

export const PROVIDER_PROFILE_SETUP_ONE = `${BASE_URL}/api/sp/ProfileStep_Name`
export const PROVIDER_BIO_URL = `${BASE_URL}/api/sp/ProfileStep_Bio`

export const PROVIDER_SAVE_LOCATION_URL = `${BASE_URL}/api/sp/ProfileStep_Location`
export const PROVIDER_PROFILE_SETUP_THREE_URL = `${BASE_URL}/api/sp/ProfileStep_ContactDetails`
export const PROVIDER_PROFILE_SETUP_FOUR_URL = `${BASE_URL}/api/sp/ProfileStep_DepositFee`

export const GET_HAIR_SERVICES_URL = `${BASE_URL}/api/common/GetAllServices`
export const SAVE_SERVICES_URL = `${BASE_URL}/api/sp/ProfileStep_Services`
export const GET_SUBSCRIPTION_PLAN_URL = `${BASE_URL}/api/sp/GetSubscriptionsPlans`
// export const SAVE_SUBSCRIPTION_URL = `${BASE_URL}/api/sp/ProfileStep_Subscription`
export const SAVE_SUBSCRIPTION_URL = `${BASE_URL}/api/Transaction/SaveAddMob_InAppPurchase`
export const SAVE_SERVICES_PRICE_URL = `${BASE_URL}/api/sp/ProfileStep_AddServicePrice`

export const GET_SUPPORT_URL = `${BASE_URL}/api/common/GetSupportInfo`

export const GET_CUSTOMER_INPROGRESS_APT = `${BASE_URL}/api/customer/GetMyAppointments/`

export const CANCEL_APPOINTMENT = `${BASE_URL}/api/customer/CancelAppointment`

export const ALL_QUESTION_URL = `${BASE_URL}/API/qa/GetAllQuestions?`

export const ALL_QUESTION_SEARCH_URL = `${BASE_URL}/api/common/getallquestions?searchString=`

export const COMMON_QUESTION_URL = `${BASE_URL}/api/account/GetMyQuestions`

export const ADD_QUESTION_URL = `${BASE_URL}/api/qa/AddUpdateQuestion`

export const DELETE_QUESTION_URL = `${BASE_URL}/API/qa/DeleteQuestion?QuestionId=`

export const LIKE_DISLIKE_QUESTION_URL = `${BASE_URL}/API/qa/AddUpdateQuestionLikeDislike`

export const LIKE_DISLIKE_COMMENT_URL = `${BASE_URL}/API/qa/AddUpdateCommentLikeDislike`

export const GET_PROVIDER_APPOINTMENT_URL = `${BASE_URL}/api/spappointment/GetMyAppointments/`

export const SAVE_AVAILABILITY_URL = `${BASE_URL}/api/sp/SetAvailability`

export const SAVE_LICENSE = `${BASE_URL}/api/sp/ProfileStep_Document`

export const APPROVE_REJECT_URL = `${BASE_URL}/api/spappointment/ApproveRejectAppointment`

export const SEARCH_SERVICES_URL = `${BASE_URL}/api/common/GetServicesByType/`

export const PRICE_RANGE_URL = `${BASE_URL}/api/common/GetPriceRanges`

export const SEARCH_PROVIDER_URL = `${BASE_URL}/api/search/SearchSpByParams`

export const APPOINTMENT_COMPLETE_URL = `${BASE_URL}/api/spappointment/MarkAppointmentAsComplete`

export const APPOINTMENT_HISTORY_URL = `${BASE_URL}/api/spappointment/GetCompletedAppointments`

export const CHAT_ROOM_URL = `${BASE_URL}/api/Chat/CreateRoom`

export const SP_DATA_STEP_URL = `${BASE_URL}/api/sp/UserDataByStep/`

export const CS_DATA_STEP_URL = `${BASE_URL}/api/customer/UserDataByStep/`

export const SAVE_CHAT_URL = `${BASE_URL}/api/Chat/SendMessage`

export const GET_CHAT_MESSAGES_URL = `${BASE_URL}/api/Chat/GetMessages`

export const GET_CHAT_LIST_URL = `${BASE_URL}/api/chat/GetChatList`

export const COMMENT_URL = `${BASE_URL}/API/qa/Comment`

// export const COMMENT_HISTORY_URL = `${BASE_URL}/api/QA/GetQuestionWithCommentReply`
export const COMMENT_HISTORY_URL = `${BASE_URL}/API/qa/GetQuestionCommentList?`

export const APPOINTMENT_DETAIL_URL = `${BASE_URL}/api/common/GetAppointmentDetailById/`

export const START_SERVICE_URL = `${BASE_URL}/api/spappointment/StartAppointmentService`

export const RATING_TYPE_URL = `${BASE_URL}/api/rating/GetAllRatingTypes`

export const RATING_SAVE_URL = `${BASE_URL}/api/rating/SubmitReview`

export const GET_FUNDS_URL = `${BASE_URL}/api/Transaction/GetMyFunds`

export const MAKE_PAYMENT_URL = `${BASE_URL}/api/transaction/MakePayment`

export const EARNINGS_URL = `${BASE_URL}/api/Transaction/GetMyEarning`

export const REQUEST_FUND_URL = `${BASE_URL}/api/sp/RequestForFunds`

export const FUND_LIST_URL = `${BASE_URL}/api/sp/GetFundRequestList`

export const NOTIFICATION_READ_URL = `${BASE_URL}/api/notificationapp/MarkChatsAsRead`

export const CMS_URL = `${BASE_URL}/api/common/GetCMSContentByType/`

export const CANCEL_PLAN_URL = `${BASE_URL}/api/sp/CancelSubscription`

export const UPDATE_TENDER_HEAD_LEVEL_URL = `${BASE_URL}/api/Customer/UpdateTenderHeadLevel`

export const SP_CUSTOM_SERVICES_URL = `${BASE_URL}/api/Sp/GetCustomServices`

export const ADD_CUSTOM_SERVICE_URL = `${BASE_URL}/api/Sp/AddUpdateCustomService`

export const MY_SP_CUSTOM_SERVICE_URL = `${BASE_URL}/api/Sp/GetMyCustomServices`

export const GET_BRAND_CATEGORY_URL = `${BASE_URL}/API/Products/GetDropdownlist`

export const ADD_PRODUCT_URL = `${BASE_URL}/API/Products/AddUpdateProduct`

export const MY_PRODUCT_URL = `${BASE_URL}/API/Products/GetMyProductList`

export const DELETE_PRODUCT_URL = `${BASE_URL}/API/Products/DeleteProduct?Id=`

export const CUSTOMER_PRODUCT_URL = `${BASE_URL}/API/Products/GetProductListHomeCustomer`

export const GET_CATEGORY_SEARCH_URL = `${BASE_URL}/API/Products/GetCategorylist`

export const GET_BRAND_SEARCH_URL = `${BASE_URL}/API/Products/GetBrandList`

export const ADD_ORDER_URL = `${BASE_URL}/API/ProductOrders/AddOrder`

export const MY_ADDRESS_URL = `${BASE_URL}/API/ProductOrders/GetMyAddress`

export const CUSTOMER_ORDERS_URL = `${BASE_URL}/API/ProductOrders/GetProductOrderListingCustomer`

export const PROVIDER_ORDERS_URL = `${BASE_URL}/API/ProductOrders/GetProductOrderListingProvider`

export const MARK_AS_DELIVERED_URL = `${BASE_URL}/API/ProductOrders/OrderDeliverd`

export const CANCEL_ORDER_URL = `${BASE_URL}/API/ProductOrders/CancelOrder`

export const PAYMENT_SAVE_URL = `${BASE_URL}/API/ProductOrders/SavePayment`

export const ADD_BRAND_NAME_URL = `${BASE_URL}/API/Products/AddUpdateBrandName`

export const ORDER_STATUS_URL = `${BASE_URL}/API/ProductOrders/ChangeOrderStatus`

export const NEW_ORDER_URL = `${BASE_URL}/API/ProductOrders/GetNewProductOrder`

export const OPEN_TIME_URL = `${BASE_URL}/API/sp/ProfileStep_OpenCloseTime`

export const DELETE_COMMENT_URL = `${BASE_URL}/API/qa/DeleteComment?QuestionCommentId=`

export const GET_SUGGESTIONS_URL = `${BASE_URL}/API/qa/GetUserlistToMentionInShopTalk?`

export const NOTIFICATION_LIST_URL = pageNumber => `${BASE_URL}/api/account/GetUserNotificationlist?PageNo=${pageNumber}&RecordsPerPage=20`

export const NOTIFICATION_COUNT_URL = `${BASE_URL}/api/account/GetUserDashboardCountData`

export const UPDATE_SERVICE_PRICE_URL = `${BASE_URL}/api/SPAppointment/UpdateAppointmentServicePrice`

export const GET_PROFESSIONS_LIST_URL = `${BASE_URL}/api/sp/GetProfessionalList`

export const GET_SERVICES_BY_PROFESSION_URL = data => {
    let str = ''
    data.forEach((element, index) => {
        2 < 1
        str += index < data.length - 1 ? `ProfessionIds=${element}&` : `ProfessionIds=${element}`
    });
    return `${BASE_URL}/api/sp/GetServicesByProfessionIds?${str}`
}

export const ADD_PROVIDER_PROFESSION_URL = `${BASE_URL}/api/sp/AddProviderProfessionals`
export const DELETE_ACCOUNT_URL = `${BASE_URL}/api/account/DeleteAccount`

export const FAV_PROVIDER_LIST_URL = (data) => `${BASE_URL}/APi/FavoriteProvider/favorite-providers?pageno=${data.page}&recordsPerPage=20`

export const SAVE_APP_FEEDBACK_URL = `${BASE_URL}/api/AppFeedback/addfeedback`