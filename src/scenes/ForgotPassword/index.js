import React, { useState } from 'react'
import { SafeArea, KeyboardAwareScroll, MyText, Input, Button, Loader } from '../../components/customComponent'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { validateEmail } from '../../utils/validation'
import { forgotPasswordAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'

// Forgot password UI
const ForgotPassword = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { EMAIL, NOT_RECEIVED, SEND_AGAIN, SUBMIT } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']
    const [email, setEmail] = useState('')
    const [emailError, setError] = useState('')

    const _onChangeText = text => { setEmail(text), setError('') }

    // validation before api call
    const _validate = () => {
        validateEmail(email).status ?
            _forgot()
            : setError(validateEmail(email).error)
    }

    // Forgot password api call
    const _forgot = () => {
        const param = {
            [apiKey.EMAIL]: email
        }
        dispatch(forgotPasswordAction(param, email))
    }

    return (
        <SafeArea>
            <KeyboardAwareScroll contentContainerStyle={styles['parentContainer']}>
                <Loader isVisible={loading} />
                <Input
                    styleContainer={styles['input']}
                    value={email}
                    placeholder={EMAIL}
                    onChangeText={_onChangeText}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    returnKeyType='done'
                    errorMessage={emailError || null}
                />
                <MyText onPress={_validate} style={styles['notReceived']}>{`${NOT_RECEIVED}?`} <MyText onPress={_validate} style={styles['sendAgain']}>{SEND_AGAIN}</MyText></MyText>
                <Button onPress={_validate} text={SUBMIT} style={styles['buttonStyle']} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ForgotPassword