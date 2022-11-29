import React, { useCallback } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, Input, KeyboardAwareScroll, MyImage, MyText, SafeArea } from '../../components/customComponent'
import { dismissKeyboard, SCREEN_HEIGHT, showToast } from '../../components/helper'
import { opentimeAction } from '../../redux/action'
import { BLACK, LIGHT_BROWN, LIGHT_GRAY, LIGHT_WHITE, PLACEHOLDER_COLOR } from '../../utils/colors'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import DateTimePicker from '../../components/datePicker'
import { timeIcon } from '../../components/icons'
import { montserratMedium } from '../../utils/fontFamily'
import { dynamicSize } from '../../utils/responsive'
import { navigateToScreen } from '../../navigation/rootNav'

const TYPES = { PHONE: 'phone', EMAIL: 'email' }

// Provider profile setup
const ProviderProfileSetupNine = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { MY, CONTINUE } = state['localeReducer']['locale']
    const [time, settime] = useState('')
    const [closetime, setclosetime] = useState('')

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

    const _focus = type => () => {
        if (type === TYPES['PHONE']) setFocus(1)
        else if (type === TYPES['EMAIL']) setFocus(2)
    }

    useFocusEffect(
        useCallback(() => {
            //  dispatch(loaderAction(true))
            //  dispatch(getSpDataStepAction(8))
        }, [])
    )
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
        time ?
            closetime ?
                _submit()
                : showToast('Please enter close time')
            : showToast('Please enter open time')
    }

    const _submit = () => {
        const param = {
            'WebLink': phone,
            'OpeningTime': time,
            'ClosingTime': closetime
        }
        dispatch(opentimeAction(param))
    }

    const _selectedTime = time => {
        settime(time)
    }

    const _selectedCloseTime = time => {
        setclosetime(time)
    }

    const _complete_later = () => navigateToScreen('uploadLicense')

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.1 }]}>{`${MY} ${'DETAILS'}`}</MyText>
                <Input
                    styleContainer={{ marginTop: SCREEN_HEIGHT * 0.04 }}
                    style={{ borderBottomColor: focus === 1 ? BLACK : LIGHT_GRAY }}
                    value={phone}
                    placeholder={'Website Link (Optional)'}
                    onChangeText={_onChangeText(TYPES['PHONE'])}
                    onFocus={_focus(TYPES['PHONE'])}
                    onBlur={_blur}
                    onSubmitEditing={_focusToNext(TYPES['PHONE'])}
                    errorMessage={phoneError || null}
                    blurOnSubmit={false}
                />
                <DateTimePicker
                    //is24={true}
                    //Locale={"en_GB"}
                    mode='time'
                    style={styles['picker']}
                    placeholder={'Open Time'}
                    selectedTime={_selectedTime}
                    textStyle={{
                        color: time ? BLACK : PLACEHOLDER_COLOR, right: 10, fontFamily: montserratMedium,
                    }}
                >
                    <MyImage source={timeIcon} />
                </DateTimePicker>
                <DateTimePicker
                    //is24={true}
                    //Locale={"en_GB"}
                    mode='time'
                    style={styles['picker']}
                    placeholder={'Close Time'}
                    selectedTime={_selectedCloseTime}
                    textStyle={{
                        color: time ? BLACK : PLACEHOLDER_COLOR, right: 10, fontFamily: montserratMedium,
                    }}
                >
                    <MyImage source={timeIcon} />
                </DateTimePicker>
                <Button onPress={_validate} style={styles['buttonStyleCont']} text={CONTINUE} />
                <Button onPress={_complete_later} style={[styles['buttonStyleCont'], { backgroundColor: LIGHT_BROWN, marginTop: dynamicSize(-10) }]} text={'COMPLETE LATER'} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ProviderProfileSetupNine