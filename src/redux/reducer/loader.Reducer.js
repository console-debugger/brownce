import { LOADER, POPUP, REFRESH_DATA_ACTION, SEARCHLOADER } from '../action/type'

const initialState = {
    loading: false,
    isVisible: false,
    message: '',
    searchloading: false,
    refreshData: false
}

export default loaderReducer = (state = initialState, action) => {
    const oldState = { ...state }
    const { type, payload, message } = action
    switch (type) {
        case LOADER:
            return {
                ...oldState,
                loading: payload
            }

        case SEARCHLOADER:
            return {
                ...oldState,
                searchloading: payload
            }
        case POPUP:
            return {
                ...oldState,
                isVisible: payload,
                message: message
            }
        case REFRESH_DATA_ACTION:
            return {
                ...oldState,
                refreshData: payload
            }
    }
    return oldState
}
