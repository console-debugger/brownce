import React, { useEffect, useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { SafeArea, MyView, Card, Touchable, MyText, MyImage, TouchableIcon, Button, Loader } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_WHITE, THEME } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import { chatIcon } from '../../components/icons'
import styles from './styles'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { isAndroid, SCREEN_WIDTH, SCREEN_HEIGHT, showToast } from '../../components/helper'
import { loaderAction, getCustomerAppointementsAction, getRatingTypeAction, saveRatingAction, makePaymentAction, clearMessageCase } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'
import { requestOneTimePayment } from 'react-native-paypal';
import { PaymentPopup, RatingPopup } from '../../components/alert'
import { MAKE_PAYMENT_SUCCESS_ACTION } from '../../redux/action/type'
import { token } from "../../services/serviceConstant"
import moment from 'moment'


// @ Past Appointment UI
const PastAppointment = ({ navigation }) => {

    // @ Local and global state
    let type = ''

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { customerpastappointment, messageCase } = state['profileReducer']
    const { BOOKING_ID } = state['localeReducer']['locale']
    const { loading } = state['loaderReducer']
    const [ModalVisible, setModalVisible] = useState(false)

    const [apptid, setapptid] = useState('')
    const [amount, setamount] = useState('')
    const [paymentPopup, setPaymentPopup] = useState(false)

    useEffect(() => {
        if (messageCase === MAKE_PAYMENT_SUCCESS_ACTION) {
            dispatch(loaderAction(true))
            dispatch(getCustomerAppointementsAction(4))
            dispatch(clearMessageCase())
        }
    }, [messageCase])

    // @ Past Appointment details fetch
    useFocusEffect(
        useCallback(() => {
            dispatch(loaderAction(true))
            dispatch(getCustomerAppointementsAction(4))
            dispatch(getRatingTypeAction())
        }, [])
    )
    const dateHandler = dateItem => {
        const dateTimeStamp = new Date(dateItem);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const date = dateTimeStamp.getDate()
        const month = months[dateTimeStamp.getMonth()]
        const year = dateTimeStamp.getFullYear()
        const fullDate = date + " " + month + " " + year
        return fullDate
    }
    const _renderSeperator = () => (<MyView style={styles['seperator']} />)

    const _keyExtractor = (item, index) => item + index

    // @ Make paypal payment
    const makePayment = nonce => {
        dispatch(loaderAction(false))
        const param = {
            "AppointmentId": apptid,
            "NonceId": nonce ? nonce : '',
            "GrandTotal": amount,
            "PaymentMethod": type
        }
        dispatch(makePaymentAction(param))
    }

    // @ Request Payment
    const requestPayment = (item) => {
        setPaymentPopup(true)
        setapptid(item['AppointmentId'])
        setamount(item.Amount.toString())
    }

    const payment = () => {
        type = 1
        setPaymentPopup(false)
        dispatch(loaderAction(true))
        requestOneTimePayment(token, {
            amount: amount, // required
            // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
            currency: 'USD',
            // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
            localeCode: 'en_GB',
            shippingAddressRequired: false,
            userAction: 'commit', // display 'Pay Now' on the PayPal review page
            // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
            intent: 'authorize',

        })
            .then(resp =>
                resp.nonce ? makePayment(resp.nonce) : null)
            .catch((err) => dispatch(loaderAction(false)));
    }

    const cashPress = async () => {
        setPaymentPopup(false)
        type = 2
        makePayment()
    }

    const _open = (item) => {
        setModalVisible(true)
        setapptid(item.AppointmentId)
    }

    const _renderProgress = ({ item, index }) => {
        let paymentStatus = ''
        if (item['IsPaid'] && item['PaymentMethod'] === null) {
            paymentStatus = "Paid by paypal"
        }
        else if (item['PaymentMethod'] == 1) {
            paymentStatus = "Paid by paypal"
        }
        else {
            paymentStatus = "Paid by cash"

        }

        return (
            <Card style={styles['itemContainer']}>
                <Touchable onPress={() => navigation.navigate('serviceDetail', { id: item['AppointmentId'] })} >
                    <MyView style={styles['headerContent']}>
                        <MyText style={styles['bookingId']}>{`${BOOKING_ID} : `}<MyText style={styles['idvalue']}>{item['AppointmentId']}</MyText></MyText>
                        <MyText style={styles['bookingId']}>{moment(item['AppointmentDate']).format('MMM Do, YYYY') + ' ' + item['AppointmentTime']}</MyText>
                    </MyView>
                    <MyView style={styles['itemMainContainer']}>
                        <MyImage source={{ uri: item['SPProfilePic'] }} style={styles['image']} />
                        <MyView style={{ flex: 1, marginHorizontal: SCREEN_WIDTH * 0.01, }}>
                            <MyView style={{ flexDirection: "row", alignItems: "center" }}>
                                <MyText style={styles['name']}>{`${item['SPName']} | `}</MyText>
                                <MyText style={[styles['name'], { fontSize: getFontSize(13) }]}>{item['Username']}</MyText>

                            </MyView>
                            {item['AppointmentStatus'] === 4 ?
                                <MyView style={{ flexDirection: "row", alignItems: "center", marginTop: SCREEN_WIDTH * 0.02 }} >
                                    <TouchableIcon onPress={() => navigation.navigate('chat', { id: item['SPId'], type: 'provider' })} source={chatIcon} style={[styles['chatIcon'], { marginTop: isAndroid ? dynamicSize(10) : dynamicSize(15) }]} />
                                    <MyView style={{ marginHorizontal: dynamicSize(70), left: 10, flexDirection: "row", alignItems: "center", marginTop: 9 }} >
                                        <Button disabled={true} onPress={() => requestPayment(item)} style={[styles['buttonContainer'], { marginHorizontal: dynamicSize(0) }]} textStyle={styles['buttonText']} text={"REJECTED"} />
                                    </MyView>

                                </MyView> :
                                <MyView style={{ flexDirection: "row", alignItems: "center", marginTop: SCREEN_WIDTH * 0.02 }} >
                                    <TouchableIcon onPress={() => navigation.navigate('chat', { id: item['SPId'], type: 'provider' })} source={chatIcon} style={[styles['chatIcon'], { marginTop: isAndroid ? dynamicSize(10) : dynamicSize(15) }]} />
                                    <MyView style={{ marginLeft: item['PaymentMethod'] == 1 ? dynamicSize(30) : dynamicSize(30), flexDirection: "row", alignItems: "center", marginTop: 9 }} >
                                        <Button disabled={item['IsPaid'] ? true : false} onPress={() => requestPayment(item)} style={[styles['buttonContainer1'], { marginHorizontal: dynamicSize(0) }]} textStyle={styles['buttonText']} text={item['IsPaid'] ? paymentStatus : "PAY"} />
                                        {item['IsRated'] ? null :
                                            <Button onPress={() => item['IsPaid'] ? _open(item) : showToast("Please pay first")} style={[styles['buttonContainer'], { marginHorizontal: dynamicSize(0), right: 5 }]} textStyle={styles['buttonText']} text={"RATE"} />
                                        }
                                    </MyView>
                                </MyView>}
                        </MyView>
                    </MyView>
                </Touchable>
            </Card>
        )
    }



    const _submitRating = data => {
        let newResult = []
        const isRating = data.filter(item => { if (item['UserRating']) return item })
        if (isRating.length) {
            for (let i = 0; i < isRating.length; i++) {
                newResult.push({ UserRating: isRating[i]['UserRating'], RatingTypeId: isRating[i]['RatingTypeId'], UserInput: 'test' })
            }
            const param = {
                "UserReviews": newResult,
                "AppointmentId": apptid
            }
            dispatch(loaderAction(true))
            dispatch(saveRatingAction(param))
            setTimeout(() => {
                dispatch(getCustomerAppointementsAction(4))
            }, 1000)
        }
    }
    return (
        <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
            <MyView style={{ flex: 1, backgroundColor: LIGHT_WHITE }}>

                <RatingPopup getAllRatings={_submitRating} onPress={() => setModalVisible(false)} isVisible={ModalVisible} />
                <PaymentPopup
                    dismiss={() => setPaymentPopup(false)}
                    Visible={paymentPopup} onPressRight={() => cashPress()} onPressLeft={() => payment()} />
                <Loader
                    isVisible={loading} />
                {customerpastappointment.length != 0 ?
                    <FlatList
                        key='inProgress'
                        data={customerpastappointment}
                        renderItem={_renderProgress}
                        ItemSeparatorComponent={_renderSeperator}
                        keyExtractor={_keyExtractor}
                        contentContainerStyle={styles['flatList']}
                        showsVerticalScrollIndicator={false}
                    /> :
                    <MyText style={{ fontSize: getFontSize(14), color: THEME, alignSelf: "center", marginVertical: SCREEN_HEIGHT * 0.35 }} >
                        {loading ? "" : "No Past Appointments"}
                    </MyText>}
            </MyView>
        </SafeArea>
    )
}

export default PastAppointment