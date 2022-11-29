import React, { useEffect } from 'react'
import { MyView, SafeArea, MyImage, MyText, Touchable, TouchableIcon } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { supportIcon, darkEmail, twitterIcon } from '../../components/icons'
import { useSelector, useDispatch } from 'react-redux'
import { dynamicSize } from '../../utils/responsive'
import { SCREEN_HEIGHT } from '../../components/helper'
import { getSupportAction, loaderAction } from '../../redux/action'

// Customer support UI
const Support = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { supportList } = state['profileReducer']

    useEffect(() => {
        dispatch(loaderAction(true))
        dispatch(getSupportAction())
    }, [])

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={styles['upperContainer']}>
                <MyImage source={supportIcon} />
            </MyView>
            <Touchable style={[styles['referContainer'], { marginTop: SCREEN_HEIGHT * 0.06 }]}>
                <TouchableIcon source={darkEmail} style={styles['iconStyle']} />
                <MyText style={styles['refCode']}>{supportList?.['SupportEmail'] ? supportList['SupportEmail'] : "LOADING"}</MyText>
            </Touchable>
            <Touchable style={[styles['referContainer'], { marginTop: dynamicSize(15) }]}>
                <TouchableIcon source={twitterIcon} style={styles['iconStyle']} imageStyle={styles['twitterStyle']} />
                <MyText style={styles['refCode']}>{supportList?.['SupportContact'] ? supportList['SupportContact'] : "LOADING"}</MyText>
            </Touchable>
        </SafeArea>
    )
}

export default Support