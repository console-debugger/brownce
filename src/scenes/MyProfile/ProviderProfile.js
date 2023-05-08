import React, { useCallback, useEffect, useState } from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { CurveView, Loader, MyImage, MyText, Button, MyView, SafeArea } from '../../components/customComponent'
import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'
import { cancelSubscriptionAction, getNotificationCountAction, getProfileAction, getProviderProfileAction, loaderAction } from '../../redux/action'
import { getFontSize } from '../../utils/responsive'
import { apiKey } from '../../services/serviceConstant'
import { MyAlert } from '../../components/alert'
import { CANCEL_SUBSCRIPTION_SUCCESS_ACTION } from '../../redux/action/type'
import { isCustomer, isIOS, locationMapping, logAnalyticEvent, validateUrl } from '../../components/helper'
import { PROVIDER_DASHBOARD } from '../../components/eventName'

// @ provider profile UI

const ProviderProfile = ({ navigation }) => {

    // @ initailization of local and store state

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { EDIT, MY_SUBSCRIPTION, LOCATION, LOADING, CANCEL_PLAN_MESSAGE } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']
    const { providerprofile } = state['profileReducer']
    const { messageCase } = state['subscriptionPlanReducer']

    const [cancelModalVisible, setcancelModal] = useState(false)

    // @ refetch details of provider profile
    useEffect(() => {
        if (messageCase === CANCEL_SUBSCRIPTION_SUCCESS_ACTION) {
            // dispatch(loaderAction(true))
            dispatch(getProviderProfileAction())
        }
    }, [messageCase])

    // @ fetch details of provider profile
    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            if (isCustomer()) {
                dispatch(getProfileAction())
            } else {
                dispatch(getProviderProfileAction())
                dispatch(getNotificationCountAction())
            }
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            if (providerprofile?.UserId) {
                const data = {
                    id: providerprofile?.UserId,
                    name: providerprofile?.FirstName || '',
                    username: providerprofile?.Username || ''
                }
                logAnalyticEvent(PROVIDER_DASHBOARD, data)
            }
        }, [providerprofile])
    )

    const _cancel = () => {
        // setcancelModal(true)
        if (isIOS) {
            Linking.openURL('https://apps.apple.com/account/subscriptions')
        } else {
            Linking.openURL('https://play.google.com/store/account/subscriptions?package=YOUR_PACKAGE_NAME&sku=YOUR_PRODUCT_ID')
        }
    }

    const _navToEditProfile = () => navigation.navigate('editProviderProfile')

    const _change = () => navigation.navigate('mySubscription')

    const _buy = () => navigation.navigate('mySubscription')

    // @ cancel subscription
    const _onYesPress = async () => {
        const formdata = new FormData()
        formdata.append(apiKey['SubscriptionId'], providerprofile['SubscriptionDetail']['Id'])
        dispatch(cancelSubscriptionAction(formdata))
        setcancelModal(false)
    }
    const _onNoPress = () => setcancelModal(false)

    const _openLink = async () => {
        try {
            const url = validateUrl(providerprofile?.['Weblink'])
            if (url) Linking.openURL(url)
        } catch (error) {
            console.log('err-->', error)
        }
    }

    const getPlanTitle = () => {
        switch (providerprofile?.AdMobSubscribtion.PackageName) {
            case "com.brownce.monthly.subscription":
                return "1 MONTH"
            case "com.brownce.3monthly.subscription":
                return "3 MONTHS"
            case "com.brownce.6monthly.subscription":
                return "6 MONTHS"
            default:
                return "1 MONTH"
        }
    }

    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, paddingBottom: -useSafeAreaInsets().bottom }}>

            <MyAlert onYesPress={_onYesPress} onNoPress={_onNoPress} message={CANCEL_PLAN_MESSAGE} isVisible={cancelModalVisible} />

            <MyView style={styles['mainContainer']}>
                <CurveView />
                <Loader isVisible={loading} />

                <MyText onPress={_navToEditProfile} style={[styles['editText'], { alignSelf: 'flex-end' }]}>{EDIT}</MyText>
                <MyImage source={{ uri: state.profileReducer.providerprofile?.['ProfilePic'] }} style={styles['image']} />
                <MyText style={[styles['name']]}>{providerprofile?.['FirstName'] ? providerprofile?.['FirstName'] : LOADING}</MyText>

                <MyText style={styles['name']}>{providerprofile?.['Username'] ? providerprofile?.['Username'] : LOADING}</MyText>
                <MyText style={styles['detail']}>{`${LOCATION}: ${locationMapping(providerprofile)}`}</MyText>
                {providerprofile?.['Weblink'] ? <TouchableOpacity activeOpacity={0.7} onPress={_openLink}>
                    <MyText style={[styles['detail'], { textDecorationLine: 'underline' }]}>{providerprofile?.['Weblink'] || ''}</MyText>
                </TouchableOpacity>
                    :
                    null}
                <MyText style={styles['detail']}>{`${'Hours'}: ${providerprofile?.['OpeningTime'] === null ? '--' : providerprofile['OpeningTime']} To ${providerprofile?.['ClosingTime'] === null ? '--' : providerprofile['ClosingTime']}`}</MyText>

                <CurveView style={styles['curveMain']} innerStyle={styles['innerStyle']} />
                {providerprofile['IsAdMobSubscribe'] ?
                    <MyView style={styles['lowerContainer']}>
                        <MyText style={styles['subscriptionTitle']}>{MY_SUBSCRIPTION}</MyText>
                        <MyView style={styles['subscriptionContainer']}>
                            <MyText style={styles['subscriptionPrice']}>{`$ ${providerprofile?.AdMobSubscribtion?.['Price']}`}</MyText>
                            <MyText style={[styles['subscriptionDescription'], {}]}>{`Trial Period- 2 Months`}</MyText>
                            <MyText style={styles['subscriptionPeriod']}>{getPlanTitle() || 'Loading'}</MyText>
                            <MyText style={styles['subscriptionDescription']}>Removal of in-app ads</MyText>
                        </MyView>
                        <MyView style={styles['buttonRow']} >
                            <Button onPress={_cancel} style={[styles['buttonContainer'], {}]} textStyle={{ fontSize: getFontSize(15) }} text={"CANCEL PLAN"} />
                            <Button onPress={_change} style={[styles['buttonContainer'], {}]} textStyle={{ fontSize: getFontSize(15) }} text={"CHANGE PLAN"} />

                        </MyView>
                    </MyView> :
                    <MyView style={styles['lowerContainer']}>
                        <MyText style={styles['subscriptionBuyDescription']}>{"You don't have any plan."}</MyText>
                        <MyView style={styles['button']} >
                            <Button onPress={_buy} style={[styles['buttonContainer'], {}]} textStyle={{ fontSize: getFontSize(15) }} text={"BUY PLAN"} />
                        </MyView>
                    </MyView>}
            </MyView>
        </SafeArea>
    )
}

export default ProviderProfile