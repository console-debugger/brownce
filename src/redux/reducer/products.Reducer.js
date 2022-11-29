import { CLEAR_MSG_CASE, CUSTOMER_PRODUCTS_SUCCESS_ACTION, DELETE_PRODUCT_SUCCESS_ACTION, GET_BRAND_CATEGORY_SUCCESS_ACTION, GET_BRAND_SUCCESS_ACTION, GET_CATEGORY_SUCCESS_ACTION, GET_MY_PRODUCT_LIST_SUCCESS_ACTION, } from '../action/type'

const initialState = {
    brandList: [],
    categoryList: [],
    spProducts: [],
    csProducts: [],
    messageCase: ''
}

export default productReducer = (state = initialState, action) => {
    const oldState = { ...state }
    const { type, payload } = action
    switch (type) {

        case CLEAR_MSG_CASE:
            return {
                ...oldState,
                messageCase: '',
            }
        case GET_BRAND_SUCCESS_ACTION:
            return {
                ...oldState,
                brandList: payload,
                messageCase: type
            }
        case GET_CATEGORY_SUCCESS_ACTION:
            return {
                ...oldState,
                categoryList: payload
            }
        case GET_MY_PRODUCT_LIST_SUCCESS_ACTION:
            return {
                ...oldState,
                spProducts: payload
            }
        case DELETE_PRODUCT_SUCCESS_ACTION:
            return {
                ...oldState,
                messageCase: type
            }
        case CUSTOMER_PRODUCTS_SUCCESS_ACTION:
            return {
                ...oldState,
                csProducts: payload
            }
    }
    return oldState
}
