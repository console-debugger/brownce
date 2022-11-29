import React, { useState } from 'react'
import { SafeArea, KeyboardAwareScroll, Input, Button, Loader } from '../../components/customComponent'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { validatePassword } from '../../utils/validation'
import { resetPasswordAction } from '../../redux/action'

// Reset password UI
const ResetPassword = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { SUBMIT } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']

    const [password, setPassword] = useState('')
    const [passwordError, setError] = useState('')

    const _onChangeText = text => { setPassword(text), setError('') }

    const _validate = () => {
        validatePassword(password).status ?
            _resetpassword()
            : setError(validatePassword(password).error1)
    }

    const _resetpassword = () => {
        const param = {
            "Password": password
        }
        dispatch(resetPasswordAction(param))
    }
    return (
        <SafeArea>
            <KeyboardAwareScroll contentContainerStyle={styles['parentContainer']}>
                <Loader isVisible={loading} />
                <Input
                    styleContainer={styles['input']}
                    value={password}
                    placeholder={"New Password"}
                    onChangeText={_onChangeText}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    returnKeyType='done'
                    errorMessage={passwordError || null}
                />
                <Button onPress={_validate} text={SUBMIT} style={styles['buttonStyle']} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ResetPassword