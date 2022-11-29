import React, { useState, useCallback } from 'react'
import { KeyboardAwareScroll, Touchable, MyImage, MyText, SafeArea, Input, Button } from '../../components/customComponent'
import styles from './styles'
import { cameraView } from '../../components/icons'
import { useDispatch, useSelector } from 'react-redux'
import { LIGHT_WHITE, BLACK, LIGHT_GRAY, THEME, LIGHT_BROWN } from '../../utils/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import commonStyle from '../../components/commonStyle'
import { dismissKeyboard, SCREEN_HEIGHT, showToast, isCustomer } from '../../components/helper'
import ImagePickerSelection from '../../components/imagePickerSelection'
import { apiKey } from '../../services/serviceConstant'
import { profileSetupOneAction, loaderAction, getSpDataStepAction, getCsDataStepAction } from '../../redux/action'
import { useFocusEffect } from '@react-navigation/native'
import { dynamicSize } from '../../utils/responsive'
import { navigateToScreen, reset } from '../../navigation/rootNav'

// Profile setup UI
const ProfileSetupOne = ({ navigation }) => {

    const dispatch = useDispatch()

    const state = useSelector(state => { return state })
    const { UPLOAD_PICTURE, MY_FIRST, NAME_IS, CONTINUE, NAME, PLEASE_ENTER_FIRST_NAME, PLEASE_UPLOAD_PROFILE_PIC } = state['localeReducer']['locale']

    const [focus, setFocus] = useState(-1)
    const [name, setName] = useState('')
    const [isShow, setShow] = useState(false)
    const [imageData, setImageData] = useState({})

    const _focus = () => setFocus(1)

    const _clearFocus = () => setFocus(-1)

    const _onChangeText = text => setName(text)

    const _openPicker = () => setShow(true)

    const _closePicker = () => setShow(false)

    const _getImage = data => {
        setImageData(data)
        setShow(false)
    }

    useFocusEffect(
        useCallback(() => {
            // dispatch(loaderAction(true))
            // dispatch(getSpDataStepAction(5))
            // dispatch(getCsDataStepAction(5))
        }, [])
    )

    const _validate = () => {
        imageData?.['uri'] ?
            name.length ?
                _saveProfile()
                : showToast(PLEASE_ENTER_FIRST_NAME)
            : showToast(PLEASE_UPLOAD_PROFILE_PIC)
    }

    const _complete_later = () => isCustomer() ? navigateToScreen('profileSetupTwo') : navigateToScreen('providerBio')

    const _saveProfile = () => {
        dismissKeyboard()
        const formData = new FormData()
        formData.append(apiKey['FIRSTNAME'], name)
        formData.append(apiKey['PROFILE_PIC'], imageData)
        dispatch(profileSetupOneAction(formData))
    }

    return (
        <SafeArea style={{ backgroundColor: LIGHT_WHITE, paddingTop: -useSafeAreaInsets().top }}>
            <ImagePickerSelection pickerModal={isShow} onCancelPress={_closePicker} selectedImage={_getImage} />
            <KeyboardAwareScroll contentContainerStyle={{ alignItems: 'center' }}>
                <Touchable style={styles['imageView']} onPress={_openPicker}>
                    <MyImage style={styles['image']} source={imageData?.['uri'] ? { uri: imageData?.['uri'] } : cameraView} />
                </Touchable>
                <MyText style={styles['uploadText']}>{UPLOAD_PICTURE}</MyText>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle'], { marginTop: SCREEN_HEIGHT * 0.05 }]}>{MY_FIRST}</MyText>
                <MyText style={[commonStyle['extraBoldText'], commonStyle['profileTitle']]}>{NAME_IS}</MyText>
                <Input
                    style={{ borderBottomColor: focus === 1 ? BLACK : LIGHT_GRAY, marginVertical: SCREEN_HEIGHT * 0.02 }}
                    onFocus={_focus}
                    onBlur={_clearFocus}
                    value={name}
                    placeholder={NAME}
                    onChangeText={_onChangeText}
                    returnKeyType='done'
                />
                <Button onPress={_validate} style={styles['buttonStyle']} text={CONTINUE} />
                <Button onPress={_complete_later} style={[styles['buttonStyle'], { backgroundColor: LIGHT_BROWN, marginTop: dynamicSize(10) }]} text={'COMPLETE LATER'} />             
            </KeyboardAwareScroll>
        </SafeArea>
    )
}

export default ProfileSetupOne