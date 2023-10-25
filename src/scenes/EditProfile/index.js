import React, { useState, useRef, useEffect } from 'react'
import { SafeArea, MyView, MyImage, Touchable, CurveView, Input, Button, KeyboardAwareScroll, CustomDropDown, Loader, MyText, CustomModal, NewThemeInput, NewThemeDropdown } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { imagePlaceholder, cameraIcon, accountNameIcon, usernameIcon, newEmailIcon, genderIcon, locationPinIcon, lockIcon } from '../../components/icons'
import { TRANSPARENT_LIGHT_BLACK, BLACK, LIGHT_WHITE, THEME, WHITE } from '../../utils/colors'
import { useDispatch, useSelector } from 'react-redux'
import { dismissKeyboard, locationMapping, SCREEN_HEIGHT, showToast } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'
import { montserratBold, montserratSemiBold } from '../../utils/fontFamily'
import ImagePickerSelection from '../../components/imagePickerSelection'
import { getCityListAction, getCountryListAction, getStateListAction, saveProfileAction, updateEmailAction } from '../../redux/action'
import MyListPicker from '../../components/myListPicker'
import { apiKey } from '../../services/serviceConstant'
import commonStyle from '../../components/commonStyle'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { reverseGeocode } from '../../services'

const TYPES = { USERNAME: 'username', NAME: 'name', EMAIL: 'email', GENDER: 'gender', COUNTRY: 'country', CITY: 'city', STATE: 'state' }

