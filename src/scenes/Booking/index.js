import React, { useState } from 'react'
import { SafeArea, MyView, CurveView, MyText, KeyboardAwareScroll, MyImage, MultilineTextInput, Button } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_WHITE, BLACK } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import DateTimePicker from '../../components/datePicker'
import styles from './styles'
import { calendarIcon, timeIcon } from '../../components/icons'
import { showToast } from '../../components/helper'
import { apiKey } from "../../services/serviceConstant"
import { useLinkProps } from '@react-navigation/native'
import { loaderAction, saveBooking } from '../../redux/action'
import { token } from "../../services/serviceConstant"
import {
  requestOneTimePayment,
  requestBillingAgreement,
  PaypalResponse,
} from 'react-native-paypal';
const Booking = (props) => {
  let newArr = []
  let filterServiceid = []

  const state = useSelector(state => { return state })
  const { providerprofile } = state['profileReducer']
  console.log('providerprofile===>', JSON.stringify(providerprofile))
  let deposit = providerprofile['DepositFee'] ? providerprofile['DepositFee']?.toString() : '0'

  const [amount, setAmount] = useState(deposit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState({
    nonce: '',
    payerId: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [
    billingAgreementDescription,
    setBillingAgreementDescription,
  ] = useState('Billing Description');
  const d = new Date()
  const { services } = state['hairReducer']
  const { completeproviderservices } = state['profileReducer']
  const { DATE, SELECT_DATE, TIME, NOTES, OPTIONAL, DEPOSITE_DESCRIPTION } = state['localeReducer']['locale']
  const [date, setdate] = useState('')
  const [time, settime] = useState('')
  const [notes, setnotes] = useState('')
  const dispatch = useDispatch()

  const _selectedDate = data => {
    setdate(data)
  }

  const _selectedTime = time => {
    settime(time)
  }

  const _booking = () => {
    date ?
      time ?
        requestPayment()
        : showToast("Please select time")
      : showToast("Please select date")
  }

  const _saveBooking = (nonce) => {
    dispatch(loaderAction(false))
    for (let i = 0; i < services.length; i++) {
      filterServiceid.push(services[i].filter(item => { if (item['status']) return item }).map(each => { return each['SPServiceMappingId'] }))
    }


    for (var i = 0; i < filterServiceid.length; i++) {
      newArr = newArr.concat(filterServiceid[i]);
    }
    let param = {
      [apiKey['SPId']]: props.route.params.providerId,
      [apiKey['SPServiceMapId']]: newArr,
      [apiKey['BookingDate']]: date,
      [apiKey["BookingTime"]]: time,
      [apiKey['DepositFee']]: providerprofile['DepositFee'],
      [apiKey['Notes']]: notes,
      [apiKey['NounceId']]: nonce
    }
    dispatch(saveBooking(param))
  }

  const requestPayment = () => {
    //props.navigation.navigate('deposit')
    dispatch(loaderAction(true))
    requestOneTimePayment(token,
      {
        amount: deposit, // required
        // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
        currency: 'USD',
        // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
        localeCode: 'en_GB',
        shippingAddressRequired: false,
        userAction: 'commit', // display 'Pay Now' on the PayPal review page
        // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
        intent: 'authorize',

      }).then(resp =>
        resp.nonce ? _saveBooking(resp.nonce)
          : dispatch(loaderAction(false)))
      .catch((err) => dispatch(loaderAction(false)))
  }


  return (
    <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
      <CurveView />
      <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center', backgroundColor: LIGHT_WHITE }}>

        <MyText style={styles['label']}>{DATE}</MyText>
        <DateTimePicker
          minDate={new Date(d)}
          style={styles['picker']}
          placeholder={SELECT_DATE}
          selectedDate={_selectedDate}
          textStyle={{ color: BLACK }}
        >
          <MyImage source={calendarIcon} />
        </DateTimePicker>
        <MyText style={styles['label']}>{TIME}</MyText>
        <DateTimePicker
          //is24={true}
          //Locale={"en_GB"}
          mode='time'
          style={styles['picker']}
          placeholder={'00:00'}
          selectedTime={_selectedTime}
          textStyle={{ color: BLACK }}
        >
          <MyImage source={timeIcon} />
        </DateTimePicker>
        <MyText style={styles['label']}>{`${NOTES} (${OPTIONAL})`}</MyText>
        <MultilineTextInput
          value={notes}
          onChangeText={(value) => setnotes(value)}
          style={styles['textInput']}
        />
        <MyText style={styles['deposite']}>{`MAKE A DEPOSIT OF ${providerprofile['DepositFee']} USD TO SEND A BOOKING REQUEST`}</MyText>
        <Button onPress={_booking} style={styles['buttonStyle']} />
      </KeyboardAwareScroll>
    </SafeArea>
  )
}

export default Booking