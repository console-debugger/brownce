import { CANCEL_SUBSCRIPTION_SUCCESS_ACTION, GET_SUBSCRIPTION_PLAN_SUCCESS_ACTION, UPDATE_SUBSCRIPTION_ACTION } from '../action/type'

const initialState = {
    subscriptionPlan: [],
    messageCase: ''
}

export default subscriptionPlanReducer = (state = initialState, action) => {
    const oldState = { ...state }
    const { type, payload } = action
    switch (type) {
        case GET_SUBSCRIPTION_PLAN_SUCCESS_ACTION:
            return {
                ...oldState,
                subscriptionPlan: payload,
                messageCase: type
            }
        case UPDATE_SUBSCRIPTION_ACTION:
            return {
                ...oldState,
                subscriptionPlan: payload
            }
        case CANCEL_SUBSCRIPTION_SUCCESS_ACTION:
            return {
                ...oldState,
                messageCase: type
            }
    }
    return oldState
}
