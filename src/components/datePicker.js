import React, { useState } from 'react'
import { Touchable, MyText } from './customComponent'
import commonStyle from './commonStyle'
import { BLACK, LIGHT_GRAY } from '../utils/colors'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { dobFormat, timeFormat } from './momentHelper';
import { useSelector } from 'react-redux';


const _DateTimePicker = props => {
    const { Locale, is24, selectedDate, selectedTime, children, style, placeholder, textStyle, mode, maxDate, minDate } = props
    const state = useSelector(state => { return state })
    const { DD_MM_YYYY } = state['localeReducer']['locale']

    const [showPicker, setPicker] = useState(false)
    const [dob, setDob] = useState('')
    const [dobMonth, setDobMonth] = useState('')
    const [dobYear, setDobYear] = useState('')
    const [dobDate, setDobDate] = useState('')

    const _showPicker = () => setPicker(true)

    const _closePicker = () => setPicker(false)

    const _onConfirm = date => {
        const resultDob = new Date(moment(date).year(), moment(date).month(), moment(date).date())
        setDobYear(moment(date).year())
        setDobMonth(moment(date).month())
        setDobDate(moment(date).date())
        if (mode === 'time') {
            setDob(timeFormat(date))
            selectedTime(timeFormat(date))
        }
        else {
            setDob(dobFormat(resultDob))
            selectedDate(dobFormat(resultDob))
        }
        _closePicker()
    }

    return (
        <>
            <Touchable onPress={_showPicker} style={[commonStyle['datePickerView'], style]}>
                <MyText style={[[commonStyle['datePlaceholder'], { color: dob ? BLACK : LIGHT_GRAY }], textStyle]}>{dob ? dob : placeholder ? placeholder : DD_MM_YYYY}</MyText>
                {children}
            </Touchable>
            <DateTimePickerModal
                is24Hour={is24}
                locale={Locale}
                minimumDate={minDate}
                maximumDate={maxDate}
                isVisible={showPicker}
                mode={mode || 'date'}
                value={new Date(dobYear, dobMonth, dobDate)}
                display={'spinner'}
                onConfirm={_onConfirm}
                onCancel={_closePicker}
            />
        </>
    )
}

export default _DateTimePicker