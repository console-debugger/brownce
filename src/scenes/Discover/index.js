import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Image, ImageBackground, Platform } from "react-native"
import { SafeArea, MyView, MyText, Button, Touchable, MyImage, TouchableIcon } from '../../components/customComponent'
import MapView, { PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'
import { locateIcon, backIcon, mapbgIcon } from '../../components/icons';
import Geolocation from "react-native-geolocation-service"
import { montserratBold } from '../../utils/fontFamily';
import { getFontSize } from '../../utils/responsive';
import { getCurrentLocation } from '../../components/geolocation';
import { isIOS } from '../../components/helper';
import { THEME } from '../../utils/colors';
import { SearchProviderAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'

const Discover = ({ navigation }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { LET_US_FIND_YOU_FIND_YOUR_STYLIST, GO } = state['localeReducer']['locale']
    const { searchproviderlist } = state['profileReducer']
    const [latitude, setlatitude] = useState('')
    const [longitude, setlongitude] = useState('')

    const mapRef = useRef('mapRef')

    useEffect(() => {
        isIOS ? _fetchLocation() : _fetchLoactionAndroid()
    }, [])

    const _fetchLocation = async () => {
        const hasLocationPermission = await Geolocation.requestAuthorization('always')
        if (hasLocationPermission == 'denied' || hasLocationPermission == 'disabled' || hasLocationPermission == 'restricted') {
            return
        }
        Geolocation.getCurrentPosition(
            async (position) => {
                let tempCoords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }
                setlatitude(tempCoords.latitude)
                setlatitude(tempCoords.longitude)
                getAllProviders(tempCoords.latitude, tempCoords.longitude)
                mapRef.current.animateToCoordinate(tempCoords, 1000);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { timeout: 15000, maximumAge: 10000 }
        )
    }

    // @ locally add location
    const _fetchLoactionAndroid = () => {
        getCurrentLocation().then(resp => {
            if (resp.status) {
                setlatitude(resp.payload.latitude)
                setlongitude(resp.payload.longitude)
                getAllProviders(resp.payload.latitude, resp.payload.longitude)
            }
            else alert(resp.payload.message || resp.payload)
        }).catch(er => console.log('Error while access location', er))
    }

    // @ Fetch current location
    const accessLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                let tempCoords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }
                mapRef.current.animateToCoordinate(tempCoords, 1000);
            },
            (err) => {
                console.log(err)
            }
        )
    }

    const _navToNext = () => navigation.navigate('discoveryOne')

    const getAllProviders = (lat, lng) => {
        const param = {
            [apiKey['Lat']]: lat,
            [apiKey['Lng']]: lng,
            [apiKey['Distance']]: 1000000000,
        }
        dispatch(SearchProviderAction(param))
    }

    return (
        <SafeArea style={{ backgroundColor: 'transparent' }} >
            <MyView style={{ flex: 1, alignItems: 'center' }}>

                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles['mapView']}
                    onMapReady={isIOS ? _fetchLocation : _fetchLoactionAndroid}
                    initialRegion={{
                        latitude: latitude ? latitude : 40.38190380557175,
                        longitude: longitude ? longitude : -75.90530281564186,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,

                    }}
                >
                    <MapView.Marker
                        coordinate={{ latitude: latitude ? latitude : 40.38190380557175, longitude: longitude ? longitude : -75.90530281564186 }}
                        pinColor={"yellow"}
                    >
                    </MapView.Marker>
                    {searchproviderlist?.map((item, index) => {
                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={{ latitude: Number(item['Lat']), longitude: Number(item['Lng']) }}
                                pinColor={THEME}>
                                <Callout
                                    alphaHitTest
                                    tooltip={Platform.OS === 'ios'}
                                    style={styles.customView}
                                    onPress={() => navigation.navigate('providerDetail', { id: item.UserId })}>
                                    <ImageBackground
                                        source={mapbgIcon}
                                        style={styles.bubble}>
                                        <View style={styles['view']}>
                                            <Text style={styles['text']}>
                                                <Image
                                                    source={{ uri: item['ProfilePic'] }}
                                                    style={styles['image']} />
                                            </Text>
                                        </View>
                                        <Text style={{ alignSelf: "center", left: Platform.OS == "ios" ? 6 : 5, bottom: -8, fontFamily: montserratBold, fontSize: getFontSize(12) }}>
                                            {item['Name']}
                                        </Text>
                                    </ImageBackground>
                                </Callout>
                            </MapView.Marker>
                        )
                    })}
                </MapView>
            </MyView>
            <MyView style={styles['backView']} >
                <TouchableIcon
                    style={{ height: 20 }}
                    source={backIcon}
                    onPress={() => navigation.goBack()} />
            </MyView>
            <MyView style={styles['bottomSheet']}>
                <Touchable onPress={accessLocation} style={styles['locateIcon']}>
                    <MyImage source={locateIcon} />
                </Touchable>
                <MyView style={styles['bottomView']} >
                    <MyText style={styles['helpText']}>{LET_US_FIND_YOU_FIND_YOUR_STYLIST}</MyText>
                    <Button onPress={_navToNext} text={GO} style={styles['buttonStyle']} />
                </MyView>
            </MyView>
        </SafeArea>
    )
}

export default Discover