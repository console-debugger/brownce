import React, { useState, useRef, useEffect, useCallback } from 'react'
import { SafeArea, MyView, MyImage, Touchable, CurveView, Input, Button, KeyboardAwareScroll, CustomDropDown, Loader, MyText, CustomModal, NewThemeInput, NewThemeDropdown } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { imagePlaceholder, cameraIcon, timeIcon, accountNameIcon, usernameIcon, newEmailIcon, genderIcon, certificateIcon } from '../../components/icons'
import { TRANSPARENT_LIGHT_BLACK, BLACK, LIGHT_WHITE, THEME, WHITE } from '../../utils/colors'
import { useDispatch, useSelector } from 'react-redux'
import { dismissKeyboard, locationMapping, SCREEN_HEIGHT, showToast } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'
import { montserrat, montserratBold } from '../../utils/fontFamily'
import ImagePickerSelection from '../../components/imagePickerSelection'
import { getGenderAction, getProviderProfileAction, loaderAction, saveLicenseAction, saveProviderProfileAction, updateEmailAction } from '../../redux/action'
import MyListPicker from '../../components/myListPicker'
import { apiKey } from '../../services/serviceConstant'
import { useFocusEffect } from '@react-navigation/native'
import LicensePickerSelection from '../../components/licensePickerSelection'
import DateTimePicker from '../../components/datePicker'
import { reverseGeocode } from '../../services'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { locationPinIcon } from '../../components/icons'
import { LicensePopup } from '../../components/alert'
import { lockIcon } from '../../components/icons'

const TYPES = { USERNAME: 'username', NAME: 'name', DESCRIPTION: 'description', WEBLINK: 'weblink', EMAIL: 'email', GENDER: 'gender', COUNTRY: 'country', CITY: 'city', STATE: 'state' }

