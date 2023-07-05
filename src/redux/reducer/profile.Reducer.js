import { apiKey } from '../../services/serviceConstant'
import { GET_CUSTOMER_APPOINTMENTS_PAST_ACTION, GET_PROVIDER_LIST_SUCCESS_ACTION, GET_PROFILE_QUESTIONS_SUCCESS_ACTION, GET_PROFILE_SUCCESS_ACTION, LOADER, PROFILE_QUESTION_ANSWER_LIST, UPDATE_MY_QUESTION_ANSWER, UPDATE_PROFILE_QIUESTION_ACTION, UPDATE_PROFILE_QUESTION_ANSWER_LIST, GET_PROVIDER_PROFILE_SUCCESS_ACTION, GET_COMPLETE_PROVIDER_DETAIL_SUCCESS_ACTION, GET_COMPLETE_PROVIDER_SERVICES, GET_SUPPORT_INFO_SUCCESS_ACTION, GET_CUSTOMER_APPOINTMENTS_SUCCESS_ACTION, GET_ALL_QUESTION_SUCCESSTION_ACTION, GET_PROVIDER_APPOINTMENT_SUCCESS_ACTION, GET_SEARCH_SERVICES_SUCCESS_ACTION, GET_PRICE_RANGE_SUCCESS_ACTION, SAVE_SEARCH_PROVIDER_SUCCESS_ACTION, GET_COMMON_QUESTION_SUCCESS_ACTION, GET_SEARCH_MAINTAINANCE_SUCCESS_ACTION, GET_HISTORY_APPOINTMENT_SUCCESS_ACTION, GET_PROVIDER_APPOINTMENT_INPROGRESS_ACTION, CHAT_ROOM_SUCCESS_ACTION, SP_DATA_STEP_SUCCESS_ACTION, GET_CHAT_MESSAGE_SUCCESS_ACTION, GET_CHAT_LIST_SUCCESS_ACTION, UPDATE_CHAT_MESSAGE_HISTORY_ACTION, CLEAR_MSG_CASE, COMMENT_SUCCESS_ACTION, APPOINTMENT_DETAIL_SUCCESS_ACTION, GET_PROVIDER_APPOINTMENT_UPCOMING_ACTION, GET_CUSTOMER_APPOINTMENTS_UPCOMING_ACTION, GET_RATING_TYPES_SUCCESS_ACTION, GET_COMMENTS_HISTORY_SUCCESS_ACTION, GET_MY_FUNDS_SUCCESS_ACTION, GET_EARNINGS_ACTION, GET_EARNINGS_SUCCESS_ACTION, REQUEST_FUND_SUCCESS_ACTION, GET_FUNDS_LIST_SUCCESS_ACTION, GET_CMS_SUCCESS_ACTION, MAKE_PAYMENT_SUCCESS_ACTION, GET_COMPLETE_PROVIDER_PRODUCTS, UPDATE_COMMENTS_HISTORY_ACTION, GET_OTHER_PROFILE_DETAIL_SUCCESS_ACTION, DELETE_QUESTION_SUCCESS_ACTION, LIKE_DISLIKE_QUESTION_SUCCESS_ACTION, GET_SUGGESTIONS_SUCCESS_ACTION, GET_NOTIFICATION_COUNT_SUCCESS_ACTION, CHECK_SIGNUP_TYPE_ACTION, SIGNUP_USER_DATA_ACTION } from '../action/type'

const initialState = {
    profileQuestions: [],
    profileQuestionAnswer: [
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
        }
    ],
    profile: {},
    providerprofile: {},
    otherProfile: {},
    myQuestionAnswerList: [],
    editMyQuestionAnswerList: [],
    providerlist: [],
    supportList: [],
    completeproviderservices: [],
    completeproviderproducts: [],
    completeprovider: [],
    customerappointment: [],
    customerpastappointment: [],
    customerupcomingappointment: [],
    allquestion: [],
    commonquestion: [],
    providerappointment: [],
    inprogressappointment: [],
    upcomingappointment: [],
    searchproviderlist: [],
    searchservices: [],
    maintainance: [],
    history: [],
    room: '',
    spstepdata: [],
    messagesHistory: [],
    chatList: [],
    messageCase: '',
    comment: [],
    appointmentdetail: [],
    ratingtypes: [],
    commenthistory: [],
    funds: [],
    earnings: [],
    fundsList: [],
    cmsContent: {},
    suggestions: [],
    notificationCount: 0,
    signupType: 'email',
    signupUserData: {
        [apiKey.PHONE]: '',
        [apiKey.COUNTRY_CODE]: ''
    }
}

