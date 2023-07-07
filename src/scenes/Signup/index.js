import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  KeyboardAwareScroll,
  MyText,
  MyView,
  MyImage,
  Input,
  Selection,
  Button,
  SafeArea,
  Loader,
  MobileInput,
  Touchable,
} from '../../components/customComponent';
import { LIGHT_WHITE, BLACK, LIGHT_GRAY } from '../../utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import {
  logo,
  activeEmail,
  activeProfileIcon,
  inactivePassword,
  uncheckBox,
  activeCheckIcon,
} from '../../components/icons';
import {
  checkDialCodePlusSymbol,
  dismissKeyboard,
  isCustomer,
  isProvider,
  SCREEN_WIDTH,
  showToast,
} from '../../components/helper';
import { dynamicSize, getFontSize } from '../../utils/responsive';
import { montserrat, montserratSemiBold } from '../../utils/fontFamily';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import commonStyle from '../../components/commonStyle';
import {
  validateEmail,
  validatePassword,
  validateConfpassword,
  requireUsername,
  validateMobileNo,
  validateMobileNoWithoutPlusSymbol,
} from '../../utils/validation';
import { DEFAULT_PHONE_COUNTRY, apiKey } from '../../services/serviceConstant';
import { checkSignupTypeAction, registrationAction } from '../../redux/action';
import { navigateToScreen } from '../../navigation/rootNav';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { LOGIN_TYPE } from '../Login';
import MyCountryPicker from '../../components/countryCodePicker';

const TYPES = {
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONF_PASSWORD: 'confPassword',
  PHONE: 'phone'
};

