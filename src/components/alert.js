import React, { useEffect } from 'react'
import { CustomModal, MyText, Button, MyView, RatingWithLabel1, CustomModal1, MyImage } from './customComponent'
import commonStyle from './commonStyle'
import { dynamicSize, getFontSize } from '../utils/responsive'
import { THEME, LIGHT_BROWN } from '../utils/colors'
import { useSelector } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './helper'
import { montserratBold } from '../utils/fontFamily'

export const MyAlert = props => {

    const { onYesPress, onNoPress, isVisible, message, animationType, isPopup, onPress, indicator } = props
    const state = useSelector(state => { return state })
    const { OK, YES, NO, } = state['localeReducer']['locale']

    return (
        <CustomModal isVisible={isVisible} animationType={animationType}>
            <MyView style={commonStyle['alertContainer']}>
                <MyText style={[commonStyle['alertText'], { textAlign: isPopup ? 'center' : 'left' }]}>{message}</MyText>
                {isPopup
                    ?
                    <MyView style={{ marginTop: dynamicSize(35), alignItems: 'center' }}>
                        <Button onPress={onPress} text={OK} style={commonStyle['alertButton']} textStyle={commonStyle['reqTextStyle']} />
                    </MyView>
                    :
                    <MyView style={commonStyle['alertButtonContainer']}>
                        <Button indicator={indicator} onPress={onYesPress} text={YES} style={commonStyle['alertButton']} textStyle={commonStyle['reqTextStyle']} />
                        <Button onPress={onNoPress} text={NO} style={commonStyle['alertButton']} textStyle={commonStyle['reqTextStyle']} />
                    </MyView>
                }
            </MyView>
        </CustomModal>
    )
}



export const RatingPopup = props => {
    const { isVisible, animationType, getAllRatings, onPress } = props

    const state = useSelector(state => { return state })
    const { ratingtypes } = state['profileReducer']

    const _getRating = (item, index) => count => {
        ratingtypes[index]['UserRating'] = count
        ratingtypes[index]['status'] = true
    }

    const _onPress = () => {
        onPress()
        getAllRatings(ratingtypes)
    }

    return (
        <CustomModal isVisible={isVisible} animationType={animationType}>
            <MyView style={commonStyle['alertContainer']}>
                {ratingtypes.map((item, index) => {
                    return (
                        <RatingWithLabel1 key={index} appliedRating={_getRating(item, index)} isRate imageStyle={{ marginLeft: dynamicSize(2), width: dynamicSize(20) }} labelStyle={{ fontSize: getFontSize(14) }} style={{ marginTop: dynamicSize(5) }} label={item.TypeName} />

                    )
                })}
                <Button onPress={_onPress} style={[commonStyle['buttonContainer'], { marginHorizontal: dynamicSize(0) }]} textStyle={{ fontSize: getFontSize(15) }} text={"SUBMIT"} />
            </MyView>
        </CustomModal>
    )
}




export const FundPopUp = props => {
    const { onChangeText, isVisible, animationType, onPress } = props

    return (
        <CustomModal isVisible={isVisible} animationType={animationType}>
            <MyView style={commonStyle['alertContainer1']}>
                <MyText style={{ marginTop: SCREEN_HEIGHT * 0.02, marginLeft: "2%" }} >
                    {"Enter Amount"}
                </MyText>
                <MyView style={{ height: SCREEN_HEIGHT * 0.04, borderBottomWidth: 1, width: "95%", alignSelf: "center" }} >
                    <TextInput
                        style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}
                        keyboardType={"number-pad"}
                        onChangeText={onChangeText}
                    />
                </MyView>
                <MyView style={{ marginTop: SCREEN_HEIGHT * 0.01 }} >
                    <Button onPress={onPress} style={[commonStyle['buttonContainer'], { marginHorizontal: dynamicSize(0) }]} textStyle={{ fontSize: getFontSize(15) }} text={"SUBMIT"} />
                </MyView>
            </MyView>
        </CustomModal>
    )
}


