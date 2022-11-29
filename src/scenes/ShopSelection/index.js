import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CurveView, MyImage, MyText, MyView, SafeArea, SearchInput, Touchable } from '../../components/customComponent'
import { SCREEN_HEIGHT } from '../../components/helper'
import { LIGHT_BROWN, LIGHT_WHITE, THEME } from '../../utils/colors'
import styles from './styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getFontSize } from '../../utils/responsive'

// Shop selection UI
const ShopSelection = ({ navigation }) => {

    const state = useSelector(state => { return state })
    const { LOADING, PRODUCT, SHOPBY } = state['localeReducer']['locale']
    const { profile } = state['profileReducer']
    const [value, setValue] = useState('')

    return (
        <SafeArea style={{ paddingBottom: -useSafeAreaInsets().bottom, backgroundColor: THEME }}>
            <MyView style={styles['headerView']}>
                <MyImage source={{ uri: profile?.['ProfilePic'] }} style={styles['profileImage']} />
                <MyView style={styles['userDetails']}>
                    <MyText style={styles['userName']}>{profile?.['Name'] ? profile?.['Name'] : LOADING}</MyText>
                    <MyText style={[styles['userName'], { fontSize: getFontSize(14) }]}>{profile?.['Username'] ? profile?.['Username'] : LOADING}</MyText>
                </MyView>
            </MyView>
            <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE, alignItems: 'center' }}>
                <CurveView />
                <SearchInput
                    value={value}
                    onChangeText={(value) => setValue(value)} />
                <MyText style={styles.shoptext}>{SHOPBY}</MyText>
                <Touchable activeOpacity={1} onPress={() => navigation.navigate('products')} style={[styles['button'], { marginTop: SCREEN_HEIGHT * 0.03, backgroundColor: LIGHT_BROWN }]}>
                    <MyText style={[styles['providerText'], {}]}>{PRODUCT}</MyText>
                </Touchable>
            </MyView>
        </SafeArea>
    )
}

export default ShopSelection