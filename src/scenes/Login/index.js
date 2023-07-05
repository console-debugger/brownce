import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import { MyView, Button, SafeArea, Input, KeyboardAwareScroll, MyImage, Selection, MyText, Loader, CustomModal, Touchable, MobileInput } from '../../components/customComponent'
import { SCREEN_WIDTH, dismissKeyboard, getData, isAndroid, isCustomer, logAnalyticEvent, showToast, storeData } from '../../components/helper'
import { activeCheckIcon, activeEmail, inactivePassword, logo, uncheckBox } from '../../components/icons'
import { LIGHT_GRAY, BLACK, LIGHT_WHITE, TRANSPARENT_BLACK } from '../../utils/colors'
import commonStyle from '../../components/commonStyle'
import { requireEmail, requirePassword, validateMobileNoWithoutPlusSymbol, } from '../../utils/validation'
import { DEFAULT_PHONE_COUNTRY, apiKey, serviceConst } from '../../services/serviceConstant'
import styles from './styles'
import { checkSignupTypeAction, loginAction, loginWithPhoneAction, popupAction } from '../../redux/action'
import localKey from '../../utils/localKey'
import { ApprovalPopup } from '../../components/alert'
import { useFocusEffect } from '@react-navigation/native';
import { LOGIN_PAGE } from '../../components/eventName';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import { montserratSemiBold } from '../../utils/fontFamily';
import MyCountryPicker from '../../components/countryCodePicker';

// @ types of input field
const TYPES = { EMAIL: 'email', PASSWORD: 'password', PHONE: 'phone' }
export const LOGIN_TYPE = { EMAIL: 'email', PHONE: 'phone' }

