import en from '../../locale/en.json'
import { LANGUAGE } from '../action/type'

const initialState = {
    locale: en
}

export default localeReducer = (state = initialState, action) => {
    const oldState = { ...state }
    const { type, payload } = action

    switch (type) {
        case LANGUAGE: {
            if (payload === 'en') {
                return {
                    ...oldState,
                    locale: en
                }
            }
        }
        default: return { ...state }
    }
}