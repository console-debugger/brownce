import { FlatList, Platform, RefreshControl, View, StyleSheet } from 'react-native';
import RNIap, { requestPurchase, requestSubscription, useIAP, consumePurchaseAndroid, flushFailedPurchasesCachedAsPendingAndroid } from 'react-native-iap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from './helper';
import { Button, Loader, MyImage, MyText, MyView, Touchable } from './customComponent';
import styles from '../navigation/styles';
import { dynamicSize, getFontSize } from '../utils/responsive';
import { BLACK, LIGHT_BROWN, LIGHT_GRAY, LIGHT_WHITE, THEME, WHITE } from '../utils/colors';
import { montserratBold, montserratMedium } from '../utils/fontFamily';
import { tickIcon } from "./icons"
import { saveSubscriptionAction } from '../redux/action';
import { useRoute } from '@react-navigation/native';
import apiRequest from '../services';
import { navigateToScreen } from '../navigation/rootNav';

const itemSubs = Platform.select({
    ios: [
        'com.brownce.monthly.subscription',
        'com.brownce.3monthly.subscription',
        'com.brownce.6monthly.subscription'
    ],
    android: [
        'com.brownce.monthly.subscription',
        'com.brownce.3monthly.subscription',
        'com.brownce.6monthly.subscription'
    ],
});

export const validateIAP = async transactionData => {
    const isTestEnvironment = __DEV__
    if (Platform.OS == 'ios') {
        const { transactionReceipt } = transactionData
        const receiptBody = {
            'receipt-data': transactionReceipt,
            'password': 'fe3fd958ec6a425e920fbff5cdae02e1'
        };
        console.log('receipt=>', receiptBody)
        const paymentVerification = await RNIap.validateReceiptIos(receiptBody, isTestEnvironment);
        if (paymentVerification['status'] == 0) {
            return paymentVerification
        }
        else return null
    }
    else {
        const { packageNameAndroid, productId, purchaseToken, transactionId, googleAccessToken } = transactionData
        console.log('reqparam==>', packageNameAndroid, productId, purchaseToken, transactionId, googleAccessToken)
        const androidValidate = await RNIap.validateReceiptAndroid(packageNameAndroid, productId, purchaseToken, googleAccessToken, true) || null
        if (androidValidate) return androidValidate
        else return null
    }
}

