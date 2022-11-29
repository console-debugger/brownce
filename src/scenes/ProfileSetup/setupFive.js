import React, { useEffect, useCallback, useState } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { MyView, SafeArea, SecondaryButton, MyText, TouchableIcon, Button, CustomSlider } from '../../components/customComponent'
import { LIGHT_WHITE } from '../../utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { dynamicSize } from '../../utils/responsive'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_WIDTH, SCREEN_HEIGHT, showToast } from '../../components/helper'
import commonStyle from '../../components/commonStyle'
import { aboutIcon } from '../../components/icons'
import { getHairTypeAction, saveHairTypeAction, updateHairTypeAction, loaderAction, getCsDataStepAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { useFocusEffect } from '@react-navigation/native'

// Provider profile setup UI
const ProfileSetupFive = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { WHAT_IS_YOUR, HAIR_TYPE, CONTINUE, PLEASE_SELECT_YOUR_HAIR_TYPE } = state['localeReducer']['locale']
    const { hariTypes } = state['hairReducer']
    const [value, setValue] = useState('')
    const left = value * (SCREEN_WIDTH - 60) / 10 - 15;
    const [sliderValue, setSliderValue] = useState(0)

    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            // dispatch(getCsDataStepAction(8))
        }, [])
    )

    useEffect(() => {
        dispatch(getHairTypeAction())
    }, [])

    const _selectHairType = (item, index) => () => {
        const replica = [...hariTypes]
        for (let i = 0; i < hariTypes.length; i++) {
            if (item['HairTypeMasterId'] === replica[i]['HairTypeMasterId']) {
                replica[i]['status'] = true
            }
            else {
                replica[i]['status'] = false
            }
        }
        dispatch(updateHairTypeAction([...replica]))
    }

    const _renderItem = ({ item, index }) => {
        return (
            <SecondaryButton
                onPress={_selectHairType(item, index)}
                style={[item['status'] ? styles['selected'] : styles['unselected'], { borderRadius: dynamicSize(5) }]}
                textStyle={item['status'] ? styles['selectedText'] : styles['unselectedText']}
                text={item['HairTypeName']}
            />
        )
    }

    const _validate = () => {
        const selected = hariTypes.filter(item => { if (item['status']) return item }).map(each => { return each['HairTypeMasterId'] })
        if (selected.length) {
            if (value) {
                const param = {
                    [apiKey['HAIR_TYPE_ID']]: selected,
                    [apiKey['TENDER_HEAD_LEVEL']]: value
                }
                dispatch(saveHairTypeAction(param))
            }
            else showToast("Please select tenderhead level")
        }
        else showToast(PLEASE_SELECT_YOUR_HAIR_TYPE)
    }

    const _onSliderChange = value => {
        setValue(value)
    }

    const _onSlidingComplete = value => {
        setValue(value)
    }

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <ScrollView>
                <MyView style={{ alignItems: 'center', }}>
                    <MyView style={styles['hairType']}>
                        <MyView style={{ alignSelf: 'flex-start' }}>
                            <MyText style={commonStyle['extraBoldText']}>{WHAT_IS_YOUR}</MyText>
                            <MyText style={commonStyle['extraBoldText']}>{HAIR_TYPE.toUpperCase()}</MyText>
                        </MyView>
                        <TouchableIcon source={aboutIcon} />
                    </MyView>
                    <FlatList
                        scrollEnabled={false}
                        data={hariTypes}
                        renderItem={_renderItem}
                        contentContainerStyle={styles['flatList']}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />
                    <MyView style={{ alignSelf: 'flex-start', marginHorizontal: SCREEN_WIDTH * 0.08 }}>
                        <MyText style={commonStyle['extraBoldText']}>{WHAT_IS_YOUR}</MyText>
                        <MyText style={commonStyle['extraBoldText']}>{"TENDERHEAD LEVEL"}</MyText>
                    </MyView>
                    <MyView style={{ flexDirection: 'row', marginVertical: SCREEN_HEIGHT * 0.04 }}>
                        <MyText style={[styles['value'], { left: 0 }]}>{0}</MyText>
                        <MyText style={[styles['value'], { textAlign: "center", left: left }]}>{value ? Math.floor(value) + '' : ''}</MyText>
                        <CustomSlider
                            onSlidingComplete={_onSlidingComplete}
                            value={sliderValue}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            onValueChange={_onSliderChange}
                        />
                        <MyText style={[styles['value'], { right: 0 }]}>{ }</MyText>
                    </MyView>
                    <Button onPress={_validate} style={[styles['buttonStyle'], { marginTop: 40 }]} text={CONTINUE} />
                </MyView>
            </ScrollView>
        </SafeArea>
    )
}

export default ProfileSetupFive