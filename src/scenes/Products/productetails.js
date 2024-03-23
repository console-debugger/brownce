import React, { useEffect, useState } from "react"
import { Button, CurveView, Loader, MyImage, MyText, MyView, SafeArea, Touchable } from "../../components/customComponent"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './styles'
import { montserratSemiBold } from "../../utils/fontFamily"
import { BLACK, LIGHT_BROWN, LIGHT_WHITE, THEME } from "../../utils/colors"
import { isCustomer, isIOS, SCREEN_HEIGHT, SCREEN_WIDTH, showToast } from "../../components/helper"
import { SliderBox } from "react-native-image-slider-box";
import { ActivityIndicator, ScrollView } from "react-native"
import { minusicon, plusicon } from '../../components/icons'
import { PaymentPopup, AddressPopup } from "../../components/alert"
import { useDispatch, useSelector } from "react-redux"
import { addOrderAction, clearMessageCase, loaderAction, myAddressAction, paymentSaveAction } from "../../redux/action"
import { ADD_ORDER_SUCCESS_ACTION, MY_ADDRESS_SUCCESS_ACTION } from "../../redux/action/type"
import { token } from "../../services/serviceConstant"
// import { requestOneTimePayment, } from 'react-native-paypal';
import commonStyle from "../../components/commonStyle"

const TYPES = { PHONE: 'phone', ADDRESS: 'address' }