export default profileReducer = (state = initialState, action) => {
    const oldState = { ...state }
    const { type, payload } = action
    switch (type) {
        case GET_PROFILE_QUESTIONS_SUCCESS_ACTION:
            return {
                ...oldState,
                profileQuestions: payload
            }
        case UPDATE_PROFILE_QIUESTION_ACTION:
            return {
                ...oldState,
                profileQuestions: payload
            }
        case PROFILE_QUESTION_ANSWER_LIST:
            return {
                ...oldState,
                profileQuestionAnswer: payload
            }
        case UPDATE_PROFILE_QUESTION_ANSWER_LIST:
            return {
                ...oldState,
                profileQuestionAnswer: payload
            }
        case GET_PROFILE_SUCCESS_ACTION:
            return {
                ...oldState,
                profile: payload,
                myQuestionAnswerList: payload?.['ProfileQAs'] || [],
                editMyQuestionAnswerList: payload?.['ProfileQAs'] || [],
            }
        case GET_OTHER_PROFILE_DETAIL_SUCCESS_ACTION:
            return {
                ...oldState,
                otherProfile: payload,
                myQuestionAnswerList: payload?.['ProfileQAs'] || [],
                editMyQuestionAnswerList: payload?.['ProfileQAs'] || [],
            }
        case GET_PROVIDER_PROFILE_SUCCESS_ACTION:
            return {
                ...oldState,
                providerprofile: payload,
            }
        case GET_COMPLETE_PROVIDER_DETAIL_SUCCESS_ACTION:
            return {
                ...oldState,
                completeprovider: payload,
            }
        case GET_COMPLETE_PROVIDER_SERVICES:
            return {
                ...oldState,
                completeproviderservices: payload,
            }
        case GET_COMPLETE_PROVIDER_PRODUCTS:
            return {
                ...oldState,
                completeproviderproducts: payload,
            }
        case GET_CUSTOMER_APPOINTMENTS_SUCCESS_ACTION:
            return {
                ...oldState,
                customerappointment: payload,
            }
        case GET_CUSTOMER_APPOINTMENTS_PAST_ACTION:
            return {
                ...oldState,
                customerpastappointment: payload,
            }
        case GET_CUSTOMER_APPOINTMENTS_UPCOMING_ACTION:
            return {
                ...oldState,
                customerupcomingappointment: payload,
            }
        case GET_ALL_QUESTION_SUCCESSTION_ACTION:
            return {
                ...oldState,
                allquestion: payload,
            }
        case DELETE_QUESTION_SUCCESS_ACTION:
            return {
                ...oldState,
                allquestion: oldState.allquestion.filter(item => item.QuestionId !== payload),
            }
        case LIKE_DISLIKE_QUESTION_SUCCESS_ACTION:
            let arr = oldState.allquestion.map((item, index) => {
                if (item.QuestionId == payload.QuestionId) {
                    return {
                        ...item,
                        ['LikebyMe']: payload.status == 2 ? null : { status: payload.Status }
                    }
                } else {
                    return item
                }
            })

            return {
                ...oldState,
                allquestion: [...arr],
            }
        case GET_COMMON_QUESTION_SUCCESS_ACTION:
            return {
                ...oldState,
                commonquestion: payload,
            }
        case GET_PROVIDER_APPOINTMENT_SUCCESS_ACTION:
            return {
                ...oldState,
                providerappointment: payload,
            }
        case GET_PROVIDER_APPOINTMENT_INPROGRESS_ACTION:
            return {
                ...oldState,
                inprogressappointment: payload,
            }
        case GET_PROVIDER_APPOINTMENT_UPCOMING_ACTION:
            return {
                ...oldState,
                upcomingappointment: payload,
            }
        case UPDATE_MY_QUESTION_ANSWER:
            return {
                ...oldState,
                myQuestionAnswerList: payload
            }
        case GET_SUPPORT_INFO_SUCCESS_ACTION:
            return {
                ...oldState,
                supportList: payload
            }
        case GET_PROVIDER_LIST_SUCCESS_ACTION:
            return {
                ...oldState,
                providerlist: payload,
                messageCase: type
            }
        case GET_SEARCH_SERVICES_SUCCESS_ACTION:
            return {
                ...oldState,
                searchservices: payload,
            }
        case GET_SEARCH_MAINTAINANCE_SUCCESS_ACTION:
            return {
                ...oldState,
                maintainance: payload
            }
        case GET_PRICE_RANGE_SUCCESS_ACTION:
            return {
                ...oldState,
                pricerange: payload,
            }
        case SAVE_SEARCH_PROVIDER_SUCCESS_ACTION:
            return {
                ...oldState,
                searchproviderlist: payload,
            }
        case GET_HISTORY_APPOINTMENT_SUCCESS_ACTION:
            return {
                ...oldState,
                history: payload,
            }
        case CHAT_ROOM_SUCCESS_ACTION:
            return {
                ...oldState,
                room: payload,
            }
        case SP_DATA_STEP_SUCCESS_ACTION:
            return {
                ...oldState,
                spstepdata: payload,
            }
        case GET_CHAT_MESSAGE_SUCCESS_ACTION:
            return {
                ...oldState,
                messagesHistory: payload,
                messageCase: type
            }
        case UPDATE_CHAT_MESSAGE_HISTORY_ACTION:
            return {
                ...oldState,
                messagesHistory: [...oldState['messagesHistory'], payload],
            }
        case GET_CHAT_LIST_SUCCESS_ACTION:
            return {
                ...oldState,
                chatList: payload,
            }
        case CLEAR_MSG_CASE:
            return {
                ...oldState,
                messageCase: '',
                searchproviderlist: []
            }
        case MAKE_PAYMENT_SUCCESS_ACTION:
            return {
                ...oldState,
                messageCase: type
            }
        case COMMENT_SUCCESS_ACTION:
            return {
                ...oldState,
                comment: payload
            }
        case APPOINTMENT_DETAIL_SUCCESS_ACTION:
            return {
                ...oldState,
                appointmentdetail: payload
            }
        case GET_RATING_TYPES_SUCCESS_ACTION:
            return {
                ...oldState,
                ratingtypes: payload
            }
        case GET_COMMENTS_HISTORY_SUCCESS_ACTION:
            return {
                ...oldState,
                commenthistory: payload,
            }
        case UPDATE_COMMENTS_HISTORY_ACTION:
            return {
                ...oldState,
                commenthistory: [...oldState.commenthistory, payload]
            }
        case GET_MY_FUNDS_SUCCESS_ACTION:
            return {
                ...oldState,
                funds: payload
            }
        case GET_EARNINGS_SUCCESS_ACTION:
            return {
                ...oldState,
                earnings: payload
            }
        case REQUEST_FUND_SUCCESS_ACTION:
            return {
                ...oldState,
                messageCase: type
            }
        case GET_FUNDS_LIST_SUCCESS_ACTION:
            return {
                ...oldState,
                fundsList: payload,
                messageCase: type
            }
        case GET_CMS_SUCCESS_ACTION:
            return {
                ...oldState,
                cmsContent: payload
            }
        case GET_SUGGESTIONS_SUCCESS_ACTION:
            return {
                ...oldState,
                suggestions: payload
            }
        case GET_NOTIFICATION_COUNT_SUCCESS_ACTION:
            return {
                ...oldState,
                notificationCount: payload
            }
        case CHECK_SIGNUP_TYPE_ACTION:
            return {
                ...oldState,
                signupType: payload
            }
        case SIGNUP_USER_DATA_ACTION:
            return {
                ...oldState,
                signupUserData: {
                    [apiKey.PHONE]: payload[apiKey.PHONE],
                    [apiKey.COUNTRY_CODE]: payload[apiKey.COUNTRY_CODE]
                }
            }
    }
    return oldState
}
