import { GET_ALL_SERVIES_SUCCESS_ACTION, GET_HAIR_TYPES_SUCCESS_ACTION, GET_SAVES_SERVICES_SUCCESS_ACTION, UPDATE_HAIR_TYPES_ACTION, UPDATE_SAVED_SERVICES_ACTION, UPDATE_SERVICES_ACTION, UPDATE_MAINTAINANCE_ACTION, UPDATE_PRICE_RANGE_ACTION, GET_CUSTOM_SERVICES_SUCCESS_ACTION, UPDATE_CUSTOM_SERVICES_ACTION, GET_SP_CUSTOM_SERVICES_SUCCESS_ACTION, GET_HAIR_TYPES_ACTION, UPDATE_PROFILE_SETUP_SERVICES_ACTION, UPDATE_PROFILE_SETUP_CUSTOM_SERVICES_ACTION, FIRST_TIME_ACTION, GET_PROFESSIONS_LIST_SUCCESS_ACTION, GET_SERVICES_BY_PROFESSION_SUCCESS_ACTION } from '../action/type'

const initialState = {
    hariTypes: [],
    services: [],
    allservices: [],
    selectedcustomservices: [],
    updatemaintainance: [],
    savedServices: [],
    updatepricerange: [],
    allcustomservices: [],
    customservices: [],
    spcustomservices: [],
    firsttimeStatus: true,
    professionsList: [],
    servicesByProfession: []
}

export default hairReducer = (state = initialState, action) => {
    const oldState = { ...state }
    const { type, payload } = action
    switch (type) {
        case FIRST_TIME_ACTION:
            return {
                ...oldState,
                firsttimeStatus: payload

            }
        case GET_HAIR_TYPES_SUCCESS_ACTION:
            return {
                ...oldState,
                hariTypes: payload,
                messageCase: type
            }
        case UPDATE_HAIR_TYPES_ACTION:
            return {
                ...oldState,
                hariTypes: payload
            }
        case GET_ALL_SERVIES_SUCCESS_ACTION:
            return {
                ...oldState,
                allservices: payload,
                messageCase: type
            }
        case GET_PROFESSIONS_LIST_SUCCESS_ACTION:
            return {
                ...oldState,
                professionsList: payload,
                messageCase: type
            }
        case GET_SERVICES_BY_PROFESSION_SUCCESS_ACTION:
            return {
                ...oldState,
                servicesByProfession: payload,
                messageCase: type
            }
        case GET_CUSTOM_SERVICES_SUCCESS_ACTION:
            return {
                ...oldState,
                allcustomservices: payload
            }

        case GET_SP_CUSTOM_SERVICES_SUCCESS_ACTION:
            return {
                ...oldState,
                spcustomservices: payload
            }
        case UPDATE_PROFILE_SETUP_SERVICES_ACTION:
            return {
                ...oldState,
                // allservices: payload,
                servicesByProfession: payload
            }
        case UPDATE_SERVICES_ACTION:
            return {
                ...oldState,
                services: payload,
            }

        case UPDATE_PROFILE_SETUP_CUSTOM_SERVICES_ACTION:
            return {
                ...oldState,
                allcustomservices: payload
            }
        case UPDATE_CUSTOM_SERVICES_ACTION:
            return {
                ...oldState,
                customservices: payload,
            }
        case UPDATE_MAINTAINANCE_ACTION:
            return {
                ...oldState,
                updatemaintainance: payload
            }
        case UPDATE_PRICE_RANGE_ACTION:
            return {
                ...oldState,
                updatepricerange: payload
            }
        case GET_SAVES_SERVICES_SUCCESS_ACTION:
            return {
                ...oldState,
                savedServices: payload
            }
        case UPDATE_SAVED_SERVICES_ACTION:
            return {
                ...oldState,
                savedServices: payload,
            }
    }
    return oldState
}
