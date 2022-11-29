import React, { useState } from 'react'
import { SafeArea, KeyboardAwareScroll, Input, Button, Loader } from '../../components/customComponent'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { validateConfpassword, validateConfpassword1, validatePassword } from '../../utils/validation'
import { changePasswordAction } from '../../redux/action'

const TYPES = { OLDPASSWORD: 'oldpassword', PASSWORD: 'password', CONFIRMPASSWORD: "confirmpassword" }

// @ Chnage Password UI
const ChangePassword = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { SUBMIT } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']

    const initialFormField = {
        oldpassword: '',
        password: '',
        confPassword: ''
    }

    const initialError = {
        oldpasswordError: '',
        passwordError: '',
        confPasswordError: ''
    }

    const [{ oldpassword, password, confPassword }, setFormField] = useState(initialFormField)
    const [{ oldpasswordError, passwordError, confPasswordError }, setError] = useState(initialError)

    // @ Onchange of textinput
    const _onChangeText = type => text => {
        if (type === TYPES['OLDPASSWORD']) { setFormField(prevState => ({ ...prevState, oldpassword: text })), setError(prevState => ({ ...prevState, oldpasswordError: '' })) }
        else if (type === TYPES['PASSWORD']) { setFormField(prevState => ({ ...prevState, password: text })), setError(prevState => ({ ...prevState, passwordError: '' })) }
        else if (type === TYPES['CONFIRMPASSWORD']) { setFormField(prevState => ({ ...prevState, confPassword: text })), setError(prevState => ({ ...prevState, confPasswordError: '' })) }

    }

    // @ validate data
    const _validate = () => {
        oldpassword ?
            validatePassword(password).status ?
                validateConfpassword(password, confPassword).status ?
                    _resetpassword()
                    : setError(prevError => ({ ...prevError, confPasswordError: validateConfpassword1(password, confPassword).error }))
                : setError(prevError => ({ ...prevError, passwordError: validatePassword(password).error1 }))
            : setError(prevError => ({ ...prevError, oldpasswordError: "Please enter old password" }))
    }

    // @ Reset api call
    const _resetpassword = () => {
        const param = {
            "OldPassword": oldpassword,
            "Password": password
        }
        dispatch(changePasswordAction(param))
    }
    return (
        <SafeArea>
            <KeyboardAwareScroll contentContainerStyle={styles['parentContainer']}>
                <Loader isVisible={loading} />

                <Input
                    secureTextEntry={true}
                    styleContainer={styles['input']}
                    value={oldpassword}
                    placeholder={"Old Password"}
                    onChangeText={_onChangeText(TYPES['OLDPASSWORD'])}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    returnKeyType='done'
                    errorMessage={oldpasswordError || null}
                />
                <Input
                    secureTextEntry={true}
                    styleContainer={styles['input']}
                    value={password}
                    placeholder={"New Password"}
                    onChangeText={_onChangeText(TYPES['PASSWORD'])}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    returnKeyType='done'
                    errorMessage={passwordError || null}
                />

                <Input
                    secureTextEntry={true}
                    styleContainer={styles['input']}
                    value={confPassword}
                    placeholder={"Confirm Password"}
                    onChangeText={_onChangeText(TYPES['CONFIRMPASSWORD'])}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    returnKeyType='done'
                    errorMessage={confPasswordError || null}
                />
                <Button onPress={_validate} text={SUBMIT} style={styles['buttonStyle']} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ChangePassword