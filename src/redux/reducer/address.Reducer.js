import { GET_CITY_LIST_BY_STATE_SUCCESS_ACTION, GET_COUNTRY_LIST_SUCCESS_ACTION, GET_STATE_LIST_BY_COUNTRY_SUCCESS_ACTION, LOADER, OTP_VIEW_ACTION } from '../action/type'

const initialState = {
    country: [],
    userState: [],
    city: [],
    otpText: ''
}

export default addressReducer = (state = initialState, action) => {
    const oldState = { ...state }
    const { type, payload } = action
    switch (type) {
        case OTP_VIEW_ACTION:
            return {
                ...oldState,
                otpText: payload
            }
        case GET_COUNTRY_LIST_SUCCESS_ACTION:
            return {
                ...oldState,
                country: payload,
                userState: [],
                city: []
            }
        case GET_STATE_LIST_BY_COUNTRY_SUCCESS_ACTION:
            return {
                ...oldState,
                userState: payload,
                city: []
            }
        case GET_CITY_LIST_BY_STATE_SUCCESS_ACTION:
            return {
                ...oldState,
                city: payload
            }
    }
    return oldState
}