// UI of edit profile customer
const EditProfile = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { USERNAME, PLEASE_SELECT_CITY, PLEASE_SELECT_STATE, ACCOUNT, UPDATE_EMAIL, PLEASE_ENTER_AN_USERNAME, PRIVACY_AND_SECURITY, MALE, FEMALE, PLEASE_UPLOAD_PROFILE_PIC, PLEASE_ENTER_NAME, TRANSGENDER_FEMALE, TRANSGENDER_MALE, NON_BINARY, OTHER, EMAIL, NAME, CITY, STATE, COUNTRY, UPDATE, PLEASE_WAIT_WHILE_FETCHING_COUNTRY_LIST, PLEASE_WAIT_WHILE_FETCHING_STATE_LIST, PLEASE_WAIT_WHILE_FETCHING_CITY_LIST,
        LOCATION,
        LOCATE_ON_MAP,
        CONTINUE
    } = state['localeReducer']['locale']
    const { profile } = state['profileReducer']
    const { loading } = state['loaderReducer']
    const { country, userState, city } = state['addressReducer']

    const emailRef = useRef('emailRef')
    const cityRef = useRef('cityRef')
    const stateRef = useRef('stateRef')
    const mapRef = useRef('mapRef')

    const genderData = [
        {
            value: MALE,
            id: 1
        },
        {
            value: FEMALE,
            id: 2
        },
        {
            value: TRANSGENDER_FEMALE,
            id: 3
        },
        {
            value: TRANSGENDER_MALE,
            id: 4
        },
        {
            value: NON_BINARY,
            id: 5
        },
        {
            value: OTHER,
            id: 6
        }
    ]

    // data mapping of cutome detail
    const initialFormField = {
        username: profile?.['Username'] || '',
        firstname: profile?.['Name'] || '',
        email: profile?.['Email'] || '',
        gender: profile?.['Gender'] || '',
        genderId: profile?.['GenderId'] || 1,
        // selectedCountry: profile?.['Country'] || '',
        selectedCity: profile?.['City'] || '',
        selectedUserState: profile?.['State'] || '',
        // selectedCityId: profile?.['CityId'] || ''
    }

    const initialError = {
        usernameError: "",
        nameError: '',
        emailError: '',
        cityError: '',
        stateError: ''
    }

    const [{ username, firstname, email, gender, genderId, selectedCountry, selectedCity, selectedUserState, selectedCityId }, setFormField] = useState(initialFormField)
    const [{ usernameError, nameError, emailError, cityError, stateError }, setError] = useState(initialError)
    const [profilePic, setProfilePic] = useState(profile?.['ProfilePic'])
    const [imageData, setImageData] = useState({})
    const [uri, seturi] = useState(profile?.['ProfilePic'])
    const [isShow, setShow] = useState(false)
    const [isMapModalVisible, setModalVisible] = useState(false)
    const [latitude, setlatitude] = useState(profile?.Latitude || 40.38190380557175)
    const [longitude, setlongitude] = useState(profile?.Longitude || -75.90530281564186)

    // fetching state, country and city list
    // useEffect(() => {
    //     dispatch(getCountryListAction())
    //     dispatch(getStateListAction(profile.CountryId))
    //     dispatch(getCityListAction(profile.StateId))
    // }, [])

    // focus next on submit
    const _focusNext = type => () => {
        if (type === TYPES['USERNAME']) emailRef.current.focus()
        else if (type === TYPES['NAME']) emailRef.current.focus()
        // else if (type === TYPES['EMAIL']) cityRef.current.focus()
        // else if (type === TYPES['CITY']) stateRef.current.focus()
        // else if (type === TYPES['STATE']) dismissKeyboard
    }

    // onchange ofminput field
    const _onChangeText = type => text => {
        if (type === TYPES['USERNAME']) { setFormField(prevState => ({ ...prevState, username: text.replace(/\s/g, '') })), setError(prevState => ({ ...prevState, usernameError: '' })) }
        if (type === TYPES['NAME']) { setFormField(prevState => ({ ...prevState, firstname: text })), setError(prevState => ({ ...prevState, nameError: '' })) }
        if (type === TYPES['EMAIL']) { setFormField(prevState => ({ ...prevState, email: text })), setError(prevState => ({ ...prevState, emailError: '' })) }
        // else if (type === TYPES['EMAIL']) { setFormField(prevState => ({ ...prevState, password: text })), setError(prevState => ({ ...prevState, passwordError: '' })) }
    }

    // const _selectedCountry = data => {
    //     setFormField(prevState => ({ ...prevState, selectedCountry: data['Name'], selectedUserState: '', selectedCity: '', selectedCityId: '' }))
    //     dispatch(getStateListAction(data['CountryId']))
    // }

    // const _selectedState = data => {
    //     setFormField(prevState => ({ ...prevState, selectedUserState: data['Name'], selectedCity: '', selectedCityId: '' }))
    //     dispatch(getCityListAction(data['StateId']))
    // }

    // const _selectedCity = data => {
    //     setFormField(prevState => ({ ...prevState, selectedCity: data['Name'], selectedCityId: data['CityId'] }))
    // }

    const _openPicker = () => setShow(true)

    const _closePicker = () => setShow(false)

    const _getImage = data => {
        if (data?.['uri']) {
            seturi(data?.['uri'])
            setImageData(data)
            setProfilePic(data?.['uri'])
            setShow(false)
        }
    }

    const _changeGender = (value, index, data) => setFormField(prevState => ({ ...prevState, genderId: data[index]['id'] }))

    // validate before save data via api
    const _validate = () => {
        firstname.trim().length ?
            username.length ?
                selectedUserState ?
                    selectedCity ?
                        _saveProfile()
                        : showToast(PLEASE_SELECT_CITY)
                    : showToast(PLEASE_SELECT_STATE)
                : setError(prevError => ({ ...prevError, usernameError: PLEASE_ENTER_AN_USERNAME }))
            : setError(prevError => ({ ...prevError, nameError: PLEASE_ENTER_NAME }))
    }

    // Save updated detail of customer
    const _saveProfile = () => {
        const formData = new FormData()
        formData.append(apiKey['user_name'], username)
        formData.append(apiKey['FIRSTNAME'], firstname)
        formData.append(apiKey['GENDER'], genderId)
        formData.append(apiKey['CITY_NAME'], selectedCity)
        formData.append(apiKey['STATE_NAME'], selectedUserState)
        formData.append(apiKey['LATITUDE'], latitude)
        formData.append(apiKey['LONGITUDE'], longitude)
        dispatch(saveProfileAction(formData))
    }

    // Update Email
    const _updateEmail = () => {
        const param = {
            [apiKey['EMAIL']]: email
        }
        dispatch(updateEmailAction(param))
    }

    const _onDragEnd = event => {
        console.log('coordinates', event.nativeEvent.coordinate)
        const { latitude, longitude } = event.nativeEvent.coordinate
        setlatitude(latitude)
        setlongitude(longitude)
    }

    const openMapModal = () => setModalVisible(true)

    const closeMapModal = () => setModalVisible(false)

    const closeMapModalFuntion = async () => {
        closeMapModal()
        // const lat = 40.335725019928844, -75.92821932920248
        const response = await reverseGeocode({ latitude, longitude })
        if (response.status == 'OK') {
            const place = response?.result?.[0]
            console.log('place==>', place?.address_components)
            const city = (() => {
                return place?.address_components?.filter(address => address.types.includes('postal_town'))?.[0]?.short_name ||
                    place?.address_components?.filter(address => address.types.includes('locality'))?.[0]?.short_name ||
                    place?.address_components?.filter(address => address.types.includes('political'))?.[0]?.short_name || ''
            })()
            const userState = (() => {
                return place?.address_components?.filter(address => address.types.includes('administrative_area_level_1'))?.[0]?.short_name ||
                    place?.address_components?.filter(address => address.types.includes('administrative_area_level_2'))?.[0]?.short_name ||
                    place?.address_components?.filter(address => address.types.includes('political'))?.[0]?.short_name || ''
            })()
            setFormField(prevState => ({ ...prevState, selectedCity: city, selectedUserState: userState }))
            console.log('response===>', city, userState)
        }

    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, paddingBottom: -useSafeAreaInsets().bottom }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <CurveView />
                <Loader isVisible={loading} />
                <MyText style={{ fontSize: 19, fontFamily: montserratBold, marginTop: 10 }}>{ACCOUNT}</MyText>
                <NewThemeInput
                    mainContainerStyle={{ marginTop: 10 }}
                    value={firstname}
                    placeholder={NAME}
                    source={accountNameIcon}
                    onChangeText={_onChangeText(TYPES['NAME'])}
                    blurOnSubmit={false}
                    errorMessage={nameError || null}
                />
                <NewThemeInput
                    mainContainerStyle={{ marginTop: 10 }}
                    value={username}
                    placeholder={USERNAME}
                    source={usernameIcon}
                    onChangeText={_onChangeText(TYPES['USERNAME'])}
                    blurOnSubmit={false}
                    errorMessage={usernameError || null}
                />
                <NewThemeInput
                    ref={emailRef}
                    mainContainerStyle={{ marginTop: 10 }}
                    clearButtonMode
                    editable={true}
                    source={newEmailIcon}
                    placeholder={EMAIL}
                    value={email}
                    onChangeText={_onChangeText(TYPES['EMAIL'])}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    blurOnSubmit={false}
                    errorMessage={emailError || null}
                />
                <MyView style={{ alignSelf: 'flex-end', marginRight: dynamicSize(35), marginTop: 5 }}>
                    <MyText onPress={_updateEmail} style={{ textDecorationLine: 'underline', color: THEME, paddingVertical: dynamicSize(5) }}>{UPDATE_EMAIL}</MyText>
                </MyView>
                <NewThemeDropdown
                    mainContainerStyle={{ marginTop: 10 }}
                    onChange={_changeGender}
                    source={genderIcon}
                    data={genderData}
                    value={gender}
                    placeholder={'Gender'}
                    containerStyle={{ height: 10 }}
                />
                <NewThemeInput
                    mainContainerStyle={{ marginTop: 10 }}
                    containerStyle={{ alignItems: 'center' }}
                    source={locationPinIcon}
                    editable={false}
                    placeholder={LOCATION}
                    value={locationMapping({ City: selectedCity, State: selectedUserState })}
                    blurOnSubmit={false}
                    rightLabel={UPDATE}
                    inputStyle={{ fontSize: 14 }}
                    rightLabelStyle={{ fontSize: 14 }}
                    onRightPress={openMapModal}
                />
                <MyText style={{ fontSize: 19, fontFamily: montserratBold, marginVertical: 15 }}>{PRIVACY_AND_SECURITY}</MyText>
                <NewThemeInput
                    containerStyle={{ alignItems: 'center' }}
                    source={lockIcon}
                    editable={false}
                    placeholder={LOCATION}
                    value={'**********'}
                    secureTextEntry={true}
                    blurOnSubmit={false}
                    rightLabel={UPDATE}
                    inputStyle={{ fontSize: 14 }}
                    rightLabelStyle={{ fontSize: 14 }}
                    onRightPress={() => navigation.navigate('changepassword')}
                />
                <Button onPress={_validate} style={[styles['buttonStyle'], { marginVertical: SCREEN_HEIGHT * 0.02 }]} text={UPDATE} />
                <CustomModal
                    isVisible={isMapModalVisible}
                    animationType='slide'
                >
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_GOOGLE}
                        style={styles['mapView']}
                        initialRegion={{
                            latitude: latitude ? parseFloat(latitude) : 40.38190380557175,
                            longitude: longitude ? parseFloat(longitude) : -75.90530281564186,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,

                        }}
                    >
                        <MapView.Marker
                            draggable
                            onDragEnd={_onDragEnd}
                            coordinate={{ latitude: latitude ? parseFloat(latitude) : 40.38190380557175, longitude: longitude ? parseFloat(longitude) : -75.90530281564186 }}
                            pinColor={THEME}
                        />
                    </MapView>
                    <Button onPress={closeMapModalFuntion} style={[styles['buttonStyle'], { position: 'absolute', zIndex: 10, bottom: useSafeAreaInsets().bottom + dynamicSize(10), alignSelf: 'center' }]} text={CONTINUE} textStyle={{ color: WHITE }} />
                </CustomModal>
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default EditProfile