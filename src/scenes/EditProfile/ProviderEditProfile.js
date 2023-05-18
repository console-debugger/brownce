import React, { useState, useRef, useEffect, useCallback } from 'react'
import { SafeArea, MyView, MyImage, Touchable, CurveView, Input, Button, KeyboardAwareScroll, CustomDropDown, Loader, MyText, CustomModal } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { imagePlaceholder, cameraIcon, timeIcon } from '../../components/icons'
import { TRANSPARENT_LIGHT_BLACK, BLACK, LIGHT_WHITE, THEME, PLACEHOLDER_COLOR, WHITE } from '../../utils/colors'
import { useDispatch, useSelector } from 'react-redux'
import { dismissKeyboard, locationMapping, SCREEN_HEIGHT, showToast } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'
import { montserratMedium, montserratSemiBold } from '../../utils/fontFamily'
import ImagePickerSelection from '../../components/imagePickerSelection'
import { getCityListAction, getCountryListAction, getProviderProfileAction, getStateListAction, loaderAction, saveLicenseAction, saveProviderProfileAction, updateEmailAction } from '../../redux/action'
import MyListPicker from '../../components/myListPicker'
import { apiKey } from '../../services/serviceConstant'
import { useFocusEffect } from '@react-navigation/native'
import LicensePickerSelection from '../../components/licensePickerSelection'
import DateTimePicker from '../../components/datePicker'
import { reverseGeocode } from '../../services'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const TYPES = { USERNAME: 'username', NAME: 'name', DESCRIPTION: 'description', WEBLINK: 'weblink', EMAIL: 'email', GENDER: 'gender', COUNTRY: 'country', CITY: 'city', STATE: 'state' }

