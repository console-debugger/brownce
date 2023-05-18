import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'
import { MyView, Button, SafeArea, Input, KeyboardAwareScroll, MyImage, Selection, MyText, Loader } from '../../components/customComponent'
import { dismissKeyboard, getData, isAndroid, isCustomer, logAnalyticEvent, showToast, storeData } from '../../components/helper'
import { activeCheckIcon, activeEmail, inactivePassword, logo, uncheckBox } from '../../components/icons'
import { LIGHT_GRAY, BLACK, LIGHT_WHITE } from '../../utils/colors'
import commonStyle from '../../components/commonStyle'
import { requireEmail, requirePassword, } from '../../utils/validation'
import { apiKey, serviceConst } from '../../services/serviceConstant'
import styles from './styles'
import { loginAction, popupAction } from '../../redux/action'
import localKey from '../../utils/localKey'
import { ApprovalPopup } from '../../components/alert'
import crashlytics from '@react-native-firebase/crashlytics';
import { useFocusEffect } from '@react-navigation/native';
import { LOGIN_PAGE } from '../../components/eventName';

// @ types of input field
const TYPES = { EMAIL: 'email', PASSWORD: 'password' }

//@ login UI design
const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { LOGIN, EMAIL, PASSWORD, REMEMBER_ME, FORGOT_PASSWORD, DONT_HAVE_AN_ACCOUNT, SIGNUP } = state['localeReducer']['locale']
    const { loading, isVisible, message } = state['loaderReducer']

    const passwordRef = useRef('passwordRef')

    const initialFormField = {
        email: '',
        password: ''
    }

    const initialError = {
        emailError: '',
        passwordError: ''
    }

    const [{ email, password }, setFormField] = useState(initialFormField)
    const [{ emailError, passwordError }, setError] = useState(initialError)
    const [focus, setFocus] = useState(-1)
    const [isremember, setRememberMe] = useState(false)

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
    }

    const _focusNext = type => () => {
        if (type === TYPES['EMAIL']) passwordRef.current.focus()
        else if (type === TYPES['PASSWORD']) dismissKeyboard()
    }

    const _focus = type => () => {
        if (type === TYPES['EMAIL']) setFocus(1)
        else if (type === TYPES['PASSWORD']) setFocus(2)
    }

    const _rememberMe = () => setRememberMe(!isremember)

    const _navToForget = () => navigation.navigate('forgotPassword')

    const _navToSignup = () => navigation.navigate('signup')

    // validate data before login
    const _navToDashboard = () => {
        requireEmail(email).status ?
            requirePassword(password).status ?
                _login()
                : setError(prevError => ({ ...prevError, passwordError: requirePassword(password).error }))
            : setError(prevError => ({ ...prevError, emailError: requireEmail(email).error }))
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
                    <MyView style={styles['rowContainer']}>
                        <Selection
                            onPress={_rememberMe}
                            source={isremember ? activeCheckIcon : uncheckBox}
                            label={REMEMBER_ME}
                        />
                        <MyText onPress={_navToForget} style={styles['forgotText']}>{FORGOT_PASSWORD}</MyText>
                    </MyView>
                    <Button onPress={_navToDashboard} style={styles['buttonStyle']} text={LOGIN} />
                </KeyboardAwareScroll>
                <MyText style={commonStyle['dontHaveAccount']}>{DONT_HAVE_AN_ACCOUNT}<MyText onPress={_navToSignup} style={commonStyle['signUpText']} >{SIGNUP}</MyText></MyText>
            </MyView>
        </SafeArea>
    )
}

export default Login