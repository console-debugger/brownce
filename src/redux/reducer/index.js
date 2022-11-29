import { combineReducers } from 'redux';
import localeReducer from './locale.Reducer'
import loaderReducer from './loader.Reducer'
import addressReducer from './address.Reducer'
import hairReducer from './hair.Reducer'
import profileReducer from './profile.Reducer'
import subscriptionPlanReducer from './subscription.Reducer'
import productReducer from './products.Reducer'
import OrderReducer from './order.Reducer'
import { LOGOUT_ACTION } from '../action/type';

const appReducer = combineReducers({
    localeReducer,
    loaderReducer,
    addressReducer,
    hairReducer,
    profileReducer,
    subscriptionPlanReducer,
    productReducer,
    OrderReducer
})


const rootReducer = (state, action) => {
    if (action.type === LOGOUT_ACTION) {
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer