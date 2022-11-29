import React, { useState, useRef, useCallback } from 'react'
import { SafeArea, MyView, MyText, Button, KeyboardAwareScroll, CustomModal, TouchableIcon, Touchable } from '../../components/customComponent'
import styles from './styles'
import { LIGHT_WHITE, BLACK, THEME, LIGHT_BROWN, WHITE } from '../../utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import commonStyle from '../../components/commonStyle'
import { SCREEN_HEIGHT, showToast, isIOS, isCustomer, SCREEN_WIDTH, getCurrentLocationCoordinate } from '../../components/helper'
import { useDispatch, useSelector } from 'react-redux'
import MyListPicker from '../../components/myListPicker'
import { getCityListAction, getCountryListAction, getStateListAction, saveLocationAction, loaderAction, getSpDataStepAction, getCsDataStepAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import Geolocation from 'react-native-geolocation-service';
import { useFocusEffect } from '@react-navigation/native'
import { getCurrentLocation } from '../../components/geolocation'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { navigateToScreen } from '../../navigation/rootNav'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { redCrossIcon } from '../../components/icons'
import { GOOGLE_API_KEY } from '../../services/serviceConfig'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { reverseGeocode } from '../../services'

// Profile setup UI
const ProfileSetupThree = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { SEARCH_LOCATION, MY, LOCATION_IS, COUNTRY, LOCATE_ON_MAP, CITY, STATE, CONTINUE, PLEASE_SELECT_CITY, PLEASE_SELECT_STATE, PLEASE_SELECT_COUNTRY, PLEASE_WAIT_WHILE_FETCHING_COUNTRY_LIST, PLEASE_WAIT_WHILE_FETCHING_STATE_LIST, PLEASE_WAIT_WHILE_FETCHING_CITY_LIST } = state['localeReducer']['locale']
    const { country, userState, city } = state['addressReducer']

    const initialFormField = {
        selectedCountry: '',
        selectedCity: '',
        selectedUserState: '',
        selectedCityId: ''
    }

    const initialError = {
        countryError: '',
        cityError: '',
        stateError: ''
    }

    const [{ selectedCountry, selectedCity, selectedUserState, selectedCityId }, setFormField] = useState(initialFormField)
    const [{ cityError, stateError, countryError }, setError] = useState(initialError)
    const [focus, setFocus] = useState(-1)
    const [isMapModalVisible, setModalVisible] = useState(false)
    const [latitude, setlatitude] = useState('')
    const [longitude, setlongitude] = useState('')
    const [autoCompleteModal, setAutoCompleteModal] = useState(false)
    const stateRef = useRef('stateRef')
    const mapRef = useRef('mapRef')

    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            // dispatch(getSpDataStepAction(7))
            // dispatch(getCsDataStepAction(7))
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            // _fetchLocation()
            isIOS ? _fetchLoaction() : _fetchLoactionAndroid()
            // dispatch(getCountryListAction())
        }, [])
    )

    // const _fetchLocation = async () => {
    //     try {
    //         const coordinates = await getCurrentLocationCoordinate()
    //         console.log('coordinates==>',coordinates)
    //         setlatitude(coordinates.latitude)
    //         setlongitude(coordinates.longitude)
    //     } catch (error) {
    //         console.log('errror=>',error)
    //         alert(error.message)
    //     }
    // }


    const _fetchLoactionAndroid = () => {
        getCurrentLocation().then(resp => {
            if (resp.status) {
                setlatitude(resp.payload.latitude)
                setlongitude(resp.payload.longitude)
            }
            else alert(resp.payload.message || resp.payload)
        }).catch(er => console.log('Error while access location', er))
    }

    const _openAutocomplete = () => setAutoCompleteModal(true)

    const _closeAutocomplete = () => setAutoCompleteModal(false)

    const _fetchLoaction = async () => {
        const hasLocationPermission = await Geolocation.requestAuthorization('always')
        if (hasLocationPermission == 'denied' || hasLocationPermission == 'disabled' || hasLocationPermission == 'restricted') {
            return
        }
        Geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                }
                setlatitude(location.latitude)
                setlongitude(location.longitude)
            },
            (error) => {
                console.log('error', error['message'])
            },
            { timeout: 20000, maximumAge: 10000 }
        )
    }

    const _selectedCountry = data => {
        setFormField(prevState => ({ ...prevState, selectedCountry: data['Name'], selectedUserState: '', selectedCity: '' }))
        dispatch(getStateListAction(data['CountryId']))
    }

    const _selectedState = data => {
        setFormField(prevState => ({ ...prevState, selectedUserState: data['Name'], selectedCity: '' }))
        dispatch(getCityListAction(data['StateId']))
    }

    const _selectedCity = data => {
        setFormField(prevState => ({ ...prevState, selectedCity: data['Name'], selectedCityId: data['CityId'] }))
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
            setFormField(prevState => ({ ...prevState, selectedCityId: city, selectedUserState: userState }))
            console.log('response===>', city, userState)
        }

    }

    const _validate = () => {
        if (!latitude && !longitude) {
            return alert('Unable to fetch coordinates of your selected location')
        }
        else {
            _saveLocation()
        }
    }

    const _saveLocation = () => {
        const param = {
            'StateName': selectedUserState,
            [apiKey['CITY_NAME']]: selectedCityId,
            [apiKey['LATITUDE']]: latitude || 40.38190380557175,
            [apiKey['LONGITUDE']]: longitude || -75.90530281564186
        }
        dispatch(saveLocationAction(param))
    }

    console.log('lat==>', latitude, longitude)

    const _complete_later = () => isCustomer() ? navigateToScreen('profileSetupFive') : navigateToScreen('providerProfileSetupThree')

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{}}>
                <MyView style={{ alignItems: 'center' }}>
                    <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.1 }]}>{MY}</MyText>
                    <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle']]}>{LOCATION_IS}</MyText>
                    {/* <Touchable onPress={_openAutocomplete} style={styles.searchBox}>
                        <MyText style={styles.searchLocaitonText}>{SEARCH_LOCATION}</MyText>
                    </Touchable> */}
                    {/* <MyListPicker message={PLEASE_WAIT_WHILE_FETCHING_COUNTRY_LIST} value={selectedCountry} placeholder={COUNTRY} data={country} selectedItem={_selectedCountry} />
                    <MyListPicker message={PLEASE_WAIT_WHILE_FETCHING_STATE_LIST} value={selectedUserState} placeholder={STATE} data={userState} selectedItem={_selectedState} />
                    <MyListPicker message={PLEASE_WAIT_WHILE_FETCHING_CITY_LIST} value={selectedCity} placeholder={CITY} data={city} selectedItem={_selectedCity} /> */}
                    <MyView style={{ flex: 1 }}>
                        {/* <GooglePlacesAutocomplete
                        placeholder='Search'
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log('hey=>',data, details);
                        }}
                        query={{
                            key: GOOGLE_API_KEY,
                            language: 'en',
                        }}
                        onFail={(error) => console.log('error=>',error)}
                        styles={{container:{width: SCREEN_WIDTH - dynamicSize(70), marginVertical:dynamicSize(30) }}}
                        fetchDetails={true}
                    /> */}
                    </MyView>
                    <Button onPress={openMapModal} style={[styles['buttonStyle'], { marginTop: dynamicSize(25) }]} text={LOCATE_ON_MAP} />
                    <Button disabled={(!latitude && !longitude)} onPress={_validate} style={[styles['buttonStyle'], { marginVertical: dynamicSize(10), backgroundColor: (latitude && longitude) ? THEME : LIGHT_BROWN }]} text={CONTINUE} />
                    <Button disabled={(!latitude && !longitude)} onPress={_complete_later} style={[styles['buttonStyle'], { backgroundColor: (latitude && longitude) ? THEME : LIGHT_BROWN }]} text={'COMPLETE LATER'} />
                </MyView>
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
                    <Button onPress={closeMapModalFuntion} style={[styles['buttonStyle'], { position: 'absolute', zIndex: 10, bottom: useSafeAreaInsets().bottom + dynamicSize(10), alignSelf: 'center' }]} text={'CONTINUE'} textStyle={{ color: WHITE }} />
                </CustomModal>
                {/* <MyText style={{ textAlign: 'center', alignSelf: 'center', color: THEME, fontWeight: 'bold', fontSize: getFontSize(15), marginHorizontal: 20, marginTop: 10 }}>
                    {'Note:'}
                    <MyText style={{ color: BLACK, fontWeight: 'bold', fontSize: getFontSize(13) }}>
                        {' Location permission is required.'}
                    </MyText>
                    <MyText style={{ color: BLACK, fontWeight: 'bold', fontSize: getFontSize(13) }}>
                        {'If you are having trouble selecting your location, go to your settings. Click on the Brownce app. In the Location section, under the “Allow Location Access”, select “Always”. Exit completely out of Brownce and log back in. Fill in the location info. Then, you will be able to proceed with the sign-up process.'}
                    </MyText>
                </MyText> */}

            </KeyboardAwareScroll>

        </SafeArea>
    )
}

export default ProfileSetupThree