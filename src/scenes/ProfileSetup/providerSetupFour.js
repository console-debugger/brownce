import React, { useState, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, Input, KeyboardAwareScroll, MyText, SafeArea } from '../../components/customComponent'
import { dismissKeyboard, SCREEN_HEIGHT } from '../../components/helper'
import { saveDepositeFeesAction, getSpDataStepAction, loaderAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { BLACK, LIGHT_BROWN, LIGHT_GRAY, LIGHT_WHITE } from '../../utils/colors'
import { validatePrice } from '../../utils/validation'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { navigateToScreen } from '../../navigation/rootNav'
import { dynamicSize } from '../../utils/responsive'

//Provier profile setup
const ProviderProfileSetupFour = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { MY, DEPOSIT_FEES, ENTER_FEES, CONTINUE } = state['localeReducer']['locale']

    const [fees, setFees] = useState('')
    const [feesError, setFeesError] = useState('')
    const [focus, setFocus] = useState(0)

    const _onChangeText = text => setFees(text.trim())

    const _focus = () => setFocus(1)

    const _blur = () => setFocus(0)

    const _submitEditing = () => dismissKeyboard()

    const _validate = () => {
        validatePrice(fees).status ?
            _saveFees()
            : setFeesError(validatePrice(fees).error)
    }
    useFocusEffect(
        useCallback(() =>{
        //  dispatch(loaderAction(true))
        //  dispatch(getSpDataStepAction(9))
        },[])
    )
    const _saveFees = () => {
        setFeesError('')
        const param = {
            [apiKey['DEPOSIT_FEES']]: fees
        }
        dispatch(saveDepositeFeesAction(param))
    }

    const _complete_later = () => navigateToScreen('providerProfessionSelection')

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.1 }]}>{`${MY}\n${DEPOSIT_FEES}`}</MyText>
                <Input
                    styleContainer={{ marginVertical: SCREEN_HEIGHT * 0.06 }}
                    style={{ borderBottomColor: focus === 1 ? BLACK : LIGHT_GRAY }}
                    value={fees}
                    placeholder={ENTER_FEES}
                    keyboardType='phone-pad'
                    onChangeText={_onChangeText}
                    onFocus={_focus}
                    onBlur={_blur}
                    onSubmitEditing={_submitEditing}
                    returnKeyType='done'
                    errorMessage={feesError || null}
                />
                <Button onPress={_validate} style={styles['buttonStyleCont']} text={CONTINUE} />
                <Button onPress={_complete_later} style={[styles['buttonStyleCont'], { backgroundColor: LIGHT_BROWN, marginTop: dynamicSize(-10) }]} text={'COMPLETE LATER'} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ProviderProfileSetupFour