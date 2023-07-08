import React, { useCallback, useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, Input, KeyboardAwareScroll, MyText, SafeArea } from '../../components/customComponent'
import { dismissKeyboard, SCREEN_HEIGHT } from '../../components/helper'
import { saveContactDetailAction, loaderAction, getSpDataStepAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { BLACK, LIGHT_BROWN, LIGHT_GRAY, LIGHT_WHITE } from '../../utils/colors'
import { validateEmail, validatePaypalEmail, validateMobileNo } from '../../utils/validation'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { navigateToScreen } from '../../navigation/rootNav'
import { dynamicSize } from '../../utils/responsive'

const TYPES = { PHONE: 'phone', EMAIL: 'email' }

// Provider profile setup UI
const ProviderProfileSetupThree = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { MY, CONTACT_DETAILS, PHONE, SUBMIT_YOUR_PHONE_NUMBER_WITH_COUNTRY_CODE, CONTINUE } = state['localeReducer']['locale']
    const { signupUserData } = state.profileReducer

    console.log('signupUserData==>', signupUserData)

    const initialFormField = {
        phone: '',
        email: ''
    }
    const initialError = {
        phoneError: '',
        emailError: ''
    }

    const [{ phone, email }, setFormField] = useState(initialFormField)
    const [{ phoneError, emailError }, setError] = useState(initialError)
    const [focus, setFocus] = useState(0)

    const emailRef = useRef('emailRef')

    useEffect(() => {
        setFormField(prevState => ({ ...prevState, phone: `${signupUserData[apiKey.COUNTRY_CODE]}${signupUserData[apiKey.PHONE]}` }))
    }, [signupUserData])

    const _focus = type => () => {
        if (type === TYPES['PHONE']) setFocus(1)
        else if (type === TYPES['EMAIL']) setFocus(2)
    }

    const _blur = () => setFocus(0)

    const _focusToNext = type => () => {
        if (type === TYPES['PHONE']) emailRef?.current?.focus()
        else if (type === TYPES['EMAIL']) dismissKeyboard()
    }

    const _onChangeText = type => text => {
        if (type === TYPES['PHONE']) { setFormField(prevState => ({ ...prevState, phone: text })), setError(prevState => ({ ...prevState, phoneError: '' })) }
        else if (type === TYPES['EMAIL']) { setFormField(prevState => ({ ...prevState, email: text })), setError(prevState => ({ ...prevState, emailError: '' })) }
    }

    const _validate = () => {
        validateMobileNo(phone).status ?
            validatePaypalEmail(email).status ?
                _register()
                : setError(prevError => ({ ...prevError, emailError: validateEmail(email).error }))
            : setError(prevError => ({ ...prevError, phoneError: validateMobileNo(phone).error }))
    }

    const _register = () => {
        const param = {
            [apiKey['CONTACT_NUMVER']]: phone,
            [apiKey['PAYPALID']]: email
        }
        dispatch(saveContactDetailAction(param))
    }

    const _complete_later = () => navigateToScreen('providerProfileSetupFour')

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.1 }]}>{`${MY}\n${CONTACT_DETAILS}`}</MyText>
                <Input
                    styleContainer={{ marginTop: SCREEN_HEIGHT * 0.04 }}
                    style={{ borderBottomColor: focus === 1 ? BLACK : LIGHT_GRAY }}
                    value={phone}
                    placeholder={PHONE}
                    keyboardType='phone-pad'
                    onChangeText={_onChangeText(TYPES['PHONE'])}
                    onFocus={_focus(TYPES['PHONE'])}
                    onBlur={_blur}
                    onSubmitEditing={_focusToNext(TYPES['PHONE'])}
                    noteText={SUBMIT_YOUR_PHONE_NUMBER_WITH_COUNTRY_CODE}
                    errorMessage={phoneError || null}
                    blurOnSubmit={false}
                    editable={!!!`${signupUserData[apiKey.COUNTRY_CODE]}${signupUserData[apiKey.PHONE]}`.trim()}
                />
                <Input
                    ref={emailRef}
                    style={{ borderBottomColor: focus === 2 ? BLACK : LIGHT_GRAY }}
                    onFocus={_focus(TYPES['EMAIL'])}
                    onBlur={_blur}
                    value={email}
                    placeholder={"Paypal Email"}
                    onChangeText={_onChangeText(TYPES['EMAIL'])}
                    onSubmitEditing={_focusToNext(TYPES['EMAIL'])}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    returnKeyType='done'
                    errorMessage={emailError || null}
                />
                <Button onPress={_validate} style={styles['buttonStyleCont']} text={CONTINUE} />
                <Button onPress={_complete_later} style={[styles['buttonStyleCont'], { backgroundColor: LIGHT_BROWN, marginTop: dynamicSize(-10) }]} text={'COMPLETE LATER'} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ProviderProfileSetupThree