const Subscriptions = ({ navigation }) => {
    const {
        connected,
        products,
        promotedProductsIOS,
        subscriptions,
        purchaseHistories,
        availablePurchases,
        currentPurchase,
        currentPurchaseError,
        finishTransaction,
        getProducts,
        getSubscriptions,
        getAvailablePurchases,
        getPurchaseHistories
    } = useIAP();
    const route = useRoute();

    const rstate = useSelector(state => { return state })
    const { PURCHASE } = rstate['localeReducer']['locale']

    const dispatch = useDispatch();

    const [selectedIAPPayment, setSelectedIAP] = useState({})
    const [selectedPlan, setSelectedPlan] = useState(null)

    useEffect(() => {
        console.log("connected => ", connected)
        if (connected) {
            getPurchaseHistories()
        }
    }, [connected])

    const flushPurchaseAndroid = async () => {
        const flushFailedPurchase = await flushFailedPurchasesCachedAsPendingAndroid()
        console.log('flush all items', flushFailedPurchase)
    }

    useEffect(() => {
        getSubscriptions(itemSubs);
    }, [getProducts, getSubscriptions]);

    useEffect(() => {
        console.log("subscriptions =>> ", subscriptions)
        handleChange(subscriptions, 'subscriptions')
    }, [subscriptions])

    useEffect(() => {
        getAvailablePurchases()
    }, [subscriptions])

    useEffect(() => {
        console.log("currentPurchaseError =>> ", currentPurchaseError)
    }, [currentPurchaseError])

    useEffect(() => {
        console.log("purchaseHistories =>> ", purchaseHistories)
        consumePurchase(purchaseHistories)
    }, [purchaseHistories])

    const consumePurchase = async (purchaseHistories) => {
        if (purchaseHistories?.length && isAndroid) {
            await purchaseHistories.forEach((item) => {
                consumePurchaseAndroid(item?.purchaseToken);
            });
        }
        flushPurchaseAndroid()
    }

    useEffect(() => {
        console.log("availablePurchases =>> ", availablePurchases)
        if (availablePurchases?.length > 0) {
            handleChange(availablePurchases[0], 'purchasedItem')
        }
    }, [availablePurchases])

    const onSwipeDown = () => {
        if (connected) {
            getSubscriptions(itemSubs);
            getPurchaseHistories()
            getAvailablePurchases()
        }
    }

    useEffect(() => {
        const checkCurrentPurchase = async (purchase) => {
            if (purchase) {
                const receipt = purchase.transactionReceipt;
                if (receipt) {
                    try {
                        const ackResult = await finishTransaction(purchase);
                        console.log('ackResult', ackResult);
                        if (Platform.OS == 'ios') {
                            const validateiOSReceipt = await validateIAP(purchase)
                            console.log('validateiOSReceipt=>', validateiOSReceipt)
                            const param = {
                                "PackageName": purchase.productId,
                                "PlatFormType": Platform.OS == "ios" ? 2 : 1,
                                "TnxId": purchase?.transactionId,
                                "Price": selectedIAPPayment?.price,
                                "SubscriptionStart": moment(purchase?.transactionDate).utc(),
                                "RecieptData": receipt,
                            }
                            console.log("Subscription Data =>>", { ...param })
                            dispatch(saveSubscriptionAction(param, route.name == "providerProfileSetupSix" ? false : true))
                        } else {
                            // TO DO : TESTING
                            if (ackResult['code'] == 'OK' && ackResult['responseCode'] === 0) {
                                const accessTokenResp = await apiRequest({}, '/api/Transaction/GetGoogleAccessToken', method['GET'])
                                console.log('access token=>', accessTokenResp)
                                if (accessTokenResp?.Status === 200) {
                                    if (accessTokenResp?.result?.Token) {
                                        const accessToken = accessTokenResp?.result?.Token
                                        const validateAndroidReceipt = await validateIAP({ ...purchase, googleAccessToken: accessToken })
                                        console.log('validateAndroidReceipt==>', validateAndroidReceipt)
                                        const { packageNameAndroid, productId, purchaseToken, transactionId } = purchase
                                        if (validateAndroidReceipt) {
                                            const param = {
                                                "PackageName": purchase.productId,
                                                "PlatFormType": Platform.OS == "ios" ? 2 : 1,
                                                "TnxId": purchase?.transactionId,
                                                "Price": selectedIAPPayment?.price,
                                                "SubscriptionStart": purchase?.transactionDate,
                                                "RecieptData": receipt,
                                            }
                                            console.log("Subscription Data =>>", { ...param })
                                            dispatch(saveSubscriptionAction(param, route.name == "providerProfileSetupSix" ? false : true))
                                        }
                                        else {
                                            showToast('Error in validating android receipt', 'danger')
                                        }
                                    }
                                }
                                else {
                                    showToast(accessTokenResp.message, 'danger')
                                }
                            }
                        }
                    } catch (ackErr) {
                        console.log('ackErr', ackErr);
                        showToast(ackErr.message, 'danger')
                    } finally {
                        getAvailablePurchases()
                    }
                }
            }
        };
        checkCurrentPurchase(currentPurchase);
    }, [currentPurchase, finishTransaction]);

    const [state, setState] = useState({
        subscriptions: [],
        receipt: '',
        purchasedItem: ''
    })

    const purchase = () => {
        if (selectedPlan) {
            let item = state.subscriptions.filter(plan => plan.productId == selectedPlan)[0]
            try {
                setSelectedIAP(item)
                requestSubscription(item.productId);
            } catch (error) {
                showToast(error.message, 'info')
            }
        }
    };

    // /****************************** Function Main  *************************************/
    const handleChange = (value, name) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    // /****************************** Flatlist Functions *************************************/
    const _keyExtractor = (item, index) => item + index

    const _renderNormalList = ({ item, index }) => {
        const pur_plan_id = rstate.profileReducer?.providerprofile?.AdMobSubscribtion?.PackageName
        const is_subscribed = pur_plan_id == item.productId
        return (
            <Touchable onPress={() => setSelectedPlan(item.productId)} style={[styless['subscriptionContainer'], { backgroundColor: selectedPlan == item.productId ? THEME : LIGHT_WHITE }]}>
                {is_subscribed ?
                    <MyImage
                        style={styless['tickStyle']}
                        resizeMode={"contain"}
                        source={tickIcon} />
                    : null}
                <MyText style={{ ...styless.subscriptionPrice, color: selectedPlan == item.productId ? WHITE : BLACK }}>{item.localizedPrice}</MyText>
                <MyText style={{ ...styless.subscriptionPeriod, color: selectedPlan == item.productId ? WHITE : BLACK }}>{item.title}</MyText>
                <MyText style={{ ...styless.subscriptionDescription, color: selectedPlan == item.productId ? WHITE : BLACK }}>{"Trial period : 2 months"}</MyText>
                <MyText style={{ ...styless.subscriptionDescription, color: selectedPlan == item.productId ? WHITE : BLACK }}>{item.description}</MyText>
            </Touchable>
        )
    }

    const _continue = () => {
        if (route.name == "providerProfileSetupSix") {
            navigateToScreen('providerProfileSetupSeven')
        } else {
            navigateToScreen('tabZero')
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                keyExtractor={_keyExtractor}
                contentContainerStyle={{ marginTop: '5%', /* justifyContent:'space-around', flex: 1 */ }}
                data={[...state.subscriptions]}
                renderItem={_renderNormalList}
                ItemSeparatorComponent={() => <MyView style={{ height: dynamicSize(15) }} />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<MyView style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: SCREEN_HEIGHT * 0.2
                }}>
                    <MyText style={{}}>No Subscriptions found !</MyText>
                </MyView>}
            // refreshControl={<RefreshControl
            //     refreshing={false}
            //     onRefresh={() => onSwipeDown()}
            // />}
            />
            <MyView style={{ alignItems: "center" }}>
                {state.subscriptions.length > 0 && <Button
                    onPress={() => purchase()}
                    style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70) }]}
                    text={'Subscribe'}
                />}
                {state.subscriptions.length > 0 && <Button
                    onPress={_continue}
                    style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70), marginVertical: dynamicSize(10) }]}
                    text={'Continue with ADs'}
                />}
            </MyView>
        </View>
    )
}

