import React, { useState, useCallback } from 'react'
import { KeyboardAwareScroll, MyText, SafeArea, Input, Button } from '../../components/customComponent'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { LIGHT_WHITE, BLACK, LIGHT_GRAY, LIGHT_BROWN } from '../../utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import commonStyle from '../../components/commonStyle'
import { dismissKeyboard, SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { apiKey } from '../../services/serviceConstant'
import { providerBioAction, loaderAction, getSpDataStepAction } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'
import { navigateToScreen } from '../../navigation/rootNav'
import { dynamicSize } from '../../utils/responsive'

// Provider Bio

const ProviderBio = ({ navigation }) => {

    const dispatch = useDispatch()

    const state = useSelector(state => { return state })
    const { CONTINUE } = state['localeReducer']['locale']

    const [focus, setFocus] = useState(-1)
    const [name, setName] = useState('')

    const _focus = () => setFocus(1)

    const _clearFocus = () => setFocus(-1)

    const _onChangeText = text => setName(text)

    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            // dispatch(getSpDataStepAction(6))
        }, [])
    )
    const _validate = () => {
        name.length ?
            _saveProfile()
            : showToast("Please enter bio")
    }

    const _saveProfile = () => {
        dismissKeyboard()
        const formData = new FormData()
        formData.append(apiKey['Bio'], name)
        dispatch(providerBioAction(formData))
    }

    const _complete_later = () => navigateToScreen('profileSetupThree')

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center', marginVertical: SCREEN_HEIGHT * 0.2 }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.05 }]}>{"MY BIO"}</MyText>
                <Input
                    multiline
                    style={{ borderBottomColor: focus === 1 ? BLACK : LIGHT_GRAY, marginVertical: SCREEN_HEIGHT * 0.02 }}
                    onFocus={_focus}
                    onBlur={_clearFocus}
                    value={name}
                    containerStyle={{ marginTop: SCREEN_WIDTH * 0.01 }}
                    textInputStyle={{ lineHeight: 18, height: SCREEN_WIDTH * 0.2 }}
                    placeholder={"Enter Bio"}
                    onChangeText={_onChangeText}
                    returnKeyType='done'
                />
                <Button onPress={_validate} style={styles['buttonStyle']} text={CONTINUE} />
                <Button onPress={_complete_later} style={[styles['buttonStyle'], { backgroundColor: LIGHT_BROWN, marginTop: dynamicSize(10) }]} text={'COMPLETE LATER'} />             
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ProviderBio