// Signup UI
const Signup = ({ navigation, route }) => {

  console.log('route=>', JSON.stringify(route))

  const dispatch = useDispatch();
  const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  const state = useSelector((state) => {
    return state;
  });
  const {
    SIGNUP_DESCRIPTION1,
    PROVIDER,
    SIGNUP_DESCRIPTION2,
    USERNAME,
    EMAIL,
    PLEASE_ACCEPT_TERMS_AND_CONDITION,
    PASSWORD,
    CONFIRM_PASSWORD,
    I_HAVE_READ_THE,
    TERMS_AND_CONDITIONS,
    NEXT,
    ALREADY_HAVE_AN_ACCOUNT,
    LOG_IN,
    PHONE,
    DIAL_CODE_NOT_AVAILABLE,
    PLEASE_ENTER_VALID_PHONE_NUMBER
  } = state['localeReducer']['locale'];
  const { loading } = state['loaderReducer'];
  const { signupType } = state['profileReducer']

  const phoneRef = useRef('phoneRef')
  const emailRef = useRef('emailRef')
  const passwordRef = useRef('passwordRef');
  const confPasswordRef = useRef('confPasswordRef');

  const initialFormField = {
    username: '',
    email: '',
    password: '',
    confPassword: '',
    isVisible: false,
    country_code: DEFAULT_PHONE_COUNTRY.country_code,
    calling_code: DEFAULT_PHONE_COUNTRY.calling_code,
    phone: ''
  };

  const initialError = {
    usernameError: '',
    emailError: '',
    passwordError: '',
    confPasswordError: '',
    phoneError: ''
  };

  const [{ username, email, password, confPassword, isVisible, country_code, phone, calling_code }, setFormField] = useState(
    initialFormField,
  );
  const [
    { usernameError, emailError, passwordError, confPasswordError, phoneError },
    setError,
  ] = useState(initialError);
  const [focus, setFocus] = useState(-1);
  const [isAccepted, setAccepted] = useState(false);
  const [selectedTab, setSelectedTab] = useState(LOGIN_TYPE.EMAIL)

  const isPhone = useMemo(() => {
    return signupType == LOGIN_TYPE.PHONE
  }, [signupType])

  useFocusEffect(
    useCallback(() => {
      let obj = {
        status: false,
      };
      AsyncStorage.setItem('firsttimestatus', JSON.stringify(obj));
    }, []),
  );

  const _onChangeText = (type) => (text) => {
    if (type === TYPES['USERNAME']) {
      setFormField((prevState) => ({
        ...prevState,
        username: text.replace(/\s/g, ''),
      })),
        setError((prevState) => ({ ...prevState, usernameError: '' }));
    }
    else if (type === TYPES['PHONE']) {
      setFormField((prevState) => ({ ...prevState, phone: text })),
        setError((prevState) => ({ ...prevState, phoneError: '' }));
    }
    else if (type === TYPES['EMAIL']) {
      setFormField((prevState) => ({ ...prevState, email: text })),
        setError((prevState) => ({ ...prevState, emailError: '' }));
    } else if (type === TYPES['PASSWORD']) {
      setFormField((prevState) => ({ ...prevState, password: text })),
        setError((prevState) => ({ ...prevState, passwordError: '' }));
    } else if (type === TYPES['CONF_PASSWORD']) {
      setFormField((prevState) => ({ ...prevState, confPassword: text })),
        setError((prevState) => ({ ...prevState, confPasswordError: '' }));
    }
  };

  const _focusNext = (type) => () => {
    if (type === TYPES['USERNAME']) { selectedTab == LOGIN_TYPE.PHONE ? phoneRef.current.focus() : emailRef.current.focus(); }
    else if (type === TYPES['PHONE']) emailRef.current.focus();
    else if (type === TYPES['EMAIL']) passwordRef.current.focus();
    else if (type === TYPES['PASSWORD']) confPasswordRef.current.focus();
    else if (type === TYPES['CONF_PASSWORD']) dismissKeyboard();
  };

  const _focus = (type) => () => {
    console.log('sdsda->', type)
    if (type === TYPES['USERNAME']) setFocus(1);
    else if (type == TYPES['PHONE']) setFocus(2);
    else if (type === TYPES['EMAIL']) setFocus(3);
    else if (type === TYPES['PASSWORD']) setFocus(4);
    else if (type === TYPES['CONF_PASSWORD']) setFocus(5);
  };

  const _clearFocus = () => setFocus(-1);

  const _acceptTermsCondition = () => setAccepted(!isAccepted);

  const closePicker = () => {
    setFormField(prevState => ({ ...prevState, isVisible: false }))
  }

  const openPicker = () => {
    setFormField(prevState => ({ ...prevState, isVisible: true }))
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

  const selectTab = type => () => {
    setSelectedTab(type)
  }

  const _navToProfileSetup = () => {
    const number = phoneUtil.parseAndKeepRawInput(`${Number(calling_code)}${phone}`, country_code);
    const isValidNumber = phoneUtil.isValidNumberForRegion(number, country_code)
    if (selectedTab == LOGIN_TYPE.PHONE) {
      requireUsername(username).status
        ? validateMobileNoWithoutPlusSymbol(phone).status
          ? isValidNumber
            ? validateEmail(email).status
              ? _register()
              : setError((prevError) => ({
                ...prevError,
                emailError: validateEmail(email).error,
              }))
            : setError((prevError) => ({
              ...prevError,
              phoneError: PLEASE_ENTER_VALID_PHONE_NUMBER,
            }))
          : setError((prevError) => ({
            ...prevError,
            phoneError: validateMobileNoWithoutPlusSymbol(phone).error,
          }))
        : setError((prevError) => ({
          ...prevError,
          usernameError: requireUsername(username).error,
        }));
    }
    else {
      requireUsername(username).status
        ? validateEmail(email).status
          ? validatePassword(password).status
            ? validateConfpassword(password, confPassword).status
              ? _register()
              : setError((prevError) => ({
                ...prevError,
                confPasswordError: validateConfpassword(password, confPassword)
                  .error,
              }))
            : setError((prevError) => ({
              ...prevError,
              passwordError: validatePassword(password).error,
            }))
          : setError((prevError) => ({
            ...prevError,
            emailError: validateEmail(email).error,
          }))
        : setError((prevError) => ({
          ...prevError,
          usernameError: requireUsername(username).error,
        }));
    }
  };

  const _register = () => {
    dismissKeyboard();
    if (isAccepted) {
      const param = selectedTab == LOGIN_TYPE.PHONE ? {
        [apiKey['USERNAME']]: username,
        [apiKey['PHONE']]: phone,
        [apiKey['EMAIL']]: email,
        [apiKey['COUNTRY_CODE']]: checkDialCodePlusSymbol(calling_code),
        [apiKey['ROLE_ID']]: isCustomer() ? 3 : 2,
      } : {
        [apiKey['USERNAME']]: username,
        [apiKey['EMAIL']]: email,
        [apiKey['PASSWORD']]: password,
        [apiKey['ROLE_ID']]: isCustomer() ? 3 : 2,
      };
      console.log('param==>', param)
      dispatch(checkSignupTypeAction(selectedTab))
      dispatch(registrationAction(param));
    } else showToast(PLEASE_ACCEPT_TERMS_AND_CONDITION);
  };

  return (
    <SafeArea
      style={{
        backgroundColor: LIGHT_WHITE,
        paddingTop: -useSafeAreaInsets().top,
      }}>
      <Loader isVisible={loading} />
      <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE }}>
        <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
          <MyText style={styles['signupDescription']}>
            {SIGNUP_DESCRIPTION1}
          </MyText>
          <MyText style={styles['signupDescription']}>
            {SIGNUP_DESCRIPTION2}
          </MyText>
          <MyImage source={logo} style={styles['logo']} />
          <MyText style={styles['providerText']}>
            {isProvider() ? PROVIDER : ''}
          </MyText>
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
          <Input
            style={{
              borderBottomColor: focus === 1 ? BLACK : LIGHT_GRAY,
              marginBottom: !usernameError
                ? getFontSize(12) + dynamicSize(4)
                : 0,
            }}
            onFocus={_focus(TYPES['USERNAME'])}
            onBlur={_clearFocus}
            source={activeProfileIcon}
            value={username}
            placeholder={USERNAME}
            onChangeText={_onChangeText(TYPES['USERNAME'])}
            onSubmitEditing={_focusNext(TYPES['USERNAME'])}
            autoCapitalize="none"
            blurOnSubmit={false}
            errorMessage={usernameError}
          />
          {selectedTab == LOGIN_TYPE.PHONE && <MobileInput
            style={{
              height: null,
              fontFamily: phone ? montserratSemiBold : montserrat
            }}
            fieldstyle={{ borderBottomColor: focus === 2 ? BLACK : LIGHT_GRAY, }}
            ref={phoneRef}
            onPress={openPicker}
            countryCode={calling_code}
            onFocus={_focus(TYPES['PHONE'])}
            onBlur={_clearFocus}
            // source={activeEmail}
            value={phone}
            placeholder={PHONE}
            onChangeText={_onChangeText(TYPES['PHONE'])}
            onSubmitEditing={_focusNext(TYPES['PHONE'])}
            blurOnSubmit={false}
            errorMessage={phoneError}
          />}
          <Input
            style={{
              marginTop: selectedTab == LOGIN_TYPE.PHONE ? dynamicSize(10) : null,
              borderBottomColor: focus === 3 ? BLACK : LIGHT_GRAY,
              marginBottom: !emailError ? getFontSize(12) + dynamicSize(4) : 0,
            }}
            ref={emailRef}
            onFocus={_focus(TYPES['EMAIL'])}
            onBlur={_clearFocus}
            source={activeEmail}
            value={email}
            placeholder={EMAIL}
            onChangeText={_onChangeText(TYPES['EMAIL'])}
            onSubmitEditing={_focusNext(TYPES['EMAIL'])}
            keyboardType={'email-address'}
            autoCapitalize="none"
            blurOnSubmit={false}
            errorMessage={emailError}
          />
          {selectedTab == LOGIN_TYPE.EMAIL && <>
            <Input
              source={inactivePassword}
              style={{
                borderBottomColor: focus === 4 ? BLACK : LIGHT_GRAY,
                marginBottom: !passwordError
                  ? getFontSize(12) + dynamicSize(4)
                  : 0,
              }}
              ref={passwordRef}
              value={password}
              onFocus={_focus(TYPES['PASSWORD'])}
              secureTextEntry={true}
              placeholder={PASSWORD}
              onChangeText={_onChangeText(TYPES['PASSWORD'])}
              onSubmitEditing={_focusNext(TYPES['PASSWORD'])}
              autoCapitalize="none"
              errorMessage={passwordError}
            />
            <Input
              source={inactivePassword}
              style={{
                borderBottomColor: focus === 5 ? BLACK : LIGHT_GRAY,
                marginBottom: !confPasswordError
                  ? getFontSize(12) + dynamicSize(4)
                  : 0,
              }}
              ref={confPasswordRef}
              value={confPassword}
              onFocus={_focus(TYPES['CONF_PASSWORD'])}
              secureTextEntry={true}
              placeholder={CONFIRM_PASSWORD}
              onChangeText={_onChangeText(TYPES['CONF_PASSWORD'])}
              onSubmitEditing={_focusNext(TYPES['CONF_PASSWORD'])}
              autoCapitalize="none"
              returnKeyType="done"
              errorMessage={confPasswordError}
            />
          </>}
          <Selection
            labelStyle={{ fontFamily: montserrat, color: BLACK }}
            style={{
              flexDirection: 'row',
              width: SCREEN_WIDTH - dynamicSize(70),
            }}
            onPress={_acceptTermsCondition}
            source={isAccepted ? activeCheckIcon : uncheckBox}>
            <MyText onPress={() => navigation.navigate('terms')}>
              {TERMS_AND_CONDITIONS}
            </MyText>
          </Selection>
          <Button
            onPress={_navToProfileSetup}
            style={styles['buttonStyle']}
            text={NEXT}
          />
        </KeyboardAwareScroll>
        <MyText
          onPress={() => navigateToScreen('login')}
          style={commonStyle['dontHaveAccount']}>
          {ALREADY_HAVE_AN_ACCOUNT}
          <MyText style={commonStyle['signUpText']}>{LOG_IN}</MyText>
        </MyText>
        {isVisible &&
          <MyCountryPicker
            onSelect={_onCountryPickerSelect}
            onClose={closePicker}
            visible={isVisible} />}
      </MyView>
    </SafeArea>
  );
};

export default Signup;