// Provider edit profile UI
const EditProviderProfile = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { PLEASE_SELECT_CITY, UPDATE_EMAIL, PLEASE_SELECT_STATE, LOCATION, ACCOUNT, LICENSE, PRIVACY_AND_SECURITY, MALE, FEMALE, PLEASE_UPLOAD_PROFILE_PIC, PLEASE_ENTER_AN_USERNAME, PLEASE_ENTER_NAME, TRANSGENDER_FEMALE, TRANSGENDER_MALE, NON_BINARY, OTHER, EMAIL, USERNAME, NAME, CITY, STATE, COUNTRY, UPDATE, PLEASE_WAIT_WHILE_FETCHING_COUNTRY_LIST, PLEASE_WAIT_WHILE_FETCHING_STATE_LIST, PLEASE_WAIT_WHILE_FETCHING_CITY_LIST, LOCATE_ON_MAP, CONTINUE } = state['localeReducer']['locale']
    const { providerprofile } = state['profileReducer']
    const { loading } = state['loaderReducer']

    const emailRef = useRef('emailRef')
    const mapRef = useRef('mapRef')
    const [modalVisible, setmodalVisible] = useState(false)
    const [genderData, setGenderData] = useState([])

    // initial data mapping of provider detail to local states
    const initialFormField = {
        username: providerprofile?.['Username'] || '',
        name: providerprofile?.['FirstName'] || '',
        email: providerprofile?.['Email'] || '',
        gender: providerprofile?.['Gender'] || 'Male',
        genderId: providerprofile?.['GenderId'] || 1,
        selectedCity: providerprofile?.['City'] || '',
        selectedUserState: providerprofile?.['State'] || '',
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

    const [{ username, name, email, gender, genderId, selectedCity, selectedUserState }, setFormField] = useState(initialFormField)
    const [{ usernameError, nameError, emailError }, setError] = useState(initialError)
    const [isVisible, setVisible] = useState(false)
    const [isMapModalVisible, setModalVisible] = useState(false)
    const [latitude, setlatitude] = useState(providerprofile?.Latitude || 40.38190380557175)
    const [longitude, setlongitude] = useState(providerprofile?.Longitude || -75.90530281564186)

    useEffect(() => {
        dispatch(getGenderAction((response) => {
            if (response.status == 200) {
                const newResult = response.data?.result?.map(each => { return { ...each, value: each['Name'], id: each['Id'] } }) || []
                setGenderData(newResult || [])
            }
        }))
    }, [])

    // fetching provider detail
    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            dispatch(getProviderProfileAction())
        }, [])
    )

    // handle onchange
    const _onChangeText = type => text => {
        if (type === TYPES['USERNAME']) { setFormField(prevState => ({ ...prevState, username: text.replace(/\s/g, '') })), setError(prevState => ({ ...prevState, usernameError: '' })) }
        if (type === TYPES['NAME']) { setFormField(prevState => ({ ...prevState, name: text })), setError(prevState => ({ ...prevState, nameError: '' })) }
        if (type === TYPES['EMAIL']) { setFormField(prevState => ({ ...prevState, email: text })), setError(prevState => ({ ...prevState, emailError: '' })) }
        if (type === TYPES['DESCRIPTION']) { setFormField(prevState => ({ ...prevState, description: text })), setError(prevState => ({ ...prevState, descriptionError: '' })) }
        else if (type === TYPES['WEBLINK']) { setFormField(prevState => ({ ...prevState, weblink: text })), setError(prevState => ({ ...prevState, passwordError: '' })) }
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
        name.trim().length ?
            username.length ?
                selectedUserState ?
                    selectedCity ?
                        _saveProviderProfile()
                        : showToast(PLEASE_SELECT_CITY)
                    : showToast(PLEASE_SELECT_STATE)
                : setError(prevError => ({ ...prevError, usernameError: PLEASE_ENTER_AN_USERNAME }))
            : setError(prevError => ({ ...prevError, nameError: PLEASE_ENTER_NAME }))
    }

    // save updated provider details
    const _saveProviderProfile = () => {
        const formData = new FormData()
        // imageData?.['uri'] && formData.append(apiKey['PROFILE_PIC'], imageData)
        formData.append(apiKey['user_name'], username)
        formData.append(apiKey['FIRSTNAME'], name)
        formData.append(apiKey['GENDER'], genderId)
        formData.append(apiKey['CITY_NAME'], selectedCity)
        formData.append(apiKey['STATE_NAME'], selectedUserState)
        formData.append(apiKey['LATITUDE'], latitude)
        formData.append(apiKey['LONGITUDE'], longitude)
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
                {/* <ImagePickerSelection pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} /> */}
                <LicensePopup
                    source={{ uri: providerprofile?.['DocumentPath'] }}
                    dismiss={() => setmodalVisible(false)}
                    isVisible={modalVisible} />
                <LicensePickerSelection pickerModal={isVisible} onCancelPress={() => setVisible(false)} selectedImage={_getLicenseImage} />
                {/* <MyView style={styles['imageContainer']}>
                    <MyImage source={uri ? { uri: uri ? uri : providerprofile?.['ProfilePic'] } : imagePlaceholder} style={styles['image']} />
                    <Touchable onPress={_openPicker} style={[styles['imageContainer'], { position: 'absolute', backgroundColor: TRANSPARENT_LIGHT_BLACK }]} >
                        <MyImage source={cameraIcon} />
                    </Touchable>
                </MyView> */}
                <MyText style={{ fontSize: 19, fontFamily: montserratBold, marginTop: 10 }}>{ACCOUNT}</MyText>
                {/* <MyText onPress={() => setVisible(true)} style={{ textDecorationLine: "underline", color: THEME, marginTop: 5, marginLeft: 5 }}>
                    {"Update License"}
                </MyText> */}
                <NewThemeInput
                    mainContainerStyle={{ marginTop: 10 }}
                    value={name}
                    placeholder={NAME}
                    source={accountNameIcon}
                    onChangeText={_onChangeText(TYPES['NAME'])}
                    // onSubmitEditing={_focusNext(TYPES['NAME'])}
                    blurOnSubmit={false}
                    errorMessage={nameError || null}
                />
                <NewThemeInput
                    mainContainerStyle={{ marginTop: 10 }}
                    value={username}
                    placeholder={USERNAME}
                    source={usernameIcon}
                    onChangeText={_onChangeText(TYPES['USERNAME'])}
                    // onSubmitEditing={_focusNext(TYPES['USERNAME'])}
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
                    // onSubmitEditing={_focusNext(TYPES['EMAIL'])}
                    keyboardType={'email-address'}
                    autoCapitalize='none'
                    blurOnSubmit={false}
                    errorMessage={emailError || null}
                />
                <MyView style={{ alignSelf: 'flex-end', marginRight: dynamicSize(35), marginTop: 5 }}>
                    <MyText onPress={_updateEmail} style={{ textDecorationLine: 'underline', color: THEME, paddingVertical: dynamicSize(5) }}>{UPDATE_EMAIL}</MyText>
                </MyView>
                <NewThemeDropdown
                    onChange={_changeGender}
                    source={genderIcon}
                    data={genderData}
                    value={gender}
                    placeholder={'Gender'}
                    containerStyle={{ height: 10 }}
                />
                {/* <Touchable onPress={openMapModal}> */}
                {/* <MyView pointerEvents="none"> */}
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
                {/* </MyView> */}
                {/* </Touchable> */}
                <MyText style={{ fontSize: 19, fontFamily: montserratBold, marginVertical: 15 }}>{LICENSE}</MyText>

                <NewThemeInput
                    textOnly
                    source={certificateIcon}
                    sourceStyle={{ width: 25, height: 25 }}
                    onTextPress={() => setmodalVisible(true)}
                    inputStyle={{ fontFamily: montserrat, fontSize: 14, textAlign: 'center' }}
                    value={'View Lisense'}
                    rightLabel={UPDATE}
                    rightLabelStyle={{ fontSize: 14 }}
                    onRightPress={() => setVisible(true)}
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