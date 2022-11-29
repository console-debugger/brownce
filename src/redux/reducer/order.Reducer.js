import { ADD_ORDER_SUCCESS_ACTION, CANCEL_ORDER_SUCCESS_ACTION, CLEAR_MSG_CASE, CUSTOMER_ORDERS_SUCCESS_ACTION, LOADER, MY_ADDRESS_SUCCESS_ACTION, ORDER_STATUS_SUCCESS_ACTION, POPUP, PROVIDER_ORDERS_SUCCESS_ACTION, SEARCHLOADER } from '../action/type'

const initialState = {
    myaddress: [],
    addorderDetails: [],
    customerorders: [],
    providerOrders: [],
    loading: false,
    isVisible: false,
    messageCase: '',
    searchloading: false
}

export default OrderReducer = (state = initialState, action) => {
    const oldState = { ...state }
    const { type, payload, message } = action
    switch (type) {
        case MY_ADDRESS_SUCCESS_ACTION:
            return {
                ...oldState,
                myaddress: payload,
                messageCase: type,
            }
        case CLEAR_MSG_CASE:
            return {
                ...oldState,
                messageCase: '',
            }
        case ADD_ORDER_SUCCESS_ACTION:
            return {
                ...oldState,
                addorderDetails: payload,
                messageCase: type,
            }
        case CUSTOMER_ORDERS_SUCCESS_ACTION:
            return {
                ...oldState,
                customerorders: payload,
                messageCase: type,
            }
        case PROVIDER_ORDERS_SUCCESS_ACTION:
            return {
                ...oldState,
                providerOrders: payload,
                messageCase: type,
            }
        case CANCEL_ORDER_SUCCESS_ACTION:
            return {
                ...oldState,
                messageCase: type,
            }
        case ORDER_STATUS_SUCCESS_ACTION:
            return {
                ...oldState,
                messageCase: type,
            }
    }
    return oldState
}
