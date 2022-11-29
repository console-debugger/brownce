import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { SafeArea, MyView, CurveView, MyText, KeyboardAwareScroll, Button } from '../../components/customComponent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_WHITE } from '../../utils/colors'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'
import { showToast, SCREEN_WIDTH } from '../../components/helper'
import { apiKey } from "../../services/serviceConstant"
import { saveBooking } from '../../redux/action'

const Deposit = (props) => {
  const token = "sandbox_hcbk4ftm_wc53n2v46zgrss5n"
  const state = useSelector(state => { return state })
  const [amount, setAmount] = useState('50');
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
  console.log("dd", d)
  const { services } = state['hairReducer']
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
        _saveBooking()
        : showToast("Please select time")
      : showToast("Please select date")
  }

  const _saveBooking = () => {
    let filterServiceid = []
    for (let i = 0; i < services.length; i++) {
      const filterServiceId = services[i].filter(item => { if (item['status']) return item }).map(each => { return each['ServiceMasterId'] })
      filterServiceid = [...filterServiceId]
    }
    //const filterServiceId = services.filter(item => { if (item['status']) return item }).map(each => { return each['SPServiceMappingId'] })

    const isUpdate = true

    let param = {
      [apiKey['SPId']]: props.route.params.providerId,
      [apiKey['SPServiceMapId']]: filterServiceid,
      [apiKey['BookingDate']]: date,
      [apiKey["BookingTime"]]: time,
      [apiKey['DepositFee']]: '5',
      [apiKey['Notes']]: notes
    }
    dispatch(saveBooking(param))
  }

  const requestPayment = () => {

    // requestOneTimePayment(token, {amount})
    //   .then(resp =>console.log("resp",resp))
    //   .catch((err) =>  console.log("error", JSON.stringify(err)));

  }

  // const requestBilling = () =>
  // requestBillingAgreement(token, {billingAgreementDescription})
  //   .then(resp =>console.log("billing resp",resp))
  //   .catch((err) => setError(err.message));

  return (
    <SafeArea style={{ paddingTop: -useSafeAreaInsets().top }}>
      <CurveView />
      <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center', backgroundColor: LIGHT_WHITE }}>
        <MyText>{"Deposit Amount"}</MyText>
        <TextInput
          value={"5 USD"}
          style={styles['usd']} />
        <MyView style={{ marginTop: SCREEN_WIDTH * 0.05 }} >
          <Button onPress={requestPayment} style={styles['buttonStyle']} />
        </MyView>
      </KeyboardAwareScroll>
    </SafeArea>
  )
}

export default Deposit