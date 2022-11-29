import React, { useState, useCallback } from 'react'
import { SafeArea, MyText, MyView, Button } from '../../components/customComponent'
import { LIGHT_WHITE, } from '../../utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { SCREEN_HEIGHT, showToast } from '../../components/helper'
import styles from './styles'
import { dynamicSize } from '../../utils/responsive';
import DateTimePicker from '../../components/datePicker';
import { apiKey } from '../../services/serviceConstant'
import { profileSetupTwoAction, loaderAction, getCsDataStepAction } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'

// Profile setup UI
const ProfileSetupTwo = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { MY, BIRTHDAY_IS, CONTINUE, PLEASE_SELECT_YOUR_DOB } = state['localeReducer']['locale']
    const [dob, setDob] = useState('')

    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            // dispatch(getCsDataStepAction(6))

        }, [])
    )

    const _navToProfileSetup = () => {
        dob ?
            _saveDob()
            : showToast(PLEASE_SELECT_YOUR_DOB)
    }

    const _saveDob = () => {
        const param = {
            [apiKey['DOB']]: dob
        }
        dispatch(profileSetupTwoAction(param))
    }

    const _selectedDate = date => setDob(date)

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={styles['mainContainer']}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.1 }]}>{MY}</MyText>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle']]}>{BIRTHDAY_IS}</MyText>
                <DateTimePicker maxDate={new Date()} selectedDate={_selectedDate} />
                <Button onPress={_navToProfileSetup} style={[styles['buttonStyle'], { marginTop: dynamicSize(10) }]} text={CONTINUE} />
            </MyView>
        </SafeArea>
    )
}

export default ProfileSetupTwo