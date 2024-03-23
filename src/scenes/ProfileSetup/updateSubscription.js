import React, { useEffect, useState, useCallback } from 'react'
import { FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, KeyboardAwareScroll, MyText, MyView, SafeArea, Touchable, TouchableIcon, MyImage } from '../../components/customComponent'
import { SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from '../../components/helper'
import { getSubscriptionPlanAction, saveSubscriptionAction, updateSubscriptionAction, clearMessageCase } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { BLACK, LIGHT_GRAY, LIGHT_WHITE, THEME } from '../../utils/colors'
import { dynamicSize } from '../../utils/responsive'
import styles from './styles'
import { tickIcon } from "../../components/icons"
import { useFocusEffect } from '@react-navigation/native'
import { backIcon } from '../../components/icons'
// import { requestBillingAgreement } from 'react-native-paypal';
import { GET_SUBSCRIPTION_PLAN_SUCCESS_ACTION } from '../../redux/action/type'
import Subscriptions from '../../components/subscriptions'

const updateSubscription = ({ navigation }) => {

    const token = "sandbox_hcbk4ftm_wc53n2v46zgrss5n"

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { messageCase } = state['profileReducer']
    const { SELECT, SUBSCRIPTION, PURCHASE, } = state['localeReducer']['locale']
    const { subscriptionPlan } = state['subscriptionPlanReducer']

    const [amount, setamount] = useState('')
    const [planId, setPlanId] = useState('')


    useEffect(() => {
        if (messageCase === GET_SUBSCRIPTION_PLAN_SUCCESS_ACTION) {
            setamount(subscriptionPlan[0]['Price'])
            dispatch(clearMessageCase())
        }
    }, [messageCase])

    useFocusEffect(
        useCallback(() => {
            // dispatch(getSubscriptionPlanAction())
        }, [])
    )

    const _selectSubscription = (item, index) => () => {
        setamount(item['Price'])
        setPlanId(item['Id'])
        const replica = [...subscriptionPlan]
        for (let i = 0; i < subscriptionPlan.length; i++) {
            if (i === index) { replica[i]['status'] = true }
            else { replica[i]['status'] = false }
        }
        dispatch(updateSubscriptionAction(replica))
    }

    const _keyExtractor = (item, index) => item + index

    const _seperator = () => (<MyView style={styles['seperator']} />)

    const _renderSubscription = ({ item, index }) => {
        return (
            <Touchable onPress={_selectSubscription(item, index)} style={[styles['subscriptionContainer'], { borderColor: item['status'] ? THEME : LIGHT_GRAY }]}>
                {item['status'] ?
                    <MyImage
                        style={styles['tickStyle']}
                        resizeMode={"contain"}
                        source={tickIcon} />

                    : null}
                <MyText style={styles['subscriptionPrice']}>{`$ ${item['Price']}`}</MyText>
                <MyText style={styles['subscriptionPeriod']}>{item['SubscriptionType']}</MyText>
                <MyText style={styles['subscriptionDescription']}>{item['Description']}</MyText>
            </Touchable>

        )

    }

    const _validate = (nonce) => {
        const purchaseId = subscriptionPlan.filter(item => { if (item['status']) return item }).map(each => { return each['SubscriptionMasterId'] })
        const param = {
            "IsUpdate": true,
            [apiKey['SUBSCRIPTION_MASTER_ID']]: purchaseId.toString(),
            [apiKey['NounceId']]: nonce,
            [apiKey['PlanId']]: planId

        }
        dispatch(saveSubscriptionAction(param, true))
    }

    const requestPayment = () => {
        const purchaseId = subscriptionPlan.filter(item => { if (item['status']) return item }).map(each => { return each['SubscriptionMasterId'] })
        if (purchaseId.length != 0) {
            requestBillingAgreement(token, {
                billingAgreementDescription: 'Your agreement description',
                currency: 'USD',
                localeCode: 'en_GB',
                shippingAddressRequired: false,
                userAction: 'commit',
                intent: 'authorize',

            })
                .then(resp => console.log("resp", resp))
                //resp.nonce ?  dispatch(_validate(resp.nonce)) :'')
                .catch((err) => console.log("error", JSON.stringify(err)));
        }
        else {
            showToast("Please select a plan")
        }
    }
    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{}}>
                <MyView style={[styles['headerView'], { backgroundColor: LIGHT_WHITE }]}>
                    <TouchableIcon style={styles['leftIcon']} source={backIcon} onPress={() => navigation.navigate("roleSelection")} />
                    <MyText style={[styles['title'], { color: BLACK }]}>{'SUBSCRIPTION PLANS'}</MyText>
                </MyView>
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

export default updateSubscription