//@ login UI design
const Login = ({ navigation }) => {

    const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { LOGIN, EMAIL, PASSWORD, REMEMBER_ME, PLEASE_ENTER_VALID_PHONE_NUMBER, DIAL_CODE_NOT_AVAILABLE, FORGOT_PASSWORD, DONT_HAVE_AN_ACCOUNT, SIGNUP, CONTINUE_WITH_PHONE, CONTINUE_WITH_EMAIL, PHONE, CONTINUE } = state['localeReducer']['locale']
    const { loading, isVisible, message } = state['loaderReducer']

    const passwordRef = useRef('passwordRef')

    const initialFormField = {
        email: '',
        password: '',
        visible: false,
        phone: '',
        countryPickerVisible: false,
        country_code: '',
        calling_code: '',
    }

    const initialError = {
        emailError: '',
        passwordError: '',
        phoneError: ''
    }

    const [{ email, password, visible, phone, countryPickerVisible, country_code = DEFAULT_PHONE_COUNTRY.country_code, calling_code = DEFAULT_PHONE_COUNTRY.calling_code }, setFormField] = useState(initialFormField)
    const [{ emailError, passwordError, phoneError }, setError] = useState(initialError)
    const [focus, setFocus] = useState(-1)
    const [isremember, setRememberMe] = useState(false)
    const [selectedTab, setSelectedTab] = useState(LOGIN_TYPE.EMAIL)

    // console.log('email==>', email, password)

    useFocusEffect(
        useCallback(() => {
            logAnalyticEvent(LOGIN_PAGE, {
                id: 11,
                data: 'Landed on login page'
            })
        }, [])
    )

    useEffect(() => {
        // if user selected remember me, then fetch data from local storage
        const fetchRememberMe = async () => {
            const localEmail = await getData(localKey['EMAIL'])
            const localPassword = await getData(localKey['PASSWORD'])
            if (localEmail) { setFormField({ email: localEmail, password: localPassword }), setRememberMe(true) }
            await AsyncStorage.getItem('fcmToken').then(async resp => {
                serviceConst.deviceToken = resp
            })
        }
        fetchRememberMe()
        fetchNotificationPermission()
    }, [])

    const fetchNotificationPermission = async () => {
        const enabled = await messaging().hasPermission();
        console.log('permission enables or not =>', enabled)
        if (enabled != -1) getToken()
        else requestPermission()
    }

    const requestPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) getToken()
        else if (authStatus === messaging.AuthorizationStatus.DENIED) {
            showToast('Notification permissnion denied by user.')
        }
    }

    const getToken = async () => {
        let fcmToken = await getData(localKey['DEVICE_TOKEN'])
        if (!fcmToken) {
            fcmToken = await messaging().getToken();
            serviceConst.deviceToken = fcmToken
            if (fcmToken) storeData(localKey['DEVICE_TOKEN'], fcmToken)
            else console.log('Could not fetch notification permission.')
        }
        else {
            serviceConst.deviceToken = fcmToken
        }
        console.log('fcmTojen==>', fcmToken)
    }

    const _onChangeText = type => text => {
        if (type === TYPES['EMAIL']) { setFormField(prevState => ({ ...prevState, email: text })), setError(prevState => ({ ...prevState, emailError: '' })) }
        else if (type === TYPES['PASSWORD']) { setFormField(prevState => ({ ...prevState, password: text })), setError(prevState => ({ ...prevState, passwordError: '' })) }
        else if (type === TYPES['PHONE']) { setFormField(prevState => ({ ...prevState, phone: text })), setError(prevState => ({ ...prevState, phoneError: '' })) }
    }

    const _focusNext = type => () => {
        if (type === TYPES['EMAIL']) passwordRef.current.focus()
        else if (type === TYPES['PASSWORD']) dismissKeyboard()
    }

    const _focus = type => () => {
        if (type === TYPES['EMAIL']) setFocus(1)
        else if (type === TYPES['PASSWORD']) setFocus(2)
        else if (type === TYPES['PHONE']) setFocus(1)
    }

    const _rememberMe = () => setRememberMe(!isremember)

    const _navToForget = () => navigation.navigate('forgotPassword')

    const openModal = () => setFormField(prevState => ({ ...prevState, visible: true }))

    const selectTab = type => () => {
        setSelectedTab(type)
    }

    const openPicker = () => {
        setFormField(prevState => ({ ...prevState, countryPickerVisible: true }))
    }

    const closePicker = () => {
        setFormField(prevState => ({ ...prevState, countryPickerVisible: false }))
    }

    const _onCountryPickerSelect = (data) => {
        console.log('dara===>', data)
        if (data['callingCode']?.[0]) {
            setFormField(prevState => ({
                ...prevState,
                country_code: data['cca2'],
                calling_code: data['callingCode']?.[0]
            }))
        }
        else showToast(DIAL_CODE_NOT_AVAILABLE)
    }

    const _navToSignup = type => () => {
        dispatch(checkSignupTypeAction(type))
        onCancelPress()
        navigation.navigate('signup')
    }

    const onCancelPress = () => {
        setFormField(prevState => ({ ...prevState, visible: false }))
    }

    // validate data before login
    const _navToDashboard = () => {
        if (selectedTab == LOGIN_TYPE.EMAIL) {
            requireEmail(email).status ?
                requirePassword(password).status ?
                    _login()
                    : setError(prevError => ({ ...prevError, passwordError: requirePassword(password).error }))
                : setError(prevError => ({ ...prevError, emailError: requireEmail(email).error }))
        }
        else if (selectedTab == LOGIN_TYPE.PHONE) {
            const number = phoneUtil.parseAndKeepRawInput(`${Number(calling_code)}${phone}`, country_code);
            const isValidNumber = phoneUtil.isValidNumberForRegion(number, country_code)
            validateMobileNoWithoutPlusSymbol(phone).status
                ? isValidNumber
                    ? validatePhoneLogin()
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

    const validatePhoneLogin = () => {
        const param = {
            [apiKey['COUNTRY_CODE']]: calling_code,
            [apiKey['PHONE']]: phone,
            [apiKey['ROLE_ID']]: serviceConst.role
        }
        dispatch(loginWithPhoneAction(param))
    }

    // login user
    const _login = () => {
        const param = {
            [apiKey['EMAIL']]: email,
            [apiKey['PASSWORD']]: password,
            [apiKey['DEVICE_TYPE']]: isAndroid ? 1 : 2,
            [apiKey['DEVICE_TOKEN']]: serviceConst.deviceToken || 'fcmToken',
            [apiKey['ROLE_ID']]: serviceConst.role
        }
        dispatch(loginAction(param, isremember))
    }

    const _onPress = () => {
        dispatch(popupAction(false))
    }

    return (
        <SafeArea>
            <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE }}>
                <Loader isVisible={loading} />
                <ApprovalPopup Visible={isVisible} text={message} onPress={_onPress} />
                <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                    <MyImage source={logo} style={[styles['logo']]} />
                    {console.log(' selectedTab==>', selectedTab)}
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
                    {console.log('calling_code==>', calling_code)}
                    {selectedTab == LOGIN_TYPE.EMAIL ?
                        <>
                            <Input
                                style={{ borderBottomColor: focus === 1 ? BLACK : LIGHT_GRAY }}
                                onFocus={_focus(TYPES['EMAIL'])}
                                source={activeEmail}
                                value={email}
                                placeholder={EMAIL}
                                onChangeText={_onChangeText(TYPES['EMAIL'])}
                                onSubmitEditing={_focusNext(TYPES['EMAIL'])}
                                keyboardType={'email-address'}
                                autoCapitalize='none'
                                blurOnSubmit={false}
                                errorMessage={emailError || null}
                            />
                            <Input
                                source={inactivePassword}
                                style={{ borderBottomColor: focus === 2 ? BLACK : LIGHT_GRAY }}
                                ref={passwordRef}
                                value={password}
                                onFocus={_focus(TYPES['PASSWORD'])}
                                secureTextEntry={true}
                                placeholder={PASSWORD}
                                onChangeText={_onChangeText(TYPES['PASSWORD'])}
                                onSubmitEditing={_focusNext(TYPES['PASSWORD'])}
                                autoCapitalize='none'
                                returnKeyType='done'
                                errorMessage={passwordError || null}
                            />
                        </>
                        :
                        <MobileInput
                            style={{
                                height: null,
                                fontFamily: montserratSemiBold
                            }}
                            fieldstyle={{ borderBottomColor: focus === 1 ? BLACK : LIGHT_GRAY, }}
                            onPress={openPicker}
                            countryCode={calling_code}
                            onFocus={_focus(TYPES['PHONE'])}
                            // onBlur={_clearFocus}
                            // source={activeEmail}
                            value={phone}
                            placeholder={PHONE}
                            onChangeText={_onChangeText(TYPES['PHONE'])}
                            onSubmitEditing={_focusNext(TYPES['PHONE'])}
                            blurOnSubmit={false}
                            errorMessage={phoneError}
                        />
                    }
                    <MyView style={styles['rowContainer']}>
                        <Selection
                            onPress={_rememberMe}
                            source={isremember ? activeCheckIcon : uncheckBox}
                            label={REMEMBER_ME}
                        />
                        <MyText onPress={_navToForget} style={styles['forgotText']}>{FORGOT_PASSWORD}</MyText>
                    </MyView>
                    <Button onPress={_navToDashboard} style={styles['buttonStyle']} text={selectedTab == LOGIN_TYPE.EMAIL ? LOGIN : CONTINUE} />
                </KeyboardAwareScroll>
                <MyText style={commonStyle['dontHaveAccount']}>{DONT_HAVE_AN_ACCOUNT}<MyText onPress={openModal} style={commonStyle['signUpText']} >{SIGNUP}</MyText></MyText>
                {visible && <MyView
                    style={{ ...StyleSheet.absoluteFill, backgroundColor: TRANSPARENT_BLACK, zIndex: 10, justifyContent: 'flex-end' }}
                >
                    <MyView style={{ padding: dynamicSize(10), alignItems: 'center', flex: 1 }}>
                        <Touchable style={{ flex: 1, width: SCREEN_WIDTH }} onPress={onCancelPress} />
                        <Touchable onPress={_navToSignup(LOGIN_TYPE.EMAIL)} style={commonStyle['takePhotoView']}>
                            <MyText style={{ color: BLACK, fontSize: getFontSize(20) }} >{CONTINUE_WITH_EMAIL}</MyText>
                        </Touchable>
                        <Touchable onPress={_navToSignup(LOGIN_TYPE.PHONE)} style={commonStyle['chooseFromLibrary']}>
                            <MyText style={{ color: BLACK, fontSize: getFontSize(20) }} >{CONTINUE_WITH_PHONE}</MyText>
                        </Touchable>
                    </MyView>
                </MyView>
                }
                {countryPickerVisible &&
                    <MyCountryPicker
                        onSelect={_onCountryPickerSelect}
                        onClose={closePicker}
                        visible={countryPickerVisible} />}
            </MyView>
        </SafeArea>
    )
}

export default Login