// Provider edit profile UI
const EditProviderProfile = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { PLEASE_SELECT_CITY, PLEASE_SELECT_STATE, LOCATION, PLEASE_SELECT_COUNTRY, MALE, FEMALE, PLEASE_UPLOAD_PROFILE_PIC, PLEASE_ENTER_AN_USERNAME, PLEASE_ENTER_NAME, TRANSGENDER_FEMALE, TRANSGENDER_MALE, NON_BINARY, OTHER, EMAIL, USERNAME, NAME, CITY, STATE, COUNTRY, UPDATE, PLEASE_WAIT_WHILE_FETCHING_COUNTRY_LIST, PLEASE_WAIT_WHILE_FETCHING_STATE_LIST, PLEASE_WAIT_WHILE_FETCHING_CITY_LIST, LOCATE_ON_MAP, CONTINUE } = state['localeReducer']['locale']
    const { providerprofile } = state['profileReducer']
    const { loading } = state['loaderReducer']
    const { country, userState, city } = state['addressReducer']
    const [time, settime] = useState(providerprofile?.['OpeningTime'] === null ? '' : providerprofile['OpeningTime'])
    const [closetime, setclosetime] = useState(providerprofile?.['ClosingTime'] === null ? '' : providerprofile['ClosingTime'])

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

    // initial data mapping of provider detail to local states
    const initialFormField = {
        username: providerprofile?.['Username'] || '',
        name: providerprofile?.['FirstName'] || '',
        email: providerprofile?.['Email'] || '',
        gender: providerprofile?.['Gender'] || 'Male',
        genderId: providerprofile?.['GenderId'] || 1,
        // selectedCountry: providerprofile?.['Country'] || '',
        selectedCity: providerprofile?.['City'] || '',
        selectedUserState: providerprofile?.['State'] || '',
        // selectedCityId: providerprofile?.['CityId'] || '',
        description: providerprofile?.['Bio'] || '',
        weblink: providerprofile?.['Weblink'] || ''
    }

    const initialError = {
        usernameError: "",
        nameError: '',
        emailError: '',
        cityError: '',
        stateError: '',
        descriptionError: ''
    }

    const [{ username, name, email, gender, genderId, selectedCountry, selectedCity, selectedUserState, selectedCityId, description, weblink }, setFormField] = useState(initialFormField)
    const [{ usernameError, nameError, emailError, cityError, stateError, descriptionError }, setError] = useState(initialError)
    const [profilePic, setProfilePic] = useState(providerprofile?.['ProfilePic'])
    const [imageData, setImageData] = useState({})
    const [isShow, setShow] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const [uri, seturi] = useState(providerprofile?.['ProfilePic'])
    const [isMapModalVisible, setModalVisible] = useState(false)
    const [latitude, setlatitude] = useState(providerprofile?.Latitude || 40.38190380557175)
    const [longitude, setlongitude] = useState(providerprofile?.Longitude || -75.90530281564186)

    // fetching provider detail
    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            dispatch(getProviderProfileAction())
        }, [])
    )

    // fetch Country, state and city list
    // useEffect(() => {
    //     dispatch(getCountryListAction())
    //     dispatch(getStateListAction(providerprofile.CountryId))
    //     dispatch(getCityListAction(providerprofile.StateId))
    // }, [])

    // handle focus 
    const _focusNext = type => () => {
        if (type === TYPES['USERNAME']) emailRef.current.focus()
        else if (type === TYPES['NAME']) emailRef.current.focus()
        // else if (type === TYPES['EMAIL']) cityRef.current.focus()
        // else if (type === TYPES['CITY']) stateRef.current.focus()
        // else if (type === TYPES['STATE']) dismissKeyboard
    }

    // handle onchange
    const _onChangeText = type => text => {
        if (type === TYPES['USERNAME']) { setFormField(prevState => ({ ...prevState, username: text.replace(/\s/g, '') })), setError(prevState => ({ ...prevState, usernameError: '' })) }
        if (type === TYPES['NAME']) { setFormField(prevState => ({ ...prevState, name: text })), setError(prevState => ({ ...prevState, nameError: '' })) }
        if (type === TYPES['EMAIL']) { setFormField(prevState => ({ ...prevState, email: text })), setError(prevState => ({ ...prevState, emailError: '' })) }
        if (type === TYPES['DESCRIPTION']) { setFormField(prevState => ({ ...prevState, description: text })), setError(prevState => ({ ...prevState, descriptionError: '' })) }
        else if (type === TYPES['WEBLINK']) { setFormField(prevState => ({ ...prevState, weblink: text })), setError(prevState => ({ ...prevState, passwordError: '' })) }
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

    const _getLicenseImage = async data => {
        if (data?.['uri']) {
            setVisible(false)
            _updateLicense(data)
        }
    }

    const _changeGender = (value, index, data) => setFormField(prevState => ({ ...prevState, genderId: data[index]['id'] }))

    // validate before save provider details
    const _validate = () => {
        profilePic ?
            username.length ?
                name.trim().length ?
                    // selectedCountry ?
                    selectedUserState ?
                        selectedCity ?
                            description.trim().length ?
                                time ?
                                    closetime ?
                                        _saveProviderProfile()
                                        : showToast("Please enter close time")
                                    : showToast("Please enter open time")
                                : showToast("Please enter description")
                            : showToast(PLEASE_SELECT_CITY)
                        : showToast(PLEASE_SELECT_STATE)
                    // : showToast(PLEASE_SELECT_COUNTRY)
                    : setError(prevError => ({ ...prevError, nameError: PLEASE_ENTER_NAME }))
                : setError(prevError => ({ ...prevError, usernameError: PLEASE_ENTER_AN_USERNAME }))
            : showToast(PLEASE_UPLOAD_PROFILE_PIC)
    }

    // save updated provider details
    const _saveProviderProfile = () => {
        const formData = new FormData()
        imageData?.['uri'] && formData.append(apiKey['PROFILE_PIC'], imageData)
        formData.append(apiKey['user_name'], username)
        formData.append(apiKey['FIRSTNAME'], name)
        formData.append(apiKey['GENDER'], genderId)
        formData.append(apiKey['CITY_NAME'], selectedCity)
        formData.append(apiKey['STATE_NAME'], selectedUserState)
        formData.append(apiKey['LATITUDE'], latitude)
        formData.append(apiKey['LONGITUDE'], longitude)
        // formData.append(apiKey['CITY_ID'], selectedCityId)
        formData.append(apiKey['Description'], description)
        formData.append('WebLink', weblink)
        formData.append('OpeningTime', time)
        formData.append('ClosingTime', closetime)
        console.log('formData==>', formData)
        dispatch(saveProviderProfileAction(formData))
    }

    const _updateEmail = () => {
        const param = {
            [apiKey['EMAIL']]: email
        }
        dispatch(updateEmailAction(param))
    }

    const _updateLicense = (data) => {
        const formData = new FormData()
        formData.append(apiKey['DocName'], data)
        formData.append(apiKey['IsUpdate'], true)
        dispatch(saveLicenseAction(formData, false))
    }

    const _selectedTime = time => {
        settime(time)
    }

    const _selectedCloseTime = time => {
        setclosetime(time)
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
                <LicensePickerSelection pickerModal={isVisible} onCancelPress={() => setVisible(false)} selectedImage={_getLicenseImage} />
                <MyView style={styles['imageContainer']}>
                    <MyImage source={uri ? { uri: uri ? uri : providerprofile?.['ProfilePic'] } : imagePlaceholder} style={styles['image']} />
                    <Touchable onPress={_openPicker} style={[styles['imageContainer'], { position: 'absolute', backgroundColor: TRANSPARENT_LIGHT_BLACK }]} >
                        <MyImage source={cameraIcon} />
                    </Touchable>
                </MyView>
                <MyText onPress={() => setVisible(true)} style={{ textDecorationLine: "underline", color: THEME, marginTop: 5, marginLeft: 5 }}>
                    {"Update License"}
                </MyText>
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
                    value={name}
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
                {/* <MyListPicker textStyle={{ fontFamily: montserratSemiBold }} style={{ marginVertical: null, marginTop: dynamicSize(20), borderBottomColor: BLACK }} message={PLEASE_WAIT_WHILE_FETCHING_COUNTRY_LIST} value={selectedCountry} placeholder={COUNTRY} data={country} selectedItem={_selectedCountry} />
                <MyListPicker textStyle={{ fontFamily: montserratSemiBold }} style={{ marginVertical: dynamicSize(20), borderBottomColor: BLACK }} message={PLEASE_WAIT_WHILE_FETCHING_STATE_LIST} value={selectedUserState} placeholder={STATE} data={userState} selectedItem={_selectedState} />
                <MyListPicker textStyle={{ fontFamily: montserratSemiBold }} style={{ marginVertical: null, borderBottomColor: BLACK }} message={PLEASE_WAIT_WHILE_FETCHING_CITY_LIST} value={selectedCity} placeholder={CITY} data={city} selectedItem={_selectedCity} /> */}
                <Input
                    multiline
                    labelFontSize={0}
                    style={{ borderBottomColor: BLACK }}
                    value={description}
                    hintColor={BLACK}
                    onChangeText={_onChangeText(TYPES['DESCRIPTION'])}
                    onSubmitEditing={_focusNext(TYPES['DESCRIPTION'])}
                    blurOnSubmit={false}
                    errorMessage={descriptionError || null}
                />
                <Input
                    styleContainer={{ marginTop: SCREEN_HEIGHT * 0.01 }}
                    value={weblink}
                    placeholder={'Website Link (Optional)'}
                    onChangeText={_onChangeText(TYPES['WEBLINK'])}
                    blurOnSubmit={false}
                />
                <DateTimePicker
                    mode='time'
                    style={styles['picker']}
                    placeholder={time ? time : 'Open Time'}
                    selectedTime={_selectedTime}
                    textStyle={{
                        color: time ? BLACK : PLACEHOLDER_COLOR, right: 10, fontFamily: montserratMedium,
                    }}
                >
                    <MyImage source={timeIcon} />
                </DateTimePicker>
                <DateTimePicker
                    mode='time'
                    style={styles['picker']}
                    placeholder={closetime ? closetime : 'Close Time'}
                    selectedTime={_selectedCloseTime}
                    textStyle={{
                        color: time ? BLACK : PLACEHOLDER_COLOR, right: 10, fontFamily: montserratMedium,
                    }}
                >
                    <MyImage source={timeIcon} />
                </DateTimePicker>
                <MyText style={styles['locationName']}>{`${LOCATION}: ${locationMapping({ City: selectedCity, State: selectedUserState })}`}</MyText>
                <Button onPress={openMapModal} style={[styles['buttonStyle'], { marginTop: SCREEN_HEIGHT * 0.04 }]} text={LOCATE_ON_MAP} />
                <Button onPress={_validate} style={[styles['buttonStyle'], { marginVertical: SCREEN_HEIGHT * 0.04 }]} text={UPDATE} />
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

export default EditProviderProfile