export default Subscriptions

const styless = StyleSheet.create({
    subscriptionContainer: {
        marginHorizontal: dynamicSize(35),
        borderRadius: dynamicSize(5),
        alignItems: 'center',
        width: SCREEN_WIDTH - dynamicSize(70),
        paddingVertical: dynamicSize(10),
        borderWidth: 0,
        borderColor: THEME,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    subscriptionPrice: {
        fontFamily: montserratBold,
        fontSize: getFontSize(20)
    },
    subscriptionPeriod: {
        marginTop: SCREEN_HEIGHT * 0.01,
        fontFamily: montserratMedium,
        fontSize: getFontSize(14)
    },
    subscriptionDescription: {
        marginTop: SCREEN_HEIGHT * 0.01,
        textAlign: 'center',
        fontSize: getFontSize(12),
        width: SCREEN_WIDTH * 0.55,
    },
    seperator: {
        height: SCREEN_HEIGHT * 0.04
    },
    seperatorStyle: {
        height: dynamicSize(20)
    },
    tickStyle: {
        top: -6,
        left: 0,
        right: 0,
        position: 'absolute',
        alignSelf: "flex-end",
        left: SCREEN_WIDTH * 0.77

    },
    buttonContainer: {
        marginLeft: dynamicSize(50),
        width: SCREEN_WIDTH * 0.5,
        backgroundColor: LIGHT_BROWN,
        paddingHorizontal: dynamicSize(13),
        paddingVertical: dynamicSize(5),
        height: SCREEN_WIDTH * 0.1,
        marginTop: SCREEN_WIDTH * 0.05
    },
})