import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, CustomSlider, MyText, MyView, SafeArea, TouchableIcon } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { dynamicSize } from '../../utils/responsive'
import styles from './styles'
import { apiKey } from '../../services/serviceConstant'
import { SearchProviderAction } from '../../redux/action'
import Geolocation from '@react-native-community/geolocation';
import { backIcon } from '../../components/icons'

// @ Discovery Steps

const DiscoverFour = ({ navigation }) => {

    let filterServiceId = [], newArr = []

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { LET_US_FIND_A_HELP_FOR_YOU, WHAT_IS_THE_IDEAL_DISTANCE_RANGE, NEXT } = state['localeReducer']['locale']
    const { services, updatemaintainance, updatepricerange } = state['hairReducer']

    const [latitude, setlatitude] = useState('')
    const [value, setValue] = useState('')
    const [longitude, setlongitude] = useState('')

    const [sliderValue, setSliderValue] = useState(0)

    const _onSliderChange = value => setValue(value)

    const _onSlidingComplete = value => setValue(value)

    const _validate = () => {
        value != 0 ?
            _completeSearch()
            : showToast("Please select distance range")
    }

    const left = value * (SCREEN_WIDTH - 60) / 250 - value/3;

    useEffect(() => {
        Geolocation.getCurrentPosition(async (position) => {
            setlatitude(position.coords.latitude)
            setlongitude(position.coords.longitude)
        })
    }, [])

    // Search providers 
    const _completeSearch = () => {
        for (let i = 0; i < services.length; i++) {
            filterServiceId.push(services[i].filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] }))
        }
        for (var i = 0; i < filterServiceId.length; i++) {
            newArr = newArr.concat(filterServiceId[i]);
        }
        const filterMaintainanceId = updatemaintainance.filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
        const filterpricerangeId = updatepricerange.filter(item => { if (item['status']) return item }).map(each => { return each['PriceRangeMasterId'] })
        const string = filterpricerangeId.toString()
        const param = {
            [apiKey['Lat']]: latitude || 40.38190380557175,
            [apiKey['Lng']]: longitude || -75.90530281564186,
            [apiKey['Distance']]: value,
            [apiKey['PriceRange']]: string,
            [apiKey['Hairstyles']]: newArr,
            [apiKey['Maintenance']]: filterMaintainanceId
        }
        dispatch(SearchProviderAction(param))
    }
    
    return (
        <SafeArea >
            <MyView style={{ flexDirection: "row", alignItems: "center", marginLeft: SCREEN_WIDTH * 0.03 }} >
                <TouchableIcon
                    style={{ padding: dynamicSize(10), paddingLeft: 0, position: 'absolute' }}
                    source={backIcon}
                    onPress={() => navigation.goBack()} />
                <MyText style={styles['boldTitle']}>{LET_US_FIND_A_HELP_FOR_YOU}</MyText>
            </MyView>
            <MyView style={{ alignItems: "center" }}>
                <MyText style={[styles['themeTitle'], { marginVertical: SCREEN_HEIGHT * 0.05 }]}>{WHAT_IS_THE_IDEAL_DISTANCE_RANGE}</MyText>
                <MyView style={{ flexDirection: 'row', marginVertical: SCREEN_HEIGHT * 0.1 }}>
                    <MyText style={[styles['value'], { left: 0 }]}>{0}</MyText>
                    <MyText style={[styles['value'], { textAlign: "center", left: left }]}>{value ? Math.floor(value) + 'miles' : ''}</MyText>
                    <CustomSlider
                        onSlidingComplete={_onSlidingComplete}
                        value={sliderValue}
                        minimumValue={0}
                        maximumValue={250}
                        step={10}
                        onValueChange={_onSliderChange}
                    />
                    <MyText style={[styles['value'], { right: 0 }]}>{ }</MyText>
                </MyView>
                <Button onPress={_validate} text={NEXT} style={{ width: SCREEN_WIDTH - dynamicSize(70) }} />
            </MyView>
        </SafeArea>
    )
}

export default DiscoverFour