export const ApprovalPopup = props => {
    const { Visible, text, animationType, onPress } = props

    return (
        <CustomModal isVisible={Visible} animationType={animationType}>
            <MyView style={commonStyle['alertContainer1']}>
                <MyText style={{ marginTop: SCREEN_HEIGHT * 0.04, alignSelf: "center", fontSize: getFontSize(18) }} >
                    {text}
                </MyText>

                <MyView style={{ marginTop: SCREEN_HEIGHT * 0.01 }} >
                    <Button onPress={onPress} style={[commonStyle['buttonContainer'], { marginHorizontal: dynamicSize(0) }]} textStyle={{ fontSize: getFontSize(15) }} text={"OK"} />
                </MyView>
            </MyView>
        </CustomModal>
    )
}

export const LicensePopup = props => {
    const { source, isVisible, dismiss, animationType } = props

    return (
        <CustomModal1 isVisible={isVisible} dismiss={dismiss} animationType={animationType}>
            <MyView style={commonStyle['alertContainer2']}>
                <MyImage
                    resizeMode={"stretch"}
                    style={commonStyle['image']}
                    source={source} />

            </MyView>
        </CustomModal1>
    )
}


export const PaymentPopup = props => {
    const { onYesPress, onNoPress, dismiss, onChangeText, onPressLeft, Visible, onPressRight, text, animationType, getAllRatings, isPopup, onPress, appliedRating } = props
    const state = useSelector(state => { return state })

    const { OK, YES, NO, COMMUNICATION, PROFESSIONALISM, CLEANLINESS, PUNCTUALITY, } = state['localeReducer']['locale']


    return (
        <CustomModal1 dismiss={dismiss} isVisible={Visible} animationType={animationType}>
            <MyView style={commonStyle['alertContainer3']}>
                <MyView style={{ marginLeft: SCREEN_WIDTH * 0.03 }} >
                    <Button onPress={onPressRight} style={[commonStyle['buttonContainer'], { marginTop: 0 }]} textStyle={{ fontSize: getFontSize(12) }} text={"Pay With Cash"} />
                    {/* <Button onPress={onPressLeft} style={[commonStyle['buttonContainer'], {}]} textStyle={{ fontSize: getFontSize(12) }} text={"Pay With PayPal"} /> */}

                </MyView>
            </MyView>
        </CustomModal1>
    )
}



export const AddressPopup = props => {
    const { phoneError, addressError, dismiss, phone, onChangeAddress, onChangeNumber, isVisible, address, animationType, getAllRatings, isPopup, onPress, appliedRating } = props
    const state = useSelector(state => { return state })
    const { OK, YES, NO, COMMUNICATION, PROFESSIONALISM, CLEANLINESS, PUNCTUALITY, } = state['localeReducer']['locale']
    return (
        <CustomModal1 dismiss={dismiss} isVisible={isVisible} animationType={animationType}>

            <MyView style={commonStyle['addressContainer']}>
                <MyText style={{ marginTop: SCREEN_HEIGHT * 0.02, marginLeft: "2%" }} >
                    {"Phone Number"}
                </MyText>
                <MyView style={{ height: SCREEN_HEIGHT * 0.04, borderBottomWidth: 1, width: "95%", alignSelf: "center" }} >
                    <TextInput
                        autoCorrect={false}
                        value={phone}
                        maxLength={10}
                        style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}
                        keyboardType={"numbers-and-punctuation"}
                        onChangeText={onChangeNumber}
                    />
                </MyView>
                <MyText style={{ marginLeft: "2%", color: 'red' }} >
                    {phoneError}
                </MyText>
                <MyText style={{ marginTop: SCREEN_HEIGHT * 0.02, marginLeft: "2%" }} >
                    {"Address"}
                </MyText>
                <MyView style={{ height: SCREEN_HEIGHT * 0.04, borderBottomWidth: 1, width: "95%", alignSelf: "center" }} >
                    <TextInput
                        multiline
                        value={address}
                        style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}
                        autoCorrect={false}
                        onChangeText={onChangeAddress}
                    />
                </MyView>
                <MyText style={{ marginLeft: "2%", color: 'red' }} >
                    {addressError}
                </MyText>
                <MyView style={{ marginTop: SCREEN_HEIGHT * 0.01 }} >
                    <Button onPress={onPress} style={[commonStyle['buttonContainer'], { marginHorizontal: dynamicSize(0), marginTop: -6 }]} textStyle={{ fontSize: getFontSize(15) }} text={"Continue"} />
                </MyView>
            </MyView>
        </CustomModal1>
    )
}

