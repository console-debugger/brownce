import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { CurveView, MyText, MyView, SafeArea, Loader, EmptyMessage } from '../../components/customComponent'
import styles from './styles'
import { getEarningsAction, loaderAction } from '../../redux/action'
import { SCREEN_HEIGHT } from '../../components/helper'

// @ Earning UI
const Earnings = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { loading } = state['loaderReducer']
    const { earnings } = state['profileReducer']
    const { TIME, AMOUNT, DATE } = state['localeReducer']['locale']

    // @ fetch earning details
    useEffect(() => {
        dispatch(loaderAction(true))
        dispatch(getEarningsAction())
    }, [])

    const _keyExtractor = (item, index) => item + index

    // UI of empty list
    const _renderEmptyEarnings = () => {
        if (!loading) {
            return (<EmptyMessage style={{ marginVertical: SCREEN_HEIGHT * 0.20 }} message={"You are yet to earn."} />)
        }
        else return (<EmptyMessage message={""} />)
    }

    // UI of earning list
    const _renderEarnings = ({ item, index }) => {
        return (
            <MyView style={[styles['item']]}>
                <MyText style={[styles['bodyText'], { textAlign: 'left' }]} >{item['Date']}</MyText>
                <MyText style={[styles['bodyText'], { right: 4 }]}>{item['Time']}</MyText>
                <MyText style={[styles['bodyText'], { textAlign: 'center' }]}>{item['AppointmentId']}</MyText>
                <MyText style={[styles['bodyText'], { textAlign: 'right' }]}>{item['Amount']}</MyText>
            </MyView>
        )
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={styles['mainContainer']}>
                <Loader isVisible={loading} />
                <CurveView />
                <MyText style={styles['amount']}>{`$${earnings['TotalEarnings'] ? earnings['TotalEarnings'] : '0'}.00`}</MyText>
                <MyView style={styles['headerView']}>
                    <MyText style={[styles['headerText'], { textAlign: 'left' }]} >{DATE}</MyText>
                    <MyText style={[styles['headerText'], { right: 12 }]}>{TIME}</MyText>
                    <MyText style={[styles['headerText'], { textAlign: 'center', left: 5 }]}>{"BOOKING ID"}</MyText>
                    <MyText style={[styles['headerText'], { textAlign: 'right', left: 10 }]}>{AMOUNT}</MyText>

                </MyView>
                <FlatList
                    key='earnings'
                    keyExtractor={_keyExtractor}
                    data={earnings['ServiceDetail']}
                    ListEmptyComponent={_renderEmptyEarnings}
                    renderItem={_renderEarnings}
                    contentContainerStyle={styles['flatList']}
                    showsVerticalScrollIndicator={false}
                />
            </MyView>
        </SafeArea>
    )
}

export default Earnings