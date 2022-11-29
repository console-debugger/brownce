import { createRef } from "react";
import { CommonActions } from '@react-navigation/native';
import { multiRemoveData } from "../components/helper";
import localKey from "../utils/localKey";
import { serviceConst } from "../services/serviceConstant";

export const navigationRef = createRef();

export const navigate = (name, params) => {
    navigationRef.current?.navigate(name, params);
}


export const navigateToScreen = (name, param) => {
    navigationRef?.current?.dispatch(
        CommonActions.navigate({
            name,
            params: param
        })
    )
}

export const reset = name => {
    navigationRef?.current?.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [
                { name: name }
            ],
        })
    )
}

export const logout = () => {
    console.log("Logging Out")
    multiRemoveData([localKey['LOGIN_TOKEN'], localKey['ROLE']])
    serviceConst['token'] = ''
    reset('auth')
}