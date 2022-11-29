import React, { useState } from 'react'
import { View, Image } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import commonStyle from '../../components/commonStyle'
import { Button, KeyboardAwareScroll, MyText, SafeArea, Touchable } from '../../components/customComponent'
import { SCREEN_HEIGHT, showToast } from '../../components/helper'
import { logoutAction, saveLicenseAction, popupAction } from '../../redux/action'
import { apiKey } from '../../services/serviceConstant'
import { BLACK, LIGHT_BROWN, LIGHT_WHITE, THEME } from '../../utils/colors'
import styles from './styles'
import { uploadIcon } from "../../components/icons"
import ImagePickerSelection from '../../components/imagePickerSelection'
import { dynamicSize, getFontSize } from '../../utils/responsive'
import { logout, navigateToScreen } from '../../navigation/rootNav'
import { ApprovalPopup } from '../../components/alert'

let timeout

// Upload liscence UI
const uploadLicense = ({ navigation }) => {

    const dispatch = useDispatch()
    const state = useSelector(state => { return state })
    const { isVisible, message } = state['loaderReducer']

    const [isShow, setShow] = useState(false)
    const [imageData, setImageData] = useState({})
    const [popup, setPopup] = useState(false)

    const _openPicker = () => setShow(true)

    const _closePicker = () => setShow(false)

    const _validate = () => {
        imageData?.['uri'] ?
            _saveLicense()
            : showToast("Please upload license")
    }

    const _getImage = data => {
        setImageData(data)
        setShow(false)
    }
    const _saveLicense = () => {
        const formData = new FormData()
        formData.append(apiKey['DocName'], imageData)
        formData.append(apiKey['IsUpdate'], false)
        dispatch(saveLicenseAction(formData, true, result => {
            if (result) {
                _openPopup()
            }
        }))
    }

    const _openPopup = () => {
        setPopup(true)
    }

    const _complete_later = () => {
        dispatch(logoutAction())
        logout()
    }

    const _onPress = () => {
        setPopup(false)
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = null
            _complete_later()
        }, 600);
    }
    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <ImagePickerSelection pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} />
                <ApprovalPopup Visible={popup} text={'Waiting for approval'} onPress={_onPress} />
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.1 }]}>{`${"UPLOAD"}\n${"YOUR LICENSE"}`}</MyText>
                <View style={styles['license']}>
                    <Touchable onPress={_openPicker}>
                        {imageData?.['uri'] ?
                            <Image style={styles['license']} source={{ uri: imageData['uri'] }} /> :
                            <Image source={uploadIcon} />
                        }
                    </Touchable>
                </View>
                <MyText style={{ textAlign: 'center', alignSelf: 'center', color: THEME, fontWeight: 'bold', fontSize: getFontSize(15), marginHorizontal: 20, marginTop: 10 }}>
                    {'Note: '}
                    <MyText style={{ color: BLACK, fontWeight: 'bold', fontSize: getFontSize(13) }}>
                        {'Upload a blank image if you do not have your beauty license on hand. Remember to upload your beauty license later.'}
                    </MyText>

                </MyText>
                <Button onPress={_validate} style={styles['buttonStyleCont']} text={"COMPLETE"} />
                <Button onPress={_openPopup} style={[styles['buttonStyleCont'], { backgroundColor: LIGHT_BROWN, marginTop: dynamicSize(-10) }]} text={'COMPLETE LATER'} />
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default uploadLicense