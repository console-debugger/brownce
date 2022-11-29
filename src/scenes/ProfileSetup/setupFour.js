import React, { useState, useCallback } from 'react'
import { SafeArea, MyView, MyText, Button, SecondaryButton } from '../../components/customComponent'
import { LIGHT_WHITE } from '../../utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import commonStyle from '../../components/commonStyle'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_HEIGHT } from '../../components/helper'
import styles from './styles'
import { apiKey } from '../../services/serviceConstant'
import { saveGenderAction, loaderAction, getCsDataStepAction } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'

const TYPES = { MALE: 'male', FEMALE: 'female', TRANSGENDER_FEMALE: 'transgenderFemale', TRANSGENDER_MALE: 'transgenderMale', NON_BINARY: 'nonBinary', OTHER: 'other' }

// Profile setup UI
const ProfileSetupFour = ({ navigation }) => {

    const dispatch = useDispatch()

    const state = useSelector(state => { return state })
    const { I_AM_A, MALE, FEMALE, TRANSGENDER_FEMALE, TRANSGENDER_MALE, NON_BINARY, OTHER, CONTINUE } = state['localeReducer']['locale']

    const [gender, setGender] = useState(1)

    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            // dispatch(getCsDataStepAction(9))
        }, [])
    )

    const _selectGender = type => () => {
        if (type === TYPES['MALE']) setGender(1)
        if (type === TYPES['FEMALE']) setGender(2)
        if (type === TYPES['TRANSGENDER_FEMALE']) setGender(3)
        if (type === TYPES['TRANSGENDER_MALE']) setGender(4)
        if (type === TYPES['NON_BINARY']) setGender(5)
        if (type === TYPES['OTHER']) setGender(6)
    }

    const _saveGender = () => {
        const param = {
            [apiKey['GENDER']]: gender
        }
        dispatch(saveGenderAction(param))
    }

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={{ alignItems: 'center', flex: 1 }}>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.1 }]}>{I_AM_A}</MyText>
                <MyView style={styles['genderParent']}>
                    <MyView style={styles['row']}>
                        <SecondaryButton
                            onPress={_selectGender(TYPES['MALE'])}
                            style={gender === 1 ? styles['selected'] : styles['unselected']}
                            textStyle={gender === 1 ? styles['selectedText'] : styles['unselectedText']}
                            text={MALE}
                        />
                        <SecondaryButton
                            onPress={_selectGender(TYPES['FEMALE'])}
                            style={gender === 2 ? styles['selected'] : styles['unselected']}
                            textStyle={gender === 2 ? styles['selectedText'] : styles['unselectedText']}
                            text={FEMALE}
                        />
                    </MyView>
                    <SecondaryButton
                        onPress={_selectGender(TYPES['TRANSGENDER_FEMALE'])}
                        style={[gender === 3 ? styles['selected'] : styles['unselected'], { width: '100%' }]}
                        textStyle={gender === 3 ? styles['selectedText'] : styles['unselectedText']}
                        text={TRANSGENDER_FEMALE}
                    />
                    <SecondaryButton
                        onPress={_selectGender(TYPES['TRANSGENDER_MALE'])}
                        style={[{ width: '100%' }, gender === 4 ? styles['selected'] : styles['unselected']]}
                        textStyle={gender === 4 ? styles['selectedText'] : styles['unselectedText']}
                        text={TRANSGENDER_MALE}
                    />
                    <MyView style={styles['row']}>
                        <SecondaryButton
                            onPress={_selectGender(TYPES['NON_BINARY'])}
                            style={gender === 5 ? styles['selected'] : styles['unselected']}
                            textStyle={gender === 5 ? styles['selectedText'] : styles['unselectedText']}
                            text={NON_BINARY}
                        />
                        <SecondaryButton
                            onPress={_selectGender(TYPES['OTHER'])}
                            style={gender === 6 ? styles['selected'] : styles['unselected']}
                            textStyle={gender === 6 ? styles['selectedText'] : styles['unselectedText']}
                            text={OTHER}
                        />
                    </MyView>
                </MyView>
                <Button onPress={_saveGender} style={styles['buttonStyle']} text={CONTINUE} />
            </MyView>
        </SafeArea>
    )
}

export default ProfileSetupFour