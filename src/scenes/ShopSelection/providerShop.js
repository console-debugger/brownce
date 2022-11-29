import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CurveView, MyImage, MyText, MyView, SafeArea, Touchable } from '../../components/customComponent'
import { SCREEN_HEIGHT } from '../../components/helper'
import { smallStar, plusadd } from '../../components/icons'
import { LIGHT_BROWN, LIGHT_WHITE, THEME, WHITE } from '../../utils/colors'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getFontSize } from '../../utils/responsive'
import { navigateToScreen } from '../../navigation/rootNav'

// Provider Shop
const ProviderShopSelection = ({ navigation }) => {

    const state = useSelector(state => { return state })
    const { LOADING, VIEW, CURRENTPRODUCTS, NEWORDERS, PASTORDERS } = state['localeReducer']['locale']
    const { providerprofile, } = state['profileReducer']

    const [selectedRole, setSelectredRole] = useState(0)

    const _navToNext = () => navigation.navigate('neworders')

    return (
        <SafeArea style={{ paddingBottom: -useSafeAreaInsets().bottom, backgroundColor: THEME }}>
            <MyView style={styles['headerView']}>
                <MyImage source={{ uri: state.profileReducer.providerprofile?.['ProfilePic'] }} style={styles['profileImage']} />
                <MyView style={styles['userDetails']}>
                    <MyText style={styles['userName']}>{state.profileReducer.providerprofile?.['FirstName'] ? state.profileReducer.providerprofile['FirstName'] : LOADING}</MyText>
                    <MyText style={[styles['userName'], { fontSize: getFontSize(14) }]}>{state.profileReducer.providerprofile?.['Username'] ? state.profileReducer.providerprofile['Username'] : LOADING}</MyText>
                    <MyView style={styles['starView']}>
                        <MyImage source={smallStar} />
                        <MyText style={styles['ratingText']}>{`${providerprofile['OverallRating']}/5`}</MyText>
                    </MyView>
                </MyView>
            </MyView>
            <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE, alignItems: 'center' }}>

                <CurveView />

                <MyText style={[styles.shoptext, { marginTop: '2%' }]}>{VIEW}</MyText>
                <Touchable activeOpacity={1} onPress={() => navigation.navigate('currentProducts')} style={[styles['button'], styles['customerButton'], { backgroundColor: selectedRole === 0 ? THEME : LIGHT_WHITE }]}>
                    <MyText style={[styles['customerText'], { color: selectedRole === 0 ? WHITE : THEME }]}>{CURRENTPRODUCTS}</MyText>
                </Touchable>
                <Touchable activeOpacity={1} onPress={_navToNext} style={[styles['button'], { marginTop: SCREEN_HEIGHT * 0.03, backgroundColor: LIGHT_BROWN }]}>
                    <MyText style={[styles['providerText'], {}]}>{NEWORDERS}</MyText>
                </Touchable>
                <Touchable activeOpacity={1} onPress={() => navigation.navigate('pastorders')} style={[styles['button'], styles['customerButton'], { backgroundColor: selectedRole === 0 ? THEME : LIGHT_WHITE }]}>
                    <MyText style={[styles['customerText'], { color: selectedRole === 0 ? WHITE : THEME }]}>{PASTORDERS}</MyText>
                </Touchable>
                <Touchable onPress={() => navigateToScreen('addproducts')} >
                    <MyImage source={plusadd} style={styles.plusadd} />
                </Touchable>
            </MyView>
        </SafeArea>
    )
}

export default ProviderShopSelection