export const RemarkPopUp = props => {
    const { dismiss, value, onChangeText, isVisible, message, animationType, getAllRatings, isPopup, onPress, appliedRating } = props
    const state = useSelector(state => { return state })
    const { OK, YES, NO, COMMUNICATION, PROFESSIONALISM, CLEANLINESS, PUNCTUALITY, } = state['localeReducer']['locale']
    return (
        <CustomModal1 dismiss={dismiss} isVisible={isVisible} animationType={animationType}>
            <MyView style={commonStyle['alertContainer1']}>
                <MyText style={{ marginTop: SCREEN_HEIGHT * 0.02, marginLeft: "2%" }} >
                    {"Remark"}
                </MyText>
                <MyView style={{ height: SCREEN_HEIGHT * 0.04, borderBottomWidth: 1, width: "95%", alignSelf: "center" }} >
                    <TextInput
                        multiline
                        value={value}
                        style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}
                        //keyboardType={"number-pad"}
                        onChangeText={onChangeText}
                    />
                </MyView>
                <MyView style={{ marginTop: SCREEN_HEIGHT * 0.01 }} >
                    <Button onPress={onPress} style={[commonStyle['buttonContainer'], { marginHorizontal: dynamicSize(0) }]} textStyle={{ fontSize: getFontSize(15) }} text={"SUBMIT"} />
                </MyView>
            </MyView>
        </CustomModal1>
    )
}

export const UpdatePrice = props => {
    const { dismiss, value, onChangeText, isVisible, animationType, onSubmit, onCancel } = props

    return (
        <CustomModal1 dismiss={dismiss} isVisible={isVisible} animationType={animationType}>
            <MyView style={[commonStyle['alertContainer1'], { justifyContent: 'center', }]}>
                <MyText style={{ marginTop: SCREEN_HEIGHT * 0.02, alignSelf: 'center', fontFamily: montserratBold, fontSize: getFontSize(16) }} >
                    {"Adjust Total Price"}
                </MyText>
                <MyView style={{ flex: 1, justifyContent: 'center' }}>
                    <MyView style={{ height: SCREEN_HEIGHT * 0.04, borderBottomWidth: 1, width: "95%", alignSelf: "center" }} >
                        <TextInput
                            placeholder='Enter price here'
                            value={value}
                            style={{ paddingVertical: SCREEN_HEIGHT * 0.01 }}
                            onChangeText={onChangeText}
                            keyboardType="number-pad"
                        />
                    </MyView>
                    <MyView style={{ flexDirection: 'row', justifyContent: 'space-around', }} >
                        <Button
                            onPress={onSubmit}
                            style={[commonStyle['buttonContainer'], {
                                marginHorizontal: dynamicSize(0),
                                width: SCREEN_WIDTH * 0.37,
                                backgroundColor: THEME,
                                paddingVertical: dynamicSize(5),
                                marginLeft: dynamicSize(0),
                            }]} textStyle={{ fontSize: getFontSize(15) }} text={"SUBMIT"} />
                        <Button
                            onPress={onCancel}
                            style={[commonStyle['buttonContainer'], {
                                marginHorizontal: dynamicSize(0),
                                width: SCREEN_WIDTH * 0.37,
                                backgroundColor: LIGHT_BROWN,
                                paddingVertical: dynamicSize(5),
                                marginLeft: dynamicSize(0),
                            }]} textStyle={{ fontSize: getFontSize(15) }} text={"CANCEL"} />
                    </MyView>
                </MyView>
            </MyView>
        </CustomModal1>
    )
}