import { FlatList, Platform, RefreshControl, View, StyleSheet, TouchableOpacity } from 'react-native';
import RNIap, { requestPurchase, initConnection, purchaseUpdatedListener, purchaseErrorListener, validateReceiptAndroid, requestSubscription, endConnection, useIAP, consumePurchaseAndroid, flushFailedPurchasesCachedAsPendingAndroid } from 'react-native-iap';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { isAndroid, SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from './helper';
import { Button, Loader, MyImage, MyText, MyView, Touchable } from './customComponent';
import styles from '../navigation/styles';
import { dynamicSize, getFontSize } from '../utils/responsive';
import { BLACK, LIGHT_BROWN, LIGHT_GRAY, LIGHT_WHITE, THEME, THEME_OFFSET, WHITE } from '../utils/colors';
import { interBold, interMedium } from '../utils/fontFamily';
import { tickIcon } from "./icons"
import { saveSubscriptionAction } from '../redux/action';
import { useRoute } from '@react-navigation/native';
import apiRequest from '../services';
import { navigateToScreen } from '../navigation/rootNav';
import { method } from '../services/serviceConstant';
import { BASE_URL } from '../services/serviceConfig';

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
        try {
            const { packageNameAndroid, productId, purchaseToken, transactionId, googleAccessToken } = transactionData
            console.log('reqparam==>', packageNameAndroid, productId, purchaseToken, transactionId, googleAccessToken)
            const androidValidate = await validateReceiptAndroid(packageNameAndroid, productId, purchaseToken, googleAccessToken, true) || null
            console.log("androidValidate===>0", androidValidate)
            if (androidValidate) return androidValidate
            else return null
        } catch (error) {
            console.log("androidValidate===>1", error, JSON.stringify(error))
            return null
        }
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
        // getPurchaseHistories
    } = useIAP();
    const route = useRoute();
    const purchaseUpdateSubscription = useRef(null);
    const purchaseErrorSubscription = useRef(null);

    const rstate = useSelector(state => { return state })
    const { PURCHASE } = rstate['localeReducer']['locale']

    const dispatch = useDispatch();

    const [selectedIAPPayment, setSelectedIAP] = useState({})
    const [selectedPlan, setSelectedPlan] = useState(null)

    useEffect(() => {
        return () => {
            endConnection()
        }
    }, [])

    const flushPurchaseAndroid = async () => {
        const flushFailedPurchase = await flushFailedPurchasesCachedAsPendingAndroid()
        console.log('flush all items', flushFailedPurchase)
    }

    useEffect(() => {
        getSubs()
        return () => {
            if (purchaseUpdateSubscription?.current) {
                purchaseUpdateSubscription?.current?.remove();
                purchaseUpdateSubscription.current = null;
            }

            if (purchaseErrorSubscription?.current) {
                purchaseErrorSubscription?.current?.remove();
                purchaseErrorSubscription.current = null;
            }
        }
    }, [itemSubs, getProducts, getSubscriptions]);

    const getSubs = async () => {
        try {
            await initConnection();
            if (Platform.OS === 'android') {
                flushPurchaseAndroid()
            }
            const data = await getSubscriptions({ skus: itemSubs });
            console.log("sdfdsfd==>", data)
        } catch (error) {
            console.log("errorr==>", error)
        }
    }

    useEffect(() => {
        console.log("subscriptions =>> ", subscriptions)
        handleChange(subscriptions, 'subscriptions')
    }, [subscriptions])

    useEffect(() => {
        getAvailablePurchases()
    }, [subscriptions])

    // Set up listeners using useRef
    useEffect(() => {
        purchaseUpdateSubscription.current =
            purchaseUpdatedListener(checkCurrentPurchase);
        purchaseErrorSubscription.current =
            purchaseErrorListener(handlePurchaseError);

        return () => {
            if (purchaseUpdateSubscription.current) {
                purchaseUpdateSubscription.current.remove();
                purchaseUpdateSubscription.current = null;
            }

            if (purchaseErrorSubscription.current) {
                purchaseErrorSubscription.current.remove();
                purchaseErrorSubscription.current = null;
            }
        };
    }, []);

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
            const purchasedItem = availablePurchases[0]
            setSelectedPlan(purchasedItem.productId)
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
        console.log("asdasda=sd=asd=a==s=====>###1")
        if (currentPurchase?.productId) {
            console.log("asdasda=sd=asd=a==s=====>###2")
            checkCurrentPurchase(currentPurchase);
        }
    }, [currentPurchase, finishTransaction]);

    const checkCurrentPurchase = async (purchase) => {
        console.log("asdasda=sd=asd=a==s=====>###3", JSON.stringify(purchase))
        if (purchase) {
            console.log("asdasda=sd=asd=a==s=====>###4", JSON.stringify(selectedIAPPayment))
            const receipt = purchase.transactionReceipt;
            console.log("asdasda=sd=asd=a==s=====>###5")
            try {
                console.log("asdasda=sd=asd=a==s=====>###6")
                const ackResult = await finishTransaction({ purchase: purchase });
                console.log("asdasda=sd=asd=a==s=====>###7")
                console.log('ackResult', ackResult);
                if (Platform.OS == 'ios') {
                    const validateiOSReceipt = await validateIAP(purchase)
                    console.log('validateiOSReceipt=>', validateiOSReceipt)
                    const param = {
                        "PackageName": purchase.productId,
                        "PlatFormType": Platform.OS == "ios" ? 2 : 1,
                        "TnxId": purchase?.transactionId,
                        "Price": selectedIAPPayment?.priceAmountMicros,
                        "SubscriptionStart": moment(purchase?.transactionDate).utc(),
                        "RecieptData": receipt,
                    }
                    console.log("Subscription Data =>>", { ...param })
                    dispatch(saveSubscriptionAction(param, route.name == "providerProfileSetupSix" ? false : true))
                } else {
                    // TO DO : TESTING
                    if (ackResult['code'] == 'OK' && ackResult['responseCode'] === 0) {
                        const accessTokenResp = await apiRequest({}, `${BASE_URL}/api/Transaction/GetGoogleAccessToken`, method['GET'])
                        console.log('access token=>', accessTokenResp)
                        if (accessTokenResp?.status === 200) {
                            if (accessTokenResp?.result?.Token) {
                                const accessToken = accessTokenResp?.result?.Token
                                console.log("accessToken====>", accessToken)
                                const validateIAPParams = { ...purchase, googleAccessToken: accessToken }
                                console.log('validateAndroidReceipt==>0', validateIAPParams)
                                const validateAndroidReceipt = await validateIAP(validateIAPParams)
                                console.log('validateAndroidReceipt==>1', validateAndroidReceipt)
                                const { packageNameAndroid, productId, purchaseToken, transactionId } = purchase
                                // if (validateAndroidReceipt) {
                                const param = {
                                    "PackageName": purchase.productId,
                                    "PlatFormType": Platform.OS == "ios" ? 2 : 1,
                                    "TnxId": purchase?.transactionId,
                                    "Price": selectedIAPPayment?.priceAmountMicros,
                                    "SubscriptionStart": purchase?.transactionDate,
                                    "RecieptData": receipt,
                                }
                                console.log("Subscription Data =>>", { ...param })
                                dispatch(saveSubscriptionAction(param, route.name == "providerProfileSetupSix" ? false : true))
                                // }
                                // else {
                                //     showToast('Error in validating android receipt', 'danger')
                                // }
                            }
                        }
                        else {
                            showToast(accessTokenResp.message, 'danger')
                        }
                    }
                }
            } catch (ackErr) {
                console.log("asdasda=sd=asd=a==s=====>###8")
                console.log('ackErr', ackErr);
                showToast(ackErr.message, 'danger')
            } finally {
                getAvailablePurchases()
            }
        }
    };

    const handlePurchaseError = error => {
        console.warn('purchaseErrorListener', error);
    };


    const [state, setState] = useState({
        subscriptions: [],
        receipt: '',
        purchasedItem: ''
    })

    const purchase = async (item, ppl, offer) => {
        if (item) {
            setSelectedPlan(item.productId)
            // let item = state.subscriptions.filter(plan => plan.productId == selectedPlan)[0]
            console.log("selectedPlan===>", offer?.offerToken, JSON.stringify(ppl), JSON.stringify(offer))
            try {
                setSelectedIAP(ppl)
                console.log("selectedPlan===>1", item.productId, JSON.stringify(item))
                const res = await requestSubscription({
                    sku: item.productId,
                    ...(offer?.offerToken && {
                        subscriptionOffers: [{ sku: item.productId, offerToken: offer?.offerToken }],
                    })
                });
                console.log("resres==>", res)
            } catch (error) {
                if (error?.code != 'E_USER_CANCELLED') {
                    console.log("selectedPlan===>2", JSON.stringify(error))
                    showToast(error.message, 'info')
                }
            }
        }
    };

    // /****************************** Function Main  *************************************/
    const handleChange = (value, name) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    // /****************************** Flatlist Functions *************************************/
    const _keyExtractor = (item, index) => item + index

    const renderPrice = (ppl) => {
        // const isFree = ppl.priceAmountMicros == 0 && ppl.formattedPrice == 'Free'
        // if (isFree) return (<MyText key={ppl.formattedPrice} style={{ ...styless.subscriptionPrice, color: WHITE }}>{`${ppl.formattedPrice} for 7 days`}</MyText>)
        // else 
        return (<MyText key={ppl.formattedPrice} style={{ ...styless.subscriptionPrice, color: WHITE }}>{`Subscribe now for ${ppl.formattedPrice}`}</MyText>)
    }

    const _renderNormalList = ({ item, index }) => {
        const pur_plan_id = rstate.profileReducer?.providerprofile?.AdMobSubscribtion?.PackageName
        const is_subscribed = pur_plan_id == item.productId
        const offer = item.subscriptionOfferDetails?.[0]
        return (
            <MyView style={[styless['subscriptionContainer'], { backgroundColor: selectedPlan == item.productId ? LIGHT_BROWN : LIGHT_WHITE }]}>
                {is_subscribed ?
                    <MyImage
                        style={styless['tickStyle']}
                        resizeMode={"contain"}
                        source={tickIcon} />
                    : null}
                {offer.pricingPhases.pricingPhaseList.map((ppl) => {
                    const isFree = ppl.priceAmountMicros == 0 && ppl.formattedPrice == 'Free'
                    return (
                        <TouchableOpacity key={index?.toString()} onPress={() => purchase(item, ppl, offer)} style={{ alignItems: 'center', width: '80%', backgroundColor: THEME, borderRadius: 5, padding: 10, marginTop: isFree ? 0 : 10 }}>
                            {renderPrice(ppl)}
                        </TouchableOpacity>
                    )
                })}

                <MyText style={{ ...styless.subscriptionPeriod, color: selectedPlan == item.productId ? WHITE : BLACK }}>{item.title}</MyText>
                <MyText style={{ ...styless.subscriptionDescription, color: selectedPlan == item.productId ? WHITE : BLACK }}>{item.description}</MyText>
            </MyView>
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
            <View style={{ flex: 1, marginBottom: 10 }}>
                <FlatList
                    keyExtractor={_keyExtractor}
                    contentContainerStyle={{ marginTop: '5%', paddingVertical: 15,/* justifyContent:'space-around', flex: 1 */ }}
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
            </View>
            <MyView style={{ alignItems: "center" }}>
                {/* {state.subscriptions.length > 0 && <Button
                    onPress={() => purchase()}
                    style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70) }]}
                    text={'Subscribe'}
                />} */}
                <Button
                    onPress={_continue}
                    style={[styles['buttonStyleCont'], { width: SCREEN_WIDTH - dynamicSize(70), marginVertical: dynamicSize(10) }]}
                    text={'Continue with ADs'}
                />
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
        textAlign: 'center',
        fontFamily: interBold,
        fontSize: getFontSize(16)
    },
    subscriptionPeriod: {
        marginTop: SCREEN_HEIGHT * 0.01,
        fontFamily: interMedium,
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