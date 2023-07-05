import React, { useState } from 'react'
import { SafeArea, KeyboardAwareScroll, MyText, Input, Button, Loader, Touchable, MyView, MobileInput } from '../../components/customComponent'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { validateEmail, validateMobileNoWithoutPlusSymbol } from '../../utils/validation'
import { forgotPasswordAction } from '../../redux/action'
import { DEFAULT_PHONE_COUNTRY, apiKey } from '../../services/serviceConstant'
import { LOGIN_TYPE } from '../Login'
import { montserratSemiBold } from '../../utils/fontFamily'
import MyCountryPicker from '../../components/countryCodePicker'
import { SCREEN_HEIGHT } from '../../components/helper'

// Forgot password UI
const TYPES = { EMAIL: 'email', PHONE: 'phone' }
const ForgotPassword = ({ navigation }) => {

    const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { EMAIL, NOT_RECEIVED, SEND_AGAIN, SUBMIT, PHONE, DIAL_CODE_NOT_AVAILABLE, PLEASE_ENTER_VALID_PHONE_NUMBER } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']
    const [email, setEmail] = useState('')
    const [emailError, setError] = useState('')
    const [selectedTab, setSelectedTab] = useState(LOGIN_TYPE.EMAIL)
    const [countryCodePickerVisible, setCountryCodePickerVisible] = useState(false)
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [calling_code, setCallingCode] = useState(DEFAULT_PHONE_COUNTRY.calling_code)
    const [country_code, setCountryCode] = useState(DEFAULT_PHONE_COUNTRY.country_code)

    const _onChangeText = type => text => {
        if (type == TYPES.EMAIL) {
            setEmail(text)
            setError('')
        }
        else if (type == TYPES.PHONE) {
            setPhone(text)
            setPhoneError('')
        }
    }

    const selectTab = type => () => {
        setSelectedTab(type)
    }

    const openPicker = () => {
        setCountryCodePickerVisible(true)
    }

    const closePicker = () => {
        setCountryCodePickerVisible(true)
    }

    const _onCountryPickerSelect = (data) => {
        console.log('dara===>', data)
        if (data['callingCode']?.[0]) {
            setCountryCode(data['cca2'])
            setCallingCode(data['callingCode']?.[0])
        }
        else showToast(DIAL_CODE_NOT_AVAILABLE)
    }

    // validation before api call
    const _validate = () => {
        if (selectedTab == LOGIN_TYPE.EMAIL) {
            validateEmail(email).status ?
                _forgot()
                : setError(validateEmail(email).error)
        }
        else {
            const number = phoneUtil.parseAndKeepRawInput(`${Number(calling_code)}${phone}`, country_code);
            const isValidNumber = phoneUtil.isValidNumberForRegion(number, country_code)
            validateMobileNoWithoutPlusSymbol(phone).status
                ? isValidNumber
                    ? _forgot()
                    : setError((prevError) => ({
                        ...prevError,
                        phoneError: PLEASE_ENTER_VALID_PHONE_NUMBER,
                    }))
                : setError((prevError) => ({
                    ...prevError,
                    phoneError: validateMobileNoWithoutPlusSymbol(phone).error,
                }))
        }
    }

    // Forgot password api call
    const _forgot = () => {
        const param = selectedTab == LOGIN_TYPE.EMAIL ?
            {
                [apiKey.EMAIL]: email
            } :
            {
                [apiKey['COUNTRY_CODE']]: calling_code,
                [apiKey['PHONE']]: phone
            }
        if (selectedTab == LOGIN_TYPE.EMAIL) dispatch(forgotPasswordAction(param, email))
        else dispatch(forgotPasswordAction(param, `${calling_code} ${phone}`, true))
    }

    return (
        <SafeArea>
            <KeyboardAwareScroll contentContainerStyle={styles['parentContainer']}>
                <Loader isVisible={loading} />
                <MyView style={styles.tabContainer}>
                    <Touchable
                        onPress={selectTab(LOGIN_TYPE.EMAIL)}
                        style={[styles.tabItem, selectedTab == LOGIN_TYPE.EMAIL ? styles.selectedBorder : styles.unSelectedBorder]}>
                        <MyText style={[styles.tabText, selectedTab == LOGIN_TYPE.EMAIL ? styles.selectedTabText : styles.unSelectedTabText]}>{EMAIL}</MyText>
                    </Touchable>
                    <Touchable
                        onPress={selectTab(LOGIN_TYPE.PHONE)}
                        style={[styles.tabItem, selectedTab == LOGIN_TYPE.PHONE ? styles.selectedBorder : styles.unSelectedBorder]}>
                        <MyText style={[styles.tabText, selectedTab == LOGIN_TYPE.PHONE ? styles.selectedTabText : styles.unSelectedTabText]}>{PHONE}</MyText>
                    </Touchable>
                </MyView>
                {selectedTab == LOGIN_TYPE.EMAIL ? <Input
                    styleContainer={styles['input']}
                    value={email}
                    placeholder={EMAIL}
                    onChangeText={_onChangeText(TYPES['EMAIL'])}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    returnKeyType='done'
                    errorMessage={emailError || null}
                />
                    :
                    <MobileInput
                        mainContainerStyle={{ marginTop: SCREEN_HEIGHT * 0.065, marginBottom: SCREEN_HEIGHT * 0.02 }}
                        style={{
                            height: null,
                            fontFamily: montserratSemiBold
                        }}
                        onPress={openPicker}
                        countryCode={calling_code}
                        value={phone}
                        placeholder={PHONE}
                        onChangeText={_onChangeText(TYPES['PHONE'])}
                        blurOnSubmit={true}
                        errorMessage={phoneError}
                    />
                }
                <MyText onPress={_validate} style={styles['notReceived']}>{`${NOT_RECEIVED}?`} <MyText onPress={_validate} style={styles['sendAgain']}>{SEND_AGAIN}</MyText></MyText>
                <Button onPress={_validate} text={SUBMIT} style={styles['buttonStyle']} />
                {countryCodePickerVisible &&
                    <MyCountryPicker
                        onSelect={_onCountryPickerSelect}
                        onClose={closePicker}
                        visible={countryCodePickerVisible} />}
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ForgotPassword