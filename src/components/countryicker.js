import React, { useState } from 'react'
import CountryPicker from 'react-native-country-picker-modal'
import { Touchable, MyText, MyImage } from './customComponent'
import commonStyle from './commonStyle'
import { BLACK, LIGHT_GRAY, WHITE } from '../utils/colors'
import { useSelector } from 'react-redux'
import { downArrow } from './icons'
import { dynamicSize, getFontSize } from '../utils/responsive'
import { montserratSemiBold } from '../utils/fontFamily'

const MyCountryPicker = props => {

    const { pickerStyle, selected, style, textStyle } = props

    const state = useSelector(state => { return state })
    const { COUNTRY } = state['localeReducer']['locale']

    const [country, setCountry] = useState('')
    const [isCountryPickerShow, setPickerModal] = useState(false)
    const [countryCode, setCountryCode] = useState('')

    const _openCountryPicker = () => setPickerModal(true)

    const _closeCountryPicker = () => setPickerModal(false)

    const _onSelect = country => {
        selected(country)
        setCountry(country.name)
    }

    return (
        <>
            <Touchable onPress={_openCountryPicker} style={[commonStyle['datePickerView'], { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, style]}>
                <MyText style={[commonStyle['datePlaceholder'], { color: country ? BLACK : LIGHT_GRAY }, textStyle]}>{country ? country : COUNTRY}</MyText>
                <MyImage source={downArrow} />
            </Touchable>
            <CountryPicker
                containerButtonStyle={[{ height: dynamicSize(40), justifyContent: 'center', height: 0, opacity: 0 }, pickerStyle]}
                theme={{ fontSize: getFontSize(16), fontFamily: montserratSemiBold, onBackgroundTextColor: BLACK }}
                {...{
                    countryCode,
                    withFilter: true,
                    withFlag: true,
                    withAlphaFilter: true,
                    withCallingCode: true,
                    withCallingCodeButton: true,
                    onSelect: _onSelect
                }}
                onOpen={_openCountryPicker}
                onClose={_closeCountryPicker}
                visible={isCountryPickerShow}
            />
        </>
    )
}

export default MyCountryPicker