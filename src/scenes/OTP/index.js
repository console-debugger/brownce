import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, KeyboardAwareScroll, MyText, MyView, OtpInput } from '../../components/customComponent'
import { dismissKeyboard, isAndroid, SCREEN_HEIGHT, showToast } from '../../components/helper'
import { otpVerificationAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { LIGHT_GRAY, THEME } from '../../utils/colors'
import styles from './styles'

// UI of OTP 
const OTP = ({ navigation, route }) => {

    const email = route['params'][0] || ''
    const status = route['params'][1] || ''
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { VERIFICATION_CODE, VERIFICATION_MESSAGE1, VERIFICATION_MESSAGE2, PLEASE_ENTER_OTP, SUBMIT, RESEND } = state['localeReducer']['locale']

    const fieldOneRef = useRef('one')
    const fieldTwoRef = useRef('two')
    const fieldThreeRef = useRef('three')
    const fieldFourRef = useRef('four')

    const [focus, setFocus] = useState({ focusOne: false, focusTwo: false, focusThree: false, focusFour: false })
    const [otpStatus, setOtpStatus] = useState({ fieldOne: false, fieldTwo: false, fieldThree: false, fieldFour: false })
    const [otp, setOtp] = useState({ fieldOne: '', fieldTwo: '', fieldThree: '', fieldFour: '' })

    // handle focus of input
    const _handleFocus = type => () => {
        if (type === 'one') setFocus({ ...focus, focusOne: true })
        else if (type === 'two') setFocus({ ...focus, focusTwo: true })
        else if (type === 'three') setFocus({ ...focus, focusThree: true })
        else setFocus({ ...focus, focusFour: true })
    }

    // handle onchange of input
    const _onChangeText = type => text => {
        text = text.trim()
        if (type === 'one') {
            setOtp({ ...otp, fieldOne: text })
            if (text.length === 1) {
                fieldTwoRef.current.focus()
                setOtpStatus({ ...otpStatus, fieldOne: true })
            }
            else setOtpStatus({ ...otpStatus, fieldOne: false })
        }
        else if (type === 'two') {
            setOtp({ ...otp, fieldTwo: text })
            if (text.length === 1) {
                fieldThreeRef.current.focus()
                setOtpStatus({ ...otpStatus, fieldTwo: true })
            }
            else setOtpStatus({ ...otpStatus, fieldTwo: false })
        }
        else if (type === 'three') {
            setOtp({ ...otp, fieldThree: text })
            if (text.length === 1) {
                fieldFourRef.current.focus()
                setOtpStatus({ ...otpStatus, fieldThree: true })
            }
            else setOtpStatus({ ...otpStatus, fieldThree: false })
        }
        else {
            setOtp({ ...otp, fieldFour: text })
            if (text.length === 1) {
                dismissKeyboard()
                setOtpStatus({ ...otpStatus, fieldFour: true })
            }
            else setOtpStatus({ ...otpStatus, fieldFour: false })
        }
    }

    // handle next focus of input
    const _focusToNext = type => () => {
        if (type === 'one') fieldTwoRef.current.focus()
        else if (type === 'two') fieldThreeRef.current.focus()
        else if (type === 'three') fieldFourRef.current.focus()
        else dismissKeyboard()
    }

    // handle key press of keyboard
    const _onKeyPress = type => ({ nativeEvent }) => {
        if (type === 'two') {
            nativeEvent['key'] === 'Backspace' && _backSpace(type)
        }
        else if (type === 'three') {
            nativeEvent['key'] === 'Backspace' && _backSpace(type)
        }
        else if (type === 'four') {
            nativeEvent['key'] === 'Backspace' && _backSpace(type)
        }
    }

    // handle backspace click
    const _backSpace = type => {
        if (type === 'two') {
            setOtp({ ...otp, fieldTwo: '' })
            fieldOneRef.current.focus()
            setOtpStatus({ ...otpStatus, fieldTwo: false })
        }
        else if (type === 'three') {
            setOtp({ ...otp, fieldThree: '' })
            fieldTwoRef.current.focus()
            setOtpStatus({ ...otpStatus, fieldThree: false })
        }
        else if (type === 'four') {
            setOtp({ ...otp, fieldFour: '' })
            fieldThreeRef.current.focus()
            setOtpStatus({ ...otpStatus, fieldFour: false })
        }
    }

    // validte otp before sending to server
    const _validateOtp = () => {
        if (otpStatus['fieldOne'] && otpStatus['fieldTwo'] && otpStatus['fieldThree'] && otpStatus['fieldFour']) {
            _verifyOtp()
        }
        else showToast(PLEASE_ENTER_OTP)
    }

    // verifying OTP
    const _verifyOtp = () => {
        const OTP = `${otp['fieldOne']}${otp['fieldTwo']}${otp['fieldThree']}${otp['fieldFour']}`
        const param = {
            [apiKey['EMAIL']]: email,
            [apiKey['OTP']]: OTP,
            [apiKey['DEVICE_TOKEN']]: 'test',
            [apiKey['DEVICE_TYPE']]: isAndroid ? 1 : 2
        }
        dispatch(otpVerificationAction(param, status))
    }

    const _closeKeyboard = () => dismissKeyboard

    return (
        <KeyboardAwareScroll mainContainer={styles['commonContainer']}>
            <MyText style={styles['mediumBoldText']} >{VERIFICATION_CODE}</MyText>
            <MyText style={styles['messageText']} >{VERIFICATION_MESSAGE1}</MyText>
            <MyView style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <MyText style={styles['messageText']} >{VERIFICATION_MESSAGE2}</MyText>
                <MyText style={styles['messageTextBold']} >{email}</MyText>
            </MyView>
            <MyView style={styles['otpView']}>
                <OtpInput
                    style={{ borderBottomColor: focus['focusOne'] ? THEME : LIGHT_GRAY, borderBottomWidth: focus['focusOne'] ? 2 : 1 }}
                    ref={fieldOneRef}
                    autoFocus={true}
                    onKeyPress={_onKeyPress('one')}
                    onFocus={_handleFocus('one')}
                    onSubmitEditing={_focusToNext('one')}
                    onChangeText={_onChangeText('one')}
                    blurOnSubmit={false}
                />
                <OtpInput
                    style={{ borderBottomColor: focus['focusTwo'] ? THEME : LIGHT_GRAY, borderBottomWidth: focus['focusTwo'] ? 2 : 1 }}
                    ref={fieldTwoRef}
                    onKeyPress={_onKeyPress('two')}
                    onFocus={_handleFocus('two')}
                    onSubmitEditing={_focusToNext('two')}
                    onChangeText={_onChangeText('two')}
                    blurOnSubmit={false}
                />
                <OtpInput
                    style={{ borderBottomColor: focus['focusThree'] ? THEME : LIGHT_GRAY, borderBottomWidth: focus['focusThree'] ? 2 : 1 }}
                    ref={fieldThreeRef}
                    onKeyPress={_onKeyPress('three')}
                    onFocus={_handleFocus('three')}
                    onSubmitEditing={_focusToNext('three')}
                    onChangeText={_onChangeText('three')}
                    blurOnSubmit={false}
                />
                <OtpInput
                    style={{ borderBottomColor: focus['focusFour'] ? THEME : LIGHT_GRAY, borderBottomWidth: focus['focusFour'] ? 2 : 1 }}
                    ref={fieldFourRef}
                    onKeyPress={_onKeyPress('four')}
                    onFocus={_handleFocus('four')}
                    onChangeText={_onChangeText('four')}
                    onSubmitEditing={_closeKeyboard}
                />
            </MyView>
            <Button title={SUBMIT} style={styles['buttonStyle']}
                onPress={_validateOtp}
            />
            <MyText style={[styles['messageText'], { marginVertical: SCREEN_HEIGHT * 0.01 }]} >{RESEND}</MyText>
        </KeyboardAwareScroll>
    )
}

export default OTP
