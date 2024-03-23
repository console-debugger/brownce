import React, { useState, useCallback } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, KeyboardAwareScroll, MyText, MyView, SafeArea, Touchable, MyImage, Loader } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { getSubscriptionPlanAction, saveSubscriptionAction, updateSubscriptionAction, loaderAction, getSpDataStepAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { LIGHT_GRAY, LIGHT_WHITE, THEME } from '../../utils/colors'
import { dynamicSize } from '../../utils/responsive'
import styles from './styles'
import { tickIcon } from "../../components/icons"
import { useFocusEffect } from '@react-navigation/native'
import { token } from "../../services/serviceConstant"
// import { requestBillingAgreement } from 'react-native-paypal';
import Subscriptions from '../../components/subscriptions'

// Provider profile setup
const ProviderProfileSetupSix = ({ navigation }) => {

    // const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    // const { loading } = state['loaderReducer']
    const { SELECT, SUBSCRIPTION, PURCHASE, } = state['localeReducer']['locale']
    // const { subscriptionPlan } = state['subscriptionPlanReducer']

    // const [planId, setPlanId] = useState('')

    // useFocusEffect(
    //     useCallback(() => {
    //         dispatch(loaderAction(true))
    //         dispatch(getSubscriptionPlanAction())
    //     }, [])
    // )

    // const _selectSubscription = (item, index) => () => {
    //     setPlanId(item.Plan['Id'])
    //     const replica = [...subscriptionPlan]
    //     for (let i = 0; i < subscriptionPlan.length; i++) {
    //         if (i === index) { replica[i]['status'] = true }
    //         else { replica[i]['status'] = false }
    //     }
    //     dispatch(updateSubscriptionAction(replica))
    // }

    // const _keyExtractor = (item, index) => item + index

    // const _seperator = () => (<MyView style={styles['seperator']} />)

    // const _renderSubscription = ({ item, index }) => {

    //     return (
    //         <Touchable onPress={_selectSubscription(item, index)} style={[styles['subscriptionContainer'], { borderColor: item['status'] ? THEME : LIGHT_GRAY }]}>
    //             {item['status'] ?
    //                 <MyImage
    //                     style={styles['tickStyle']}
    //                     resizeMode={"contain"}
    //                     source={tickIcon} />
    //                 : null}
    //             <MyText style={styles['subscriptionPrice']}>{`$ ${item.Plan['Price']}`}</MyText>
    //             <MyText style={styles['subscriptionPeriod']}>{item.Plan['Name']}</MyText>
    //             {item.Plan['TrialDurationUnit'] ?
    //                 <MyText style={[styles['subscriptionDescription'], {}]}>{`Trial Period- ${item['TrialDurationUnit']}`}</MyText>
    //                 : null}
    //             <MyText style={styles['subscriptionDescription']}>{item.Plan['Description']}</MyText>
    //         </Touchable>

    //     )

    // }

    // const _validate = (nonce) => {
    //     const purchaseId = subscriptionPlan.filter(item => { if (item['status']) return item }).map(each => { return each['Id'] })
    //     const param = {
    //         [apiKey['isUpdate']]: false,
    //         [apiKey['SubsNouceId']]: nonce,
    //         [apiKey['PlanId']]: planId

    //     }
    //     dispatch(loaderAction(true))
    //     dispatch(saveSubscriptionAction(param, false))
    // }


    // const requestPayment = () => {
    //     const purchaseId = subscriptionPlan.filter(item => { if (item['status']) return item }).map(each => { return each['Id'] })
    //     if (purchaseId.length != 0) {
    //         dispatch(loaderAction(true))
    //         requestBillingAgreement(token, {
    //             billingAgreementDescription: 'Your agreement description',
    //             currency: 'USD',
    //             localeCode: 'en_GB',
    //             shippingAddressRequired: false,
    //             userAction: 'commit',
    //             intent: 'authorize',

    //         })
    //             .then(resp =>
    //                 resp.nonce ? _validate(resp.nonce) : dispatch(loaderAction(false)))
    //             .catch((err) => dispatch(loaderAction(false)));
    //     }
    //     else {
    //         showToast("Please select a plan")
    //     }
    // }

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ flex: 1, }}>
                {/* <Loader isVisible={loading} /> */}
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], {}]}>{`${SELECT}\n${SUBSCRIPTION}`}</MyText>
                {/* <FlatList
                    key='subscription'
                    data={subscriptionPlan}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderSubscription}
                    ItemSeparatorComponent={_seperator}
                    contentContainerStyle={{ paddingVertical: SCREEN_HEIGHT * 0.05 }}
                />
                <MyView style={{ alignItems: "center" }} >
                    <Button onPress={requestPayment} style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70) }]} text={PURCHASE} />
                </MyView> */}
                <Subscriptions />
            </KeyboardAwareScroll>
        </SafeArea>
    )

}

export default ProviderProfileSetupSix