const ProductDetails = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const state = useSelector(state => { return state })
  const { SELLER } = state['localeReducer']['locale'];
  const { myaddress, messageCase } = state['OrderReducer']
  const { Object } = state['OrderReducer']['addorderDetails']
  const { loading } = state['loaderReducer']

  const [count, setcount] = useState(1)
  const [paymentPopup, setPaymentPopup] = useState(false)
  const [modalVisible, setmodalVisible] = useState(false)

  const cash = 2
  const paypal = 1

  const initialFormField = {
    phone: '',
    address: ''
  }

  const initialError = {
    phoneError: '',
    addressError: ''
  }

  const [{ phone, address }, setFormField] = useState(initialFormField)
  const [{ phoneError, addressError }, setError] = useState(initialError)

  let imagesArray = []
  imagesArray = route.params.item['ProductFiles'].map(item => item['FilePath'])

  useEffect(() => {
    if (isCustomer()) {
      dispatch(myAddressAction())
    }
  }, [])


  useEffect(() => {
    // Request for payment
    if (isCustomer()) {
      if (messageCase === MY_ADDRESS_SUCCESS_ACTION) {
        setFormField(prevState => ({ ...prevState, phone: myaddress != null ? myaddress?.['ContactNumer'] : '' }))
        setFormField(prevState => ({ ...prevState, address: myaddress != null ? myaddress?.['Adresss'] : '' }))
      }
      if (messageCase === ADD_ORDER_SUCCESS_ACTION) {
        dispatch(loaderAction(true))
        dispatch(clearMessageCase())
        requestOneTimePayment(token,
          {
            amount: Object['Amount'].toString(), // required
            // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
            currency: 'USD',
            // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
            localeCode: 'en_GB',
            shippingAddressRequired: false,
            userAction: 'commit', // display 'Pay Now' on the PayPal review page
            // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
            intent: 'authorize',

          }).then(resp =>
            resp.nonce ? _savePayment(resp.nonce)
              : dispatch(loaderAction(false)))
          .catch((err) => dispatch(loaderAction(false)
          ))
      }
    }

  }, [messageCase])

  // onchange of input
  const _onChangeText = type => text => {
    if (type === TYPES['PHONE']) { setFormField(prevState => ({ ...prevState, phone: text })), setError(prevState => ({ ...prevState, phoneError: '' })) }
    else if (type === TYPES['ADDRESS']) { setFormField(prevState => ({ ...prevState, address: text })), setError(prevState => ({ ...prevState, addressError: '' })) }
  }

  // increase products quantity counter
  const increase = () => {
    if (count >= route.params.item.Quantity) {
      showToast(`Sorry, we have only ${count} quantity of this product.`)
    }
    else {
      setcount(count + 1)
    }
  }

  // decrease products quantity counter
  const decrease = () => {
    count <= 1 ? count : setcount(count - 1)
  }

  // pay via cash
  const cashPress = async () => {
    setPaymentPopup(false)
    _addorder(cash, true)
  }

  // Online payment
  const payment = () => {
    setPaymentPopup(false)
    _addorder(paypal, false)
  }

  // Saving payment
  const _savePayment = (nonce) => {
    const param = {
      'Orderid': Object['Id'],
      'NonceId': nonce,
      'PayPalPaymentId': null,
      'Amount': Object['Amount']
    }
    dispatch(paymentSaveAction(param))
  }

  // Validate data before saving
  const _validate = () => {
    phone ?
      address ?
        _submit()
        : setError(prevError => ({ ...prevError, addressError: 'Please enter address.' }))
      : setError(prevError => ({ ...prevError, phoneError: 'Please enter phone number.' }))
  }

  // Sumbit order
  const _submit = () => {
    setmodalVisible(false)
    setPaymentPopup(true)
  }

  const _addorder = (method, status) => {
    const param = {
      "ProductId": route.params.item.Id,
      "Quantity": count,
      "Amount": route.params.item.Price * count,
      "PaymentMethod": method,
      "AddressId": myaddress?.AddressId ? myaddress.AddressId : 0,
      "Address": address,
      "ContactNumber": phone,
      "Lattitude": 0,
      "Longitude": 0
    }
    dispatch(addOrderAction(param, status))
  }

  return (
    <SafeArea style={{ paddingTop: -useSafeAreaInsets().top, }}>
      <AddressPopup
        dismiss={() => setmodalVisible(false)}
        phone={phone}
        address={address}
        phoneError={phoneError}
        addressError={addressError}
        onPress={_validate}
        onChangeNumber={_onChangeText(TYPES['PHONE'])}
        onChangeAddress={_onChangeText(TYPES['ADDRESS'])}
        isVisible={modalVisible}
      />
      <Loader isVisible={loading} />
      <PaymentPopup
        dismiss={() => setPaymentPopup(false)}
        Visible={paymentPopup} onPressRight={() => cashPress()} onPressLeft={() => payment()} />
      <CurveView />
      <ScrollView >
        <SliderBox
          resizeMode={'contain'}
          images={imagesArray}
          dotColor={THEME}
          inactiveDotColor={LIGHT_BROWN}
          ImageComponent={(image) => {
            return (
              <MyView style={{
                marginTop: 0,
                width: SCREEN_WIDTH * 0.85,
                height: SCREEN_HEIGHT * 0.25,
                alignSelf: "center",
                borderRadius: 8,
              }}>
                <MyView style={{
                  flex: 1,
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  zIndex: -10,
                }}>
                  <MyImage
                    style={image?.style}
                    source={image?.source}
                    resizeMode={'cover'}
                    blurRadius={5}
                  />
                </MyView>
                <MyImage
                  style={image?.style}
                  source={image?.source}
                  resizeMode={'contain'}
                />
              </MyView>
            )
          }}
          ImageComponentStyle={{
            marginTop: 0,
            width: SCREEN_WIDTH * 0.85,
            height: SCREEN_HEIGHT * 0.25,
            alignSelf: "center",
            borderRadius: 8,
          }}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
          LoaderComponent={(loading) => <MyView />}
        />
        <MyView style={{ width: SCREEN_WIDTH * 0.85 }}>
          <MyView style={styles.rowContainer}>
            <MyText style={{ fontFamily: montserratSemiBold, fontSize: 15, marginLeft: 30 }}>{route.params.item.ProductName}</MyText>
            <MyText style={{ color: THEME, fontFamily: montserratSemiBold, fontSize: 15, marginRight: 30 }}>{`$${route.params.item.Price}`}</MyText>
          </MyView>
          <MyText style={{ color: BLACK, fontSize: 15, marginLeft: 32, marginTop: 4 }}>{route.params.item.BrandName}</MyText>
          <MyText style={{ lineHeight: 22, color: BLACK, fontSize: 15, marginLeft: 32, marginTop: 4 }}>{`${SELLER} - `}
            <MyText style={{ lineHeight: 22, color: BLACK, fontSize: 15, marginLeft: 32, marginTop: 4, color: THEME }}>{route.params.item.SellerName}</MyText>
          </MyText>
          <MyView style={{}}>
            <MyText style={{ lineHeight: 22, color: BLACK, fontSize: 15, marginLeft: 32, marginTop: 4 }}>{route.params.item.Description}</MyText>

          </MyView>
        </MyView>
      </ScrollView>
      {isCustomer() ?
        <MyView style={{ paddingBottom: SCREEN_HEIGHT * 0.12, backgroundColor: LIGHT_WHITE }}>
          <MyView style={{ alignSelf: 'center', marginBottom: isIOS ? -30 : 0, bottom: 0, flexDirection: "row", alignItems: "center", justifyContent: "center", }} >
            <Touchable style={{ height: 5, padding: 5 }} onPress={() => decrease()}>
              <MyImage
                style={{ height: 4, width: 15, marginHorizontal: 0 }}
                source={minusicon} />
            </Touchable>
            <MyText style={{ fontSize: 25, marginHorizontal: "5%" }} >
              {count}
            </MyText>
            <Touchable style={{ padding: 5 }} onPress={() => increase()}>
              <MyImage
                style={{ height: 15, width: 15, marginHorizontal: 5 }}
                source={plusicon} />
            </Touchable>
          </MyView>
          <MyText style={[styles.count, { color: THEME, fontSize: 17, marginBottom: isIOS ? 40 : 75 }]} >
            {'QUANTITY'}
          </MyText>
        </MyView> : null}
      <MyView style={{ position: 'absolute', bottom: 0, width: '75%', alignSelf: 'center', marginBottom: 20 }}>
        {isCustomer() ?
          <Button onPress={() => setmodalVisible(true)} style={{ width: '75%', alignSelf: 'center', marginTop: 15 }} text={'Shop Now'} />
          : null}
      </MyView>
    </SafeArea>

  )
}

export default ProductDetails