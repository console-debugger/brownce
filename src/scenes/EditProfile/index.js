import React, { useState, useRef, useEffect } from 'react'
import { SafeArea, MyView, MyImage, Touchable, CurveView, Input, Button, KeyboardAwareScroll, CustomDropDown, Loader, MyText, CustomModal } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { imagePlaceholder, cameraIcon } from '../../components/icons'
import { TRANSPARENT_LIGHT_BLACK, BLACK, LIGHT_WHITE, THEME, WHITE } from '../../utils/colors'
import { useDispatch, useSelector } from 'react-redux'
import { dismissKeyboard, locationMapping, SCREEN_HEIGHT, showToast } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'
import { montserratSemiBold } from '../../utils/fontFamily'
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
    const { USERNAME, PLEASE_SELECT_CITY, PLEASE_SELECT_STATE, PLEASE_SELECT_COUNTRY, PLEASE_ENTER_AN_USERNAME, MALE, FEMALE, PLEASE_UPLOAD_PROFILE_PIC, PLEASE_ENTER_NAME, TRANSGENDER_FEMALE, TRANSGENDER_MALE, NON_BINARY, OTHER, EMAIL, NAME, CITY, STATE, COUNTRY, UPDATE, PLEASE_WAIT_WHILE_FETCHING_COUNTRY_LIST, PLEASE_WAIT_WHILE_FETCHING_STATE_LIST, PLEASE_WAIT_WHILE_FETCHING_CITY_LIST,
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

    console.log('profile==>',profile)

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
    const [latitude, setlatitude] = useState('')
    const [longitude, setlongitude] = useState('')

    // fetching state, country and city list
    useEffect(() => {
        dispatch(getCountryListAction())
        dispatch(getStateListAction(profile.CountryId))
        dispatch(getCityListAction(profile.StateId))
    }, [])

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
        profilePic ?
            username.length ?
                firstname.trim().length ?
                    // selectedCountry ?
                        selectedUserState ?
                            selectedCity ?
                                _saveProfile()
                                : showToast(PLEASE_SELECT_CITY)
                            : showToast(PLEASE_SELECT_STATE)
                        // : showToast(PLEASE_SELECT_COUNTRY)
                    : setError(prevError => ({ ...prevError, nameError: PLEASE_ENTER_NAME }))
                : setError(prevError => ({ ...prevError, usernameError: PLEASE_ENTER_AN_USERNAME }))
            : showToast(PLEASE_UPLOAD_PROFILE_PIC)
    }

    // Save updated detail of customer
    const _saveProfile = () => {
        const formData = new FormData()
        imageData?.['uri'] && formData.append(apiKey['PROFILE_PIC'], imageData)
        formData.append(apiKey['user_name'], username)
        formData.append(apiKey['FIRSTNAME'], firstname)
        formData.append(apiKey['GENDER'], genderId)
        formData.append(apiKey['CITY_ID'], selectedCityId)
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
                <ImagePickerSelection pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} />
                <MyView style={styles['imageContainer']}>
                    <MyImage source={uri ? { uri: uri ? uri : profile['ProfilePic'] } : imagePlaceholder} style={styles['image']} />
                    <Touchable onPress={_openPicker} style={[styles['imageContainer'], { position: 'absolute', backgroundColor: TRANSPARENT_LIGHT_BLACK }]} >
                        <MyImage source={cameraIcon} />
                    </Touchable>
                </MyView>
                <Input
                    labelFontSize={0}
                    style={{ borderBottomColor: BLACK }}
                    value={username}
                    hintColor={LIGHT_WHITE}
                    placeholder={USERNAME}
                    onChangeText={_onChangeText(TYPES['USERNAME'])}
                    onSubmitEditing={_focusNext(TYPES['USERNAME'])}
                    blurOnSubmit={false}
                    errorMessage={usernameError || null}
                />
                <Input
                    labelFontSize={0}
                    style={{ borderBottomColor: BLACK }}
                    value={firstname}
                    hintColor={LIGHT_WHITE}
                    placeholder={NAME}
                    onChangeText={_onChangeText(TYPES['NAME'])}
                    onSubmitEditing={_focusNext(TYPES['NAME'])}
                    blurOnSubmit={false}
                    errorMessage={nameError || null}
                />
                <Input
                    onPress={_updateEmail}
                    text={"Update"}
                    labelFontSize={0}
                    ref={emailRef}
                    clearButtonMode
                    editable={true}
                    style={{ borderBottomColor: BLACK }}
                    textInputStyle={{ color: BLACK }}
                    value={email}
                    hintColor={LIGHT_WHITE}
                    placeholder={EMAIL}
                    onChangeText={_onChangeText(TYPES['EMAIL'])}
                    onSubmitEditing={_focusNext(TYPES['EMAIL'])}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    blurOnSubmit={false}
                    errorMessage={emailError || null}
                />
                <CustomDropDown onChange={_changeGender} data={genderData} value={gender} topOffset={dynamicSize(20)} containerStyle={{ borderBottomColor: BLACK, borderBottomWidth: 2 }} />
                {/* <MyListPicker textStyle={{ fontFamily: montserratSemiBold }} style={{ marginVertical: null, marginTop: dynamicSize(20), borderBottomColor: BLACK }} message={PLEASE_WAIT_WHILE_FETCHING_COUNTRY_LIST} value={selectedCountry} placeholder={COUNTRY} data={country} selectedItem={_selectedCountry} /> */}
                {/* <MyListPicker textStyle={{ fontFamily: montserratSemiBold }} style={{ marginVertical: dynamicSize(20), borderBottomColor: BLACK }} message={PLEASE_WAIT_WHILE_FETCHING_STATE_LIST} value={selectedUserState} placeholder={STATE} data={userState} selectedItem={_selectedState} />
                <MyListPicker textStyle={{ fontFamily: montserratSemiBold }} style={{ marginVertical: null, borderBottomColor: BLACK }} message={PLEASE_WAIT_WHILE_FETCHING_CITY_LIST} value={selectedCity} placeholder={CITY} data={city} selectedItem={_selectedCity} /> */}
                <MyText style={styles['locationName']}>{`${LOCATION}: ${locationMapping({ City: selectedCity, State: selectedUserState })}`}</MyText>
                <Button onPress={openMapModal} style={[styles['buttonStyle'], { marginTop: SCREEN_HEIGHT * 0.04 }]} text={LOCATE_ON_MAP} />
                <Button onPress={() => navigation.navigate('changepassword')} style={[styles['buttonStyle'], { marginTop: SCREEN_HEIGHT * 0.02 }]} text={'Change Password'} />
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
                            latitude: latitude ? latitude : 40.38190380557175,
                            longitude: longitude ? longitude : -75.90530281564186,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,

                        }}
                    >
                        {/* <TouchableIcon
                            onPress={closeMapModalFuntion}
                            source={redCrossIcon}
                            style={[styles.crossIcon, { top: useSafeAreaInsets().top + dynamicSize(100) }]}
                        /> */}
                        <MapView.Marker
                            draggable
                            onDragEnd={_onDragEnd}
                            coordinate={{ latitude: latitude ? latitude : 40.38190380557175, longitude: longitude ? longitude : -75.90530281564186 }}
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